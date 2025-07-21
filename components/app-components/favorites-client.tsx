'use client'
import { PropertyCard } from '@/components/property/property-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Search } from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites'
import { FavoritesSkeleton } from '../skeletons/PropertyListSkeleton';
import { useEffect, useRef, useState } from 'react';

export function FavoritesClient() {
  const { removeFavorite, addFavorite, isFavorite, loading: favLoading, favorites } = useFavorites();

  // Prevent empty state flicker on first load
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const wasLoading = useRef(false);
  useEffect(() => {
    if (favLoading) {
      wasLoading.current = true;
    } else if (wasLoading.current) {
      setIsFirstLoad(false);
    }
  }, [favLoading]);

  if (favLoading || isFirstLoad) {
    return (
      <FavoritesSkeleton />
    );
  }

  if (!favLoading && !isFirstLoad && favorites.length === 0) {
    return (
      <Card className="text-center py-12" aria-live="polite" aria-busy="false">
        <CardContent>
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tienes favoritos aún
          </h3>
          <p className="text-gray-600 mb-6">
            Explora propiedades y guarda las que más te gusten haciendo clic en el corazón
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-teal-600 hover:bg-teal-700 text-white"
            aria-label="Explorar Propiedades"
          >
            <Search className="w-4 h-4 mr-2" aria-hidden="true" />
            Explorar Propiedades
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-red fill-current" aria-hidden="true" />
              Mis Favoritos
            </h1>
            <p className="text-gray-600 mt-2">
              {favorites.length} {favorites.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
            </p>
          </div>
        </div>
      </div>
      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-live="polite" aria-busy="false">
        {favorites.map((property) => (
          <div key={property._id} className="relative">
            <PropertyCard 
              property={property}
              isFavorite={Boolean(isFavorite(property._id!))}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              favLoading={favLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 