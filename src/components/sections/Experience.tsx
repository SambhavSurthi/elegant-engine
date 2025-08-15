'use client';

import React, { memo } from 'react';
import { Timeline } from '@/components/ui/timeline';

// Experience timeline data as a JSON object
const experienceData = [
  {
    year: "2023",
    title: "Senior Frontend Developer",
    description: "Led the development of a complex SaaS platform using React, TypeScript, and Next.js. Implemented state-of-the-art UI components and optimized performance.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60",
    projectImages: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png"
    ],
    skills: ["React", "TypeScript", "Next.js", "Redux"]
  },
    {
    year: "2022",
    title: "Frontend Developer",
    description: "Developed responsive web applications with React and collaborated with UX/UI designers to implement pixel-perfect interfaces. Integrated RESTful APIs and implemented state management solutions.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60",
    projectImages: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png"
    ],
    skills: ["React", "JavaScript", "CSS", "REST API"]
  },
    {
    year: "2021",
    title: "Junior Web Developer",
    description: "Started my professional journey building websites with HTML, CSS, and JavaScript. Learned modern frameworks and best practices for web development.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
    projectImages: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png"
    ],
    skills: ["HTML", "CSS", "JavaScript", "jQuery"]
  },
    {
    year: "2020",
    title: "Computer Science Graduate",
    description: "Graduated with a degree in Computer Science. Focused on web technologies and software development. Completed several personal projects to build my portfolio.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&auto=format&fit=crop&q=60",
    projectImages: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png"
    ],
    skills: ["Algorithms", "Data Structures", "Web Development", "Python"]
  },
];

const Experience = () => {
  // Map the data to the format expected by Timeline component
  const timelineData = experienceData.map(item => ({
    title: item.year,
    content: (
      <div>
        <h4 className="text-xl md:text-5xl font-semibold mb-2 text-white dark:text-black">{item.title}</h4>
        <p className="text-neutral-200 dark:text-neutral-800 text-sm md:text-xl font-normal mb-4">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {item.skills.map((skill, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 rounded-full text-xs ${item.year === "2023" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" : 
                item.year === "2022" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : 
                item.year === "2021" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" : 
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"}`}
            >
              {skill}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {item.projectImages.map((imgSrc, idx) => (
            <img 
              key={idx}
              src={imgSrc}
              alt={`${item.title} project ${idx + 1}`}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <div className="mt-20">
      <Timeline data={timelineData} />
    </div>
  );
};

export default memo(Experience);