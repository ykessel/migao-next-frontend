'use client';

import {useState, useMemo, useCallback} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useSearchProperties} from '@/hooks/use-properties';
import {useFavorites} from '@/hooks/use-favorites';
import {parseSearchParams} from '@/lib/utils';

const ITEMS_PER_PAGE = 9;

export type ViewMode = "card" | "list" | "map";
export type SortOption =
    | "price-asc"
    | "price-desc"
    | "created-asc"
    | "created-desc"
    | "updated-asc"
    | "updated-desc";

/**
 * Converts sort option to database sort object
 */
function getSortObject(sortBy: SortOption): { [key: string]: 1 | -1 } {
    switch (sortBy) {
        case "price-asc":
            return {rentPricePerMonth: 1};
        case "price-desc":
            return {rentPricePerMonth: -1};
        case "created-asc":
            return {createdAt: 1};
        case "created-desc":
            return {createdAt: -1};
        case "updated-asc":
            return {updatedAt: 1};
        case "updated-desc":
            return {updatedAt: -1};
        default:
            return {createdAt: -1};
    }
}

/**
 * usePropertyList Hook
 * 
 * Custom hook that encapsulates all business logic for property list management.
 * Handles URL params, sorting, pagination, view mode, favorites, and data fetching.
 * 
 * Follows Single Responsibility Principle and Dependency Inversion Principle.
 * 
 * @returns Object containing properties data, loading state, view controls, and handlers
 */
export function usePropertyList() {
    const router = useRouter();
    const urlSearchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<ViewMode>("card");

    // Parse URL parameters
    const rawParams = useMemo(
        () => Object.fromEntries(urlSearchParams.entries()),
        [urlSearchParams]
    );
    
    const parsedParams = useMemo(
        () => parseSearchParams(rawParams),
        [rawParams]
    );
    
    const sortBy = (typeof parsedParams.sort === 'string' ? parsedParams.sort : 'created-desc') as SortOption;
    const currentPage = parsedParams.page || 1;

    // Build search parameters
    const searchParams = useMemo(() => ({
        ...parsedParams,
        sort: getSortObject(sortBy),
        page: currentPage,
        size: ITEMS_PER_PAGE,
    }), [parsedParams, sortBy, currentPage]);

    // Fetch properties
    const {data: properties, isLoading} = useSearchProperties(searchParams);

    // Favorites management
    const {
        addFavorite,
        removeFavorite,
        isFavorite,
        loading: favLoading,
    } = useFavorites();

    // URL parameter update utility
    const updateUrlParam = useCallback(
        (key: string, value: string, resetPage = false) => {
            const params = new URLSearchParams(urlSearchParams.toString());
            params.set(key, value);
            if (resetPage && key !== "page") params.set("page", "1");
            router.push(`?${params.toString()}`, {scroll: false});
        },
        [router, urlSearchParams]
    );

    // Handlers
    const handleSortChange = useCallback(
        (value: SortOption) => updateUrlParam("sort", value, true),
        [updateUrlParam]
    );

    const handlePageChange = useCallback(
        (page: number) => updateUrlParam("page", page.toString()),
        [updateUrlParam]
    );

    const handleViewModeChange = useCallback(
        (mode: ViewMode) => setViewMode(mode),
        []
    );

    return {
        // Data
        properties,
        isLoading,
        searchParams,
        
        // View state
        viewMode,
        sortBy,
        currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
        
        // Favorites
        addFavorite,
        removeFavorite,
        isFavorite,
        favLoading,
        
        // Handlers
        handleSortChange,
        handlePageChange,
        handleViewModeChange,
    };
}

