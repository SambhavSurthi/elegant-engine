'use client';

import React, { memo } from 'react';
import ProjectsBento from '@/components/ui/ruixen-bento-cards';
import { ExternalLink } from 'lucide-react';

const projectsData = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind"],
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team features.",
    technologies: ["React", "TypeScript", "Firebase", "Framer Motion"],
    githubUrl: "https://github.com/username/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
  },
  {
    title: "AI Dashboard",
    description: "Analytics dashboard with AI-powered insights, data visualization, and predictive modeling for business intelligence.",
    technologies: ["Next.js", "Python", "TensorFlow", "Chart.js", "PostgreSQL"],
    githubUrl: "https://github.com/username/ai-dashboard",
    liveUrl: "https://ai-dashboard-demo.com",
  },
  {
    title: "Social Media App",
    description: "Modern social platform with real-time messaging, content sharing, and advanced privacy controls.",
    technologies: ["React Native", "GraphQL", "AWS", "Redis"],
    githubUrl: "https://github.com/username/social-app",
    liveUrl: "https://social-app-demo.com",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing creative projects with smooth animations and responsive design.",
    technologies: ["React", "GSAP", "Three.js", "Tailwind CSS"],
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio-demo.com",
  },
];

const Projects: React.FC = () => {
  return (
    <section className="w-full bg-black dark:bg-black py-20">
      <div className="container mx-auto px-6">
        {/* Animated Header */}
        <div className="text-start mb-16">
          <h2 className="text-6xl md:text-8xl font-semibold text-white dark:text-white mb-8">
            PROJECTS
          </h2>
          
          {/* Animated Explore All Projects Link */}
          
        </div>

        {/* Projects Bento Grid */}
        <ProjectsBento projects={projectsData} />
      </div>
    </section>
  );
};

export default memo(Projects);