import { PropertyListClient } from './property-list-client'
import { getInitialProperties } from '@/services/api-client';
import { SearchPropertyRequest, Filter } from '@/types/filter'

interface PropertyListProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function parseSearchParams(searchParams: { [key: string]: string | string[] | undefined }): Promise<SearchPropertyRequest> {
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
  
  return {
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
    filters,
    page: typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1,
    size: 9
  }
}

export async function PropertyList({ searchParams }: PropertyListProps) {
  const resolvedSearchParams = await searchParams
  const parsedParams = await parseSearchParams(resolvedSearchParams)
  const initialData = await getInitialProperties(parsedParams)
  return <PropertyListClient initialData={initialData} searchParams={parsedParams} />
}