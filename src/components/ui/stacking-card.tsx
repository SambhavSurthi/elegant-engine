'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  skills: string[];
}

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
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`group flex flex-col relative -top-[25%] h-[450px] md:h-[500px] lg:h-[550px] w-[90%] md:w-[85%] lg:w-[100%] rounded-xl p-8 md:p-10 lg:p-12 origin-top transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col md:flex-row h-full gap-8 md:gap-12">
          
          {/* Left Section - TechStack Name & Description */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-black/80 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>
            
            {/* Learn More Link with Animation */}
            <motion.div 
              className="flex items-center gap-3 pt-4"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <a
                href="#"
                className="text-black font-semibold text-lg relative group-hover:text-black/90 transition-colors duration-300"
              >
                Learn more
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
              <motion.svg
                width="24"
                height="14"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-x-1"
                whileHover={{ scale: 1.1 }}
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </motion.svg>
            </motion.div>
          </motion.div>

          {/* Right Section - Skills/Technologies */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3 
              className="text-xl md:text-2xl font-semibold text-black mb-6 tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Technologies & Tools
            </motion.h3>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="group/skill bg-black/10 hover:bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 md:px-5 md:py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-black/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-black font-medium text-sm md:text-base group-hover/skill:font-semibold transition-all duration-300">
                    {skill}
                  </span>
                  
                  {/* Hover indicator */}
                  <motion.div 
                    className="w-0 h-0.5 bg-black mt-2 transition-all duration-300 group-hover/skill:w-full"
                    initial={false}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Floating accent element */}
            <motion.div 
              className="absolute top-4 right-4 w-20 h-20 bg-black/5 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
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

const StackingCards = forwardRef<HTMLElement, ComponentRootProps>(({ projects }, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main className='bg-black' ref={container}>
      <section className='text-white w-full bg-black' style={{ height: `${projects.length * 100}vh` }}>
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
});

StackingCards.displayName = 'StackingCards';

export default StackingCards;