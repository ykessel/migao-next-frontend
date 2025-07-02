"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useCreateProperty } from "@/hooks/use-properties";
import { PROPERTY_TYPE } from "@/constants/property-type.enum.ts";
import { CURRENCY } from "@/constants/currencies.enum.ts";
import { PROPERTY_USE } from "@/constants/property-use.enum.ts";
import { CUBA_PROVINCES } from "@/constants/cuba-locations";
import { BasicInfoCard } from "@/components/publish-property/BasicInfoCard";
import { PropertyDetailsCard } from "@/components/publish-property/PropertyDetailsCard";
import { PricingCard } from "@/components/publish-property/PricingCard";
import { ServicesCard } from "@/components/publish-property/ServicesCard";
import { AmenitiesCard } from "@/components/publish-property/AmenitiesCard";
import { PropertyUseCard } from "@/components/publish-property/PropertyUseCard";
import { ImagesUploadCard } from "@/components/publish-property/ImagesUploadCard";
import { LocationCard } from "@/components/publish-property/LocationCard";
import { usePublishPropertyForm } from "@/components/publish-property/usePublishPropertyForm";
import type { CreatePropertyRequest } from "@/types/property";
import { GAS_AVAILABILITY } from "@/constants/gas-availability.enum.ts";

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

const PublishProperty = () => {
  const router = useRouter();
  const { toast } = useToast();
  const createProperty = useCreateProperty();
  const form = usePublishPropertyForm(toast);

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
      await createProperty.mutateAsync(propertyData);
      toast({
        title: "¡Propiedad publicada!",
        description: "Tu propiedad ha sido publicada exitosamente.",
      });
      router.push('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al publicar la propiedad",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          className="mb-6 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
        >
          Volver al inicio
        </Button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Publicar Propiedad</h1>
          <p className="text-gray-600">Completa la información de tu propiedad para publicarla</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <BasicInfoCard
            formData={form.formData}
            handleInputChange={form.handleInputChange}
            PROPERTY_TYPE={PROPERTY_TYPE}
          />
          <PropertyDetailsCard
            formData={form.formData}
            handleInputChange={form.handleInputChange}
          />
          <PricingCard
            formData={form.formData}
            handleInputChange={form.handleInputChange}
            CURRENCY={CURRENCY}
          />
          <ServicesCard
            formData={form.formData}
            handleServiceChange={form.handleServiceChange}
          />
          <AmenitiesCard
            formData={form.formData}
            handleAmenityToggle={form.handleAmenityToggle}
            uniqueAmenitiesList={uniqueAmenitiesList}
          />
          <PropertyUseCard
            formData={form.formData}
            handleInputChange={form.handleInputChange}
            PROPERTY_USE={PROPERTY_USE}
          />
          <ImagesUploadCard
            uploadedImages={form.uploadedImages}
            handleImageSelect={form.handleImageSelect}
            removeImage={form.removeImage}
            isUploading={form.isUploading}
          />
          <LocationCard
            selectedProvince={form.selectedProvince}
            selectedMunicipality={form.selectedMunicipality}
            handleProvinceChange={form.handleProvinceChange}
            handleMunicipalityChange={form.handleMunicipalityChange}
            selectedLocation={form.selectedLocation}
            setSelectedLocation={form.setSelectedLocation}
            CUBA_PROVINCES={CUBA_PROVINCES}
          />
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white"
              disabled={createProperty.isPending}
            >
              {createProperty.isPending ? 'Publicando...' : 'Publicar Propiedad'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishProperty;
