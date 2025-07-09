import {FC} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';
import {CURRENCY} from '@/constants/currencies.enum.ts';

interface PricingCardProps {
    formData: {
        price: string;
        currency: string;
        deposit: string;
        utilities: string;
        availability: string;
    };
    handleInputChange: (field: string, value: string) => void;
    CURRENCY: typeof CURRENCY;
}

export const PricingCard: FC<PricingCardProps> = ({formData, handleInputChange, CURRENCY}) => (
    <Card>
        <CardHeader>
            <CardTitle>Precio y Condiciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="price">Precio mensual *</Label>
                    <div className="flex">
                        <Input
                            id="price"
                            type="number"
                            placeholder="0"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            className="rounded-r-none"
                            required
                        />
                        <Select value={formData.currency}
                                onValueChange={(value) => handleInputChange('currency', value)}>
                            <SelectTrigger className="w-20 rounded-l-none border-l-0">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(CURRENCY).map(([key, value]) => (
                                    <SelectItem value={key} key={key}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div>
                    <Label htmlFor="deposit">Depósito</Label>
                    <Input
                        id="deposit"
                        type="number"
                        placeholder="0"
                        value={formData.deposit}
                        onChange={(e) => handleInputChange('deposit', e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="availability">Disponibilidad</Label>
                    <Select value={formData.availability}
                            onValueChange={(value) => handleInputChange('availability', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="immediate">Inmediata</SelectItem>
                            <SelectItem value="next-month">Próximo mes</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardContent>
    </Card>
); 