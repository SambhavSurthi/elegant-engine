import React from "react";
import { Component as BgGradient } from "@/components/ui/bg-gradient";

const Footer: React.FC = () => {
  return (
    <div className="relative w-full h-full text-black">
      <BgGradient 
        gradientFrom="#ffffff"
        gradientTo="#6366f1"
        gradientSize="150% 150%"
        gradientPosition="50% 100%"
        gradientStop="30%"
      />
      <div className="relative z-10">
        <h1 className="text-5xl md:ml-16 md:text-8xl">Footer</h1>
      </div>
    </div>
  );
};

export default Footer;