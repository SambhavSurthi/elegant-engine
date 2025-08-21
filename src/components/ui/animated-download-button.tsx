"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedDownloadButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedDownloadButton: React.FC<AnimatedDownloadButtonProps> = ({
  onClick,
  className,
  children = "Download Resume"
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    console.log('AnimatedDownloadButton clicked!');
    e.stopPropagation(); // Prevent event bubbling to close popover
    if (isDownloading || isDownloaded) return;
    
    setIsDownloading(true);
    onClick();
    
    // Simulate download time
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsDownloaded(false);
      }, 2000);
    }, 1500);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isDownloading || isDownloaded}
             className={cn(
         "relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer pointer-events-auto",
         "bg-black text-white border border-gray-300 shadow-lg",
         "hover:bg-gray-800 hover:shadow-xl hover:scale-105",
         "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
         className
       )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ zIndex: 1000 }}
    >
      <motion.div
        animate={{
          rotate: isDownloading ? 360 : 0,
        }}
        transition={{
          duration: 1,
          repeat: isDownloading ? Infinity : 0,
          ease: "linear"
        }}
      >
        {isDownloaded ? (
          <Check className="w-4 h-4" />
        ) : (
          <Download className="w-4 h-4" />
        )}
      </motion.div>
      
      <motion.span
        animate={{
          opacity: isDownloading ? 0.7 : 1,
        }}
      >
        {isDownloading ? "Downloading..." : isDownloaded ? "Downloaded!" : children}
      </motion.span>
      
             {/* Animated background */}
       <motion.div
         className="absolute inset-0 rounded-lg bg-gray-200/20"
         animate={{
           scale: isDownloading ? [1, 1.1, 1] : 1,
           opacity: isDownloading ? [0.5, 0.8, 0.5] : 0,
         }}
         transition={{
           duration: 1.5,
           repeat: isDownloading ? Infinity : 0,
           ease: "easeInOut"
         }}
       />
    </motion.button>
  );
};
