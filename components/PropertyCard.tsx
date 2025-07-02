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
    ArrowRight
} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Property} from "@/types/property";
import {PROPERTY_TYPE} from "@/constants/property-type.enum";
import {toast} from "sonner";
import {useFavorites} from "@/hooks/use-favorites";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";


interface PropertyCardProps {
    property: Property;
}

export const PropertyCard = ({property}: PropertyCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter();
    const { isAuthenticated, login } = useAuth();
    const { isFavorite, addFavorite, removeFavorite, loading: favLoading } = useFavorites();

    const isLiked = isFavorite(property._id!);

    const handleContactWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (property.owner.whatsapp) {
            const message = encodeURIComponent(`¡Hola! Estoy interesado en la propiedad: ${property.title}`);
            window.open(`https://wa.me/${property.owner.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
        }
    };

    const handleContactTelegram = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (property.owner.telegram) {
            window.open(`https://t.me/${property.owner.telegram.replace('@', '')}`, '_blank');
        }
    };

    const handleContactPhone = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (property.owner.phone) {
            window.open(`tel:${property.owner.phone}`, '_self');
        }
    };

    const handleViewDetails = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/property/${property._id}`);
    };

    const handleCardClick = () => {
        router.push(`/property/${property._id}`);
    };

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error("Por favor inicia sesión para guardar propiedades en favoritos");
            // login();
            return;
        }

        if (isLiked) {
            await removeFavorite(property._id!);
            toast.success("Propiedad removida de favoritos");
        } else {
            await addFavorite(property._id!);
            toast.success("Propiedad agregada a favoritos");
        }
    };

    const handleImageNavigation = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    return (
        <div
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Image Carousel Section */}
            <div className="relative h-64 overflow-hidden">
                {property.images && property.images.length > 0 ? (
                    <>
                        <Image
                            src={property.images[currentImageIndex]?.url || "/placeholder.jpg"}
                            alt={property.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Carousel Navigation Arrows */}
                        {property.images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white z-10"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setCurrentImageIndex((prev) => prev === 0 ? property.images.length - 1 : prev - 1);
                                    }}
                                    aria-label="Anterior imagen"
                                >
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white z-10"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setCurrentImageIndex((prev) => prev === property.images.length - 1 ? 0 : prev + 1);
                                    }}
                                    aria-label="Siguiente imagen"
                                >
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </>
                        )}
                        {/* Carousel Dots */}
                        {property.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                                {property.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => handleImageNavigation(e, index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                        aria-label={`Ver imagen ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <Image
                        src={'/home5.jpg'}
                        alt={property.title}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                )}

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                        isLiked ? 'bg-coral-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                    disabled={favLoading}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}/>
                </button>

                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                    <Badge
                        variant={property.isAvailable ? 'default' : 'secondary'}
                        className={property.isAvailable ? 'bg-teal-600 hover:bg-teal-700' : ''}
                    >
                        {property.isAvailable ? 'Disponible Ahora' : 'Próximo Mes'}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex flex-col items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-1">
                        {property.title}
                    </h3>
                    <div className="flex text-nowrap items-end">
                        <span className="text-2xl font-bold text-teal-600">
                            {property.rentPricePerMonth} {property.currency}
                        </span>
                        <p className="text-sm text-gray-500">/mes</p>
                    </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1"/>
                    <span className="text-sm line-clamp-2">{property?.location?.address}</span>
                </div>

                {/* Property Details */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <BedDouble className="w-4 h-4 mr-1"/>
                        <span>{property.rooms} habitaciones</span>
                    </div>
                    <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1"/>
                        <span>{property.bathrooms} baño</span>
                    </div>
                    <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1"/>
                        <span>{property.area}m²</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                        {PROPERTY_TYPE[property.propertyType]}
                    </Badge>
                    {property.amenities.furnished && (
                        <Badge variant="outline" className="text-xs text-teal-600 border-teal-600">
                            Amueblado
                        </Badge>
                    )}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                </p>

                {/* Contact Buttons */}
                <div className="flex space-x-2">
                    {property.owner.whatsapp && (
                        <Button
                            onClick={handleContactWhatsApp}
                            size="sm"
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        >
                            <MessageCircle className="w-4 h-4 mr-1"/>
                            WhatsApp
                        </Button>
                    )}

                    {property.owner.telegram && (
                        <Button
                            onClick={handleContactTelegram}
                            size="sm"
                            variant="outline"
                            className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                        >
                            <MessageCircle className="w-4 h-4 mr-1"/>
                            Telegram
                        </Button>
                    )}

                    {property.owner.phone && (
                        <Button
                            onClick={handleContactPhone}
                            size="sm"
                            variant="outline"
                            className="px-3"
                        >
                            <Phone className="w-4 h-4"/>
                        </Button>
                    )}

                    <Button onClick={handleViewDetails} variant="ghost" size="sm"
                            className="px-3 items-center text-teal-600 hover:bg-teal-600 hover:text-white">
                        Ver detalles <ArrowRight className="w-4 h-4 mt-1"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};
