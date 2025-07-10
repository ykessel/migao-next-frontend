"use client";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
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
    Utensils,
    Tv,
    Snowflake,
    Refrigerator,
    WashingMachine,
    Microwave,
    Building2,
    MemoryStick,
    Car,
    Leaf,
    Home,
    WavesLadder,
    Flame,
    CheckCircle,
} from "lucide-react";
import {useState, useCallback} from "react";
import {Property} from "@/types/property";
import {toast} from "sonner";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {blurDataURL} from '@/lib/utils'
import Link from 'next/link'

interface PropertyCardProps {
    property: Property;
    className?: string;
    isFavorite?: boolean;
    addFavorite?: (propertyId: string) => Promise<void>;
    removeFavorite?: (propertyId: string) => Promise<void>;
    favLoading?: boolean;
}

export const PropertyCard = ({
                                 property,
                                 className = "",
                                 isFavorite,
                                 addFavorite,
                                 removeFavorite,
                                 favLoading
                             }: PropertyCardProps) => {
    const isListView = className.includes('flex flex-row');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const {data: session} = useSession();
    const isAuthenticated = !!session;
    // Remove: const { isFavorite, addFavorite, removeFavorite, loading: favLoading } = useFavorites();

    // Use the prop instead
    const isLiked = isFavorite;

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

    const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error("Por favor inicia sesión para guardar propiedades en favoritos");
            return;
        }

        try {
            if (isLiked) {
                await removeFavorite?.(property.propertyId!);
                toast.success("Propiedad removida de favoritos");
            } else {
                await addFavorite?.(property.propertyId!);
                toast.success("Propiedad agregada a favoritos");
            }
        } catch {
            toast.error("Error al actualizar favoritos");
        }
    }, [isAuthenticated, isLiked, removeFavorite, addFavorite, property.propertyId]);

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

    // Get property features for display (all amenities)
    const AMENITY_ICONS: { [key: string]: { icon: React.ComponentType<{ className?: string }>, label: string } } = {
        hasWifi: {icon: Wifi, label: "WiFi"},
        kitchen: {icon: Utensils, label: "Cocina"},
        hasTV: {icon: Tv, label: "TV"},
        hasAC: {icon: Snowflake, label: "A/C"},
        hasFridge: {icon: Refrigerator, label: "Refrigerador"},
        hasWasher: {icon: WashingMachine, label: "Lavadora"},
        hasMicrowave: {icon: Microwave, label: "Microondas"},
        hasElevator: {icon: Building2, label: "Elevador"},
        hasBalcony: {icon: MemoryStick, label: "Balcón"},
        garage: {icon: Car, label: "Garaje"},
        garden: {icon: Leaf, label: "Jardín"},
        terrace: {icon: Home, label: "Terraza"},
        furnished: {icon: CheckCircle, label: "Amueblado"},
        hasPool: {icon: WavesLadder, label: "Piscina"},
        gasAvailability: {icon: Flame, label: "Gas"},
    };

    const getPropertyFeatures = () => {
        const features: { icon: React.ComponentType<{ className?: string }>; label: string; }[] = [];
        if (!property.amenities) return features;
        for (const [key, value] of Object.entries(property.amenities)) {
            if (
                value &&
                AMENITY_ICONS[key]
            ) {
                // For gasAvailability, only show if not "NONE"
                if (key === "gasAvailability" && value === "NONE") continue;
                features.push({
                    icon: AMENITY_ICONS[key].icon,
                    label: key === "gasAvailability"
                        ? `Gas: ${String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase()}`
                        : AMENITY_ICONS[key].label,
                });
            }
        }
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
                    card-enhanced group cursor-pointer
                    transition-all duration-300 ease-out
                    ${className}
                    ${isListView ? 'flex flex-row items-stretch h-full' : ''}
                `}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalles de ${property.title}`}
            >
                {/* Image Section */}
                <div
                    className={`relative overflow-hidden bg-gray-100 ${isListView ? 'w-48 h-32 sm:h-40 flex-shrink-0' : 'h-56 sm:h-64'}`}>
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
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
                                />

                                {/* Loading skeleton */}
                                {imageLoading && (
                                    <div className="absolute inset-0 skeleton animate-pulse"/>
                                )}

                                {/* Error state */}
                                {imageError && (
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                        <div className="text-gray-400 text-center">
                                            <Square className="w-12 h-12 mx-auto mb-2"/>
                                            <p className="text-sm">Imagen no disponible</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Image Navigation */}
                            {property?.images && property?.images?.length > 1 && (
                                <>
                                    {/* Navigation Arrows */}
                                    <button
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const prevIndex = currentImageIndex === 0 ? property?.images.length - 1 : currentImageIndex - 1;
                                            setCurrentImageIndex(prevIndex);
                                        }}
                                        aria-label="Imagen anterior"
                                    >
                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 19l-7-7 7-7"/>
                                        </svg>
                                    </button>

                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const nextIndex = currentImageIndex === property?.images.length - 1 ? 0 : currentImageIndex + 1;
                                            setCurrentImageIndex(nextIndex);
                                        }}
                                        aria-label="Siguiente imagen"
                                    >
                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </button>

                                    {/* Image Indicators */}
                                    <div
                                        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
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
                        <div
                            className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-gray-400 text-center">
                                <Square className="w-16 h-16 mx-auto mb-2"/>
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
                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}/>
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
                <div className={`${isListView ? 'flex-1 p-4 flex flex-col justify-between' : 'p-4 sm:p-5'}`}>
                    {/* Header */}
                    <div className={isListView ? 'flex items-start justify-between gap-4' : 'mb-3'}>
                        <div className={isListView ? 'flex-1' : 'mb-3'}>
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className={`font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-200 leading-tight ${isListView ? 'text-lg line-clamp-1' : 'text-lg sm:text-xl line-clamp-2'}`}>
                                    {property.title}
                                </h3>
                                <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                                    <Star className="w-4 h-4 fill-current"/>
                                    <span className="text-sm font-medium text-gray-700">4.8</span>
                                </div>
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1 shrink-0"/>
                                <span className="text-sm line-clamp-1">{(property?.location as {
                                    address?: string
                                })?.address || 'Ubicación no disponible'}</span>
                            </div>

                            {!isListView && (
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl sm:text-3xl font-bold text-teal-600">
                                        {formatPrice()}
                                    </span>
                                    <span className="text-sm text-gray-500 mb-1">/mes</span>
                                </div>
                            )}
                        </div>

                        {isListView && (
                            <div className="text-right">
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold text-teal-600">
                                        {formatPrice()}
                                    </span>
                                    <span className="text-sm text-gray-500 mb-1">/mes</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Property Details */}
                    <div className={`flex items-center gap-4 text-sm text-gray-600 ${isListView ? 'mb-3' : 'mb-4'}`}>
                        {property.rooms > 0 && (
                            <div className="flex items-center gap-1">
                                <BedDouble className="w-4 h-4"/>
                                <span>{property.rooms}</span>
                            </div>
                        )}
                        {property.bathrooms > 0 && (
                            <div className="flex items-center gap-1">
                                <Bath className="w-4 h-4"/>
                                <span>{property.bathrooms}</span>
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center gap-1">
                                <Square className="w-4 h-4"/>
                                <span>{property.area}m²</span>
                            </div>
                        )}
                    </div>

                    {/* Property Features */}
                    {propertyFeatures.length > 0 && (
                        <div className={`flex items-center gap-3 ${isListView ? 'mb-3' : 'mb-4'}`}>
                            {propertyFeatures.map((feature, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <div
                                            className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            <feature.icon className="w-3 h-3"/>
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
                    <div
                        className={`flex items-center gap-2 pt-3 border-t border-gray-100 ${isListView ? 'justify-end' : ''}`}>
                        {property.owner?.whatsapp && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className={`hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors ${isListView ? '' : 'flex-1'}`}
                                        onClick={handleContactWhatsApp}
                                    >
                                        <MessageCircle className="w-4 h-4 mr-1"/>
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
                                        className={`hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors ${isListView ? '' : 'flex-1'}`}
                                        onClick={handleContactPhone}
                                    >
                                        <Phone className="w-4 h-4 mr-1"/>
                                        <span className="hidden sm:inline">Llamar</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Llamar por teléfono</p>
                                </TooltipContent>
                            </Tooltip>
                        )}

                        <Link
                            href={`/property/${property.propertyId || ''}`}
                            prefetch={true}
                            className="block hover:shadow-lg transition-shadow"
                        >
                            <Button
                                size="sm"
                                className={`btn-primary ${isListView ? '' : 'flex-1'}`}
                            >
                                <span className="hidden sm:inline">Ver Detalles</span>
                                <ArrowRight className="w-4 h-4 sm:ml-1"/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
};
