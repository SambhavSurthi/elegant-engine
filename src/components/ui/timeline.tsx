"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, type VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { TextRevealByWord } from "@/components/ui/text-reveal";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const titleAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const paragraphAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const [isSectionActive, setIsSectionActive] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }

    const handleResize = () => {
      if (ref.current) {
        setHeight(ref.current.scrollHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const toActive = () => {
        titleAnimRef.current?.startAnimation();
        paragraphAnimRef.current?.startAnimation();
        setIsSectionActive(true);
      };

      const toInactive = () => {
        titleAnimRef.current?.reset();
        paragraphAnimRef.current?.reset();
        setIsSectionActive(false);
      };

      ScrollTrigger.create({
        trigger: containerEl,
        start: "top center",
        onEnter: toActive,
        onLeaveBack: toInactive,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black dark:bg-white font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-5xl md:text-7xl mb-4 text-white dark:text-black max-w-4xl">
          <VerticalCutReveal
            ref={titleAnimRef}
            splitBy="characters"
            staggerDuration={0.01}
            staggerFrom="center"
            transition={{ type: "spring", stiffness: 230, damping: 26 }}
            containerClassName="inline-block"
            elementLevelClassName="will-change-transform"
            autoStart={false}
          >
            Professional Experience
          </VerticalCutReveal>
        </h2>
        <div className="text-neutral-300 dark:text-neutral-700 text-sm md:text-xl max-w-lg">
          <TextRevealByWord
            className=""
            text="My journey in software development and the skills I've acquired along the way."
          />
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 dark:bg-neutral-200 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white dark:text-black">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white dark:text-black">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Beam */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-200 dark:via-neutral-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
