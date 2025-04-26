import { ClockIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { CanaaniteIcons } from "../../components/icons/CanaaniteIcons";

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
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isManualChange, setIsManualChange] = useState<boolean>(false);
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    programs: useRef<HTMLDivElement>(null),
    stories: useRef<HTMLDivElement>(null),
    share: useRef<HTMLDivElement>(null),
  };
  
  // Add state for carousel
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
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
  
  // Handle carousel drag interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Scroll to specific card
  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    
    const cardWidth = carouselRef.current.offsetWidth * 0.8; // Approximate card width
    const newPosition = index * cardWidth;
    
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    // Update current slide
    changeSlide(index);
  };
  
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
  
  // Enhanced slide change function with animation
  const changeSlide = (index: number) => {
    // Ensure index is within bounds
    const newIndex = (index + suggestedContent.length) % suggestedContent.length;
    
    // Set the new slide with animation
    setCurrentSlide(newIndex);
    setIsManualChange(true);
    
    // Scroll to the card if carousel ref exists
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.8;
      const newPosition = newIndex * cardWidth;
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // Handle next/previous slide navigation
  const nextSlide = () => {
    changeSlide(currentSlide + 1);
  };
  
  const prevSlide = () => {
    changeSlide(currentSlide - 1);
  };
  
  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
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
  
  // New transformations for navbar elements
  const navItemsOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const navItemsScale = useTransform(scrollY, [0, 150], [1, 0.8]);
  const logoScale = useTransform(scrollY, [0, 150], [1, 0.9]);
  const logoPosition = useTransform(scrollY, [0, 150], ["50%", "0%"]);
  
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


  
  // Navigate to program page
  const navigateToProgram = (programTitle: string) => {
    const route = programTitle.toLowerCase();
    navigate(`/programs/${route}`);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Carousel */}
      <motion.div
        ref={sectionRefs.hero}
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{
          filter: heroBlur,
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        {/* Background image - still shows the current slide as background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${suggestedContent[currentSlide].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        </motion.div>

        {/* Content - Moved down to avoid navbar overlap */}
        <div className="container mx-auto px-4 md:px-20 relative z-10 mt-36 md:mt-48 mb-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Canaanite-inspired decorative element */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20H110" stroke="white" strokeWidth="1" strokeDasharray="1 3" />
                <path d="M60 5L60 35" stroke="white" strokeWidth="1" strokeDasharray="1 3" />
                <path d="M30 10L90 30" stroke="white" strokeWidth="1" strokeDasharray="1 3" />
                <path d="M30 30L90 10" stroke="white" strokeWidth="1" strokeDasharray="1 3" />
                <circle cx="60" cy="20" r="8" stroke="white" strokeWidth="1" />
                <path d="M40 20L20 10L20 30L40 20Z" stroke="white" strokeWidth="1" />
                <path d="M80 20L100 10L100 30L80 20Z" stroke="white" strokeWidth="1" />
              </svg>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-8 hero-title canaanite-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <AnimatePresence mode="wait" custom={currentSlide > (currentSlide - 1 + suggestedContent.length) % suggestedContent.length ? 1 : -1}>
                <motion.div
                  key={currentSlide}
                  custom={currentSlide > (currentSlide - 1 + suggestedContent.length) % suggestedContent.length ? 1 : -1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 }
                  }}
                >
                  {suggestedContent[currentSlide].title}
                </motion.div>
              </AnimatePresence>
            </motion.h1>

            {/* Canaanite-inspired decorative divider */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="canaanite-divider">
                <path d="M0 10H200" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
                <path d="M40 10L60 5L80 10L100 5L120 10L140 5L160 10" stroke="white" strokeWidth="1" />
                <circle cx="40" cy="10" r="3" fill="white" fillOpacity="0.6" />
                <circle cx="100" cy="10" r="3" fill="white" fillOpacity="0.6" />
                <circle cx="160" cy="10" r="3" fill="white" fillOpacity="0.6" />
              </svg>
            </motion.div>

            {/* Video Play Button with Canaanite-inspired design */}
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="group relative flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 canaanite-play-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                {/* Play icon */}
                <motion.div 
                  className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.5 
                  }}
                />
                
                {/* Canaanite-inspired ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ 
                    scale: [1, 1.5, 1.8],
                    opacity: [1, 0.5, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                
                {/* Additional Canaanite-inspired decorative elements */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M32 8L32 56" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
                    <path d="M8 32L56 32" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
                    <path d="M13 13L51 51" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
                    <path d="M13 51L51 13" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
                  </svg>
                </motion.div>
              </motion.button>
              
              {/* Watch text with Canaanite-inspired styling */}
              <motion.span 
                className="ml-4 text-white/90 text-lg font-medium canaanite-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                Watch Video
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Carousel Section */}
        <div className="w-full relative z-10 mt-auto mb-12">
          {/* Left Arrow with Canaanite-inspired design */}
          <motion.button
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-20 canaanite-nav-btn"
            onClick={prevSlide}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 4L12 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" strokeLinecap="round"/>
            </svg>
          </motion.button>
          
          {/* Right Arrow with Canaanite-inspired design */}
          <motion.button
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-20 canaanite-nav-btn"
            onClick={nextSlide}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 4L12 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" strokeLinecap="round"/>
            </svg>
          </motion.button>
          
          {/* Carousel Container with Canaanite-inspired styling */}
          <div 
            ref={carouselRef}
            className="carousel-container w-full overflow-x-auto hide-scrollbar px-4 md:px-20 canaanite-carousel"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <div className="carousel-track inline-flex space-x-4 py-4">
              {suggestedContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  className={`carousel-card flex-shrink-0 w-[80%] md:w-[40%] lg:w-[30%] rounded-xl overflow-hidden shadow-lg ${
                    currentSlide === index ? 'ring-2 ring-white/70 scale-[1.02]' : 'opacity-80'
                  } canaanite-card`}
                  onClick={() => scrollToCard(index)}
                  whileHover={{ scale: 1.03, opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative aspect-video">
                    <img 
                      src={content.image} 
                      alt={content.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Canaanite-inspired video indicator */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center canaanite-play-indicator"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5L18 12L8 19V5Z" fill="white"/>
                          <path d="M12 3V21" stroke="white" strokeWidth="0.5" strokeDasharray="1 2" strokeLinecap="round"/>
                          <path d="M3 12H21" stroke="white" strokeWidth="0.5" strokeDasharray="1 2" strokeLinecap="round"/>
                        </svg>
                      </motion.div>
                    </motion.div>
                    
                    {/* Canaanite-inspired title container */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-lg font-semibold line-clamp-2 canaanite-card-title">{content.title}</h3>
                      
                      {/* Canaanite-inspired decorative line */}
                      <motion.div 
                        className="w-12 h-0.5 bg-white/50 mt-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: "3rem" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                    
                    {currentSlide === index && (
                      <motion.div 
                        className="absolute inset-0 border-2 border-white/50 rounded-xl canaanite-active-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layoutId="activeCardHighlight"
                      >
                        {/* Canaanite-inspired corner decorations */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
                          <path d="M1 1V8H8" stroke="white" strokeWidth="1.5"/>
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 rotate-90">
                          <path d="M1 1V8H8" stroke="white" strokeWidth="1.5"/>
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-0 rotate-180">
                          <path d="M1 1V8H8" stroke="white" strokeWidth="1.5"/>
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -rotate-90">
                          <path d="M1 1V8H8" stroke="white" strokeWidth="1.5"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Progress indicator removed */}
        </div>
    
        {/* Scroll to Explore Indicator removed */}
      </motion.div>

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
        {/* Section indicator dots removed */}

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
          
          {/* Canaanite-inspired geometric overlay */}
          <div className="absolute inset-0 z-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="canaaniteGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20H40M20 0V40" stroke="white" strokeWidth="0.5" strokeDasharray="1 3"/>
                <path d="M0 0L40 40M40 0L0 40" stroke="white" strokeWidth="0.5" strokeDasharray="1 3"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#canaaniteGrid)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20 relative z-10 max-w-[1920px] w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              {/* Canaanite-inspired section header */}
              <div className="flex items-center mb-6">
                <motion.div 
                  className="mr-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5V35" stroke="white" strokeWidth="1.5"/>
                    <path d="M5 20H35" stroke="white" strokeWidth="1.5"/>
                    <path d="M10 10L30 30" stroke="white" strokeWidth="1" strokeDasharray="1 2"/>
                    <path d="M30 10L10 30" stroke="white" strokeWidth="1" strokeDasharray="1 2"/>
                    <circle cx="20" cy="20" r="3" fill="white"/>
                  </svg>
                </motion.div>
                
                <motion.h2
                  className="text-3xl md:text-5xl font-['Sora',Helvetica] text-white relative inline-block canaanite-section-title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Featured Programs
                </motion.h2>
              </div>
              
              {/* Canaanite-inspired decorative divider */}
              <motion.div 
                className="w-full h-[2px] relative overflow-hidden mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                <svg width="100%" height="2" viewBox="0 0 300 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1H300" stroke="white" strokeWidth="0.5" strokeDasharray="1 3"/>
                </svg>
              </motion.div>
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
                  className="relative overflow-hidden rounded-xl group"
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
                        className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Program icon based on title */}
                      <motion.div 
                        className="absolute top-4 right-4 z-20 text-white/80"
                        initial={{ opacity: 0, rotate: -10 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3 * program.id, duration: 0.6 }}
                      >
                        {program.title === "Boat" && <CanaaniteIcons.Harbour />}
                        {program.title === "Coast" && <CanaaniteIcons.Coast />}
                        {program.title === "Azure" && <CanaaniteIcons.Azure />}
                      </motion.div>
                      
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
                        
                        {/* Canaanite pattern overlay that appears on hover */}
                        <motion.div 
                          className="absolute inset-0 z-5 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredStory === story.id ? 0.15 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg width="100%" height="100%" viewBox="0 0 100 100">
                            <defs>
                              <pattern id={`storyPattern-${story.id}`} patternUnits="userSpaceOnUse" width="20" height="20">
                                <path 
                                  d="M0 10L10 0L20 10L10 20Z" 
                                  stroke="white" 
                                  strokeWidth="0.5" 
                                  fill="none"
                                />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#storyPattern-${story.id})`} />
                          </svg>
                        </motion.div>
                        
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
                className="inline-block"
              >
                <motion.button
                  className="bg-white text-neutral-900 rounded-full h-14 px-8 font-['Sora',Helvetica] text-lg hover:bg-neutral-200 hover:text-black transition-all duration-300 shadow-xl hover:shadow-white/20 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">Submit Your Story</span>
                </motion.button>
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