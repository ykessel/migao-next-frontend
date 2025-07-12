"use client"

import {useState} from "react"
import {useSearchProperties} from "@/hooks/use-properties"
import {
    FilterBuilder,
    createDateRangeFilter,
    createPriceRangeFilter,
    createLocationFilter,
} from "@/utils/filter-builder"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Loader2, Search, Filter, X, Calendar, MapPin, DollarSign} from "lucide-react"
import { SearchPropertyRequest, Filter as PropertyFilter } from "@/types/filter"
import type { Property } from "@/types/property";

export default function AdvancedPropertySearch() {
    const [searchText, setSearchText] = useState("")
    const [activeFilters, setActiveFilters] = useState<PropertyFilter[]>([])
    const [searchParams, setSearchParams] = useState<SearchPropertyRequest>({})

    // Form states for filter inputs
    const [priceRange, setPriceRange] = useState({min: "", max: ""})
    const [dateRange, setDateRange] = useState({from: "", to: ""})
    const [location, setLocation] = useState({lat: "", lng: "", distance: ""})
    const [propertyType, setPropertyType] = useState("")
    const [rooms, setRooms] = useState({min: "", max: ""})

    const {
        data: searchResults,
        isLoading: isSearching,
        error: searchError,
        refetch: refetchSearch,
    } = useSearchProperties(searchParams)

    const handleSearch = () => {
        const newSearchParams: SearchPropertyRequest = {
            search: searchText || undefined,
            filters: activeFilters,
            page: 1,
        }

        setSearchParams(newSearchParams)
        refetchSearch()
    }

    const addPriceFilter = () => {
        if (!priceRange.min && !priceRange.max) return

        const filter = createPriceRangeFilter(
            priceRange.min ? Number(priceRange.min) : undefined,
            priceRange.max ? Number(priceRange.max) : undefined,
        )

        // Remove existing price filters
        const filteredFilters = activeFilters.filter((f) => !(f.field === "rentPricePerMonth" && f.type === "RANGE"))
        setActiveFilters([...filteredFilters, filter])
    }

    const addDateFilter = () => {
        if (!dateRange.from && !dateRange.to) return

        const filter = createDateRangeFilter(
            "isAvailableForRentalFrom",
            dateRange.from || undefined,
            dateRange.to || undefined,
        )

        // Remove existing date filters
        const filteredFilters = activeFilters.filter((f) => !(f.field === "isAvailableForRentalFrom" && f.type === "RANGE"))
        setActiveFilters([...filteredFilters, filter])
    }

    const addLocationFilter = () => {
        if (!location.lat || !location.lng || !location.distance) return

        const filter = createLocationFilter([Number(location.lng), Number(location.lat)], Number(location.distance), "km")

        // Remove existing location filters
        const filteredFilters = activeFilters.filter((f) => !(f.field === "location" && f.type === "GEO_DISTANCE"))
        setActiveFilters([...filteredFilters, filter])
    }

    const addPropertyTypeFilter = () => {
        if (!propertyType) return

        const builder = new FilterBuilder()
        const filter = builder.term("propertyType", propertyType, "string").build()[0]

        // Remove existing property type filters
        const filteredFilters = activeFilters.filter((f) => !(f.field === "propertyType" && f.type === "TERM"))
        setActiveFilters([...filteredFilters, filter])
    }

    const addRoomsFilter = () => {
        if (!rooms.min && !rooms.max) return

        const builder = new FilterBuilder()
        const filter = builder
            .numberRange("rooms", rooms.min ? Number(rooms.min) : undefined, rooms.max ? Number(rooms.max) : undefined)
            .build()[0]

        // Remove existing rooms filters
        const filteredFilters = activeFilters.filter((f) => !(f.field === "rooms" && f.type === "RANGE"))
        setActiveFilters([...filteredFilters, filter])
    }

    const removeFilter = (index: number) => {
        const newFilters = activeFilters.filter((_, i) => i !== index)
        setActiveFilters(newFilters)
    }

    const clearAllFilters = () => {
        setActiveFilters([])
        setPriceRange({min: "", max: ""})
        setDateRange({from: "", to: ""})
        setLocation({lat: "", lng: "", distance: ""})
        setPropertyType("")
        setRooms({min: "", max: ""})
    }

    const getFilterDisplayText = (filter: PropertyFilter): string => {
        switch (filter.type) {
            case "RANGE":
                if (filter.field === "rentPricePerMonth" || filter.field === "rooms" || filter.field === "isAvailableForRentalFrom") {
                    const value = filter.value as import("@/types/filter").RangeFilterValue;
                    if (filter.field === "rentPricePerMonth") {
                        return `Precio: $${value.gte || 0} - $${value.lte || "∞"}`;
                    }
                    if (filter.field === "rooms") {
                        return `Habitaciones: ${value.gte || 0} - ${value.lte || "∞"}`;
                    }
                    if (filter.field === "isAvailableForRentalFrom") {
                        return `Disponible: ${value.gte ? new Date(value.gte).toLocaleDateString() : ""} - ${value.lte ? new Date(value.lte).toLocaleDateString() : ""}`;
                    }
                }
                break;
            case "TERM":
                if (filter.field === "propertyType") {
                    const value = filter.value as import("@/types/filter").TermFilterValue;
                    return `Tipo: ${value.value}`;
                }
                break;
            case "GEO_DISTANCE": {
                const value = filter.value as import("@/types/filter").GeoDistanceFilterValue;
                return `Ubicación: ${value.distance}${value.unit} de radio`;
            }
            default:
                return `${filter.field}: ${JSON.stringify(filter.value)}`;
        }
        return "";
    }

    // Example of using the FilterBuilder for complex searches
    const addComplexFilter = () => {
        const builder = new FilterBuilder()

        // Add multiple filters at once
        const filters = builder
            .dateRange("isAvailableForRentalFrom", "2025-07-05T00:00:00.000Z", "2025-08-10T00:12:00.000Z")
            .numberRange("rentPricePerMonth", 1000, 3000)
            .term("propertyType", "APARTAMENTO", "string")
            .term("amenities.hasWifi", true, "boolean")
            .contains("title", "Chalet")
            .build()

        setActiveFilters([...activeFilters, ...filters])
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5"/>
                        Búsqueda Avanzada de Propiedades
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Text Search */}
                    <div className="flex gap-4">
                        <Input
                            placeholder="Buscar por título, descripción..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={handleSearch} disabled={isSearching}>
                            {isSearching ? <Loader2 className="w-4 h-4 animate-spin"/> : <Search className="w-4 h-4"/>}
                            Buscar
                        </Button>
                    </div>

                    {/* Filter Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Price Range Filter */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <DollarSign className="w-4 h-4"/>
                                    Rango de Precio
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Mín"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange((prev) => ({...prev, min: e.target.value}))}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Máx"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange((prev) => ({...prev, max: e.target.value}))}
                                    />
                                </div>
                                <Button size="sm" onClick={addPriceFilter} className="w-full">
                                    Aplicar
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Date Range Filter */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4"/>
                                    Fechas Disponibles
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex gap-2">
                                    <Input
                                        type="date"
                                        value={dateRange.from}
                                        onChange={(e) => setDateRange((prev) => ({...prev, from: e.target.value}))}
                                    />
                                    <Input
                                        type="date"
                                        value={dateRange.to}
                                        onChange={(e) => setDateRange((prev) => ({...prev, to: e.target.value}))}
                                    />
                                </div>
                                <Button size="sm" onClick={addDateFilter} className="w-full">
                                    Aplicar
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Location Filter */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <MapPin className="w-4 h-4"/>
                                    Ubicación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex gap-1">
                                    <Input
                                        type="number"
                                        placeholder="Lat"
                                        value={location.lat}
                                        onChange={(e) => setLocation((prev) => ({...prev, lat: e.target.value}))}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Lng"
                                        value={location.lng}
                                        onChange={(e) => setLocation((prev) => ({...prev, lng: e.target.value}))}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Km"
                                        value={location.distance}
                                        onChange={(e) => setLocation((prev) => ({...prev, distance: e.target.value}))}
                                    />
                                </div>
                                <Button size="sm" onClick={addLocationFilter} className="w-full">
                                    Aplicar
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Property Type Filter */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Tipo de Propiedad</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Select value={propertyType} onValueChange={setPropertyType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar tipo"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="APARTAMENTO">Apartamento</SelectItem>
                                        <SelectItem value="CASA">Casa</SelectItem>
                                        <SelectItem value="ESTUDIO">Estudio</SelectItem>
                                        <SelectItem value="LOFT">Loft</SelectItem>
                                        <SelectItem value="HABITACION">Habitación</SelectItem>
                                        <SelectItem value="CASA_FLOTANTE_EMBARCACION">Casa Flotante</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button size="sm" onClick={addPropertyTypeFilter} className="w-full">
                                    Aplicar
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Rooms Filter */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Habitaciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Mín"
                                        value={rooms.min}
                                        onChange={(e) => setRooms((prev) => ({...prev, min: e.target.value}))}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Máx"
                                        value={rooms.max}
                                        onChange={(e) => setRooms((prev) => ({...prev, max: e.target.value}))}
                                    />
                                </div>
                                <Button size="sm" onClick={addRoomsFilter} className="w-full">
                                    Aplicar
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Complex Filter Example */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Filtro Complejo</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm" onClick={addComplexFilter} variant="outline" className="w-full">
                                    Ejemplo Avanzado
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium flex items-center gap-2">
                                    <Filter className="w-4 h-4"/>
                                    Filtros Activos ({activeFilters.length})
                                </h3>
                                <Button size="sm" variant="outline" onClick={clearAllFilters}>
                                    Limpiar Todo
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {activeFilters.map((filter, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {getFilterDisplayText(filter)}
                                        <X className="w-3 h-3 cursor-pointer hover:text-red-500"
                                           onClick={() => removeFilter(index)}/>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search Results */}
                    {searchError &&
                        <div className="text-red-500 p-4 bg-red-50 rounded-lg">Error: {searchError.message}</div>}

                    {searchResults && (
                        <div className="space-y-4">
                            <h3 className="font-semibold">
                                Encontradas {searchResults.total} propiedades
                                (Página {searchResults.page} de {searchResults.totalPages}
                                )
                            </h3>
                            <div className="grid gap-4">
                                {searchResults?.data?.map((property: Property) => (
                                    <Card key={property._id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-lg">{property.title}</h4>
                                                    <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              {property?.location?.city}, {property?.location?.state}
                            </span>
                                                        <span>•</span>
                                                        <span>
                              {property?.rooms} hab, {property?.bathrooms} baños
                            </span>
                                                        <span>•</span>
                                                        <span>{property?.area} m²</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{property.propertyType}</Badge>
                                                        <Badge variant="outline">{property.propertyUse}</Badge>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-green-600">${property.rentPricePerMonth}</p>
                                                    <p className="text-sm text-gray-500">{property.currency}/mes</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
