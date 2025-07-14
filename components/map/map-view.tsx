'use client'
import {useState, useRef} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {MapPin, Bed, Bath, Square} from "lucide-react";
import {LoadingSpinner} from "@/components/app-components/loading-spinner";
import {Property} from "@/types/property";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Image from "next/image";
import PropertyIconMarker from "./property-icon-marker";
import EnhancedPropertyPopup from "./enhanced-property-popup";

interface MapViewProps {
    properties: Property[];
    isLoading: boolean;
    onAddressSelect: (address: string, coordinates: { lat: number; lng: number }) => void;
    isSelectingLocation?: boolean;
    showSelected?: boolean;
    selectedLocation?: { lat: number; lng: number };
}

// Component to handle map click events
function MapClickHandler({onClick}: { onClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e) => {
            onClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export const MapView = ({
    properties,
    isLoading,
    onAddressSelect,
    isSelectingLocation = false,
    showSelected = true,
    selectedLocation
}: MapViewProps) => {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [mapCenter] = useState({lat: 23.1353, lng: -82.3589}); // Centro habana
    const mapRef = useRef<L.Map | null>(null);

    const handleMarkerClick = (property: Property) => {
        setSelectedProperty(property);
    };

    const handleMapClick = async (lat: number, lng: number) => {
        if (isSelectingLocation) {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );
                const data = await response.json();
                onAddressSelect(data.display_name, {lat, lng});
            } catch (error) {
                console.error('Error getting address:', error);
                onAddressSelect(`${lat}, ${lng}`, {lat, lng});
            }
        }
    };


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <LoadingSpinner/>
            </div>
        );
    }

    return (
        <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 h-[600px]">
                {/* Map Area */}
                <div className="col-span-2">
                    <Card className="h-full">
                        <CardContent className="p-0 h-full">
                            <div className="w-full h-full rounded-lg">
                                <MapContainer
                                    center={[mapCenter.lat, mapCenter.lng]}
                                    zoom={13}
                                    className="w-full h-full rounded-lg"
                                    ref={mapRef}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    {isSelectingLocation && (
                                        <MapClickHandler onClick={handleMapClick}/>
                                    )}

                                    {/* Show selected location marker */}
                                    {selectedLocation && (
                                        <Marker
                                            position={[selectedLocation.lat, selectedLocation.lng]}
                                            icon={PropertyIconMarker()}
                                        >
                                            <Popup>
                                                <div className="p-2">
                                                    <p className="text-sm">Ubicación seleccionada</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )}

                                    {properties.map((property) => (
                                        <Marker
                                            key={property._id}
                                            position={[
                                                property?.location?.coordinates[1] || mapCenter.lat,
                                                property?.location?.coordinates[0] || mapCenter.lng
                                            ]}
                                            icon={PropertyIconMarker()}
                                            eventHandlers={{
                                                click: () => handleMarkerClick(property)
                                            }}
                                        >
                                            <Popup>
                                                <EnhancedPropertyPopup property={property} />
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Property Details Panel */}
                {showSelected && <PropertyDetailsPanel selectedProperty={selectedProperty}/>}
            </div>
        </div>
    );
};

const PropertyDetailsPanel = ({selectedProperty}: { selectedProperty: Property | null }) => {
    return (
        <div className="lg:col-span-1">
            <Card className="h-full">
                <CardContent className="p-4 h-full overflow-y-auto">
                    {selectedProperty ? (
                        <div className="space-y-4">
                            <Image
                                src={selectedProperty.images && selectedProperty.images.length > 0
                                    ? `https://images.unsplash.com/${selectedProperty.images[0]}?auto=format&fit=crop&w=300&h=200`
                                    : '/home5.jpg'
                                }
                                alt={selectedProperty.title}
                                className="w-full h-32 object-cover rounded-lg"
                            />

                            <div>
                                <h3 className="font-semibold text-lg mb-2">{selectedProperty.title}</h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4 mr-1"/>
                                    <span className="text-sm">{selectedProperty?.location?.address}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-teal-600">
                                    {selectedProperty.rentPricePerMonth} {selectedProperty.currency}
                                </span>
                                <Badge
                                    variant={selectedProperty.isAvailable ? 'default' : 'secondary'}
                                    className={selectedProperty.isAvailable ? 'bg-teal-600 hover:bg-teal-700' : ''}
                                >
                                    {selectedProperty.isAvailable ? 'Disponible Ahora' : 'Próximo Mes'}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Bed className="w-4 h-4 mr-1"/>
                                    <span>{selectedProperty.rooms}</span>
                                </div>
                                <div className="flex items-center">
                                    <Bath className="w-4 h-4 mr-1"/>
                                    <span>{selectedProperty.bathrooms}</span>
                                </div>
                                <div className="flex items-center">
                                    <Square className="w-4 h-4 mr-1"/>
                                    <span>{selectedProperty.area}m²</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-3">
                                {selectedProperty.description}
                            </p>

                            <div className="flex gap-2">
                                {selectedProperty.owner.whatsapp && (
                                    <Button
                                        size="sm"
                                        className="flex-1 bg-teal-600 hover:bg-teal-700"
                                        onClick={() => {
                                            const message = encodeURIComponent(`¡Hola! Estoy interesado en la propiedad: ${selectedProperty.title}`);
                                            window.open(`https://wa.me/${selectedProperty?.owner?.whatsapp?.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
                                        }}
                                    >
                                        Contactar
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                                    onClick={() => window.location.href = `/property/${selectedProperty._id}`}
                                >
                                    Ver Detalles
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                                <p>Haz clic en un marcador de propiedad para ver los detalles</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};