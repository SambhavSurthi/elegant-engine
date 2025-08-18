'use client';

import { useTransform, motion, MotionValue } from 'motion/react';
import React, { memo, useEffect } from 'react';
import { preloadImages } from '@/components/utils/performance';
import { CometCard } from '@/components/ui/comet-card';
// Sections below are rendered outside this motion section to avoid scroll trapping

interface ProjectsSectionProps {
  scrollYProgress: MotionValue<number>;
}

// Optimized image data with proper sizing
const PROJECT_IMAGES = [
  // {
  //   src: 'https://images.unsplash.com/photo-1717893777838-4e222311630b?w=800&auto=format&fit=crop&q=80',
  //   alt: 'Project showcase 1',
  //   className: 'object-cover w-full rounded-md h-full'
  // },
  {
    src: 'personal/MyPic1.jpg',
    alt: 'Project showcase 2',
    className: 'object-cover w-full rounded-md h-full'
  },
  {
    src: 'personal/MyPic2.jpg',
    alt: 'Project showcase 2',
    className: 'object-cover w-full rounded-md h-full'
  },
  {
    src: 'personal/MyPic3.jpg',
    alt: 'Project showcase 3',
    className: 'object-cover w-full rounded-md h-full'
  },
  {
    src: 'personal/MyPic4.jpg',
    alt: 'Project showcase 4',
    className: 'object-cover w-full rounded-md h-full'
  }
] as const;

// Memoized background grid component
const BackgroundGrid = memo(() => (
  <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
));

BackgroundGrid.displayName = 'BackgroundGrid';

// Memoized image component with lazy loading
const ProjectImage = memo(({ src, alt, className }: { src: string; alt: string; className: string }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    decoding="async"
  />
));

ProjectImage.displayName = 'ProjectImage';

// Memoized projects grid component
const ProjectsGrid = memo(() => (
  <div className='grid grid-cols-4 gap-2 sm:gap-3 md:gap-4'>
    {PROJECT_IMAGES.map((image, index) => (
      <CometCard key={index} className='[transform-style:preserve-3d]'>
        <div className='relative w-full aspect-[3/4]'>
          <ProjectImage
            src={image.src}
            alt={image.alt}
            className={'absolute inset-0 w-full h-full object-cover rounded-md'}
          />
        </div>
      </CometCard>
    ))}
  </div>
));

ProjectsGrid.displayName = 'ProjectsGrid';

// Memoized section content
const SectionContent = memo(() => (
  <article className='container mx-auto relative z-10 px-6'>
    <h1 className='text-4xl md:text-6xl leading-[100%] py-10 font-semibold tracking-tight'>
    Turning ideas into elegant code, <br /> and code into meaningful experiences.
    </h1>
    <ProjectsGrid />
  </article>
));

SectionContent.displayName = 'SectionContent';

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1], { clamp: false });
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0], { clamp: false });

  // Preload images for better performance
  useEffect(() => {
    const imageSrcs = PROJECT_IMAGES.map(img => img.src);
    preloadImages(imageSrcs).catch(console.error);
  }, []);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t to-[#1a1919] from-[#06060e] text-white will-change-transform'
    >
      <BackgroundGrid />
      <SectionContent />
    </motion.section>
  );
};

export default memo(ProjectsSection);
