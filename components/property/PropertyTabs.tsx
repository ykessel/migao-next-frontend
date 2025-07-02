import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Home, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import PlaceTypeFilter from "./PlaceTypeFilter";
import { PlaceType } from '@/constants/places.enum';
import type { Property } from '@/types/property';

const PropertyMap = dynamic(() => import("@/components/PropertyMap.client"), { ssr: false });
const PlaceOfInterestMarkers = dynamic(() => import("./PlaceOfInterestMarkers"), { ssr: false });


interface PropertyTabsProps {
  property: Property;
  placeTypeIconLabel: Record<PlaceType, { icon: React.ReactNode; label: string }>;
  typeColors: Record<PlaceType, string>;
  allTypes: PlaceType[];
  selectedTypes: PlaceType[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<PlaceType[]>>;
  markerStyle: string;
  getApartmentAmenityIcon: (amenity: string) => React.ReactNode;
  getApartmentAmenityLabel: (amenity: string) => string;
  getRuleIcon: (rule: string) => React.ReactNode;
}

export default function PropertyTabs({ property, placeTypeIconLabel, typeColors, allTypes, selectedTypes, setSelectedTypes, markerStyle, getApartmentAmenityIcon, getApartmentAmenityLabel, getRuleIcon }: PropertyTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Descripción</TabsTrigger>
        <TabsTrigger value="amenities">Comodidades</TabsTrigger>
        <TabsTrigger value="rules">Qué saber</TabsTrigger>
        <TabsTrigger value="neighborhood">Vecindario</TabsTrigger>
      </TabsList>
      {/* Description Tab */}
      <TabsContent value="description" className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Sobre esta propiedad</h3>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
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
                if (typeof value === 'boolean' && value) {
                  return (
                    <div key={key} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="text-teal-600">{getApartmentAmenityIcon(key)}</div>
                      <span className="text-sm">{getApartmentAmenityLabel(key)}</span>
                    </div>
                  );
                }
                if (key === 'gasAvailability' && value !== 'NONE') {
                  return (
                    <div key={key} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="text-teal-600">{getApartmentAmenityIcon(key)}</div>
                      <span className="text-sm">{getApartmentAmenityLabel(key)}</span>
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
              <h3 className="text-lg font-semibold mb-4">Reglas del apartamento</h3>
              <div className="space-y-3">
                {Object.entries(property.houseRules).map(([key, value]) => {
                  if (typeof value === 'boolean') {
                    const rule = key === 'petsAllowed' ? 'Mascotas permitidas' :
                      key === 'smokingAllowed' ? 'Fumar permitido' :
                      key === 'partiesAllowed' ? 'Fiestas permitidas' : '';
                    if (rule) {
                      return (
                        <div key={key} className="flex items-center space-x-3">
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
              <h3 className="text-lg font-semibold mb-4">Check-in / Check-out</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Check-in:</span>
                  <span className="text-sm font-medium">{property.houseRules.checkInTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Check-out:</span>
                  <span className="text-sm font-medium">{property.houseRules.checkOutTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Máximo de huéspedes:</span>
                  <span className="text-sm font-medium">{property.houseRules.maxGuests}</span>
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
            <h3 className="text-xl font-semibold mb-4">Vecindario y lugares de interés</h3>
            <PlaceTypeFilter allTypes={allTypes} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} placeTypeIconLabel={placeTypeIconLabel} />
            <PlaceOfInterestMarkers property={property} selectedTypes={selectedTypes} placeTypeIconLabel={placeTypeIconLabel} typeColors={typeColors} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
} 