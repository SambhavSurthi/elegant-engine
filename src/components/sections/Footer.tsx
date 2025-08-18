import React from "react";
import { Component as BgGradient } from "@/components/ui/bg-gradient";

const Footer: React.FC = () => {
  return (
    <div 
      className="relative w-full h-full text-black"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 20%, #ddd6fe 50%, #a855f7 80%, #7c3aed 100%)'
      }}
    >
      <div className="relative z-10">
        <h1 className="text-5xl md:ml-16 md:text-8xl">Footer</h1>
      </div>
    </div>
  );
};

export default Footer;