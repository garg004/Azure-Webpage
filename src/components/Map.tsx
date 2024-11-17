import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { Menu, Search, MapPin, Layers, Info, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import 'leaflet/dist/leaflet.css';

const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const locations = [
  {
    position: [40.7128, -74.0060] as LatLngTuple,
    name: "Central Park",
    description: "Urban oasis in the heart of Manhattan",
    image: "https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?auto=format&fit=crop&w=300&h=200"
  },
  {
    position: [40.7527, -73.9772] as LatLngTuple,
    name: "Empire State Building",
    description: "Iconic Art Deco skyscraper",
    image: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?auto=format&fit=crop&w=300&h=200"
  },
  {
    position: [40.7484, -73.9857] as LatLngTuple,
    name: "Times Square",
    description: "The Crossroads of the World",
    image: "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&w=300&h=200"
  }
];

function MapControls() {
  const map = useMap();
  
  return (
    <div className="absolute left-4 bottom-4 z-[1000] flex flex-col gap-2 bg-white rounded-lg shadow-lg p-2">
      <button 
        onClick={() => map.zoomIn()}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
      >
        <span className="text-xl font-bold">+</span>
      </button>
      <div className="h-px bg-gray-200" />
      <button 
        onClick={() => map.zoomOut()}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
      >
        <span className="text-xl font-bold">−</span>
      </button>
    </div>
  );
}

export default function Map() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Layers className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Info className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[40.7128, -74.0060]}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapControls />

        {locations.map((location, index) => (
          <Marker 
            key={index}
            position={location.position}
            icon={icon}
            eventHandlers={{
              click: () => setSelectedLocation(location)
            }}
          />
        ))}
      </MapContainer>

      {/* Sidebar Menu */}
      <Dialog
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        className="relative z-[2000]"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-y-0 left-0 max-w-sm w-full bg-white shadow-xl">
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="text-xl font-semibold">Locations</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-4 space-y-4">
            {filteredLocations.map((location, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedLocation(location);
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex-shrink-0">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Dialog>

      {/* Location Details Modal */}
      {selectedLocation && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{selectedLocation.name}</h3>
              <p className="text-gray-600">{selectedLocation.description}</p>
              <div className="mt-4 flex items-center justify-end">
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}