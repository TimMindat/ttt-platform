import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { CanaaniteIcons } from "../../../components/icons/CanaaniteIcons";

// Sample geographical archives data
const geographicalArchives = [
  {
    id: 1,
    title: "Historical Palestine: Pre-1948",
    arabicTitle: "فلسطين التاريخية: ما قبل 1948",
    author: "Dr. Khalid Mahmoud",
    date: "2023-02-10",
    image: "/images/coast/compass/map-1.jpg",
    type: "historical-map",
    description: "A detailed cartographic representation of historical Palestine before 1948, showing villages, cities, and geographical features.",
    tags: ["Historical", "Pre-1948", "Cartography"]
  },
  {
    id: 2,
    title: "Displacement Routes: The Nakba",
    arabicTitle: "مسارات التهجير: النكبة",
    author: "Samira Al-Haj",
    date: "2023-04-15",
    image: "/images/coast/compass/map-2.jpg",
    type: "interactive-map",
    description: "An interactive map documenting the routes of displacement during the Nakba, with oral testimonies attached to specific locations.",
    tags: ["Nakba", "Displacement", "Interactive"]
  },
  {
    id: 3,
    title: "Jerusalem Through Time",
    arabicTitle: "القدس عبر الزمن",
    author: "Omar Suleiman",
    date: "2023-06-22",
    image: "/images/coast/compass/map-3.jpg",
    type: "timeline-map",
    description: "A chronological mapping of Jerusalem's changing landscape, architecture, and demographics from the Ottoman period to present day.",
    tags: ["Jerusalem", "Timeline", "Urban Development"]
  },
  {
    id: 4,
    title: "Gaza's Changing Borders",
    arabicTitle: "حدود غزة المتغيرة",
    author: "Leila Khaled",
    date: "2023-08-05",
    image: "/images/coast/compass/map-4.jpg",
    type: "comparative-map",
    description: "A comparative analysis of Gaza's changing borders and access points over the decades, documenting the impact of occupation and siege.",
    tags: ["Gaza", "Borders", "Occupation"]
  }
  // Add more maps as needed
];

// Filter categories
const filterCategories = [
  { id: "all", name: "All" },
  { id: "historical-map", name: "Historical Maps" },
  { id: "interactive-map", name: "Interactive Maps" },
  { id: "timeline-map", name: "Timeline Maps" },
  { id: "comparative-map", name: "Comparative Maps" },
  { id: "memoir-map", name: "Memoir Maps" }
];

// Regions for filtering
const regions = [
  { id: "all-regions", name: "All Regions" },
  { id: "gaza", name: "Gaza" },
  { id: "westbank", name: "West Bank" },
  { id: "jerusalem", name: "Jerusalem" },
  { id: "galilee", name: "Galilee" },
  { id: "negev", name: "Negev" }
];

export const CompassSection = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeRegion, setActiveRegion] = useState("all-regions");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMap, setSelectedMap] = useState<number | null>(null);
  const mapViewerRef = useRef<HTMLDivElement>(null);
  
  // Filter maps based on active filters and search query
  const filteredMaps = geographicalArchives.filter(map => {
    const matchesFilter = activeFilter === "all" || map.type === activeFilter;
    
    const matchesRegion = activeRegion === "all-regions" || 
                          map.tags.some(tag => tag.toLowerCase().includes(activeRegion.toLowerCase()));
                          
    const matchesSearch = searchQuery === "" ||
                          map.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          map.arabicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          map.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          map.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    return matchesFilter && matchesRegion && matchesSearch;
  });
  
  // Handle map selection
  const handleMapSelect = (id: number) => {
    setSelectedMap(id);
    // Scroll to map viewer if a map is selected
    if (mapViewerRef.current) {
      mapViewerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Get selected map data
  const selectedMapData = selectedMap ? geographicalArchives.find(map => map.id === selectedMap) : null;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-green-900/20 to-[#121212]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full opacity-20 mix-blend-overlay">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="compass-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="8" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M10 2V18M2 10H18" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#compass-pattern)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-white/60 mb-8">
              <Link to="/" className="hover:text-white/80">Home</Link>
              <svg className="w-4 h-4 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Link to="/coast" className="hover:text-white/80">Coast Program</Link>
              <svg className="w-4 h-4 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white/90">Compass | بوصلة</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mr-4">
                    <CanaaniteIcons.Compass className="w-6 h-6 text-green-400" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Compass | <span className="text-green-400">بوصلة</span>
                  </h1>
                </div>
                <p className="text-white/80 text-lg max-w-2xl">
                  Documentation of maps, geographical archives, historical narratives, and unpublished memoirs that chart the Palestinian landscape through time.
                </p>
              </div>
              
              <Link 
                to="/contribute" 
                className="mt-6 md:mt-0 inline-flex items-center px-4 py-2 bg-green-700/30 hover:bg-green-700/50 border border-green-600/30 rounded-lg text-white transition-colors"
              >
                <CanaaniteIcons.Map className="w-4 h-4 mr-2" />
                Contribute Map
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Map Viewer (if a map is selected) */}
      {selectedMapData && (
        <div 
          ref={mapViewerRef}
          className="py-12 bg-[#0a0a0a] border-y border-green-900/30"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Map Image */}
              <div className="lg:w-2/3">
                <div className="relative aspect-[16/9] bg-[#1a1a1a] rounded-xl overflow-hidden">
                  <img 
                    src={selectedMapData.image} 
                    alt={selectedMapData.title} 
                    className="w-full h-full object-contain"
                  />
                  <button 
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                    onClick={() => setSelectedMap(null)}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Map Details */}
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-bold mb-2">{selectedMapData.title}</h2>
                <p className="text-green-400 mb-4">{selectedMapData.arabicTitle}</p>
                
                <div className="flex items-center text-white/70 text-sm mb-6">
                  <span>{selectedMapData.author}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedMapData.date}</span>
                </div>
                
                <p className="text-white/80 mb-6">{selectedMapData.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedMapData.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-[#252525] rounded-full text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-green-700/30 hover:bg-green-700/50 rounded-lg text-white transition-colors">
                    <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 5L5 19L19 19L19 9M15 5H19V9M15 5L19 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Full Screen
                  </button>
                  
                  <button className="px-4 py-2 bg-[#252525] hover:bg-[#333333] rounded-lg text-white transition-colors">
                    <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 17H16M12 17V11M12 11H15M12 11H9M12 7H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Search and Filter Section */}
      <div className="py-8 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-4">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search maps and archives..."
                className="w-full bg-[#252525] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-green-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Filter Rows */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Map Type Filters */}
              <div className="flex flex-wrap gap-2">
                {filterCategories.map(category => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilter === category.id 
                        ? 'bg-green-700 text-white' 
                        : 'bg-[#252525] text-white/70 hover:bg-[#333333]'
                    } transition-colors`}
                    onClick={() => setActiveFilter(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Region Filters */}
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <button
                    key={region.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeRegion === region.id 
                        ? 'bg-green-700 text-white' 
                        : 'bg-[#252525] text-white/70 hover:bg-[#333333]'
                    } transition-colors`}
                    onClick={() => setActiveRegion(region.id)}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Maps Grid */}
      <div className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          {filteredMaps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMaps.map((map, index) => (
                <motion.div
                  key={map.id}
                  className="bg-[#1a1a1a] rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 cursor-pointer"
                  onClick={() => handleMapSelect(map.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={map.image || "https://via.placeholder.com/400x225"} 
                      alt={map.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Map Type Badge */}
                    <div className="absolute top-4 left-4 px-2 py-1 rounded-full bg-green-600/80 text-white text-xs flex items-center">
                      {map.type === 'historical-map' && (
                        <>
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7V17L9 20L15 17L21 20V10L15 7L9 10L3 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Historical
                        </>
                      )}
                      {map.type === 'interactive-map' && (
                        <>
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor"/>
                          </svg>
                          Interactive
                        </>
                      )}
                      {map.type === 'timeline-map' && (
                        <>
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M4 8H8M16 16H20M4 16H8M16 8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Timeline
                        </>
                      )}
                      {map.type === 'comparative-map' && (
                        <>
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 3H21V8M16 21H21V16M3 8V3H8M3 16V21H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Comparative
                        </>
                      )}
                      {map.type === 'memoir-map' && (
                        <>
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 11V15M12 15L10 19M12 15L14 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Memoir
                        </>
                      )}
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold mb-1">{map.title}</h3>
                      <p className="text-green-400 mb-2">{map.arabicTitle}</p>
                      <div className="flex items-center text-white/70 text-sm">
                        <span>{map.author}</span>
                        <span className="mx-2">•</span>
                        <span>{map.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CanaaniteIcons.Search className="w-16 h-16 mx-auto text-white/30 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No maps found</h3>
              <p className="text-white/60 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setActiveFilter("all"); setActiveRegion("all-regions"); setSearchQuery("");}}
                className="px-4 py-2 bg-green-700/30 hover:bg-green-700/50 rounded-lg text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Interactive Map Feature */}
      <div className="py-16 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Map Exploration</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                Explore Palestinian geography through interactive maps that reveal historical changes, displacement patterns, and cultural landmarks.
              </p>
            </div>
            
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] relative">
                <img 
                  src="/images/coast/compass/interactive-map.jpg" 
                  alt="Interactive Map of Palestine" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Palestine Through Time</h3>
                  <p className="text-white/80 mb-6 max-w-2xl">
                    An interactive chronological map showing the transformation of Palestine from the Ottoman period to the present day. Explore changing borders, demographics, and landscapes.
                  </p>
                  <Link 
                    to="/coast/compass/interactive"
                    className="inline-flex items-center px-6 py-3 bg-green-600/80 hover:bg-green-500 rounded-lg text-white transition-colors self-start"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Explore Map
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Featured Memoirs */}
      <div className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Memoirs</h2>
            <p className="text-white/80">
              Personal accounts and unpublished memoirs that provide intimate perspectives on Palestinian history and geography.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-[#1a1a1a] rounded-xl overflow-hidden flex flex-col md:flex-row"
              whileHover={{ y: -5 }}
            >
              <div className="md:w-1/3">
                <img 
                  src="/images/coast/compass/memoir-1.jpg" 
                  alt="Memoir" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-bold mb-2">Memories of Haifa</h3>
                <p className="text-green-400 mb-1">ذكريات من حيفا</p>
                <p className="text-white/70 text-sm mb-4">By Ibrahim Al-Khatib • 1948-1952</p>
                <p className="text-white/80 mb-4">
                  A personal account of life in Haifa before and during the Nakba, with detailed descriptions of neighborhoods, landmarks, and daily life.
                </p>
                <Link 
                  to="/coast/compass/memoirs/1"
                  className="text-green-400 hover:text-green-300 inline-flex items-center"
                >
                  Read Memoir
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-[#1a1a1a] rounded-xl overflow-hidden flex flex-col md:flex-row"
              whileHover={{ y: -5 }}
            >
              <div className="md:w-1/3">
                <img 
                  src="/images/coast/compass/memoir-2.jpg" 
                  alt="Memoir" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-bold mb-2">The Lost Villages</h3>
                <p className="text-green-400 mb-1">القرى المفقودة</p>
                <p className="text-white/70 text-sm mb-4">By Samira Hassan • 1967-1970</p>
                <p className="text-white/80 mb-4">
                  A collection of stories about Palestinian villages that were destroyed or depopulated, based on interviews with original inhabitants.
                </p>
                <Link 
                  to="/coast/compass/memoirs/2"
                  className="text-green-400 hover:text-green-300 inline-flex items-center"
                >
                  Read Memoir
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompassSection;