"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBlackButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export const AnimatedBlackButton: React.FC<AnimatedBlackButtonProps> = ({
  children,
  className,
  onClick,
  variant = "primary"
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative group overflow-hidden rounded-lg px-4 py-2 font-medium text-sm transition-all duration-300",
        variant === "primary" 
          ? "bg-black text-white border border-gray-800 hover:border-gray-600" 
          : "bg-gray-900 text-gray-100 border border-gray-700 hover:border-gray-500",
        className
      )}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-white/5 rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-white/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};