'use client';

import {useParams, useRouter} from 'next/navigation';
import {Suspense, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Home, Lock} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
import {usePropertyEdit} from '@/hooks/use-property-edit';
import {BasicInfoCard} from '@/components/property/publish/basic-info-card';
import {PricingCard} from '@/components/property/publish/pricing-card';
import {ServicesCard} from '@/components/property/publish/services-card';
import {AmenitiesCard} from '@/components/property/publish/amenities-card';
import {PropertyUseCard} from '@/components/property/publish/property-use-card';
import {ImagesUploadCard} from '@/components/property/publish/images-upload-card';
import {LocationCard} from '@/components/property/publish/location-card';
import {PROPERTY_TYPE} from '@/constants/property-type.enum';
import {CURRENCY} from '@/constants/currencies.enum';
import {PROPERTY_USE} from '@/constants/property-use.enum';
import {CUBA_PROVINCES} from '@/constants/cuba-locations';

const uniqueAmenitiesList = [
    {id: 'kitchen', label: 'Cocina equipada'},
    {id: 'balcony', label: 'Balcón'},
    {id: 'garden', label: 'Jardín'},
    {id: 'terrace', label: 'Terraza'},
    {id: 'garage', label: 'Garaje'},
    {id: 'elevator', label: 'Ascensor'},
    {id: 'hasFridge', label: 'Refrigerador'},
    {id: 'hasMicrowave', label: 'Microondas'},
    {id: 'hasWasher', label: 'Lavadora'},
    {id: 'hasPool', label: 'Piscina'},
    {id: 'furnished', label: 'Propiedad amueblada'},
];

/**
 * EditPropertyContent Component
 *
 * Main component for editing a property.
 * Uses react-hook-form and custom usePropertyEdit hook for all logic.
 * Follows Single Responsibility Principle - Only handles UI rendering.
 */
const EditPropertyContent = () => {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);

    // Use custom hook for all edit logic
    const {
        handleSubmit,
        isSubmitting,
        watch,
        setValue,
        property,
        loadingProperty,
        isOwner,
        selectedLocation,
        setSelectedLocation,
        uploadedImages,
        setUploadedImages,
        status,
    } = usePropertyEdit(slug);

    // Convert form values for compatibility with existing card components
    const formData = {
        title: watch('title') || '',
        description: watch('description') || '',
        price: watch('rentPricePerMonth') || '',
        currency: watch('currency') || 'USD',
        rooms: watch('rooms') || '',
        bathrooms: watch('bathrooms') || '',
        squareMeters: watch('area') || '',
        propertyType: watch('propertyType') || '',
        propertyUse: watch('propertyUse') || '',
        availability: watch('isAvailable') ? 'immediate' : 'future',
        securityDeposit: watch('securityDeposit') || '',
        minimumStayTime: watch('minimumStayTime') || '',
        maximumStayTime: watch('maximumStayTime') || '',
        maximumGuests: watch('maximumGuests') || '',
        cleanFee: watch('cleanFee') || '',
        contactWhatsApp: watch('contactWhatsApp') || '',
        contactTelegram: watch('contactTelegram') || '',
        contactPhone: watch('contactPhone') || '',
        furnished: watch('furnished') || false,
        amenities: watch('amenitiesArray') || [],
        state: watch('locationState') || '',
        city: watch('locationCity') || '',
        deposit: '',
        utilities: 'not-included',
        services: property?.services || {
            electricity: 'INCLUDED',
            water: 'INCLUDED',
            gas: 'INCLUDED',
            trashCollection: false,
            internetType: 'NONE',
            cableTV: false,
            streamingServices: false,
            landlinePhone: false,
            cleaningService: 'NOT_INCLUDED',
            linenService: false,
            laundryService: false,
            maintenanceService: false,
            gardenMaintenance: false,
            poolMaintenance: false,
            securityService: false,
            alarmMonitoring: false,
            parkingIncluded: false,
            garageAccess: false,
            airportTransfer: false,
            conciergeService: false,
            guestSupport24h: false,
            welcomePackage: false,
            tourGuideService: false,
            breakfastService: false,
            groceryService: false,
            chefService: false,
            petCareService: false,
            babysittingService: false,
            fitnessTrainer: false,
            spaServices: false,
        },
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        const fieldMap: Record<string, string> = {
            title: 'title',
            description: 'description',
            price: 'rentPricePerMonth',
            currency: 'currency',
            rooms: 'rooms',
            bathrooms: 'bathrooms',
            squareMeters: 'area',
            propertyType: 'propertyType',
            propertyUse: 'propertyUse',
            availability: 'isAvailable',
            securityDeposit: 'securityDeposit',
            minimumStayTime: 'minimumStayTime',
            maximumStayTime: 'maximumStayTime',
            maximumGuests: 'maximumGuests',
            cleanFee: 'cleanFee',
            contactWhatsApp: 'contactWhatsApp',
            contactTelegram: 'contactTelegram',
            contactPhone: 'contactPhone',
            furnished: 'furnished',
            state: 'locationState',
            city: 'locationCity',
        };

        const mappedField = fieldMap[field] || field;
        // @ts-expect-error - Dynamic field access
        setValue(mappedField, field === 'availability' ? value === 'immediate' : value);
    };

    const handleAmenityToggle = (amenity: string, checked: boolean) => {
        const currentAmenities = watch('amenitiesArray') || [];
        const newAmenities = checked
            ? [...currentAmenities, amenity]
            : currentAmenities.filter((a) => a !== amenity);
        setValue('amenitiesArray', newAmenities);
    };

    const handleServiceChange = () => {
        // Services are handled by the property object directly
    };

    // Mock form object for compatibility with existing components
    const form = {
        formData,
        handleInputChange,
        handleAmenityToggle,
        handleServiceChange,
        selectedLocation,
        setSelectedLocation,
        uploadedImages,
        setUploadedImages,
        selectedProvince: '',
        selectedMunicipality: '',
        handleProvinceChange: () => {},
        handleMunicipalityChange: () => {},
        handleImageSelect: () => {},
        removeImage: (index: number) => {
            setUploadedImages(uploadedImages.filter((_, i) => i !== index));
        },
        isUploading: false,
    };

    type FormType = typeof form;
    const steps: ((form: FormType) => React.ReactNode)[] = [
        (form) => <BasicInfoCard formData={form.formData} handleInputChange={form.handleInputChange} PROPERTY_TYPE={PROPERTY_TYPE} />,
        (form) => <PricingCard formData={form.formData} handleInputChange={form.handleInputChange} CURRENCY={CURRENCY} />,
        (form) => <ServicesCard formData={form.formData} handleServiceChange={form.handleServiceChange} />,
        (form) => (
            <div className="flex flex-col gap-6">
                <div className="flex-1">
                    <AmenitiesCard formData={form.formData} handleAmenityToggle={form.handleAmenityToggle} uniqueAmenitiesList={uniqueAmenitiesList} />
                </div>
                <div className="flex-1">
                    <PropertyUseCard formData={form.formData} handleInputChange={form.handleInputChange} PROPERTY_USE={PROPERTY_USE} />
                </div>
            </div>
        ),
        (form) => <LocationCard selectedProvince={form.selectedProvince} selectedMunicipality={form.selectedMunicipality} handleProvinceChange={form.handleProvinceChange} handleMunicipalityChange={form.handleMunicipalityChange} selectedLocation={form.selectedLocation} setSelectedLocation={form.setSelectedLocation} CUBA_PROVINCES={CUBA_PROVINCES} />,
        (form) => <ImagesUploadCard uploadedImages={form.uploadedImages} handleImageSelect={form.handleImageSelect} removeImage={form.removeImage} isUploading={form.isUploading} />,
    ];

    // Loading state
    if (status === 'loading' || loadingProperty || isOwner === null) {
        return (
            <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
                <Card>
                    <CardContent className="p-8">
                        <div className="text-center">
                            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Verificando permisos...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Access denied
    if (isOwner === false) {
        return (
            <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
                <Card className="max-w-md">
                    <CardContent className="p-8 text-center">
                        <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h2>
                        <p className="text-gray-600 mb-4">No tienes permisos para editar esta propiedad</p>
                        <Button onClick={() => router.push('/profile')} className="bg-teal-600 hover:bg-teal-700">
                            Ir a Mi Perfil
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Propiedad</h1>
                    <p className="text-gray-600">Actualiza la información de tu propiedad</p>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 font-medium">Paso {step + 1} de {steps.length}</span>
                        <span className="text-sm text-gray-700 font-medium">{Math.round(((step + 1) / steps.length) * 100)}% completado</span>
                    </div>
                    <div className="w-full mb-4">
                        <div
                            style={{width: `${((step + 1) / steps.length) * 100}%`}}
                            className="h-2 rounded-md shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-out"
                        ></div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div style={{minHeight: 400}}>
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={step}
                                custom={direction}
                                initial={{x: direction === 1 ? 100 : -100, opacity: 0}}
                                animate={{x: 0, opacity: 1}}
                                exit={{x: direction === 1 ? -100 : 100, opacity: 0}}
                                transition={{duration: 0.35, ease: 'easeInOut'}}
                            >
                                {steps[step](form)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="flex flex-row justify-between gap-4 pt-8 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                if (step > 0) {
                                    setDirection(-1);
                                    setStep(step - 1);
                                } else {
                                    router.push(`/property/${slug}`);
                                }
                            }}
                            className="h-12 px-8 text-lg font-medium border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                        >
                            {step === 0 ? 'Cancelar' : 'Atrás'}
                        </Button>
                        {step < steps.length - 1 ? (
                            <Button
                                type="button"
                                className="h-12 px-8 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                onClick={() => {
                                    setDirection(1);
                                    setStep(step + 1);
                                }}
                            >
                                Siguiente
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="h-12 px-8 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Actualizando...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Home className="w-4 h-4" />
                                        Actualizar Propiedad
                                    </div>
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

const EditPropertyPage = () => {
  return (
    <Suspense fallback={
      <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <EditPropertyContent />
    </Suspense>
  );
};

export default EditPropertyPage;

