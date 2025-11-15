import dynamic from 'next/dynamic';

const MapView = dynamic(
    () => import("../../map/MapView").then((mod) => mod.MapView),
    {ssr: true}
);

interface PropertyMapViewProps {
    searchParams: Record<string, unknown>;
}

/**
 * PropertyMapView Component
 * 
 * Renders properties in a map layout.
 * Follows Single Responsibility Principle - Only handles map presentation.
 * Uses dynamic import to reduce initial bundle size.
 * 
 * @param searchParams - Search parameters to pass to map
 */
export function PropertyMapView({searchParams}: PropertyMapViewProps) {
    return (
        <div className="relative">
            <MapView
                searchParams={searchParams}
                onAddressSelect={() => {}}
            />
        </div>
    );
}

