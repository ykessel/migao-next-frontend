/**
 * Map Components Barrel Export
 * 
 * Centralized exports for all map-related components.
 * Makes imports cleaner and more maintainable.
 * 
 * Usage:
 *   import { MapView, PropertyMapClient, MapMarkers } from '@/components/map';
 */

// Main Components
export { MapView } from './MapView';
export { PropertyMapClient } from './PropertyMapClient';
export { MapMarkers } from './MapMarkers';
export type { IMapPropertyReduced } from './MapMarkers';

// Popups
export { default as EnhancedPropertyPopup } from './enhanced-property-popup';
export { default as EnhancedReducedPropertyPopup } from './enhanced-reduced-property-popup';

// Markers
export { default as PropertyIconMarker } from './property-icon-marker';
export { default as PropertyIconMarkerNeighborhood } from './property-icon-marker-neighborhood';

// Skeletons
export { default as PropertyPopupSkeleton } from './property-popup-skeleton';

// Hooks
export { useMapProperties } from './hooks/useMapProperties';
export type { IMapPropertyReduced } from './hooks/useMapProperties';

