'use client';

import { useScroll, useTransform, motion, MotionValue } from 'motion/react';
import React, { useRef, forwardRef, useState } from 'react';
import { ContainerTextFlip } from '@/components/ui/container-text-flip';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { FlipWords } from '@/components/ui/flip-words';
import { Liquid } from '@/components/ui/button-1';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import { CometCard } from '@/components/ui/comet-card';

const LIQUID_COLORS = {
  color1: '#FFFFFF',
  color2: '#1E10C5',
  color3: '#9089E2',
  color4: '#FCFCFE',
  color5: '#F9F9FD',
  color6: '#B2B8E7',
  color7: '#0E2DCB',
  color8: '#0017E9',
  color9: '#4743EF',
  color10: '#7D7BF4',
  color11: '#0B06FC',
  color12: '#C5C1EA',
  color13: '#1403DE',
  color14: '#B6BAF6',
  color15: '#C1BEEB',
  color16: '#290ECB',
  color17: '#3F4CC0',
} as const;

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8], { clamp: false });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5], { clamp: false });
    const [isHovered, setIsHovered] = useState(false);
    return (
    <motion.section
      style={{ scale, rotate }}
      className='sticky font-semibold top-0 h-screen bg-gradient-to-t to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center text-black will-change-transform'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

      <div className='w-full px-6 flex flex-col items-center justify-center gap-6'>
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <span className='text-6xl md:text-7xl font-bold tracking-tight text-center'>Heyy.. I&apos;m</span>
          <ContainerTextFlip words={["Sambhav", "Developer", "Designer"]} />
        </div>
        <div className='max-w-4xl text-center'>
          {/* <TextGenerateEffect
            className='text-xl md:text-2xl font-semibold'
            words={'I build thoughtful end-to-end digital products with clean code and clear intent, made to be scalable, user-first, and'} 
          /> */}
          <div className='mt-2 text-xl md:text-2xl font-semibold'>
          I build thoughtful end-to-end digital products with clean code and clear intent, made to be scalable, user-first, and
          <span className='font-bold md:text-3xl text-2xl' ><FlipWords words={["creative", "adaptive", "modern", "impactful", "seamless"]} /></span>
            
          </div>
        </div>

        {/* Buttons */}
        <div className='mt-8 flex items-center justify-center gap-4'>
          {/* Resume - Liquid button */}
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

          {/* Explore me - Hover border gradient */}
          <HoverBorderGradient
            as="a"
            href="#explore"
            containerClassName="rounded-full"
            className="bg-black dark:bg-white dark:text-black text-white flex items-center space-x-2 px-6 py-3"
          >
            <span>Explore me</span>
          </HoverBorderGradient>
        </div>

        {/* Marquee */}
        <div className='mt-10 w-full'>
          <VelocityScroll
            text="Creative • Adaptive • Modern • Reliable • Curious • Precise • Intentional • Scalable"
            default_velocity={5}
            className="font-bold text-neutral-900 dark:text-neutral-100 text-xl md:text-3xl"
          />
        </div>
      </div>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1], { clamp: false });
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0], { clamp: false });

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t to-[#1a1919] from-[#06060e] text-white will-change-transform'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <article className='container mx-auto relative z-10 '>
        <h1 className='text-6xl leading-[100%] py-10 font-semibold  tracking-tight '>
        Turning ideas into elegant code,<br /> and code into meaningful experiences.
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <CometCard className="[transform-style:preserve-3d]">
            <div className="relative w-full h-full">
              <img
                src='https://images.unsplash.com/photo-1717618389115-88db6d7d8f77?w=500&auto=format&fit=crop'
                alt='img'
                className='object-cover w-full rounded-md h-full'
              />
            </div>
          </CometCard>
          
          <CometCard className="[transform-style:preserve-3d]">
            <div className="relative w-full h-full">
              <img
                src='https://images.unsplash.com/photo-1717618389115-88db6d7d8f77?w=500&auto=format&fit=crop'
                alt='img'
                className='object-cover w-full rounded-md h-full'
              />
            </div>
          </CometCard>
          <CometCard className="[transform-style:preserve-3d]">
            <div className="relative w-full h-full">
              <img
                src='https://images.unsplash.com/photo-1717588604557-55b2888f59a6?w=500&auto=format&fit=crop'
                alt='img'
                className='object-cover w-full rounded-md h-full'
              />
            </div>
          </CometCard>
          <CometCard className="[transform-style:preserve-3d]">
            <div className="relative w-full h-full">
              <img
                src='https://images.unsplash.com/photo-1713417338603-1b6b72fcade2?w=500&auto=format&fit=crop'
                alt='img'
                className='object-cover w-full rounded-md h-full'
              />
            </div>
          </CometCard>
        </div>
      </article>
    </motion.section>
  );
};

const Component = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <main ref={container} className='relative h-[200vh] bg-black'>
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <footer className='group bg-[#06060e] '>
          <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
            ui-layout
          </h1>
          <div className='bg-black text-white h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
        </footer>
      </main>
    </>
  );
});

Component.displayName = 'Component';

export default Component;