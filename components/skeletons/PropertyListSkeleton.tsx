import { PropertyCardSkeleton } from '@/components/property/PropertyCardSkeleton'

export function PropertyListSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function FavoritesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-[25px]">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-10 w-48 bg-gray-200 rounded-2xl animate-pulse mb-2" />
            <div className="h-4 w-32 bg-gray-100 rounded-2xl animate-pulse mt-2" />
          </div>
        </div>
      </div>
      {/* Properties Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="relative rounded-[25px]">
            <div className="rounded-[25px] shadow bg-white p-4 flex flex-col animate-pulse">
              <div className="h-40 bg-gray-200 rounded-2xl mb-4" />
              <div className="h-6 w-3/4 bg-gray-200 rounded-2xl mb-2" />
              <div className="h-4 w-1/2 bg-gray-100 rounded-2xl mb-2" />
              <div className="h-4 w-1/3 bg-gray-100 rounded-2xl mb-4" />
              <div className="flex gap-2 mt-auto">
                <div className="h-8 w-8 bg-gray-100 rounded-full" />
                <div className="h-8 w-8 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 