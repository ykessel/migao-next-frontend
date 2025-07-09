'use client'

import { useState, useEffect } from 'react'
import { useSearchProperties } from '@/hooks/use-properties'
import { PropertyCard } from './property-card'
import { Pagination } from '../app-components/pagination'
import { SearchResponse, SearchPropertyRequest } from '@/types/filter'
import { Property } from '@/types/property'
import { PropertyListSkeleton } from '../skeletons/PropertyListSkeleton'
import dynamic from 'next/dynamic'
const MapView = dynamic(() => import('../app-components/map-view').then(mod => mod.MapView), { ssr: false })
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { 
  Grid3X3, 
  List, 
  Map, 
  SortAsc, 
  SortDesc,
  Calendar,
  Clock
} from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites';
import { useRouter, useSearchParams } from 'next/navigation';


interface PropertyListClientProps {
  initialData: SearchResponse<Property>
  searchParams: SearchPropertyRequest
}

const ITEMS_PER_PAGE = 9

type ViewMode = 'card' | 'list' | 'map'
type SortOption = 'price-asc' | 'price-desc' | 'created-asc' | 'created-desc' | 'updated-asc' | 'updated-desc'

export function PropertyListClient({ initialData, searchParams }: PropertyListClientProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const currentPage = searchParams.page || 1;
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const [sortBy, setSortBy] = useState<SortOption>('created-desc')
  
  // Restore scroll position after filter changes
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition')
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition)
      window.scrollTo(0, scrollY)
      sessionStorage.removeItem('scrollPosition')
    }
  }, [searchParams])

  const { data: properties, isLoading } = useSearchProperties(
    { ...searchParams, page: currentPage },
    { 
      initialData,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  const { addFavorite, removeFavorite, isFavorite, loading: favLoading } = useFavorites();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(urlSearchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    // Scroll to top of the properties list
    const propertiesSection = document.getElementById('properties-section')
    if (propertiesSection) {
      const offset = 100 // Account for fixed header
      const elementPosition = propertiesSection.offsetTop
      const offsetPosition = elementPosition - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Sort properties based on selected sort option
  const getSortedProperties = (properties: Property[]): Property[] => {
    if (!properties) return []
    
    return [...properties].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.rentPricePerMonth - b.rentPricePerMonth
        case 'price-desc':
          return b.rentPricePerMonth - a.rentPricePerMonth
        case 'created-asc':
          return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime()
        case 'created-desc':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        case 'updated-asc':
          return new Date(a.updatedAt || '').getTime() - new Date(b.updatedAt || '').getTime()
        case 'updated-desc':
          return new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime()
        default:
          return 0
      }
    })
  }

  const sortedProperties = getSortedProperties(properties?.data || [])

  if (isLoading && !properties) return <PropertyListSkeleton />
  
  if (!properties?.data || properties.data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No se encontraron propiedades
          </h3>
          <p className="text-gray-600 mb-4">
            No hay propiedades que coincidan con tus criterios de búsqueda. 
            Intenta ajustar los filtros.
          </p>
        </div>
      </div>
    )
  }

  const renderPropertyList = () => {
    if (viewMode === 'map') {
      return (
        <MapView
          properties={sortedProperties}
          isLoading={isLoading}
          onAddressSelect={() => {}}
          showSelected={false}
        />
      )
    }

    const gridClass = viewMode === 'card' 
      ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'space-y-4'

    return (
      <div className={gridClass}>
        {sortedProperties.map((property: Property, idx: number) => (
          <PropertyCard 
            key={property.propertyId || `property-${idx}`} 
            property={property} 
            className={viewMode === 'list' ? 'flex flex-row h-auto' : ''}
            isFavorite={Boolean(isFavorite(property.propertyId!))}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            favLoading={favLoading}
          />
        ))}
      </div>
    )
  }
  
  return (
    <div id="properties-section" className="space-y-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Propiedades Disponibles
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <span>
                {isLoading ? "Cargando..." : `${properties?.total || 0} propiedades encontradas`}
              </span>
            </div>
          </div>
        </div>

        {/* View Controls and Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Vista:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="flex items-center gap-2"
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="hidden sm:inline">Tarjetas</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Lista</span>
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="flex items-center gap-2"
              >
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Mapa</span>
              </Button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Ordenar por:</span>
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">
                  <div className="flex items-center gap-2">
                    <SortAsc className="w-4 h-4" />
                    <span>Precio: Menor a Mayor</span>
                  </div>
                </SelectItem>
                <SelectItem value="price-desc">
                  <div className="flex items-center gap-2">
                    <SortDesc className="w-4 h-4" />
                    <span>Precio: Mayor a Menor</span>
                  </div>
                </SelectItem>
                <SelectItem value="created-desc">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Fecha de Creación (Nuevo)</span>
                  </div>
                </SelectItem>
                <SelectItem value="created-asc">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Fecha de Creación (Antiguo)</span>
                  </div>
                </SelectItem>
                <SelectItem value="updated-desc">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Última Actualización</span>
                  </div>
                </SelectItem>
                <SelectItem value="updated-asc">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Actualización Antigua</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Properties Display */}
      {renderPropertyList()}
      
      {/* Pagination - Only show for card/list view */}
      {viewMode !== 'map' && properties.total > ITEMS_PER_PAGE && (
        <div className="mt-12 flex justify-center">
          <Pagination 
            currentPage={currentPage}
            totalItems={properties.total}
            pageSize={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}