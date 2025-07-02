import { useState, useEffect, useCallback } from 'react';
import { favoritesService } from '@/services/property-service';
import type { Property } from '@/types/property';
import { useAuth } from '@/contexts/AuthContext';

export function useFavorites() {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchFavorites = useCallback(async () => {
  if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const data = await favoritesService.getFavorites();
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
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (propertyId: string) => {
  if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      await favoritesService.addFavorite(propertyId);
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
      await favoritesService.removeFavorite(propertyId);
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