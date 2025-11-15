import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {MapPin, ChevronUp, ChevronDown} from "lucide-react";

/**
 * LocationFilterSection Component Props
 */
interface LocationFilterSectionProps {
    location: string;
    setLocation: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

/**
 * LocationFilterSection Component
 * 
 * Collapsible section for filtering properties by location.
 * Allows users to search for properties by entering a city, neighborhood, or address.
 * 
 * Follows SRP - Only handles location filter UI presentation.
 * 
 * @param location - Current location filter value
 * @param setLocation - Function to update location filter
 * @param open - Whether the collapsible section is open
 * @param setOpen - Function to toggle collapsible section
 */
export function LocationFilterSection({
    location,
    setLocation,
    open,
    setOpen
}: LocationFilterSectionProps) {
    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    aria-label="Ubicación"
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-teal-600"
                >
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4"/>
                        Ubicación
                    </div>
                    {open ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
                <div className="relative">
                    <Input
                        aria-label="Buscar ubicación"
                        placeholder="Ingresa ciudad, barrio o dirección"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-12 form-input text-base"
                    />
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

