import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sofa, Home, BedDouble } from "lucide-react";
import type { FilterState } from "./filterStore";

const quickFilters = [
    {key: "furnished", value: "furnished", label: "Amueblado", icon: Sofa},
    {key: "propertyType", value: "APARTAMENTO_INDEPENDIENTE", label: "Apartamento independiente", icon: Home},
    {key: "rooms", value: 2, label: "2+ Habitaciones", icon: BedDouble},
];

export function QuickFiltersSection({ filters, applyQuickFilter }: { filters: FilterState, applyQuickFilter: (key: string, value: string | number) => void }) {
    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Filtros Rápidos
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {quickFilters.map((filter) => (
                    <Button
                        key={filter.label}
                        variant="outline"
                        size="sm"
                        aria-label={filter.label}
                        className={`justify-start h-10 ${
                            (filter.key === 'furnished' && filters.furnished === filter.value) ||
                            (filter.key === 'propertyType' && filters.propertyType === filter.value) ||
                            (filter.key === 'rooms' && filters.rooms >= Number(filter.value))
                                ? 'bg-teal-50 border-teal-200 text-teal-700'
                                : 'hover:bg-gray-50'
                        }`}
                        onClick={() => applyQuickFilter(filter.key, filter.value)}
                    >
                        <filter.icon className="w-4 h-4 mr-2"/>
                        {filter.label}
                    </Button>
                ))}
            </div>
        </div>
    );
} 