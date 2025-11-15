'use client';

import {useState, useMemo} from 'react';
import {useSession} from 'next-auth/react';
import {jwtDecode} from 'jwt-decode';
import {useSearchProperties} from '@/hooks/use-properties';
import {useDeleteProperty} from '@/hooks/use-user-properties';
import {toast} from 'sonner';
import {Property} from '@/types/property';

const ITEMS_PER_PAGE = 12;

type DecodedJwt = { user?: { _id?: string }, _id?: string, sub?: string };

/**
 * useUserProperties Hook
 * 
 * Custom hook that encapsulates all business logic for user properties management.
 * Follows Single Responsibility Principle and Dependency Inversion Principle.
 * 
 * @returns Object containing properties data, loading state, pagination, and action handlers
 */
export function useUserProperties() {
    const {data: session} = useSession();
    const [currentPage, setCurrentPage] = useState(1);

    // Extract user ID from session token
    const userId = useMemo(() => {
        const accessToken = (session as { access_token?: string } | null | undefined)?.access_token;
        
        if (!accessToken) return undefined;

        try {
            const decoded = jwtDecode<DecodedJwt>(accessToken);
            return decoded.user?._id || decoded._id || decoded.sub;
        } catch {
            return undefined;
        }
    }, [session]);

    // Fetch properties with filters
    const {data, isLoading} = useSearchProperties({
        filters: userId ? [{type: 'TERM', field: 'owner._id', value: userId}] : [],
        size: ITEMS_PER_PAGE,
        page: currentPage,
    });

    const properties = data?.data || [];
    const totalItems = data?.total || 0;

    const deletePropertyMutation = useDeleteProperty();

    /**
     * Handle property deletion
     */
    const handleDeleteProperty = async (property: Property) => {
        try {
            await deletePropertyMutation.mutateAsync(property._id!);
            toast.success("Propiedad eliminada exitosamente");
        } catch (error) {
            // @ts-expect-error error.message can not exist
            const errorMessage = error?.message || "No se pudo eliminar la propiedad. Intenta de nuevo.";
            toast.error(errorMessage);
        }
    };

    /**
     * Handle page change with smooth scroll
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        
        // Scroll to top of the properties list component
        const propertiesSection = document.getElementById('user-properties-list');
        if (propertiesSection) {
            propertiesSection.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };

    return {
        // Data
        properties,
        totalItems,
        isLoading,
        
        // Pagination
        currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
        handlePageChange,
        
        // Actions
        handleDeleteProperty,
    };
}

