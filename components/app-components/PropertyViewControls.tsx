import { Button } from "../ui/button";
import { Grid3X3, List, Map } from "lucide-react";
import React from "react";

type ViewMode = "card" | "list" | "map";

interface PropertyViewControlsProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const PropertyViewControls: React.FC<PropertyViewControlsProps> = ({ viewMode, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline text-sm font-medium text-gray-700 mr-2">
        Vista:
      </span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <Button
          variant={viewMode === "card" ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange("card")}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Vista de tarjetas"
        >
          <Grid3X3 className="w-4 h-4" />
          <span className="hidden sm:inline">Tarjetas</span>
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange("list")}
          className="hidden sm:flex items-center gap-2 cursor-pointer"
          aria-label="Vista de lista"
        >
          <List className="w-4 h-4" />
          <span className="hidden sm:inline">Lista</span>
        </Button>
        <Button
          variant={viewMode === "map" ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange("map")}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Vista de mapa"
        >
          <Map className="w-4 h-4" />
          <span className="hidden sm:inline">Mapa</span>
        </Button>
      </div>
    </div>
  );
};

export default PropertyViewControls; 