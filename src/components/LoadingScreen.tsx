import { useState, useEffect,useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const greetings = [
  ". Hello", // English
  ". Hola", // Spanish
  ". Bonjour", // French     // German
  ". こんにちは", // Japanese
  ". 안녕하세요", // Korean
  ". 你好",
  ". नमस्ते", // Hindi
  ". నమస్కారం", // Telugu
  // Chinese      // Russian
];

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = "/lovable-uploads/c2011f8c-5fdb-4e8c-84ee-4da7ae2eba27.png";
    img.onload = () => setImageLoaded(true);

    // Show first greeting with animation
    setTimeout(() => setShowGreeting(true), 100);

    // Start cycling after initial delay
    setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentGreeting((prev) => {
          const next = prev + 1;
          if (next >= greetings.length) {
            clearInterval(interval);
            setTimeout(() => {
              setIsAnimatingOut(true);
              setTimeout(() => onComplete(), 100); // the main hero section coming delay
            }, 200);
            return prev;
          }
          return next;
        });
      }, 250); //text changind delay
    }, 900); // Wait 800ms before starting cycling
  }, [onComplete]);

  const boxRef1 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef1.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 300, duration: 1 }
    );
  }, []);

  const boxRef2 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef2.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 100, duration: 1 }
    );
  }, []);

  const boxRef3 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef3.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 300, duration: 1 }
    );
  }, []);


  const boxRef4 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef4.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: -300, duration: 1 }
    );
  }, []);

  const boxRef5 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef5.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: -100, duration: 1 }
    );
  }, []);

  const boxRef6 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef6.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: -300, duration: 1 }
    );
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black opacity-90 transition-transform duration-[1.5s] ease-in-out ${
        isAnimatingOut ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        {/* <img 
          src="/lovable-uploads/c2011f8c-5fdb-4e8c-84ee-4da7ae2eba27.png" 
          alt="Logo" 
          className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        /> */}
      </div>
{/* 
      <div className="absolute w-20 h-20 top-10 left-5" ref={boxRef1}>
        <img src="https://logo.svgcdn.com/o/mcp.svg" alt="MCP"  />
      </div>

      <div className="absolute w-20 h-20 top-70 left-10 "ref={boxRef2}>
        <img src="https://logo.svgcdn.com/l/tensorflow.svg" alt="MCP" />
      </div>

      <div className="absolute w-20 h-20 bottom-10 left-10"ref={boxRef3}>
        <img src="https://logo.svgcdn.com/l/pytorch-icon.svg" alt="MCP" />
      </div>

      <div className="absolute w-20 h-20 top-10 right-5 "ref={boxRef4}>
        <img src="https://logo.svgcdn.com/s/python-dark.svg" alt="MCP" />
      </div>

      <div className="absolute w-20 h-20 top-60 right-10 "ref={boxRef5}>
        <img src="https://logo.svgcdn.com/s/n8n-dark.svg" alt="MCP" />
      </div>

      <div className="absolute w-20 h-20 bottom-10 right-10 "ref={boxRef6}>
        <img src="https://logo.svgcdn.com/l/pinecone-icon.svg" alt="MCP" />
      </div> */}

      {/* Greeting Text */}
      <div className="relative z-10 text-center">
        <h1
          className={`text-7xl md:text-6xl font-bold text-white transition-all duration-500 ${
            showGreeting ? " animate-fade-in opacity-100" : "opacity-0"
          }`}
        >
          {greetings[currentGreeting]}
        </h1>
      </div>
    </div>
  );
};
