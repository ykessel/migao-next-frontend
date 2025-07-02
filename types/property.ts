import { GAS_AVAILABILITY } from "@/constants/gas-availability.enum";
import { PROPERTY_TYPE } from "@/constants/property-type.enum";
import { PROPERTY_USE } from "@/constants/property-use.enum";
import type { IPlaceOfInterest } from '@/types/IPlaceOfInterest';

export interface Location {
    type: "Point"
    coordinates: [number, number] // [longitude, latitude]
    address: string
    city: string
    state: string
    country: string
    postalCode: string
}

export interface Amenities {
    garage: boolean
    garden: boolean
    terrace: boolean
    kitchen: boolean
    furnished: boolean
    hasTV: boolean
    hasWifi: boolean
    hasAC: boolean
    hasFridge: boolean
    hasWasher: boolean
    hasMicrowave: boolean
    hasElevator: boolean
    hasBalcony: boolean
    hasPool: boolean
    gasAvailability: GAS_AVAILABILITY
}

export interface HouseRules {
    petsAllowed: boolean
    smokingAllowed: boolean
    partiesAllowed: boolean
    additionalRules?: string
    checkInTime: string
    checkOutTime: string
    maxGuests: number
    suitableForChildren: boolean
    extraPeopleAllowed: boolean
    extraPeopleFee: number
    cancellationPolicy: string
    childrenAllowed: boolean
    modificationsAllowed: boolean
}

export interface Image {
    url: string;
    thumb: string;
    width?: number;
    height?: number;
    sizes?: string[];
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
    images?: Image[]
    createdAt?: string
    updatedAt?: string
    placesOfInterest?: IPlaceOfInterest[];
    services?: import('./property-services').IPropertyServices;
}

export type Owner = {
    _id?: string
    whatsapp?: string;
    telegram?: string;
    phone: string
    photoUrl?: string;
}

export type CreatePropertyRequest = Omit<Property, "_id" | "createdAt" | "updatedAt">

// New Filter Types
export type FilterType = "RANGE" | "TERM" | "IN" | "CONTAINS" | "EXISTS" | "GEO_DISTANCE"

export type FilterValueType = "string" | "number" | "date" | "boolean" | "array"

export interface RangeFilterValue {
    type: FilterValueType
    gte?: string | number
    lte?: string | number
    gt?: string | number
    lt?: string | number
}

export interface TermFilterValue {
    type: FilterValueType
    value: string | number | boolean
}

export interface InFilterValue {
    type: FilterValueType
    values: (string | number | boolean)[]
}

export interface ContainsFilterValue {
    type: FilterValueType
    value: string
    caseSensitive?: boolean
}

export interface ExistsFilterValue {
    type: FilterValueType
    exists: boolean
}

export interface GeoDistanceFilterValue {
    type: "geo"
    coordinates: [number, number] // [longitude, latitude]
    distance: number
    unit: "km" | "m" | "mi"
}

export type FilterValue =
    | RangeFilterValue
    | TermFilterValue
    | InFilterValue
    | ContainsFilterValue
    | ExistsFilterValue
    | GeoDistanceFilterValue

export interface Filter {
    type: FilterType
    field: string
    value: FilterValue | string | number | string[] | number[] | boolean
}

export interface SearchPropertyRequest {
    search?: string
    filters?: Filter[]
    page?: number
    size?: number
    sort?: { "createdAt": -1 }
}

// Legacy interface for backward compatibility
export interface LegacySearchPropertyRequest {
    city?: string
    state?: string
    country?: string
    propertyType?: PROPERTY_TYPE
    propertyUse?: PROPERTY_USE
    minPrice?: number
    maxPrice?: number
    minRooms?: number
    maxRooms?: number
    minBathrooms?: number
    maxBathrooms?: number
    minArea?: number
    maxArea?: number
    amenities?: Partial<Amenities>
    availableFrom?: string
    availableTo?: string
    maxGuests?: number
    petsAllowed?: boolean
    smokingAllowed?: boolean
    partiesAllowed?: boolean
    page?: number
    limit?: number
    sortBy?: "price" | "createdAt" | "area" | "rooms"
    sortOrder?: "asc" | "desc"
}

export interface ApiError {
    message: string
    status: number
    code?: string
}

export interface SearchResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export type FavoriteProperty = Property;
