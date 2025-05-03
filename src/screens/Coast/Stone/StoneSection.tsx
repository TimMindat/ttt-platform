import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { CanaaniteIcons } from "../../../components/icons/CanaaniteIcons";

// Sample biography data
const biographies = [
  {
    id: 1,
    name: "Ahmed Al-Jabari",
    arabicName: "أحمد الجعبري",
    years: "1960-2012",
    location: "Gaza",
    image: "/images/coast/stone/biography-1.jpg",
    shortBio: "A prominent figure in the Palestinian resistance movement who dedicated his life to the cause of freedom.",
    tags: ["Gaza", "Resistance", "Leader"]
  },
  {
    id: 2,
    name: "Razan Al-Najjar",
    arabicName: "رزان النجار",
    years: "1996-2018",
    location: "Khan Younis",
    image: "/images/coast/stone/biography-2.jpg",
    shortBio: "A 21-year-old Palestinian nurse who was killed while helping wounded protesters during the Great March of Return.",
    tags: ["Medical Worker", "Khan Younis", "Great March of Return"]
  },
  {
    id: 3,
    name: "Shireen Abu Akleh",
    arabicName: "شيرين أبو عاقلة",
    years: "1971-2022",
    location: "Jerusalem/Jenin",
    image: "/images/coast/stone/biography-3.jpg",
    shortBio: "A Palestinian-American journalist who was killed while covering Israeli raids in the Jenin refugee camp.",
    tags: ["Journalist", "Jenin", "Media"]
  },
  // Add more biographies as needed
];

// Filter categories
const filterCategories = [
  { id: "all", name: "All" },
  { id: "gaza", name: "Gaza" },
  { id: "westbank", name: "West Bank" },
  { id: "jerusalem", name: "Jerusalem" },
  { id: "48territories", name: "48 Territories" },
  { id: "diaspora", name: "Diaspora" }
];

export const StoneSection = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter biographies based on active filter and search query
  const filteredBiographies = biographies.filter(bio => {
    const matchesFilter = activeFilter === "all" || 
                          bio.location.toLowerCase().includes(activeFilter.toLowerCase()) ||
                          bio.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
                          
    const matchesSearch = searchQuery === "" ||
                          bio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bio.arabicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bio.shortBio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bio.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-amber-900/20 to-[#121212]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full opacity-20 mix-blend-overlay">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="stone-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#stone-pattern)" />
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
              <span className="text-white/90">Stone | حجر</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-900/30 flex items-center justify-center mr-4">
                    <CanaaniteIcons.Stone className="w-6 h-6 text-amber-400" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Stone | <span className="text-amber-400">حجر</span>
                  </h1>
                </div>
                <p className="text-white/80 text-lg max-w-2xl">
                  Biographies of martyrs, literary documentation, oral testimonies, and narrative imagery preserving the memory of those who sacrificed for Palestine.
                </p>
              </div>
              
              <Link 
                to="/contribute" 
                className="mt-6 md:mt-0 inline-flex items-center px-4 py-2 bg-amber-700/30 hover:bg-amber-700/50 border border-amber-600/30 rounded-lg text-white transition-colors"
              >
                <CanaaniteIcons.Pen className="w-4 h-4 mr-2" />
                Add Biography
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="py-8 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search biographies..."
                className="w-full bg-[#252525] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filterCategories.map(category => (
                <button
                  key={category.id}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeFilter === category.id 
                      ? 'bg-amber-700 text-white' 
                      : 'bg-[#252525] text-white/70 hover:bg-[#333333]'
                  } transition-colors`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Biographies Grid */}
      <div className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          {filteredBiographies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBiographies.map((bio, index) => (
                <motion.div
                  key={bio.id}
                  className="bg-[#1a1a1a] rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-amber-900/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={bio.image || "https://via.placeholder.com/400x500"} 
                      alt={bio.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold mb-1">{bio.name}</h3>
                      <p className="text-amber-400 mb-2">{bio.arabicName}</p>
                      <div className="flex items-center text-white/70 text-sm">
                        <span>{bio.years}</span>
                        <span className="mx-2">•</span>
                        <span>{bio.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-white/80 mb-4">{bio.shortBio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {bio.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-[#252525] rounded-full text-xs text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/coast/stone/${bio.id}`}
                      className="inline-flex items-center text-amber-400 hover:text-amber-300 group"
                    >
                      Read Full Biography
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CanaaniteIcons.Search className="w-16 h-16 mx-auto text-white/30 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No biographies found</h3>
              <p className="text-white/60 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setActiveFilter("all"); setSearchQuery("");}}
                className="px-4 py-2 bg-amber-700/30 hover:bg-amber-700/50 rounded-lg text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto bg-gradient-to-br from-amber-900/20 to-amber-800/10 rounded-2xl p-8 md:p-12 text-center border border-amber-900/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Preserve Their Memory</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Help us document the lives and legacies of Palestinian martyrs. Your contributions ensure their stories are never forgotten and continue to inspire future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contribute" 
                className="px-6 py-3 bg-amber-700 hover:bg-amber-600 rounded-lg text-white font-medium transition-colors"
              >
                Submit a Biography
              </Link>
              <Link 
                to="/coast/stone/guidelines" 
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
              >
                Submission Guidelines
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StoneSection;