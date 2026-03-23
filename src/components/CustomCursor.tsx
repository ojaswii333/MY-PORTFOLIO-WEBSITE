'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  const ringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, .hoverable').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 0.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 -translate-x-1 -translate-y-1 rounded-full bg-accent-cyan"
          style={{ boxShadow: '0 0 10px rgba(0,240,255,0.5)' }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 2 : 1,
            opacity: isHovering ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-8 h-8 -translate-x-4 -translate-y-4 rounded-full border border-accent-cyan"
          style={{
            background: isHovering
              ? 'radial-gradient(circle, rgba(0,240,255,0.15), transparent)'
              : 'transparent',
            boxShadow: isHovering ? '0 0 20px rgba(0,240,255,0.2)' : 'none',
          }}
        />
      </motion.div>
    </>
  );
}
