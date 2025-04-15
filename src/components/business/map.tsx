'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  ExternalLink, 
  // MapPin 
} from 'lucide-react';
import { Business } from '@/types/business';
import { useBusiness } from '@/context/business-context';


// Fix for default marker icons in Leaflet with React
// This is needed because Leaflet's default marker icons don't work with React's build process
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom marker icons
const activeMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'active-marker'
});

// Active location marker icon
const locationMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'location-marker'
});

interface MapEventsProps {
  onMapClick: (position: [number, number]) => void;
}

const MapEvents: React.FC<MapEventsProps> = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

interface MapProps {
  onSelectLocation: (position: [number, number]) => void;
}

const Map: React.FC<MapProps> = ({ onSelectLocation }) => {
  const [mounted, setMounted] = useState(false);
  const { businesses, selectedBusiness, setSelectedBusiness } = useBusiness();
  const [center] = useState<[number, number]>([40.7128, -74.0060]); // Default center on NYC
  const [zoom] = useState(13);
  const [clickedLocation, setClickedLocation] = useState<{
    position: [number, number];
    address: string;
  } | null>(null);

  const handleMapClick = async (position: [number, number]) => {
    onSelectLocation(position);
    
    // Get address using reverse geocoding from OpenStreetMap Nominatim
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'BizSpot Application (https://bizspot.com)'
          }
        }
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        setClickedLocation({
          position,
          address: data.display_name
        });
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
      setClickedLocation({
        position,
        address: "Address could not be determined"
      });
    }
  };
  
  useEffect(() => {
    let leaflet: typeof L;
    
    const initializeMap = async () => {
        // Dynamically import Leaflet
        leaflet = await import('leaflet');
        
        // Safety check
        if (!leaflet.Icon.Default) {
            console.error('Leaflet Default Icon is not available');
            return;
        }

        // Configure icon paths
        leaflet.Icon.Default.mergeOptions({
            iconRetinaUrl: `${process.env.PUBLIC_URL}/images/marker-icon-2x.png`,
            iconUrl: `${process.env.PUBLIC_URL}/images/marker-icon.png`,
            shadowUrl: `${process.env.PUBLIC_URL}/images/marker-shadow.png`
        });
    };

    initializeMap().catch(console.error);
    setMounted(true);
    // Cleanup if needed
    return () => {
        // Any Leaflet cleanup code here
    };
  }, []);

  if (!mounted) return null;
  return (
    <div className="flex-1 relative h-full w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onMapClick={handleMapClick} />
        
        {businesses.map((business: Business) => (
          <Marker 
            key={business.id}
            position={business.position}
            icon={selectedBusiness?.id === business.id ? activeMarkerIcon : markerIcon}
            eventHandlers={{
              click: () => {
                setSelectedBusiness(business);
              }
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{business.name}</h3>
                <p className="text-sm text-gray-600">{business.category}</p>
                <p className="text-sm mt-1">{business.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Clicked Location Marker */}
        {clickedLocation && (
          <Marker 
            position={clickedLocation.position}
            icon={locationMarkerIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">Selected Location</h3>
                <p className="text-sm mt-1">{clickedLocation.address}</p>
                <div className="mt-2">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${clickedLocation.position[0]},${clickedLocation.position[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-1 text-sm"
                  >
                    View on Google Maps
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
