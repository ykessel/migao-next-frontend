"use client";
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Star, Eye, Bed, Bath, Square, ArrowRight } from "lucide-react"
import {useState, useCallback} from "react";
import {Property} from "@/types/property";
import {toast} from "sonner";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
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
    const isLiked = isFavorite;

    const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error("Por favor inicia sesión para guardar propiedades en favoritos");
            return;
        }

        try {
            if (isLiked) {
                await removeFavorite?.(property._id!);
                toast.success("Propiedad removida de favoritos");
            } else {
                await addFavorite?.(property._id!);
                toast.success("Propiedad agregada a favoritos");
            }
        } catch {
            toast.error("Error al actualizar favoritos");
        }
    }, [isAuthenticated, isLiked, removeFavorite, addFavorite, property._id]);

    const handleImageLoad = useCallback(() => {
        setImageLoading(false);
        setImageError(false);
    }, []);

    const handleImageError = useCallback(() => {
        setImageLoading(false);
        setImageError(true);
    }, []);

    // Format currency display
    const formatPrice = () => {
        const price = property.rentPricePerMonth;
        const currency = property.currency;

        if (price >= 1000) {
            return `${(price / 1000).toFixed(1)}k ${currency}`;
        }
        return `${price} ${currency}`;
    };

    const hasImages = property.images && property.images.length > 0;
    const currentImage = hasImages ? property.images[currentImageIndex] : null;
    const locationAddress = (property?.location as { address?: string })?.address || 'Ubicación no disponible';

    return (
        <TooltipProvider>
            <Card className={`w-full max-w-xs rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className} ${isListView ? 'flex flex-row items-stretch h-full' : ''}`}>
                <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
                    {hasImages ? (
                        <>
                                <Image
                                    src={currentImage?.url || "/placeholder.svg"}
                                    alt={property.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className={`object-cover transition-all duration-500 ease-out ${imageLoading ? 'blur-sm' : 'blur-0'}`}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                    priority={currentImageIndex === 0}
                                    placeholder="blur"
                                    quality={60}
                                    blurDataURL={blurDataURL}
                                />

                                {imageLoading && (
                                    <div className="absolute inset-0 skeleton animate-pulse"/>
                                )}

                                {imageError && (
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                        <div className="text-gray-400 text-center">
                                            <Square className="w-12 h-12 mx-auto mb-2"/>
                                            <p className="text-sm">Imagen no disponible</p>
                                        </div>
                                    </div>
                                )}

                            {property.images.length > 1 && (
                                <>
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

                                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                                        {property.images.map((_, index) => (
                                            <span
                                                key={index}
                                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                                    index === currentImageIndex
                                                    ? 'bg-white shadow-md'
                                                    : 'bg-white/50 hover:bg-white/80'
                                                }`}
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
                                <Square className="w-16 h-16 mx-auto mb-2"/>
                                <p className="text-sm font-medium">Sin imágenes</p>
                            </div>
                        </div>
                    )}

                    {!property.isAvailable && (
                        <Badge className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Próximamente
                        </Badge>
                    )}

                    {property.isAvailable && (
                        <Badge className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Disponible
                        </Badge>
                    )}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleFavoriteClick}
                                disabled={favLoading}
                                className={`absolute top-3 left-3 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white'} ${favLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                                aria-label={isLiked ? "Remover de favoritos" : "Agregar a favoritos"}
                            >
                                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : 'text-gray-600'}`}/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isLiked ? "Remover de favoritos" : "Agregar a favoritos"}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{property.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>4.8</span>
                            </div>
                        </div>
                                </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1 shrink-0" />
                        <span className="truncate">{locationAddress}</span>
                            </div>
                </CardHeader>

                <CardContent className="p-4 pt-0 grid gap-3">
                    <div className="text-2xl font-bold text-emerald-600">
                        {formatPrice()} /mes
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-700">
                        {property.rooms > 0 && (
                            <div className="flex items-center gap-1">
                                <Bed className="h-4 w-4" />
                                <span>{property.rooms}</span>
                            </div>
                        )}
                        {property.bathrooms > 0 && (
                            <div className="flex items-center gap-1">
                                <Bath className="h-4 w-4" />
                                <span>{property.bathrooms}</span>
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center gap-1">
                                <Square className="h-4 w-4" />
                                <span>{property.area}m²</span>
                            </div>
                        )}
                        {typeof property.publicationViews === 'number' && (
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{property.publicationViews}</span>
                                </div>
                            )}
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                        <Link
                            href={`/property/${property.slug || ''}`}
                            prefetch={true}
                        className="block w-full"
                            aria-label={`Ver detalles de ${property.title}`}
                            title={`Ver detalles de ${property.title}`}
                        >
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                            Ver Detalles
                            <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                </CardFooter>
            </Card>
        </TooltipProvider>
    );
};
