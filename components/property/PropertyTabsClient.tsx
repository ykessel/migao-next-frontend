"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import PropertyTabs, { PropertyTabsProps } from "./PropertyTabs";

const PropertyMap = dynamic(() => import("@/components/app-components/property-map-client"), { ssr: false });
const PlaceOfInterestMarkers = dynamic(() => import("./PlaceOfInterestMarkers"), { ssr: false });

type PropertyTabsClientProps = Omit<PropertyTabsProps, 'PropertyMap' | 'PlaceOfInterestMarkers' | 'selectedTypes' | 'setSelectedTypes' | 'getApartmentAmenityIcon' | 'getApartmentAmenityLabel' | 'getRuleIcon'> & {
  initialSelectedTypes?: PropertyTabsProps['selectedTypes'];
};

function getApartmentAmenityIcon(amenity: string): React.ReactNode {
  switch (amenity) {
    case 'garage': return <span className="w-5 h-5">🚗</span>;
    case 'garden': return <span className="w-5 h-5">🌳</span>;
    case 'terrace': return <span className="w-5 h-5">🏞️</span>;
    case 'kitchen': return <span className="w-5 h-5">🍳</span>;
    case 'furnished': return <span className="w-5 h-5">🛋️</span>;
    case 'hasTV': return <span className="w-5 h-5">📺</span>;
    case 'hasWifi': return <span className="w-5 h-5">📶</span>;
    case 'hasAC': return <span className="w-5 h-5">❄️</span>;
    case 'hasFridge': return <span className="w-5 h-5">🧊</span>;
    case 'hasWasher': return <span className="w-5 h-5">🧺</span>;
    case 'hasMicrowave': return <span className="w-5 h-5">🍲</span>;
    case 'hasElevator': return <span className="w-5 h-5">🛗</span>;
    case 'hasBalcony': return <span className="w-5 h-5">🌅</span>;
    case 'hasPool': return <span className="w-5 h-5">🏊</span>;
    case 'gasAvailability': return <span className="w-5 h-5">🔥</span>;
    default: return null;
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
    />
  );
} 