import {PropertyListClient} from './PropertyListClient';

/**
 * PropertyList Component
 * 
 * Wrapper component for PropertyListClient.
 * Used in pages to render the property list with all features.
 * 
 * Follows SRP - Simple wrapper for the client component.
 */
export function PropertyList() {
    return <PropertyListClient />;
}

