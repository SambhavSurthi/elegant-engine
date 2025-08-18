'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initializes Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync.
// This component renders nothing and does not change existing animations.
const SmoothScroll = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1, // gentle but responsive
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic out
      touchMultiplier: 1.2,
      autoRaf: false,
    });

    const onLenisScroll = () => {
      // Keep GSAP scroll-based triggers in sync
      ScrollTrigger.update();
    };

    lenis.on('scroll', onLenisScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', onLenisScroll);
      cancelAnimationFrame(rafId);
      if (typeof (lenis as any).destroy === 'function') lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;


