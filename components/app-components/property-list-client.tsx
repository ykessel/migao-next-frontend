'use client';
import {useState, useMemo, useCallback} from "react";
import {useSearchProperties} from "@/hooks/use-properties";
import {Pagination} from "../app-components/pagination";
import {Property} from "@/types/property";
import {PropertyListSkeleton} from "../skeletons/PropertyListSkeleton";
import {useFavorites} from "@/hooks/use-favorites";
import {useRouter, useSearchParams} from "next/navigation";
import {PropertyCard} from "../property/PropertyCard";
import PropertySortSelect from "./PropertySortSelect";
import PropertyCardItemList from "@/components/property/PropertyCardItemList";
import PropertyViewControls from "./PropertyViewControls";
import {useDebounce} from "@/hooks/use-debounce";
import dynamic from "next/dynamic";
import {parseSearchParams} from "@/lib/utils";

const MapView = dynamic(
    () => import("../map/map-view").then((mod) => mod.MapView),
    {ssr: false}
);

const ITEMS_PER_PAGE = 9;

type ViewMode = "card" | "list" | "map";
type SortOption =
    | "price-asc"
    | "price-desc"
    | "created-asc"
    | "created-desc"
    | "updated-asc"
    | "updated-desc";

function getSortObject(sortBy: SortOption): { [key: string]: 1 | -1 } {
    switch (sortBy) {
        case "price-asc":
            return {rentPricePerMonth: 1};
        case "price-desc":
            return {rentPricePerMonth: -1};
        case "created-asc":
            return {createdAt: 1};
        case "created-desc":
            return {createdAt: -1};
        case "updated-asc":
            return {updatedAt: 1};
        case "updated-desc":
            return {updatedAt: -1};
        default:
            return {createdAt: -1};
    }
}

export function PropertyListClientContent() {
    const router = useRouter();
    const urlSearchParams = useSearchParams();

    const rawParams = useMemo(
        () => Object.fromEntries(urlSearchParams.entries()),
        [urlSearchParams]
    );
    const parsedParams = useMemo(() => parseSearchParams(rawParams), [rawParams]);
    const sortBy = parsedParams.sort || "created-desc";
    const currentPage = parsedParams.page || 1;

    const [viewMode, setViewMode] = useState<ViewMode>("card");

    const searchParams = useMemo(() => ({
        ...parsedParams,
        sort: getSortObject(sortBy as SortOption),
        page: currentPage,
        size: ITEMS_PER_PAGE,
    }), [parsedParams, sortBy, currentPage]);

    const {data: properties, isLoading} = useSearchProperties(searchParams);

    const {
        addFavorite,
        removeFavorite,
        isFavorite,
        loading: favLoading,
    } = useFavorites();

    const updateUrlParam = useCallback(
        (key: string, value: string, resetPage = false) => {
            const params = new URLSearchParams(urlSearchParams.toString());
            params.set(key, value);
            if (resetPage && key !== "page") params.set("page", "1");
            router.push(`?${params.toString()}`, {scroll: false});
        },
        [router, urlSearchParams]
    );

    const handleSortChange = useCallback(
        (value: SortOption) => updateUrlParam("sort", value, true),
        [updateUrlParam]
    );
    const handlePageChange = useCallback(
        (page: number) => updateUrlParam("page", page.toString()),
        [updateUrlParam]
    );
    const handleViewModeChange = useCallback((mode: ViewMode) => setViewMode(mode), []);

    const renderPropertyList = useCallback(() => {
        if (viewMode === "map") {
            return (
                <div className="relative">
                    <MapView
                        searchParams={searchParams}
                        onAddressSelect={() => {
                        }}
                    />
                </div>
            );
        }

        if (viewMode === "list") {
            return (
                <div className="relative">
                    <div className="space-y-4">
                        {properties?.data.map((property: Property, idx: number) => (
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
                </div>
            );
        }

        return (
            <div className="w-full px-2 sm:px-4 lg:px-6">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {properties?.data.map((property: Property, idx: number) => (
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
            </div>
        );
    }, [viewMode, properties?.data, searchParams, isFavorite, addFavorite, removeFavorite, favLoading]);

    return (
        <div id="properties-section" className="space-y-6 relative">
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            Propiedades Disponibles
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                            <span>
                              {isLoading && !properties
                                  ? "Cargando..."
                                  : `${properties?.total || 0} propiedades encontradas`}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <PropertyViewControls
                        viewMode={viewMode}
                        onChange={handleViewModeChange}
                    />
                    <div className="flex items-center gap-2">
                        <span className="hidden text-nowrap sm:inline text-sm font-medium text-gray-700 mr-2">
                            Ordenar por:
                        </span>
                        <PropertySortSelect
                            value={typeof sortBy === "string" ? sortBy : undefined}
                            onChange={handleSortChange}
                        />
                    </div>
                </div>
            </div>

            {/* Loading skeleton solo reemplaza el área de propiedades */}
            {viewMode === "card" && isLoading && !properties ? (
                <PropertyListSkeleton/>
            ) : properties?.data?.length === 0 ? (
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <div className="mb-4">
                            <div
                                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                                    />
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
            ) : (
                renderPropertyList()
            )}

            {viewMode !== "map" &&
                properties &&
                properties.total > ITEMS_PER_PAGE && (
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
    );
}

export function PropertyListClient() {
    return (<PropertyListClientContent/>);
}
