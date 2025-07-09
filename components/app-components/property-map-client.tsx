"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';

export default function PropertyMap({ property }: { property: Property }) {
  return (
    <MapContainer
      center={[property.location.coordinates[1], property.location.coordinates[0]]}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[property.location.coordinates[1], property.location.coordinates[0]]}>
        <Popup>
          <div className="p-2">
            <h3 className="font-semibold">{property.title}</h3>
            <p className="text-sm text-gray-600">{property.location.address}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
} 