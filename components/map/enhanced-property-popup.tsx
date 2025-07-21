import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, ArrowRight, Star, Eye } from "lucide-react";
import { Property } from "@/types/property";
import Link from "next/link";
import Image from 'next/image';
import AvailableBagde from "@/components/app-components/available-bagde";
import FavoriteButton from "@/components/app-components/favorite-button";

const EnhancedPropertyPopup = ({ property }: { property: Property }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const hasImages = property.images && property.images.length > 0;
  const mainImage = hasImages ? property.images[0] : null;

  // Format currency display
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
    <Card className="w-64 max-w-xs rounded-xl overflow-hidden shadow-lg">
      <div className="relative h-32 w-full bg-gray-100 flex items-center justify-center">
        {mainImage ? (
          <Image
            src={mainImage.url || "/placeholder.svg"}
            alt={property.title}
            fill
            sizes="256px"
            className={`object-cover transition-all duration-500 ease-out ${imageLoading ? 'blur-sm' : 'blur-0'}`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Square className="w-16 h-16 mx-auto mb-2 text-gray-400" />
          </div>
        )}
        <AvailableBagde isAvailable={property.isAvailable} />
        <div className="absolute top-2 right-2 z-20">
          <FavoriteButton isLiked={false} favLoading={false} onClick={() => {}} />
        </div>
      </div>
      <CardHeader className="p-3 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {property.title}
          </h3>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1 shrink-0" />
          <span className="truncate">{locationAddress}</span>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 grid gap-2">
        <div className="text-lg font-bold text-emerald-600">
          {formatPrice()} <span className="text-xs text-gray-500 font-normal">/mes</span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-gray-700">
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
          {typeof property.publicationViews === "number" && (
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{property.publicationViews}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
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
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EnhancedPropertyPopup;
