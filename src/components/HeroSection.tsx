import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Add bounce effect on mount
    setTimeout(() => setIsVisible(true), 50);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero transition-all duration-500 ${isVisible ? 'animate-bounce-in' : 'opacity-0 scale-95'}`}>
      {/* Animated background elements */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.1) 0%, transparent 50%)`,
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center px-6 ${
        isVisible ? 'animate-bounce-in' : 'opacity-0 scale-95'
      }`}>
        <div className="mb-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text animate-glow">
            John Doe
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-primary rounded-full animate-pulse-glow" />
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Creative Developer & Digital Artist
        </p>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
          Crafting beautiful digital experiences with cutting-edge technology and stunning design
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <Button 
            size="lg" 
            className="px-8 py-3 bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-glow rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};