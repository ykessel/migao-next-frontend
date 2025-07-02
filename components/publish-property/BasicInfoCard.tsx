import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { PROPERTY_TYPE } from '@/constants/property-type.enum.ts';

interface BasicInfoCardProps {
  formData: {
    title: string;
    description: string;
    propertyType: string;
  };
  handleInputChange: (field: string, value: string) => void;
  PROPERTY_TYPE: typeof PROPERTY_TYPE;
}

export const BasicInfoCard: FC<BasicInfoCardProps> = ({ formData, handleInputChange, PROPERTY_TYPE }) => (
  <Card>
    <CardHeader>
      <CardTitle>Información Básica</CardTitle>
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
    </CardContent>
  </Card>
); 