import {PROPERTY_TYPE} from "@/constants/property-type.enum";
import {PROPERTY_USE} from "@/constants/property-use.enum";
import {Amenities} from "./amenities";

export type FilterType =
    | "RANGE"
    | "TERM"
    | "IN"
    | "CONTAINS"
    | "EXISTS"
    | "GEO_DISTANCE"
    | "GEOSPATIAL";

export type FilterValueType =
    | "string"
    | "number"
    | "date"
    | "boolean"
    | "array";

export interface RangeFilterValue {
    type: FilterValueType;
    gte?: string | number;
    lte?: string | number;
    gt?: string | number;
    lt?: string | number;
}

export interface TermFilterValue {
    type: FilterValueType;
    value: string | number | boolean;
}

export interface InFilterValue {
    type: FilterValueType;
    values: (string | number | boolean)[];
}

export interface ContainsFilterValue {
    type: FilterValueType;
    value: string;
    caseSensitive?: boolean;
}

export interface ExistsFilterValue {
    type: FilterValueType;
    exists: boolean;
}

export interface GeoDistanceFilterValue {
    type: "geo";
    coordinates: [number, number]; // [longitude, latitude]
    distance: number;
    unit: "km" | "m" | "mi";
}

export interface GeoSpatialFilterValue {
    type: "GEOSPATIAL";
    queryType: string,
    geometry: {
        type: string,
        coordinates: [[number, number], [number, number], [number, number], [number, number]];
    }
}

export type FilterValue =
    | RangeFilterValue
    | TermFilterValue
    | InFilterValue
    | ContainsFilterValue
    | ExistsFilterValue
    | GeoDistanceFilterValue
    | GeoSpatialFilterValue;

export interface Filter {
    type: FilterType;
    field: string;
    value?: FilterValue | string | number | string[] | number[] | boolean;
}

export interface SearchPropertyRequest {
    search?: string;
    filters?: Filter[];
    page?: number;
    size?: number;
    sort?: { [key: string]: 1 | -1 };
    bbox?: { lat: number; lng: number }[]; // Array of { lat, lng }
}

// Legacy interface for backward compatibility
export interface LegacySearchPropertyRequest {
    city?: string;
    state?: string;
    country?: string;
    propertyType?: PROPERTY_TYPE;
    propertyUse?: PROPERTY_USE;
    minPrice?: number;
    maxPrice?: number;
    minRooms?: number;
    maxRooms?: number;
    minBathrooms?: number;
    maxBathrooms?: number;
    minArea?: number;
    maxArea?: number;
    amenities?: Partial<Amenities>;
    availableFrom?: string;
    availableTo?: string;
    maxGuests?: number;
    petsAllowed?: boolean;
    smokingAllowed?: boolean;
    partiesAllowed?: boolean;
    page?: number;
    limit?: number;
    sortBy?: "price" | "createdAt" | "area" | "rooms";
    sortOrder?: "asc" | "desc";
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
}

export interface SearchResponse<T> {
    data: T[];
    total: number;
    page: number;
}
