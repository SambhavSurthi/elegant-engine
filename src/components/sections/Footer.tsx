import React from "react";
import { Component as BgGradient } from "@/components/ui/bg-gradient";

const Footer: React.FC = () => {
  return (
    <div className="relative w-full h-full text-black">
      <BgGradient 
        gradientFrom="#f8fafc"
        gradientTo="#1e40af"
        gradientSize="100% 100%"
        gradientPosition="50% 50%"
        gradientStop="20%"
        className="absolute inset-0 w-full h-full -z-10"
      />
      <div className="relative z-10">
        <h1 className="text-5xl md:ml-16 md:text-8xl">Footer</h1>
      </div>
    </div>
  );
};

export default Footer;