'use client';

import { useScroll, motion } from 'motion/react';
import React, { useRef, memo } from 'react';
import { HeroSection, ProjectsSection, Aboutme, Skills } from './index';

const ScrollContainer: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main className='relative bg-black'>
      {/* Keep the original scrollYProgress mapping to only the first two sections */}
      <div ref={container} className='relative h-[200vh]'>
        <HeroSection scrollYProgress={scrollYProgress} />
        <ProjectsSection scrollYProgress={scrollYProgress} />
      </div>
      {/* Render long content sections outside the h-screen motion section to allow full-page scrolling */}
      <Aboutme />
      <Skills />
    </main>
  );
};

export default memo(ScrollContainer);
