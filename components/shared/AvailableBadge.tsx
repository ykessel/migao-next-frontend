import {Badge} from "@/components/ui/badge";

/**
 * AvailableBadge Component Props
 */
interface AvailableBadgeProps {
    isAvailable: boolean;
}

/**
 * AvailableBadge Component
 * 
 * Displays a badge indicating whether a property is available or coming soon.
 * Positioned absolutely in the top-right corner of a property card.
 * 
 * Follows SRP - Only handles the availability badge display.
 * 
 * @param isAvailable - Whether the property is currently available
 */
export function AvailableBadge({isAvailable}: AvailableBadgeProps) {
    return (
        <>
            {!isAvailable ? (
                <Badge
                    className="absolute top-3 right-3 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Próximamente
                </Badge>
            ) : (
                <Badge
                    className="absolute top-3 right-3 bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Disponible
                </Badge>
            )}
        </>
    );
}

// Default export for backward compatibility
export default AvailableBadge;

