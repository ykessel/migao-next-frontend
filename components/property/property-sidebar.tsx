import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Bath, Square, MessageCircle, Phone, AlertTriangle } from "lucide-react";
import PropertyContactCard from "@/components/property/property-contact-card"
import { PropertyReportDialog } from "@/components/property/property-report-dialog"
import { Property } from "@/types/property";
import { RatingCard } from "../app-components/rating-client";

interface PropertySidebarProps {
  property: Property;
  handleContactWhatsApp: () => void;
  handleContactTelegram: () => void;
  handleContactPhone: () => void;
  formatDate: (date: string) => string;
}

export default function PropertySidebar({
  property,
  handleContactWhatsApp,
  handleContactTelegram,
  handleContactPhone,
  formatDate,
}: PropertySidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{(property.location as { address?: string })?.address || 'Ubicación no disponible'}</span>
              </div>
            </div>
            <Badge
              variant={property.isAvailable ? 'default' : 'secondary'}
              className={property.isAvailable ? 'bg-teal-600 hover:bg-teal-700' : ''}
            >
              {property.isAvailable ? 'Disponible' : 'No disponible'}
            </Badge>
          </div>
          <div className="text-3xl font-bold text-teal-600 mb-4">
            {property.rentPricePerMonth} {property.currency} <span className="text-lg text-gray-500">/mes</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <BedDouble className="w-6 h-6 mx-auto text-teal-600 mb-1" />
              <div className="text-sm font-medium">{property.rooms}</div>
              <div className="text-xs text-gray-600">Habitaciones</div>
            </div>
            <div className="text-center">
              <Bath className="w-6 h-6 mx-auto text-teal-600 mb-1" />
              <div className="text-sm font-medium">{property.bathrooms}</div>
              <div className="text-xs text-gray-600">Baños</div>
            </div>
            <div className="text-center">
              <Square className="w-6 h-6 mx-auto text-teal-600 mb-1" />
              <div className="text-sm font-medium">{property.area}m²</div>
              <div className="text-xs text-gray-600">Superficie</div>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            {property?.owner?.whatsapp && (
              <Button
                onClick={handleContactWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar por WhatsApp
              </Button>
            )}
            <div className="grid grid-cols-2 gap-2">
              {property?.owner?.telegram && (
                <Button
                  onClick={handleContactTelegram}
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Telegram
                </Button>
              )}
              {property?.owner?.phone && (
                <Button
                  onClick={handleContactPhone}
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Llamar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <PropertyContactCard
          owner={property.owner}
          onWhatsApp={handleContactWhatsApp}
          onTelegram={handleContactTelegram}
          onPhone={handleContactPhone}
        />
      </Card>
      
      {/* Report Property Card */}
      <Card className="border-red-200 bg-white">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">¿Ves algo incorrecto?</h3>
              <p className="text-sm text-gray-600">
                Ayúdanos a mantener la calidad de nuestros listados reportando problemas con esta propiedad.
              </p>
            </div>
          </div>

          <PropertyReportDialog property={property} />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Información adicional</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Disponible desde:</span>
              <span>{formatDate(property.isAvailableForRentalFrom)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Depósito:</span>
              <span>{property.securityDeposit} {property.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amueblado:</span>
              <span>{property.amenities.furnished ? 'Sí' : 'No'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

       {/* Rating Card */}
       <RatingCard property={property}/>
    </div>
  );
} 