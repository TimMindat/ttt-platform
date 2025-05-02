import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { CanaaniteIcons } from "../../components/icons/CanaaniteIcons";

// Archive category types
const archiveCategories = [
  { id: "biographies", name: "Biographies of Martyrs", icon: CanaaniteIcons.Profile },
  { id: "stories", name: "Untold Stories", icon: CanaaniteIcons.Book },
  { id: "testimonies", name: "Testimonies", icon: CanaaniteIcons.Voice },
  { id: "maps", name: "Maps & Geography", icon: CanaaniteIcons.Map },
  { id: "visual-arts", name: "Visual Arts", icon: CanaaniteIcons.Art },
  { id: "performing-arts", name: "Performing Arts", icon: CanaaniteIcons.Performance },
  { id: "music", name: "Music", icon: CanaaniteIcons.Music },
  { id: "literature", name: "Literature", icon: CanaaniteIcons.Scroll },
];

export const ArchivesPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  
  // Mock archive items - would be fetched from API in production
  const [archiveItems, setArchiveItems] = useState([
    {
      id: 1,
      title: "The Life of Ahmad Yassin",
      category: "biographies",
      date: "1936-2004",
      thumbnail: "/archives/yassin.jpg",
      description: "Biography of Palestinian leader and founder of Hamas.",
    },
    {
      id: 2,
      title: "Voices from Jenin",
      category: "testimonies",
      date: "2002",
      thumbnail: "/archives/jenin.jpg",
      description: "Testimonies from survivors of the Jenin refugee camp.",
    },
    {
      id: 3,
      title: "Historical Palestine Map",
      category: "maps",
      date: "1947",
      thumbnail: "/archives/map1947.jpg",
      description: "Detailed map of Palestine before the 1948 partition.",
    },
    // More items would be added here
  ]);
  
  // Filter items based on category and search query
  useEffect(() => {
    let filtered = archiveItems;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery, archiveItems]);
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 canaanite-title">Archives</h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Preserving our collective memory through stories, testimonies, and cultural artifacts.
          </p>
          
          {/* Canaanite-inspired decorative divider */}
          <div className="flex justify-center my-8">
            <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="canaanite-divider">
              <path d="M0 10H200" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
              <path d="M40 10L60 5L80 10L100 5L120 10L140 5L160 10" stroke="white" strokeWidth="1" />
              <circle cx="40" cy="10" r="3" fill="white" fillOpacity="0.6" />
              <circle cx="100" cy="10" r="3" fill="white" fillOpacity="0.6" />
              <circle cx="160" cy="10" r="3" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
        </motion.div>
        
        {/* Search and filter section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search archives..."
                className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:border-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === "all" ? "bg-white/20 text-white" : "bg-transparent text-white/60 hover:text-white"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              
              {archiveCategories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id ? "bg-white/20 text-white" : "bg-transparent text-white/60 hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Archive items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <motion.div
                key={item.id}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => navigate(`/archives/${item.category}/${item.id}`)}
              >
                <div className="aspect-video relative">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 px-3 py-1 rounded-full text-sm">
                    {item.date}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-white/60 mb-2 capitalize">
                    {archiveCategories.find(cat => cat.id === item.category)?.name || item.category}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-white/60">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};