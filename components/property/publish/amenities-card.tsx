import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Car,
  Home,
  Utensils,
  Sofa,
  Tv,
  ParkingCircle,
  WavesLadder,
  Wifi,
  Wind,
  Refrigerator,
  Microwave,
  Dumbbell,
  Waves,
  Flame,
  ChefHat,
} from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface AmenitiesCardProps {
  formData: {
    amenities: string[];
  };
  handleAmenityToggle: (amenity: string, checked: boolean) => void;
  uniqueAmenitiesList: Amenity[];
}

export const AmenitiesCard: FC<AmenitiesCardProps> = ({ formData, handleAmenityToggle, uniqueAmenitiesList }) => (
  <Card>
    <CardHeader>
      <CardTitle>4. Comodidades</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {uniqueAmenitiesList.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0">
              {amenity.icon}
            </div>
            <Checkbox
              id={amenity.id}
              checked={formData.amenities.includes(amenity.id)}
              onCheckedChange={(checked) => handleAmenityToggle(amenity.id, checked as boolean)}
            />
            <Label htmlFor={amenity.id} className="text-sm cursor-pointer flex-1">{amenity.label}</Label>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
); 