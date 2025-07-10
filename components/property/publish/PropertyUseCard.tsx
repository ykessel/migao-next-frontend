import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { PROPERTY_USE } from '@/constants/property-use.enum';

interface PropertyUseCardProps {
  formData: {
    propertyUse: string;
  };
  handleInputChange: (field: string, value: string) => void;
  PROPERTY_USE: typeof PROPERTY_USE;
}

export const PropertyUseCard: FC<PropertyUseCardProps> = ({ formData, handleInputChange, PROPERTY_USE }) => (
  <Card>
    <CardHeader>
      <CardTitle>Uso de la propiedad</CardTitle>
    </CardHeader>
    <CardContent>
      <div>
        <Label htmlFor="propertyUse">Uso de la propiedad *</Label>
        <Select
          value={formData.propertyUse}
          onValueChange={(value) => handleInputChange('propertyUse', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar opción" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PROPERTY_USE).map(([key, value]) => (
              <SelectItem value={key} key={key}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
); 