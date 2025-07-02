'use client'
import {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Hero} from "@/components/Hero";
import {PropertyCard} from "@/components/PropertyCard";
import {SearchFilters} from "@/components/SearchFilters";
import {Navigation} from "@/components/Navigation";
import {useSearchProperties} from "@/hooks/use-properties";
import {Filter, SearchPropertyRequest} from "@/types/property";
import {useDebounce} from "@/hooks/use-debounce";
import {Pagination} from "@/components/Pagination";
import { List, Map as MapIcon, LayoutGrid } from "lucide-react";
import {PropertyCardSkeleton} from "@/components/PropertyCardSkeleton";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import dynamic from "next/dynamic";

const ITEMS_PER_PAGE = 9; // 3 cards per row * 3 rows

const MapView = dynamic(() => import("@/components/MapView.client"), { ssr: false });

export default function Home() {
    const [searchFilters, setSearchFilters] = useState({
        location: "",
        minPrice: 0,
        maxPrice: 5000,
        propertyType: "any",
        rooms: 0,
        furnished: "any"
    });

    const [selectedAddress, setSelectedAddress] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const debouncedFilters = useDebounce(searchFilters, 500);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedFilters]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of the properties list
        const propertiesSection = document.getElementById('properties-section');
        if (propertiesSection) {
            const offset = 100; // Account for fixed header
            const elementPosition = propertiesSection.offsetTop;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Convert UI filters to API filters
    const getApiFilters = (): Filter[] => {
        const filters: Filter[] = [];

        if (debouncedFilters.minPrice > 0 || debouncedFilters.maxPrice < 5000) {
            filters.push({
                type: "RANGE",
                field: "rentPricePerMonth",
                value: {
                    type: "number",
                    gte: debouncedFilters.minPrice,
                    lte: debouncedFilters.maxPrice
                }
            });
        }

        if (debouncedFilters.propertyType !== "any") {
            filters.push({
                type: "TERM",
                field: "propertyType",
                value: debouncedFilters.propertyType
            });
        }

        if (debouncedFilters.rooms > 0) {
            filters.push({
                type: "RANGE",
                field: "rooms",
                value: {
                    type: "number",
                    gte: debouncedFilters.rooms
                }
            });
        }

        if (debouncedFilters.furnished !== "any") {
            filters.push({
                type: "TERM",
                field: "amenities.furnished",
                value: debouncedFilters.furnished === "furnished"
            });
        }

        return filters;
    };

    const searchParams: SearchPropertyRequest = {
        filters: getApiFilters(),
        page: currentPage,
        size: ITEMS_PER_PAGE,
        search: debouncedFilters.location || undefined
    };

    const {data: properties, isLoading, error} = useSearchProperties(searchParams);

    const handleAddressSelect = (address: string) => {
        setSelectedAddress(address);
        setSearchFilters(prev => ({
            ...prev,
            location: address
        }));
    };

    const handleSearchFromHero = (filters: {
        search: string;
        propertyType: string;
        minPrice: number;
        maxPrice: number;
        rooms: number;
        furnished: string;
    }) => {
        setSearchFilters(prev => ({
            ...prev,
            location: filters.search,
            propertyType: filters.propertyType,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            rooms: filters.rooms,
            furnished: filters.furnished
        }));
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (debouncedFilters.location) count++;
        if (debouncedFilters.propertyType !== "any") count++;
        if (debouncedFilters.rooms > 0) count++;
        if (debouncedFilters.furnished !== "any") count++;
        if (debouncedFilters.minPrice > 0 || debouncedFilters.maxPrice < 5000) count++;
        return count;
    };

    // Loading skeleton component
    const LoadingGrid = () => (
        <div className={`
            grid gap-6 animate-fade-in
            ${viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }
        `}>
            {[...Array(ITEMS_PER_PAGE)].map((_, idx) => (
                <div 
                    key={idx} 
                    className="animate-slide-up" 
                    style={{ animationDelay: `${idx * 0.1}s` }}
                >
                    <PropertyCardSkeleton />
                </div>
            ))}
        </div>
    );

    // Error state component
    const ErrorState = () => (
        <div className="text-center py-16">
            <div className="max-w-md mx-auto">
                <div className="mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Error al cargar las propiedades
                </h3>
                <p className="text-gray-600 mb-4">
                    Ha ocurrido un error al cargar las propiedades. Por favor, inténtalo de nuevo.
                </p>
                <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                    className="btn-secondary"
                >
                    Intentar de nuevo
                </Button>
            </div>
        </div>
    );

    // Empty state component
    const EmptyState = () => (
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
                <Button 
                    onClick={() => setSearchFilters({
                        location: "",
                        minPrice: 0,
                        maxPrice: 5000,
                        propertyType: "any",
                        rooms: 0,
                        furnished: "any"
                    })}
                    variant="outline"
                    className="btn-secondary"
                >
                    Limpiar filtros
                </Button>
            </div>
        </div>
    );

    const activeFiltersCount = getActiveFiltersCount();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navigation/>

            <Hero 
                onSearch={handleSearchFromHero}
                selectedAddress={selectedAddress}
            />

            <div id="properties-section" className="container-fluid py-8 sm:py-12">
                <Tabs defaultValue="list" className="w-full">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-1/4">
                            <SearchFilters
                                filters={searchFilters}
                                onFiltersChange={setSearchFilters}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {/* Header Section */}
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
                                            {activeFiltersCount > 0 && (
                                                <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                                                    {activeFiltersCount} filtros activos
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* View Toggle */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-white rounded-lg p-1 shadow-sm border">
                                            <Button
                                                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                                size="sm"
                                                onClick={() => setViewMode('grid')}
                                                className={`${viewMode === 'grid' ? 'bg-teal-600 text-white' : 'text-gray-600'}`}
                                            >
                                                <LayoutGrid className="w-4 h-4" />
                                                <span className="hidden sm:ml-2 sm:inline">Grid</span>
                                            </Button>
                                            <Button
                                                variant={viewMode === 'list' ? 'default' : 'ghost'}
                                                size="sm"
                                                onClick={() => setViewMode('list')}
                                                className={`${viewMode === 'list' ? 'bg-teal-600 text-white' : 'text-gray-600'}`}
                                            >
                                                <List className="w-4 h-4" />
                                                <span className="hidden sm:ml-2 sm:inline">Lista</span>
                                            </Button>
                                        </div>

                                        <TabsList className="grid w-fit grid-cols-2 bg-white shadow-sm">
                                            <TabsTrigger value="list" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                                                <span className="block sm:hidden">
                                                    <List className="w-4 h-4" />
                                                </span>
                                                <span className="hidden sm:inline">Propiedades</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="map" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                                                <span className="block sm:hidden">
                                                    <MapIcon className="w-4 h-4" />
                                                </span>
                                                <span className="hidden sm:inline">Mapa</span>
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                </div>
                            </div>

                            {/* Content Tabs */}
                            <TabsContent value="list" className="mt-0">
                                {isLoading ? (
                                    <LoadingGrid />
                                ) : error ? (
                                    <ErrorState />
                                ) : properties && properties.total > 0 ? (
                                    <>
                                        <div className={`
                                            grid gap-6 animate-fade-in
                                            ${viewMode === 'grid' 
                                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                                                : 'grid-cols-1 max-w-4xl'
                                            }
                                        `}>
                                            {properties.data.map((property, index) => (
                                                <div
                                                    key={property._id}
                                                    className="animate-slide-up"
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    <PropertyCard 
                                                        property={property}
                                                        className={viewMode === 'list' ? 'sm:flex sm:h-64' : ''}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        {properties.total > ITEMS_PER_PAGE && (
                                            <div className="mt-12 flex justify-center">
                                                <Pagination
                                                    currentPage={currentPage}
                                                    totalItems={properties.total}
                                                    itemsPerPage={ITEMS_PER_PAGE}
                                                    onPageChange={handlePageChange}
                                                />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <EmptyState />
                                )}
                            </TabsContent>

                            <TabsContent value="map" className="mt-0">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                                    <div className="h-[600px] relative">
                                        <MapView 
                                            properties={properties?.data || []} 
                                            isLoading={isLoading}
                                            onAddressSelect={handleAddressSelect}
                                        />
                                        {isLoading && (
                                            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                                                <div className="bg-white rounded-lg p-4 shadow-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                                                        <span className="text-gray-600">Cargando propiedades...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
