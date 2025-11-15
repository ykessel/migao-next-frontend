import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PROPERTY_TYPE } from '@/constants/property-type.enum';

interface BasicInfoCardProps {
  formData: {
    title: string;
    description: string;
    propertyType: string;
    rooms: string;
    bathrooms: string;
    squareMeters: string;
    furnished: boolean;
  };
  handleInputChange: (field: string, value: string | boolean) => void;
  PROPERTY_TYPE: typeof PROPERTY_TYPE;
}

export const BasicInfoCard: FC<BasicInfoCardProps> = ({ formData, handleInputChange, PROPERTY_TYPE }) => (
  <Card>
    <CardHeader>
      <CardTitle>1. Información Básica</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="title">Título de la propiedad *</Label>
        <Input
          id="title"
          placeholder="Ej: Apartamento moderno en el centro"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Descripción *</Label>
        <Textarea
          id="description"
          placeholder="Describe tu propiedad en detalle..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          required
        />
      </div>
      <div>
        <Label htmlFor="propertyType">Tipo de propiedad *</Label>
        <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PROPERTY_TYPE).map(([key, value]) => (
              <SelectItem value={key} key={key}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Property Details Fields */}
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
    </CardContent>
  </Card>
); 