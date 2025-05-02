import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../../components/Navbar/Navbar";
import { CanaaniteIcons } from "../../components/icons/CanaaniteIcons";
import { CanaanitePattern } from "../../components/ui/CanaanitePatterns";
import { Slider } from "../../components/ui/slider";
import { Search, Filter, X, Info, Map as MapIcon, Layers, Clock } from "lucide-react";

// Fix for Leaflet marker icons
// This is needed because Leaflet's default marker icons have issues with webpack
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Define marker types with custom icons
const markerTypes = {
  historical: {
    name: "Historical Sites",
    icon: L.divIcon({
      html: `<div class="bg-amber-600 p-2 rounded-full border-2 border-white flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>`,
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    }),
  },
  cultural: {
    name: "Cultural Sites",
    icon: L.divIcon({
      html: `<div class="bg-emerald-600 p-2 rounded-full border-2 border-white flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" />
              </svg>
            </div>`,
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    }),
  },
  memorial: {
    name: "Memorial Sites",
    icon: L.divIcon({
      html: `<div class="bg-purple-600 p-2 rounded-full border-2 border-white flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2M14 5l2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2" />
              </svg>
            </div>`,
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    }),
  },
};

// Sample points of interest data
// In a real application, this would come from an API or database
const pointsOfInterest = [
  {
    id: 1,
    name: "Jaffa Port",
    type: "historical",
    year: 1800,
    endYear: 2023,
    coordinates: [32.0523, 34.7516],
    description: "One of the oldest ports in the world, with a history spanning over 4,000 years.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tel_Aviv_Port_Entrance.jpg/1200px-Tel_Aviv_Port_Entrance.jpg",
    details: "Jaffa Port has been an active harbor for over 4,000 years, serving as a crucial gateway to the land. It was a major port for pilgrims traveling to Jerusalem and a center for trade throughout the Mediterranean.",
  },
  {
    id: 2,
    name: "Al-Manshiyya District",
    type: "historical",
    year: 1800,
    endYear: 1948,
    coordinates: [32.0723, 34.7616],
    description: "A historic Palestinian neighborhood in Jaffa that was largely destroyed in 1948.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/PikiWiki_Israel_63988_jaffa.jpg/1200px-PikiWiki_Israel_63988_jaffa.jpg",
    details: "Al-Manshiyya was a vibrant Palestinian neighborhood established in the late 19th century. It was home to approximately 12,000 Palestinians before being largely destroyed during the 1948 war.",
  },
  {
    id: 3,
    name: "Hassan Bek Mosque",
    type: "cultural",
    year: 1916,
    endYear: 2023,
    coordinates: [32.0673, 34.7566],
    description: "A mosque built in 1916 by Jaffa's Ottoman governor, one of the few Palestinian structures that survived 1948.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Hassan_Bek_Mosque_from_Charles_Clore_Park.jpg/1200px-Hassan_Bek_Mosque_from_Charles_Clore_Park.jpg",
    details: "The Hassan Bek Mosque was built in 1916 by Jaffa's Ottoman governor Hassan Bek. It is one of the few Palestinian structures that survived the destruction of Manshiyya neighborhood in 1948 and stands as a symbol of Palestinian heritage.",
  },
  {
    id: 4,
    name: "Deir Yassin",
    type: "memorial",
    year: 1948,
    endYear: 1948,
    coordinates: [31.7872, 35.1814],
    description: "Site of the 1948 massacre that became symbolic of the Palestinian Nakba.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Deir_Yassin_house.jpg/1200px-Deir_Yassin_house.jpg",
    details: "Deir Yassin was a Palestinian village near Jerusalem that was the site of a massacre by Zionist paramilitary groups on April 9, 1948. The massacre and expulsion of its residents became symbolic of the broader Palestinian Nakba (catastrophe).",
  },
  {
    id: 5,
    name: "Church of the Nativity",
    type: "cultural",
    year: 326,
    endYear: 2023,
    coordinates: [31.7042, 35.2039],
    description: "One of the oldest continuously operating churches in the world, built over the cave that tradition marks as the birthplace of Jesus.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Church_of_the_Nativity_Bethlehem_West_Bank.jpg/1200px-Church_of_the_Nativity_Bethlehem_West_Bank.jpg",
    details: "The Church of the Nativity is a basilica located in Bethlehem, built over the cave that tradition marks as the birthplace of Jesus. The original church was completed in 339 CE and it is considered one of the oldest continuously operating churches in the world.",
  },
  {
    id: 6,
    name: "Al-Aqsa Mosque",
    type: "cultural",
    year: 705,
    endYear: 2023,
    coordinates: [31.7767, 35.2356],
    description: "The third holiest site in Islam, located on the Temple Mount in the Old City of Jerusalem.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_%28NE_exposure%29.jpg/1200px-Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_%28NE_exposure%29.jpg",
    details: "Al-Aqsa Mosque is the third holiest site in Islam, located on the Temple Mount in the Old City of Jerusalem. The mosque was built in the early 8th century and has been rebuilt several times due to earthquakes.",
  },
  {
    id: 7,
    name: "Lydda Death March Route",
    type: "memorial",
    year: 1948,
    endYear: 1948,
    coordinates: [31.9500, 34.9500],
    description: "Route of the forced expulsion of Palestinian residents from Lydda (Lod) during the 1948 war.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flickr_-_Government_Press_Office_%28GPO%29_-_Lydda_Airport.jpg/1200px-Flickr_-_Government_Press_Office_%28GPO%29_-_Lydda_Airport.jpg",
    details: "In July 1948, the residents of Lydda (Lod) and Ramle were forcibly expelled by Israeli forces. Thousands of Palestinians were forced to march to the West Bank in what became known as the 'Lydda Death March', with many dying from exhaustion and dehydration along the way.",
  },
];

// Base map layers
const baseMaps = [
  {
    name: "Modern (Current)",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    period: "current",
  },
  {
    name: "Historical (1948)",
    // This would ideally be a custom historical tileset
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
    period: "1948",
  },
  {
    name: "Historical (1967)",
    // This would ideally be a custom historical tileset
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.jpg",
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    period: "1967",
  },
];

// Timeline component that controls the visible markers based on year
const TimelineControl = ({ 
  year, 
  setYear, 
  minYear = 1900, 
  maxYear = 2023,
  onYearChange
}) => {
  const handleChange = (value) => {
    setYear(value);
    if (onYearChange) onYearChange(value);
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[1000] bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-lg w-[90%] max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-white/70" />
          <span className="text-white font-medium">Time Period: {year}</span>
        </div>
        <span className="text-white/70 text-sm">Drag to explore different time periods</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-white/70 text-sm">{minYear}</span>
        <Slider
          value={[year]}
          min={minYear}
          max={maxYear}
          step={1}
          onValueChange={(values) => handleChange(values[0])}
          className="flex-1"
        />
        <span className="text-white/70 text-sm">{maxYear}</span>
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-white/50">
        <span>Pre-Nakba</span>
        <span>1948 Nakba</span>
        <span>1967 Naksa</span>
        <span>Oslo Accords</span>
        <span>Present</span>
      </div>
    </div>
  );
};

// Component to set the map view based on selected point
const SetViewOnClick = ({ coords }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13, {
        animate: true,
        duration: 1
      });
    }
  }, [coords, map]);
  
  return null;
};

const MapsPage: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeBaseMap, setActiveBaseMap] = useState(baseMaps[0]);
  const [currentYear, setCurrentYear] = useState(2023);
  const [filteredPoints, setFilteredPoints] = useState(pointsOfInterest);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState(Object.keys(markerTypes));
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter points based on year, type, and search query
  useEffect(() => {
    let filtered = pointsOfInterest.filter(point => 
      point.year <= currentYear && 
      (point.endYear >= currentYear || point.endYear === undefined) &&
      selectedTypes.includes(point.type)
    );
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(point => 
        point.name.toLowerCase().includes(query) || 
        point.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredPoints(filtered);
  }, [currentYear, selectedTypes, searchQuery]);
  
  // Toggle marker type filter
  const toggleMarkerType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  
  // Handle year change from timeline
  const handleYearChange = (year) => {
    // Update the active base map based on the selected year
    if (year >= 1967) {
      setActiveBaseMap(baseMaps.find(map => map.period === "current"));
    } else if (year >= 1948) {
      setActiveBaseMap(baseMaps.find(map => map.period === "1967"));
    } else {
      setActiveBaseMap(baseMaps.find(map => map.period === "1948"));
    }
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      {/* Background pattern */}
      <CanaanitePattern opacity={0.03} animate={true} />
      
      <div className="pt-16 h-screen flex flex-col">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold">Interactive Historical Maps</h1>
            <p className="text-white/70">
              Explore the geographical history of Palestine through different time periods
            </p>
          </motion.div>
          
          {/* Search and filter controls */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg px-4 py-2 pl-10 text-white focus:outline-none focus:border-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            </div>
            
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/20 rounded-lg hover:bg-[#2a2a2a] transition-colors"
              onClick={() => setFiltersOpen(!filtersOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </motion.button>
          </div>
          
          {/* Filters panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1a1a1a] border border-white/20 rounded-lg p-4 mb-4 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Filter by Type</h3>
                  <button 
                    className="text-white/60 hover:text-white"
                    onClick={() => setFiltersOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {Object.entries(markerTypes).map(([type, data]) => (
                    <button
                      key={type}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedTypes.includes(type) 
                          ? "bg-white/20 text-white" 
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                      onClick={() => toggleMarkerType(type)}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ 
                        backgroundColor: type === "historical" ? "#d97706" : 
                                         type === "cultural" ? "#059669" : "#9333ea" 
                      }} />
                      <span>{data.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Map container */}
        <div className="flex-grow relative">
          <MapContainer
            center={[31.5, 35]}
            zoom={8}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            {/* Set view when a point is selected */}
            {selectedPoint && <SetViewOnClick coords={selectedPoint.coordinates} />}
            
            {/* Base layers */}
            <LayersControl position="topright">
              {baseMaps.map((baseMap, index) => (
                <LayersControl.BaseLayer 
                  key={baseMap.name} 
                  name={baseMap.name}
                  checked={baseMap.name === activeBaseMap.name}
                >
                  <TileLayer
                    url={baseMap.url}
                    attribution={baseMap.attribution}
                    maxZoom={baseMap.maxZoom}
                  />
                </LayersControl.BaseLayer>
              ))}
            </LayersControl>
            
            {/* Custom zoom control position */}
            <ZoomControl position="bottomright" />
            
            {/* Markers for points of interest */}
            {filteredPoints.map(point => (
              <Marker
                key={point.id}
                position={point.coordinates}
                icon={markerTypes[point.type].icon}
                eventHandlers={{
                  click: () => {
                    setSelectedPoint(point);
                    setDetailsOpen(true);
                  },
                }}
              >
                <Popup>
                  <div className="text-black">
                    <h3 className="font-bold">{point.name}</h3>
                    <p className="text-sm">{point.description}</p>
                    <button 
                      className="mt-2 text-blue-600 text-sm font-medium"
                      onClick={() => {
                        setSelectedPoint(point);
                        setDetailsOpen(true);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Timeline control */}
          <TimelineControl 
            year={currentYear} 
            setYear={setCurrentYear}
            minYear={1900}
            maxYear={2023}
            onYearChange={handleYearChange}
          />
          
          {/* Map legend */}
          <div className="absolute top-4 right-4 z-[1000] bg-black/80 backdrop-blur-md p-3 rounded-lg shadow-lg">
            <div className="text-sm font-medium mb-2 flex items-center">
              <MapIcon className="w-4 h-4 mr-1.5 text-white/70" />
              <span>Legend</span>
            </div>
            <div className="space-y-2">
              {Object.entries(markerTypes).map(([type, data]) => (
                <div key={type} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ 
                    backgroundColor: type === "historical" ? "#d97706" : 
                                     type === "cultural" ? "#059669" : "#9333ea" 
                  }} />
                  <span className="text-white/90">{data.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Details panel */}
          <AnimatePresence>
            {detailsOpen && selectedPoint && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute top-0 right-0 h-full w-full md:w-[400px] bg-black/90 backdrop-blur-md z-[1001] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{selectedPoint.name}</h2>
                    <button 
                      className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      onClick={() => setDetailsOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={selectedPoint.image} 
                      alt={selectedPoint.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-3 h-3 rounded-full" style={{ 
                        backgroundColor: selectedPoint.type === "historical" ? "#d97706" : 
                                         selectedPoint.type === "cultural" ? "#059669" : "#9333ea" 
                      }} />
                      <span>{markerTypes[selectedPoint.type].name}</span>
                      <span className="mx-1">•</span>
                      <span>{selectedPoint.year} - {selectedPoint.endYear || "Present"}</span>
                    </div>
                    
                    <p className="text-white/90">{selectedPoint.description}</p>
                    
                    <div className="pt-2">
                      <h3 className="text-lg font-medium mb-2 flex items-center">
                        <Info className="w-4 h-4 mr-2 text-white/70" />
                        Historical Context
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {selectedPoint.details}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <button
                        className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        onClick={() => {
                          setDetailsOpen(false);
                          // In a real app, you might want to navigate to a more detailed page
                          // navigate(`/maps/point/${selectedPoint.id}`);
                        }}
                      >
                        View Full History
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;