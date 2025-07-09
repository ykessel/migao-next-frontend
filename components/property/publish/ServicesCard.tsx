import {FC} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import type {IPropertyServices} from '@/types/property-services';
import {GAS_AVAILABILITY} from '@/constants/gas-availability.enum.ts';
import {
    Zap,
    Droplet,
    Flame,
    Wifi,
    Tv,
    Phone,
    Brush,
    BedDouble,
    Car,
    Shield,
    KeyRound,
    ConciergeBell,
    Users,
    Gift,
    MapPin,
    ShoppingBag,
    ChefHat,
    PawPrint,
    Baby,
    Dumbbell,
    Activity,
    WavesLadder,
    Leaf,
    Hammer,
    ParkingCircle,
    Utensils,
} from 'lucide-react';

interface ServicesCardProps {
    formData: {
        services: IPropertyServices;
    };
    handleServiceChange: (field: keyof IPropertyServices | 'gasAvailability', value: unknown) => void;
}

const serviceCategories = [
    {
        label: 'Utilidades',
        color: 'bg-blue-50',
        services: [
            {field: 'electricity', label: 'Electricidad', icon: <Zap className="text-yellow-500 w-4 h-4"/>},
            {field: 'water', label: 'Agua', icon: <Droplet className="text-blue-400 w-4 h-4"/>},
            {field: 'gas', label: 'Gas de cocina', icon: <Flame className="text-orange-500 w-4 h-4"/>},
            {field: 'gasAvailability', label: 'Tipo de Gas', icon: <Flame className="text-orange-500 w-4 h-4"/>},
            {field: 'internetType', label: 'Internet', icon: <Wifi className="text-teal-500 w-4 h-4"/>},
            {field: 'cleaningService', label: 'Limpieza', icon: <Brush className="text-green-500 w-4 h-4"/>},
        ],
    },
    {
        label: 'Entretenimiento y Conectividad',
        color: 'bg-purple-50',
        services: [
            {field: 'cableTV', label: 'TV por cable', icon: <Tv className="text-purple-500 w-4 h-4"/>},
            {field: 'streamingServices', label: 'Streaming', icon: <Tv className="text-pink-500 w-4 h-4"/>},
            {field: 'landlinePhone', label: 'Teléfono fijo', icon: <Phone className="text-gray-500 w-4 h-4"/>},
            {field: 'linenService', label: 'Ropa de cama', icon: <BedDouble className="text-blue-400 w-4 h-4"/>},
            {field: 'laundryService', label: 'Lavandería', icon: <Brush className="text-indigo-400 w-4 h-4"/>},
        ],
    },
    {
        label: 'Mantenimiento y Seguridad',
        color: 'bg-green-50',
        services: [
            {field: 'maintenanceService', label: 'Mantenimiento', icon: <Hammer className="text-green-700 w-4 h-4"/>},
            {field: 'gardenMaintenance', label: 'Jardín', icon: <Leaf className="text-green-500 w-4 h-4"/>},
            {field: 'poolMaintenance', label: 'Piscina', icon: <WavesLadder className="text-blue-400 w-4 h-4"/>},
            {field: 'securityService', label: 'Seguridad', icon: <Shield className="text-gray-700 w-4 h-4"/>},
            {
                field: 'alarmMonitoring',
                label: 'Monitoreo de alarma',
                icon: <KeyRound className="text-red-500 w-4 h-4"/>
            },
            {
                field: 'parkingIncluded',
                label: 'Parqueo incluido',
                icon: <ParkingCircle className="text-blue-500 w-4 h-4"/>
            },
            {field: 'garageAccess', label: 'Garaje', icon: <Car className="text-gray-500 w-4 h-4"/>},
        ],
    },
    {
        label: 'Hospitalidad y Servicios',
        color: 'bg-yellow-50',
        services: [
            {field: 'airportTransfer', label: 'Transfer aeropuerto', icon: <MapPin className="text-blue-400 w-4 h-4"/>},
            {field: 'conciergeService', label: 'Conserje', icon: <ConciergeBell className="text-yellow-600 w-4 h-4"/>},
            {field: 'guestSupport24h', label: 'Soporte 24h', icon: <Users className="text-teal-600 w-4 h-4"/>},
            {field: 'welcomePackage', label: 'Paquete de bienvenida', icon: <Gift className="text-pink-400 w-4 h-4"/>},
            {field: 'tourGuideService', label: 'Guía turístico', icon: <MapPin className="text-green-400 w-4 h-4"/>},
            {field: 'breakfastService', label: 'Desayuno', icon: <Utensils className="text-orange-400 w-4 h-4"/>},
            {field: 'groceryService', label: 'Supermercado', icon: <ShoppingBag className="text-purple-500 w-4 h-4"/>},
            {field: 'chefService', label: 'Chef', icon: <ChefHat className="text-red-400 w-4 h-4"/>},
            {
                field: 'petCareService',
                label: 'Cuidado de mascotas',
                icon: <PawPrint className="text-green-700 w-4 h-4"/>
            },
            {field: 'babysittingService', label: 'Niñera', icon: <Baby className="text-pink-400 w-4 h-4"/>},
            {
                field: 'fitnessTrainer',
                label: 'Entrenador personal',
                icon: <Dumbbell className="text-blue-700 w-4 h-4"/>
            },
            {field: 'spaServices', label: 'Spa', icon: <Activity className="text-purple-400 w-4 h-4"/>},
        ],
    },
];

export const ServicesCard: FC<ServicesCardProps> = ({formData, handleServiceChange}) => (
    <Card>
        <CardHeader>
            <CardTitle>Servicios de la Propiedad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            {serviceCategories.map((cat) => (
                <div key={cat.label} className={`rounded-lg p-4 mb-2 ${cat.color}`}>
                    <h4 className="font-semibold mb-3 text-base">{cat.label}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {cat.services.map((service) => {
                            if (service.field === 'gasAvailability') {
                                return (
                                    <div key={service.field} className="flex items-center gap-2">
                                        {service.icon}
                                        <Label className="text-sm">{service.label}</Label>
                                        <Select value={formData.services.gasAvailability || ''}
                                                onValueChange={v => handleServiceChange('gasAvailability', v)}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Tipo de gas"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(GAS_AVAILABILITY).map(([key, value]) => (
                                                    <SelectItem value={key} key={key}>{value}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            }
                            if (service.field === 'internetType') {
                                return (
                                    <div key={service.field} className="flex items-center gap-2">
                                        {service.icon}
                                        <Label className="text-sm">{service.label}</Label>
                                        <Select value={formData.services.internetType}
                                                onValueChange={v => handleServiceChange('internetType', v)}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Tipo de internet"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="FIBER">Fibra</SelectItem>
                                                <SelectItem value="DSL">DSL</SelectItem>
                                                <SelectItem value="SATELLITE">Satélite</SelectItem>
                                                <SelectItem value="NONE">Ninguno</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            }
                            if (service.field === 'electricity' || service.field === 'water' || service.field === 'gas' || service.field === 'cleaningService') {
                                return (
                                    <div key={service.field} className="flex items-center gap-2">
                                        {service.icon}
                                        <Label className="text-sm">{service.label}</Label>
                                        <Select value={formData.services[service.field]}
                                                onValueChange={v => handleServiceChange(service.field as keyof IPropertyServices, v)}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Seleccionar"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="INCLUDED">Incluido</SelectItem>
                                                <SelectItem value="NOT_INCLUDED">No incluido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            }
                            // Boolean checkboxes
                            return (
                                <div key={service.field} className="flex items-center gap-2">
                                    {service.icon}
                                    <Checkbox
                                        checked={!!formData.services[service.field as keyof IPropertyServices]}
                                        onCheckedChange={v => handleServiceChange(service.field as keyof IPropertyServices, v)}
                                    />
                                    <Label className="text-sm">{service.label}</Label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
); 