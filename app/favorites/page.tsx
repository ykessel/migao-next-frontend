
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Search, Filter, Trash2, Share2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock properties data - in a real app this would come from an API
const mockProperties = [
  {
    id: 1,
    title: "Apartamento Moderno en el Centro",
    price: 2500,
    currency: "EUR",
    rooms: 2,
    bathrooms: 1,
    squareMeters: 85,
    location: "Berlín, Mitte",
    propertyType: "apartment",
    availability: "immediate",
    images: ["photo-1721322800607-8c38375eef04", "photo-1487958449943-2429e8be8625"],
    description: "Hermoso apartamento moderno en el corazón de Berlín",
    furnished: true,
    contact: { telegram: "@berlinhomes", whatsapp: "+491234567890", phone: "+491234567890" }
  },
  {
    id: 2,
    title: "Casa Familiar con Jardín",
    price: 3200,
    currency: "EUR",
    rooms: 4,
    bathrooms: 2,
    squareMeters: 120,
    location: "Munich, Schwabing",
    propertyType: "house",
    availability: "next-month",
    images: ["photo-1649972904349-6e44c42644a7", "photo-1488590528505-98d2b5aba04b"],
    description: "Amplia casa familiar con jardín privado",
    furnished: false,
    contact: { whatsapp: "+491234567891", phone: "+491234567891" }
  },
  {
    id: 3,
    title: "Estudio Acogedor",
    price: 1800,
    currency: "EUR",
    rooms: 1,
    bathrooms: 1,
    squareMeters: 45,
    location: "Hamburgo, St. Pauli",
    propertyType: "studio",
    availability: "immediate",
    images: ["photo-1721322800607-8c38375eef04"],
    description: "Perfecto para estudiantes o profesionales jóvenes",
    furnished: true,
    contact: { telegram: "@hamburgstudios", phone: "+491234567892" }
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const { toast } = useToast();

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('property-favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setFavorites(favoriteIds);
      
      // Filter mock properties to get favorite properties
      const favProps = mockProperties.filter(prop => favoriteIds.includes(prop.id));
      setFavoriteProperties(favProps);
    }
  }, []);

  // Filter and sort favorite properties
  const filteredAndSortedProperties = favoriteProperties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === "all") return matchesSearch;
      if (filterBy === "immediate") return matchesSearch && property.availability === "immediate";
      if (filterBy === "furnished") return matchesSearch && property.furnished;
      if (filterBy === property.propertyType) return matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "size":
          return b.squareMeters - a.squareMeters;
        default: // recent
          return b.id - a.id;
      }
    });

  const handleRemoveFromFavorites = (propertyId: number) => {
    const updatedFavorites = favorites.filter(id => id !== propertyId);
    setFavorites(updatedFavorites);
    setFavoriteProperties(prev => prev.filter(prop => prop.id !== propertyId));
    localStorage.setItem('property-favorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: "Eliminado de favoritos",
      description: "La propiedad ha sido eliminada de tus favoritos.",
    });
  };

  const handleSelectProperty = (propertyId: number) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleBulkRemove = () => {
    const updatedFavorites = favorites.filter(id => !selectedProperties.includes(id));
    setFavorites(updatedFavorites);
    setFavoriteProperties(prev => prev.filter(prop => !selectedProperties.includes(prop.id)));
    localStorage.setItem('property-favorites', JSON.stringify(updatedFavorites));
    setSelectedProperties([]);
    
    toast({
      title: "Propiedades eliminadas",
      description: `${selectedProperties.length} propiedades eliminadas de favoritos.`,
    });
  };

  const handleShareFavorites = () => {
    const shareUrl = `${window.location.origin}/favorites?shared=${btoa(JSON.stringify(favorites))}`;
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "Enlace copiado",
      description: "El enlace para compartir tus favoritos ha sido copiado al portapapeles.",
    });
  };

  const handleClearAll = () => {
    setFavorites([]);
    setFavoriteProperties([]);
    setSelectedProperties([]);
    localStorage.removeItem('property-favorites');
    
    toast({
      title: "Favoritos eliminados",
      description: "Todos los favoritos han sido eliminados.",
    });
  };

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
                {favoriteProperties.length} {favoriteProperties.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
              </p>
            </div>
            
            {favoriteProperties.length > 0 && (
              <div className="flex space-x-2">
                <Button
                  onClick={handleShareFavorites}
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
                <Button
                  onClick={handleClearAll}
                  variant="outline"
                  className="border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar Todo
                </Button>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedProperties.length > 0 && (
            <Card className="mb-6 border-coral-200 bg-coral-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-coral-700">
                    {selectedProperties.length} {selectedProperties.length === 1 ? 'propiedad seleccionada' : 'propiedades seleccionadas'}
                  </span>
                  <Button
                    onClick={handleBulkRemove}
                    size="sm"
                    className="bg-coral-500 hover:bg-coral-600 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar Seleccionadas
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {favoriteProperties.length === 0 ? (
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
                <div key={property.id} className="relative">
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 left-4 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={() => handleSelectProperty(property.id)}
                      className="w-4 h-4 text-teal-600 bg-white border-gray-300 rounded focus:ring-teal-500"
                    />
                  </div>
                  
                  {/* Remove from Favorites Button */}
                  <div className="absolute top-4 right-16 z-10">
                    <Button
                      onClick={() => handleRemoveFromFavorites(property.id)}
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
