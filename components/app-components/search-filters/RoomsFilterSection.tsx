import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { BedDouble, ChevronUp, ChevronDown } from "lucide-react";

const roomOptions = [
    {value: 0, label: "Cualquiera"},
    {value: 1, label: "1+"},
    {value: 2, label: "2+"},
    {value: 3, label: "3+"},
    {value: 4, label: "4+"},
    {value: 5, label: "5+"},
];

export function RoomsFilterSection({ rooms, setRooms, open, setOpen }: { rooms: number, setRooms: (value: number) => void, open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    aria-label={"Habitaciones"}
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
                            aria-label={"Seleccionar habitaciones"}
                            key={option.value}
                            variant={rooms === option.value ? "default" : "outline"}
                            size="sm"
                            className={
                                rooms === option.value
                                    ? "bg-teal-600 hover:bg-teal-700"
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