import { Suspense } from "react";
import { HeroClient } from "@/components/app-components/hero-client";
import { SearchFiltersClient, FilterProvider } from "@/components/filters";
import { PropertyListSkeleton } from "@/components/skeletons/PropertyListSkeleton";
import { PropertyList } from "@/components/property";

export default function HomePage() {
  return (
    <FilterProvider>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        <HeroClient />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
                <PropertyList />
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </FilterProvider>
  );
}
