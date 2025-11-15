'use client';

import {useEffect, useRef} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {FilterState} from '../store/filterStore';

/**
 * Parse filters from URL search params
 */
function parseFiltersFromSearchParams(searchParams: URLSearchParams): FilterState {
    return {
        location: searchParams.get('search') || '',
        minPrice: parseInt(searchParams.get('minPrice') || '0'),
        maxPrice: parseInt(searchParams.get('maxPrice') || '5000'),
        propertyType: searchParams.get('propertyType') || 'any',
        rooms: parseInt(searchParams.get('rooms') || '0'),
        furnished: searchParams.get('furnished') || 'any',
    };
}

/**
 * useFilterSync Hook
 * 
 * Custom hook that handles bidirectional synchronization between filter store and URL params.
 * Follows Single Responsibility Principle - Only handles URL-Store synchronization.
 * 
 * Features:
 * - Initial sync from URL to Store on mount
 * - Automatic sync from Store to URL on filter changes
 * - Preserves pagination state
 * - Prevents infinite loops with ref tracking
 * - Saves scroll position in sessionStorage
 * 
 * @param filters - Current filter state from store
 * @param setFilters - Function to update filters in store
 * @param getUrlParams - Function to convert filters to URL params
 * @returns Object with handleClearFilters function
 */
export function useFilterSync(
    filters: FilterState,
    setFilters: (filters: Partial<FilterState>) => void,
    getUrlParams: () => Record<string, string | undefined>
) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isInitialMount = useRef(true);

    // Initial sync: URL → Store (only on mount)
    useEffect(() => {
        const urlFilters = parseFiltersFromSearchParams(searchParams);
        setFilters(urlFilters);
        isInitialMount.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Continuous sync: Store → URL (skip initial mount)
    useEffect(() => {
        if (isInitialMount.current) return;

        // Save scroll position before navigation
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());

        // Get new params from store
        const newParams = getUrlParams();

        // Preserve current page if exists
        const currentPage = searchParams.get("page");
        if (currentPage) {
            newParams.page = currentPage;
        }

        // Only update if params changed
        const currentUrl = searchParams.toString();
        const newUrl = new URLSearchParams(newParams as Record<string, string>).toString();

        if (currentUrl !== newUrl) {
            router.push(`?${newUrl}`, {scroll: false});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    /**
     * Clear all filters and reset URL
     */
    const handleClearFilters = () => {
        router.push('/', {scroll: false});
    };

    return {
        handleClearFilters,
    };
}

