"use client";

import {useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {MapMarkers} from "./MapMarkers";

interface MapViewProps {
    onAddressSelect?: (
        address: string,
        coordinates: { lat: number; lng: number }
    ) => void;
    searchParams: Record<string, any>;
}

/**
 * MapView Component
 * 
 * Main map component that displays properties on an interactive map.
 * Follows Single Responsibility Principle - Only handles map presentation.
 * 
 * Features:
 * - Interactive map with OpenStreetMap tiles
 * - Dynamic property markers based on visible area
 * - Popup with property information
 * - Responsive layout
 * 
 * @param searchParams - Search parameters to filter displayed properties
 * @param onAddressSelect - Optional callback for address selection (future use)
 */
export const MapView = ({searchParams, onAddressSelect}: MapViewProps) => {
    // Default center: Havana, Cuba
    const [mapCenter] = useState({lat: 23.1353, lng: -82.3589});

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 h-[600px]">
                <div className="col-span-2">
                    <Card className="h-full">
                        <CardContent className="p-0 h-full">
                            <div className="w-full h-full rounded-lg">
                                <MapContainer
                                    center={[mapCenter.lat, mapCenter.lng]}
                                    zoom={13}
                                    className="w-full h-full rounded-lg"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <MapMarkers searchParams={searchParams}/>
                                </MapContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

