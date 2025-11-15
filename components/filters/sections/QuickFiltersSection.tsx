import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Sofa, Home, BedDouble} from "lucide-react";
import type {FilterState} from "../store/filterStore";

/**
 * Quick filter configuration
 */
const quickFilters = [
    {key: "furnished", value: "furnished", label: "Amueblado", icon: Sofa},
    {key: "propertyType", value: "APARTAMENTO_INDEPENDIENTE", label: "Apartamento independiente", icon: Home},
    {key: "rooms", value: 2, label: "2+ Habitaciones", icon: BedDouble},
];

/**
 * QuickFiltersSection Component Props
 */
interface QuickFiltersSectionProps {
    filters: FilterState;
    applyQuickFilter: (key: string, value: string | number) => void;
}

/**
 * QuickFiltersSection Component
 * 
 * Section displaying commonly used filters as quick-access buttons.
 * Provides one-click access to popular filter combinations.
 * Buttons are highlighted when their corresponding filter is active.
 * 
 * Follows SRP - Only handles quick filters UI presentation.
 * 
 * @param filters - Current filter state for highlighting active filters
 * @param applyQuickFilter - Function to apply a quick filter
 */
export function QuickFiltersSection({filters, applyQuickFilter}: QuickFiltersSectionProps) {
    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Filtros Rápidos
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {quickFilters.map((filter) => {
                    // Determine if this quick filter is currently active
                    const isActive =
                        (filter.key === 'furnished' && filters.furnished === filter.value) ||
                        (filter.key === 'propertyType' && filters.propertyType === filter.value) ||
                        (filter.key === 'rooms' && filters.rooms >= Number(filter.value));

                    return (
                        <Button
                            key={filter.label}
                            variant="outline"
                            size="sm"
                            aria-label={filter.label}
                            className={`justify-start h-10 ${
                                isActive
                                    ? 'bg-teal-200 hover:bg-teal-300 text-teal-800 border-teal-300'
                                    : 'hover:bg-teal-50 hover:border-teal-200'
                            }`}
                            onClick={() => applyQuickFilter(filter.key, filter.value)}
                        >
                            <filter.icon className="w-4 h-4 mr-2"/>
                            {filter.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

