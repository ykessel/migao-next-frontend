import { useState } from "react";
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from "lucide-react";
import { blurDataURL } from '@/lib/utils';
import { PropertyReportDialog } from '@/components/property/property-report-dialog';
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';


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
                        onClick={() => window.location.href = `/property/${property.slug}`}
                    >
                        Ver Detalles
                    </Button>
                    
                    <PropertyReportDialog property={property} />
                </div>
            </div>
        </div>
    );
};

export default EnhancedPropertyPopup;
