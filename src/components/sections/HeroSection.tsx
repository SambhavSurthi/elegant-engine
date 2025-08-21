"use client";

import { useTransform, motion, MotionValue } from "motion/react";
import React, { useState, memo } from "react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { FlipWords } from "@/components/ui/flip-words";
import { Liquid } from "@/components/ui/button-1";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  LIQUID_COLORS,
  HERO_WORDS,
  FLIP_WORDS,
  MARQUEE_TEXT,
} from "@/components/constants/colors";

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

// Memoized background grid component for performance
const BackgroundGrid = memo(() => (
  <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
));

BackgroundGrid.displayName = "BackgroundGrid";

// Mock resumes list – replace URLs with your actual public paths or remote links
const RESUMES: { name: string; url: string; fileName?: string }[] = [
  { name: "Primary Resume", url: "/resume.pdf", fileName: "Sambhav_Surthi_Resume.pdf" },
  { name: "Alternate Resume", url: "/resume-alt.pdf", fileName: "Sambhav_Surthi_Resume_Alt.pdf" },
];

// Memoized liquid button component (used as PopoverTrigger via asChild)
const LiquidButton = memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#"
      className="relative inline-block sm:w-44 w-40 h-[2.7em] mx-auto group dark:bg-black bg-white dark:border-white border-black border-2 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Resume"
    >
      <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] opacity-70 pointer-events-none">
        <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[6.5px]"></span>
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <Liquid isHovered={isHovered} colors={LIQUID_COLORS} />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[7.3px]"></div>
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
        <span className="absolute inset-0 rounded-lg bg-black"></span>
        <Liquid isHovered={isHovered} colors={LIQUID_COLORS} />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[15px] bg-[#006]"></span>
      </div>
      <span className="absolute inset-0 rounded-lg bg-transparent cursor-pointer grid place-items-center text-white font-semibold">
        Resume
      </span>
    </a>
  );
});

LiquidButton.displayName = "LiquidButton";

// Memoized hero content component
const HeroContent = memo(() => (
  <div className="w-full px-6 flex flex-col items-center justify-center gap-6">
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="text-6xl md:text-8xl font-bold tracking-tight text-center">
        Heyy.. I&apos;m
      </span>
      <ContainerTextFlip words={HERO_WORDS} />
    </div>

    <div className="max-w-4xl text-center">
      <div className="mt-2 text-lg md:text-2xl font-semibold">
        I build thoughtful end-to-end digital products with clean code and clear
        intent, made to be scalable, user-first, and
        <span className="font-bold md:text-3xl text-xl">
          <FlipWords words={FLIP_WORDS} />
        </span>
      </div>
    </div>

    {/* Buttons (only visible on md and above) */}
    <div className="mt-8 hidden md:flex items-center justify-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <LiquidButton />
        </PopoverTrigger>
        <PopoverContent
          sideOffset={10}
          className="w-[20rem] p-0 max-h-[60vh] overflow-y-auto overscroll-contain"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <h3 className="text-base font-semibold mb-3">Download Resume</h3>
            <ul className="space-y-3">
              {RESUMES.map((r) => (
                <li key={r.name} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.fileName ?? r.url}</p>
                  </div>
                  <button
                    className="shrink-0 inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        const anchor = document.createElement("a");
                        anchor.href = r.url;
                        anchor.setAttribute("download", r.fileName ?? "");
                        document.body.appendChild(anchor);
                        anchor.click();
                        document.body.removeChild(anchor);
                      } catch {}
                    }}
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>

      <a href="#explore">
        <HoverBorderGradient
          containerClassName="rounded-full"
          className="bg-black dark:bg-white dark:text-black text-white flex items-center space-x-2 px-6 py-3"
        >
          <span>Explore me</span>
        </HoverBorderGradient>
      </a>
    </div>

    {/* Marquee (only visible on md and above) */}
    <div className="mt-10 w-full hidden md:block">
      <VelocityScroll
        text={MARQUEE_TEXT}
        default_velocity={4}
        className="font-bold text-neutral-900 dark:text-neutral-100 text-xl md:text-3xl"
      />
    </div>
  </div>
));

HeroContent.displayName = "HeroContent";

const HeroSection: React.FC<HeroSectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8], {
    clamp: false,
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5], {
    clamp: false,
  });

  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky font-semibold top-0 h-screen bg-gradient-to-t to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center text-black will-change-transform"
    >
      <BackgroundGrid />
      <HeroContent />
    </motion.section>
  );
};

export default memo(HeroSection);
