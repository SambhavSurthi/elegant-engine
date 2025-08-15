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
        // MANUAL SIZE CONTROL - Change these values to adjust card dimensions
        // Height: h-[450px] for desktop, h-[600px] for larger screens, h-[350px] for mobile
        // Width: w-[80%] for 80% screen width, adjust percentage as needed
        className={`flex flex-col relative -top-[25%] h-[450px] md:h-[500px] lg:h-[550px] w-[90%] md:w-[85%] lg:w-[100%] rounded-md p-6 md:p-8 lg:p-10 origin-top`}
      >
        <h2 className='text-xl md:text-2xl lg:text-3xl text-center font-semibold text-black mb-4'>{title}</h2>
        <div className={`flex flex-col lg:flex-row h-full gap-4 lg:gap-10`}>
          <div className={`w-full lg:w-[40%] relative lg:top-[10%]`}>
            <p className='text-xs md:text-sm lg:text-base text-black/90 mb-4 leading-relaxed'>{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 md:px-3 py-1 bg-black/20 text-black text-xs md:text-sm rounded-full backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <span className='flex items-center gap-2 pt-2'>
              <a
                href={'#'}
                target='_blank'
                className='underline cursor-pointer text-black text-sm md:text-base'
              >
                Learn more
              </a>
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4 md:w-6 md:h-6'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>

          <div
            className={`relative w-full lg:w-[60%] h-48 md:h-64 lg:h-full rounded-lg overflow-hidden`}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img src={url} alt='image' className='absolute inset-0 w-full h-full object-cover' />
            </motion.div>
          </div>
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