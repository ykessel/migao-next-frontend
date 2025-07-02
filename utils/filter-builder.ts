import type {
    FilterValueType,
    RangeFilterValue,
    TermFilterValue,
    InFilterValue,
    ContainsFilterValue,
    ExistsFilterValue,
    GeoDistanceFilterValue,
    LegacySearchPropertyRequest,
    SearchPropertyRequest,
    Filter
} from "@/types/property"

export class FilterBuilder {
    private filters: Filter[] = []

    // Range filters
    dateRange(field: string, gte?: string, lte?: string, gt?: string, lt?: string): FilterBuilder {
        const value: RangeFilterValue = {
            type: "date",
            ...(gte && { gte }),
            ...(lte && { lte }),
            ...(gt && { gt }),
            ...(lt && { lt }),
        }

        this.filters.push({
            type: "RANGE",
            field,
            value,
        })
        return this
    }

    numberRange(field: string, gte?: number, lte?: number, gt?: number, lt?: number): FilterBuilder {
        const value: RangeFilterValue = {
            type: "number",
            ...(gte !== undefined && { gte }),
            ...(lte !== undefined && { lte }),
            ...(gt !== undefined && { gt }),
            ...(lt !== undefined && { lt }),
        }

        this.filters.push({
            type: "RANGE",
            field,
            value,
        })
        return this
    }

    // Exact match filters
    term(field: string, value: string | number | boolean, type: FilterValueType = "string"): FilterBuilder {
        const filterValue: TermFilterValue = {
            type,
            value,
        }

        this.filters.push({
            type: "TERM",
            field,
            value: filterValue,
        })
        return this
    }

    // In array filters
    in(field: string, values: (string | number | boolean)[], type: FilterValueType = "string"): FilterBuilder {
        const filterValue: InFilterValue = {
            type,
            values,
        }

        this.filters.push({
            type: "IN",
            field,
            value: filterValue,
        })
        return this
    }

    // Contains filters (for text search in specific fields)
    contains(field: string, value: string, caseSensitive = false): FilterBuilder {
        const filterValue: ContainsFilterValue = {
            type: "string",
            value,
            caseSensitive,
        }

        this.filters.push({
            type: "CONTAINS",
            field,
            value: filterValue,
        })
        return this
    }

    // Exists filters
    exists(field: string, exists = true): FilterBuilder {
        const filterValue: ExistsFilterValue = {
            type: "boolean",
            exists,
        }

        this.filters.push({
            type: "EXISTS",
            field,
            value: filterValue,
        })
        return this
    }

    // Geo distance filters
    geoDistance(
        field: string,
        coordinates: [number, number],
        distance: number,
        unit: "km" | "m" | "mi" = "km",
    ): FilterBuilder {
        const filterValue: GeoDistanceFilterValue = {
            type: "geo",
            coordinates,
            distance,
            unit,
        }

        this.filters.push({
            type: "GEO_DISTANCE",
            field,
            value: filterValue,
        })
        return this
    }

    // Build the final filters array
    build(): Filter[] {
        return [...this.filters]
    }

    // Reset filters
    reset(): FilterBuilder {
        this.filters = []
        return this
    }

    // Get current filters count
    count(): number {
        return this.filters.length
    }
}

// Utility functions for common filters
export const createDateRangeFilter = (field: string, gte?: string, lte?: string): Filter => {
    return {
        type: "RANGE",
        field,
        value: {
            type: "date",
            ...(gte && { gte }),
            ...(lte && { lte }),
        },
    }
}

export const createPriceRangeFilter = (minPrice?: number, maxPrice?: number): Filter => {
    return {
        type: "RANGE",
        field: "rentPricePerMonth",
        value: {
            type: "number",
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
        },
    }
}

export const createLocationFilter = (
    coordinates: [number, number],
    distance: number,
    unit: "km" | "m" | "mi" = "km",
): Filter => {
    return {
        type: "GEO_DISTANCE",
        field: "location",
        value: {
            type: "geo",
            coordinates,
            distance,
            unit,
        },
    }
}

// Convert legacy search params to new filter format
export const convertLegacyToFilters = (legacy: LegacySearchPropertyRequest): SearchPropertyRequest => {
    const builder = new FilterBuilder()

    // Location filters
    if (legacy.city) {
        builder.term("location.city", legacy.city, "string")
    }
    if (legacy.state) {
        builder.term("location.state", legacy.state, "string")
    }
    if (legacy.country) {
        builder.term("location.country", legacy.country, "string")
    }

    // Property type and use
    if (legacy.propertyType) {
        builder.term("propertyType", legacy.propertyType, "string")
    }
    if (legacy.propertyUse) {
        builder.term("propertyUse", legacy.propertyUse, "string")
    }

    // Price range
    if (legacy.minPrice !== undefined || legacy.maxPrice !== undefined) {
        builder.numberRange("rentPricePerMonth", legacy.minPrice, legacy.maxPrice)
    }

    // Rooms and bathrooms
    if (legacy.minRooms !== undefined || legacy.maxRooms !== undefined) {
        builder.numberRange("rooms", legacy.minRooms, legacy.maxRooms)
    }
    if (legacy.minBathrooms !== undefined || legacy.maxBathrooms !== undefined) {
        builder.numberRange("bathrooms", legacy.minBathrooms, legacy.maxBathrooms)
    }

    // Area
    if (legacy.minArea !== undefined || legacy.maxArea !== undefined) {
        builder.numberRange("area", legacy.minArea, legacy.maxArea)
    }

    // Availability dates
    if (legacy.availableFrom || legacy.availableTo) {
        builder.dateRange("isAvailableForRentalFrom", legacy.availableFrom, legacy.availableTo)
    }

    // Max guests
    if (legacy.maxGuests !== undefined) {
        builder.numberRange("maximumGuests", undefined, legacy.maxGuests)
    }

    // Boolean amenities and rules
    if (legacy.petsAllowed !== undefined) {
        builder.term("houseRules.petsAllowed", legacy.petsAllowed, "boolean")
    }
    if (legacy.smokingAllowed !== undefined) {
        builder.term("houseRules.smokingAllowed", legacy.smokingAllowed, "boolean")
    }
    if (legacy.partiesAllowed !== undefined) {
        builder.term("houseRules.partiesAllowed", legacy.partiesAllowed, "boolean")
    }

    // Amenities
    if (legacy.amenities) {
        Object.entries(legacy.amenities).forEach(([key, value]) => {
            if (value !== undefined) {
                if (typeof value === "boolean") {
                    builder.term(`amenities.${key}`, value, "boolean")
                } else if (typeof value === "number") {
                    builder.term(`amenities.${key}`, value, "number")
                } else {
                    builder.term(`amenities.${key}`, value, "string")
                }
            }
        })
    }

    return {
        filters: builder.build(),
        page: legacy.page,
        limit: legacy.limit,
        sortBy: legacy.sortBy,
        sortOrder: legacy.sortOrder,
    }
}
