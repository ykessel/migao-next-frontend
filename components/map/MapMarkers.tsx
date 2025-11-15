import {useCallback} from 'react';
import {Marker, Popup} from 'react-leaflet';
import PropertyIconMarker from './property-icon-marker';
import EnhancedReducedPropertyPopup from './enhanced-reduced-property-popup';
import {useMapProperties} from './hooks/useMapProperties';

export interface IMapPropertyReduced {
    slug: string;
    coordinates: [number, number];
}

interface MapMarkersProps {
    searchParams: Record<string, any>;
}

/**
 * MapMarkers Component
 * 
 * Renders property markers on the map based on visible area.
 * Follows Single Responsibility Principle - Only handles marker rendering.
 * All logic is delegated to useMapProperties hook.
 * 
 * @param searchParams - Search parameters to filter properties
 */
export function MapMarkers({searchParams}: MapMarkersProps) {
    const {properties, isLoading} = useMapProperties(searchParams);

    const renderMarkers = useCallback(() => {
        if (isLoading || !properties) return null;

        return properties.map((property: IMapPropertyReduced) => (
            <Marker
                key={property.slug}
                position={[
                    property.coordinates[1], // lat
                    property.coordinates[0], // lng
                ]}
                icon={PropertyIconMarker()}
            >
                <Popup>
                    <EnhancedReducedPropertyPopup property={property}/>
                </Popup>
            </Marker>
        ));
    }, [isLoading, properties]);

    return <>{renderMarkers()}</>;
}

