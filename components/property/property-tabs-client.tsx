"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import PropertyTabs, { PropertyTabsProps } from "./property-tabs";
import { PlaceType } from "@/constants/places.enum";
// Lucide icons
import {
  Hospital,
  School,
  Utensils,
  Bus,
  Hotel,
  Shield,
  Pill,
  Banknote,
  Fuel,
  ShoppingCart,
  TreePine,
  Church,
  Mail,
  BookOpen,
  Landmark,
  Clapperboard,
  Building2,
  Plane,
  Train,
  TramFront,
  CarTaxiFront,
  ParkingCircle,
  CreditCard,
  Flame,
  PawPrint,
  Syringe,
  Stethoscope,
  Coffee,
  Martini,
  GraduationCap,
  Baby,
} from "lucide-react";

const PropertyMap = dynamic(
  () => import("@/components/map/property-map-client"),
  { ssr: false }
);
const PlaceOfInterestMarkers = dynamic(
  () => import("./place-of-interest-markers"),
  { ssr: false }
);

const placeTypeIconLabel: Record<
  string,
  { icon: React.ReactNode; label?: string }
> = {
  [PlaceType.HOSPITAL]: {
    icon: <Hospital className="w-5 h-5" />,
    label: "Hospital",
  },
  [PlaceType.SCHOOL]: {
    icon: <School className="w-5 h-5" />,
    label: "Escuela",
  },
  [PlaceType.RESTAURANT]: {
    icon: <Utensils className="w-5 h-5" />,
    label: "Restaurante",
  },
  [PlaceType.BUS_STOP]: {
    icon: <Bus className="w-5 h-5" />,
    label: "Parada de bus",
  },
  [PlaceType.HOTEL]: { icon: <Hotel className="w-5 h-5" />, label: "Hotel" },
  [PlaceType.POLICE_STATION]: {
    icon: <Shield className="w-5 h-5" />,
    label: "Policía",
  },
  [PlaceType.PHARMACY]: {
    icon: <Pill className="w-5 h-5" />,
    label: "Farmacia",
  },
  [PlaceType.BANK]: { icon: <Banknote className="w-5 h-5" />, label: "Banco" },
  [PlaceType.GAS_STATION]: {
    icon: <Fuel className="w-5 h-5" />,
    label: "Gasolinera",
  },
  [PlaceType.SUPERMARKET]: {
    icon: <ShoppingCart className="w-5 h-5" />,
    label: "Supermercado",
  },
  [PlaceType.PARK]: { icon: <TreePine className="w-5 h-5" />, label: "Parque" },
  [PlaceType.CHURCH]: {
    icon: <Church className="w-5 h-5" />,
    label: "Iglesia",
  },
  [PlaceType.POST_OFFICE]: {
    icon: <Mail className="w-5 h-5" />,
    label: "Correo",
  },
  [PlaceType.LIBRARY]: {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Biblioteca",
  },
  [PlaceType.MUSEUM]: {
    icon: <Landmark className="w-5 h-5" />,
    label: "Museo",
  },
  [PlaceType.CINEMA]: {
    icon: <Clapperboard className="w-5 h-5" />,
    label: "Cine",
  },
  [PlaceType.SHOPPING_MALL]: {
    icon: <Building2 className="w-5 h-5" />,
    label: "Centro comercial",
  },
  [PlaceType.AIRPORT]: {
    icon: <Plane className="w-5 h-5" />,
    label: "Aeropuerto",
  },
  [PlaceType.TRAIN_STATION]: {
    icon: <Train className="w-5 h-5" />,
    label: "Estación de tren",
  },
  [PlaceType.SUBWAY_STATION]: {
    icon: <TramFront className="w-5 h-5" />,
    label: "Metro",
  },
  [PlaceType.TAXI_STAND]: { icon: <CarTaxiFront className="w-5 h-5" />, label: "Taxi" },
  [PlaceType.PARKING]: {
    icon: <ParkingCircle className="w-5 h-5" />,
    label: "Parqueo",
  },
  [PlaceType.ATM]: {
    icon: <CreditCard className="w-5 h-5" />,
    label: "Cajero",
  },
  [PlaceType.FIRE_STATION]: {
    icon: <Flame className="w-5 h-5" />,
    label: "Bomberos",
  },
  [PlaceType.VETERINARY]: {
    icon: <PawPrint className="w-5 h-5" />,
    label: "Veterinario",
  },
  [PlaceType.DENTIST]: {
    icon: <Syringe className="w-5 h-5" />,
    label: "Dentista",
  },
  [PlaceType.CLINIC]: {
    icon: <Stethoscope className="w-5 h-5" />,
    label: "Clínica",
  },
  [PlaceType.CAFE]: { icon: <Coffee className="w-5 h-5" />, label: "Café" },
  [PlaceType.BAR]: { icon: <Martini className="w-5 h-5" />, label: "Bar" },
  [PlaceType.UNIVERSITY]: {
    icon: <GraduationCap className="w-5 h-5" />,
    label: "Universidad",
  },
  [PlaceType.KINDERGARTEN]: {
    icon: <Baby className="w-5 h-5" />,
    label: "Kindergarten",
  },
};

type PropertyTabsClientProps = Omit<
  PropertyTabsProps,
  | "PropertyMap"
  | "PlaceOfInterestMarkers"
  | "selectedTypes"
  | "setSelectedTypes"
  | "getApartmentAmenityIcon"
  | "getApartmentAmenityLabel"
  | "getRuleIcon"
> & {
  initialSelectedTypes?: PropertyTabsProps["selectedTypes"];
};

function getApartmentAmenityIcon(amenity: string): string {
  switch (amenity) {
    case "garage":
      return "🚗";
    case "garden":
      return "🌳";
    case "terrace":
      return "🏞️";
    case "kitchen":
      return "🍳";
    case "furnished":
      return "🛋️";
    case "hasTV":
      return "📺";
    case "hasWifi":
      return "📶";
    case "hasAC":
      return "❄️";
    case "hasFridge":
      return "🧊";
    case "hasWasher":
      return "🧺";
    case "hasMicrowave":
      return "🍲";
    case "hasElevator":
      return "🛗";
    case "hasBalcony":
      return "🌅";
    case "hasPool":
      return "🏊";
    case "gasAvailability":
      return "🔥";
    default:
      return "";
  }
}

function getApartmentAmenityLabel(amenity: string): string {
  switch (amenity) {
    case "garage":
      return "Garaje";
    case "garden":
      return "Jardín";
    case "terrace":
      return "Terraza";
    case "kitchen":
      return "Cocina equipada";
    case "furnished":
      return "Amueblado";
    case "hasTV":
      return "TV con cable";
    case "hasWifi":
      return "WiFi gratuito";
    case "hasAC":
      return "Aire acondicionado";
    case "hasFridge":
      return "Refrigerador";
    case "hasWasher":
      return "Lavadora";
    case "hasMicrowave":
      return "Microondas";
    case "hasElevator":
      return "Ascensor";
    case "hasBalcony":
      return "Balcón";
    case "hasPool":
      return "Piscina";
    case "gasAvailability":
      return "Gas natural";
    default:
      return amenity;
  }
}

function getRuleIcon(rule: string): React.ReactNode {
  if (rule.includes("fumar"))
    return <span className="w-4 h-4 text-red-500">🚭</span>;
  if (rule.includes("fiestas"))
    return <span className="w-4 h-4 text-red-500">🎉</span>;
  if (rule.includes("silencio"))
    return <span className="w-4 h-4 text-orange-500">🔕</span>;
  if (rule.includes("huéspedes"))
    return <span className="w-4 h-4 text-blue-500">👥</span>;
  return <span className="w-4 h-4 text-gray-500">🛡️</span>;
}

export default function PropertyTabsClient({
  initialSelectedTypes = [],
  ...props
}: PropertyTabsClientProps) {
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
