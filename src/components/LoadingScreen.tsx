import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const greetings = [
  '. Hello',      // English
  '. Hola',       // Spanish
  '. Bonjour',    // French     // German
  '. Ciao',       // Italian
  '. Olá',        // Portuguese
  '. こんにちは',     // Japanese
  '. 안녕하세요',      // Korean
  '. 你好',
          // Chinese      // Russian
];

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = "/lovable-uploads/c2011f8c-5fdb-4e8c-84ee-4da7ae2eba27.png";
    img.onload = () => setImageLoaded(true);
    
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => {
        const next = prev + 1;
        if (next >= greetings.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnimatingOut(true);
            setTimeout(() => onComplete(), 200); // Small delay for smooth transition
          }, 250);
          return prev;
        }
        return next; 
      });
    }, 180); // Faster greeting changes

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-[1s] ease-in-out ${
      isAnimatingOut ? '-translate-y-full' : 'translate-y-0'
    }`} style={{ backgroundColor: 'rgba(248, 248, 248, 0.95)' }}>
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <img 
          src="/lovable-uploads/c2011f8c-5fdb-4e8c-84ee-4da7ae2eba27.png" 
          alt="Logo" 
          className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      
      {/* Greeting Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 transition-all duration-300 animate-fade-in">
          {greetings[currentGreeting]}
        </h1>
      </div>
    </div>
  );
};