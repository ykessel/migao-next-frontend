import Image from "next/image"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {MapPin, Star, Eye, Bed, Bath, Square, ArrowRight} from "lucide-react"
import FavoriteButton from "../app-components/favorite-button";
import AvailableBagde from "../app-components/available-bagde";
import { Property } from '@/types/property';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { toast } from 'sonner';


interface PropertyCardItemListProps {
  property: Property;
  className?: string;
  isFavorite?: boolean;
  addFavorite?: (propertyId: string) => Promise<void>;
  removeFavorite?: (propertyId: string) => Promise<void>;
  favLoading?: boolean;
}

export default function PropertyCardItemList({
  property,
  className = '',
  isFavorite,
  addFavorite,
  removeFavorite,
  favLoading
}: PropertyCardItemListProps) {
  const { data: session } = useSession();
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

  const hasImages = property.images && property.images.length > 0;
  const imageUrl = hasImages ? property.images[0].url : "/placeholder.png";
  const locationAddress = (property?.location as { address?: string })?.address || 'Ubicación no disponible';
  const formatPrice = () => {
    const price = property.rentPricePerMonth;
    const currency = property.currency;
    if (price >= 1000) {
      return `${(price / 1000).toFixed(1)}k ${currency}`;
    }
    return `${price} ${currency}`;
  };
  return (
        <Card
            className={`w-full flex rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
            {/* Image Section */}
            <div className="relative w-48 sm:w-64 flex-shrink-0 bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={property.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-xl"
                />
                <AvailableBagde isAvailable={property.isAvailable} />
                <FavoriteButton
                  isLiked={!!isLiked}
                  favLoading={favLoading}
                  onClick={handleFavoriteClick}
                  aria-label={isLiked ? "Remover de favoritos" : "Agregar a favoritos"}
                />
            </div>

            {/* Data Section */}
            <div className="flex flex-col w-full p-4 truncate">
                <CardHeader className="p-0 pb-2 w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{property.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 flex-shrink-0 ml-4">
                          {typeof property.averageRating === 'number' && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                              <span>{property.averageRating.toFixed(1)}</span>
                            </div>
                          )}
                          {typeof property.publicationViews === 'number' && (
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4"/>
                              <span>{property.publicationViews}</span>
                            </div>
                          )}
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1 shrink-0"/>
                        <span className="truncate flex-1" title={locationAddress}>{locationAddress}</span>
                    </div>
                </CardHeader>

                <CardContent className="p-0 pt-2 flex-grow grid gap-2">
                    <div className="text-xl font-bold text-emerald-600">
                      {formatPrice()} /mes
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-700">
                      {property.rooms > 0 && (
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4"/>
                          <span>{property.rooms}</span>
                        </div>
                      )}
                      {property.bathrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4"/>
                          <span>{property.bathrooms}</span>
                        </div>
                      )}
                      {property.area && (
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4"/>
                          <span>{property.area}m²</span>
                        </div>
                      )}
                    </div>
                </CardContent>

                <CardFooter className="p-0 pt-4">
                  <Link
                    href={`/property/${property.slug || ''}`}
                    prefetch={true}
                    className="block w-full cursor-pointer"
                    aria-label={`Ver detalles de la propiedad: ${property.title}`}
                    title={`Ver detalles de ${property.title}`}
                    tabIndex={0}
                  >
                    <Button
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer"
                      aria-label={`Botón para ver detalles de la propiedad: ${property.title}`}
                      tabIndex={0}
                    >
                      Ver Detalles
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" focusable="false" />
                    </Button>
                  </Link>
                </CardFooter>
            </div>
        </Card>
    )
}
