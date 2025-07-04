"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Heart,
    MapPin,
    BedDouble,
    Bath,
    Square,
    MessageCircle,
    Phone,
    ArrowRight,
    Star,
    Wifi,
    Car,
    Utensils
} from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/types/property";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/use-favorites";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface PropertyCardProps {
    property: Property;
    className?: string;
}

export const PropertyCard = ({ property, className = "" }: PropertyCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const isAuthenticated = !!session;
    const { isFavorite, addFavorite, removeFavorite, loading: favLoading } = useFavorites();

    const isLiked = isFavorite(property._id!);

    // Memoized handlers for better performance
    const handleContactWhatsApp = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (property.owner?.whatsapp) {
            const message = encodeURIComponent(`¡Hola! Estoy interesado en la propiedad: ${property.title}`);
            const phoneNumber = property.owner?.whatsapp.replace(/[^0-9]/g, '');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        }
    }, [property.owner?.whatsapp, property.title]);



    const handleContactPhone = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (property.owner?.phone) {
            window.open(`tel:${property.owner?.phone}`, '_self');
        }
    }, [property.owner?.phone]);

    const handleViewDetails = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/property/${property._id}`);
    }, [router, property._id]);

    const handleCardClick = useCallback(() => {
        router.push(`/property/${property._id}`);
    }, [router, property._id]);

    const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error("Por favor inicia sesión para guardar propiedades en favoritos");
            return;
        }

        try {
            if (isLiked) {
                await removeFavorite(property._id!);
                toast.success("Propiedad removida de favoritos");
            } else {
                await addFavorite(property._id!);
                toast.success("Propiedad agregada a favoritos");
            }
        } catch {
            toast.error("Error al actualizar favoritos");
        }
    }, [isAuthenticated, isLiked, removeFavorite, addFavorite, property._id]);

    const handleImageNavigation = useCallback((e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
    }, []);

    const handleImageLoad = useCallback(() => {
        setImageLoading(false);
        setImageError(false);
    }, []);

    const handleImageError = useCallback(() => {
        setImageLoading(false);
        setImageError(true);
    }, []);

    // Get property features for display
    const getPropertyFeatures = () => {
        const features = [];
        if (property.amenities?.wifi) features.push({ icon: Wifi, label: "WiFi" });
        if (property.amenities?.parking) features.push({ icon: Car, label: "Parking" });
        if (property.amenities?.kitchen) features.push({ icon: Utensils, label: "Cocina" });
        return features.slice(0, 3); // Show max 3 features
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

    const propertyFeatures = getPropertyFeatures();
    const hasImages = property.images && property.images.length > 0;
    const currentImage = hasImages ? property.images[currentImageIndex] : null;

    return (
        <TooltipProvider>
            <div
                className={`
                    card-enhanced group cursor-pointer overflow-hidden
                    hover:shadow-2xl transition-all duration-300 ease-out
                    ${className}
                `}
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick();
                    }
                }}
                aria-label={`Ver detalles de ${property.title}`}
            >
                {/* Image Section */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                    {hasImages ? (
                        <>
                            <div className="relative w-full h-full">
                                <Image
                                    src={currentImage?.url || "/placeholder.svg"}
                                    alt={property.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className={`
                                        object-cover transition-all duration-500 ease-out
                                        group-hover:scale-110 
                                        ${imageLoading ? 'blur-sm' : 'blur-0'}
                                    `}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                    priority={currentImageIndex === 0}
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

                            {/* Image Navigation */}
                            {property.images.length > 1 && (
                                <>
                                    {/* Navigation Arrows */}
                                    <button
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const prevIndex = currentImageIndex === 0 ? property.images.length - 1 : currentImageIndex - 1;
                                            setCurrentImageIndex(prevIndex);
                                        }}
                                        aria-label="Imagen anterior"
                                    >
                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    
                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const nextIndex = currentImageIndex === property.images.length - 1 ? 0 : currentImageIndex + 1;
                                            setCurrentImageIndex(nextIndex);
                                        }}
                                        aria-label="Siguiente imagen"
                                    >
                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
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

                                    {/* Image Counter */}
                                    <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs font-medium">
                                        {currentImageIndex + 1}/{property.images.length}
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

                    {/* Favorite Button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleFavoriteClick}
                                disabled={favLoading}
                                className={`
                                    absolute top-3 left-3 p-2 rounded-full transition-all duration-200
                                    ${isLiked 
                                        ? 'bg-red-500 text-white shadow-lg' 
                                        : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                                    }
                                    ${favLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
                                `}
                                aria-label={isLiked ? "Remover de favoritos" : "Agregar a favoritos"}
                            >
                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isLiked ? "Remover de favoritos" : "Agregar a favoritos"}</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Availability Badge */}
                    <div className="absolute top-3 right-3">
                        <Badge
                            variant={property.isAvailable ? 'default' : 'secondary'}
                            className={`
                                font-medium shadow-sm
                                ${property.isAvailable 
                                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                                    : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                }
                            `}
                        >
                            {property.isAvailable ? 'Disponible' : 'Próximamente'}
                        </Badge>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                    {/* Header */}
                    <div className="mb-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-200 line-clamp-2 leading-tight">
                                {property.title}
                            </h3>
                            <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-medium text-gray-700">4.8</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1 shrink-0" />
                            <span className="text-sm line-clamp-1">{property?.location?.address}</span>
                        </div>

                        <div className="flex items-end gap-2">
                            <span className="text-2xl sm:text-3xl font-bold text-teal-600">
                                {formatPrice()}
                            </span>
                            <span className="text-sm text-gray-500 mb-1">/mes</span>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        {property.rooms > 0 && (
                            <div className="flex items-center gap-1">
                                <BedDouble className="w-4 h-4" />
                                <span>{property.rooms}</span>
                            </div>
                        )}
                        {property.bathrooms > 0 && (
                            <div className="flex items-center gap-1">
                                <Bath className="w-4 h-4" />
                                <span>{property.bathrooms}</span>
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center gap-1">
                                <Square className="w-4 h-4" />
                                <span>{property.area}m²</span>
                            </div>
                        )}
                    </div>

                    {/* Property Features */}
                    {propertyFeatures.length > 0 && (
                        <div className="flex items-center gap-3 mb-4">
                            {propertyFeatures.map((feature, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            <feature.icon className="w-3 h-3" />
                                            <span className="hidden sm:inline">{feature.label}</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{feature.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    )}

                    {/* Contact Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        {property.owner?.whatsapp && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors"
                                        onClick={handleContactWhatsApp}
                                    >
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        <span className="hidden sm:inline">WhatsApp</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Contactar por WhatsApp</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                        
                        {property.owner?.phone && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
                                        onClick={handleContactPhone}
                                    >
                                        <Phone className="w-4 h-4 mr-1" />
                                        <span className="hidden sm:inline">Llamar</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Llamar por teléfono</p>
                                </TooltipContent>
                            </Tooltip>
                        )}

                        <Button
                            size="sm"
                            className="btn-primary flex-1"
                            onClick={handleViewDetails}
                        >
                            <span className="hidden sm:inline">Ver Detalles</span>
                            <ArrowRight className="w-4 h-4 sm:ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
};
