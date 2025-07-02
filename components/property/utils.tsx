import React from "react";
import { Car, Sun, Layers, Utensils, Sofa, Tv, Wifi, AirVent, Home, WashingMachine, Microwave, ArrowUpDown, Waves, Flame, Ban, Volume2, Clock, Users, Shield,Coffee,
  Building,
  Train,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  ParkingCircle,
  CreditCard,
  Mail,
  Book,
  Film,
  Landmark, 
  Navigation} from "lucide-react";
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

export const placeTypeIconLabel: Record<PlaceType, { icon: React.ReactNode; label: string }> = {
    [PlaceType.HOSPITAL]: { icon: <Stethoscope className="w-5 h-5 text-red-500" />, label: 'Hospital' },
    [PlaceType.SCHOOL]: { icon: <GraduationCap className="w-5 h-5 text-green-500" />, label: 'Escuela' },
    [PlaceType.RESTAURANT]: { icon: <Utensils className="w-5 h-5 text-orange-500" />, label: 'Restaurante' },
    [PlaceType.BUS_STOP]: { icon: <Train className="w-5 h-5 text-blue-500" />, label: 'Parada de bus' },
    [PlaceType.HOTEL]: { icon: <Building className="w-5 h-5 text-indigo-500" />, label: 'Hotel' },
    [PlaceType.POLICE_STATION]: { icon: <Shield className="w-5 h-5 text-blue-700" />, label: 'Policía' },
    [PlaceType.PHARMACY]: { icon: <Stethoscope className="w-5 h-5 text-pink-500" />, label: 'Farmacia' },
    [PlaceType.BANK]: { icon: <Landmark className="w-5 h-5 text-grayb-600" />, label: 'Banco' },
    [PlaceType.GAS_STATION]: { icon: <Flame className="w-5 h-5 text-orange-700" />, label: 'Gasolinera' },
    [PlaceType.SUPERMARKET]: { icon: <ShoppingBag className="w-5 h-5 text-purple-500" />, label: 'Supermercado' },
    [PlaceType.PARK]: { icon: <Sun className="w-5 h-5 text-green-400" />, label: 'Parque' },
    [PlaceType.CHURCH]: { icon: <Home className="w-5 h-5 text-yellow-500" />, label: 'Iglesia' },
    [PlaceType.POST_OFFICE]: { icon: <Mail className="w-5 h-5 text-blue-400" />, label: 'Correo' },
    [PlaceType.LIBRARY]: { icon: <Book className="w-5 h-5 text-indigo-400" />, label: 'Biblioteca' },
    [PlaceType.MUSEUM]: { icon: <Layers className="w-5 h-5 text-gray-700" />, label: 'Museo' },
    [PlaceType.CINEMA]: { icon: <Film />, label: 'Cine' },
    [PlaceType.SHOPPING_MALL]: { icon: <ShoppingBag />, label: 'Centro comercial' },
    [PlaceType.AIRPORT]: { icon: <Navigation />, label: 'Aeropuerto' },
    [PlaceType.TRAIN_STATION]: { icon: <Train />, label: 'Estación de tren' },
    [PlaceType.SUBWAY_STATION]: { icon: <Train />, label: 'Metro' },
    [PlaceType.TAXI_STAND]: { icon: <Car />, label: 'Taxi' },
    [PlaceType.PARKING]: { icon: <ParkingCircle className="w-5 h-5 text-blue-500" />, label: 'Estacionamiento' },
    [PlaceType.ATM]: { icon: <CreditCard className="w-5 h-5 text-green-700" />, label: 'Cajero' },
    [PlaceType.FIRE_STATION]: { icon: <Flame className="w-5 h-5 text-red-700" />, label: 'Bomberos' },
    [PlaceType.VETERINARY]: { icon: <Shield className="w-5 h-5 text-green-700" />, label: 'Veterinario' },
    [PlaceType.DENTIST]: { icon: <Shield className="w-5 h-5 text-blue-400" />, label: 'Dentista' },
    [PlaceType.CLINIC]: { icon: <Stethoscope className="w-5 h-5 text-blue-400" />, label: 'Clínica' },
    [PlaceType.CAFE]: { icon: <Coffee className="w-5 h-5 text-amber-600" />, label: 'Café' },
    [PlaceType.UNIVERSITY]: { icon: <GraduationCap className="w-5 h-5 text-blue-800" />, label: 'Universidad' },
    [PlaceType.KINDERGARTEN]: { icon: <Users className="w-5 h-5 text-pink-400" />, label: 'Kindergarten' },
    [PlaceType.BAR]: { icon: <Coffee className="w-5 h-5 text-purple-700" />, label: 'Bar' },
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