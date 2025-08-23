"use client";

import React, { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { projectsData } from "@/data/project-data";

// Filter projects to only show mainScreen: true in horizontal scroll
const mainScreenProjects = projectsData.filter(project => project.mainScreen);

// Horizontal scroll projects section using GSAP ScrollTrigger
// - Pins the section while scrolling
// - Slides cards horizontally, one-by-one
// - Each card is full screen footprint; inner card content fits 80% height, 90% width
// - Last slide shows a circular button linking to All Projects page

const CARD_HORIZONTAL_GAP = 24; // pixels between cards to avoid edge clash

const ProjectHorizontalScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;
    if (!sectionEl || !trackEl) return;

    const ctx = gsap.context(() => {
      // Helper function to get current viewport dimensions
      const getViewportDimensions = () => ({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Helper function to calculate scroll distance
      const calculateScrollDistance = () => {
        const slides = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-slide]"));
        const { width: viewportWidth } = getViewportDimensions();
        
        // On mobile, reduce the gap between cards for better UX
        const isMobile = viewportWidth < 768;
        const mobileGap = isMobile ? 12 : CARD_HORIZONTAL_GAP;
        
        const gapTotal = Math.max(0, slides.length - 1) * mobileGap;
        const totalWidth = slides.length * viewportWidth + gapTotal;
        const scrollDistance = totalWidth - viewportWidth;
        
        return { scrollDistance, totalWidth, mobileGap };
      };

      // Initialize scroll trigger
      let horizontalTween: gsap.core.Tween;
      let scrollTriggers: ScrollTrigger[] = [];

      const initializeScrollTrigger = () => {
        // Kill existing animations
        if (horizontalTween) horizontalTween.kill();
        scrollTriggers.forEach(st => st.kill());
        scrollTriggers = [];

        const { scrollDistance, totalWidth, mobileGap } = calculateScrollDistance();
        
        // Ensure track has calculated width explicitly for proper measure
        trackEl.style.width = `${totalWidth}px`;

        // Base horizontal translate animation tied to scroll
        horizontalTween = gsap.to(trackEl, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              // Ensure we're at the start when refreshing
              gsap.set(trackEl, { x: 0 });
            },
          },
        });

        // Per-card entrance effects
        const slides = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-slide]"));
        slides.forEach((slide, idx) => {
          const media = slide.querySelector("[data-media]");
          const body = slide.querySelector("[data-body]");
          const chips = slide.querySelectorAll("[data-chip]");

          // Calculate slide start position based on current viewport
          const { width: viewportWidth } = getViewportDimensions();
          const slideStart = (idx * viewportWidth + Math.max(0, idx) * mobileGap) / scrollDistance;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: () => `top top+=${slideStart * scrollDistance}`,
              end: () => `top top+=${(slideStart + 0.6) * scrollDistance}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .fromTo(
              media,
              { opacity: 0, y: 40, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.6 },
              0
            )
            .fromTo(
              body,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
              0.1
            )
            .fromTo(
              chips,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, stagger: 0.05, ease: "power2.out", duration: 0.4 },
              0.15
            );

          // Store scroll trigger for cleanup
          const st = timeline.scrollTrigger;
          if (st) scrollTriggers.push(st);
        });
      };

      // Initialize on mount
      initializeScrollTrigger();

      // Refresh measurements on resize with debouncing
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // Reset track position
          gsap.set(trackEl, { x: 0 });
          
          // Reinitialize scroll trigger with new dimensions
          initializeScrollTrigger();
          
          // Refresh all scroll triggers
          ScrollTrigger.refresh();
        }, 150); // Debounce resize events
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimeout);
        if (horizontalTween) horizontalTween.kill();
        scrollTriggers.forEach(st => st.kill());
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black text-white overflow-hidden select-none">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1000px_600px_at_50%_-20%,rgba(255,255,255,0.06),transparent)]" />
      
      {/* CSS for conic gradient animation */}
      <style>{`
        @keyframes spin {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>

      {/* Horizontal Track */}
      <div ref={trackRef} className="relative h-full flex items-center gap-3 md:gap-6 will-change-transform px-[2vw] md:px-[3vw]">
        {mainScreenProjects.map((project, idx) => (
          <article
            key={project.id}
            data-slide
            className="shrink-0 w-[100vw] h-[100vh] flex items-center justify-center"
          >
            {/* Inner card sized to 95vw x 85vh on mobile, 90vw x 90vh on desktop */}
            <div className="relative w-[95vw] h-[85vh] md:w-[90vw] md:h-[90vh] rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
              {/* Mobile Layout - Keep existing grid layout */}
              <div className="md:hidden grid grid-cols-1 h-full">
                {/* Media */}
                <div className="relative h-full w-full" data-media>
                  <div className="absolute inset-0">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/40" />
                  </div>
                </div>

                {/* Body */}
                <div className="relative h-full w-full p-4 flex flex-col justify-between" data-body>
                  <div>
                    <div className="text-xs text-zinc-400 mb-2">
                      {project.category} {project.year ? `• ${project.year}` : ""}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">{project.description}</p>

                    {/* Tech Chips */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          data-chip
                          className="px-2 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    {project.githubUrl && (
                      <button
                        onClick={() => window.open(project.githubUrl!, "_blank")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-900 transition-colors text-xs"
                      >
                        <Github className="h-3 w-3" /> GitHub
                      </button>
                    )}
                    {/* Only show Live button if project has isLive: true */}
                    {project.isLive && (
                      <button
                        onClick={() => window.open(project.liveUrl!, "_blank")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-900 transition-colors text-xs"
                      >
                        <ExternalLink className="h-3 w-3" /> Live
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Layout - Full image with hover overlay */}
              <div className="hidden md:block relative h-full w-full group">
                {/* Full-size background image */}
                <div className="absolute inset-0" data-media>
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
                    loading="lazy"
                  />
                  {/* Dark overlay that becomes more transparent on hover */}
                  <div className="absolute inset-0 bg-black/40 transition-all duration-500 group-hover:bg-black/20" />
                </div>

                {/* Content overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0" data-body>
                  {/* Category and year */}
                  <div className="text-sm text-black mb-3">
                    {project.category} {project.year ? `• ${project.year}` : ""}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-4xl font-bold text-black mb-4">{project.title}</h3>
                  
                  {/* Description */}
                  <p className="text-zinc-800 text-lg leading-relaxed mb-6 max-w-2xl">{project.description}</p>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        data-chip
                        className="px-3 py-1.5 rounded-full border border-zinc-600 bg-zinc-800/80 text-zinc-200 text-sm backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <button
                        onClick={() => window.open(project.githubUrl!, "_blank")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-600 bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors text-white backdrop-blur-sm"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </button>
                    )}
                    {/* Only show Live button if project has isLive: true */}
                    {project.isLive && (
                      <button
                        onClick={() => window.open(project.liveUrl!, "_blank")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-600 bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors text-white backdrop-blur-sm"
                      >
                        <ExternalLink className="h-4 w-4" /> Live
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Final Slide - CTA to All Projects */}
        <article data-slide className="shrink-0 w-[100vw] h-[100vh] flex items-center justify-center">
          <div className="relative w-[95vw] h-[85vh] md:w-[90vw] md:h-[80vh] rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center">
            <button
              onClick={() => (window.location.href = "/allprojects")}
              className="group relative inline-flex items-center justify-center h-20 w-20 md:h-28 md:w-28 rounded-full border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900 transition-colors"
              aria-label="See all projects"
           >
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_var(--angle),theme(colors.zinc.800),theme(colors.zinc.700),theme(colors.zinc.800))] [--angle:0deg] animate-[spin_4s_linear_infinite] opacity-60" />
              <ArrowRight className="relative h-6 w-6 md:h-8 md:w-8 text-white transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed">Explore All Works</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default memo(ProjectHorizontalScroll);


