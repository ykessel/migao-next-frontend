'use client';

import {useState, useEffect, useRef, useCallback} from 'react';
import {useMap} from 'react-leaflet';
import {useSearchMapProperties} from '@/hooks/use-properties';
import {useDebounce} from '@/hooks/use-debounce';

/**
 * Reduced property data for map markers
 * Contains only essential information for displaying property markers on the map
 */
export interface IMapPropertyReduced {
    slug: string;
    coordinates: [number, number];
}

/**
 * Check if two bounding box corners are equal
 */
function areCornersEqual(a?: number[][], b?: number[][]): boolean {
    if (!a || !b) return false;
    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * useMapProperties Hook
 * 
 * Custom hook that encapsulates map properties fetching logic.
 * Handles bounding box calculation, debouncing, and popup state management.
 * 
 * Follows Single Responsibility Principle - Only handles map data logic.
 * 
 * @param searchParams - Search parameters to pass to property search
 * @returns Object containing properties data, loading state, and bbox
 */
export function useMapProperties(searchParams: Record<string, any>) {
    const map = useMap();
    const [bbox, setBbox] = useState<number[][] | null>(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const popupClosedAt = useRef<number | null>(null);
    
    const debouncedBbox = useDebounce(bbox, 1000);
    
    const {data: properties, isLoading} = useSearchMapProperties({
        ...searchParams,
        bbox: debouncedBbox,
    });

    // Handle popup state
    useEffect(() => {
        const handlePopupOpen = () => {
            setPopupOpen(true);
            popupClosedAt.current = null;
        };

        const handlePopupClose = () => {
            setPopupOpen(false);
            popupClosedAt.current = Date.now();
        };

        map.on("popupopen", handlePopupOpen);
        map.on("popupclose", handlePopupClose);

        return () => {
            map.off("popupopen", handlePopupOpen);
            map.off("popupclose", handlePopupClose);
        };
    }, [map]);

    // Update bbox when map moves
    useEffect(() => {
        const updateBbox = () => {
            // Skip if popup is open
            if (popupOpen) return;

            // Optionally delay if popup just closed
            if (
                popupClosedAt.current &&
                Date.now() - popupClosedAt.current < 1000
            ) {
                return;
            }

            const bounds = map.getBounds();
            const corners = [
                bounds.getNorthWest(),
                bounds.getNorthEast(),
                bounds.getSouthEast(),
                bounds.getSouthWest(),
            ].map(({lat, lng}) => [lng, lat]); // GeoJSON standard: [lng, lat] format

            if (!areCornersEqual(corners, bbox)) {
                console.log('New bbox coordinates (GeoJSON format [lng, lat]):', corners);
                setBbox(corners);
            }
        };

        map.on("moveend", updateBbox);
        updateBbox(); // Initial call

        return () => {
            map.off("moveend", updateBbox);
        };
    }, [map, popupOpen, bbox]);

    return {
        properties: properties || [],
        isLoading,
        bbox,
    };
}

