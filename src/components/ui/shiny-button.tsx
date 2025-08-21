"use client";

import React from "react";
import { motion, type AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      initial={{ "--x": "100%", scale: 0.8 } as any}
      animate={{ "--x": "-100%", scale: 1 } as any}
      whileTap={{ scale: 0.95 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 5,
          mass: 0.5,
        },
      }}
      {...props}
      className={cn(
        "relative rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out bg-black text-white border border-white/20 hover:border-white/40",
        className
      )}
      style={{
        '--x': '100%',
      } as React.CSSProperties}
    >
      <span
        className="relative block w-full h-full text-sm uppercase tracking-wide text-white"
        style={{
          maskImage:
            "linear-gradient(-75deg, #ffffff calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #ffffff calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.1)_calc(var(--x)+20%),rgba(255,255,255,0.5)_calc(var(--x)+25%),rgba(255,255,255,0.1)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
};

export default { ShinyButton };
