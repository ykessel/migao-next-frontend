import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Euro, ChevronUp, ChevronDown } from "lucide-react";

export function PriceRangeFilterSection({ minPrice, maxPrice, setMinPrice, setMaxPrice, onMinPriceBlur, onMaxPriceBlur, open, setOpen }: {
    minPrice: number | '';
    maxPrice: number | '';
    setMinPrice: (value: number | '') => void;
    setMaxPrice: (value: number | '') => void;
    onMinPriceBlur: () => void;
    onMaxPriceBlur: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    aria-label={"Rango de Precio"}
                    className="w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-teal-600"
                >
                    <div className="flex items-center gap-2">
                        <Euro className="w-4 h-4"/>
                        Rango de Precio
                    </div>
                    {open ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label className="text-xs text-gray-600">Mínimo</Label>
                        <Input
                            aria-label={"Precio Mínimo"}
                            type="number"
                            placeholder="0"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                            onBlur={onMinPriceBlur}
                            className="form-input text-sm"
                        />
                    </div>
                    <div>
                        <Label className="text-xs text-gray-600">Máximo</Label>
                        <Input
                            aria-label={"Precio Máximo"}
                            type="number"
                            placeholder="5000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                            onBlur={onMaxPriceBlur}
                            className="form-input text-sm"
                        />
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
} 