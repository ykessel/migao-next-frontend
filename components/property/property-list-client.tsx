'use client'
import {useState, Suspense} from 'react'
import {useSearchProperties} from '@/hooks/use-properties'
import {PropertyCard} from './property-card'
import {Pagination} from '../app-components/pagination'
import {Property} from '@/types/property'
import {PropertyListSkeleton} from '../skeletons/PropertyListSkeleton'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('../map/map-view').then(mod => mod.MapView), {ssr: false})
import {Button} from '../ui/button'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../ui/select'
import {
    Grid3X3,
    List,
    Map,
    SortAsc,
    SortDesc,
    Calendar,
} from 'lucide-react'
import {useFavorites} from '@/hooks/use-favorites';
import {useRouter, useSearchParams} from 'next/navigation';
import {parseSearchParams} from './property-list';
import PropertyCardItemList from "@/components/property/property-card-item-list";

const ITEMS_PER_PAGE = 9

type ViewMode = 'card' | 'list' | 'map'
type SortOption = 'price-asc' | 'price-desc' | 'created-asc' | 'created-desc' | 'updated-asc' | 'updated-desc'

function PropertyListClientContent() {
    const router = useRouter();
    const urlSearchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<ViewMode>('card')
    const [sortBy, setSortBy] = useState<SortOption>('created-desc')

    const rawParams = Object.fromEntries(urlSearchParams.entries());
    const parsedParams = parseSearchParams(rawParams);
    const currentPage = parsedParams.page || 1;

    const {data: properties, isLoading} = useSearchProperties(
        {...parsedParams, page: currentPage, size: ITEMS_PER_PAGE}
    )

    const {addFavorite, removeFavorite, isFavorite, loading: favLoading} = useFavorites();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(urlSearchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`, {scroll: false});
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

    if (isLoading && !properties) return <PropertyListSkeleton/>

    if (!properties?.data || properties.data.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                    <div className="mb-4">
                        <div
                            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"/>
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
                    onAddressSelect={() => {
                    }}
                    showSelected={false}
                />
            )
        }

        if (viewMode === 'list') {
            return (
                <div className="space-y-4">
                    {sortedProperties.map((property: Property, idx: number) => (
                        <PropertyCardItemList 
                          key={property?._id || `property-${idx}`}
                          property={property}
                          isFavorite={Boolean(isFavorite(property._id!))}
                          addFavorite={addFavorite}
                          removeFavorite={removeFavorite}
                          favLoading={favLoading}
                        />
                    ))}
                </div>
            )
        } else {
            return (
                <div className={'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}>
                    {sortedProperties.map((property: Property, idx: number) => (
                        <PropertyCard
                            key={property._id || `property-${idx}`}
                            property={property}
                            isFavorite={Boolean(isFavorite(property._id!))}
                            addFavorite={addFavorite}
                            removeFavorite={removeFavorite}
                            favLoading={favLoading}
                        />
                    ))}
                </div>
            )
        }
    }

    // Always render the controls section, even when loading
    return (
        <div id="properties-section" className="space-y-6 relative">
            {/* ProgressBar is global, no overlay needed here */}
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
                <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 mr-2">Vista:</span>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <Button
                                variant={viewMode === 'card' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('card')}
                                className="flex items-center gap-2"
                                aria-label="Vista de tarjetas"
                            >
                                <Grid3X3 className="w-4 h-4"/>
                                <span className="hidden sm:inline">Tarjetas</span>
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                                className="flex items-center gap-2"
                                aria-label="Vista de lista"
                            >
                                <List className="w-4 h-4"/>
                                <span className="hidden sm:inline">Lista</span>
                            </Button>
                            <Button
                                variant={viewMode === 'map' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('map')}
                                className="flex items-center gap-2"
                                aria-label="Vista de mapa"
                            >
                                <Map className="w-4 h-4"/>
                                <span className="hidden sm:inline">Mapa</span>
                            </Button>
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 mr-2">Ordenar por:</span>
                        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}
                                aria-label="Ordenar propiedades">
                            <SelectTrigger className="w-48" aria-label="Selector de orden">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="price-asc" aria-label="Ordenar por precio menor a mayor">
                                    <div className="flex items-center gap-2">
                                        <SortAsc className="w-4 h-4"/>
                                        <span>Precio: Menor a Mayor</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="price-desc" aria-label="Ordenar por precio mayor a menor">
                                    <div className="flex items-center gap-2">
                                        <SortDesc className="w-4 h-4"/>
                                        <span>Precio: Mayor a Menor</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="created-desc"
                                            aria-label="Ordenar por fecha de creación más reciente">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4"/>
                                        <span>Nuevas</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="created-asc" aria-label="Ordenar por fecha de creación más antigua">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4"/>
                                        <span>Antiguas</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Properties Display */}
            {isLoading ? (
                <PropertyListSkeleton/>
            ) : renderPropertyList()}

            {/* Pagination - Only show for card/list view */}
            {viewMode !== 'map' && properties && properties.total > ITEMS_PER_PAGE && (
                <div className="mt-12 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={properties.total}
                        pageSize={ITEMS_PER_PAGE}
                        onPageChange={handlePageChange}
                        aria-label="Paginación de propiedades"
                    />
                </div>
            )}
        </div>
    )
}

export function PropertyListClient() {
    return (
        <Suspense fallback={<PropertyListSkeleton/>}>
            <PropertyListClientContent/>
        </Suspense>
    )
}