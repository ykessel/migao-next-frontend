'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchFilters } from './search-filters'

export function SearchFiltersClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentFilters = {
    location: searchParams.get('search') || '',
    minPrice: parseInt(searchParams.get('minPrice') || '0'),
    maxPrice: parseInt(searchParams.get('maxPrice') || '5000'),
    propertyType: searchParams.get('propertyType') || 'any',
    rooms: parseInt(searchParams.get('rooms') || '0'),
    furnished: searchParams.get('furnished') || 'any'
  }

  const handleFiltersChange = (filters: {
    location: string
    minPrice: number
    maxPrice: number
    propertyType: string
    rooms: number
    furnished: string
  }) => {
    // Save current scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    
    const params = new URLSearchParams()
    
    if (filters.location) params.set('search', filters.location)
    if (filters.propertyType !== 'any') params.set('propertyType', filters.propertyType)
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString())
    if (filters.maxPrice < 5000) params.set('maxPrice', filters.maxPrice.toString())
    if (filters.rooms > 0) params.set('rooms', filters.rooms.toString())
    if (filters.furnished !== 'any') params.set('furnished', filters.furnished)
    
    const queryString = params.toString()
    const url = queryString ? `/?${queryString}` : '/'
    
    router.push(url, { scroll: false })
  }

  return <SearchFilters filters={currentFilters} onFiltersChange={handleFiltersChange} />
} 