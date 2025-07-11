import { Suspense } from 'react'
import { HeroClient } from '@/components/app-components/hero-client'
import { SearchFiltersClient } from '@/components/app-components/search-filters-client'
import { PropertyListSkeleton } from '@/components/skeletons/PropertyListSkeleton'
import { PropertyList } from '@/components/property/property-list'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Suspense fallback={
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Cargando...</p>
          </div>
        </div>
      }>
        <HeroClient />
      </Suspense>
      
      <div className="container-fluid py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <Suspense fallback={
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 text-center">Cargando filtros...</p>
              </div>
            }>
              <SearchFiltersClient />
            </Suspense>
          </aside>
          
          <main className="lg:w-3/4">
            <Suspense fallback={<PropertyListSkeleton />}>
              <PropertyList searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}