'use client';

import React, {createContext, useContext, useMemo} from 'react';
import {useFilterStore, FilterState} from './store/filterStore';

/**
 * Filter Context Value
 * 
 * Provides access to filter state and actions throughout the component tree.
 */
interface FilterContextValue {
    filters: FilterState;
    setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    setFilters: (filters: Partial<FilterState>) => void;
    clearFilters: () => void;
    getUrlParams: () => Record<string, string | undefined>;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

/**
 * FilterProvider Component
 * 
 * Provides filter state and actions to all child components via Context API.
 * Bridges Zustand store with React Context for easier consumption.
 * 
 * Follows Dependency Inversion Principle - Components depend on the context interface,
 * not on the Zustand store directly.
 * 
 * Usage:
 *   <FilterProvider>
 *     <YourComponents />
 *   </FilterProvider>
 * 
 * @param children - Child components that need access to filters
 */
export const FilterProvider = ({children}: { children: React.ReactNode }) => {
    const filters = useFilterStore((state) => state.filters);
    const setFilter = useFilterStore((state) => state.setFilter);
    const setFilters = useFilterStore((state) => state.setFilters);
    const clearFilters = useFilterStore((state) => state.clearFilters);
    const getUrlParams = useFilterStore((state) => state.getUrlParams);

    const value = useMemo(
        () => ({filters, setFilter, setFilters, clearFilters, getUrlParams}),
        [filters, setFilter, setFilters, clearFilters, getUrlParams]
    );

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};

/**
 * useFilterContext Hook
 * 
 * Access filter state and actions from any component within FilterProvider.
 * Throws error if used outside of FilterProvider.
 * 
 * Usage:
 *   const { filters, setFilter, clearFilters } = useFilterContext();
 * 
 * @returns FilterContextValue with filters and actions
 * @throws Error if used outside FilterProvider
 */
export function useFilterContext() {
    const ctx = useContext(FilterContext);
    if (!ctx) {
        throw new Error('useFilterContext must be used within a FilterProvider');
    }
    return ctx;
}

