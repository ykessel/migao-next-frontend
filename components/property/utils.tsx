import React from "react";
import { Car, Sun, Layers, Utensils, Sofa, Tv, Wifi, AirVent, Home, WashingMachine, Microwave, ArrowUpDown, Waves, Flame, Ban, Volume2, Clock, Users, Shield } from "lucide-react";
import { PlaceType } from '@/constants/places.enum';

export function getApartmentAmenityIcon(amenity: string): React.ReactNode {
  switch (amenity) {
    case 'garage': return <Car className="w-5 h-5" />;
    case 'garden': return <Sun className="w-5 h-5" />;
    case 'terrace': return <Layers className="w-5 h-5" />;
    case 'kitchen': return <Utensils className="w-5 h-5" />;
    case 'furnished': return <Sofa className="w-5 h-5" />;
    case 'hasTV': return <Tv className="w-5 h-5" />;
    case 'hasWifi': return <Wifi className="w-5 h-5" />;
    case 'hasAC': return <AirVent className="w-5 h-5" />;
    case 'hasFridge': return <Home className="w-5 h-5" />;
    case 'hasWasher': return <WashingMachine className="w-5 h-5" />;
    case 'hasMicrowave': return <Microwave className="w-5 h-5" />;
    case 'hasElevator': return <ArrowUpDown className="w-5 h-5" />;
    case 'hasBalcony': return <Sun className="w-5 h-5" />;
    case 'hasPool': return <Waves className="w-5 h-5" />;
    case 'gasAvailability': return <Flame className="w-5 h-5" />;
    default: return null;
  }
}

export function getApartmentAmenityLabel(amenity: string): string {
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

export function getRuleIcon(rule: string): React.ReactNode {
  if (rule.includes('fumar')) return <Ban className="w-4 h-4 text-red-500" />;
  if (rule.includes('fiestas')) return <Volume2 className="w-4 h-4 text-red-500" />;
  if (rule.includes('silencio')) return <Clock className="w-4 h-4 text-orange-500" />;
  if (rule.includes('huéspedes')) return <Users className="w-4 h-4 text-blue-500" />;
  return <Shield className="w-4 h-4 text-gray-500" />;
} 

export const placeTypeIconLabel: Record<PlaceType, { icon: string; label: string }> = {
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

export const typeColors: Record<PlaceType, string> = {
    [PlaceType.RESTAURANT]: '#ff9800',
    [PlaceType.BAR]: '#8e44ad',
    [PlaceType.PARK]: '#27ae60',
    [PlaceType.KINDERGARTEN]: '#e17055',
    [PlaceType.BUS_STOP]: '#0984e3',
    [PlaceType.CHURCH]: '#fbc531',
    [PlaceType.BANK]: '#e67e22',
    [PlaceType.SCHOOL]: '#00b894',
    [PlaceType.PARKING]: '#00bcd4',
    [PlaceType.SUPERMARKET]: '#6c5ce7',
    [PlaceType.HOTEL]: '#636e72',
    [PlaceType.SHOPPING_MALL]: '#fd79a8',
    [PlaceType.ATM]: '#009688',
    [PlaceType.GAS_STATION]: '#fdcb6e',
    [PlaceType.POST_OFFICE]: '#0984e3',
    [PlaceType.PHARMACY]: '#e84393',
    [PlaceType.CAFE]: '#e17055',
    [PlaceType.POLICE_STATION]: '#0984e3',
    [PlaceType.MUSEUM]: '#636e72',
    [PlaceType.CLINIC]: '#00b894',
    [PlaceType.LIBRARY]: '#6c5ce7',
    [PlaceType.HOSPITAL]: '#d63031',
    [PlaceType.UNIVERSITY]: '#0984e3',
    [PlaceType.FIRE_STATION]: '#d63031',
    [PlaceType.VETERINARY]: '#00b894',
    [PlaceType.DENTIST]: '#00b894',
    [PlaceType.CINEMA]: '#636e72',
    [PlaceType.AIRPORT]: '#00b894',
    [PlaceType.TRAIN_STATION]: '#636e72',
    [PlaceType.SUBWAY_STATION]: '#636e72',
    [PlaceType.TAXI_STAND]: '#fdcb6e',
  };

export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
};