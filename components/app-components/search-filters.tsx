"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  X, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Euro, 
  Home, 
  BedDouble, 
  Sofa,
  Search
} from "lucide-react";
import { PROPERTY_TYPE } from '@/constants/property-type.enum'

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

const roomOptions = [
  { value: 0, label: "Cualquiera" },
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
  { value: 5, label: "5+" },
];

const furnishedOptions = [
  { value: "any", label: "Cualquiera" },
  { value: "furnished", label: "Amueblado" },
  { value: "unfurnished", label: "Sin Amueblar" },
  { value: "semi-furnished", label: "Semi-amueblado" },
];

const quickFilters = [
  { key: "furnished", value: "furnished", label: "Amueblado", icon: Sofa },
  { key: "propertyType", value: "APARTAMENTO_INDEPENDIENTE", label: "Apartamento independiente", icon: Home },
  { key: "rooms", value: 2, label: "2+ Habitaciones", icon: BedDouble },
];

export const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [locationOpen, setLocationOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);

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
    setPriceRange([0, 5000]);
  };

  const applyQuickFilter = (key: string, value: string | number) => {
    updateFilter(key as keyof typeof filters, value);
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

  const getActiveFiltersText = () => {
    const activeFilters = [];
    if (filters.location) activeFilters.push(filters.location);
    if (filters.propertyType !== "any") {
      const type = Object.entries(PROPERTY_TYPE).find(([key,]) => key === filters.propertyType);
      if (type) activeFilters.push(type[1]);
    }
    if (filters.rooms > 0) activeFilters.push(`${filters.rooms}+ hab.`);
    if (filters.furnished !== "any") {
      const furnished = furnishedOptions.find(f => f.value === filters.furnished);
      if (furnished) activeFilters.push(furnished.label);
    }
    if (filters.minPrice > 0 || filters.maxPrice < 5000) {
      activeFilters.push(`€${filters.minPrice}-${filters.maxPrice}`);
    }
    return activeFilters;
  };

  const activeFiltersCount = getActiveFiltersCount();
  const activeFiltersText = getActiveFiltersText();

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full justify-between h-12 bg-white shadow-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
        
        {/* Active Filters Preview */}
        {activeFiltersText.length > 0 && !isExpanded && (
          <div className="mt-2 flex flex-wrap gap-1">
            {activeFiltersText.slice(0, 3).map((filter, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {filter}
              </Badge>
            ))}
            {activeFiltersText.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{activeFiltersText.length - 3} más
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Filters Container */}
      <Card className={`sticky top-24 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5 text-teal-600" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                  {activeFiltersCount}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Limpiar
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quick Filters */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Filtros Rápidos
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.label}
                  variant="outline"
                  size="sm"
                  className={`justify-start h-10 ${
                    (filter.key === 'furnished' && filters.furnished === filter.value) ||
                    (filter.key === 'propertyType' && filters.propertyType === filter.value) ||
                    (filter.key === 'rooms' && filters.rooms >= Number(filter.value))
                      ? 'bg-teal-50 border-teal-200 text-teal-700'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => applyQuickFilter(filter.key, filter.value)}
                >
                  <filter.icon className="w-4 h-4 mr-2" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <Collapsible open={locationOpen} onOpenChange={setLocationOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-teal-600"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ubicación
                </div>
                {locationOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="relative">
                <Input
                  placeholder="Ingresa ciudad, barrio o dirección"
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="pl-12 form-input text-base"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Price Range Filter */}
          <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-teal-600"
              >
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4" />
                  Rango de Precio
                </div>
                {priceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-600">Mínimo</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice || ''}
                    onChange={(e) => {
                      const value = Number(e.target.value) || 0;
                      updateFilter('minPrice', value);
                      setPriceRange([value, priceRange[1]]);
                    }}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Máximo</Label>
                  <Input
                    type="number"
                    placeholder="5000"
                    value={filters.maxPrice || ''}
                    onChange={(e) => {
                      const value = Number(e.target.value) || 5000;
                      updateFilter('maxPrice', value);
                      setPriceRange([priceRange[0], value]);
                    }}
                    className="form-input text-sm"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Property Type Filter */}
          <Collapsible open={propertyOpen} onOpenChange={setPropertyOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-teal-600"
              >
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Tipo de Propiedad
                </div>
                {propertyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <Select value={filters.propertyType || 'any'} onValueChange={(value) => updateFilter('propertyType', value)}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Cualquier tipo</SelectItem>
                  {Object.entries(PROPERTY_TYPE).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          {/* Rooms Filter */}
          <Collapsible open={roomsOpen} onOpenChange={setRoomsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-teal-600"
              >
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4" />
                  Habitaciones
                </div>
                {roomsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="grid grid-cols-3 gap-2">
                {roomOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filters.rooms === option.value ? "default" : "outline"}
                    size="sm"
                    className={
                      filters.rooms === option.value
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "hover:bg-teal-50 hover:border-teal-200"
                    }
                    onClick={() => updateFilter('rooms', option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Furnished Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Sofa className="w-4 h-4" />
              Amueblado
            </Label>
            <Select value={filters.furnished || "any"} onValueChange={(value) => updateFilter('furnished', value)}>
              <SelectTrigger className="form-input">
                <SelectValue placeholder="Selecciona opción" />
              </SelectTrigger>
              <SelectContent>
                {furnishedOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Apply Filters Button (Mobile) */}
          <div className="lg:hidden pt-4 border-t">
            <Button
              className="w-full btn-primary h-12"
              onClick={() => setIsExpanded(false)}
            >
              <Search className="w-4 h-4 mr-2" />
              Aplicar Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
