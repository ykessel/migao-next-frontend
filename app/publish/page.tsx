"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCreateProperty, useProperty } from "@/hooks/use-properties";
import { useUpdateProperty } from "@/hooks/use-user-properties";
import { PROPERTY_TYPE } from "@/constants/property-type.enum";
import { CURRENCY } from "@/constants/currencies.enum";
import { PROPERTY_USE } from "@/constants/property-use.enum";
import { CUBA_PROVINCES } from "@/constants/cuba-locations";
import { BasicInfoCard } from "@/components/property/publish/BasicInfoCard";
import { PricingCard } from "@/components/property/publish/PricingCard";
import { ServicesCard } from "@/components/property/publish/ServicesCard";
import { AmenitiesCard } from "@/components/property/publish/AmenitiesCard";
import { PropertyUseCard } from "@/components/property/publish/PropertyUseCard";
import { ImagesUploadCard } from "@/components/property/publish/ImagesUploadCard";
import { LocationCard } from "@/components/property/publish/LocationCard";
import { usePublishPropertyForm } from "@/components/property/publish/usePublishPropertyForm";
import type { CreatePropertyRequest } from "@/types/property";
import { GAS_AVAILABILITY } from "@/constants/gas-availability.enum";
import { Home } from "lucide-react";
import React, { useEffect, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

const uniqueAmenitiesList = [
  { id: 'kitchen', label: 'Cocina equipada' },
  { id: 'balcony', label: 'Balcón' },
  { id: 'garden', label: 'Jardín' },
  { id: 'terrace', label: 'Terraza' },
  { id: 'garage', label: 'Garaje' },
  { id: 'elevator', label: 'Ascensor' },
  { id: 'hasFridge', label: 'Refrigerador' },
  { id: 'hasMicrowave', label: 'Microondas' },
  { id: 'hasWasher', label: 'Lavadora' },
  { id: 'hasPool', label: 'Piscina' },
  { id: 'furnished', label: 'Propiedad amueblada' },
];

const PublishPropertyContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const form = usePublishPropertyForm(toast);
  
  // Check if we're in edit mode
  const editPropertyId = searchParams.get('edit');
  const isEditMode = !!editPropertyId;
  
  // Load property data if in edit mode
  const { data: propertyToEdit } = useProperty(
    editPropertyId || '',
    { enabled: isEditMode }
  );

  // Populate form with property data when in edit mode
  useEffect(() => {
    if (propertyToEdit && isEditMode) {
      // Populate form data
      form.setFormData({
        title: propertyToEdit.title || '',
        description: propertyToEdit.description || '',
        price: propertyToEdit.rentPricePerMonth?.toString() || '',
        currency: propertyToEdit.currency || 'USD',
        rooms: propertyToEdit.rooms?.toString() || '',
        bathrooms: propertyToEdit.bathrooms?.toString() || '',
        squareMeters: propertyToEdit.area?.toString() || '',
        propertyType: propertyToEdit.propertyType || '',
        propertyUse: propertyToEdit.propertyUse || '',
        availability: propertyToEdit.isAvailable ? 'immediate' : 'future',
        securityDeposit: propertyToEdit.securityDeposit?.toString() || '',
        minimumStayTime: propertyToEdit.minimumStayTime?.toString() || '',
        maximumStayTime: propertyToEdit.maximumStayTime?.toString() || '',
        maximumGuests: propertyToEdit.maximumGuests?.toString() || '',
        cleanFee: propertyToEdit.cleanFee?.toString() || '',
        contactWhatsApp: propertyToEdit.owner?.whatsapp || '',
        contactTelegram: propertyToEdit.owner?.telegram || '',
        contactPhone: propertyToEdit.owner?.phone || '',
        furnished: propertyToEdit.amenities?.furnished || false,
        deposit: '',
        utilities: 'not-included',
        state: propertyToEdit.location?.state || '',
        city: propertyToEdit.location?.city || '',
        amenities: [
          ...(propertyToEdit.amenities?.garage ? ['garage'] : []),
          ...(propertyToEdit.amenities?.garden ? ['garden'] : []),
          ...(propertyToEdit.amenities?.terrace ? ['terrace'] : []),
          ...(propertyToEdit.amenities?.kitchen ? ['kitchen'] : []),
          ...(propertyToEdit.amenities?.hasTV ? ['hasTv'] : []),
          ...(propertyToEdit.amenities?.hasWifi ? ['wifi'] : []),
          ...(propertyToEdit.amenities?.hasAC ? ['hasAC'] : []),
          ...(propertyToEdit.amenities?.hasFridge ? ['hasFridge'] : []),
          ...(propertyToEdit.amenities?.hasWasher ? ['hasWasher'] : []),
          ...(propertyToEdit.amenities?.hasMicrowave ? ['hasMicrowave'] : []),
          ...(propertyToEdit.amenities?.hasElevator ? ['hasElevator'] : []),
          ...(propertyToEdit.amenities?.hasBalcony ? ['hasBalcony'] : []),
          ...(propertyToEdit.amenities?.hasPool ? ['hasPool'] : []),
        ],
        services: propertyToEdit.services || {
          electricity: 'INCLUDED',
          water: 'INCLUDED',
          gas: 'INCLUDED',
          trashCollection: false,
          internetType: 'FIBER',
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
          gasAvailability: undefined,
        },
      });

      // Set location data
      if (propertyToEdit.location) {
        form.setSelectedLocation(propertyToEdit.location);
      }

      // Set images
      if (propertyToEdit.images && propertyToEdit.images.length > 0) {
        form.setUploadedImages(propertyToEdit.images.map(img => img.url));
      }
    }
  }, [propertyToEdit, isEditMode, form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.selectedLocation) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una ubicación en el mapa.",
        variant: "destructive"
      });
      return;
    }
    try {
      const propertyData: CreatePropertyRequest = {
        title: form.formData.title,
        description: form.formData.description,
        rentPricePerMonth: Number(form.formData.price),
        currency: form.formData.currency,
        rooms: Number(form.formData.rooms),
        bathrooms: Number(form.formData.bathrooms),
        area: Number(form.formData.squareMeters),
        location: form.selectedLocation,
        propertyType: form.formData.propertyType,
        propertyUse: form.formData.propertyUse,
        isAvailable: form.formData.availability === 'immediate',
        isAvailableForRentalFrom: new Date().toISOString(),
        isAvailableForRentalTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        securityDeposit: Number(form.formData.securityDeposit),
        minimumStayTime: Number(form.formData.minimumStayTime),
        maximumStayTime: Number(form.formData.maximumStayTime),
        maximumGuests: Number(form.formData.maximumGuests),
        cleanFee: Number(form.formData.cleanFee),
        amenities: {
          garage: form.formData.amenities.includes('garage'),
          garden: form.formData.amenities.includes('garden'),
          terrace: form.formData.amenities.includes('terrace'),
          kitchen: form.formData.amenities.includes('kitchen'),
          furnished: form.formData.furnished,
          hasTV: form.formData.amenities.includes('hasTv'),
          hasWifi: form.formData.amenities.includes('wifi'),
          hasAC: form.formData.amenities.includes('hasAC'),
          hasFridge: form.formData.amenities.includes('hasFridge'),
          hasWasher: form.formData.amenities.includes('hasWasher'),
          hasMicrowave: form.formData.amenities.includes('hasMicrowave'),
          hasElevator: form.formData.amenities.includes('hasElevator'),
          hasBalcony: form.formData.amenities.includes('hasBalcony'),
          hasPool: form.formData.amenities.includes('hasPool'),
          gasAvailability: form.formData.services.gas === 'INCLUDED' ? GAS_AVAILABILITY.PIPED : GAS_AVAILABILITY.NONE
        },
        houseRules: {
          petsAllowed: false,
          smokingAllowed: false,
          partiesAllowed: false,
          checkInTime: "15:00",
          checkOutTime: "11:00",
          maxGuests: Number(form.formData.maximumGuests),
          suitableForChildren: true,
          extraPeopleAllowed: false,
          extraPeopleFee: 0,
          cancellationPolicy: "Flexible",
          childrenAllowed: true,
          modificationsAllowed: false
        },
        owner: {
          whatsapp: form.formData.contactWhatsApp,
          telegram: form.formData.contactTelegram,
          phone: form.formData.contactPhone
        },
        images: form.uploadedImages.map(url => ({ url, thumb: url })),
        services: form.formData.services,
      };

      if (isEditMode && editPropertyId) {
        await updateProperty.mutateAsync({ propertyId: editPropertyId, propertyData });
        toast({
          title: "¡Propiedad actualizada!",
          description: "Tu propiedad ha sido actualizada exitosamente.",
        });
        router.push('/profile?tab=properties');
      } else {
        await createProperty.mutateAsync(propertyData);
        toast({
          title: "¡Propiedad publicada!",
          description: "Tu propiedad ha sido publicada exitosamente.",
        });
        router.push('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al procesar la propiedad",
        variant: "destructive"
      });
    }
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

  
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(0); // 1 for next, -1 for back

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stepper UI */}
        <div className="mb-8">
          {/* Progress bar header */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-700 font-medium">Paso {step + 1} de {steps.length}</span>
            <span className="text-sm text-gray-700 font-medium">{Math.round(((step + 1) / steps.length) * 100)}% completado</span>
          </div>
          <div className="w-full mb-4">
          <div
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              className="h-2 rounded-md shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-out"
            ></div>
          </div>
          {/* Step labels removed */}
        </div>
        {/* Wizard Step */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div style={{ minHeight: 400 }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                initial={{ x: direction === 1 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 1 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
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
                  router.push('/');
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
                disabled={createProperty.isPending || updateProperty.isPending}
              >
                {createProperty.isPending || updateProperty.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isEditMode ? 'Actualizando...' : 'Publicando...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    {isEditMode ? 'Actualizar Propiedad' : 'Publicar Propiedad'}
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

const PublishProperty = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <PublishPropertyContent />
    </Suspense>
  );
};

export default PublishProperty;
