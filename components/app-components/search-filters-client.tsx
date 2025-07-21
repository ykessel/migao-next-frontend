'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchFilters } from './search-filters'
import {Suspense, useEffect, useRef} from 'react'
import { useFilterContext } from './search-filters/FilterProvider';
import { FilterState } from './search-filters/filterStore';

function mergeAndUpdateUrlParams(
  router: ReturnType<typeof useRouter>,
  searchParams: URLSearchParams,
  newParams: Record<string, string | undefined>
) {
  const params = new URLSearchParams(searchParams.toString());
  Object.entries(newParams).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "" || value === "any") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });
  router.push(`?${params.toString()}`, { scroll: false });
}

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

function SearchFiltersClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilter, setFilters, getUrlParams } = useFilterContext();
  const prevFiltersRef = useRef<FilterState>(filters);

  // On mount and when URL changes, update store from URL
  useEffect(() => {
    const urlFilters = parseFiltersFromSearchParams(searchParams);
    setFilters(urlFilters);
    prevFiltersRef.current = urlFilters;
  }, [searchParams, setFilters]);

  // When store changes, update URL
  useEffect(() => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    const newParams = getUrlParams();
    // Compare previous filters to current filters
    const prev = prevFiltersRef.current;
    const filtersChanged =
      prev.location !== filters.location ||
      prev.minPrice !== filters.minPrice ||
      prev.maxPrice !== filters.maxPrice ||
      prev.propertyType !== filters.propertyType ||
      prev.rooms !== filters.rooms ||
      prev.furnished !== filters.furnished;
    if (filtersChanged) {
      newParams.page = "1";
    } else {
      const page = searchParams.get("page");
      if (page) newParams.page = page;
    }
    // Only update the URL if needed
    const urlIsEmpty = Object.keys(newParams).length === 0;
    const urlParamsString = new URLSearchParams(searchParams.toString()).toString();

    if (!urlIsEmpty || urlParamsString) {
      mergeAndUpdateUrlParams(router, searchParams, newParams);
    }
    prevFiltersRef.current = filters;
  }, [filters, router, searchParams, getUrlParams]);

  // Function to clear all filter params from URL and reset state
  function handleClearFilters() {
    router.push('/', { scroll: false });
    // clearFilters();
  }

  return <SearchFilters filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} setFilter={setFilter} />
}

export function SearchFiltersClient() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-center">Cargando filtros...</p>
      </div>
    }>
      <SearchFiltersClientContent />
    </Suspense>
  )
} 