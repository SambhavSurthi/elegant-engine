"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CertificationItem = {
  name: string; // certification name
  code: string; // credential id/code
  year: string; // completion year badge
  description: string; // short description
  src: string; // image url
  verifyLink: string; // external verification url
};

type Props = {
  items: CertificationItem[];
  autoplay?: boolean;
  className?: string;
};

export const AnimatedTestimonials: React.FC<Props> = ({
  items,
  autoplay = false,
  className,
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((prev) => (prev + 1) % items.length);
  const handlePrev = () =>
    setActive((prev) => (prev - 1 + items.length) % items.length);
  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(handleNext, 15000);
    return () => clearInterval(id);
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  const current = items[active];

  return (
    <div
      className={cn(
        "max-w-sm md:max-w-full mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16",
        className
      )}
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Image stack */}
        <div>
          <div className="relative h-64 md:h-96 w-full">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.src + index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : items.length + 2 - index,
                    y: isActive(index) ? [0, -60, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full rounded-3xl object-cover object-center shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05)]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-between flex-col py-2">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-4"
          >
            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {current.name}
            </h3>

            {/* Code + Year badge */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-neutral-800 text-neutral-100 border border-neutral-700">
                Code: {current.code}
              </span>
              <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-neutral-800 text-white shadow">
                {current.year}
              </span>
            </div>

            {/* Description */}
            <motion.p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-prose">
              {current.description.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            {/* Verify button */}
            <div className="pt-2">
              <a
                href={current.verifyLink}
                target="_blank"
                rel="noreferrer"
                className="relative inline-block px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl overflow-hidden group"
              >
                <span className="relative z-10">VERIFY</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              </a>
            </div>
          </motion.div>

          <a
            href="https://www.credly.com/users/sambhav-surthi"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block text-lg font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300
             after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-48"
          >
            Explore All Certificates
          </a>

          {/* Arrows */}
          <div className="flex gap-4 pt-8 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="h-16 w-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center group/button hover:bg-neutral-700 transition"
            >
              <IconArrowLeft className="h-8 w-8 text-neutral-100 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next"
              className="h-16 w-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center group/button hover:bg-neutral-700 transition"
            >
              <IconArrowRight className="h-8 w-8 text-neutral-100 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
