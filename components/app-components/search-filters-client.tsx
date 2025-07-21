'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchFilters } from './search-filters'
import {Suspense, useState, useEffect, useMemo, useRef} from 'react'
import { useDebounce } from '@/hooks/use-debounce'

// Simple debounce implementation
function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

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

function SearchFiltersClientContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentFilters = useMemo(() => {
    return {
      location: searchParams.get('search') || '',
      minPrice: parseInt(searchParams.get('minPrice') || '0'),
      maxPrice: parseInt(searchParams.get('maxPrice') || '5000'),
      propertyType: searchParams.get('propertyType') || 'any',
      rooms: parseInt(searchParams.get('rooms') || '0'),
      furnished: searchParams.get('furnished') || 'any'
    }
  },[searchParams])

  const [filters, setFilters] = useState(currentFilters)
  const debouncedFilters = useDebounce(filters, 1000)
  const prevFiltersRef = useRef(currentFilters)

  // Debounced update function
  const debouncedUpdateUrl = useRef(
    debounce(
      (router: ReturnType<typeof useRouter>, searchParams: URLSearchParams, newParams: Record<string, string | undefined>) => {
        mergeAndUpdateUrlParams(router, searchParams, newParams);
      },
      300
    )
  ).current;

  // Sync filters with URL changes
  useEffect(() => {
    setFilters(currentFilters)
    prevFiltersRef.current = currentFilters
  }, [currentFilters, searchParams])

  useEffect(() => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())

    // Build only the changed filter params
    const newParams: Record<string, string | undefined> = {};
    if (debouncedFilters.location) newParams.search = debouncedFilters.location;
    if (debouncedFilters.propertyType !== "any") newParams.propertyType = debouncedFilters.propertyType;
    if (debouncedFilters.minPrice > 0) newParams.minPrice = debouncedFilters.minPrice.toString();
    if (debouncedFilters.maxPrice < 5000) newParams.maxPrice = debouncedFilters.maxPrice.toString();
    if (debouncedFilters.rooms > 0) newParams.rooms = debouncedFilters.rooms.toString();
    if (debouncedFilters.furnished !== "any") newParams.furnished = debouncedFilters.furnished;

    // Compare previous filters to current debounced filters
    const prev = prevFiltersRef.current;
    const filtersChanged =
      prev.location !== debouncedFilters.location ||
      prev.minPrice !== debouncedFilters.minPrice ||
      prev.maxPrice !== debouncedFilters.maxPrice ||
      prev.propertyType !== debouncedFilters.propertyType ||
      prev.rooms !== debouncedFilters.rooms ||
      prev.furnished !== debouncedFilters.furnished;

    if (filtersChanged) {
      newParams.page = "1";
    } else {
      const page = searchParams.get("page");
      if (page) newParams.page = page;
    }

    // Debounced URL update
    debouncedUpdateUrl(router, searchParams, newParams);

    prevFiltersRef.current = debouncedFilters;
  }, [debouncedFilters, router, searchParams, debouncedUpdateUrl]);

  return <SearchFilters filters={filters} onFiltersChange={setFilters} />
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