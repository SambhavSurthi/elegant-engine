import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    document.addEventListener('mousemove', updateCursor);
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="cursor-dot"
        style={{
          left: `${position.x - 10}px`,
          top: `${position.y - 10}px`,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      
      {/* Cursor outline */}
      <div
        className="cursor-outline"
        style={{
          left: `${position.x - 20}px`,
          top: `${position.y - 20}px`,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    </>
  );
};