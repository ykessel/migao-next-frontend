'use client'
import {useState, useRef} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, Flag} from "lucide-react";
import {LoadingSpinner} from "@/components/app-components/loading-spinner";
import {Property} from "@/types/property";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Image from "next/image";
import { blurDataURL } from '@/lib/utils';
import { PropertyReportDialog } from '@/components/property/PropertyReportDialog';

// Custom property marker icon
const createPropertyIcon = () => {
    return L.divIcon({
        className: 'custom-property-marker',
        html: `
            <div style="
                background-color: #0d9488;
                color: white;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

// Custom selected location marker icon
const createSelectedLocationIcon = () => {
    return L.divIcon({
        className: 'selected-location-marker',
        html: `
            <div style="
                background-color: #dc2626;
                color: white;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

// Enhanced Popup Component with Image Gallery
const EnhancedPropertyPopup = ({ property }: { property: Property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const hasImages = property.images && property.images.length > 0;
    const currentImage = hasImages ? property.images[currentImageIndex] : null;

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    const handlePreviousImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const prevIndex = currentImageIndex === 0 ? property.images!.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const nextIndex = currentImageIndex === property.images!.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(nextIndex);
    };

    const handleImageNavigation = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    // Format currency display
    const formatPrice = () => {
        const price = property.rentPricePerMonth;
        const currency = property.currency;
        
        if (price >= 1000) {
            return `${(price / 1000).toFixed(1)}k ${currency}`;
        }
        return `${price} ${currency}`;
    };

    return (
        <div className="w-64 max-w-xs">
            {/* Image Gallery */}
            <div className="relative h-32 overflow-hidden bg-gray-100 rounded-t-lg">
                {hasImages ? (
                    <>
                        <div className="relative w-full h-full">
                            <Image
                                src={currentImage?.url || "/placeholder.svg"}
                                alt={property.title}
                                fill
                                sizes="320px"
                                className={`
                                    object-cover transition-all duration-500 ease-out
                                    ${imageLoading ? 'blur-sm' : 'blur-0'}
                                `}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                placeholder="blur"
                                blurDataURL={blurDataURL}
                            />
                            
                            {/* Loading skeleton */}
                            {imageLoading && (
                                <div className="absolute inset-0 skeleton animate-pulse" />
                            )}
                            
                            {/* Error state */}
                            {imageError && (
                                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                    <div className="text-gray-400 text-center">
                                        <Square className="w-12 h-12 mx-auto mb-2" />
                                        <p className="text-sm">Imagen no disponible</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation Arrows */}
                        {property.images && property.images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 opacity-0 hover:opacity-100 transition-all duration-200 z-10"
                                    onClick={handlePreviousImage}
                                    aria-label="Imagen anterior"
                                >
                                    <ChevronLeft className="w-3 h-3" />
                                </button>
                                
                                <button
                                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 opacity-0 hover:opacity-100 transition-all duration-200 z-10"
                                    onClick={handleNextImage}
                                    aria-label="Siguiente imagen"
                                >
                                    <ChevronRight className="w-3 h-3" />
                                </button>

                                {/* Image Indicators */}
                                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                                    {property.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => handleImageNavigation(e, index)}
                                            className={`
                                                w-2 h-2 rounded-full transition-all duration-200
                                                ${index === currentImageIndex 
                                                    ? 'bg-white shadow-md' 
                                                    : 'bg-white/50 hover:bg-white/80'
                                                }
                                            `}
                                            aria-label={`Ver imagen ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-gray-400 text-center">
                            <Square className="w-16 h-16 mx-auto mb-2" />
                            <p className="text-sm font-medium">Sin imágenes</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Property Details */}
            <div className="p-3 space-y-2">
                <div>
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 leading-tight">
                        {property.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-3 h-3 mr-1 shrink-0" />
                        <span className="text-xs line-clamp-1">
                            {(property?.location as { address?: string })?.address || 'Ubicación no disponible'}
                        </span>
                    </div>
                </div>

                <div className="flex items-end gap-1">
                    <span className="text-lg font-bold text-teal-600">
                        {formatPrice()}
                    </span>
                    <span className="text-xs text-gray-500 mb-0.5">/mes</span>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-3 text-xs text-gray-600">
                    {property.rooms > 0 && (
                        <div className="flex items-center gap-1">
                            <Bed className="w-3 h-3" />
                            <span>{property.rooms}</span>
                        </div>
                    )}
                    {property.bathrooms > 0 && (
                        <div className="flex items-center gap-1">
                            <Bath className="w-3 h-3" />
                            <span>{property.bathrooms}</span>
                        </div>
                    )}
                    {property.area && (
                        <div className="flex items-center gap-1">
                            <Square className="w-3 h-3" />
                            <span>{property.area}m²</span>
                        </div>
                    )}
                </div>

                {/* Availability Badge */}
                <div>
                    <Badge
                        variant={property.isAvailable ? 'default' : 'secondary'}
                        className={`
                            text-xs font-medium
                            ${property.isAvailable 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }
                        `}
                    >
                        {property.isAvailable ? 'Disponible' : 'Próximamente'}
                    </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1 pt-1">
                    <Button
                        size="sm"
                        className="btn-primary flex-1 text-xs py-1 px-2"
                        onClick={() => window.location.href = `/property/${property.propertyId}`}
                    >
                        Ver Detalles
                    </Button>
                    
                    <PropertyReportDialog property={property}>
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 text-xs py-1 px-2"
                        >
                            <Flag className="w-3 h-3" />
                        </Button>
                    </PropertyReportDialog>
                </div>
            </div>
        </div>
    );
};

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
                                            icon={createSelectedLocationIcon()}
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
                                            key={property.propertyId}
                                            position={[
                                                property?.location?.coordinates[1] || mapCenter.lat,
                                                property?.location?.coordinates[0] || mapCenter.lng
                                            ]}
                                            icon={createPropertyIcon()}
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
                                    onClick={() => window.location.href = `/property/${selectedProperty.propertyId}`}
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