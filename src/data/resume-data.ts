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
    description: "MERN, Spring Boot, Django, C, C++, Java, Python, SQL, AWS, Git",
    downloadUrl: "/resumes/SambhavSurthiCV.pdf",
    fileName: "Sambhav_Surthi_FullStack_CV.pdf"
  },


];

export const getResumeData = (id: string): ResumeData | undefined => {
  return resumeData.find(resume => resume.id === id);
};
