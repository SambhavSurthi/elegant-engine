"use client";

import React, { memo, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cover } from "@/components/ui/cover";
import {
  VerticalCutReveal,
  type VerticalCutRevealRef,
} from "@/components/ui/vertical-cut-reveal";
import StackingCards from "@/components/ui/stacking-card";
import Experience from "./Experience";
import Projects from "./Projects";

const skillsProjects = [
  {
    title: "Frontend Development",
    description:
      "Building beautiful, responsive, and interactive user interfaces with modern frameworks and cutting-edge technologies.",
    link: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60",
    color: "white",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    title: "Backend Development",
    description:
      "Creating robust APIs, databases, and server-side solutions that power dynamic applications with scalability in mind.",
    link: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60",
    color: "white",
    skills: [
      "Node.js",
      "Python",
      "Express",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    title: "Mobile Development",
    description:
      "Developing cross-platform mobile applications that deliver native-like performance and user experience.",
    link: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60",
    color: "white",
    skills: ["React Native", "Flutter", "Expo", "iOS", "Android", "Firebase"],
  },
  {
    title: "DevOps & Cloud",
    description:
      "Streamlining development workflows with CI/CD pipelines, containerization, and cloud infrastructure management.",
    link: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&auto=format&fit=crop&q=60",
    color: "white",
    skills: [
      "Docker",
      "AWS",
      "Vercel",
      "GitHub Actions",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive user experiences and visually appealing interfaces that bridge design and development seamlessly.",
    link: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60",
    color: "white",
    skills: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Prototyping",
      "User Research",
      "Design Systems",
    ],
  },
];

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
    <section ref={sectionRef} className="w-full  bg-black text-white">
      <div
        ref={containerRef}
        className="container md:pl-10 mx-auto px-6 tracking-wide py-20"
      >
        <h2 className="text-6xl md:mt-32 md:text-8xl md:mr-20">
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

        {/* Stacking Cards Animation */}
        <div className="mt-20">
          <StackingCards projects={skillsProjects} />
        </div>

        <div className="">
          {/* Add the Experience Time Line Here */}
          <Experience />
        </div>
      </div>
      <div className="">
        <Projects />
      </div>

      <div className="w-screen h-screen" >
        <h1 className="text-9xl">Coding Profile</h1>
      </div>
    </section>
  );
};

export default memo(Skills);
