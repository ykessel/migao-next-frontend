import React from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/app-components/navigation";
import { ArrowLeft } from "lucide-react";
import { Metadata } from 'next';
import { getPropertyById } from '@/services/api-client'; // You need to implement this
import { notFound } from 'next/navigation';
import Link from "next/link";
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyTabsClient from '@/components/property/PropertyTabsClient';
import PropertySidebar from '@/components/property/PropertySidebar';
import { formatDate, placeTypeIconLabel, typeColors } from '@/components/property/utils';
import { PlaceType } from '@/constants/places.enum';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id: propertyId } = await params
  const property = await getPropertyById(propertyId);

  if (!property) {
    return {
      title: 'Propiedad no encontrada',
      description: 'La propiedad no existe o ha sido removida.',
    };
  }

  const firstImage = property.images?.[0]?.url || '/placeholder.svg';

  return {
    title: property.title,
    description: property.description || 'Propiedad en MiGao',
    openGraph: {
      title: property.title,
      description: property.description || 'Propiedad en MiGao',
      images: [
        {
          url: firstImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      type: 'website',
      url: `https://migao.cu/property/${propertyId}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.description || 'Propiedad en MiGao',
      images: [firstImage],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id: propertyId } = await params
  const property = await getPropertyById(propertyId);

  if (!property) {
    notFound();
  }

  // allTypes as PlaceType[] if required
  const allTypes = Array.from(new Set((property.placesOfInterest || []).map((p: { type: string }) => p.type))) as PlaceType[];
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

  // Server-safe stubs for contact handlers
  const handleContactWhatsApp = () => {};
  const handleContactTelegram = () => {};
  const handleContactPhone = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="mb-6 inline-block">
          <Button
            variant="ghost"
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a resultados
          </Button>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Gallery and Tabs */}
          <div className="lg:col-span-2">
            <PropertyGallery images={property.images || []} title={property.title} />
            <PropertyTabsClient
              property={property}
              placeTypeIconLabel={placeTypeIconLabel}
              typeColors={typeColors}
              allTypes={allTypes}
              markerStyle={markerStyle}
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
}
