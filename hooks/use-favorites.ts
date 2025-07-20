import {useState, useEffect, useCallback} from 'react';
import {favoritesService} from '@/services/api-client';
import type {Property} from '@/types/property';
import {useSession} from 'next-auth/react';

export function useFavorites() {
    const {data: session} = useSession();
    const isAuthenticated = !!session;
    const [favorites, setFavorites] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = (session as unknown as { access_token?: string })?.access_token;

    console.log('session', session);

    const fetchFavorites = useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        setError(null);
        try {
            const data = await favoritesService.getFavorites(token);
            setFavorites(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error fetching favorites');
            }
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    useEffect(() => {
        fetchFavorites().then(r => console.log('Favorites fetched', r));
    }, [fetchFavorites]);

    const addFavorite = async (propertyId: string) => {
        if (!isAuthenticated) return;
        setLoading(true);
        setError(null);
        try {
            await favoritesService.addFavorite(propertyId, token);
            await fetchFavorites();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error adding favorite');
            }
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (propertyId: string) => {
        if (!isAuthenticated) return;
        setLoading(true);
        setError(null);
        try {
            await favoritesService.removeFavorite(propertyId, token);
            await fetchFavorites();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error removing favorite');
            }
        } finally {
            setLoading(false);
        }
    };

    const isFavorite = (propertyId: string) => {
        if (!isAuthenticated) return;
        return favorites.some((fav) => fav._id === propertyId);
    };

    return {
        favorites,
        loading,
        error,
        addFavorite,
        removeFavorite,
        isFavorite,
        refetch: fetchFavorites,
    };
} 