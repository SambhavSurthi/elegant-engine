"use client";

import React, { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, type VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { TextRevealByWord } from "@/components/ui/text-reveal";

const Aboutme: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleAnimRef = useRef<VerticalCutRevealRef | null>(null);
  const subtitleAnimRef = useRef<VerticalCutRevealRef | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      const containerEl = containerRef.current;
      if (!sectionEl || !containerEl) return;

      // Set initial state (dark)
      gsap.set([sectionEl, containerEl], { backgroundColor: "#000000" });
      gsap.set([sectionEl, containerEl], { color: "#ffffff" });

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
        titleAnimRef.current?.startAnimation();
        subtitleAnimRef.current?.startAnimation();
      };

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
        titleAnimRef.current?.reset();
        subtitleAnimRef.current?.reset();
      };

      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top center",
        onEnter: toLight,
        onLeaveBack: toDark,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="group bg-[#06060e]">
      <h1 className="text-[16vw] mb-12 lg:mb-0 md:mb-0 translate-y-20 leading-[100%] uppercase font-semibold text-center transition-all ease-linear">
        <VerticalCutReveal
          ref={titleAnimRef}
          splitBy="characters"
          staggerDuration={0.03}
          staggerFrom="center"
          transition={{ type: "spring", stiffness: 230, damping: 26 }}
          containerClassName="inline-block"
          elementLevelClassName="will-change-transform bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent"
          autoStart={false}
        >
          {`I'M POSSIBLE`}
        </VerticalCutReveal>
      </h1>
      <div
        ref={containerRef}
        className="bg-black text-white  h-full relative z-10 grid place-content-center "
      >
        <h1 className="text-8xl md:ml-20 md:mr-20  mt-12 ">
          <VerticalCutReveal
            ref={subtitleAnimRef}
            splitBy="characters"
            staggerDuration={0.03}
            staggerFrom="center"
            transition={{ type: "spring", stiffness: 230, damping: 26 }}
            containerClassName="inline-block"
            elementLevelClassName="will-change-transform"
            autoStart={false}
          >
            {`BEHIND THE CODE`}
          </VerticalCutReveal>
        </h1>

        <div className="md:ml-20 md:mr-20 text-3xl  md:text-5xl mt-10">
          <h2>Hi, I’m Sambhav Surthi</h2>
          <br />

          <TextRevealByWord
            className=""
            text={`I’m a pre-final year Computer Science and Engineering undergrad at KL Deemed to be University, India — a student, developer, and creative problem solver.
            
            

            
            Passionate about web development, design, and critical thinking, I enjoy crafting elegant solutions with clean code. I have hands-on experience in full-stack development using Spring Boot with React, MERN stack, and Python Django, along with a solid foundation in data structures and algorithms.  
            
            
            
            Currently, I’m diving into Artificial Intelligence and Machine Learning, aiming to shift my career toward building intelligent, data-driven solutions. In my free time, I channel my creativity into designing — from website components to interactive UI elements.`}
          />

          {/* <br /> */}

          {/* <TextRevealByWord
            className=""
            text={`Passionate about web development, design, and critical thinking, I enjoy crafting elegant solutions with clean code. I have hands-on experience in full-stack development using Spring Boot with React, MERN stack, and Python Django, along with a solid foundation in data structures and algorithms.`}
          /> */}

          {/* <br />

          <TextRevealByWord
            className=""
            text={`Currently, I’m diving into Artificial Intelligence and Machine Learning, aiming to shift my career toward building intelligent, data-driven solutions. In my free time, I channel my creativity into designing — from website components to interactive UI elements.`}
          /> */}
        </div>
      </div>
    </footer>
  );
};

export default memo(Aboutme);
