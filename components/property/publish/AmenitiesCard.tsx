import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Amenity {
  id: string;
  label: string;
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
      <CardTitle>Comodidades</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {uniqueAmenitiesList.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2">
            <Checkbox
              id={amenity.id}
              checked={formData.amenities.includes(amenity.id)}
              onCheckedChange={(checked) => handleAmenityToggle(amenity.id, checked as boolean)}
            />
            <Label htmlFor={amenity.id} className="text-sm">{amenity.label}</Label>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
); 