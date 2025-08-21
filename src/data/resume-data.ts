export interface ResumeData {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  fileName: string;
}

export const resumeData: ResumeData[] = [
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    description: "React, Node.js, TypeScript, MongoDB, AWS",
    downloadUrl: "/resumes/Sambhav_Surthi_FullStack_Resume.pdf",
    fileName: "Sambhav_Surthi_FullStack_Resume.pdf"
  },
  {
    id: "aiml",
    title: "AI/ML Engineer",
    description: "Python, TensorFlow, PyTorch, Scikit-learn, AWS",
    downloadUrl: "/resumes/Sambhav_Surthi_AIML_Resume.pdf",
    fileName: "Sambhav_Surthi_AIML_Resume.pdf"
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Docker, Kubernetes, AWS, CI/CD, Terraform",
    downloadUrl: "/resumes/Sambhav_Surthi_DevOps_Resume.pdf",
    fileName: "Sambhav_Surthi_DevOps_Resume.pdf"
  },

];

export const getResumeData = (id: string): ResumeData | undefined => {
  return resumeData.find(resume => resume.id === id);
};
