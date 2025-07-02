"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { useProperty } from "@/hooks/use-properties";
import { PlaceType } from '@/constants/places.enum';
import type { IPlaceOfInterest } from '@/types/IPlaceOfInterest';
import { useState } from "react";
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyTabs from '@/components/property/PropertyTabs';
import PropertySidebar from '@/components/property/PropertySidebar';
import { formatDate, getApartmentAmenityIcon, getApartmentAmenityLabel, getRuleIcon, placeTypeIconLabel, typeColors } from '@/components/property/utils';
import { ArrowLeft, Loader2 } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id;
  const [selectedTypes, setSelectedTypes] = useState<PlaceType[]>([]);

  const { data: property, isLoading, error } = useProperty(propertyId as string || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error al cargar la propiedad</h2>
          <p className="text-gray-600 mb-4">No se pudo cargar la información de la propiedad.</p>
          <Button onClick={() => router.push('/')} variant="default">
            Volver a resultados
          </Button>
        </div>
      </div>
    );
  }

  const handleContactWhatsApp = () => {
    if (property.owner.whatsapp) {
      const message = encodeURIComponent(`¡Hola! Estoy interesado en la propiedad: ${property.title}`);
      window.open(`https://wa.me/${property.owner.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    }
  };

  const handleContactTelegram = () => {
    if (property.owner.telegram) {
      window.open(`https://t.me/${property.owner.telegram.replace('@', '')}`, '_blank');
    }
  };

  const handleContactPhone = () => {
    if (property.owner.phone) {
      window.open(`tel:${property.owner.phone}`, '_self');
    }
  };

  const allTypes = Array.from(new Set((property.placesOfInterest || []).map((p: IPlaceOfInterest) => p.type)));

  // Add this style block for custom marker styling (for demo, ideally move to CSS file)
  const markerStyle = `
  .leaflet-custom-marker {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    border: 2.5px solid #00b894;
    width: 32px;
    height: 32px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          className="mb-6 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a resultados
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Gallery and Tabs */}
          <div className="lg:col-span-2">
            <PropertyGallery images={property.images || []} title={property.title} />
            <PropertyTabs
              property={property}
              placeTypeIconLabel={placeTypeIconLabel}
              typeColors={typeColors}
              allTypes={allTypes}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              markerStyle={markerStyle}
              getApartmentAmenityIcon={getApartmentAmenityIcon}
              getApartmentAmenityLabel={getApartmentAmenityLabel}
              getRuleIcon={getRuleIcon}
            />
          </div>
          {/* Sidebar */}
          <PropertySidebar
            property={property}
            handleContactWhatsApp={handleContactWhatsApp}
            handleContactTelegram={handleContactTelegram}
            handleContactPhone={handleContactPhone}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
};
