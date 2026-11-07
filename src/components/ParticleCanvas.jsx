import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool: warm gold, orange and amber embers
    const particleCount = Math.min(window.innerWidth < 768 ? 45 : 90, 100);
    const particles = [];

    const colors = [
      'rgba(255, 234, 167, ', // gold light
      'rgba(229, 184, 66, ',  // royal gold
      'rgba(255, 123, 37, ',  // warm orange
      'rgba(255, 177, 66, ',  // golden amber
      'rgba(255, 255, 255, '  // pure spark
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        baseColor: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 0.6 + 0.25),
        speedX: (Math.random() - 0.5) * 0.35,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.twinkleOffset) * 0.15;

        // Reset to bottom if drifted off top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity =
          p.opacity * (0.6 + 0.4 * Math.sin(time * 2 + p.twinkleOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.baseColor}${Math.max(0, currentOpacity)})`;
        ctx.shadowBlur = p.radius > 1.8 ? 10 : 4;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.75)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
      aria-hidden="true"
    />
  );
}
