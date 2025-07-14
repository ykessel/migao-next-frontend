import React from "react";
import { PlaceType } from '@/constants/places.enum';

type PlaceTypeFilterProps = {
  allTypes: PlaceType[];
  selectedTypes: PlaceType[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<PlaceType[]>>;
  placeTypeIconLabel: Record<string, { icon: React.ReactNode; label?: string }>;
  typeColors: Record<string, string>;
};

export default function PlaceTypeFilter({ allTypes, selectedTypes, setSelectedTypes, placeTypeIconLabel, typeColors }: PlaceTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {allTypes.map((type: PlaceType) => {
        const isSelected = selectedTypes.includes(type);
        return (
          <button
            key={type}
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-700 border'}`}
            style={
              isSelected
                ? { backgroundColor: typeColors[type], border: 'none' }
                : { backgroundColor: '#fff', borderColor: typeColors[type] || '#d1d5db', color: typeColors[type] || '#374151' }
            }
            onClick={() => setSelectedTypes(isSelected
              ? selectedTypes.filter((t: PlaceType) => t !== type)
              : [...selectedTypes, type])}
            type="button"
          >
            <span className="text-xl" style={isSelected ? { color: '#fff' } : { color: typeColors[type] || '#374151' }}>
              {placeTypeIconLabel[type]?.icon}
            </span>
            {placeTypeIconLabel[type]?.label || type}
          </button>
        );
      })}
    </div>
  );
} 