"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { StarBorder } from "./star-border";
import { Send, MessageCircle } from "lucide-react";

export const MagneticButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) * 0.1;
      const y = (e.clientY - centerY) * 0.1;
      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      className="cursor-pointer"
    >
      <StarBorder className="transition-all duration-300 ease-out">
        <motion.div
          className="flex items-center gap-2 font-medium"
          animate={{
            opacity: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {isHovered ? (
            <>
              <span>Let's Collaborate</span>
              <MessageCircle size={16} />
            </>
          ) : (
            <>
              <span>Let's Connect</span>
              <Send size={16} />
            </>
          )}
        </motion.div>
      </StarBorder>
    </motion.div>
  );
};