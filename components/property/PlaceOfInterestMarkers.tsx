import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

export default function PlaceOfInterestMarkers({ property, selectedTypes, placeTypeIconLabel, typeColors }) {
  return (
    <div className="h-[400px] rounded-lg overflow-hidden mt-4">
      <MapContainer
        center={
          Array.isArray(property.location?.coordinates)
            ? [property.location.coordinates[1], property.location.coordinates[0]]
            : [0, 0]
        }
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Property Marker */}
        <Marker position={
          Array.isArray(property.location?.coordinates)
            ? [property.location.coordinates[1], property.location.coordinates[0]]
            : [0, 0]
        }>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location.address}</p>
            </div>
          </Popup>
        </Marker>
        {/* Places of Interest Markers */}
        {(property.placesOfInterest || [])
          .filter((place) => selectedTypes.length === 0 || selectedTypes.includes(place.type))
          .map((place) => (
            <Marker
              key={place.id}
              icon={L.divIcon({
                html: `<div class='leaflet-custom-marker' style='border-color: ${typeColors[place.type] || '#00b894'};'>${renderToString(placeTypeIconLabel[place.type]?.icon)}</div>`,
                className: '',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
              })}
              position={
                Array.isArray(place.coordinates.coordinates)
                  ? [place.coordinates.coordinates[1], place.coordinates.coordinates[0]]
                  : [0, 0]
              }
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">{place.name}</h4>
                  <p className="text-xs text-gray-600">{place.address}</p>
                  {place.phone && <p className="text-xs">Tel: {place.phone}</p>}
                  {place.website && <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">Sitio web</a>}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
} 