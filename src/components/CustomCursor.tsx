import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoveUpRight } from 'lucide-react';
import './CustomCursor.css';

interface CustomCursorProps {}

const CustomCursor: React.FC<CustomCursorProps> = () => {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const displayRef = useRef({ x: 0, y: 0 });

  // Check if we should render the cursor (not on touch devices)
  const shouldRender = typeof window !== 'undefined' && 
    !window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (!shouldRender) return;

    let isMouseInside = false;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (!isMouseInside) {
        setIsVisible(true);
        isMouseInside = true;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      isMouseInside = false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target should be ignored
      if (target.closest('[data-cursor="ignore"]')) {
        return;
      }

      // Check if target is interactive
      const isInteractiveElement = target.closest('a, button, [role="button"], input[type="submit"], [data-cursor="interactive"]');
      setIsInteractive(!!isInteractiveElement);
    };

    const handleMouseOut = () => {
      setIsInteractive(false);
    };

    // Animation loop for smooth cursor movement
    const animateCursor = () => {
      if (cursorRef.current) {
        if (prefersReducedMotion) {
          // No smoothing for users who prefer reduced motion
          displayRef.current.x = mouseRef.current.x;
          displayRef.current.y = mouseRef.current.y;
        } else {
          // Linear interpolation for smooth movement
          const lerpFactor = 0.15;
          displayRef.current.x += (mouseRef.current.x - displayRef.current.x) * lerpFactor;
          displayRef.current.y += (mouseRef.current.y - displayRef.current.y) * lerpFactor;
        }

        cursorRef.current.style.transform = `translate3d(${displayRef.current.x}px, ${displayRef.current.y}px, 0)`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    // Set up event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Start animation loop
    animateCursor();

    // Set data attribute for hiding native cursor
    document.documentElement.setAttribute('data-has-custom-cursor', 'true');

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      document.documentElement.removeAttribute('data-has-custom-cursor');
    };
  }, [shouldRender]);

  // Don't render on touch devices or if window is not available
  if (!shouldRender) {
    return null;
  }

  return createPortal(
    <div
      ref={cursorRef}
      className={`custom-cursor ${isVisible ? 'visible' : ''} ${isInteractive ? 'interactive' : ''}`}
    >
      {isInteractive && (
        <div className="cursor-icon-container">
          <MoveUpRight size={26} className="cursor-arrow" />
        </div>
      )}
    </div>,
    document.body
  );
};

export default CustomCursor;
