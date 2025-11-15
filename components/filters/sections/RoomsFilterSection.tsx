import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {BedDouble, ChevronUp, ChevronDown} from "lucide-react";

/**
 * Room filter options
 */
const roomOptions = [
    {value: 0, label: "Cualquiera"},
    {value: 1, label: "1+"},
    {value: 2, label: "2+"},
    {value: 3, label: "3+"},
    {value: 4, label: "4+"},
    {value: 5, label: "5+"},
];

/**
 * RoomsFilterSection Component Props
 */
interface RoomsFilterSectionProps {
    rooms: number;
    setRooms: (value: number) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

/**
 * RoomsFilterSection Component
 * 
 * Collapsible section for filtering properties by number of rooms.
 * Displays a grid of buttons for quick room selection (0-5+).
 * 
 * Follows SRP - Only handles rooms filter UI presentation.
 * 
 * @param rooms - Current rooms filter value
 * @param setRooms - Function to update rooms filter
 * @param open - Whether the collapsible section is open
 * @param setOpen - Function to toggle collapsible section
 */
export function RoomsFilterSection({
    rooms,
    setRooms,
    open,
    setOpen
}: RoomsFilterSectionProps) {
    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    aria-label="Habitaciones"
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-teal-600"
                >
                    <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4"/>
                        Habitaciones
                    </div>
                    {open ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
                <div className="grid grid-cols-3 gap-2">
                    {roomOptions.map((option) => (
                        <Button
                            aria-label="Seleccionar habitaciones"
                            key={option.value}
                            variant={rooms === option.value ? "default" : "outline"}
                            size="sm"
                            className={
                                rooms === option.value
                                    ? "bg-teal-200 hover:bg-teal-300 text-teal-800 border-teal-300"
                                    : "hover:bg-teal-50 hover:border-teal-200"
                            }
                            onClick={() => setRooms(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

