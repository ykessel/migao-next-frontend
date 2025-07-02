import React from "react";
import { PlaceType } from '@/constants/places.enum';

type PlaceTypeFilterProps = {
  allTypes: PlaceType[];
  selectedTypes: PlaceType[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<PlaceType[]>>;
  placeTypeIconLabel: Record<PlaceType, { icon: React.ReactNode; label: string }>;
};

export default function PlaceTypeFilter({ allTypes, selectedTypes, setSelectedTypes, placeTypeIconLabel }: PlaceTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {allTypes.map((type: PlaceType) => (
        <button
          key={type}
          className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors text-sm font-medium
            ${selectedTypes.includes(type) ? 'bg-teal-600 text-white border-teal-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setSelectedTypes(selectedTypes.includes(type)
            ? selectedTypes.filter((t: PlaceType) => t !== type)
            : [...selectedTypes, type])}
          type="button"
        >
          {placeTypeIconLabel[type]?.icon}
          {placeTypeIconLabel[type]?.label || type}
        </button>
      ))}
    </div>
  );
} 