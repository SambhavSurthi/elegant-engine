"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  className?: string
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  className = "",
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
}) => {
  return (
    <div
      className={cn(
        "relative border border-dashed border-zinc-400 dark:border-zinc-700 rounded-lg p-6 bg-white dark:bg-zinc-950 min-h-[200px]",
        "flex flex-col justify-between",
        className
      )}
    >
      <CornerPlusIcons />
      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {description}
          </p>
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        
        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
            onClick={() => window.open(githubUrl, '_blank')}
          >
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </Button>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600"
            onClick={() => window.open(liveUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Live Preview
          </Button>
        </div>
      </div>
    </div>
  )
}

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={`dark:text-white text-black size-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

interface ProjectsBentoProps {
  projects: ProjectCardProps[]
}

export default function ProjectsBento({ projects }: ProjectsBentoProps) {
  return (
    <section className="bg-white dark:bg-black dark:bg-transparent border border-gray-200 dark:border-gray-800">
      <div className="mx-auto container border border-gray-200 dark:border-gray-800 py-12 border-t-0 px-4">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4">
          {projects.map((project, index) => {
            // Define different grid layouts for variety
            const gridClasses = [
              "lg:col-span-3 lg:row-span-2",
              "lg:col-span-2 lg:row-span-2", 
              "lg:col-span-4 lg:row-span-1",
              "lg:col-span-2 lg:row-span-1",
              "lg:col-span-2 lg:row-span-1",
            ]
            
            return (
              <ProjectCard 
                key={index}
                {...project} 
                className={gridClasses[index % gridClasses.length]} 
              />
            )
          })}
        </div>

        {/* Section Footer Heading */}
        <div className="max-w-2xl ml-auto text-right px-4 mt-6 lg:-mt-20">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
            Built with passion. Designed for impact.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Each project represents a unique challenge solved with modern technologies and creative problem-solving. From concept to deployment, every detail is crafted with care.
          </p>
        </div>
      </div>
    </section>
  )
}