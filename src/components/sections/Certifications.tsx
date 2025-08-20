"use client";

import React, { memo } from "react";
import { AnimatedTestimonials, type CertificationItem } from "@/components/ui/animated-testimonials";

const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    code: "AWS-CLF-XXXX",
    year: "2024",
    description:
      "Validates foundational cloud fluency on AWS, including global infrastructure, pricing, security, and architectural principles.",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&auto=format&fit=crop&q=80",
    verifyLink: "https://aws.amazon.com/certification/",
  },
  {
    name: "MongoDB Associate Developer",
    code: "MDB-DEV-XXXX",
    year: "2024",
    description:
      "Demonstrates proficiency with MongoDB schema design, CRUD operations, aggregation framework, indexing, and performance basics.",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80",
    verifyLink: "https://www.mongodb.com/certification",
  },
  {
    name: "Oracle AI Foundations Associate",
    code: "ORCL-AI-XXXX",
    year: "2024",
    description:
      "Covers core AI concepts, ethical AI practices, and applied ML/AI services in Oracle Cloud for intelligent, data-driven solutions.",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80",
    verifyLink: "https://education.oracle.com/",
  },
];

const Certifications: React.FC = () => {
  return (
    <section id="certificates" className="w-full bg-black text-white">
      <AnimatedTestimonials items={CERTIFICATIONS} autoplay className="" />
    </section>
  );
};

export default memo(Certifications);


