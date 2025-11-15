"use client";

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {X, Filter, ChevronDown, ChevronUp, Search} from "lucide-react";
import {PROPERTY_TYPE} from '@/constants/property-type.enum';
import {QuickFiltersSection} from "./sections/QuickFiltersSection";
import {LocationFilterSection} from "./sections/LocationFilterSection";
import {PriceRangeFilterSection} from "./sections/PriceRangeFilterSection";
import {PropertyTypeFilterSection} from "./sections/PropertyTypeFilterSection";
import {RoomsFilterSection} from "./sections/RoomsFilterSection";
import {FurnishedFilterSection} from "./sections/FurnishedFilterSection";
import type {FilterState} from "./store/filterStore";

/**
 * SearchFilters Component Props
 */
interface SearchFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: Partial<FilterState>) => void;
    onClearFilters?: () => void;
    setFilter?: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

/**
 * Furnished options for label mapping
 */
const furnishedOptions = [
    {value: "any", label: "Cualquiera"},
    {value: "furnished", label: "Amueblado"},
    {value: "unfurnished", label: "Sin Amueblar"},
    {value: "semi-furnished", label: "Semi-amueblado"},
];

/**
 * SearchFilters Component
 * 
 * Main component for property search filters.
 * Provides a comprehensive UI for filtering properties by various criteria.
 * 
 * Features:
 * - Quick filters for common selections
 * - Location search
 * - Price range slider
 * - Property type selection
 * - Number of rooms filter
 * - Furnished status filter
 * - Active filters count and display
 * - Mobile-responsive with collapsible panel
 * - Clear all filters functionality
 * 
 * Follows OCP (Open/Closed) - Easy to extend with new filter sections without modification.
 * Follows SRP - Delegates each filter type to specialized section components.
 * 
 * @param filters - Current filter state
 * @param onFiltersChange - Function to update multiple filters at once
 * @param onClearFilters - Optional function to clear all filters
 * @param setFilter - Optional function to update a single filter
 */
export const SearchFilters = ({
    filters,
    onFiltersChange,
    onClearFilters,
    setFilter
}: SearchFiltersProps) => {
    // Mobile expansion state
    const [isExpanded, setIsExpanded] = useState(false);

    // Local state for price range (deferred updates on blur)
    const [priceRange, setPriceRange] = useState<[number | '', number | '']>([filters.minPrice, filters.maxPrice]);

    // Collapsible section states
    const [locationOpen, setLocationOpen] = useState(true);
    const [priceOpen, setPriceOpen] = useState(true);
    const [propertyOpen, setPropertyOpen] = useState(false);
    const [roomsOpen, setRoomsOpen] = useState(false);

    /**
     * Update a single filter
     */
    const updateFilter = (key: keyof FilterState, value: string | number) => {
        if (setFilter) {
            setFilter(key, value);
        } else {
            onFiltersChange({
                ...filters,
                [key]: value
            });
        }
    };

    /**
     * Sync local price range state with filter state
     * (when filters change externally, e.g., from clear action)
     */
    React.useEffect(() => {
        setPriceRange([filters.minPrice, filters.maxPrice]);
    }, [filters.minPrice, filters.maxPrice]);

    /**
     * Clear all filters
     */
    const clearFilters = () => {
        if (onClearFilters) {
            onClearFilters();
        } else {
            const clearedFilters: FilterState = {
                location: "",
                minPrice: 0,
                maxPrice: 5000,
                propertyType: "any",
                rooms: 0,
                furnished: "any"
            };
            onFiltersChange(clearedFilters);
            setPriceRange([0, 5000]);
        }
    };

    /**
     * Apply a quick filter
     */
    const applyQuickFilter = (key: string, value: string | number) => {
        updateFilter(key as keyof FilterState, value);
    };

    /**
     * Count active filters
     */
    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.location) count++;
        if (filters.propertyType && filters.propertyType !== "any") count++;
        if (filters.rooms > 0) count++;
        if (filters.furnished && filters.furnished !== "any") count++;
        if (filters.minPrice > 0 || filters.maxPrice < 5000) count++;
        return count;
    };

    /**
     * Get active filters as human-readable text
     */
    const getActiveFiltersText = () => {
        const activeFilters = [];
        if (filters.location) activeFilters.push(filters.location);
        if (filters.propertyType !== "any") {
            const type = Object.entries(PROPERTY_TYPE).find(([key,]) => key === filters.propertyType);
            if (type) activeFilters.push(type[1]);
        }
        if (filters.rooms > 0) activeFilters.push(`${filters.rooms}+ hab.`);
        if (filters.furnished !== "any") {
            const furnished = furnishedOptions.find(f => f.value === filters.furnished);
            if (furnished) activeFilters.push(furnished.label);
        }
        if (filters.minPrice > 0 || filters.maxPrice < 5000) {
            activeFilters.push(`€${filters.minPrice}-${filters.maxPrice}`);
        }
        return activeFilters;
    };

    const activeFiltersCount = getActiveFiltersCount();
    const activeFiltersText = getActiveFiltersText();

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
                <Button
                    variant="outline"
                    className="w-full justify-between h-12 bg-white shadow-sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4"/>
                        <span>Filtros</span>
                        {activeFiltersCount > 0 && (
                            <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </Button>

                {/* Active Filters Preview */}
                {activeFiltersText.length > 0 && !isExpanded && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {activeFiltersText.slice(0, 3).map((filter, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {filter}
                            </Badge>
                        ))}
                        {activeFiltersText.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                                +{activeFiltersText.length - 3} más
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* Filters Container */}
            <Card className={`sticky top-24 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Filter className="w-5 h-5 text-teal-600"/>
                            Filtros
                            {activeFiltersCount > 0 && (
                                <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                                >
                                    <X className="w-4 h-4 mr-1"/>
                                    Limpiar
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsExpanded(false)}
                                className="lg:hidden"
                            >
                                <X className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Quick Filters */}
                    <QuickFiltersSection filters={filters} applyQuickFilter={applyQuickFilter}/>

                    {/* Location Filter */}
                    <LocationFilterSection
                        location={filters.location}
                        setLocation={(value: string) => updateFilter('location', value)}
                        open={locationOpen}
                        setOpen={setLocationOpen}
                    />

                    {/* Price Range Filter */}
                    <PriceRangeFilterSection
                        minPrice={priceRange[0]}
                        maxPrice={priceRange[1]}
                        setMinPrice={(value: number | '') => {
                            setPriceRange([value, priceRange[1]]);
                        }}
                        setMaxPrice={(value: number | '') => {
                            setPriceRange([priceRange[0], value]);
                        }}
                        onMinPriceBlur={() => {
                            const min = Number(priceRange[0]) || 0;
                            updateFilter('minPrice', min);
                        }}
                        onMaxPriceBlur={() => {
                            const max = Number(priceRange[1]) || 5000;
                            updateFilter('maxPrice', max);
                        }}
                        open={priceOpen}
                        setOpen={setPriceOpen}
                    />

                    {/* Property Type Filter */}
                    <PropertyTypeFilterSection
                        propertyType={filters.propertyType}
                        setPropertyType={(value: string) => updateFilter('propertyType', value)}
                        open={propertyOpen}
                        setOpen={setPropertyOpen}
                    />

                    {/* Rooms Filter */}
                    <RoomsFilterSection
                        rooms={filters.rooms}
                        setRooms={(value: number) => updateFilter('rooms', value)}
                        open={roomsOpen}
                        setOpen={setRoomsOpen}
                    />

                    {/* Furnished Filter */}
                    <FurnishedFilterSection
                        furnished={filters.furnished}
                        setFurnished={(value: string) => updateFilter('furnished', value)}
                    />

                    {/* Apply Filters Button (Mobile) */}
                    <div className="lg:hidden pt-4 border-t">
                        <Button
                            aria-label="Aplicar Filtros"
                            className="w-full btn-primary h-12"
                            onClick={() => setIsExpanded(false)}
                        >
                            <Search className="w-4 h-4 mr-2"/>
                            Aplicar Filtros
                            {activeFiltersCount > 0 && (
                                <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

