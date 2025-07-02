import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MapView } from '@/components/MapView';
import type { Location } from '@/types/property';
import { MapPin } from 'lucide-react';

interface Municipality {
  id: string;
  name: string;
}
interface Province {
  id: string;
  name: string;
  municipalities: Municipality[];
}

interface LocationCardProps {
  selectedProvince: string;
  selectedMunicipality: string;
  handleProvinceChange: (provinceId: string) => void;
  handleMunicipalityChange: (municipalityId: string) => void;
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location) => void;
  CUBA_PROVINCES: Province[];
}

// This component ensures the Select dropdowns for province and municipality appear above the map by using z-index classes (z-20 for containers, z-50 for dropdowns).
// The address is now editable via an Input field, allowing the user to modify the address after selecting a point on the map.
export const LocationCard: FC<LocationCardProps> = ({
  selectedProvince,
  selectedMunicipality,
  handleProvinceChange,
  handleMunicipalityChange,
  selectedLocation,
  setSelectedLocation,
  CUBA_PROVINCES,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Ubicación</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex gap-4">
        <div className='flex flex-col w-full z-20 gap-1'>
          <Label htmlFor="province">Provincia *</Label>
          <Select value={selectedProvince} onValueChange={handleProvinceChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar provincia" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {CUBA_PROVINCES.map((province) => (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col w-full z-20 gap-1'>
          <Label htmlFor="municipality">Municipio *</Label>
          <Select
            value={selectedMunicipality}
            onValueChange={handleMunicipalityChange}
            disabled={!selectedProvince}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar municipio" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {CUBA_PROVINCES.find((p) => p.id === selectedProvince)?.municipalities.map((municipality) => (
                <SelectItem key={municipality.id} value={municipality.id}>
                  {municipality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-600px] rounded-lg overflow-hidden relative z-10">
        <MapView
          properties={[]}
          isLoading={false}
          onAddressSelect={(address, coordinates) => {
            const province = CUBA_PROVINCES.find((p) => p.id === selectedProvince);
            const municipality = province?.municipalities.find((m) => m.id === selectedMunicipality);
            setSelectedLocation({
              type: 'Point',
              coordinates: [coordinates.lng, coordinates.lat],
              address: address,
              city: municipality?.name || '',
              state: province?.name || '',
              country: 'Cuba',
              postalCode: '',
            });
          }}
          isSelectingLocation={true}
          showSelected={false}
          selectedLocation={selectedLocation ? {
            lat: selectedLocation.coordinates[1],
            lng: selectedLocation.coordinates[0],
          } : undefined}
        />
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4" />
        <Input
          value={selectedLocation?.address || ''}
          onChange={e => {
            if (selectedLocation) {
              setSelectedLocation({ ...selectedLocation, address: e.target.value });
            }
          }}
          placeholder="Dirección seleccionada o edítala aquí"
        />
      </div>
    </CardContent>
  </Card>
); 