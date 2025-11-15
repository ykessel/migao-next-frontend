'use client';

import {Button} from '@/components/ui/button';
import {Edit, Eye, MapPin, Trash2} from 'lucide-react';
import {Property} from '@/types/property';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {PropertyImageCarousel} from "@/components/property/PropertyImageCarousel";
import {AvailableBadge} from "@/components/shared/AvailableBadge";
import {TooltipProvider} from "@/components/ui/tooltip";

interface UserPropertyCardProps {
    property: Property;
    onEdit: (property: Property) => void;
    onView: (property: Property) => void;
    onDelete: (property: Property) => void;
}

/**
 * UserPropertyCard Component
 * 
 * Displays a single property card for the user's property list with actions.
 * Follows Single Responsibility Principle - Only handles presentation and user interactions.
 * 
 * @param property - The property data to display
 * @param onEdit - Callback when edit button is clicked
 * @param onView - Callback when view button is clicked
 * @param onDelete - Callback when delete is confirmed
 */
export function UserPropertyCard({property, onEdit, onView, onDelete}: UserPropertyCardProps) {
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
        <TooltipProvider>
            <Card className="w-full rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
                {/* Property Image */}
                <div className="relative h-40 w-full bg-gray-100 flex items-center justify-center">
                    <PropertyImageCarousel images={property.images || []} title={property.title}/>
                    <AvailableBadge isAvailable={property.isAvailable}/>
                </div>

                {/* Property Information */}
                <CardHeader className="p-4 pb-2">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                        {property.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1 shrink-0"/>
                        <span className="truncate">{locationAddress}</span>
                    </div>
                </CardHeader>

                {/* Pricing */}
                <CardContent className="p-4 pt-0">
                    <div className="text-xl font-bold text-emerald-600">
                        {formatPrice()}
                    </div>
                </CardContent>

                {/* Action Buttons */}
                <CardFooter className="p-4 pt-0 flex gap-2 justify-start">
                    <Button
                        onClick={() => onView(property)}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                        title="Ver propiedad"
                    >
                        <Eye className="w-4 h-4"/>
                    </Button>
                    <Button
                        onClick={() => onEdit(property)}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        title="Editar propiedad"
                    >
                        <Edit className="w-4 h-4"/>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Eliminar propiedad"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar propiedad?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. ¿Estás seguro de que deseas
                                    eliminar esta propiedad?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete(property)}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </TooltipProvider>
    );
}

