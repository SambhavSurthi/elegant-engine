import React from "react";
import { Component as BgGradient } from "@/components/ui/bg-gredient";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full h-full overflow-hidden">
      <BgGradient 
        className="z-0"
        gradientFrom="#ffffff"
        gradientTo="#63e"
        gradientSize="200% 200%"
        gradientPosition="50% 0%"
        gradientStop="18%"
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900">Let's build something great.</h2>
        <p className="mt-3 text-neutral-600 max-w-xl">
          I craft performant, delightful web experiences. Open to collaborations, freelance projects, and full-time roles.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2 text-sm md:text-base hover:bg-neutral-800 transition-colors">
            Get in touch
          </Link>
          <div className="flex items-center gap-3">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5 text-neutral-800" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-neutral-800" />
            </a>
            <a href="mailto:your@email.com" className="p-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors" aria-label="Email">
              <Mail className="h-5 w-5 text-neutral-800" />
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-neutral-500">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
