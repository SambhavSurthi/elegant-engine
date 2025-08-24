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
import CodeAndDev from "./CodeAndDev";
import Certifications from "./Certifications";
import GoogleGeminiEffectDemo from "@/components/ui/google-gemini-effect-demo";
import { InfiniteTextMarquee } from "@/components/ui/infinite-text-marquee";
import Footer from "./Footer";
import { TextRevealByWord } from "@/components/ui/text-reveal";

const skillsProjects = [
  
    {
      "title": "Programming Languages",
      "description": "Core programming languages for problem solving, system development, and application building.",
      "link": "https://images.unsplash.com/photo-1581091870622-4c4f50b5374b?w=500&auto=format&fit=crop&q=60",
      "color": "white",
      "skills": ["C", "C++", "Java", "Python", "JavaScript"]
    },
    {
      "title": "Frontend Development",
      "description": "Building beautiful, responsive, and interactive user interfaces with modern frameworks and cutting-edge technologies.",
      "link": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60",
      "color": "white",
      "skills": ["HTML", "CSS", "React", "GSAP", "Framer Motion", "Tailwind CSS", "SCSS"]
    },
    {
      "title": "Backend Development",
      "description": "Developing robust and scalable server-side applications and APIs.",
      "link": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
      "color": "white",
      "skills": ["Django", "Express", "Node.js", "Spring Boot"]
    },
    {
      "title": "Databases",
      "description": "Managing structured and unstructured data with relational and NoSQL databases.",
      "link": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60",
      "color": "white",
      "skills": ["MongoDB", "MySQL", "PostgreSQL", "SQLite"]
    },
    {
      "title": "Cloud & DevOps",
      "description": "Deploying, scaling, and automating applications with cloud services and DevOps tools.",
      "link": "",
      "color": "white",
      "skills": ["AWS", "GCP", "Docker", "Jenkins", "Git", "GitHub"]
    },
    {
      "title": "Artificial Intelligence & Data Science",
      "description": "Analyzing and visualizing data, and applying AI/ML techniques with Python libraries.",
      "link": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&auto=format&fit=crop&q=60",
      "color": "white",
      "skills": ["NumPy", "Pandas", "Matplotlib"]
    }
  
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const [isTitleActive, setIsTitleActive] = useState(false);
  
  // Code In Motion section refs
  const codeInMotionRef = useRef<HTMLDivElement | null>(null);
  const codeTitleAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const codeParagraphAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const [isCodeSectionActive, setIsCodeSectionActive] = useState(false);
  
  // Milestones section refs
  const milestonesRef = useRef<HTMLDivElement | null>(null);
  const milestonesTitleAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const milestonesParagraphAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const [isMilestonesSectionActive, setIsMilestonesSectionActive] = useState(false);

  useLayoutEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

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

      // Code In Motion section animation
      const codeInMotionEl = codeInMotionRef.current;
      if (codeInMotionEl) {
        const toCodeActive = () => {
          codeTitleAnimRef.current?.startAnimation();
          codeParagraphAnimRef.current?.startAnimation();
          setIsCodeSectionActive(true);
        };

        const toCodeInactive = () => {
          codeTitleAnimRef.current?.reset();
          codeParagraphAnimRef.current?.reset();
          setIsCodeSectionActive(false);
        };

        ScrollTrigger.create({
          trigger: codeInMotionEl,
          start: "top center",
          onEnter: toCodeActive,
          onLeaveBack: toCodeInactive,
        });
      }

      // Milestones section animation
      const milestonesEl = milestonesRef.current;
      if (milestonesEl) {
        const toMilestonesActive = () => {
          milestonesTitleAnimRef.current?.startAnimation();
          milestonesParagraphAnimRef.current?.startAnimation();
          setIsMilestonesSectionActive(true);
        };

        const toMilestonesInactive = () => {
          milestonesTitleAnimRef.current?.reset();
          milestonesParagraphAnimRef.current?.reset();
          setIsMilestonesSectionActive(false);
        };

        ScrollTrigger.create({
          trigger: milestonesEl,
          start: "top center",
          onEnter: toMilestonesActive,
          onLeaveBack: toMilestonesInactive,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="w-full  bg-black text-white">
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

      <div ref={codeInMotionRef}>
        <h1 className="ml-4 md:ml-16 mt-10 md: text-8xl">
          <VerticalCutReveal
            ref={codeTitleAnimRef}
            splitBy="characters"
            staggerDuration={0.03}
            staggerFrom="center"
            transition={{ type: "spring", stiffness: 230, damping: 26 }}
            containerClassName="inline-block"
            elementLevelClassName="will-change-transform"
            autoStart={false}
          >
            Code In Motion
          </VerticalCutReveal>
        </h1>
        <div className="text-xl ml-4 mt-4 text-zinc-600 md:text-xl md:max-w-[60%] md:ml-16">
          <TextRevealByWord
            className=""
            text="From solving algorithms on LeetCode and CodeChef to building real-world projects on GitHub, I grow through both problem-solving and development."
          />
        </div>

        {/* Coding Profiles */}
        <CodeAndDev />
      </div>

      {/* Certification */}
      <div ref={milestonesRef} className="mt-5">
        <h1 className="ml-4 text-5xl mt-5 md:ml-16 md:text-8xl">
          <VerticalCutReveal
            ref={milestonesTitleAnimRef}
            splitBy="characters"
            staggerDuration={0.03}
            staggerFrom="center"
            transition={{ type: "spring", stiffness: 230, damping: 26 }}
            containerClassName="inline-block"
            elementLevelClassName="will-change-transform"
            autoStart={false}
          >
            Milestones of Learning
          </VerticalCutReveal>
        </h1>
        <div className="text-xl ml-4 mt-4 text-zinc-600 md:text-xl md:max-w-[60%] md:ml-16">
          <TextRevealByWord
            className=""
            text="Each certification represents knowledge gained and expertise earned—strengthening my foundation in technology and beyond."
          />
        </div>
        <Certifications />
      </div>

      {/* Marquee */}
      <div className="overflow-x-hidden md:mt-20">
        <InfiniteTextMarquee
          text="Let's Build Something Amazing"
          link="/contact"
          speed={20}
          tooltipText="Click to Connect with me 😉"
          fontSize="8rem"
          showTooltip={true}
          // textColor="white"
          
        />
      </div>

      {/* Google Gemini Spl components */}
      <div>
        <GoogleGeminiEffectDemo />
      </div>

      <div className=" h-full md:h-[30rem]  text-black ">
        <Footer />
      </div>
    </section>
  );
};

export default memo(Skills);
