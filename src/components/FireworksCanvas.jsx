import React, { useEffect, useRef } from 'react';

export default function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // If reduced motion is requested, render a calm, subtle ambient glow without explosions
    if (prefersReducedMotion) {
      const drawStaticAmbient = () => {
        ctx.clearRect(0, 0, width, height);
        // Soft static golden embers
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.arc((i * width) / 20, (Math.sin(i) * 0.5 + 0.5) * height, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 234, 167, 0.2)';
          ctx.fill();
        }
      };
      drawStaticAmbient();
      return () => window.removeEventListener('resize', handleResize);
    }

    // Particle color palettes: Royal gold, warm orange, subtle festive red/crimson, and sparkling white
    const fireworkColors = [
      { r: 255, g: 234, b: 167 }, // Light gold
      { r: 245, g: 184, b: 66 },  // Imperial gold
      { r: 255, g: 123, b: 37 },  // Warm orange
      { r: 255, g: 77, b: 77 },   // Subtle festive vermillion
      { r: 255, g: 255, b: 255 }  // Sparkler core
    ];

    // Floating embers pool
    const emberCount = Math.min(width < 768 ? 30 : 50, 60);
    const embers = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
        opacity: Math.random() * 0.5 + 0.15,
        speedY: -(Math.random() * 0.45 + 0.18),
        speedX: (Math.random() - 0.5) * 0.25,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }

    // Fireworks state
    const rockets = [];
    const particles = [];
    const MAX_PARTICLES = 300;

    const createFirework = (targetX, targetY, startX = null, startY = null) => {
      const sx = startX !== null ? startX : targetX + (Math.random() - 0.5) * 60;
      const sy = startY !== null ? startY : height;
      const dx = targetX - sx;
      const dy = targetY - sy;
      const distance = Math.hypot(dx, dy);
      const speed = Math.min(12, distance / 32);

      rockets.push({
        x: sx,
        y: sy,
        targetX,
        targetY,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
        trail: [],
        color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)]
      });
    };

    const explode = (x, y, baseColor) => {
      const count = width < 768 ? 28 : 46;
      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, count);
      }

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.25;
        const speed = Math.random() * 4.2 + 1.2;
        const color = Math.random() > 0.35 ? baseColor : fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.018 + 0.014,
          gravity: 0.045,
          friction: 0.965,
          trail: []
        });
      }
    };

    // Click anywhere on canvas or screen to trigger interactive firework
    const handlePointerDown = (e) => {
      if (
        e.target &&
        (e.target.tagName === 'BUTTON' ||
          e.target.tagName === 'INPUT' ||
          e.target.closest('button') ||
          e.target.closest('input'))
      ) {
        return;
      }
      createFirework(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown);

    // Periodic gentle ambient fireworks
    let lastAmbientFirework = 0;
    let time = 0;

    const render = (timestamp) => {
      time += 0.03;

      // Transparent clear each frame - restores rich deep plum and black background!
      ctx.clearRect(0, 0, width, height);

      // 1. Render ambient floating embers
      embers.forEach((emb) => {
        emb.y += emb.speedY;
        emb.x += emb.speedX + Math.sin(time + emb.twinkleOffset) * 0.12;

        if (emb.y < -10) {
          emb.y = height + 10;
          emb.x = Math.random() * width;
        }

        const currentOpacity = emb.opacity * (0.6 + 0.4 * Math.sin(time * 2 + emb.twinkleOffset));
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, emb.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${emb.color.r}, ${emb.color.g}, ${emb.color.b}, ${Math.max(0, currentOpacity)})`;
        ctx.shadowBlur = emb.radius > 1.5 ? 6 : 2;
        ctx.shadowColor = 'rgba(229, 184, 66, 0.5)';
        ctx.fill();
      });

      // 2. Launch occasional ambient firework (every 5.5 - 7 seconds)
      if (timestamp - lastAmbientFirework > 5500 && rockets.length < 2) {
        const targetX = width * 0.18 + Math.random() * (width * 0.64);
        const targetY = height * 0.14 + Math.random() * (height * 0.32);
        createFirework(targetX, targetY);
        lastAmbientFirework = timestamp;
      }

      // 3. Update & render rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 5) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;

        // Draw rocket sparkle trail
        if (r.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(r.trail[0].x, r.trail[0].y);
          r.trail.forEach((pt) => ctx.lineTo(pt.x, pt.y));
          ctx.strokeStyle = `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, 0.65)`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        const distToTarget = Math.hypot(r.targetX - r.x, r.targetY - r.y);
        if (distToTarget < 18 || r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // 4. Update & render exploding particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 3) p.trail.shift();

        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0.02) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.7})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        // Draw particle head with sparkle twinkle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.7)`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
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
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
}
