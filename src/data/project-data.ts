export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  status?: string;
  year?: string;
  image?: string;
  mainScreen: boolean; // true = show in horizontal scroll, false = only in all projects
  isLive: boolean; // true = show live button, false = hide live button
};

export const projectsData: ProjectItem[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind"],
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    category: "Full-Stack",
    status: "Live",
    year: "2024",
    image:
      "/project-images/team-nocoloco-YRUj8BENrVQ-unsplash.jpg",
    mainScreen: true, // Show in horizontal scroll
    isLive: false, // Has live demo
  },
  {
    id: "taskmanager",
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team features.",
    technologies: ["React", "TypeScript", "Firebase", "Framer Motion"],
    githubUrl: "https://github.com/username/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
    category: "Frontend",
    status: "Live",
    year: "2023",
    image:
      "/project-images/Bond - Agency website.jpg",
    mainScreen: true, // Show in horizontal scroll
    isLive: false, // Has live demo
  },
  {
    id: "ai-dashboard",
    title: "AI Dashboard",
    description:
      "Analytics dashboard with AI-powered insights, data visualization, and predictive modeling for business intelligence.",
    technologies: [
      "Next.js",
      "Python",
      "TensorFlow",
      "Chart.js",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/username/ai-dashboard",
    liveUrl: "https://ai-dashboard-demo.com",
    category: "Data/AI",
    status: "Prototype",
    year: "2023",
    image:
      "/project-images/team-nocoloco-YRUj8BENrVQ-unsplash.jpg",
    mainScreen: false, // Only show in all projects
    isLive: false, // No live demo
  },
  {
    id: "social-app",
    title: "Social Media App",
    description:
      "Modern social platform with real-time messaging, content sharing, and advanced privacy controls.",
    technologies: ["React Native", "GraphQL", "AWS", "Redis"],
    githubUrl: "https://github.com/username/social-app",
    liveUrl: "https://social-app-demo.com",
    category: "Mobile",
    status: "In Progress",
    year: "2022",
    image:
      "/project-images/team-nocoloco-YRUj8BENrVQ-unsplash.jpg",
    mainScreen: false, // Only show in all projects
    isLive: false, // No live demo
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "Personal portfolio showcasing creative projects with smooth animations and responsive design.",
    technologies: ["React", "GSAP", "Three.js", "Tailwind CSS"],
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio-demo.com",
    category: "Frontend",
    status: "Live",
    year: "2024",
    image:
      "/project-images/team-nocoloco-YRUj8BENrVQ-unsplash.jpg",
    mainScreen: true, // Show in horizontal scroll
    isLive: true, // Has live demo
  },
];


