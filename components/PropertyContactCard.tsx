import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Phone } from 'lucide-react';
import type { Owner } from '@/types/property';
import React from 'react';

interface PropertyContactCardProps {
  owner: Owner;
  onWhatsApp?: () => void;
  onTelegram?: () => void;
  onPhone?: () => void;
}

const PropertyContactCard: React.FC<PropertyContactCardProps> = ({ owner, onWhatsApp, onTelegram, onPhone }) => {
  return (
    <div className="p-6 flex flex-col items-center">
      <Avatar className="w-20 h-20 mb-3 border-2 border-teal-500">
        <AvatarImage src={owner.photoUrl || '/placeholder-profile.png'} alt="Propietario" />
        <AvatarFallback>{owner?.phone?.[0] || 'U'}</AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-semibold mb-1">Contacto</h3>
      <div className="text-gray-700 mb-3 text-center">
        {owner?.phone && <div className="text-sm">Tel: {owner.phone}</div>}
      </div>
      <div className="flex flex-col gap-2 w-full">
        {owner.whatsapp && (
          <Button
            onClick={onWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        )}
        {owner.telegram && (
          <Button
            onClick={onTelegram}
            variant="outline"
            className="w-full border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Telegram
          </Button>
        )}
        {owner.phone && (
          <Button
            onClick={onPhone}
            variant="outline"
            className="w-full border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
          >
            <Phone className="w-4 h-4 mr-1" />
            Llamar
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyContactCard; 