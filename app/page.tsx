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
import { List, Map as MapIcon } from "lucide-react";
import {PropertyCardSkeleton} from "@/components/PropertyCardSkeleton";
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
    const debouncedFilters = useDebounce(searchFilters, 500);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedFilters]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of the properties list
        window.scrollTo({
            top: document.getElementById('properties-list')?.offsetTop || 0,
            behavior: 'smooth'
        });
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
                value: debouncedFilters.furnished === "yes"
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation/>

            <Hero 
                onSearch={(filters) => setSearchFilters(prev => ({
                    ...prev,
                    location: filters.search,
                    propertyType: filters.propertyType,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                    rooms: filters.rooms,
                    furnished: filters.furnished
                }))} 
                selectedAddress={selectedAddress}
            />

            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Propiedades Disponibles
                                    </h2>
                                    <p className="text-gray-600">
                                        {isLoading ? "Cargando..." : `${properties?.total || 0} propiedades encontradas`}
                                    </p>
                                </div>

                                <TabsList className="grid w-fit grid-cols-2">
                                    <TabsTrigger value="list">
                                        <span className="block md:hidden"><List className="w-5 h-5" /></span>
                                        <span className="hidden md:inline">Vista de Lista</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="map">
                                        <span className="block md:hidden"><MapIcon className="w-5 h-5" /></span>
                                        <span className="hidden md:inline">Vista de Mapa</span>
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="list" className="mt-0">
                                {isLoading ? (
                                    <div
                                        id="properties-list"
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
                                    >
                                        {[...Array(ITEMS_PER_PAGE)].map((_, idx) => (
                                            <div key={idx} className="animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                                                <PropertyCardSkeleton />
                                            </div>
                                        ))}
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-600">Error al cargar las propiedades. Por favor,
                                            inténtalo de nuevo.</p>
                                    </div>
                                ) : properties && properties.total > 0 ? (
                                    <>
                                        <div
                                            id="properties-list"
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
                                        >
                                            {properties.data.map((property, index) => (
                                                <div
                                                    key={property._id}
                                                    className="animate-slide-up"
                                                    style={{animationDelay: `${index * 0.1}s`}}
                                                >
                                                    <PropertyCard property={property}/>
                                                </div>
                                            ))}
                                        </div>

                                        {properties.total > 0 && (
                                            <Pagination
                                                currentPage={currentPage}
                                                totalItems={properties.total}
                                                pageSize={ITEMS_PER_PAGE}
                                                onPageChange={handlePageChange}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-600">No hay propiedades que coincidan con tus criterios
                                            de búsqueda.</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="map" className="mt-0">
                                <MapView
                                    properties={properties?.data || []}
                                    isLoading={isLoading}
                                    onAddressSelect={handleAddressSelect}
                                />
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
