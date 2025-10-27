import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const colors = ["red", "blue", "green", "orange", "purple", "brown", "pink", "cyan", "yellow", "lime", "indigo", "teal", "maroon", "navy", "olive", "coral"];


export default function RestaurantMap({ restaurants, onCenterChange }) {
  // Use a single color for all markers since we only have one list
  const colorMap = { 'places.json': 'red' };

  const getIcon = (color) =>
    L.divIcon({
      className: 'custom-marker',
      html: `<div style="background:${color}; width:16px; height:16px; border-radius:50%; border:2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <MapContainer
        center={[43.65, -79.38]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {restaurants.map((place, i) => (
          <Marker
            key={i}
            position={[place.lat, place.lng]}
            icon={getIcon('red')}
          >
            <Popup>
              <strong>{place.Title}</strong><br />
              {place.address || ''}<br />
              Rating: {place.rating || 'N/A'} ({place.user_ratings_total || 0})<br />
              {place.price_start && (
                <span>
                  Price: ${place.price_start}{place.price_end && place.price_end !== place.price_start ? '-' + place.price_end : ''} CAD<br />
                </span>
              )}
              {place.URL && <a href={place.URL} target="_blank" rel="noreferrer">Google Maps</a>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

