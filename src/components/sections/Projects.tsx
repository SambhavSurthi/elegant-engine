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
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team features.",
    technologies: ["React", "TypeScript", "Firebase", "Framer Motion"],
    githubUrl: "https://github.com/username/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "AI Dashboard",
    description: "Analytics dashboard with AI-powered insights, data visualization, and predictive modeling for business intelligence.",
    technologies: ["Next.js", "Python", "TensorFlow", "Chart.js", "PostgreSQL"],
    githubUrl: "https://github.com/username/ai-dashboard",
    liveUrl: "https://ai-dashboard-demo.com",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Social Media App",
    description: "Modern social platform with real-time messaging, content sharing, and advanced privacy controls.",
    technologies: ["React Native", "GraphQL", "AWS", "Redis"],
    githubUrl: "https://github.com/username/social-app",
    liveUrl: "https://social-app-demo.com",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing creative projects with smooth animations and responsive design.",
    technologies: ["React", "GSAP", "Three.js", "Tailwind CSS"],
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio-demo.com",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop&q=80",
  },
];

const Projects: React.FC = () => {
  return (
    <section className="w-full bg-white dark:bg-black py-20">
      <div className="container mx-auto px-6">
        {/* Animated Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-bold text-black dark:text-white mb-8">
            PROJECTS
          </h2>
          
          {/* Animated Explore All Projects Link */}
          <div className="group inline-flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-pointer">
            <span className="relative">
              Explore All Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </span>
            <ExternalLink className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Projects Bento Grid */}
        <ProjectsBento projects={projectsData} />
      </div>
    </section>
  );
};

export default memo(Projects);