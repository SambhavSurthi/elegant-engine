import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ArrowUp, MoveUpRight } from 'lucide-react';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const displayRef = useRef({ x: 0, y: 0 });
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  // Check if we should render the cursor (not on touch devices)
  const shouldRender = typeof window !== 'undefined' &&
    !window.matchMedia('(pointer: coarse)').matches;

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    let isMouseInside = false;


    const handleMouseMove = (e: MouseEvent) => {
      const newMousePosition = { x: e.clientX, y: e.clientY };
      
      // Calculate velocity if we have previous position and it's not the first movement
      if (isMouseInside) {
        velocityRef.current = {
          x: newMousePosition.x - previousMouseRef.current.x,
          y: newMousePosition.y - previousMouseRef.current.y,
        };
        
        // Calculate arrow rotation based on velocity direction
        // Only update if there's significant movement to avoid jitter and if user doesn't prefer reduced motion
        if (!prefersReducedMotion && (Math.abs(velocityRef.current.x) > 1 || Math.abs(velocityRef.current.y) > 1)) {
          const angle = Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);
          setArrowRotation(angle);
        }
      }
      
      previousMouseRef.current = { ...newMousePosition };
      mouseRef.current = newMousePosition;

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

      // INTERACTIVE STATE DETECTION: Check if target is interactive (buttons, links, etc.)
      const isInteractiveElement = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], select, textarea, [tabindex], [data-cursor="interactive"]');
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

        // INTERACTIVE CURSOR ALIGNMENT FIX: Get actual computed size from DOM for precise centering
        const computedStyle = window.getComputedStyle(cursorRef.current);
        const actualWidth = parseFloat(computedStyle.width);
        const actualHeight = parseFloat(computedStyle.height);
        const offsetX = actualWidth / 2; // Half the actual width to center horizontally
        const offsetY = actualHeight / 2; // Half the actual height to center vertically

        // Apply the transform with precise centering based on actual cursor dimensions
        cursorRef.current.style.transform = `translate3d(${displayRef.current.x - offsetX}px, ${displayRef.current.y - offsetY}px, 0)`;
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
  }, [shouldRender, prefersReducedMotion]);

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
          <div 
            className="cursor-arrow-rotator"
            style={{
              transform: `rotate(${arrowRotation}deg)`,
              transition: prefersReducedMotion ? 'none' : 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <ArrowUp size={40} className="cursor-arrow" />
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default CustomCursor;
