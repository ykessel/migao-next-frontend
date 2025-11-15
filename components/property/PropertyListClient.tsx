'use client';

import {Pagination} from '@/components/app-components/pagination';
import {PropertyListSkeleton} from '@/components/skeletons/PropertyListSkeleton';
import {PropertyListHeader} from './PropertyListHeader';
import {PropertyListEmptyState} from './PropertyListEmptyState';
import {PropertyCardView} from './views/PropertyCardView';
import {PropertyListView} from './views/PropertyListView';
import {PropertyMapView} from './views/PropertyMapView';
import {usePropertyList} from './hooks/usePropertyList';
export function PropertyListClient() {
    const {
        properties,
        isLoading,
        searchParams,
        viewMode,
        sortBy,
        currentPage,
        itemsPerPage,
        addFavorite,
        removeFavorite,
        isFavorite,
        favLoading,
        handleSortChange,
        handlePageChange,
        handleViewModeChange,
    } = usePropertyList();

    const propertyData = properties?.data || [];
    const totalProperties = properties?.total || 0;

    /**
     * Render property list based on current view mode
     */
    const renderPropertyList = () => {
        if (viewMode === "map") {
            return <PropertyMapView searchParams={searchParams} />;
        }

        if (viewMode === "list") {
            return (
                <PropertyListView
                    properties={propertyData}
                    isFavorite={(id) => Boolean(isFavorite(id))}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    favLoading={favLoading}
                />
            );
        }

        return (
            <PropertyCardView
                properties={propertyData}
                isFavorite={(id) => Boolean(isFavorite(id))}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                favLoading={favLoading}
            />
        );
    };

    return (
        <div id="properties-section" className="space-y-6 relative">
            {/* Header with controls */}
            <PropertyListHeader
                totalProperties={totalProperties}
                isLoading={isLoading && !properties}
                viewMode={viewMode}
                sortBy={sortBy}
                onViewModeChange={handleViewModeChange}
                onSortChange={handleSortChange}
            />

            {/* Loading State - Only for card view */}
            {viewMode === "card" && isLoading && !properties ? (
                <PropertyListSkeleton />
            ) : propertyData.length === 0 ? (
                /* Empty State */
                <PropertyListEmptyState />
            ) : (
                /* Property List */
                renderPropertyList()
            )}

            {/* Pagination - Hide for map view */}
            {viewMode !== "map" &&
                properties &&
                totalProperties > itemsPerPage && (
                    <div className="mt-12 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalItems={totalProperties}
                            pageSize={itemsPerPage}
                            onPageChange={handlePageChange}
                            aria-label="Paginación de propiedades"
                        />
                    </div>
                )}
        </div>
    );
}

