import { PROPERTY_TYPE } from "@/constants/property-type.enum";
import { PROPERTY_USE } from "@/constants/property-use.enum";
import { Amenities } from "./amenities";
import { HouseRules } from "./house-rules";
import { Owner } from "./owner";
import { Image } from "./image";
import { Location } from "./location";

export type { Location };

export interface PlaceOfInterest {
  id: string | number;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  type: string;
  coordinates: {
    coordinates: [number, number];
  };
}

export interface Property {
    _id?: string
    title: string
    description: string
    rentPricePerMonth: number
    securityDeposit: number
    currency: string
    rooms: number
    bathrooms: number
    area: number
    minimumStayTime: number
    maximumStayTime: number
    maximumGuests: number
    cleanFee: number
    location: Location
    propertyType: PROPERTY_TYPE
    propertyUse: PROPERTY_USE
    amenities: Amenities
    houseRules: HouseRules
    isAvailable: boolean
    isAvailableForRentalFrom: string
    isAvailableForRentalTo: string
    owner: Owner
    images: Image[]
    createdAt?: string
    updatedAt?: string
    placesOfInterest?: PlaceOfInterest[];
    services?: import('./property-services').IPropertyServices;
}

export type CreatePropertyRequest = Omit<Property, "propertyId" | "createdAt" | "updatedAt">

export type FavoriteProperty = Property;
