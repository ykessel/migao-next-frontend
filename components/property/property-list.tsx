import { PropertyListClient } from './property-list-client'
import { SearchPropertyRequest, Filter } from '@/types/filter'

function parseSearchParams(searchParams: { [key: string]: string | string[] | undefined }): SearchPropertyRequest {
  const filters: Filter[] = []
  
  // Parse location search
  if (searchParams.search && typeof searchParams.search === 'string') {
    // This will be handled by the search parameter
  }
  
  // Parse price range
  if (searchParams.minPrice && typeof searchParams.minPrice === 'string') {
    filters.push({
      type: "RANGE" as const,
      field: "rentPricePerMonth",
      value: {
        type: "number" as const,
        gte: parseInt(searchParams.minPrice)
      }
    })
  }
  
  if (searchParams.maxPrice && typeof searchParams.maxPrice === 'string') {
    filters.push({
      type: "RANGE" as const,
      field: "rentPricePerMonth",
      value: {
        type: "number" as const,
        lte: parseInt(searchParams.maxPrice)
      }
    })
  }
  
  // Parse property type
  if (searchParams.propertyType && typeof searchParams.propertyType === 'string' && searchParams.propertyType !== 'any') {
    filters.push({
      type: "TERM" as const,
      field: "propertyType",
      value: searchParams.propertyType
    })
  }
  
  // Parse rooms
  if (searchParams.rooms && typeof searchParams.rooms === 'string') {
    filters.push({
      type: "RANGE" as const,
      field: "rooms",
      value: {
        type: "number" as const,
        gte: parseInt(searchParams.rooms)
      }
    })
  }
  
  // Parse furnished
  if (searchParams.furnished && typeof searchParams.furnished === 'string' && searchParams.furnished !== 'any') {
    filters.push({
      type: "TERM" as const,
      field: "amenities.furnished",
      value: searchParams.furnished === 'furnished'
    })
  }
  
  const hasFilters = filters.length > 0;
  const hasSearch = typeof searchParams.search === 'string' && searchParams.search.trim() !== '';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const size = searchParams.size && typeof searchParams.size === 'string' ? parseInt(searchParams.size) : 9;

  if (!hasFilters && !hasSearch && page === 1 && size === 9) {
    return {};
  }

  // Only include page/size if not default or if there are filters/search
  const result: SearchPropertyRequest = {};
  if (hasSearch && typeof searchParams.search === 'string') {
    result.search = searchParams.search;
  }
  if (hasFilters) {
    result.filters = filters;
  }
  // Always include page if present in the URL (even if 1)
  if (typeof searchParams.page === 'string') {
    result.page = page;
  }
  // Only include size if not default or explicitly set
  if (hasFilters || hasSearch) {
    if (size !== 9) result.size = size;
  } else {
    if (typeof searchParams.size === 'string' && size !== 9) result.size = size;
  }
  return result;
}

export { parseSearchParams };

export function PropertyList() {
  return <PropertyListClient />;
}