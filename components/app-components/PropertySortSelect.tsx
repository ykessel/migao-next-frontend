import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SortAsc, SortDesc, Calendar } from "lucide-react";
import React from "react";

type SortOption =
  | "price-asc"
  | "price-desc"
  | "created-asc"
  | "created-desc"
  | "updated-asc"
  | "updated-desc";

interface PropertySortSelectProps {
  value?: string;
  onChange: (value: SortOption) => void;
}

const PropertySortSelect: React.FC<PropertySortSelectProps> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      aria-label="Ordenar propiedades"
    >
      <SelectTrigger className="w-full" aria-label="Selector de orden">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="price-asc"
          aria-label="Ordenar por precio menor a mayor"
        >
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4" />
            <span>Menor precio</span>
          </div>
        </SelectItem>
        <SelectItem
          value="price-desc"
          aria-label="Ordenar por precio mayor a menor"
        >
          <div className="flex items-center gap-2">
            <SortDesc className="w-4 h-4" />
            <span>Mayor precio</span>
          </div>
        </SelectItem>
        <SelectItem
          value="created-desc"
          aria-label="Ordenar por fecha de creación más reciente"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Nuevas</span>
          </div>
        </SelectItem>
        <SelectItem
          value="created-asc"
          aria-label="Ordenar por fecha de creación más antigua"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Antiguas</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PropertySortSelect; 