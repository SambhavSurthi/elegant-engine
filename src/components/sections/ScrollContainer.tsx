'use client';

import { useScroll, motion } from 'motion/react';
import React, { useRef, memo } from 'react';
import { HeroSection, ProjectsSection, Footer } from './index';

const ScrollContainer: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container} className='relative h-[200vh] bg-black'>
      <HeroSection scrollYProgress={scrollYProgress} />
      <ProjectsSection scrollYProgress={scrollYProgress} />
      <Footer />
    </main>
  );
};

export default memo(ScrollContainer);
