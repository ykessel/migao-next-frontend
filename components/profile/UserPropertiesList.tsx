'use client';

import {Button} from '@/components/ui/button';
import {Home, Plus} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {Pagination} from '@/components/app-components/pagination';
import {UserPropertyCard} from './UserPropertyCard';
import {UserPropertyCardSkeleton} from './UserPropertyCardSkeleton';
import {useUserProperties} from './hooks/useUserProperties';

/**
 * UserPropertiesList Component
 * 
 * Main component for displaying user's property list with pagination.
 * Follows Single Responsibility Principle - Only handles presentation and layout.
 * All business logic is delegated to the useUserProperties custom hook.
 * 
 * Responsibilities:
 * - Render loading state with skeletons
 * - Render empty state with CTA
 * - Render properties grid with cards
 * - Render pagination controls
 * - Handle navigation to property pages
 */
export function UserPropertiesList() {
    const router = useRouter();
    const {
        properties,
        totalItems,
        isLoading,
        currentPage,
        itemsPerPage,
        handlePageChange,
        handleDeleteProperty,
    } = useUserProperties();

    // Navigation handlers
    const handleEditProperty = (slug: string) => {
        router.push(`/property/${slug}/edit`);
    };

    const handleViewProperty = (slug: string) => {
        router.push(`/property/${slug}`);
    };

    // Loading State
    if (isLoading) {
        return (
            <div id="user-properties-list" className="space-y-6">
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {Array.from({length: itemsPerPage}).map((_, index) => (
                        <UserPropertyCardSkeleton key={index}/>
                    ))}
                </div>
                    </div>
        );
    }

    // Empty State
    if (!properties || properties.length === 0) {
    return (
            <div id="user-properties-list" className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Home className="w-8 h-8 text-gray-400"/>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No tienes propiedades creadas
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Comienza creando tu primera propiedad para alquilar
                    </p>
                    <Button
                        onClick={() => router.push('/publish')}
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2"/>
                        Crear Primera Propiedad
                    </Button>
            </div>
        );
    }

    // Properties List
    return (
        <div id="user-properties-list" className="space-y-6">
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {properties.map((property) => (
                    <UserPropertyCard
                        key={property._id}
                        property={property}
                        onEdit={() => handleEditProperty(property.slug!)}
                        onView={() => handleViewProperty(property.slug!)}
                        onDelete={() => handleDeleteProperty(property)}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalItems > itemsPerPage && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        pageSize={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
} 
