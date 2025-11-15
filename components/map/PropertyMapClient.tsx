"use client";

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Property} from '@/types/property';
import PropertyIconMarker from './property-icon-marker';

interface PropertyMapClientProps {
    property: Property;
    disablePopups?: boolean;
}

/**
 * PropertyMapClient Component
 * 
 * Displays a map centered on a specific property.
 * Follows Single Responsibility Principle - Only handles single property map display.
 * 
 * @param property - The property to display on map
 * @param disablePopups - Whether to disable popups (default: false)
 */
export function PropertyMapClient({property, disablePopups = false}: PropertyMapClientProps) {
    const coordinates = property.location.coordinates;
    const position: [number, number] = [coordinates[1], coordinates[0]]; // [lat, lng]

    return (
        <MapContainer
            center={position}
            zoom={15}
            style={{height: '100%', width: '100%'}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={PropertyIconMarker()}>
                {!disablePopups && (
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-semibold">{property.title}</h3>
                            <p className="text-sm text-gray-600">{property.location.address}</p>
                        </div>
                    </Popup>
                )}
            </Marker>
        </MapContainer>
    );
}

// Default export for backward compatibility
export default PropertyMapClient;

