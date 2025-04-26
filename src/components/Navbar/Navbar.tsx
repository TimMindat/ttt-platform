import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { CanaaniteIcons } from "../icons/CanaaniteIcons";

// Updated navigation items
const navItems = [
  { name: "Coast", href: "/programs/coast", icon: CanaaniteIcons.Coast },
  { name: "Harbour", href: "/programs/harbour", icon: CanaaniteIcons.Harbour },
  { name: "Azure", href: "/programs/azure", icon: CanaaniteIcons.Azure },
  { name: "Commons", href: "#", icon: CanaaniteIcons.Commons },
  { name: "Symbols", href: "/symbols", icon: CanaaniteIcons.Language },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en");
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation setup
  const { scrollY } = useScroll();
  
  // Enhanced background transformations with stronger gradient - starting completely transparent
  const backgroundOpacity = useTransform(scrollY, [0, 100, 300, 500], [0, 0.2, 0.6, 0.95]);
  const navbarBlur = useTransform(scrollY, [0, 100, 300], [0, 3, 8]);
  
  // New dark gradient background that intensifies after morphing - starting completely transparent
  const gradientOpacity = useTransform(scrollY, [0, 200, 300, 500], [0, 0.2, 0.7, 1]);
  
  // Refined morphing animations with smoother transitions
  const navItemsOpacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);
  const navItemsScale = useTransform(scrollY, [0, 200], [1, 0.9]);
  const navItemsTranslateY = useTransform(scrollY, [0, 300], [0, -10]);
  
  const controlsOpacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);
  const controlsTranslateY = useTransform(scrollY, [0, 300], [0, -10]);
  
  // Logo and title transformations with enhanced motion - keeping position stable
  const logoScale = useTransform(scrollY, [0, 300, 500], [1, 1.05, 1.15]);
  const titleOpacity = useTransform(scrollY, [0, 300, 500], [1, 1, 1]);
  const titleScale = useTransform(scrollY, [0, 300, 500], [1, 1.05, 1.15]);
  
  // Border animation - starting completely invisible
  const borderOpacity = useTransform(scrollY, [0, 200, 300, 500], [0, 0.1, 0.3, 0.6]);
  const borderGlow = useTransform(scrollY, [0, 300, 500], [0, 1, 3]);
  
  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle language change
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };
  
  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: useTransform(
          scrollY,
          [0, 100, 300, 500],
          [
            "rgba(18, 18, 18, 0)", // Completely transparent at start
            "rgba(18, 18, 18, 0.3)", // Slightly visible when starting to scroll
            "linear-gradient(to bottom, rgba(10, 10, 10, 0.85), rgba(18, 18, 18, 0.75))", // Medium dark when partially scrolled
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(10, 10, 10, 0.9))" // Very dark after fully morphed
          ]
        ),
        backdropFilter: `blur(${navbarBlur}px)`,
        WebkitBackdropFilter: `blur(${navbarBlur}px)`,
      }}
    >
      {/* Enhanced dark gradient overlay for better readability when morphed - starting completely transparent */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent"
        style={{ opacity: gradientOpacity }}
      />
      
      {/* An animated Canaanite-inspired decorative border with enhanced glow - starting invisible */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ 
          opacity: borderOpacity,
          boxShadow: `0 0 ${borderGlow}px rgba(255, 255, 255, 0.5)`,
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 80%, transparent)"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center h-16 md:h-20">
          {/* Left navigation with enhanced exit animation */}
          <motion.nav 
            className="flex-1 hidden md:flex items-center space-x-6"
            style={{ 
              opacity: navItemsOpacity,
              scale: navItemsScale,
              y: navItemsTranslateY,
              pointerEvents: navItemsOpacity.get() < 0.3 ? "none" : "auto"
            }}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative flex items-center text-white/80 hover:text-white transition-colors group"
                onMouseEnter={() => setHoveredNav(item.name)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {/* Canaanite-inspired icon with enhanced hover effect */}
                <motion.span 
                  className="mr-1 opacity-70 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 0 }}
                  whileHover={{ y: -2, rotate: 5 }}
                >
                  {item.icon && <item.icon />}
                </motion.span>
                
                <span className="relative z-10">{item.name}</span>
                {hoveredNav === item.name && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-white"
                    layoutId="navIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </motion.nav>
          
          {/* Center logo with stable positioning and enhanced visibility */}
          <div className="flex-1 flex justify-center items-center">
            {/* This wrapper maintains consistent positioning */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/" className="flex items-center">
                <motion.div
                  className="w-10 h-10 mr-3 overflow-hidden"
                  style={{ 
                    scale: logoScale,
                    filter: useTransform(
                      scrollY, 
                      [0, 300, 500], 
                      [
                        "drop-shadow(0 0 3px rgba(0,0,0,0.5))", // Shadow for readability at start
                        "drop-shadow(0 0 5px rgba(255,255,255,0.4))",
                        "drop-shadow(0 0 8px rgba(255,255,255,0.6))"
                      ]
                    )
                  }}
                  whileHover={{ rotate: 10, scale: useTransform(scrollY, [0, 500], [1.1, 1.2]) }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src="https://i.imgur.com/bwdY3iU.png" 
                    alt="Trace of the Tides Logo" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.h1 
                  className="text-xl md:text-2xl font-['Sora',Helvetica] text-white"
                  style={{ 
                    scale: titleScale,
                    opacity: titleOpacity,
                    filter: useTransform(
                      scrollY, 
                      [0, 300, 500], 
                      [
                        "drop-shadow(0 0 3px rgba(0,0,0,0.7))", // Shadow for readability at start
                        "drop-shadow(0 0 3px rgba(255,255,255,0.2))",
                        "drop-shadow(0 0 5px rgba(255,255,255,0.4))"
                      ]
                    )
                  }}
                  whileHover={{ scale: useTransform(scrollY, [0, 500], [1.05, 1.1]) }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Trace of the Tides
                </motion.h1>
              </Link>
            </motion.div>
          </div>
          
          {/* Right controls with enhanced exit animation */}
          <motion.div 
            className="flex-1 flex items-center justify-end space-x-4"
            style={{ 
              opacity: controlsOpacity,
              y: controlsTranslateY,
              pointerEvents: controlsOpacity.get() < 0.3 ? "none" : "auto"
            }}
          >
            {/* Language selector with enhanced micro-interactions */}
            <div className="relative" ref={languageMenuRef}>
              <motion.button
                className="flex items-center text-white/80 hover:text-white"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95, rotate: -5 }}
              >
                <CanaaniteIcons.Language />
              </motion.button>
              
              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-32 bg-[#1a1a1a]/90 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-white/10"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {["en", "ar", "fr", "es"].map((lang) => (
                      <motion.button
                        key={lang}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#333333] transition-colors"
                        onClick={() => changeLanguage(lang)}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {lang === "en" ? "English" : 
                         lang === "ar" ? "العربية" : 
                         lang === "fr" ? "Français" : "Español"}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Gift icon with enhanced micro-interactions */}
            <motion.button
              className="text-white/80 hover:text-white"
              whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
            >
              <CanaaniteIcons.Gift />
            </motion.button>
            
            {/* Profile icon with enhanced micro-interactions */}
            <motion.button
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] transition-colors"
              whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <CanaaniteIcons.Profile />
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile navigation (hidden on desktop) */}
      <div className="md:hidden">
        {/* Mobile menu implementation here */}
      </div>
    </motion.header>
  );
};

export default Navbar;