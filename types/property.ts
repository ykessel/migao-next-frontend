import { PROPERTY_TYPE } from "@/constants/property-type.enum";
import { PROPERTY_USE } from "@/constants/property-use.enum";
import type { IPlaceOfInterest } from '@/types/place-of-Interest';

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
    placesOfInterest?: IPlaceOfInterest[];
    services?: import('./property-services').IPropertyServices;
}

export type CreatePropertyRequest = Omit<Property, "_id" | "createdAt" | "updatedAt">

export type FavoriteProperty = Property;
