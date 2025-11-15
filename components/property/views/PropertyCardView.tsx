import {Property} from '@/types/property';
import {PropertyCard} from '../PropertyCard';

interface PropertyCardViewProps {
    properties: Property[];
    isFavorite: (id: string) => boolean;
    addFavorite: (id: string) => Promise<void>;
    removeFavorite: (id: string) => Promise<void>;
    favLoading: boolean;
}

/**
 * PropertyCardView Component
 * 
 * Renders properties in a card grid layout.
 * Follows Single Responsibility Principle - Only handles card grid presentation.
 * 
 * @param properties - Array of properties to display
 * @param isFavorite - Function to check if property is favorite
 * @param addFavorite - Function to add property to favorites
 * @param removeFavorite - Function to remove property from favorites
 * @param favLoading - Loading state for favorites
 */
export function PropertyCardView({
    properties,
    isFavorite,
    addFavorite,
    removeFavorite,
    favLoading,
}: PropertyCardViewProps) {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, idx) => (
                <PropertyCard
                    key={property._id || `property-${idx}`}
                    property={property}
                    isFavorite={Boolean(isFavorite(property._id!))}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    favLoading={favLoading}
                />
            ))}
        </div>
    );
}

