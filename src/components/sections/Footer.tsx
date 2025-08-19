import React from "react";
import { Component as BgGradient } from "@/components/ui/bg-gradient";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  Github,
  Linkedin,
  ArrowUp,
} from "lucide-react";
// mobile links are generated from dockItems; no extra icon imports needed

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dockItems = [
    {
      title: "Home",
      icon: (
        <Home className="h-full w-full text-neutral-100 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "About",
      icon: (
        <User className="h-full w-full text-neutral-100 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: "Projects",
      icon: (
        <Briefcase className="h-full w-full text-neutral-100 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: "Skills",
      icon: (
        <FileText className="h-full w-full text-neutral-100 dark:text-neutral-300" />
      ),
      href: "#skills",
    },
    {
      title: "Contact",
      icon: (
        <Mail className="h-full w-full text-neutral-100 dark:text-neutral-300" />
      ),
      href: "#contact",
    },
    {
      title: "GitHub",
      icon: (
        <Github className="h-full w-full text-neutral-100 dark:text-neutral-300" />
      ),
      href: "https://github.com/",
    },
    {
      title: "LinkedIn",
      icon: (
        <Linkedin className="h-full w-full text-neutral-100 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com/",
    },
    
    
    
  ];

  // Deduplicate dock items and derive groups for mobile
  const uniqueDockItems = Array.from(
    new Map(dockItems.map((i) => [`${i.href}|${i.title}`, i])).values()
  );
  const navLinks = uniqueDockItems.filter((i) => i.href?.startsWith("#"));
  const socialLinks = uniqueDockItems.filter((i) => i.href?.startsWith("http"));

  // Resize and recolor dock icons for mobile list
  const renderMobileIcon = (icon: React.ReactNode) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement, {
        className:
          "w-4 h-4 text-neutral-700 transition-colors duration-200 group-hover:text-neutral-900",
      });
    }
    return icon;
  };

  return (
    <footer className="relative w-full bg-white h-full overflow-hidden">
      <div className="hidden md:block" >
        {/* Gradient Background */}
        <BgGradient
          gradientFrom="#ffffff"
          gradientTo="#63e"
          gradientSize="125% 125%"
          gradientPosition="50% 10%"
          gradientStop="40%"
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900">
            Let's build something great.
          </h2>
          <p className="mt-3 text-neutral-600 max-w-xl">
            I craft performant, delightful web experiences. Open to
            collaborations, freelance projects, and full-time roles.
          </p>

          {/* <div className="mt-6 flex items-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2 text-sm md:text-base hover:bg-neutral-800 transition-colors"
            >
              Get in touch
            </a>
          </div> */}
        </div>

        {/* Social Links - Only visible on mobile */
        }
        <div className="block md:hidden px-6 py-6">
          <h3 className="text-xl font-semibold text-neutral-900">
            Social Links
          </h3>
          <div className="mt-4 space-y-6">
            {/* Social */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wide text-neutral-500 mb-2">
                Social
              </h4>
              <ul className="grid grid-rows-2 grid-flow-col auto-cols-max gap-x-4 gap-y-2">
                {socialLinks.map((item) => (
                  <li key={`${item.title}-${item.href}`} className="group">
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="relative inline-flex items-center gap-1 text-neutral-800 transition-colors duration-200 hover:text-neutral-900 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-neutral-800 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      <span className="inline-flex">{renderMobileIcon(item.icon)}</span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coding Profiles */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wide text-neutral-500 mb-2">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navLinks.map((item) => (
                  <li key={`${item.title}-${item.href}`} className="group">
                    <a
                      href={item.href}
                      className="relative inline-flex items-center gap-1 text-neutral-800 transition-colors duration-200 hover:text-neutral-900 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-neutral-800 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      <span className="inline-flex">{renderMobileIcon(item.icon)}</span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Dock Section - Only visible on desktop */}
        <div className="hidden md:block py-8">
          <div className="flex justify-center">
            <Dock className="items-end pb-3">
              {dockItems.map((item, idx) => (
                <DockItem
                  key={idx}
                  className="aspect-square rounded-full  bg-neutral-800 dark:bg-gray-200 hover:bg-neutral-700 dark:hover:bg-gray-300 transition-colors"
                >
                  <DockLabel>{item.title}</DockLabel>
                  <DockIcon>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                    >
                      {item.icon}
                    </a>
                  </DockIcon>
                </DockItem>
              ))}
            </Dock>
          </div>
        </div>

        {/* Dividing Line */}
        <div className="border-t border-gray-200 dark:border-gray-700 mx-6"></div>

        {/* Bottom Bar */}
        <div className="px-6 py-4 flex justify-between md:flex-row md:items-center md:justify-between text-black gap-2">
          {/* Left - Copyright and tagline (stacked on mobile) */}
          <div className="flex flex-col">
            <div className="text-sm md:text-lg">
              <span>© 2025 </span>
              <span className="font-semibold uppercase tracking-wide">Sambhav Surthi</span>
            </div>
            <div className="text-xs md:text-sm text-neutral-500 md:text-zinc-800">
              Designed and coded with <span className="text-red-500">❤️</span>
            </div>
          </div>

          {/* Right - Scroll to top (right-aligned on mobile) */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs md:text-base font-semibold uppercase tracking-widest">Back To Top</span>
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
