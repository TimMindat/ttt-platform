import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { CanaaniteIcons } from "../../components/icons/CanaaniteIcons";

// Program sections
const coastSections = [
  {
    id: "stone",
    name: "Stone | حجر",
    arabicName: "حجر",
    description: "Biographies of martyrs, literary documentation, oral testimonies, and narrative imagery.",
    icon: CanaaniteIcons.Stone,
    path: "/coast/stone",
    color: "from-amber-900/40 to-amber-700/20",
    image: "/images/coast/stone-bg.jpg"
  },
  {
    id: "salt",
    name: "Salt | ملح",
    arabicName: "ملح",
    description: "Archive of untold stories, testimonies resisting oblivion, documentary analysis, and oral narration.",
    icon: CanaaniteIcons.Salt,
    path: "/coast/salt",
    color: "from-blue-900/40 to-blue-700/20",
    image: "/images/coast/salt-bg.jpg"
  },
  {
    id: "compass",
    name: "Compass | بوصلة",
    arabicName: "بوصلة",
    description: "Documentation of maps, geographical archives, historical narratives, and unpublished memoirs.",
    icon: CanaaniteIcons.Compass,
    path: "/coast/compass",
    color: "from-emerald-900/40 to-emerald-700/20",
    image: "/images/coast/compass-bg.jpg"
  }
];

// Featured content for the Coast program
const featuredContent = [
  {
    id: 1,
    title: "Voices from Gaza: Untold Stories of Resilience",
    type: "Biography",
    section: "stone",
    image: "/images/coast/featured-1.jpg"
  },
  {
    id: 2,
    title: "The Forgotten Villages: Oral Histories",
    type: "Testimony",
    section: "salt",
    image: "/images/coast/featured-2.jpg"
  },
  {
    id: 3,
    title: "Mapping Palestine: Historical Boundaries",
    type: "Map Archive",
    section: "compass",
    image: "/images/coast/featured-3.jpg"
  }
];

export const CoastProgram = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[#121212]">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="opacity-10">
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Program icon */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center">
                <CanaaniteIcons.Wave className="w-10 h-10 text-blue-400" />
              </div>
            </motion.div>
            
            {/* Program title */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">Coast Program</span>
              <span className="text-blue-400 text-2xl md:text-3xl mt-2">برنامج ساحل</span>
            </motion.h1>
            
            {/* Decorative divider */}
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto my-6"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            
            {/* Program description */}
            <motion.p 
              className="text-lg text-white/80 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Preserving and reviving hidden stories, testimonies, and biographies, especially those related to martyrs and untold narratives. The Coast Program serves as a repository of memory and resistance against erasure.
            </motion.p>
            
            {/* Contribute button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link 
                to="/contribute" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg text-white font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-300"
              >
                <CanaaniteIcons.Pen className="w-5 h-5 mr-2" />
                Contribute Your Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Program Sections */}
      <div className="py-16 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Explore Our Sections
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coastSections.map((section, index) => (
              <motion.div
                key={section.id}
                className="relative rounded-xl overflow-hidden h-96 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} mix-blend-multiply z-10`} />
                  <img 
                    src={section.image || "https://via.placeholder.com/500x700"} 
                    alt={section.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                      {section.icon && <section.icon className="w-6 h-6 text-white" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{section.name}</h3>
                    <p className="text-white/70 mb-4">{section.description}</p>
                  </div>
                  
                  <Link 
                    to={section.path} 
                    className="inline-flex items-center text-white/90 hover:text-white group-hover:underline"
                  >
                    Explore {section.name.split('|')[0].trim()}
                    <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Content */}
      <div className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold">Featured Content</h2>
            <Link 
              to="/coast/all" 
              className="mt-4 md:mt-0 text-blue-400 hover:text-blue-300 flex items-center"
            >
              View All
              <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredContent.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={item.image || "https://via.placeholder.com/600x400"} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {item.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm capitalize">
                      {item.section} Section
                    </span>
                    <Link 
                      to={`/coast/${item.section}/${item.id}`}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#121212]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/30 to-teal-900/30 rounded-2xl p-8 md:p-12 text-center border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Story</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Every story matters. Help us preserve the collective memory by contributing your personal experiences, testimonies, or knowledge of historical events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contribute" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Contribute Now
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoastProgram;