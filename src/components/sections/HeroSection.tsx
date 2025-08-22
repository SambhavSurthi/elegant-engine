"use client";

import { useTransform, motion, MotionValue } from "motion/react";
import React, { useState, memo } from "react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { FlipWords } from "@/components/ui/flip-words";
import { Liquid } from "@/components/ui/button-1";
import { ShinyButton } from "@/components/ui/shiny-button";
import { PulseBeams } from "@/components/ui/pulse-beams";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { ResumePopover } from "@/components/ui/resume-popover";
import { VerticalScrollIndicator } from "@/components/ui/vertical-scroll-indicator";

import {
  LIQUID_COLORS,
  HERO_WORDS,
  FLIP_WORDS,
  MARQUEE_TEXT,
} from "@/components/constants/colors";

// Pulse beams configuration for left and right sides - following grid patterns
const leftBeams = [
  {
    path: "M50 200 L150 200 L150 300 L250 300 L250 400 L350 400",
    gradientConfig: {
      initial: {
        x1: "0%",
        x2: "0%",
        y1: "80%",
        y2: "100%",
      },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 1,
        delay: 0,
      },
    },
  },
  {
    path: "M100 150 L200 150 L200 250 L300 250 L300 350 L400 350",
    gradientConfig: {
      initial: {
        x1: "0%",
        x2: "0%",
        y1: "80%",
        y2: "100%",
      },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 1.5,
        delay: 0.5,
      },
    },
  },
  {
    path: "M75 100 L175 100 L175 200 L275 200 L275 300 L375 300",
    gradientConfig: {
      initial: {
        x1: "-40%",
        x2: "-10%",
        y1: "0%",
        y2: "20%",
      },
      animate: {
        x1: ["40%", "0%", "0%"],
        x2: ["10%", "0%", "0%"],
        y1: ["0%", "0%", "180%"],
        y2: ["20%", "20%", "200%"],
      },
      transition: {
        duration: 3.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 1,
        delay: 1,
      },
    },
  },
];

const rightBeams = [
  {
    path: "M450 200 L350 200 L350 300 L250 300 L250 400 L150 400",
    gradientConfig: {
      initial: {
        x1: "0%",
        x2: "0%",
        y1: "80%",
        y2: "100%",
      },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2.8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 1.2,
        delay: 0.3,
      },
    },
  },
  {
    path: "M400 150 L300 150 L300 250 L200 250 L200 350 L100 350",
    gradientConfig: {
      initial: {
        x1: "40%",
        x2: "50%",
        y1: "160%",
        y2: "180%",
      },
      animate: {
        x1: "0%",
        x2: "10%",
        y1: "-40%",
        y2: "-20%",
      },
      transition: {
        duration: 3.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 1.8,
        delay: 0.8,
      },
    },
  },
  {
    path: "M425 100 L325 100 L325 200 L225 200 L225 300 L125 300",
    gradientConfig: {
      initial: {
        x1: "0%",
        x2: "0%",
        y1: "80%",
        y2: "100%",
      },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2.7,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 1.3,
        delay: 1.2,
      },
    },
  },
];

const gradientColors = {
  start: "#18CCFC",
  middle: "#6344F5",
  end: "#AE48FF",
};

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

// Memoized background grid component for performance
const BackgroundGrid = memo(() => (
  <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
));

BackgroundGrid.displayName = "BackgroundGrid";

// Memoized liquid button component
const LiquidButton = memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ResumePopover>
      {/* Desktop / Laptop Version */}
      <a
        href="#"
        className="hidden sm:inline-block relative w-44 h-[2.7em] mx-auto group dark:bg-black bg-white 
               dark:border-white border-black border-2 rounded-lg overflow-hidden"
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

      {/* Mobile Version */}
      <a
        href="#"
        className="sm:hidden relative inline-flex items-center justify-center gap-2 w-40 h-[2.7em] mx-auto
             rounded-lg bg-black text-white font-semibold transition-all duration-300 
             hover:scale-105 hover:bg-gray-900 active:scale-95"
        aria-label="Resume"
      >
        Resume
        {/* SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-8m0 8l-4-4m4 4l4-4M4 16v4h16v-4"
          />
        </svg>
      </a>
    </ResumePopover>
  );
});

LiquidButton.displayName = "LiquidButton";

// Memoized hero content component
const HeroContent = memo(() => (
  <div className="w-full px-6 flex flex-col items-center justify-center gap-6">
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="text-6xl md:text-8xl font-sans font-bold tracking-tight text-center">
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
    <div className="md:mt-8 flex items-center justify-center gap-4">
      <LiquidButton />

      <div className="hidden md:block">
        <ShinyButton
          onClick={() => {
            const skillsSection = document.querySelector("#skills");
            if (skillsSection) {
              skillsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Explore Skills
        </ShinyButton>
      </div>
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
      className="sticky font-semibold top-0 h-screen bg-gradient-to-t to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center text-black will-change-transform relative overflow-hidden"
    >
      <BackgroundGrid />

      {/* Left Pulse Beams - positioned beside the text */}
      <div className="absolute hidden md:block top-[82%] left-0   md:left-0 md:top-1/2 transform -translate-y-1/2 w-64 h-96 pointer-events-none">
        <PulseBeams
          beams={leftBeams}
          gradientColors={gradientColors}
          className="w-full h-full"
          width={384}
          height={384}
          baseColor="rgba(0,0,0,0.15)"
          accentColor="rgba(0,0,0,0.25)"
        />
      </div>

      {/* Right Pulse Beams - positioned beside the text */}
      <div className="absolute hidden md:block right-4 top-0  md:top-7 transform -translate-y-1/2 w-64 h-96 pointer-events-none">
        <PulseBeams
          beams={rightBeams}
          gradientColors={gradientColors}
          className="w-full h-full"
          width={384}
          height={384}
          baseColor="rgba(0,0,0,0.15)"
          accentColor="rgba(0,0,0,0.25)"
        />
      </div>

      {/* Vertical Scroll Indicator */}
      <VerticalScrollIndicator />

      <HeroContent />
    </motion.section>
  );
};

export default memo(HeroSection);
