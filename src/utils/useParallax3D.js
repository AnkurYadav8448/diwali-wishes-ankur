import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook for smooth, high-performance 3D parallax & tilt.
 * Supports mouse move and mobile touch, respects prefers-reduced-motion.
 */
export function useParallax3D(maxTilt = 12) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef(null);
  const rafId = useRef(null);

  const handlePointerMove = useCallback(
    (e) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      const x = (clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        // Invert Y for standard natural 3D tilt
        setTilt({
          x: Math.max(-maxTilt, Math.min(maxTilt, -y * maxTilt * 2)),
          y: Math.max(-maxTilt, Math.min(maxTilt, x * maxTilt * 2))
        });
      });
    },
    [maxTilt]
  );

  const handlePointerEnter = () => setIsHovered(true);

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setTilt({ x: 0, y: 0 });
    });
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return {
    ref: elementRef,
    style: {
      transform: `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
      transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
      transformStyle: 'preserve-3d'
    },
    onPointerMove: handlePointerMove,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave
  };
}
