"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Home, MapPin, Info, Users } from "lucide-react";
import PlaceTypeFilter from "./place-type-filter";
import { PlaceType } from "@/constants/places.enum";
import type { Property } from "@/types/property";
import { Amenities } from "@/types/amenities";
import { HouseRules } from "@/types/house-rules";
import { GAS_AVAILABILITY } from "@/constants/gas-availability.enum";
import { PlaceOfInterestMarkersProps } from "./place-of-interest-markers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface PropertyTabsProps {
  property: Property;
  placeTypeIconLabel: Record<string, { icon: React.ReactNode; label?: string }>;
  typeColors: Record<PlaceType, string>;
  allTypes: PlaceType[];
  selectedTypes: PlaceType[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<PlaceType[]>>;
  markerStyle: string;
  getApartmentAmenityIcon: (amenity: string) => React.ReactNode;
  getApartmentAmenityLabel: (amenity: string) => string;
  getRuleIcon: (rule: string) => React.ReactNode;
  PropertyMap: React.ComponentType<{ property: Property }>;
  PlaceOfInterestMarkers: React.ComponentType<PlaceOfInterestMarkersProps>;
}

export default function PropertyTabs({
  property,
  placeTypeIconLabel,
  typeColors,
  allTypes,
  selectedTypes,
  setSelectedTypes,
  markerStyle,
  getApartmentAmenityIcon,
  getApartmentAmenityLabel,
  getRuleIcon,
  PropertyMap,
  PlaceOfInterestMarkers,
}: PropertyTabsProps) {
  return (
    <TooltipProvider>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="flex w-full justify-between bg-gray-50 rounded-xl p-1 shadow-sm mb-6">
          <TabsTrigger
            value="description"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 mx-1 font-semibold transition-all duration-200
            data-[state=active]:bg-teal-600 data-[state=active]:text-white
            data-[state=active]:shadow
            data-[state=inactive]:bg-transparent data-[state=inactive]:text-teal-700
            hover:bg-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400"
          >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-1">
                    <Info className="w-5 h-5" />
                    <span className="hidden sm:inline">Descripción</span>
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  <span>Descripción</span>
                </TooltipContent>
              </Tooltip>
          </TabsTrigger>
          <TabsTrigger
            value="amenities"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 mx-1 font-semibold transition-all duration-200
            data-[state=active]:bg-teal-600 data-[state=active]:text-white
            data-[state=active]:shadow
            data-[state=inactive]:bg-transparent data-[state=inactive]:text-teal-700
            hover:bg-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex gap-1">
                  <Home className="w-5 h-5" />
                  <span className="hidden sm:inline">Comodidades</span>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <span>Comodidades</span>
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
          <TabsTrigger
            value="rules"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 mx-1 font-semibold transition-all duration-200
            data-[state=active]:bg-teal-600 data-[state=active]:text-white
            data-[state=active]:shadow
            data-[state=inactive]:bg-transparent data-[state=inactive]:text-teal-700
            hover:bg-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex gap-1">
                  <Users className="w-5 h-5" />
                  <span className="hidden sm:inline">Qué saber</span>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <span>Qué saber</span>
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
          <TabsTrigger
            value="neighborhood"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 mx-1 font-semibold transition-all duration-200
            data-[state=active]:bg-teal-600 data-[state=active]:text-white
            data-[state=active]:shadow
            data-[state=inactive]:bg-transparent data-[state=inactive]:text-teal-700
            hover:bg-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex gap-1">
                  <MapPin className="w-5 h-5" />
                  <span className="hidden sm:inline">Vecindario</span>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <span>Vecindario</span>
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
        </TabsList>
        {/* Description Tab */}
        <TabsContent value="description" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Sobre esta propiedad
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                Ubicación en el mapa
              </h3>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <PropertyMap property={property} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Amenities Tab */}
        <TabsContent value="amenities" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2 text-teal-600" />
                Comodidades
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(property.amenities).map(([key, value]) => {
                  const amenityKey = key as keyof Amenities;
                  const amenityValue = value as Amenities[keyof Amenities];
                  if (typeof amenityValue === "boolean" && amenityValue) {
                    return (
                      <div
                        key={amenityKey}
                        className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="text-teal-600 text-xl">
                          {getApartmentAmenityIcon(amenityKey)}
                        </div>
                        <span className="text-sm">
                          {getApartmentAmenityLabel(amenityKey)}
                        </span>
                      </div>
                    );
                  }
                  if (
                    amenityKey === "gasAvailability" &&
                    amenityValue !== undefined &&
                    amenityValue !== GAS_AVAILABILITY.NONE
                  ) {
                    return (
                      <div
                        key={amenityKey}
                        className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="text-teal-600 text-xl">
                          {getApartmentAmenityIcon(amenityKey)}
                        </div>
                        <span className="text-sm">
                          {getApartmentAmenityLabel(amenityKey)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Reglas del apartamento
                </h3>
                <div className="space-y-3">
                  {Object.entries(property.houseRules).map(([key, value]) => {
                    const ruleKey = key as keyof HouseRules;
                    const ruleValue = value as HouseRules[keyof HouseRules];
                    if (typeof ruleValue === "boolean") {
                      const rule =
                        ruleKey === "petsAllowed"
                          ? "Mascotas permitidas"
                          : ruleKey === "smokingAllowed"
                          ? "Fumar permitido"
                          : ruleKey === "partiesAllowed"
                          ? "Fiestas permitidas"
                          : "";
                      if (rule) {
                        return (
                          <div
                            key={ruleKey}
                            className="flex items-center space-x-3"
                          >
                            {getRuleIcon(rule)}
                            <span className="text-sm">{rule}</span>
                          </div>
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Check-in / Check-out
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Check-in:</span>
                    <span className="text-sm font-medium">
                      {property.houseRules.checkInTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Check-out:</span>
                    <span className="text-sm font-medium">
                      {property.houseRules.checkOutTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Máximo de huéspedes:
                    </span>
                    <span className="text-sm font-medium">
                      {property.houseRules.maxGuests}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* Neighborhood Tab */}
        <TabsContent value="neighborhood" className="space-y-4">
          <style>{markerStyle}</style>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Vecindario y lugares de interés
              </h3>
              <PlaceTypeFilter
                allTypes={allTypes}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                placeTypeIconLabel={placeTypeIconLabel}
                typeColors={typeColors}
              />
              <PlaceOfInterestMarkers
                property={property}
                selectedTypes={selectedTypes}
                placeTypeIconLabel={placeTypeIconLabel}
                typeColors={typeColors}
              />
              <div className="mt-4 flex items-start gap-2 bg-gray-50 rounded-lg border-l-4 border-teal-400 p-3 text-xs text-gray-500">
                <svg
                  className="w-4 h-4 mt-0.5 text-teal-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
                <span>
                  Tenga en cuenta que la información es proporcionada por
                  servicios de terceros y que el equipo de Migao no controla ni
                  puede cambiar su contenido.
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
}
