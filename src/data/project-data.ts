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
    id: "EasyStock",
    title: "EasyStock - Inventory Management System",
    description:
      "A full-stack Inventory Management System designed for small and medium businesses. Features include real-time billing, role-based employee access, advanced product filtering, and analytics through an admin dashboard. Integrated with AWS for cloud storage, Razorpay for payments, and secured using JWT authentication. Built with React, TailwindCSS, Shadcn, Spring Boot, and MySQL on AWS RDS.",
    technologies: [
      "React",
      "TailwindCSS",
      "Shadcn",
      "SpringBoot",
      "Postman",
      "AWS",
      "RazorPay",
      "MySQL",
      "git",
    ],
    githubUrl: "https://github.com/SambhavSurthi/IMS",
    liveUrl: "",
    category: "Web-Dev",
    status: "Live",
    year: "2024",
    image: "/project-images/EasyStock-IMS.png",
    mainScreen: true, // Show in horizontal scroll
    isLive: false, // Has live demo
  },
  {
    id: "aws-cp-quiz",
    title: "AWS Certified Cloud Practitioner Quiz Portal",
    description:
      "An interactive quiz portal designed to help learners prepare for the AWS Certified Cloud Practitioner exam. Features practice quizzes, mock tests, instant feedback, and progress tracking to make exam preparation engaging and effective.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "git"],
    githubUrl: "https://github.com/SambhavSurthi/AWSCP_Quiz_App",
    liveUrl: "https://awscp-quiz.netlify.app/",
    category: "Web-Dev",
    status: "Live",
    year: "2025",
    image: "/project-images/AWS-Quiz-Banner.png",
    mainScreen: true, // Only show in all projects
    isLive: true, // Has live demo
  },
  {
    id: "Bank-Management-System",
    title: "Bank Management System (Python + Streamlit)",
    description:
      "A Python-based Bank Management System built with Object-Oriented Programming principles. It uses JSON files for local data storage (accounts, transactions, balances) and provides an interactive Streamlit frontend for managing banking operations. Designed to strengthen core programming concepts while delivering a functional banking simulation.",
    technologies: ["Python", "Streamlit", "git"],
    githubUrl:
      "https://github.com/SambhavSurthi/Bank-Management-System-Using-Streamlit",
    liveUrl:
      "https://sambhavsurthi-bank-management-system-using-streamlit-app-ql8ati.streamlit.app/",
    category: "Web-Dev",
    status: "Live",
    year: "2025",
    image: "/project-images/BMS-banner-white.png",
    mainScreen: true, // Only show in all projects
    isLive: true, // Has live demo
  },
  {
    id: "EduLink",
    title: "EduLink - Student LMS",
    description:
      "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team features.",
    technologies: [
      "HTML",
      "CSS",
      "JS",
      "Python",
      "Django",
      "PostgreSQL",
      "git",
    ],
    githubUrl: "https://github.com/SambhavSurthi/EduLink",
    liveUrl: "",
    category: "Web-Dev",
    status: "Live",
    year: "2024",
    image: "/project-images/EduLink.png",
    mainScreen: true, // Show in horizontal scroll
    isLive: false, // Has live demo
  },

  {
    id: "DevDock",
    title: "DevDock - Handle All Your Coding Profiles",
    description:
      "A unified developer portal that aggregates coding profiles from multiple platforms into one place. Built with Python and Playwright for data scraping, FastAPI for backend APIs, and React with TailwindCSS, Shadcn, GSAP, and Framer Motion for a sleek, animated frontend. DevDock helps developers showcase and manage their coding journey effortlessly from a single dashboard.",
    technologies: [
      "React",
      "Python",
      "Playwright",
      "TailwindCSS",
      "FastAPI",
      "Git",
      "Shadcn",
      "GSAP",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/SambhavSurthi/Scraping-Codolio",
    liveUrl: "",
    category: "Web-Dev",
    status: "In Progress",
    year: "2025",
    image: "/project-images/Codolio-banner.png",
    mainScreen: false, // Only show in all projects
    isLive: false, // No live demo
  },
];
