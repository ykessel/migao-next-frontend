import PropertySortSelect from '@/components/app-components/PropertySortSelect';
import PropertyViewControls from '@/components/app-components/PropertyViewControls';
import type {ViewMode, SortOption} from './hooks/usePropertyList';

interface PropertyListHeaderProps {
    totalProperties: number;
    isLoading: boolean;
    viewMode: ViewMode;
    sortBy: string;
    onViewModeChange: (mode: ViewMode) => void;
    onSortChange: (sort: SortOption) => void;
}

/**
 * PropertyListHeader Component
 * 
 * Displays the header section of property list with title, count, view controls, and sort options.
 * Follows Single Responsibility Principle - Only handles header presentation.
 * 
 * @param totalProperties - Total number of properties found
 * @param isLoading - Loading state
 * @param viewMode - Current view mode
 * @param sortBy - Current sort option
 * @param onViewModeChange - Callback when view mode changes
 * @param onSortChange - Callback when sort option changes
 */
export function PropertyListHeader({
    totalProperties,
    isLoading,
    viewMode,
    sortBy,
    onViewModeChange,
    onSortChange,
}: PropertyListHeaderProps) {
    return (
        <div className="mb-6">
            {/* Title and Count */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Propiedades Disponibles
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span>
                            {isLoading
                                ? "Cargando..."
                                : `${totalProperties} propiedades encontradas`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-[16px]">
                <PropertyViewControls
                    viewMode={viewMode}
                    onChange={onViewModeChange}
                />
                <div className="flex items-center gap-2">
                    <span className="hidden text-nowrap sm:inline text-sm font-medium text-gray-700 mr-2">
                        Ordenar por:
                    </span>
                    <PropertySortSelect
                        value={typeof sortBy === "string" ? sortBy : undefined}
                        onChange={onSortChange}
                    />
                </div>
            </div>
        </div>
    );
}

