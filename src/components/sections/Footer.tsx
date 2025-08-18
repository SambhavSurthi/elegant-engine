import React from "react";
import { Component as BgGradient } from "@/components/ui/bg-gradient";

const Footer: React.FC = () => {
  return (
    <div 
      className="relative w-full h-full text-black"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #f1f5f9 0%, #3b82f6 50%, #1e40af 100%)'
      }}
    >
      <div className="relative z-10">
        <h1 className="text-5xl md:ml-16 md:text-8xl">Footer</h1>
      </div>
    </div>
  );
};

export default Footer;