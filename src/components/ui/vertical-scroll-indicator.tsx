"use client";

import React from 'react';
import { motion } from 'motion/react';

export const VerticalScrollIndicator: React.FC = () => {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 pointer-events-none">
      <div className="flex flex-col items-center gap-6">
        {/* Vertical Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider select-none"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          Scroll Down Smoothly
        </motion.div>

        {/* Animated SVG Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="relative"
        >
          <svg
            width="3"
            height="80"
            viewBox="0 0 3 80"
            className="overflow-visible"
          >
            {/* Background line */}
            <line
              x1="1.5"
              y1="0"
              x2="1.5"
              y2="80"
              stroke="rgba(156, 163, 175, 0.2)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Animated line */}
            <motion.line
              x1="1.5"
              y1="0"
              x2="1.5"
              y2="80"
              stroke="rgba(156, 163, 175, 0.6)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
            
            {/* Moving dot */}
            {/* <motion.circle
              cx="1.5"
              cy="0"
              r="4"
              fill="rgba(156, 163, 175, 0.8)"
              initial={{ cy: 0 }}
              animate={{ cy: 80 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            /> */}
            
            {/* Glow effect */}
            <motion.circle
              cx="1.5"
              cy="0"
              r="1"
              fill="rgba(156, 163, 175, 0.1)"
              initial={{ cy: 0, scale: 0.5 }}
              animate={{ 
                cy: 80, 
                scale: [0.5, 1, 0.5] 
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};
