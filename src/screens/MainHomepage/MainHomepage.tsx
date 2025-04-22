import { ClockIcon, Globe } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import AuthButton from '../../components/AuthButton/AuthButton';
import { db, auth } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";

// Data for navigation items
const navItems = [
  { name: "Coast", href: "#" },
  { name: "Boat", href: "#" },
  { name: "Azure", href: "#" },
  { name: "Commons", href: "#" },
  { name: "Donate", href: "#" },
];

// Data for suggested content
const suggestedContent = [
  { id: 1, image: "/card-1.png", title: "Gazan Kids: Voices Beneath the Dust" },
  { id: 2, image: "/card-2.png", title: "Creation and Catastrophe: Stories of Resilience" },
  { id: 3, image: "/card-3.png", title: "1984: Al Nakba" },
  { id: 4, image: "/card-4.png", title: "Reflections: Land and Identity" },
  { id: 5, image: "https://arabcenterdc.org/wp-content/uploads/2018/05/nakba-man-camp-800-1.png", title: "Shoreline Narratives: Community Voices" },
  { id: 6, image: "https://media.licdn.com/dms/image/v2/D4E12AQH1X94iNSeLvA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1683277394865?e=2147483647&v=beta&t=m-_gZZDT4tw3qkUXc-2oIe_C6-etZYqRInkZj4V4Et0", title: "Dialogues: Connecting Cultures" },
  { id: 7, image: "https://karyawan.sg/wp-content/uploads/2021/06/Social-Media-Social-Change.png", title: "Waves of Change: Environmental Stories" },
];

// Data for featured programs
const featuredPrograms = [
  {
    id: 1,
    title: "Boat",
    description: "Restoring dialogue, navigating truth.",
    image: "/img-1.png",
  },
  {
    id: 2,
    title: "Coast",
    description: "Unheard voices, resilience, and buried truths.",
    image: "/img-2.png",
  },
  {
    id: 3,
    title: "Azure",
    description: "A bridge between sky, sea, and soul.",
    image: "/img-3.png",
  },
];

// Data for featured stories
const featuredStories = [
  {
    id: 1,
    title:
      "Israel and the Palestinian Authority ... a struggle for existence or a job?",
    readTime: "5 min read",
    image: "/787736-1-3.png",
  },
  {
    id: 2,
    title:
      "Israel and the Palestinian Authority ... a struggle for existence or a job?",
    readTime: "5 min read",
    image: "/787736-1-3.png",
  },
  {
    id: 3,
    title:
      "Israel and the Palestinian Authority ... a struggle for existence or a job?",
    readTime: "5 min read",
    image: "/787736-1-3.png",
  },
];

export const MainHomepage = (): JSX.Element => {
  const navigate = useNavigate();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [language, setLanguage] = useState<string>("en");
  const [showLanguageMenu, setShowLanguageMenu] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isManualChange, setIsManualChange] = useState<boolean>(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    programs: useRef<HTMLDivElement>(null),
    stories: useRef<HTMLDivElement>(null),
    share: useRef<HTMLDivElement>(null),
  };
  
  // Auto-rotate slides
  useEffect(() => {
    let slideInterval: NodeJS.Timeout;
    
    if (!isManualChange) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % suggestedContent.length);
      }, 8000); // Change slide every 8 seconds
    }
    
    return () => {
      if (slideInterval) clearInterval(slideInterval);
    };
  }, [isManualChange]);
  
  // Reset manual change flag after some time
  useEffect(() => {
    let manualTimeout: NodeJS.Timeout;
    
    if (isManualChange) {
      manualTimeout = setTimeout(() => {
        setIsManualChange(false);
      }, 15000); // Resume auto-rotation after 15 seconds of inactivity
    }
    
    return () => {
      if (manualTimeout) clearTimeout(manualTimeout);
    };
  }, [isManualChange, currentSlide]);
  
  // Handle manual slide change
  const changeSlide = (index: number) => {
    setCurrentSlide(index);
    setIsManualChange(true);
  };
  
  // Enhanced scroll animation hooks
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [0.8, 1]);
  const headerBackground = useTransform(
    scrollY,
    [0, 200, 400, 600],
    [
      "rgba(0,0,0,0.5)", 
      "rgba(18,18,18,0.7)", 
      "rgba(18,18,18,0.9)", 
      "rgba(18,18,18,1)"
    ]
  );
  
  // Smoother parallax effects
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const heroOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.9, 0.7]);
  const heroBlur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(2px)"]);
  
  // Content section animations
  const contentBorderRadius = useTransform(
    scrollY, 
    [300, 500], 
    ["30px", "0px"]
  );
  const contentTranslateY = useTransform(scrollY, [300, 600], [0, -50]);
  
  // Check which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Determine which section is currently in view
      if (sectionRefs.share.current && scrollPosition >= sectionRefs.share.current.offsetTop) {
        setActiveSection("share");
      } else if (sectionRefs.stories.current && scrollPosition >= sectionRefs.stories.current.offsetTop) {
        setActiveSection("stories");
      } else if (sectionRefs.programs.current && scrollPosition >= sectionRefs.programs.current.offsetTop) {
        setActiveSection("programs");
      } else {
        setActiveSection("hero");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

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

  // Toggle language function
  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
    // Here you would implement actual language change logic
  };
  
  // Navigate to program page
  const navigateToProgram = (programTitle: string) => {
    const route = programTitle.toLowerCase();
    navigate(`/programs/${route}`);
  };

  return (
    <div className="flex flex-col bg-[#121212] min-h-screen w-full overflow-x-hidden">
      {/* Enhanced header with gradient effect */}
      <motion.header 
        className="relative w-full h-16 z-50"
        style={{ 
          background: headerBackground,
          opacity: headerOpacity,
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto h-full px-4 md:px-20">
          <div className="flex items-center justify-between h-full relative">
            <nav className="hidden md:flex items-center space-x-6 w-1/3">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-[#f2f2f2] font-['Sora',Helvetica] text-base leading-4 relative"
                  onHoverStart={() => setHoveredNav(item.name)}
                  onHoverEnd={() => setHoveredNav(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {hoveredNav === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                      layoutId="navUnderline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="text-[#d5d5d5] font-['Sora',Helvetica] text-2xl leading-6 w-1/3 text-center mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Trace of the Tides
            </motion.div>

            <div className="flex items-center justify-end space-x-4 w-1/3">
              {/* Language toggle */}
              <div className="relative" ref={languageMenuRef}>
                <motion.button
                  className="flex items-center justify-center text-white hover:text-neutral-200 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  <Globe className="w-5 h-5 mr-1" />
                  <span className="text-sm uppercase">{language}</span>
                </motion.button>
                
                <AnimatePresence>
                  {showLanguageMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-24 bg-[#1a1a1a] rounded-md shadow-lg z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {["en", "ar", "fr", "es"].map((lang) => (
                        <motion.button
                          key={lang}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            language === lang ? "text-white bg-[#2a2a2a]" : "text-gray-300 hover:bg-[#2a2a2a]"
                          } transition-colors duration-200`}
                          onClick={() => toggleLanguage(lang)}
                          whileHover={{ x: 3 }}
                        >
                          {lang.toUpperCase()}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.button
                className="flex items-center justify-center w-5 h-5"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img className="w-5 h-5" alt="Search" src="/frame-4.svg" />
              </motion.button>
              <motion.button
                className="md:hidden flex items-center justify-center w-5 h-5"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img className="w-5 h-5" alt="Menu" src="/frame.svg" />
              </motion.button>
              <motion.button
                className="md:hidden flex items-center justify-center w-5 h-5"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img className="w-5 h-5" alt="Menu" src="/frame.svg" />
              </motion.button>
              
            </div>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {suggestedContent.slice(0, 4).map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-gray-500"
                  }`}
                  onClick={() => changeSlide(index)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={currentSlide === index ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with dynamic background and content */}
      <motion.section
        ref={sectionRefs.hero}
        className="relative w-full h-[900px] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${suggestedContent[currentSlide].image})`,
          scale: heroScale,
          opacity: heroOpacity,
          filter: heroBlur
        }}
        key={currentSlide} // Add key to force re-render on slide change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg,rgba(18,18,18,1) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 100%)"
          }}
        />

        <div className="relative h-full flex flex-col justify-end">
          {/* Featured Story with enhanced animations - adjusted positioning */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute top-[250px] left-[5%] md:left-[145px] flex flex-col items-start gap-[27.65px]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                className="w-[76.59px] h-[97.87px] cursor-pointer"
                alt="Play button"
                src="/ic-play.svg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"],
                }}
                transition={{ 
                  boxShadow: { repeat: Infinity, duration: 2 },
                }}
              />
              <motion.h1 
                className="text-3xl md:text-[55.3px] leading-tight md:leading-[66.4px] text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {suggestedContent[currentSlide].title.split(':').map((part, index) => (
                  <span key={index} className={index === 0 ? "font-bold" : "font-normal"}>
                    {index > 0 && ": "}
                    {part}
                  </span>
                ))}
              </motion.h1>
            </motion.div>
          </AnimatePresence>

          {/* Stories from the Sea - adjusted positioning */}
          <div className="container mx-auto px-4 md:px-20 pb-32">
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-5xl font-['Sora',Helvetica] text-white leading-tight md:leading-[48px]">
                Stories from the Sea
              </h2>
              <p className="text-lg md:text-xl font-['Sora',Helvetica] text-gray-300 leading-5 mt-7">
                Explore the rich tapestry of culture through immersive
                storytelling
              </p>
            </motion.div>
          </div>
        </div>

        {/* Suggested Content - adjusted positioning */}
        <div className="absolute bottom-20 left-0 w-full">
          <div className="container mx-auto px-4 md:px-20">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold font-['Poppins',Helvetica] text-neutral-200 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Suggested
            </motion.h3>
            <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
              {suggestedContent.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`flex-shrink-0 w-[280px] md:w-[389px] h-[160px] rounded-[5px] bg-cover bg-center cursor-pointer ${
                    currentSlide === index ? "ring-2 ring-white" : ""
                  }`}
                  style={{ backgroundImage: `url(${item.image})` }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
                    zIndex: 10
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => changeSlide(index)}
                />
              ))}
              <motion.div 
                className="flex-shrink-0 w-[280px] md:w-[383px] h-[160px] bg-[#14141480] rounded-[5px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </div>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {suggestedContent.slice(0, 4).map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-gray-500"
                  }`}
                  onClick={() => changeSlide(index)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={currentSlide === index ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Content sections with enhanced scroll effect */}
      <motion.div 
        className="relative z-10 bg-[#121212]"
        style={{ 
          y: contentTranslateY,
          borderTopLeftRadius: contentBorderRadius,
          borderTopRightRadius: contentBorderRadius,
          marginTop: "-30px",
          boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Section indicator dots - Netflix style */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
          {["hero", "programs", "stories", "share"].map((section) => (
            <motion.div
              key={section}
              className="w-3 h-3 rounded-full cursor-pointer"
              style={{ 
                backgroundColor: activeSection === section ? "#ffffff" : "rgba(255,255,255,0.3)" 
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => scrollToSection(section)}
              animate={{ 
                scale: activeSection === section ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Featured Programs - continuous scroll with unified background */}
        <section 
          ref={sectionRefs.programs} 
          className="py-24 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: "url('/pattern-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 relative z-10 max-w-[1920px] w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <motion.h2
                className="text-3xl md:text-5xl font-['Sora',Helvetica] text-white mb-6 relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Featured Programs
                <motion.div 
                  className="absolute -bottom-2 left-0 h-1 bg-white"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl font-['Sora',Helvetica] text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Discover our curated programs that explore the depths of maritime heritage and narratives
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * program.id, duration: 0.5 }}
                  onHoverStart={() => setHoveredProgram(program.id)}
                  onHoverEnd={() => setHoveredProgram(null)}
                  whileHover={{ y: -10 }}
                  onClick={() => navigateToProgram(program.title)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card className="overflow-hidden bg-[#1a1a1a] border-0 shadow-xl h-full aspect-[3/4] mx-auto max-w-[280px]">
                    <motion.div
                      className="h-full bg-neutral-700 relative"
                      animate={{
                        filter: hoveredProgram === program.id ? "brightness(1.2)" : "brightness(1)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={program.image}
                        alt={program.title}
                        className="absolute w-full h-full object-cover"
                      />
                      
                      {/* Gradient overlay that intensifies on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          opacity: hoveredProgram === program.id ? 0.8 : 0.5,
                          background: hoveredProgram === program.id 
                            ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%)"
                            : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)"
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Content positioned at the bottom of the card */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-5"
                        animate={{
                          y: hoveredProgram === program.id ? 0 : 10,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.div
                          className="w-10 h-0.5 bg-white mb-3"
                          initial={{ width: "10px" }}
                          animate={{
                            width: hoveredProgram === program.id ? "32px" : "10px",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <motion.h3 
                          className="text-xl font-['Sora',Helvetica] text-white mb-2"
                          animate={{
                            y: hoveredProgram === program.id ? 0 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {program.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-gray-300 text-sm mb-3"
                          initial={{ opacity: 0.8 }}
                          animate={{
                            opacity: hoveredProgram === program.id ? 1 : 0.8,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {program.description}
                        </motion.p>
                        
                        {/* Additional information that appears on hover - adjusted for program sections */}
                        <motion.div
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: hoveredProgram === program.id ? "auto" : 0,
                            opacity: hoveredProgram === program.id ? 1 : 0
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="pt-2 border-t border-white/20">
                            <div className="flex items-center mb-2">
                              <span className="text-white/70 text-xs">Edition:</span>
                              <span className="text-white text-xs ml-2">2024.1</span>
                            </div>
                            <div className="flex items-center mb-2">
                              <span className="text-white/70 text-xs">Stories:</span>
                              <span className="text-white text-xs ml-2">12 narratives</span>
                            </div>
                            <motion.button
                              className="bg-white/10 hover:bg-white/20 text-white text-xs py-1.5 px-3 rounded-full mt-2 backdrop-blur-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Explore Section
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Stories - continuous scroll with unified background */}
        <section 
          ref={sectionRefs.stories} 
          className="py-24 relative"
        >
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(to bottom, #0c0c0c 0%, #121212 100%)"
            }}
          />
          
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(circle at 70% 50%, rgba(26,26,26,0.3) 0%, rgba(12,12,12,0) 70%)"
            }}
            animate={{
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 relative z-10 max-w-[1920px] w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <motion.h2
                className="text-3xl md:text-5xl font-['Sora',Helvetica] text-white mb-6 relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Featured Stories
                <motion.div 
                  className="absolute -bottom-2 left-0 h-1 bg-white"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl font-['Sora',Helvetica] text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Immerse yourself in powerful narratives that capture the essence of communities
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStories.map((story) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * story.id, duration: 0.5 }}
                >
                  <Link 
                    to={`/blog/${story.id}`}
                    className="block transform transition-transform duration-300 hover:scale-[1.02]"
                  >
                  <motion.div
                    className="relative w-full max-w-[395px] mx-auto cursor-pointer"
                    onHoverStart={() => setHoveredStory(story.id)}
                    onHoverEnd={() => setHoveredStory(null)}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -8,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  >
                    <Card className="w-full h-auto rounded-lg overflow-hidden bg-[#1a1a1a] border-0 shadow-xl">
                      <motion.div
                        className="h-56 bg-neutral-700 relative"
                        animate={{
                          filter: hoveredStory === story.id ? "brightness(1.2)" : "brightness(1)",
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <img
                          src={story.image}
                          alt="Story cover"
                          className="absolute w-full h-full object-cover"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                          initial={{ opacity: 0.5 }}
                          animate={{ 
                            opacity: hoveredStory === story.id ? 0.7 : 0.5 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <AnimatePresence>
                          {hoveredStory === story.id && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Button className="bg-white text-black hover:bg-neutral-200 hover:text-neutral-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-white/20">
                                Read More
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <CardContent className="p-0">
                        <motion.div
                          className="p-6 flex flex-col justify-between min-h-[140px]"
                          animate={{
                            backgroundColor: hoveredStory === story.id ? "#2a2a2a" : "#1a1a1a",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.h3 
                            className="text-xl font-['Sora',Helvetica] text-white leading-normal mb-3"
                            animate={{
                              x: hoveredStory === story.id ? 5 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {story.title}
                          </motion.h3>
                          <div className="flex items-center mt-4">
                            <motion.div
                              animate={{
                                scale: hoveredStory === story.id ? 1.1 : 1,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ClockIcon className="w-4 h-4 text-gray-200" />
                            </motion.div>
                            <span className="ml-[10px] text-sm font-['Inter',Helvetica] text-gray-200">
                              {story.readTime}
                            </span>
                          </div>
                          <motion.div 
                            className="w-12 h-0.5 bg-white mt-4"
                            initial={{ width: "12px" }}
                            animate={{
                              width: hoveredStory === story.id ? "40px" : "12px",
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Share Your Story - continuous scroll with unified background */}
        <section 
          ref={sectionRefs.share} 
          className="py-24 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/ocean-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.2) blur(2px)",
              opacity: 0.6
            }}
          />
          
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0.7) 20%, rgba(18,18,18,0.7) 80%, #0a0a0a 100%)"
            }}
          />
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 text-center relative z-10 max-w-[1920px] w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Replaced external SVG with inline SVG */}
                <motion.svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mx-auto mb-6"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path d="M20 5v14"></path>
                  <path d="M16 5V2"></path>
                  <path d="M16 22v-3"></path>
                  <path d="M12 5V2"></path>
                  <path d="M12 22v-3"></path>
                  <path d="M8 5V2"></path>
                  <path d="M8 22v-3"></path>
                  <path d="M4 5v14"></path>
                  <path d="M16 16l-4-4 4-4"></path>
                  <path d="M8 12h8"></path>
                </motion.svg>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-5xl font-['Sora',Helvetica] text-white leading-tight mb-6"
                animate={{ 
                  textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 15px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"],
                }}
                transition={{ 
                  textShadow: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                }}
              >
                Share Your Story
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl font-['Sora',Helvetica] text-neutral-300 leading-relaxed mt-5 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Contribute to our growing archive of digital heritage and cultural
                narratives. Your voice matters in preserving the rich tapestry of experiences.
              </motion.p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button className="bg-white text-neutral-900 rounded-full h-14 px-8 font-['Sora',Helvetica] text-lg hover:bg-neutral-200 hover:text-black transition-all duration-300 shadow-xl hover:shadow-white/20">
                  Submit Your Story
                </Button>
              </motion.div>
              
              <motion.div
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {[
                  { icon: "📝", title: "Write", desc: "Share your written narrative" },
                  { icon: "🎙️", title: "Record", desc: "Capture your voice and stories" },
                  { icon: "📸", title: "Visualize", desc: "Submit photos and visual media" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-[#1a1a1a] p-6 rounded-lg"
                    whileHover={{ 
                      y: -5,
                      backgroundColor: "#2a2a2a",
                      transition: { duration: 0.3 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-['Sora',Helvetica] text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        <footer className="bg-[#0a0a0a] py-12 relative z-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 max-w-[1920px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-['Sora',Helvetica] text-white mb-4">Trace of the Tides</h3>
                <p className="text-gray-400 text-sm">Preserving heritage through digital storytelling and community engagement.</p>
                <motion.div 
                  className="w-12 h-0.5 bg-white mt-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: "48px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.div>
              
              {[
                { title: "Programs", links: ["Coast", "Boat", "Azure", "Commons"] },
                { title: "Resources", links: ["Stories", "Archive", "Research", "Media"] },
                { title: "Connect", links: ["About Us", "Contact", "Support", "Donate"] }
              ].map((col, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <h3 className="text-lg font-['Sora',Helvetica] text-white mb-4">{col.title}</h3>
                  <ul className="space-y-2">
                    {col.links.map((link, i) => (
                      <motion.li key={i} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">{link}</a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-gray-500 text-sm">© 2024 Trace of the Tides. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <motion.a 
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" fill="black" />
                    <circle cx="18" cy="6" r="1.5" fill="black" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon fill="black" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};