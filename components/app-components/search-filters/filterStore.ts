import { create } from 'zustand';

export type FilterState = {
  location: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  rooms: number;
  furnished: string;
};

const defaultFilters: FilterState = {
  location: '',
  minPrice: 0,
  maxPrice: 5000,
  propertyType: 'any',
  rooms: 0,
  furnished: 'any',
};

interface FilterStore {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  getUrlParams: () => Record<string, string | undefined>;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  filters: { ...defaultFilters },
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value },
  })),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
  clearFilters: () => set({ filters: { ...defaultFilters } }),
  getUrlParams: () => {
    const { filters } = get();
    const params: Record<string, string | undefined> = {};
    if (filters.location) params.search = filters.location;
    if (filters.propertyType !== 'any') params.propertyType = filters.propertyType;
    if (filters.minPrice > 0) params.minPrice = filters.minPrice.toString();
    if (filters.maxPrice < 5000) params.maxPrice = filters.maxPrice.toString();
    if (filters.rooms > 0) params.rooms = filters.rooms.toString();
    if (filters.furnished !== 'any') params.furnished = filters.furnished;
    return params;
  },
}));

export { defaultFilters }; 