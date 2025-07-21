import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sofa } from "lucide-react";

const furnishedOptions = [
    {value: "any", label: "Cualquiera"},
    {value: "furnished", label: "Amueblado"},
    {value: "unfurnished", label: "Sin Amueblar"},
    {value: "semi-furnished", label: "Semi-amueblado"},
];

export function FurnishedFilterSection({ furnished, setFurnished }: { furnished: string, setFurnished: (value: string) => void }) {
    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Sofa className="w-4 h-4"/>
                Amueblado
            </Label>
            <Select value={furnished || "any"} onValueChange={setFurnished}>
                <SelectTrigger className="form-input" aria-label={"Amueblado Selector"}>
                    <SelectValue placeholder="Selecciona opción"/>
                </SelectTrigger>
                <SelectContent>
                    {furnishedOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
} 