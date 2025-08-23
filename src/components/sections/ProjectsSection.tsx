'use client';

import { useTransform, motion, MotionValue } from 'motion/react';
import React, { memo, useEffect, useState } from 'react';
import { preloadImages } from '@/components/utils/performance';
import { CometCard } from '@/components/ui/comet-card';
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card';
import simpleImageLoader from '@/components/utils/simpleImageLoader';
// Sections below are rendered outside this motion section to avoid scroll trapping

interface ProjectsSectionProps {
  scrollYProgress: MotionValue<number>;
}

interface ProjectImage {
  src: string;
  alt: string;
  className: string;
  position: string;
}

// Optimized image data with proper sizing and positioning for draggable cards
const PROJECT_IMAGES: ProjectImage[] = [
  // {
  //   src: 'https://images.unsplash.com/photo-1717893777838-4e222311630b?w=800&auto=format&fit=crop&q=80',
  //   alt: 'Project showcase 1',
  //   className: 'object-cover w-full rounded-md h-full'
  // },
  {
    src: '/personal/MyPic1.jpg',
    alt: 'Project showcase 1',
    className: 'object-cover w-full rounded-md h-full',
    position: 'absolute top-4 left-[10%] rotate-[-5deg] sm:top-10 sm:left-[20%]'
  },
  {
    src: '/personal/MyPic2.jpg',
    alt: 'Project showcase 2',
    className: 'object-cover w-full rounded-md h-full',
    position: 'absolute top-32 left-[15%] rotate-[-7deg] sm:top-40 sm:left-[25%]'
  },
  {
    src: '/personal/MyPic3.jpg',
    alt: 'Project showcase 3',
    className: 'object-cover w-full rounded-md h-full',
    position: 'absolute top-2 left-[30%] rotate-[8deg] sm:top-5 sm:left-[40%]'
  },
  {
    src: '/personal/MyPic4.jpg',
    alt: 'Project showcase 4',
    className: 'object-cover w-full rounded-md h-full',
    position: 'absolute top-24 left-[45%] rotate-[10deg] sm:top-32 sm:left-[55%]'
  }
];

// Preload images immediately when this module loads - MOST AGGRESSIVE APPROACH
if (typeof window !== 'undefined') {
  PROJECT_IMAGES.forEach(img => {
    // Method 1: Link preload
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    // Method 2: Create actual image to force loading
    const forceImg = new Image();
    forceImg.src = img.src;
    forceImg.fetchPriority = 'high';
    
    // Method 3: Add to browser cache with multiple sizes
    const sizes = ['', '?w=400', '?w=800', '?w=1200'];
    sizes.forEach(size => {
      const cacheImg = new Image();
      cacheImg.src = img.src + size;
      cacheImg.fetchPriority = 'high';
    });
  });
}

// Memoized background grid component
const BackgroundGrid = memo(() => (
  <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
));

BackgroundGrid.displayName = 'BackgroundGrid';

// Ultra-optimized image component with aggressive loading
const ProjectImage = memo(({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if image is already loaded from preloader
  React.useEffect(() => {
    console.log(`🔍 ProjectImage useEffect for ${src}, isLoaded: ${simpleImageLoader.isImageLoaded(src)}`);
    if (simpleImageLoader.isImageLoaded(src)) {
      console.log(`✅ ProjectImage setting loaded state for ${src}`);
      setImageLoaded(true);
      // Remove loading skeleton immediately
      const skeleton = document.querySelector(`[data-src="${src}"] .loading-skeleton`);
      if (skeleton) {
        console.log(`🗑️ Removing skeleton for ${src}`);
        skeleton.remove();
      }
    }
    
    // Also check if image is already in browser cache
    const img = new Image();
    img.onload = () => {
      console.log(`✅ ProjectImage browser cache hit for ${src}`);
      setImageLoaded(true);
      // Remove loading skeleton
      const skeleton = document.querySelector(`[data-src="${src}"] .loading-skeleton`);
      if (skeleton) {
        skeleton.remove();
      }
    };
    img.src = src;
  }, [src]);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ProjectImage`}
      loading="eager"
      decoding="sync"
      fetchPriority="high"
      crossOrigin="anonymous"
      onLoad={(e) => {
        console.log(`✅ ProjectImage loaded: ${src}`);
        setImageLoaded(true);
        // Remove loading skeleton
        const skeleton = e.currentTarget.parentElement?.querySelector('.loading-skeleton');
        if (skeleton) {
          skeleton.remove();
        }
      }}
      onError={(e) => {
        console.warn(`❌ ProjectImage failed: ${src}`);
        setImageError(true);
        // Remove loading skeleton on error too
        const skeleton = e.currentTarget.parentElement?.querySelector('.loading-skeleton');
        if (skeleton) {
          skeleton.remove();
        }
      }}
      style={{
        opacity: imageLoaded || imageError || simpleImageLoader.isImageLoaded(src) ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
});

ProjectImage.displayName = 'ProjectImage';

// Memoized projects grid component with draggable cards
const ProjectsGrid = memo(() => (
  <DraggableCardContainer className="relative flex min-h-[70vh] w-full items-center justify-center overflow-clip bg-transparent">
    {/* {PROJECT_IMAGES.map((image, index) => (
      <CometCard key={index} className='[transform-style:preserve-3d]'>
        <div className='relative w-full aspect-[3/4]'>
          <ProjectImage
            src={image.src}
            alt={image.alt}
            className={'absolute inset-0 w-full h-full object-cover rounded-md'}
          />
        </div>
      </CometCard>
    ))} */}

    {/* Background Text */}
    <p className="absolute top-1/2 mx-auto max-w-lg -translate-y-3/4 text-center text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold text-neutral-400 dark:text-neutral-800 z-0">
    "Collecting experiences along the way,
    and turning them into something meaningful."
    </p>

    {/* Draggable Cards Implementation */}
    {PROJECT_IMAGES.map((image, index) => (
      <DraggableCardBody key={index} className={image.position}>
        <div className='relative w-full aspect-[3/4]' data-src={image.src}>
          {/* Loading skeleton */}
          <div className="loading-skeleton absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-800 animate-pulse rounded-md" />
          
          <ProjectImage
            src={image.src}
            alt={image.alt}
            className={'absolute inset-0 w-full h-full object-cover rounded-md pointer-events-auto'}
          />
        </div>
        <h3 className="mt-2 sm:mt-4 text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold text-neutral-700 dark:text-neutral-300">
          {image.alt}
        </h3>
      </DraggableCardBody>
    ))}
  </DraggableCardContainer>
));

ProjectsGrid.displayName = 'ProjectsGrid';

// Memoized section content
const SectionContent = memo(() => (
  <article className='relative z-10 px-6'>
    <h1 className='text-4xl md:text-6xl leading-[100%] py-10 font-semibold tracking-tight text-start'>
    Turning ideas into elegant code, <br /> and code into meaningful experiences.
    </h1>
    <ProjectsGrid />
  </article>
));

SectionContent.displayName = 'SectionContent';

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1], { clamp: false });
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0], { clamp: false });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // FORCE image loading - load everything immediately
  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log('🚀 Checking image loading status...');
        
        // Check if images are already loaded (from HTML preloading)
        const currentProgress = simpleImageLoader.getLoadingProgress();
        if (currentProgress >= 100) {
          console.log('✅ Images already loaded! Showing section immediately');
          setLoadingProgress(100);
          setImagesLoaded(true);
          return;
        }
        
        // Show progress based on actual loaded images
        const progressInterval = setInterval(() => {
          const progress = simpleImageLoader.getLoadingProgress();
          setLoadingProgress(progress);
          
          // If all images are loaded, stop the interval
          if (progress >= 100) {
            clearInterval(progressInterval);
          }
        }, 200);
        
        // Wait for the simple loader to finish
        await simpleImageLoader.waitForImages();
        
        clearInterval(progressInterval);
        setLoadingProgress(100);
        
        // Mark as loaded
        setTimeout(() => setImagesLoaded(true), 500);
        
      } catch (error) {
        console.error('Image loading failed:', error);
        // Fallback: show anyway after 3 seconds
        setTimeout(() => {
          console.log('⚠️ Fallback: Showing section after timeout');
          setLoadingProgress(100);
          setImagesLoaded(true);
        }, 3000);
      }
    };
    
    loadImages();
  }, []);

  // Force show images after a delay if they're still not visible
  useEffect(() => {
    if (imagesLoaded) {
      const forceShowTimer = setTimeout(() => {
        console.log('🔧 Force showing all images...');
        // Force all images to be visible
        const allImages = document.querySelectorAll('.ProjectImage img');
        allImages.forEach(img => {
          (img as HTMLElement).style.opacity = '1';
        });
        
        // Remove all loading skeletons
        const allSkeletons = document.querySelectorAll('.loading-skeleton');
        allSkeletons.forEach(skeleton => skeleton.remove());
      }, 1000);
      
      return () => clearTimeout(forceShowTimer);
    }
  }, [imagesLoaded]);

  // Periodic check to ensure images are visible
  useEffect(() => {
    if (imagesLoaded) {
      const visibilityCheck = setInterval(() => {
        const allImages = document.querySelectorAll('.ProjectImage img');
        let anyHidden = false;
        
        allImages.forEach(img => {
          const imgElement = img as HTMLImageElement;
          if (imgElement.style.opacity === '0' || imgElement.style.opacity === '') {
            anyHidden = true;
            console.log('🔧 Force showing hidden image:', imgElement.src);
            imgElement.style.opacity = '1';
          }
        });
        
        if (!anyHidden) {
          console.log('✅ All images are now visible');
          clearInterval(visibilityCheck);
        }
      }, 500);
      
      return () => clearInterval(visibilityCheck);
    }
  }, [imagesLoaded]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative min-h-[70vh] bg-gradient-to-t to-[#1a1919] from-[#06060e] text-white will-change-transform'
    >
      <BackgroundGrid />
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-gradient-to-t to-[#1a1919] from-[#06060e]">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-neutral-600 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-neutral-400 text-xl font-semibold mb-2">Loading Projects</p>
            <p className="text-neutral-500 text-sm mb-4">Preparing your portfolio showcase...</p>
            
            {/* Progress Bar */}
            <div className="w-64 h-3 bg-neutral-800 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-neutral-400 text-sm">{loadingProgress}% Complete</p>
            
            {/* Loading Status */}
            <div className="mt-4 text-xs text-neutral-500">
              <p>Images loaded: {simpleImageLoader.getLoadedCount()}/{simpleImageLoader.getTotalCount()}</p>
              <p className="mt-1">This ensures instant display when you reach the section</p>
            </div>
          </div>
        </div>
      )}
      <SectionContent />
    </motion.section>
  );
};

export default memo(ProjectsSection);
