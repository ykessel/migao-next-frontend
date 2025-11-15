'use client';

import {Suspense} from 'react';
import {SearchFilters} from './SearchFilters';
import {useFilterContext} from './FilterProvider';
import {useFilterSync} from './hooks/useFilterSync';

/**
 * SearchFiltersClientContent Component
 * 
 * Internal component that handles filter state synchronization and rendering.
 * Follows Single Responsibility Principle - Only coordinates filters and sync.
 * All business logic is delegated to custom hooks.
 */
function SearchFiltersClientContent() {
    const {filters, setFilter, setFilters, getUrlParams} = useFilterContext();
    const {handleClearFilters} = useFilterSync(filters, setFilters, getUrlParams);

    return (
        <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            setFilter={setFilter}
        />
    );
}

/**
 * SearchFiltersClient Component
 * 
 * Main component for search filters with loading state.
 * Wrapped in Suspense for better UX during hydration.
 * 
 * Features:
 * - Automatic URL synchronization
 * - Loading skeleton
 * - Filter state management
 * 
 * Usage:
 *   <FilterProvider>
 *     <SearchFiltersClient />
 *   </FilterProvider>
 */
export function SearchFiltersClient() {
    return (
        <Suspense fallback={
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div
                    className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 text-center">Cargando filtros...</p>
            </div>
        }>
            <SearchFiltersClientContent/>
        </Suspense>
    );
}

