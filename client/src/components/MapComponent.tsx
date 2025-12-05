import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
    center: { lat: number; lng: number };
    zoom?: number;
    markers?: Array<{
        id: string;
        position: { lat: number; lng: number };
        title: string;
    }>;
    className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom = 13, markers = [], className = "h-full w-full rounded-2xl" }) => {
    return (
        <MapContainer center={[center.lat, center.lng]} zoom={zoom} scrollWheelZoom={false} className={className} style={{ height: '100%', width: '100%', minHeight: '300px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[center.lat, center.lng]}>
                <Popup>Location</Popup>
            </Marker>
            {markers.map(marker => (
                <Marker key={marker.id} position={[marker.position.lat, marker.position.lng]}>
                    <Popup>{marker.title}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
