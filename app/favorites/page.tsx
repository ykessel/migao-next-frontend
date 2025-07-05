
"use client";
import { useState } from "react";
import { Navigation } from "@/components/app-components/navigation";
import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search, Trash2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/use-favorites";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const Favorites = () => {
  const { toast } = useToast();
  const { favorites, loading, error, removeFavorite } = useFavorites();

  const handleRemoveFromFavorites = async (propertyId: string) => {
    try {
      await removeFavorite(propertyId);
      toast({
        title: "Eliminado de favoritos",
        description: "La propiedad ha sido eliminada de tus favoritos.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la propiedad de favoritos.",
        variant: "destructive",
      });
    }
  };

  const handleShareFavorites = () => {
    const favoriteIds = favorites.map(prop => prop._id).filter(Boolean);
    const shareUrl = `${window.location.origin}/favorites?shared=${btoa(JSON.stringify(favoriteIds))}`;
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "Enlace copiado",
      description: "El enlace para compartir tus favoritos ha sido copiado al portapapeles.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Error al cargar favoritos
              </h3>
              <p className="text-gray-600 mb-6">
                {error}
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Reintentar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Heart className="w-8 h-8 mr-3 text-coral-500 fill-current" />
                Mis Favoritos
              </h1>
              <p className="text-gray-600 mt-2">
                {favorites.length} {favorites.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
              </p>
            </div>
            
            {favorites.length > 0 && (
              <div className="flex space-x-2">
                <Button
                  onClick={handleShareFavorites}
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          // Empty State
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tienes favoritos aún
              </h3>
              <p className="text-gray-600 mb-6">
                Explora propiedades y guarda las que más te gusten haciendo clic en el corazón
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Explorar Propiedades
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((property) => (
                <div key={property.propertyId} className="relative">                 
                  {/* Remove from Favorites Button */}
                  <div className="absolute top-4 right-16 z-10">
                    <Button
                      onClick={() => handleRemoveFromFavorites(property._id!)}
                      size="sm"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white text-coral-500 hover:text-coral-600 rounded-full p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
