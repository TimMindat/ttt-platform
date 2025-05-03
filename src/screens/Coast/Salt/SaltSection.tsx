import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { CanaaniteIcons } from "../../../components/icons/CanaaniteIcons";

// Sample testimonies data
const testimonies = [
  {
    id: 1,
    title: "Life Under Siege",
    arabicTitle: "الحياة تحت الحصار",
    author: "Mahmoud Khalil",
    location: "Gaza City",
    date: "2023-05-15",
    image: "/images/coast/salt/testimony-1.jpg",
    mediaType: "video",
    mediaUrl: "/media/coast/salt/testimony-1.mp4",
    duration: "12:45",
    excerpt: "A first-hand account of daily life in Gaza under the ongoing siege, documenting the resilience and struggles of ordinary people.",
    tags: ["Gaza", "Siege", "Daily Life", "Resilience"]
  },
  {
    id: 2,
    title: "Memories of Displacement",
    arabicTitle: "ذكريات التهجير",
    author: "Fatima Al-Najjar",
    location: "Rafah",
    date: "2023-03-22",
    image: "/images/coast/salt/testimony-2.jpg",
    mediaType: "audio",
    mediaUrl: "/media/coast/salt/testimony-2.mp3",
    duration: "18:30",
    excerpt: "An elderly woman recounts her family's experience of displacement during the Nakba and the ongoing struggle to preserve their heritage.",
    tags: ["Nakba", "Displacement", "Oral History", "Heritage"]
  },
  {
    id: 3,
    title: "Childhood in the Camps",
    arabicTitle: "الطفولة في المخيمات",
    author: "Yousef Barghouthi",
    location: "Jenin Refugee Camp",
    date: "2023-07-10",
    image: "/images/coast/salt/testimony-3.jpg",
    mediaType: "text",
    duration: null,
    excerpt: "A poignant narrative of growing up in Jenin refugee camp, highlighting the challenges and moments of joy experienced by Palestinian children.",
    tags: ["Refugee Camp", "Childhood", "Jenin", "Education"]
  },
  // Add more testimonies as needed
];

// Filter categories
const filterCategories = [
  { id: "all", name: "All" },
  { id: "video", name: "Video Testimonies" },
  { id: "audio", name: "Audio Stories" },
  { id: "text", name: "Written Accounts" },
  { id: "gaza", name: "Gaza" },
  { id: "westbank", name: "West Bank" },
  { id: "diaspora", name: "Diaspora" }
];

export const SaltSection = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Filter testimonies based on active filter and search query
  const filteredTestimonies = testimonies.filter(testimony => {
    const matchesFilter = activeFilter === "all" || 
                          testimony.mediaType === activeFilter ||
                          testimony.location.toLowerCase().includes(activeFilter.toLowerCase()) ||
                          testimony.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
                          
    const matchesSearch = searchQuery === "" ||
                          testimony.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          testimony.arabicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          testimony.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          testimony.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          testimony.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    return matchesFilter && matchesSearch;
  });
  
  // Handle play/pause media
  const toggleMedia = (id: number, type: string) => {
    if (currentPlaying === id) {
      // Pause current
      if (type === 'audio' && audioRef.current) {
        audioRef.current.pause();
      } else if (type === 'video' && videoRef.current) {
        videoRef.current.pause();
      }
      setCurrentPlaying(null);
    } else {
      // Stop previous if any
      if (audioRef.current) audioRef.current.pause();
      if (videoRef.current) videoRef.current.pause();
      
      // Play new
      setCurrentPlaying(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-blue-900/20 to-[#121212]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full opacity-20 mix-blend-overlay">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="salt-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 0 5 Q 5 0, 10 5 T 20 5" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#salt-pattern)" />
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
              <span className="text-white/90">Salt | ملح</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4">
                    <CanaaniteIcons.Wave className="w-6 h-6 text-blue-400" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Salt | <span className="text-blue-400">ملح</span>
                  </h1>
                </div>
                <p className="text-white/80 text-lg max-w-2xl">
                  Archive of untold stories and testimonies resisting oblivion, preserving the voices and experiences of Palestinians through documentary analysis and oral narration.
                </p>
              </div>
              
              <Link 
                to="/contribute" 
                className="mt-6 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-700/30 hover:bg-blue-700/50 border border-blue-600/30 rounded-lg text-white transition-colors"
              >
                <CanaaniteIcons.Voice className="w-4 h-4 mr-2" />
                Share Your Story
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
                placeholder="Search testimonies..."
                className="w-full bg-[#252525] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500/50"
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
                      ? 'bg-blue-700 text-white' 
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
      
      {/* Testimonies Grid */}
      <div className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          {filteredTestimonies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonies.map((testimony, index) => (
                <motion.div
                  key={testimony.id}
                  className="bg-[#1a1a1a] rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={testimony.image || "https://via.placeholder.com/400x225"} 
                      alt={testimony.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Media Type Badge */}
                    <div className="absolute top-4 left-4 px-2 py-1 rounded-full bg-blue-600/80 text-white text-xs flex items-center">
                      {testimony.mediaType === 'video' && (
                        <>
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12L9 5.00001V19L21 12Z" fill="currentColor"/>
                          </svg>
                          Video
                        </>
                      )}
                      {testimony.mediaType === 'audio' && (
                        <>
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M8 8V16M16 7V17M4 10V14M20 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Audio
                        </>
                      )}
                      {testimony.mediaType === 'text' && (
                        <>
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 7V4H20V7M9 20H15M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Text
                        </>
                      )}
                      {testimony.duration && <span className="ml-2">{testimony.duration}</span>}
                    </div>
                    
                    {/* Play Button for Audio/Video */}
                    {(testimony.mediaType === 'video' || testimony.mediaType === 'audio') && (
                      <button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-600/80 flex items-center justify-center hover:bg-blue-500 transition-colors"
                        onClick={() => toggleMedia(testimony.id, testimony.mediaType)}
                      >
                        {currentPlaying === testimony.id ? (
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 9V15M14 9V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="white"/>
                          </svg>
                        )}
                      </button>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold mb-1">{testimony.title}</h3>
                      <p className="text-blue-400 mb-2">{testimony.arabicTitle}</p>
                      <div className="flex items-center text-white/70 text-sm">
                        <span>{testimony.author}</span>
                        <span className="mx-2">•</span>
                        <span>{testimony.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Media Player (hidden until played) */}
                  {currentPlaying === testimony.id && testimony.mediaType === 'audio' && (
                    <div className="p-4 bg-[#252525]">
                      <audio 
                        ref={audioRef} 
                        src={testimony.mediaUrl} 
                        controls 
                        autoPlay 
                        className="w-full" 
                        onEnded={() => setCurrentPlaying(null)}
                      />
                    </div>
                  )}
                  
                  {currentPlaying === testimony.id && testimony.mediaType === 'video' && (
                    <div className="aspect-video">
                      <video 
                        ref={videoRef} 
                        src={testimony.mediaUrl} 
                        controls 
                        autoPlay 
                        className="w-full h-full" 
                        onEnded={() => setCurrentPlaying(null)}
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <p className="text-white/80 mb-4">{testimony.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {testimony.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-[#252525] rounded-full text-xs text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/coast/salt/${testimony.id}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 group"
                    >
                      Read Full Story
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
              <h3 className="text-2xl font-semibold mb-2">No testimonies found</h3>
              <p className="text-white/60 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setActiveFilter("all"); setSearchQuery("");}}
                className="px-4 py-2 bg-blue-700/30 hover:bg-blue-700/50 rounded-lg text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Interactive Storytelling Feature */}
      <div className="py-16 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Storytelling</h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto">
                Explore Palestinian narratives through immersive, interactive experiences that combine visual, auditory, and textual elements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="aspect-[4/3] relative">
                  <img 
                    src="/images/coast/salt/interactive-1.jpg" 
                    alt="Voices of the Nakba" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold mb-2">Voices of the Nakba</h3>
                    <p className="text-white/80 mb-4">An interactive timeline featuring testimonies from survivors of the 1948 displacement.</p>
                    <Link 
                      to="/coast/salt/interactive/nakba"
                      className="inline-flex items-center px-4 py-2 bg-blue-600/80 hover:bg-blue-500 rounded-lg text-white transition-colors self-start"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12L9 5.00001V19L21 12Z" fill="currentColor"/>
                      </svg>
                      Experience
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="aspect-[4/3] relative">
                  <img 
                    src="/images/coast/salt/interactive-2.jpg" 
                    alt="Gaza Diaries" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold mb-2">Gaza Diaries</h3>
                    <p className="text-white/80 mb-4">A collection of daily accounts from Gaza residents during times of conflict and siege.</p>
                    <Link 
                      to="/coast/salt/interactive/gaza-diaries"
                      className="inline-flex items-center px-4 py-2 bg-blue-600/80 hover:bg-blue-500 rounded-lg text-white transition-colors self-start"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12L9 5.00001V19L21 12Z" fill="currentColor"/>
                      </svg>
                      Experience
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#121212]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-2xl p-8 md:p-12 text-center border border-blue-900/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Story</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Every Palestinian story matters. Contribute your personal experiences, family histories, or testimonies to ensure these narratives are preserved for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contribute" 
                className="px-6 py-3 bg-blue-700 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
              >
                Submit Your Testimony
              </Link>
              <Link 
                to="/coast/salt/guidelines" 
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

export default SaltSection;