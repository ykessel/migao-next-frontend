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
      <HeroClient />
      
      <div className="container-fluid py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <SearchFiltersClient />
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