'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchFilters } from './search-filters'
import { Suspense, useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

function SearchFiltersClientContent() {
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

  const [filters, setFilters] = useState(currentFilters)
  const debouncedFilters = useDebounce(filters, 1000)

  // Sync filters with URL changes
  useEffect(() => {
    setFilters(currentFilters)
  }, [currentFilters, searchParams])

  useEffect(() => {
    // Save current scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    const params = new URLSearchParams()
    if (debouncedFilters.location) params.set('search', debouncedFilters.location)
    if (debouncedFilters.propertyType !== 'any') params.set('propertyType', debouncedFilters.propertyType)
    if (debouncedFilters.minPrice > 0) params.set('minPrice', debouncedFilters.minPrice.toString())
    if (debouncedFilters.maxPrice < 5000) params.set('maxPrice', debouncedFilters.maxPrice.toString())
    if (debouncedFilters.rooms > 0) params.set('rooms', debouncedFilters.rooms.toString())
    if (debouncedFilters.furnished !== 'any') params.set('furnished', debouncedFilters.furnished)
    const queryString = params.toString()
    const url = queryString ? `/?${queryString}` : '/'
    router.push(url, { scroll: false })
  }, [debouncedFilters, router])

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