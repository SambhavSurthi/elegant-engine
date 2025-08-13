'use client';

import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cover } from '@/components/ui/cover';
import { VerticalCutReveal, type VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const [isTitleActive, setIsTitleActive] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      const containerEl = containerRef.current;
      if (!sectionEl || !containerEl) return;

      // Set initial state (white background, black text)
      gsap.set([sectionEl, containerEl], { backgroundColor: "#ffffff" });
      gsap.set([sectionEl, containerEl], { color: "#000000" });

      const toDark = () => {
        gsap.to([sectionEl, containerEl], {
          backgroundColor: "#000000",
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to([sectionEl, containerEl], {
          color: "#ffffff",
          duration: 1.2,
          ease: "power2.out",
        });
        titleAnimRef.current?.startAnimation();
        setIsTitleActive(true);
      };

      const toLight = () => {
        gsap.to([sectionEl, containerEl], {
          backgroundColor: "#ffffff",
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to([sectionEl, containerEl], {
          color: "#000000",
          duration: 1.2,
          ease: "power2.out",
        });
        titleAnimRef.current?.reset();
        setIsTitleActive(false);
      };

      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        onEnter: toDark,
        onLeaveBack: toLight,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full md:pl-10 bg-white text-black">
      <div ref={containerRef} className="container mx-auto px-6 tracking-wide py-20">
        <h2 className="text-6xl md:text-8xl md:mr-20">
          <VerticalCutReveal
            ref={titleAnimRef}
            splitBy="characters"
            staggerDuration={0.03}
            staggerFrom="center"
            transition={{ type: "spring", stiffness: 230, damping: 26 }}
            containerClassName="inline-block"
            elementLevelClassName="will-change-transform"
            autoStart={false}
          >
            {`Turning passion into code, and code into `}
          </VerticalCutReveal>
          <Cover>skillset</Cover>.
        </h2>
        {/* Adding Cards Here */}

        
      </div>
    </section>
  );
};

export default memo(Skills);

