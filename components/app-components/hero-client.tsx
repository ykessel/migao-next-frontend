'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Hero } from './hero'
import { Suspense } from 'react'

function HeroClientContent() {
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
    // Scroll to property list after navigation
    setTimeout(() => {
      const section = document.getElementById('properties-section');
      if (section) {
        const offset = 100; // adjust for header if needed
        const top = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 400);
  }

  const selectedAddress = searchParams.get('search') || undefined

  return <Hero onSearch={handleSearch} selectedAddress={selectedAddress} />
}

export function HeroClient() {
  return (
    <Suspense fallback={
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    }>
      <HeroClientContent />
    </Suspense>
  )
} 