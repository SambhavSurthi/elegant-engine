'use client';

import React, { memo } from 'react';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { ExternalLink } from 'lucide-react';

interface Certification {
  name: string;
  code: string;
  year: string;
  description: string;
  verificationUrl: string;
  badgeUrl: string;
}

const certificationsData: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    code: "CLF-C02",
    year: "2023",
    description: "Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support. Demonstrates knowledge of cloud computing and AWS platform fundamentals.",
    verificationUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    badgeUrl: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
  },
  {
    name: "MongoDB Associate Developer",
    code: "C100DEV",
    year: "2024",
    description: "Comprehensive knowledge of MongoDB development including data modeling, CRUD operations, aggregation framework, and application development best practices.",
    verificationUrl: "https://learn.mongodb.com/learning-paths/mongodb-associate-developer-path",
    badgeUrl: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
  },
  {
    name: "Oracle AI Foundations Associate",
    code: "1Z0-1122-23",
    year: "2024",
    description: "Understanding of artificial intelligence concepts, machine learning fundamentals, and Oracle's AI services. Covers AI ethics, data science basics, and practical AI applications.",
    verificationUrl: "https://education.oracle.com/oracle-ai-foundations-associate/pexam_1Z0-1122-23",
    badgeUrl: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
  }
];

// Transform certifications data for the circular component
const transformedCertifications = certificationsData.map(cert => ({
  quote: cert.description,
  name: cert.name,
  designation: `${cert.code} • ${cert.year}`,
  src: cert.badgeUrl,
  verificationUrl: cert.verificationUrl
}));

const Certifications: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-start mb-16">
          <h2 className="text-6xl md:text-8xl font-semibold text-white mb-8">
            CERTIFICATIONS
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl ">
            Professional certifications that validate my expertise in cloud computing, database development, and artificial intelligence.
          </p>
        </div>

        {/* Certifications Carousel */}
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="max-w-8xl w-full">
            <CustomCertificationCarousel certifications={transformedCertifications} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom component that extends the circular testimonials for certifications
interface CertificationCarouselProps {
  certifications: Array<{
    quote: string;
    name: string;
    designation: string;
    src: string;
    verificationUrl: string;
  }>;
}

const CustomCertificationCarousel: React.FC<CertificationCarouselProps> = ({ certifications }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  const activeCertification = certifications[activeIndex];
  
  return (
    <div className="relative">
      <style>{`
        .certification-container {
          width: 100%;
          max-width: 100rem;
          padding: 2rem;
          margin: 0 auto;
        }
        .certification-grid {
          display: grid;
          gap: 6rem;
          align-items: center;
        }
        .image-container {
          position: relative;
          width: 600px;
          height: 400px;
          perspective: 1000px;
        }
        .certification-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 1rem;
          // change the background cooler here 
          background: transparent;              
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .certification-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 20rem;
        }
        .cert-name {
          font-weight: 700;
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .cert-code {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .cert-description {
          color: #e5e7eb;
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .verify-button {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 0.875rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          width: fit-content;
          margin-bottom: 2rem;
        }
        .verify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
        }
        .navigation-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .nav-button {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: #1f2937;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .nav-button:hover {
          background: #4f46e5;
          transform: scale(1.1);
        }
        @media (min-width: 768px) {
          .certification-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
          .navigation-buttons {
            justify-content: flex-start;
          }
        }
      `}</style>
      
      <div className="certification-container">
        <div className="certification-grid">
          {/* Badge Images */}
          <div className="image-container">
            {certifications.map((cert, index) => {
              const isActive = index === activeIndex;
              const isLeft = (activeIndex - 1 + certifications.length) % certifications.length === index;
              const isRight = (activeIndex + 1) % certifications.length === index;
              
              let transform = 'translateX(0) scale(0.8) rotateY(0deg)';
              let opacity = 0;
              let zIndex = 1;
              
              if (isActive) {
                transform = 'translateX(0) scale(1) rotateY(0deg)';
                opacity = 1;
                zIndex = 3;
              } else if (isLeft) {
                transform = 'translateX(-80px) scale(0.8) rotateY(25deg)';
                opacity = 0.6;
                zIndex = 2;
              } else if (isRight) {
                transform = 'translateX(80px) scale(0.8) rotateY(-25deg)';
                opacity = 0.6;
                zIndex = 2;
              }
              
              return (
                <img
                  key={index}
                  src={cert.src}
                  alt={cert.name}
                  className="certification-image"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              );
            })}
          </div>
          
          {/* Content */}
          <div className="certification-content">
            <div>
              <h3 className="cert-name">{activeCertification.name}</h3>
              <span className="text-zinc-400">{activeCertification.designation}</span>
              <p className="cert-description">{activeCertification.quote}</p>
              <a 
                href={activeCertification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="verify-button"
              >
                <ExternalLink size={18} />
                Verify Certification
              </a>
            </div>
            
            {/* Navigation */}
            <div className="navigation-buttons">
              <button
                className="nav-button"
                onClick={() => setActiveIndex((prev) => (prev - 1 + certifications.length) % certifications.length)}
                aria-label="Previous certification"
              >
                ←
              </button>
              <button
                className="nav-button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % certifications.length)}
                aria-label="Next certification"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Certifications);