"use client";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "motion/react";
import { useRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { useMediaQuery } from "react-responsive";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiPython,
  SiDjango,
  SiFastapi,
  SiSpringboot,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiSass,
  SiGooglecloud,
  SiJenkins,
  SiC,
  SiCplusplus,
} from "react-icons/si";

import { FaJava, FaAws, FaSquareRootAlt } from "react-icons/fa";
import { MdAnimation } from "react-icons/md"; // GSAP placeholder
import { TbBrandFramer } from "react-icons/tb"; // Framer Motion
import { GiPanda } from "react-icons/gi"; // Pandas placeholder
import { BiScatterChart } from "react-icons/bi"; // Matplotlib placeholder

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  skills: string[];
}

const techIcons: Record<string, any> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  Python: SiPython,
  Django: SiDjango,
  FastAPI: SiFastapi,
  "Spring Boot": SiSpringboot,
  Java: FaJava,
  C: SiC,
  "C++": SiCplusplus,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  HTML: SiHtml5,
  CSS: SiCss3,
  SCSS: SiSass,
  AWS: FaAws,
  GCP: SiGooglecloud,
  Jenkins: SiJenkins,
  GSAP: MdAnimation,
  "Framer Motion": TbBrandFramer,
  NumPy: FaSquareRootAlt,
  Pandas: GiPanda,
  Matplotlib: BiScatterChart,
};

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  skills: string[];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  skills,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const isLaptop = useMediaQuery({ minWidth: 1024 });

  return (
    <div
      ref={container}
      className="h-screen flex items-center  justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`group flex flex-col -top-[25%] h-[500px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-[95%] sm:w-[90%] md:w-[85%] lg:w-[100%] rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 origin-top transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden bg-white relative`}
      >
        {/* Dual Gradient Overlay Background */}
        <div
          className="absolute hidden md:block inset-0 z-0 rounded-xl"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
              radial-gradient(circle 700px at 0% 20%, rgba(139,92,246,0.3), transparent),
              radial-gradient(circle 500px at 90% 95%, rgba(59,130,246,0.3), transparent)
            `,
            backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
          }}
        />
        {/* Spotlight Effect */}
        <Spotlight
          className="from-blue-100 via-blue-100 to-blue-100"
          size={150}
        />
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col md:flex-row h-full gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left Section */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col md:justify-start md:mt-20 justify-center space-y-3 sm:space-y-4 lg:space-y-6"
            initial={isLaptop ? { opacity: 0, x: -50 } : {}}
            whileInView={isLaptop ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black leading-tight tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-black/80 leading-relaxed font-medium"
              initial={isLaptop ? { opacity: 0, y: 20 } : {}}
              whileInView={isLaptop ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center"
            initial={isLaptop ? { opacity: 0, x: 50 } : {}}
            whileInView={isLaptop ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-3 sm:mb-4 lg:mb-6 tracking-wide"
              initial={isLaptop ? { opacity: 0, y: -20 } : {}}
              whileInView={isLaptop ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Technologies & Tools
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {skills.map((skill, index) => {
                const IconComponent = techIcons[skill];
                return (
                  <motion.div
                    key={index}
                    className="relative group/skill bg-black/10 hover:bg-black/20 backdrop-blur-sm rounded-lg px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-5 lg:py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-black/10"
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(0, 0, 0, 0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <GlowingEffect
                      spread={30}
                      glow={true}
                      disabled={false}
                      proximity={48}
                      inactiveZone={0.01}
                      borderWidth={2}
                      movementDuration={1.5}
                    />
                    <div className="relative flex items-center gap-1 sm:gap-2 lg:gap-3">
                      {IconComponent && (
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="w-3 h-3 hidden md:block sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-black/80 group-hover/skill:text-black transition-colors duration-300 flex-shrink-0" />
                        </motion.div>
                      )}
                      <span className="text-black font-medium text-sm sm:text-base md:text-base lg:text-lg group-hover/skill:font-semibold transition-all duration-300 flex-1 truncate">
                        {skill}
                      </span>
                    </div>
                    <motion.div
                      className="w-0 h-0.5 bg-black mt-1 sm:mt-2 transition-all duration-300 group-hover/skill:w-full"
                      initial={false}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Floating accent */}
            <motion.div
              className="absolute top-4 right-4 w-20 h-20 bg-black/5 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const StackingCards = forwardRef<HTMLElement, ComponentRootProps>(
  ({ projects }, ref) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start start", "end end"],
    });

    return (
      <main className="bg-black" ref={container}>
        <section
          className="text-white w-full bg-black"
          style={{ height: `${projects.length * 100}vh` }}
        >
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                description={project.description}
                skills={project.skills}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    );
  }
);

StackingCards.displayName = "StackingCards";

export default StackingCards;
