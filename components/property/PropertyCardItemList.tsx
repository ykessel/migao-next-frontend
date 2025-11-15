"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {MapPin, Star, Eye, Bed, Bath, Square, ArrowRight} from "lucide-react";
import FavoriteButton from "../app-components/favorite-button";
import {AvailableBadge} from "@/components/shared/AvailableBadge";
import {Property} from "@/types/property";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useCallback} from "react";
import {toast} from "sonner";
import {PropertyImageCarousel} from "./PropertyImageCarousel";

/**
 * PropertyCardItemList Component Props
 */
interface PropertyCardItemListProps {
    property: Property;
    className?: string;
    isFavorite?: boolean;
    addFavorite?: (propertyId: string) => Promise<void>;
    removeFavorite?: (propertyId: string) => Promise<void>;
    favLoading?: boolean;
}

/**
 * PropertyCardItemList Component
 * 
 * Displays a property in a horizontal list/row layout.
 * Optimized for list views with more horizontal space.
 * 
 * Features:
 * - Horizontal card layout
 * - Property image carousel
 * - Availability badge
 * - Favorite button
 * - Property details (price, location, rooms, bathrooms, area, views)
 * - Link to property details page
 * 
 * Follows SRP - Focuses on property list item presentation.
 * Similar to PropertyCard but with horizontal layout.
 * 
 * @param property - Property data to display
 * @param className - Additional CSS classes
 * @param isFavorite - Whether the property is in user's favorites
 * @param addFavorite - Function to add property to favorites
 * @param removeFavorite - Function to remove property from favorites
 * @param favLoading - Loading state for favorite actions
 */
const PropertyCardItemList = ({
    property,
    className = "",
    isFavorite,
    addFavorite,
    removeFavorite,
    favLoading,
}: PropertyCardItemListProps) => {
    const {data: session} = useSession();
    const isAuthenticated = !!session;
    const isLiked = isFavorite;

    /**
     * Handle favorite button click
     */
    const handleFavoriteClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();

            if (!isAuthenticated) {
                toast.error(
                    "Por favor inicia sesión para guardar propiedades en favoritos"
                );
                return;
            }

            try {
                if (isLiked) {
                    removeFavorite?.(property._id!);
                    toast.success("Propiedad removida de favoritos");
                } else {
                    addFavorite?.(property._id!);
                    toast.success("Propiedad agregada a favoritos");
                }
            } catch {
                toast.error("Error al actualizar favoritos");
            }
        },
        [isAuthenticated, isLiked, property._id, addFavorite, removeFavorite]
    );

    /**
     * Format price with currency
     */
    const formatPrice = () => {
        const price = property.rentPricePerMonth;
        const currency = property.currency;

        if (price >= 1000) {
            return `${(price / 1000).toFixed(1)}k ${currency}`;
        }
        return `${price} ${currency}`;
    };

    const locationAddress =
        (property?.location as { address?: string })?.address ||
        "Ubicación no disponible";

    return (
        <Card
            className={`w-full flex rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
            {/* Image Section */}
            <div className="relative w-48 sm:w-64 flex-shrink-0 bg-gray-100">
                <PropertyImageCarousel images={property.images || []} title={property.title}/>
                <AvailableBadge isAvailable={property.isAvailable}/>
                <FavoriteButton
                    isLiked={!!isLiked}
                    favLoading={favLoading}
                    onClick={handleFavoriteClick}
                    aria-label={isLiked ? "Remover de favoritos" : "Agregar a favoritos"}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 min-w-0">
                <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 flex-1">
                            {property.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 flex-shrink-0">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                            <span>4.8</span>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0"/>
                        <span className="truncate">{locationAddress}</span>
                    </div>
                </CardHeader>

                <CardContent className="p-4 pt-2 flex-1">
                    <div className="text-3xl font-bold text-emerald-600 mb-3">
                        {formatPrice()} /mes
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                        {property.rooms > 0 && (
                            <div className="flex items-center gap-1">
                                <Bed className="h-4 w-4"/>
                                <span>{property.rooms} hab</span>
                            </div>
                        )}
                        {property.bathrooms > 0 && (
                            <div className="flex items-center gap-1">
                                <Bath className="h-4 w-4"/>
                                <span>{property.bathrooms} baños</span>
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center gap-1">
                                <Square className="h-4 w-4"/>
                                <span>{property.area}m²</span>
                            </div>
                        )}
                        {typeof property.publicationViews === "number" && (
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4"/>
                                <span>{property.publicationViews} vistas</span>
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Link
                        href={`/property/${property.slug || ""}`}
                        prefetch={true}
                        className="block w-full sm:w-auto"
                        aria-label={`Ver detalles de la propiedad: ${property.title}`}
                    >
                        <Button
                            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white"
                            aria-label={`Botón para ver detalles de la propiedad: ${property.title}`}
                        >
                            Ver Detalles
                            <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </Link>
                </CardFooter>
            </div>
        </Card>
    );
};

export default PropertyCardItemList;

