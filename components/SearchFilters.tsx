import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

interface SearchFiltersProps {
  filters: {
    location: string;
    minPrice: number;
    maxPrice: number;
    propertyType: string;
    rooms: number;
    furnished: string;
  };
  onFiltersChange: (filters: {
    location: string;
    minPrice: number;
    maxPrice: number;
    propertyType: string;
    rooms: number;
    furnished: string;
  }) => void;
}

export const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof typeof filters, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: "",
      minPrice: 0,
      maxPrice: 5000,
      propertyType: "any",
      rooms: 0,
      furnished: "any"
    };
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.location) count++;
    if (filters.propertyType && filters.propertyType !== "any") count++;
    if (filters.rooms > 0) count++;
    if (filters.furnished && filters.furnished !== "any") count++;
    if (filters.minPrice > 0 || filters.maxPrice < 5000) count++;
    return count;
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-teal-600" />
            Filtros
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              {isExpanded ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
            </Button>
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-teal-600 hover:text-teal-700"
              >
                Limpiar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm font-medium text-gray-700">
            Ubicación
          </Label>
          <Input
            id="location"
            placeholder="Ingresa ciudad o área"
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            Rango de Precio (EUR)
          </Label>
          <div className="mt-2 space-y-2">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Mín"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : 0)}
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Máx"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : 5000)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            Tipo de Propiedad
          </Label>
          <Select value={filters.propertyType || "any"} onValueChange={(value) => updateFilter('propertyType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Cualquier tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquier tipo</SelectItem>
              <SelectItem value="apartment">Apartamento</SelectItem>
              <SelectItem value="house">Casa</SelectItem>
              <SelectItem value="studio">Estudio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Rooms */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            Habitaciones Mínimas
          </Label>
          <Select 
            value={filters.rooms === 0 ? "any" : filters.rooms.toString()} 
            onValueChange={(value) => updateFilter('rooms', value === "any" ? 0 : parseInt(value))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Cualquiera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquiera</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Furnished */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            Amueblado
          </Label>
          <Select value={filters.furnished || "any"} onValueChange={(value) => updateFilter('furnished', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Cualquiera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquiera</SelectItem>
              <SelectItem value="furnished">Amueblado</SelectItem>
              <SelectItem value="unfurnished">Sin Amueblar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filters */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Filtros Rápidos
          </Label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Admite Mascotas", value: "pet-friendly" },
              { label: "Balcón", value: "balcony" },
              { label: "Estacionamiento", value: "parking" },
              { label: "Jardín", value: "garden" }
            ].map((tag) => (
              <Badge
                key={tag.value}
                variant="outline"
                className="cursor-pointer hover:bg-teal-600 hover:text-white transition-colors"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
