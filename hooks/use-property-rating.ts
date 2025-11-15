'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {propertyRatingService} from '@/services/api-client';
import {propertyKeys} from '@/hooks/use-properties';
import {toast} from 'sonner';

interface RatePropertyParams {
    slug: string;
    rating: number;
}

/**
 * useRateProperty Hook
 *
 * Custom hook to handle property rating functionality.
 * Uses React Query's useMutation for optimistic updates and error handling.
 *
 * @returns Mutation object with mutate function, loading state, and error
 */
export function useRateProperty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({slug, rating}: RatePropertyParams) =>
            propertyRatingService.rateProperty(slug, rating),
        onSuccess: () => {
            toast.success('¡Gracias por tu calificación!');
            queryClient.invalidateQueries({
                queryKey: propertyKeys.details(),
                exact: false,
            });
        },
        onError: (error: Error & { response?: { data?: { message?: string } } }) => {
            console.error('Error rating property:', error);
            const errorMessage =
                error.response?.data?.message ||
                'No se pudo enviar tu calificación. Intenta de nuevo.';
            toast.error(errorMessage);
        },
    });
}

