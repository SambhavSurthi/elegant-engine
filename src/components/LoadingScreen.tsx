import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const greetings = [
  'Hello',      // English
  'Hola',       // Spanish
  'Bonjour',    // French
  'Hallo',      // German
  'Ciao',       // Italian
  'Olá',        // Portuguese
  'こんにちは',     // Japanese
  '안녕하세요',      // Korean
  '你好',        // Chinese
  'Привет'      // Russian
];

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => {
        const next = prev + 1;
        if (next >= greetings.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnimatingOut(true);
            onComplete(); // Call immediately when animation starts
          }, 300);
          return prev;
        }
        return next;
      });
    }, 200); // Change greeting every 200ms

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-800 ease-in-out ${
      isAnimatingOut ? '-translate-y-full' : 'translate-y-0'
    }`} style={{ backgroundColor: 'rgba(248, 248, 248, 0.95)' }}>
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <img 
          src="/lovable-uploads/44f0f5e7-e53b-4f92-bb49-826d66aae41d.png" 
          alt="Logo" 
          className="max-w-md max-h-md object-contain"
        />
      </div>
      
      {/* Greeting Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black transition-all duration-300 animate-fade-in">
          {greetings[currentGreeting]}
        </h1>
      </div>
    </div>
  );
};