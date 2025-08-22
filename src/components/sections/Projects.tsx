"use client";

import React, { memo, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ProjectsBento from "@/components/ui/ruixen-bento-cards";
import ProjectHorizontalScroll from "@/components/sections/ProjectHorizontalScroll";
import { ExternalLink } from "lucide-react";
import { VerticalCutReveal, type VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { TextRevealByWord } from "@/components/ui/text-reveal";

const projectsData = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind"],
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team features.",
    technologies: ["React", "TypeScript", "Firebase", "Framer Motion"],
    githubUrl: "https://github.com/username/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
  },
  {
    title: "AI Dashboard",
    description:
      "Analytics dashboard with AI-powered insights, data visualization, and predictive modeling for business intelligence.",
    technologies: ["Next.js", "Python", "TensorFlow", "Chart.js", "PostgreSQL"],
    githubUrl: "https://github.com/username/ai-dashboard",
    liveUrl: "https://ai-dashboard-demo.com",
  },
  {
    title: "Social Media App",
    description:
      "Modern social platform with real-time messaging, content sharing, and advanced privacy controls.",
    technologies: ["React Native", "GraphQL", "AWS", "Redis"],
    githubUrl: "https://github.com/username/social-app",
    liveUrl: "https://social-app-demo.com",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio showcasing creative projects with smooth animations and responsive design.",
    technologies: ["React", "GSAP", "Three.js", "Tailwind CSS"],
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio-demo.com",
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const paragraphAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const [isSectionActive, setIsSectionActive] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

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
        trigger: sectionEl,
        start: "top center",
        onEnter: toActive,
        onLeaveBack: toInactive,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black dark:bg-black py-20" id="projects">
      <div className="container mx-auto px-6">
        {/* Animated Header */}
        <div className="text-start mb-16">
          <h2 className="text-6xl md:text-8xl font-semibold text-white dark:text-white mb-8">
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
              Building Ideas into Reality
            </VerticalCutReveal>
          </h2>
          <div className="text-xl text-zinc-600 md:text-xl md:max-w-[60%]">
            <TextRevealByWord
              className=""
              text="From concept to execution, I create projects that not only showcase skills but also bring meaningful solutions to life."
            />
          </div>
        </div>

        {/* Projects Horizontal Scroll (GSAP) */}
        <div className="relative -mx-6">
          <ProjectHorizontalScroll />
        </div>

        {/* Keep previous Bento layout commented as requested */}
        {/**
         * Previous bento grid implementation preserved for reference.
         *
         * <ProjectsBento projects={projectsData} />
         */}

        {/* Add the horizontal scrollable projects */}
        
      </div>
    </section>
  );
};

export default memo(Projects);
