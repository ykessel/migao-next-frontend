import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getPropertyById } from "@/services/api-client";
import { notFound } from "next/navigation";
import Link from "next/link";
import PropertyGallery from "@/components/property/property-gallery";
import PropertyTabsClient from "@/components/property/property-tabs-client";
import PropertySidebar from "@/components/property/property-sidebar";
import {
  formatDate,
  placeTypeIconLabel,
  typeColors,
} from "@/components/property/utils";
import type { PlaceType } from "@/constants/places.enum";
import NoImagesInfo from "@/components/property/NoImagesInfo";

// Correct App Router page props type
type PageProps = {
  params: Promise<{ slug: string }>; // params is a Promise in App Router
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// For generateMetadata, params is also a Promise
type MetadataProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = await params; // Await the params Promise
  const property = await getPropertyById(slug);

  if (!property) {
    return {
      title: "Propiedad no encontrada",
      description: "La propiedad no existe o ha sido removida.",
    };
  }

  return {
    title: property.title,
    description: property.description || "Propiedad en MiGao",
    openGraph: {
      title: property.title,
      description: property.description || "Propiedad en MiGao",
      type: "website",
      url: `https://migao.cu/property/${slug}`,
      images: [
        {
          url: property.images?.[0]?.url,
          alt: property.description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.description || "Propiedad en MiGao",
      images: [
        {
          url: property.images?.[0]?.url,
          alt: property.description,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params; 
  const property = await getPropertyById(slug);

  if (!property) {
    notFound();
  }

  const allTypes = Array.from(
    new Set(
      (property.placesOfInterest || []).map((p: { type: string }) => p.type)
    )
  ) as PlaceType[];

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

  const handleContactWhatsApp = () => {};
  const handleContactTelegram = () => {};
  const handleContactPhone = () => {};

  return (
    <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {property.images && property.images.length > 0 ? (
              <PropertyGallery
                images={property.images}
                title={property.title}
              />
            ) : (
              <NoImagesInfo />
            )}
            <PropertyTabsClient
              property={property}
              placeTypeIconLabel={placeTypeIconLabel}
              typeColors={typeColors}
              allTypes={allTypes}
              markerStyle={markerStyle}
              disableMapPopups={true}
              disablePropertyPopupInNeighborhood={true}
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
