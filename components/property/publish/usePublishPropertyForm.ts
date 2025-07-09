import { useState } from 'react';
import { PROPERTY_TYPE } from '@/constants/property-type.enum.ts';
import { PROPERTY_USE } from '@/constants/property-use.enum.ts';
import { CUBA_PROVINCES } from '@/constants/cuba-locations';
import type { Location } from '@/types/property';
import type { IPropertyServices } from '@/types/property-services';
import axiosInstance from '@/lib/axios';
import type { ToastFunction } from '@/hooks/use-toast';

export function usePublishPropertyForm(toast: ToastFunction) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "EUR",
    rooms: "",
    bathrooms: "",
    squareMeters: "",
    propertyType: "" as PROPERTY_TYPE,
    propertyUse: "RESIDENCIAL" as PROPERTY_USE,
    availability: "immediate",
    furnished: false,
    deposit: "",
    utilities: "not-included",
    contactWhatsApp: "",
    contactTelegram: "",
    contactPhone: "",
    amenities: [] as string[],
    minimumStayTime: "1",
    maximumStayTime: "12",
    maximumGuests: "4",
    cleanFee: "0",
    securityDeposit: "0",
    state: "",
    city: "",
    services: {
      electricity: 'NOT_INCLUDED',
      water: 'NOT_INCLUDED',
      gas: 'NOT_INCLUDED',
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
      gasAvailability: undefined,
    } as IPropertyServices & { gasAvailability?: string },
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const uploadSingleImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axiosInstance.post("/file-upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.url;
    } catch (error) {
      toast({
        title: "Error al subir imagen",
        description: error instanceof Error ? error.message : "No se pudo subir la imagen",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setIsUploading(true);
      setSelectedImages(prev => [...prev, ...files]);
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
      for (const file of files) {
        const url = await uploadSingleImage(file);
        if (url) {
          setUploadedImages(prev => [...prev, url]);
        }
      }
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      const newUrls = [...prev];
      URL.revokeObjectURL(newUrls[index]);
      return newUrls.filter((_, i) => i !== index);
    });
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvince(provinceId);
    setSelectedMunicipality("");
    const province = CUBA_PROVINCES.find(p => p.id === provinceId);
    if (selectedLocation) {
      setSelectedLocation({
        ...selectedLocation,
        state: province?.name || "",
        city: ""
      });
    }
  };

  const handleMunicipalityChange = (municipalityId: string) => {
    setSelectedMunicipality(municipalityId);
    const province = CUBA_PROVINCES.find(p => p.id === selectedProvince);
    const municipality = province?.municipalities.find(m => m.id === municipalityId);
    if (selectedLocation) {
      setSelectedLocation({
        ...selectedLocation,
        city: municipality?.name || ""
      });
    }
  };

  const handleServiceChange = (field: keyof IPropertyServices | 'gasAvailability', value: unknown) => {
    const booleanFields: (keyof IPropertyServices)[] = [
      'trashCollection', 'cableTV', 'streamingServices', 'landlinePhone', 'linenService', 'laundryService', 'maintenanceService',
      'gardenMaintenance', 'poolMaintenance', 'securityService', 'alarmMonitoring', 'parkingIncluded', 'garageAccess',
      'airportTransfer', 'conciergeService', 'guestSupport24h', 'welcomePackage', 'tourGuideService', 'breakfastService',
      'groceryService', 'chefService', 'petCareService', 'babysittingService', 'fitnessTrainer', 'spaServices'
    ];
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [field]: field === 'gasAvailability' ? value : (booleanFields.includes(field as keyof IPropertyServices) ? Boolean(value) : value)
      }
    }));
  };

  return {
    formData,
    setFormData,
    selectedImages,
    setSelectedImages,
    previewUrls,
    setPreviewUrls,
    selectedLocation,
    setSelectedLocation,
    selectedProvince,
    setSelectedProvince,
    selectedMunicipality,
    setSelectedMunicipality,
    uploadedImages,
    setUploadedImages,
    isUploading,
    setIsUploading,
    handleInputChange,
    handleAmenityToggle,
    handleImageSelect,
    removeImage,
    handleProvinceChange,
    handleMunicipalityChange,
    handleServiceChange,
  };
} 