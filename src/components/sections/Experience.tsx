"use client";

import React, { memo } from "react";
import { Timeline } from "@/components/ui/timeline";
import { MapPin, ArrowRight } from "lucide-react";

// Experience timeline data as a JSON object
const experienceData = [
  {
    year: "2024",
    title: "Websico - Core Member",
    subTitle: "Director of Technology",
    description:
      "Serving as Director of Technology at Websico, the official technical club of KL University. Leading a team to organize workshops, mentor peers, and drive innovation in web technologies and software development.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60",
    projectImages: [],
    skills: [
      "Leadership",
      "Team Management",
      "Communication",
      "Creativity & Innovation",
      "Web Development",
      "Mentorship"
    ],
    location: "K L University, Vijayawada, AP, India",
    KeyAchievements: [
      "Led front-end workshops, improving coding proficiency of 30+ students and aiding project completion.",
      "Developed mentorship, coaching, and interpersonal skills through peer collaboration.",
      "Guided multiple student teams in building production-ready projects using modern frameworks.",
      "Introduced best practices in code quality, version control, and project workflow."
    ],
    startEnd: "2024-Current"
  },  
  {
    year: "2023",
    title: "Undergraduate",
    subTitle: "Computer Science and Engineering",
    description:
      "Pursuing B.Tech in Computer Science and Engineering, currently in 3rd Year (1st Semester). Building strong foundations in programming, data structures, algorithms, core CS subjects, and modern technologies like Web Development and AI/ML.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60",
    projectImages: [],
    skills: ["Programming Languages", "Data Structures & Algorithms", "Core CS Subjects", "Web Development", "AI/ML"],
    location: "K L University, Vijayawada, AP, India",
    KeyAchievements: [
      "Maintaining a strong academic record with a current CGPA of 9.58.",
      "Won 1st Place in the University-wide Data Science and Ignition Event.",
      "Built multiple real-world projects integrating payment gateways, JWT authentication, and cloud services.",
      "Actively participated in hackathons, coding competitions, and technical events.",
      "Contributed to open-source and improved collaborative development skills."
    ],
    startEnd: "2023-Current"
  },  
  {
    year: "2023",
    title: "Intermediate",
    subTitle: "MPC-Science",
    description:
      "Successfully completed Intermediate in the MPC stream with excellent academic results. Strengthened concepts in Mathematics, Physics, and Chemistry while building analytical and problem-solving skills.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
    projectImages: [],
    skills: ["Mathematics", "Physics", "Chemistry", "Analytical Thinking"],
    location: "Sri Chaitanya Junior College, Hyderabad, TS, India",
    KeyAchievements: [
      "Secured 95% in Intermediate Board Examinations.",
      "Built a strong academic foundation in Mathematics, Physics, and Chemistry.",
      "Actively participated in competitive exam & preparation.",
      "Improved time management and problem-solving through rigorous practice.",
    ],
    startEnd: "2021-2023",
  },
  {
    year: "2021",
    title: "Secondary School Certificate",
    subTitle: "SSC - 10th Standard",
    description:
      "Completed SSC with strong academic performance, achieving 10.0 CGPA. Gained solid foundation in core subjects such as Mathematics, Science, and Computer Basics.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&auto=format&fit=crop&q=60",
    projectImages: [],
    skills: [
      "Mathematics",
      "Science",
      "Computer Basics",
      "Basic Problem-Solving",
    ],
    location: "Shree Netaji Gurudev Gurukul, Tandur, TS, India",
    KeyAchievements: [
      "Secured 10.0 CGPA in SSC Board Exams.",
      "Built a strong foundation in Mathematics, Science, and Computer fundamentals.",
      "Actively participated in school-level competitions and extracurricular activities.",
      "Developed early interest in technology and programming.",
    ],
    startEnd: "2021",
  },
];

const Experience = () => {
  // Map the data to the format expected by Timeline component
  const timelineData = experienceData.map((item) => ({
    title: item.year,
    content: (
      <div>
        <h4 className="text-xl md:text-5xl font-semibold mb-2 text-white dark:text-black">
          {item.title}
        </h4>
        <h5 className="text-sm md:text-xl font-semibold mb-2 text-neutral-300 dark:text-black">
          {item.subTitle}
        </h5>

        {/* Location and Date Badge */}
        <div className="flex flex-col lg:mt-3 lg:justify-between sm:flex-row sm:items-center gap-2 mb-3">
          <div className="flex items-center gap-2 text-neutral-300 dark:text-neutral-600 text-sm md:text-base">
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center">
            <span className="bg-neutral-800 dark:bg-neutral-200 text-neutral-100 dark:text-neutral-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
              {item.startEnd}
            </span>
          </div>
        </div>

        <p className="text-neutral-200 dark:text-neutral-800 text-sm md:text-xl font-normal mb-4">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.skills.map((skill, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs ${
                item.year === "2023"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  : item.year === "2022"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : item.year === "2021"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Key Achievements */}
        {item.KeyAchievements && item.KeyAchievements.length > 0 && (
          <div className="mb-6">
            <h5 className="text-sm md:text-lg font-semibold text-white dark:text-black mb-3">
              Key Achievements
            </h5>
            <ul className="space-y-2">
              {item.KeyAchievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm md:text-base text-neutral-200 dark:text-neutral-700"
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0 text-neutral-400 dark:text-neutral-500" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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
