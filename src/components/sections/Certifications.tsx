"use client";

import React, { memo } from "react";
import { AnimatedTestimonials, type CertificationItem } from "@/components/ui/animated-testimonials";

const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    code: "CLF-C02",
    year: "2024",
    description:
      "Validates foundational cloud fluency on AWS, including global infrastructure, pricing, security, and architectural principles.",
    src: "/certificates/aws-cp-badge.png",
    verifyLink: "https://www.credly.com/badges/a9630c84-218c-425f-b6cc-b806c8623edc/public_url",
  },
  {
    name: "MongoDB Associate Developer",
    code: "C100DEV",
    year: "2025",
    description:
      "Demonstrates proficiency with MongoDB schema design, CRUD operations, aggregation framework, indexing, and performance basics.",
    src: "/certificates/mongodb-associate-dev.png",
    verifyLink: "https://www.credly.com/badges/f4fe14d2-f518-4ea9-9c38-004879f66736/public_url",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    code: "1Z0-1122-25",
    year: "2024",
    description:
      "Covers core AI concepts, ethical AI practices, and applied ML/AI services in Oracle Cloud for intelligent, data-driven solutions.",
    src: "/certificates/Oracle-badge.png",
    verifyLink: "https://1drv.ms/b/s!Ar01bx9Pqte4bbbGyExm0TSaTY4?e=PaoJoU",
  },
  {
    name: "Salesforce AI Associate",
    code: "ES-450",
    year: "2024",
    description:
      "Covers fundamental AI concepts, ethical and responsible AI use, and practical applications of AI within the Salesforce ecosystem to drive productivity, customer engagement, and intelligent decision-making.",
    src: "/certificates/salesforce-ai-associate.png",
    verifyLink: "https://www.salesforce.com/trailblazer/te1qukta3z525w3gqy",
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


