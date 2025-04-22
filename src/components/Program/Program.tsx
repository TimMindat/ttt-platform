import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProgramProps {
  title: string;
  description: string;
  heroImage: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

const Program: React.FC<ProgramProps> = ({
  title,
  description,
  heroImage,
  content,
  backgroundColor = "#121212",
  textColor = "#ffffff",
  accentColor = "#3b82f6",
}) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Parallax effects
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  
  // Split content into paragraphs for animation
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor, color: textColor }}
    >
      {/* Header with back button */}
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)"
        }}
      >
        <motion.button
          className="flex items-center text-white hover:text-neutral-300 transition-colors"
          onClick={() => navigate('/')}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="mr-2" />
          <span>Back to Home</span>
        </motion.button>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          scale: heroScale,
          opacity: heroOpacity
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80" />
        
        <motion.div 
          className="absolute bottom-0 left-0 w-full p-8 md:p-20"
          style={{ y: titleY }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Content Section */}
      <motion.section 
        ref={contentRef}
        className="relative z-10 bg-opacity-95 py-16 px-6 md:px-20"
        style={{ backgroundColor }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          {paragraphs.map((paragraph, index) => (
            <motion.p 
              key={index}
              className="text-lg md:text-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              {paragraph}
            </motion.p>
          ))}
          
          {/* Visual element */}
          <motion.div 
            className="w-full h-[2px] my-12"
            style={{ backgroundColor: accentColor }}
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
          
          {/* Call to action */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-3 rounded-full text-lg font-medium"
              style={{ 
                backgroundColor: accentColor,
                color: backgroundColor
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Program
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Program;