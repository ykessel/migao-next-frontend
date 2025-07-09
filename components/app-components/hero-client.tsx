'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Hero } from './hero'

export function HeroClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (filters: { 
    search: string; 
    propertyType: string; 
    minPrice: number; 
    maxPrice: number; 
    rooms: number; 
    furnished: string 
  }) => {
    // Save current scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    
    const params = new URLSearchParams()
    
    if (filters.search) params.set('search', filters.search)
    if (filters.propertyType && filters.propertyType !== 'any') params.set('propertyType', filters.propertyType)
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString())
    if (filters.maxPrice < 5000) params.set('maxPrice', filters.maxPrice.toString())
    if (filters.rooms > 0) params.set('rooms', filters.rooms.toString())
    if (filters.furnished !== 'any') params.set('furnished', filters.furnished)
    
    const queryString = params.toString()
    const url = queryString ? `/?${queryString}` : '/'
    
    router.push(url, { scroll: false })
  }

  const selectedAddress = searchParams.get('search') || undefined

  return <Hero onSearch={handleSearch} selectedAddress={selectedAddress} />
} 