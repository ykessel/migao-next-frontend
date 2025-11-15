/**
 * Filter Components Barrel Export
 * 
 * Centralized exports for all filter-related components and utilities.
 * Makes imports cleaner and more maintainable.
 * 
 * Usage:
 *   import { FilterProvider, useFilterContext, SearchFiltersClient } from '@/components/filters';
 */

// Main Components
export { FilterProvider, useFilterContext } from './FilterProvider';
export { SearchFiltersClient } from './SearchFiltersClient';
export { SearchFilters } from './SearchFilters';

// Store and Types
export { useFilterStore, defaultFilters } from './store/filterStore';
export type { FilterState } from './store/filterStore';

// Hooks
export { useFilterSync } from './hooks/useFilterSync';

// Filter Sections
export { LocationFilterSection } from './sections/LocationFilterSection';
export { PriceRangeFilterSection } from './sections/PriceRangeFilterSection';
export { PropertyTypeFilterSection } from './sections/PropertyTypeFilterSection';
export { RoomsFilterSection } from './sections/RoomsFilterSection';
export { FurnishedFilterSection } from './sections/FurnishedFilterSection';
export { QuickFiltersSection } from './sections/QuickFiltersSection';

