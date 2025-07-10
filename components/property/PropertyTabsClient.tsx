"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import PropertyTabs, { PropertyTabsProps } from "./PropertyTabs";
import { PlaceType } from '@/constants/places.enum';

const PropertyMap = dynamic(() => import("@/components/app-components/property-map-client"), { ssr: false });
const PlaceOfInterestMarkers = dynamic(() => import("./PlaceOfInterestMarkers"), { ssr: false });

const placeTypeIconLabel: Record<string, { icon: string; label?: string }> = {
  [PlaceType.HOSPITAL]: { icon: '🏥', label: 'Hospital' },
  [PlaceType.SCHOOL]: { icon: '🏫', label: 'Escuela' },
  [PlaceType.RESTAURANT]: { icon: '🍽️', label: 'Restaurante' },
  [PlaceType.BUS_STOP]: { icon: '🚌', label: 'Parada de bus' },
  [PlaceType.HOTEL]: { icon: '🏨', label: 'Hotel' },
  [PlaceType.POLICE_STATION]: { icon: '🚓', label: 'Policía' },
  [PlaceType.PHARMACY]: { icon: '💊', label: 'Farmacia' },
  [PlaceType.BANK]: { icon: '🏦', label: 'Banco' },
  [PlaceType.GAS_STATION]: { icon: '⛽', label: 'Gasolinera' },
  [PlaceType.SUPERMARKET]: { icon: '🛒', label: 'Supermercado' },
  [PlaceType.PARK]: { icon: '🏞️', label: 'Parque' },
  [PlaceType.CHURCH]: { icon: '⛪', label: 'Iglesia' },
  [PlaceType.POST_OFFICE]: { icon: '🏤', label: 'Correo' },
  [PlaceType.LIBRARY]: { icon: '📚', label: 'Biblioteca' },
  [PlaceType.MUSEUM]: { icon: '🏛️', label: 'Museo' },
  [PlaceType.CINEMA]: { icon: '🎬', label: 'Cine' },
  [PlaceType.SHOPPING_MALL]: { icon: '🏬', label: 'Centro comercial' },
  [PlaceType.AIRPORT]: { icon: '✈️', label: 'Aeropuerto' },
  [PlaceType.TRAIN_STATION]: { icon: '🚉', label: 'Estación de tren' },
  [PlaceType.SUBWAY_STATION]: { icon: '🚇', label: 'Metro' },
  [PlaceType.TAXI_STAND]: { icon: '🚕', label: 'Taxi' },
  [PlaceType.PARKING]: { icon: '🅿️', label: 'Parqueo' },
  [PlaceType.ATM]: { icon: '🏧', label: 'Cajero' },
  [PlaceType.FIRE_STATION]: { icon: '🚒', label: 'Bomberos' },
  [PlaceType.VETERINARY]: { icon: '🐾', label: 'Veterinario' },
  [PlaceType.DENTIST]: { icon: '🦷', label: 'Dentista' },
  [PlaceType.CLINIC]: { icon: '🏥', label: 'Clínica' },
  [PlaceType.CAFE]: { icon: '☕', label: 'Café' },
  [PlaceType.BAR]: { icon: '🍸', label: 'Bar' },
  [PlaceType.UNIVERSITY]: { icon: '🎓', label: 'Universidad' },
  [PlaceType.KINDERGARTEN]: { icon: '👶', label: 'Kindergarten' },
};

type PropertyTabsClientProps = Omit<PropertyTabsProps, 'PropertyMap' | 'PlaceOfInterestMarkers' | 'selectedTypes' | 'setSelectedTypes' | 'getApartmentAmenityIcon' | 'getApartmentAmenityLabel' | 'getRuleIcon'> & {
  initialSelectedTypes?: PropertyTabsProps['selectedTypes'];
};

function getApartmentAmenityIcon(amenity: string): string {
  switch (amenity) {
    case 'garage': return '🚗';
    case 'garden': return '🌳';
    case 'terrace': return '🏞️';
    case 'kitchen': return '🍳';
    case 'furnished': return '🛋️';
    case 'hasTV': return '📺';
    case 'hasWifi': return '📶';
    case 'hasAC': return '❄️';
    case 'hasFridge': return '🧊';
    case 'hasWasher': return '🧺';
    case 'hasMicrowave': return '🍲';
    case 'hasElevator': return '🛗';
    case 'hasBalcony': return '🌅';
    case 'hasPool': return '🏊';
    case 'gasAvailability': return '🔥';
    default: return '';
  }
}

function getApartmentAmenityLabel(amenity: string): string {
  switch (amenity) {
    case 'garage': return 'Garaje';
    case 'garden': return 'Jardín';
    case 'terrace': return 'Terraza';
    case 'kitchen': return 'Cocina equipada';
    case 'furnished': return 'Amueblado';
    case 'hasTV': return 'TV con cable';
    case 'hasWifi': return 'WiFi gratuito';
    case 'hasAC': return 'Aire acondicionado';
    case 'hasFridge': return 'Refrigerador';
    case 'hasWasher': return 'Lavadora';
    case 'hasMicrowave': return 'Microondas';
    case 'hasElevator': return 'Ascensor';
    case 'hasBalcony': return 'Balcón';
    case 'hasPool': return 'Piscina';
    case 'gasAvailability': return 'Gas natural';
    default: return amenity;
  }
}

function getRuleIcon(rule: string): React.ReactNode {
  if (rule.includes('fumar')) return <span className="w-4 h-4 text-red-500">🚭</span>;
  if (rule.includes('fiestas')) return <span className="w-4 h-4 text-red-500">🎉</span>;
  if (rule.includes('silencio')) return <span className="w-4 h-4 text-orange-500">🔕</span>;
  if (rule.includes('huéspedes')) return <span className="w-4 h-4 text-blue-500">👥</span>;
  return <span className="w-4 h-4 text-gray-500">🛡️</span>;
}

export default function PropertyTabsClient({ initialSelectedTypes = [], ...props }: PropertyTabsClientProps) {
  const [selectedTypes, setSelectedTypes] = useState(initialSelectedTypes);
  return (
    <PropertyTabs
      {...props}
      selectedTypes={selectedTypes}
      setSelectedTypes={setSelectedTypes}
      getApartmentAmenityIcon={getApartmentAmenityIcon}
      getApartmentAmenityLabel={getApartmentAmenityLabel}
      getRuleIcon={getRuleIcon}
      PropertyMap={PropertyMap}
      PlaceOfInterestMarkers={PlaceOfInterestMarkers}
      placeTypeIconLabel={placeTypeIconLabel}
    />
  );
} 