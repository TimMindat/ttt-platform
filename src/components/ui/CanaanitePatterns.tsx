import React from "react";
import { motion } from "framer-motion";

interface PatternProps {
  className?: string;
  color?: string;
  opacity?: number;
  animate?: boolean;
  variant?: "zigzag" | "waves" | "triangles" | "circles" | "grid";
}

export const CanaanitePattern: React.FC<PatternProps> = ({
  className = "",
  color = "currentColor",
  opacity = 0.1,
  animate = false,
  variant = "zigzag"
}) => {
  // Pattern variants based on Canaanite art
  const patterns = {
    zigzag: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0 40 L20 60 L40 40 L60 60 L80 40 L100 60 L100 100 L0 100 Z"
          fill={color}
          fillOpacity={opacity}
          initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    ),
    waves: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0 50 Q25 30 50 50 T100 50 V100 H0 Z"
          fill={color}
          fillOpacity={opacity}
          initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    ),
    triangles: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0 100 L50 0 L100 100 Z"
          fill={color}
          fillOpacity={opacity}
          initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    ),
    circles: (
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <pattern id="circlePattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <motion.circle
              cx="10"
              cy="10"
              r="5"
              fill={color}
              fillOpacity={opacity}
              initial={animate ? { scale: 0 } : { scale: 1 }}
              animate={animate ? { scale: 1 } : undefined}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circlePattern)" />
      </svg>
    ),
    grid: (
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <motion.path
              d="M0 0 L20 0 L20 20 L0 20 Z"
              stroke={color}
              strokeOpacity={opacity}
              strokeWidth="1"
              fill="none"
              initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
              animate={animate ? { pathLength: 1 } : undefined}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>
    )
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {patterns[variant]}
    </div>
  );
};

// Decorative divider inspired by Canaanite pottery patterns
export const CanaaniteDecorativeDivider: React.FC<{
  className?: string;
  color?: string;
  animate?: boolean;
}> = ({ className = "", color = "currentColor", animate = false }) => {
  return (
    <div className={`w-full flex items-center justify-center my-8 ${className}`}>
      <motion.div
        className="h-px bg-current w-1/4"
        initial={animate ? { width: 0 } : { width: "25%" }}
        animate={animate ? { width: "25%" } : undefined}
        transition={{ duration: 1 }}
        style={{ color }}
      />
      <motion.div 
        className="mx-4 flex items-center"
        initial={animate ? { scale: 0, rotate: -90 } : { scale: 1, rotate: 0 }}
        animate={animate ? { scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 3L16 7L12 11L8 7L12 3Z M12 13L16 17L12 21L8 17L12 13Z" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <motion.div
        className="h-px bg-current w-1/4"
        initial={animate ? { width: 0 } : { width: "25%" }}
        animate={animate ? { width: "25%" } : undefined}
        transition={{ duration: 1 }}
        style={{ color }}
      />
    </div>
  );
};

export default CanaanitePattern;