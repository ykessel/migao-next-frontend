import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, ChevronUp, ChevronDown } from "lucide-react";
import { PROPERTY_TYPE } from '@/constants/property-type.enum';

export function PropertyTypeFilterSection({ propertyType, setPropertyType, open, setOpen }: { propertyType: string, setPropertyType: (value: string) => void, open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    aria-label={"Tipo de Propiedad"}
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-teal-600"
                >
                    <div className="flex items-center gap-2">
                        <Home className="w-4 h-4"/>
                        Tipo de Propiedad
                    </div>
                    {open ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
                <Select value={propertyType || 'any'} onValueChange={setPropertyType}>
                    <SelectTrigger className="form-input" aria-label={"Tipo de Propiedad Selector"}>
                        <SelectValue placeholder="Selecciona tipo"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Cualquier tipo</SelectItem>
                        {Object.entries(PROPERTY_TYPE).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CollapsibleContent>
        </Collapsible>
    );
} 