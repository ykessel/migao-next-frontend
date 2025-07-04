
"use client";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Search, Filter, Trash2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/use-favorites";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Property } from "@/types/property";

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const { toast } = useToast();
  const { favorites, loading, error, removeFavorite } = useFavorites();

  // Filter and sort favorite properties
  const filteredAndSortedProperties = favorites
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location?.address?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === "all") return matchesSearch;
      if (filterBy === "immediate") return matchesSearch && property.isAvailable;
      if (filterBy === "furnished") return matchesSearch && property.furnished;
      if (filterBy === property.propertyType) return matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.rentPricePerMonth || 0) - (b.rentPricePerMonth || 0);
        case "price-high":
          return (b.rentPricePerMonth || 0) - (a.rentPricePerMonth || 0);
        case "size":
          return (b.area || 0) - (a.area || 0);
        default: // recent
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
    });

  const handleRemoveFromFavorites = async (propertyId: string) => {
    try {
      await removeFavorite(propertyId);
      setSelectedProperties(prev => prev.filter(id => id !== propertyId));
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
            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar en favoritos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Más recientes</SelectItem>
                      <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                      <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                      <SelectItem value="size">Por tamaño</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="immediate">Disponible ahora</SelectItem>
                      <SelectItem value="furnished">Amuebladas</SelectItem>
                      <SelectItem value="apartment">Apartamentos</SelectItem>
                      <SelectItem value="house">Casas</SelectItem>
                      <SelectItem value="studio">Estudios</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Badge variant="outline" className="text-teal-600 border-teal-600">
                      {filteredAndSortedProperties.length} resultados
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProperties.map((property) => (
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
