'use client';

import React, { memo, useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/data/project-data';
import {
  Github,
  ExternalLink,
  Code,
  Database,
  Smartphone,
  Palette,
  Cloud,
  ArrowLeft,
  Zap,
  Server,
  Cpu,
  SmartphoneIcon,
  Layers,
  Activity,
  Terminal,
  Shield,
  CreditCard,
  PaletteIcon,
  Sparkles,
  BarChart3,
  Brain,
  GitBranch,
  Globe2,
  PenTool,
  Search,
  Globe,
} from 'lucide-react';

// Tech stack icons mapping
const techIcons: { [key: string]: React.ReactNode } = {
  React: <Zap className="w-3 h-3" />,
  'Node.js': <Server className="w-3 h-3" />,
  Python: <Cpu className="w-3 h-3" />,
  Flutter: <SmartphoneIcon className="w-3 h-3" />,
  Docker: <Code className="w-3 h-3" />,
  FastAPI: <Activity className="w-3 h-3" />,
  TypeScript: <Code className="w-3 h-3" />,
  'Next.js': <Code className="w-3 h-3" />,
  MongoDB: <Database className="w-3 h-3" />,
  PostgreSQL: <Database className="w-3 h-3" />,
  AWS: <Cloud className="w-3 h-3" />,
  Firebase: <Cloud className="w-3 h-3" />,
  TensorFlow: <Brain className="w-3 h-3" />,
  Redis: <Database className="w-3 h-3" />,
  GraphQL: <Code className="w-3 h-3" />,
  'Socket.io': <Terminal className="w-3 h-3" />,
  Express: <Server className="w-3 h-3" />,
  JWT: <Shield className="w-3 h-3" />,
  Stripe: <CreditCard className="w-3 h-3" />,
  Tailwind: <PaletteIcon className="w-3 h-3" />,
  GSAP: <Sparkles className="w-3 h-3" />,
  'Three.js': <Layers className="w-3 h-3" />,
  'Framer Motion': <Sparkles className="w-3 h-3" />,
  'Chart.js': <BarChart3 className="w-3 h-3" />,
  'Scikit-learn': <Brain className="w-3 h-3" />,
  Terraform: <Cloud className="w-3 h-3" />,
  Kubernetes: <Code className="w-3 h-3" />,
  Vite: <Zap className="w-3 h-3" />,
  HTML: <Code className="w-3 h-3" />,
  CSS: <PaletteIcon className="w-3 h-3" />,
  JavaScript: <Code className="w-3 h-3" />,
  jQuery: <Code className="w-3 h-3" />,
  Expo: <SmartphoneIcon className="w-3 h-3" />,
  iOS: <SmartphoneIcon className="w-3 h-3" />,
  Android: <SmartphoneIcon className="w-3 h-3" />,
  Figma: <PenTool className="w-3 h-3" />,
  'Adobe XD': <PenTool className="w-3 h-3" />,
  Sketch: <PenTool className="w-3 h-3" />,
  'GitHub Actions': <GitBranch className="w-3 h-3" />,
  'REST APIs': <Code className="w-3 h-3" />,
  Algorithms: <Code className="w-3 h-3" />,
  'Data Structures': <Code className="w-3 h-3" />,
  'Web Development': <Globe2 className="w-3 h-3" />,
  Prototyping: <PenTool className="w-3 h-3" />,
  'User Research': <Search className="w-3 h-3" />,
  'Design Systems': <PaletteIcon className="w-3 h-3" />,
};

// Use projectsData from project-data.ts - shows all projects (both mainScreen: true and false)
const allProjectsData = projectsData;

const AllProjects: React.FC = () => {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('all');

  // Get unique values for filters
  const categories = useMemo(() => ['all', ...Array.from(new Set(allProjectsData.map(p => p.category).filter(Boolean)))], [allProjectsData]);
  const statuses = useMemo(() => ['all', ...Array.from(new Set(allProjectsData.map(p => p.status).filter(Boolean)))], [allProjectsData]);
  const years = useMemo(() => ['all', ...Array.from(new Set(allProjectsData.map(p => p.year).filter(Boolean)))], [allProjectsData]);
  const technologies = useMemo(() => {
    const allTechs = allProjectsData.flatMap(p => p.technologies);
    return ['all', ...Array.from(new Set(allTechs))];
  }, [allProjectsData]);

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return allProjectsData.filter(project => {
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
      const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
      const yearMatch = selectedYear === 'all' || project.year === selectedYear;
      const techMatch = selectedTechnology === 'all' || project.technologies.includes(selectedTechnology);
      
      return categoryMatch && statusMatch && yearMatch && techMatch;
    });
  }, [allProjectsData, selectedCategory, selectedStatus, selectedYear, selectedTechnology]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedYear('all');
    setSelectedTechnology('all');
  };
  return (
    <section className="w-full bg-black dark:bg-black py-20">
      <div className="container relative mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex justify-start mb-8">
            <button
              onClick={() => (window.location.href = '/')}
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors duration-300 hover:text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white">
              ALL PROJECTS
            </h1>
          </div>
          <div className="text-center">
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore my complete portfolio of projects, from full-stack
              applications to AI-powered solutions. Each project represents a
              unique challenge and showcases different technologies and skills.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-16 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Filter Projects</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-zinc-800"
                >
                  Reset Filters
                </button>
              </div>
              
              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="bg-zinc-800 text-white">
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status} className="bg-zinc-800 text-white">
                        {status === 'all' ? 'All Statuses' : status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Filter */}
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
                  >
                    {years.map((year) => (
                      <option key={year} value={year} className="bg-zinc-800 text-white">
                        {year === 'all' ? 'All Years' : year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Technology Filter */}
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider">Technology</label>
                  <select
                    value={selectedTechnology}
                    onChange={(e) => setSelectedTechnology(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
                  >
                    {technologies.map((tech) => (
                      <option key={tech} value={tech} className="bg-zinc-800 text-white">
                        {tech === 'all' ? 'All Technologies' : tech}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="pt-2 border-t border-zinc-800">
                <p className="text-sm text-zinc-400">
                  Showing <span className="text-white font-medium">{filteredProjects.length}</span> of <span className="text-white font-medium">{allProjectsData.length}</span> projects
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors"
              >
                {/* Image with glass badges */}
                <div className="relative w-full h-60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-lg backdrop-blur-md border border-white/20 shadow-md ${
                        project.status === 'Live'
                          ? 'bg-zinc-800 text-zinc-300 border-zinc-700bg-zinc-800border-zinc-700'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-lg bg-zinc-800 text-zinc-300 border-zinc-700 shadow-md">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-zinc-400">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs bg-zinc-800 text-zinc-300 border-zinc-700 flex items-center gap-1"
                      >
                        {techIcons[tech] || <Code className="w-3 h-3" />}
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-black hover:bg-gray-900 text-white border border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-1" />
                      GitHub
                    </Button>
                    {/* Only show Live button if project has isLive: true */}
                    {project.isLive && (
                      <Button
                        size="sm"
                        className="bg-black hover:bg-gray-900 text-white border border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Preview
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AllProjects);
