import React from 'react';
import { motion } from 'framer-motion';

interface CanaanitePatternProps {
  opacity?: number;
  animate?: boolean;
  className?: string;
}

const CanaanitePattern: React.FC<CanaanitePatternProps> = ({ 
  opacity = 0.05, 
  animate = true,
  className = ''
}) => {
  return (
    <motion.div 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{ opacity }}
      animate={animate ? {
        opacity: [opacity * 0.8, opacity * 1.2, opacity * 0.8],
      } : undefined}
      transition={animate ? {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      } : undefined}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="canaanitePattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Horizontal and vertical lines */}
            <path d="M0 40H80M40 0V80" stroke="white" strokeWidth="0.5" strokeDasharray="1 3"/>
            
            {/* Diagonal lines */}
            <path d="M0 0L80 80M80 0L0 80" stroke="white" strokeWidth="0.5" strokeDasharray="1 3"/>
            
            {/* Center circle */}
            <circle cx="40" cy="40" r="8" stroke="white" strokeWidth="0.5" fill="none"/>
            
            {/* Triangular elements */}
            <path d="M20 40L10 30L10 50L20 40Z" stroke="white" strokeWidth="0.5" fill="none"/>
            <path d="M60 40L70 30L70 50L60 40Z" stroke="white" strokeWidth="0.5" fill="none"/>
            
            {/* Small dots at intersections */}
            <circle cx="20" cy="20" r="1" fill="white"/>
            <circle cx="60" cy="20" r="1" fill="white"/>
            <circle cx="20" cy="60" r="1" fill="white"/>
            <circle cx="60" cy="60" r="1" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#canaanitePattern)" />
      </svg>
    </motion.div>
  );
};

export default CanaanitePattern;