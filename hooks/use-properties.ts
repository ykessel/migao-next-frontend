import {
    useQuery,
    useMutation,
    useQueryClient,
    type UseQueryOptions,
    type UseMutationOptions,
} from "@tanstack/react-query"
import {propertyService} from '@/services/api-client';
import type {
    Property,
    CreatePropertyRequest,
} from "@/types/property";
import type {
    SearchPropertyRequest,
    LegacySearchPropertyRequest,
    SearchResponse,
    ApiError,
} from "@/types/filter";
import {convertLegacyToFilters} from "@/utils/filter-builder"
import {IMapPropertyReduced} from "@/components/map";

// Query Keys
export const propertyKeys = {
    all: ["properties"] as const,
    lists: () => [...propertyKeys.all, "list"] as const,
    list: (filters: SearchPropertyRequest) => [...propertyKeys.lists(), filters] as const,
    details: () => [...propertyKeys.all, "detail"] as const,
    detail: (id: string) => [...propertyKeys.details(), id] as const,
    owner: (ownerId: string) => [...propertyKeys.all, "owner", ownerId] as const,
}

// Hook para buscar propiedades con filtros avanzados
export function useSearchProperties(
    searchParams: SearchPropertyRequest = {},
    options?: UseQueryOptions<SearchResponse<Property>, ApiError>,
) {
    // Convert bbox to array of {lat, lng} if present
    let bboxKey: { lat: number; lng: number }[] | undefined = undefined;
    if (searchParams.bbox && Array.isArray(searchParams.bbox) && searchParams.bbox.length === 4 && typeof searchParams.bbox[0] === 'number') {
        // Convert [west, south, east, north] to corners
        const [west, south, east, north] = searchParams.bbox as unknown as [number, number, number, number];
        bboxKey = [
            {lat: north, lng: west},
            {lat: north, lng: east},
            {lat: south, lng: east},
            {lat: south, lng: west},
        ];
    } else if (searchParams.bbox && Array.isArray(searchParams.bbox)) {
        bboxKey = searchParams.bbox as { lat: number; lng: number }[];
    }
    const queryKey = [
        ...propertyKeys.lists(),
        {...searchParams, ...(bboxKey ? {bbox: bboxKey} : {})},
        bboxKey ? JSON.stringify(bboxKey) : undefined
    ];
    return useQuery({
        queryKey,
        queryFn: () => propertyService.searchProperties({
            ...searchParams,
            ...(bboxKey ? {bbox: bboxKey} : {}),
        }),
        ...options,
    })
}

export function useSearchMapProperties(
    searchParams?: any,
    options?: UseQueryOptions<IMapPropertyReduced[], ApiError>,
) {
    // Convert bbox to geospatial filter if present
    let updatedSearchParams = {...searchParams};

    if (searchParams?.bbox && Array.isArray(searchParams.bbox) && searchParams.bbox.length >= 4) {

        // Create geospatial filter
        const geospatialFilter = {
            type: "GEOSPATIAL" as const,
            field: "location.coordinates",
            queryType: "geoWithin",
            geometry: {
                type: "Polygon",
                coordinates: [searchParams.bbox.concat([searchParams.bbox[0]])] // Wrap in array for GeoJSON polygon format, coordinates in [lng, lat] order
            }
        };

        console.log('Geospatial Filter:', JSON.stringify(geospatialFilter, null, 2));

        // Add the geospatial filter to existing filters
        updatedSearchParams = {
            ...searchParams,
            filters: [
                ...(searchParams.filters || []),
                geospatialFilter
            ]
        };

        // Remove bbox from the params since it's now a filter
        delete updatedSearchParams.bbox;
    }

    const queryKey = [
        ...propertyKeys.lists(),
        updatedSearchParams,
        updatedSearchParams.filters ? JSON.stringify(updatedSearchParams.filters) : undefined
    ];

    return useQuery({
        queryKey,
        queryFn: () => propertyService.searchMapProperties(updatedSearchParams),
        ...options,
    })
}

// Hook para obtener una propiedad por ID
export function useProperty(id: string, options?: Omit<UseQueryOptions<Property, ApiError>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: propertyKeys.detail(id),
        queryFn: () => propertyService.getPropertyById(id),
        enabled: !!id,
        ...options,
    })
}

// Hook para crear una propiedad
export function useCreateProperty(options?: UseMutationOptions<Property, ApiError, CreatePropertyRequest>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: propertyService.createProperty,
        onSuccess: (data) => {
            // Invalidar las consultas relacionadas
            queryClient.invalidateQueries({queryKey: propertyKeys.lists()})
            queryClient.invalidateQueries({queryKey: propertyKeys.owner(data.owner._id!)})

            // Agregar la nueva propiedad al cache
            queryClient.setQueryData(propertyKeys.detail(data._id!), data)
        },
        ...options,
    })
}

// Hook para actualizar una propiedad
export function useUpdateProperty(
    options?: UseMutationOptions<Property, ApiError, { id: string; data: Partial<CreatePropertyRequest> }>,
) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, data}) => propertyService.updateProperty(id, data),
        onSuccess: (data, variables) => {
            // Actualizar el cache de la propiedad específica
            queryClient.setQueryData(propertyKeys.detail(variables.id), data)

            // Invalidar las listas para reflejar los cambios
            queryClient.invalidateQueries({queryKey: propertyKeys.lists()})
            queryClient.invalidateQueries({queryKey: propertyKeys.owner(data.owner._id!)})
        },
        ...options,
    })
}

// Hook para eliminar una propiedad
export function useDeleteProperty(options?: UseMutationOptions<void, ApiError, string>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: propertyService.deleteProperty,
        onSuccess: (_, propertyId) => {
            // Remover la propiedad del cache
            queryClient.removeQueries({queryKey: propertyKeys.detail(propertyId)})

            // Invalidar las listas
            queryClient.invalidateQueries({queryKey: propertyKeys.lists()})
            queryClient.invalidateQueries({queryKey: propertyKeys.all})
        },
        ...options,
    })
}

// Hook personalizado para manejar el estado de búsqueda con filtros avanzados
export function usePropertySearch() {
    const queryClient = useQueryClient()

    const searchProperties = (searchParams: SearchPropertyRequest) => {
        return queryClient.fetchQuery({
            queryKey: propertyKeys.list(searchParams),
            queryFn: () => propertyService.searchProperties(searchParams),
        })
    }

    const searchPropertiesWithText = (searchText: string, filters?: SearchPropertyRequest["filters"]) => {
        const searchParams: SearchPropertyRequest = {
            search: searchText,
            filters: filters || [],
        }

        return searchProperties(searchParams)
    }

    const prefetchProperty = (id: string) => {
        return queryClient.prefetchQuery({
            queryKey: propertyKeys.detail(id),
            queryFn: () => propertyService.getPropertyById(id),
        })
    }

    return {
        searchProperties,
        searchPropertiesWithText,
        prefetchProperty,
    }
}