import { PlaceType } from '@/constants/places.enum';

export interface IPlaceOfInterest {
  id: string;
  name: string;
  type: PlaceType;
  coordinates: Location;
  distance: number;
  address?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  lastUpdated: Date;
}
