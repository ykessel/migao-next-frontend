/**
 * Property Components Barrel Export
 * 
 * Centralized exports for all property-related components.
 * Makes imports cleaner and more maintainable.
 * 
 * Usage:
 *   import { PropertyCard, PropertyListClient, usePropertyList } from '@/components/property';
 */

// Main Components
export { PropertyListClient } from './PropertyListClient';
export { PropertyCard } from './PropertyCard';
export { default as PropertyCardItemList } from './PropertyCardItemList';
export { PropertyList } from './PropertyList';

// Header and Empty State
export { PropertyListHeader } from './PropertyListHeader';
export { PropertyListEmptyState } from './PropertyListEmptyState';

// View Components
export { PropertyCardView } from './views/PropertyCardView';
export { PropertyListView } from './views/PropertyListView';
export { PropertyMapView } from './views/PropertyMapView';

// Hooks
export { usePropertyList } from './hooks/usePropertyList';
export type { ViewMode, SortOption } from './hooks/usePropertyList';

// Skeletons
export { PropertyCardSkeleton } from './PropertyCardSkeleton';

