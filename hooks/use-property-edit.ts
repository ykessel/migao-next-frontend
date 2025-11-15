'use client';

import {useState, useEffect, useMemo, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {useForm} from 'react-hook-form';
import {jwtDecode} from 'jwt-decode';
import {useProperty} from '@/hooks/use-properties';
import {useUpdateProperty} from '@/hooks/use-user-properties';
import {toast} from 'sonner';
import type {Property, CreatePropertyRequest} from '@/types/property';
import type {Location} from '@/types/location';
import {GAS_AVAILABILITY} from '@/constants/gas-availability.enum';

type DecodedJwt = { user?: { _id?: string }, _id?: string, sub?: string };

interface PropertyFormData extends Omit<CreatePropertyRequest, 'location' | 'images' | 'amenities' | 'houseRules' | 'services'> {
    // Basic fields as strings for form inputs
    rentPricePerMonth: string;
    rooms: string;
    bathrooms: string;
    area: string;
    securityDeposit: string;
    minimumStayTime: string;
    maximumStayTime: string;
    maximumGuests: string;
    cleanFee: string;
    
    // Nested fields flattened
    contactWhatsApp: string;
    contactTelegram: string;
    contactPhone: string;
    
    // Location
    locationState: string;
    locationCity: string;
    
    // Amenities as checkbox array
    amenitiesArray: string[];
    furnished: boolean;
    
    // Services
    gasService: string;
}

/**
 * usePropertyEdit Hook
 *
 * Custom hook to manage property editing functionality.
 * Handles ownership verification, form initialization, validation, and submission.
 *
 * @param slug - Property slug to edit
 * @returns Object containing form state, handlers, and validation
 */
export function usePropertyEdit(slug: string) {
    const router = useRouter();
    const {data: session, status} = useSession();
    const [isOwner, setIsOwner] = useState<boolean | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    // Extract user ID from session
    const userId = useMemo(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
            return undefined;
        }

        const accessToken = (session as { access_token?: string } | null)?.access_token;
        if (!accessToken) return undefined;

        try {
            const decoded = jwtDecode<DecodedJwt>(accessToken);
            return decoded.user?._id || decoded._id || decoded.sub;
        } catch (error) {
            console.error('Error decoding token:', error);
            router.push('/login');
            return undefined;
        }
    }, [session, status, router]);

    // Fetch property data
    const {data: property, isLoading: loadingProperty} = useProperty(slug);

    // Update mutation
    const updateProperty = useUpdateProperty();

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        watch,
        setValue,
        getValues,
    } = useForm<PropertyFormData>({
        defaultValues: {
            title: '',
            description: '',
            rentPricePerMonth: '',
            currency: 'USD',
            rooms: '',
            bathrooms: '',
            area: '',
            propertyType: '',
            propertyUse: '',
            isAvailable: true,
            securityDeposit: '',
            minimumStayTime: '',
            maximumStayTime: '',
            maximumGuests: '',
            cleanFee: '',
            contactWhatsApp: '',
            contactTelegram: '',
            contactPhone: '',
            locationState: '',
            locationCity: '',
            amenitiesArray: [],
            furnished: false,
            gasService: 'INCLUDED',
        },
    });

    // Verify ownership
    useEffect(() => {
        if (property && userId) {
            let propertyOwnerId: string | undefined;

            if (typeof property.owner === 'object' && property.owner !== null) {
                propertyOwnerId = property.owner._id;
            } else if (typeof property.owner === 'string') {
                propertyOwnerId = property.owner;
            }

            const normalizedPropertyOwnerId = String(propertyOwnerId || '').trim();
            const normalizedUserId = String(userId || '').trim();

            console.log('🔍 Ownership verification:', {
                propertyOwnerId: normalizedPropertyOwnerId,
                userId: normalizedUserId,
                match: normalizedPropertyOwnerId === normalizedUserId,
            });

            if (normalizedPropertyOwnerId === normalizedUserId) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
                toast.error('No tienes permisos para editar esta propiedad');
                setTimeout(() => router.push('/profile'), 2000);
            }
        }
    }, [property, userId, router]);

    // Initialize form with property data
    useEffect(() => {
        if (property && isOwner) {
            // Build amenities array
            const amenitiesArray: string[] = [];
            if (property.amenities?.garage) amenitiesArray.push('garage');
            if (property.amenities?.garden) amenitiesArray.push('garden');
            if (property.amenities?.terrace) amenitiesArray.push('terrace');
            if (property.amenities?.kitchen) amenitiesArray.push('kitchen');
            if (property.amenities?.hasTV) amenitiesArray.push('hasTv');
            if (property.amenities?.hasWifi) amenitiesArray.push('wifi');
            if (property.amenities?.hasAC) amenitiesArray.push('hasAC');
            if (property.amenities?.hasFridge) amenitiesArray.push('hasFridge');
            if (property.amenities?.hasWasher) amenitiesArray.push('hasWasher');
            if (property.amenities?.hasMicrowave) amenitiesArray.push('hasMicrowave');
            if (property.amenities?.hasElevator) amenitiesArray.push('hasElevator');
            if (property.amenities?.hasBalcony) amenitiesArray.push('hasBalcony');
            if (property.amenities?.hasPool) amenitiesArray.push('hasPool');

            // Reset form with property data
            reset({
                title: property.title || '',
                description: property.description || '',
                rentPricePerMonth: property.rentPricePerMonth?.toString() || '',
                currency: property.currency || 'USD',
                rooms: property.rooms?.toString() || '',
                bathrooms: property.bathrooms?.toString() || '',
                area: property.area?.toString() || '',
                propertyType: property.propertyType || '',
                propertyUse: property.propertyUse || '',
                isAvailable: property.isAvailable ?? true,
                securityDeposit: property.securityDeposit?.toString() || '',
                minimumStayTime: property.minimumStayTime?.toString() || '',
                maximumStayTime: property.maximumStayTime?.toString() || '',
                maximumGuests: property.maximumGuests?.toString() || '',
                cleanFee: property.cleanFee?.toString() || '',
                contactWhatsApp: property.owner?.whatsapp || '',
                contactTelegram: property.owner?.telegram || '',
                contactPhone: property.owner?.phone || '',
                locationState: property.location?.state || '',
                locationCity: property.location?.city || '',
                amenitiesArray,
                furnished: property.amenities?.furnished || false,
                gasService: property.services?.gas || 'INCLUDED',
            });

            // Set location and images
            if (property.location) {
                setSelectedLocation(property.location);
            }

            if (property.images && property.images.length > 0) {
                setUploadedImages(property.images.map(img => img.url));
            }
        }
    }, [property, isOwner, reset]);

    // Form submission handler
    const onSubmit = useCallback(async (data: PropertyFormData) => {
        if (!selectedLocation) {
            toast.error('Por favor, selecciona una ubicación en el mapa');
            return;
        }

        try {
            const amenitiesArray = data.amenitiesArray || [];

            const propertyData: CreatePropertyRequest = {
                title: data.title,
                description: data.description,
                rentPricePerMonth: Number(data.rentPricePerMonth),
                currency: data.currency,
                rooms: Number(data.rooms),
                bathrooms: Number(data.bathrooms),
                area: Number(data.area),
                location: selectedLocation,
                propertyType: data.propertyType,
                propertyUse: data.propertyUse,
                isAvailable: data.isAvailable,
                isAvailableForRentalFrom: property?.isAvailableForRentalFrom || new Date().toISOString(),
                isAvailableForRentalTo: property?.isAvailableForRentalTo || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                securityDeposit: Number(data.securityDeposit),
                minimumStayTime: Number(data.minimumStayTime),
                maximumStayTime: Number(data.maximumStayTime),
                maximumGuests: Number(data.maximumGuests),
                cleanFee: Number(data.cleanFee),
                amenities: {
                    garage: amenitiesArray.includes('garage'),
                    garden: amenitiesArray.includes('garden'),
                    terrace: amenitiesArray.includes('terrace'),
                    kitchen: amenitiesArray.includes('kitchen'),
                    furnished: data.furnished,
                    hasTV: amenitiesArray.includes('hasTv'),
                    hasWifi: amenitiesArray.includes('wifi'),
                    hasAC: amenitiesArray.includes('hasAC'),
                    hasFridge: amenitiesArray.includes('hasFridge'),
                    hasWasher: amenitiesArray.includes('hasWasher'),
                    hasMicrowave: amenitiesArray.includes('hasMicrowave'),
                    hasElevator: amenitiesArray.includes('hasElevator'),
                    hasBalcony: amenitiesArray.includes('hasBalcony'),
                    hasPool: amenitiesArray.includes('hasPool'),
                    gasAvailability: data.gasService === 'INCLUDED' ? GAS_AVAILABILITY.PIPED : GAS_AVAILABILITY.NONE,
                },
                houseRules: property?.houseRules || {
                    petsAllowed: false,
                    smokingAllowed: false,
                    partiesAllowed: false,
                    checkInTime: '15:00',
                    checkOutTime: '11:00',
                    maxGuests: Number(data.maximumGuests),
                    suitableForChildren: true,
                    extraPeopleAllowed: false,
                    extraPeopleFee: 0,
                    cancellationPolicy: 'Flexible',
                    childrenAllowed: true,
                    modificationsAllowed: false,
                },
                owner: {
                    whatsapp: data.contactWhatsApp,
                    telegram: data.contactTelegram,
                    phone: data.contactPhone,
                },
                images: uploadedImages.map(url => ({url, thumb: url})),
                services: property?.services || {},
            };

            await updateProperty.mutateAsync({propertyId: slug, propertyData});
            toast.success('¡Propiedad actualizada exitosamente!');
            router.push(`/property/${slug}`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error al actualizar la propiedad');
        }
    }, [selectedLocation, uploadedImages, property, updateProperty, slug, router]);

    return {
        // Form state
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting: isSubmitting || updateProperty.isPending,
        watch,
        setValue,
        getValues,
        reset,

        // Property data
        property,
        loadingProperty,
        isOwner,

        // Location & Images
        selectedLocation,
        setSelectedLocation,
        uploadedImages,
        setUploadedImages,

        // Session
        status,
        userId,
    };
}

