"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {MapPin, Star, Eye, Bed, Bath, Square, ArrowRight} from "lucide-react";
import {PropertyImageCarousel} from "./PropertyImageCarousel";
import {Property} from "@/types/property";
import {toast} from "sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {useSession} from "next-auth/react";
import Link from "next/link";
import FavoriteButton from "../app-components/favorite-button";
import {AvailableBadge} from "@/components/shared/AvailableBadge";
import {formatPropertyPrice} from "./utils";

/**
 * PropertyCard Component Props
 */
interface PropertyCardProps {
    property: Property;
    className?: string;
    isFavorite?: boolean;
    addFavorite?: (propertyId: string) => Promise<void>;
    removeFavorite?: (propertyId: string) => Promise<void>;
    favLoading?: boolean;
}

/**
 * PropertyCard Component
 * 
 * Displays a property in a card layout with image carousel, details, and actions.
 * Supports both card and list view modes.
 * 
 * Features:
 * - Property image carousel
 * - Availability badge
 * - Favorite button
 * - Property details (price, location, rooms, bathrooms, area, views)
 * - Link to property details page
 * 
 * Follows SRP - Focuses on property card presentation.
 * Logic for favorites is delegated to parent component via props.
 * 
 * @param property - Property data to display
 * @param className - Additional CSS classes (use "flex flex-row" for list view)
 * @param isFavorite - Whether the property is in user's favorites
 * @param addFavorite - Function to add property to favorites
 * @param removeFavorite - Function to remove property from favorites
 * @param favLoading - Loading state for favorite actions
 */
export const PropertyCard = ({
    property,
    className = "",
    isFavorite,
    addFavorite,
    removeFavorite,
    favLoading,
}: PropertyCardProps) => {
    const isListView = className.includes("flex flex-row");
    const {data: session} = useSession();
    const isAuthenticated = !!session;
    const isLiked = isFavorite;

    /**
     * Handle favorite button click
     */
    const handleFavoriteClick = (e: React.MouseEvent) => {
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
    };

    const locationAddress =
        (property?.location as { address?: string })?.address ||
        "Ubicación no disponible";

    const priceInfo = formatPropertyPrice(property);

    return (
        <TooltipProvider>
            <Card
                className={`w-full max-w-xs overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className} ${
                    isListView ? "flex flex-row items-stretch h-full" : ""
                }`}
            >
                {/* Property Image */}
                <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
                    <PropertyImageCarousel images={property.images || []} title={property.title}/>
                    <AvailableBadge isAvailable={property.isAvailable}/>
                    <FavoriteButton
                        isLiked={!!isLiked}
                        favLoading={favLoading}
                        onClick={handleFavoriteClick}
                        aria-label={
                            isLiked ? "Remover de favoritos" : "Agregar a favoritos"
                        }
                    />
                </div>

                {/* Property Information */}
                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {property.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                                <span>{property.averageRating}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1 shrink-0"/>
                        <span className="truncate">{locationAddress}</span>
                    </div>
                </CardHeader>

                {/* Property Details */}
                <CardContent className="p-4 pt-0 grid gap-3">
                    <div className="text-2xl font-bold text-emerald-600">
                        {priceInfo.formattedPrice} /{priceInfo.period}
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
                        {typeof property.publicationViews === "number" && (
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4"/>
                                <span>{property.publicationViews}</span>
                            </div>
                        )}
                    </div>
                </CardContent>

                {/* View Details Button */}
                <CardFooter className="p-4 pt-0">
                    <Link
                        href={`/property/${property.slug || ""}`}
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
                            <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </TooltipProvider>
    );
};

