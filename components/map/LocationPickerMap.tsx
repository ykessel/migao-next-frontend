"use client";

import {MapContainer, TileLayer, Marker, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropertyIconMarker from "./property-icon-marker";
import {Location} from "@/types/location";

interface LocationPickerMapProps {
    onLocationSelect: (location: Location) => void;
    selectedLocation: Location | null;
    center?: [number, number];
    zoom?: number;
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'MiGao Property App'
                }
            }
        );
        const data = await response.json();
        
        if (data && data.address) {
            const addr = data.address;
            // Build address string from components
            const parts = [];
            if (addr.road) parts.push(addr.road);
            if (addr.house_number) parts.push(addr.house_number);
            if (addr.neighbourhood) parts.push(addr.neighbourhood);
            if (addr.suburb) parts.push(addr.suburb);
            
            return parts.length > 0 
                ? parts.join(', ') 
                : data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
}

function MapClickHandler({onLocationSelect}: {onLocationSelect: (location: Location) => void}) {
    useMapEvents({
        async click(e) {
            const {lat, lng} = e.latlng;
            
            try {
                const address = await reverseGeocode(lat, lng);
                onLocationSelect({
                    type: 'Point',
                    coordinates: [lng, lat],
                    address: address,
                    city: '',
                    state: '',
                    country: 'Cuba',
                    postalCode: '',
                });
            } catch (error) {
                console.error('Error getting address:', error);
                onLocationSelect({
                    type: 'Point',
                    coordinates: [lng, lat],
                    address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
                    city: '',
                    state: '',
                    country: 'Cuba',
                    postalCode: '',
                });
            }
        },
    });
    
    return null;
}

export function LocationPickerMap({
    onLocationSelect,
    selectedLocation,
    center = [23.1353, -82.3589], // Default: Havana, Cuba
    zoom = 13,
}: LocationPickerMapProps) {
    const markerPosition: [number, number] | null = selectedLocation
        ? [selectedLocation.coordinates[1], selectedLocation.coordinates[0]]
        : null;

    return (
        <MapContainer
            center={selectedLocation ? [selectedLocation.coordinates[1], selectedLocation.coordinates[0]] : center}
            zoom={zoom}
            className="w-full h-full rounded-lg z-0"
            style={{height: '100%', width: '100%'}}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onLocationSelect={onLocationSelect} />
            {markerPosition && (
                <Marker position={markerPosition} icon={PropertyIconMarker()} />
            )}
        </MapContainer>
    );
}

