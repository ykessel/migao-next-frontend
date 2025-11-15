import {create} from 'zustand';

/**
 * Filter State Type
 * 
 * Represents all available filters for property search.
 */
export type FilterState = {
    location: string;
    minPrice: number;
    maxPrice: number;
    propertyType: string;
    rooms: number;
    furnished: string;
};

/**
 * Default filter values
 */
const defaultFilters: FilterState = {
    location: '',
    minPrice: 0,
    maxPrice: 5000,
    propertyType: 'any',
    rooms: 0,
    furnished: 'any',
};

/**
 * Filter Store Interface
 */
interface FilterStore {
    filters: FilterState;
    setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    setFilters: (filters: Partial<FilterState>) => void;
    clearFilters: () => void;
    getUrlParams: () => Record<string, string | undefined>;
}

/**
 * Filter Store (Zustand)
 * 
 * Global state management for property filters.
 * Uses Zustand for lightweight, performant state management.
 * 
 * Features:
 * - Single filter update
 * - Bulk filter update
 * - Clear all filters
 * - Convert filters to URL params
 * 
 * Usage:
 *   const filters = useFilterStore((state) => state.filters);
 *   const setFilter = useFilterStore((state) => state.setFilter);
 */
export const useFilterStore = create<FilterStore>((set, get) => ({
    filters: {...defaultFilters},

    /**
     * Update a single filter
     */
    setFilter: (key, value) => set((state) => ({
        filters: {...state.filters, [key]: value},
    })),

    /**
     * Update multiple filters at once
     */
    setFilters: (filters) => set((state) => ({
        filters: {...state.filters, ...filters},
    })),

    /**
     * Reset all filters to default values
     */
    clearFilters: () => set({filters: {...defaultFilters}}),

    /**
     * Convert current filters to URL parameters
     * Omits default values to keep URL clean
     */
    getUrlParams: () => {
        const {filters} = get();
        const params: Record<string, string | undefined> = {};

        if (filters.location) params.search = filters.location;
        if (filters.propertyType !== 'any') params.propertyType = filters.propertyType;
        if (filters.minPrice > 0) params.minPrice = filters.minPrice.toString();
        if (filters.maxPrice < 5000) params.maxPrice = filters.maxPrice.toString();
        if (filters.rooms > 0) params.rooms = filters.rooms.toString();
        if (filters.furnished !== 'any') params.furnished = filters.furnished;

        return params;
    },
}));

export {defaultFilters};

