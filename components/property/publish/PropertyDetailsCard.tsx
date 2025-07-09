import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface PropertyDetailsCardProps {
  formData: {
    rooms: string;
    bathrooms: string;
    squareMeters: string;
    furnished: boolean;
  };
  handleInputChange: (field: string, value: string | boolean) => void;
}

export const PropertyDetailsCard: FC<PropertyDetailsCardProps> = ({ formData, handleInputChange }) => (
  <Card>
    <CardHeader>
      <CardTitle>Detalles de la Propiedad</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="rooms">Habitaciones</Label>
          <Input
            id="rooms"
            type="number"
            placeholder="0"
            value={formData.rooms}
            onChange={(e) => handleInputChange('rooms', e.target.value)}
            min="0"
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">Baños</Label>
          <Input
            id="bathrooms"
            type="number"
            placeholder="0"
            value={formData.bathrooms}
            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
            min="0"
          />
        </div>
        <div>
          <Label htmlFor="squareMeters">Metros cuadrados</Label>
          <Input
            id="squareMeters"
            type="number"
            placeholder="0"
            value={formData.squareMeters}
            onChange={(e) => handleInputChange('squareMeters', e.target.value)}
            min="0"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="furnished"
          checked={formData.furnished}
          onCheckedChange={(checked) => handleInputChange('furnished', checked)}
        />
        <Label htmlFor="furnished">Propiedad amueblada</Label>
      </div>
    </CardContent>
  </Card>
); 