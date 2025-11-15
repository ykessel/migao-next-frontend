import {Property} from '@/types/property';
import PropertyCardItemList from '@/components/property/PropertyCardItemList';

interface PropertyListViewProps {
    properties: Property[];
    isFavorite: (id: string) => boolean;
    addFavorite: (id: string) => Promise<void>;
    removeFavorite: (id: string) => Promise<void>;
    favLoading: boolean;
}

/**
 * PropertyListView Component
 * 
 * Renders properties in a vertical list layout.
 * Follows Single Responsibility Principle - Only handles list presentation.
 * 
 * @param properties - Array of properties to display
 * @param isFavorite - Function to check if property is favorite
 * @param addFavorite - Function to add property to favorites
 * @param removeFavorite - Function to remove property from favorites
 * @param favLoading - Loading state for favorites
 */
export function PropertyListView({
    properties,
    isFavorite,
    addFavorite,
    removeFavorite,
    favLoading,
}: PropertyListViewProps) {
    return (
        <div className="relative">
            <div className="space-y-4">
                {properties.map((property, idx) => (
                    <PropertyCardItemList
                        key={property?._id || `property-${idx}`}
                        property={property}
                        isFavorite={Boolean(isFavorite(property._id!))}
                        addFavorite={addFavorite}
                        removeFavorite={removeFavorite}
                        favLoading={favLoading}
                    />
                ))}
            </div>
        </div>
    );
}

