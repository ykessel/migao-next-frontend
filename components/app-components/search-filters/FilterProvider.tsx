'use client'
import React, { createContext, useContext } from 'react';
import { useFilterStore, FilterState } from './filterStore';

interface FilterContextValue {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  getUrlParams: () => Record<string, string | undefined>;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const filters = useFilterStore((state) => state.filters);
  const setFilter = useFilterStore((state) => state.setFilter);
  const setFilters = useFilterStore((state) => state.setFilters);
  const clearFilters = useFilterStore((state) => state.clearFilters);
  const getUrlParams = useFilterStore((state) => state.getUrlParams);

  return (
    <FilterContext.Provider value={{ filters, setFilter, setFilters, clearFilters, getUrlParams }}>
      {children}
    </FilterContext.Provider>
  );
};

export function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilterContext must be used within a FilterProvider');
  return ctx;
} 