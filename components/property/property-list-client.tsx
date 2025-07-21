"use client";
import { useState, Suspense, useMemo } from "react";
import { useSearchProperties } from "@/hooks/use-properties";
import { PropertyCard } from "./property-card";
import { Pagination } from "../app-components/pagination";
import { Property } from "@/types/property";
import { PropertyListSkeleton } from "../skeletons/PropertyListSkeleton";
import dynamic from "next/dynamic";
import { useFavorites } from "@/hooks/use-favorites";
import { useRouter, useSearchParams } from "next/navigation";
import { parseSearchParams } from "./property-list";
import PropertyCardItemList from "@/components/property/property-card-item-list";
import PropertySortSelect from "../app-components/PropertySortSelect";
import PropertyViewControls from "../app-components/PropertyViewControls";


const MapView = dynamic(
  () => import("../map/map-view").then((mod) => mod.MapView),
  { ssr: false }
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
      return { rentPricePerMonth: 1 as const };
    case "price-desc":
      return { rentPricePerMonth: -1 as const };
    case "created-asc":
      return { createdAt: 1 as const };
    case "created-desc":
      return { createdAt: -1 as const };
    case "updated-asc":
      return { updatedAt: 1 as const };
    case "updated-desc":
      return { updatedAt: -1 as const };
    default:
      return { createdAt: -1 as const };
  }
}

function PropertyListClientContent() {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  // All state is derived from the URL
  const rawParams = useMemo(
    () => Object.fromEntries(urlSearchParams.entries()),
    [urlSearchParams]
  );
  const parsedParams = useMemo(() => parseSearchParams(rawParams), [rawParams]);
  const sortBy = parsedParams.sort || "created-desc";
  const currentPage = parsedParams.page || 1;
  const [viewMode, setViewMode] = useState<ViewMode>("card");

  const { data: properties, isLoading } = useSearchProperties({
    ...parsedParams,
    sort: getSortObject(sortBy as SortOption),
    page: currentPage,
    size: ITEMS_PER_PAGE,
  });

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
    loading: favLoading,
  } = useFavorites();

  // All changes update the URL
  const updateUrlParam = (key: string, value: string) => {
    const params = new URLSearchParams(urlSearchParams.toString());
    params.set(key, value);
    // if (key !== "page") params.set("page", "1"); // Reset to first page on filter/sort change
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (value: SortOption) => updateUrlParam("sort", value);
  const handlePageChange = (page: number) =>
    updateUrlParam("page", page.toString());
  const handleViewModeChange = (mode: ViewMode) => setViewMode(mode);

  if (isLoading && !properties) return <PropertyListSkeleton />;

  if (!properties?.data || properties.data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
    );
  }

  const renderPropertyList = () => {
    if (viewMode === "map") {
      return (
        <MapView
          properties={properties?.data || []}
          isLoading={isLoading}
          onAddressSelect={() => {}}
          showSelected={false}
        />
      );
    }
    if (viewMode === "list") {
      return (
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
      );
    }
    return (
      <div className={"grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}>
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
    );
  };

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
                {isLoading
                  ? "Cargando..."
                  : `${properties?.total || 0} propiedades encontradas`}
              </span>
            </div>
          </div>
        </div>

        {/* View Controls and Sorting */}
        <div className="flex flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <PropertyViewControls viewMode={viewMode} onChange={handleViewModeChange} />
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm font-medium text-gray-700 mr-2">
              Ordenar por:
            </span>
            <PropertySortSelect value={typeof sortBy === "string" ? sortBy : undefined} onChange={handleSortChange} />
          </div>
        </div>
      </div>

      {/* Properties Display */}
      {isLoading ? <PropertyListSkeleton /> : renderPropertyList()}

      {/* Pagination - Only show for card/list view */}
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
  return (
    <Suspense fallback={<PropertyListSkeleton />}>
      <PropertyListClientContent />
    </Suspense>
  );
}
