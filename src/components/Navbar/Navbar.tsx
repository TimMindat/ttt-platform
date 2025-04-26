import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { CanaaniteIcons } from "../icons/CanaaniteIcons";
import { Menu, X, Globe } from "lucide-react";

// Updated navigation items - removed Symbols
const navItems = [
  { name: "Coast", href: "/programs/coast", icon: CanaaniteIcons.Coast },
  { name: "Harbour", href: "/programs/harbour", icon: CanaaniteIcons.Harbour },
  { name: "Azure", href: "/programs/azure", icon: CanaaniteIcons.Azure },
  { name: "Commons", href: "#", icon: CanaaniteIcons.Commons },
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
  
  // Add state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
          {/* Mobile menu button - only visible on mobile */}
          <div className="md:hidden flex items-center">
            <button 
              className="flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Left navigation with enhanced exit animation */}
          <motion.nav 
            className="flex-1 hidden md:flex items-center space-x-6 justify-start pl-4"
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
          
          {/* Center logo with absolute positioning for perfect centering - adjusted for mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center z-20">
            {/* This wrapper maintains consistent positioning */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/" className="flex items-center">
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 overflow-hidden"
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
                  className="text-lg md:text-2xl font-['Sora',Helvetica] text-white hidden xs:block"
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
            className="flex-1 flex items-center justify-end space-x-3 md:space-x-4 pr-2 md:pr-4"
            style={{ 
              opacity: controlsOpacity,
              y: controlsTranslateY,
              pointerEvents: controlsOpacity.get() < 0.3 ? "none" : "auto"
            }}
          >
            {/* Language selector - hidden on smallest screens */}
            <div className="relative hidden sm:block" ref={languageMenuRef}>
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
            
            {/* Symbols icon - hidden on smallest screens */}
            <motion.button
              className="text-white/80 hover:text-white hidden sm:block"
              whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
              onClick={() => window.location.href = '/symbols'}
            >
              <CanaaniteIcons.Language />
            </motion.button>
            
            {/* Gift icon - hidden on smallest screens */}
            <motion.button
              className="text-white/80 hover:text-white hidden sm:block"
              whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
            >
              <CanaaniteIcons.Gift />
            </motion.button>
            
            {/* Profile icon - always visible */}
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
      
      {/* Mobile navigation - improved implementation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-black/95 pt-20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-start p-4 space-y-6 overflow-y-auto max-h-full">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    className="flex flex-col items-center text-white/90 hover:text-white py-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-8 h-8 mb-2" />}
                    <span className="text-xl">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Language selector for mobile */}
              <motion.div
                className="mt-6 pt-6 border-t border-white/20 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 + 0.2 }}
              >
                <div className="flex justify-center space-x-4">
                  {["en", "ar", "fr", "es"].map((lang) => (
                    <button
                      key={lang}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        language === lang ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                      }`}
                      onClick={() => changeLanguage(lang)}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;