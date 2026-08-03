import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;          // current X coordinate
  y: number;          // current Y coordinate
  z: number;          // depth coordinate (-1 to 1)
  baseX: number;      // target anchor X
  baseY: number;      // target anchor Y
  targetX: number;
  targetY: number;
  vx: number;         // X velocity
  vy: number;         // Y velocity
  phase: number;
  speed: number;
  sizeMultiplier: number;
}

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;      // if <= 100, treated as percentage of screen size (e.g. 12% = 12), else pixels
  ringRadius?: number;        // if <= 100, treated as percentage of screen size, else pixels
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  rotationSpeed?: number;
  pulseSpeed?: number;
  particleShape?: 'circle' | 'capsule';
  fieldStrength?: number;
}

export default function AntigravityBackground({
  count = 300,
  magnetRadius = 18,          // 18% range of screen width/height
  ringRadius = 6.5,           // 6.5% orbiting radius (closer clumping around mouse)
  waveSpeed = 0.4,
  waveAmplitude = 1.2,
  particleSize = 2.0,
  lerpSpeed = 0.11,           // snappier lerp speed
  color = 'var(--color-accent)',
  autoAnimate = false,
  rotationSpeed = 0.45,
  pulseSpeed = 3.0,
  particleShape = 'capsule',
  fieldStrength = 24          // higher magnet power
}: AntigravityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -2000, y: -2000, active: false });
  const resolvedColorRef = useRef('#dfc15d');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Helper to resolve CSS variables without triggering layout thrashing inside frame loop
    const resolveAccentColor = () => {
      if (color.startsWith('var(')) {
        const varName = color.replace('var(', '').replace(')', '').trim();
        resolvedColorRef.current = getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '#dfc15d';
      } else {
        resolvedColorRef.current = color;
      }
    };

    resolveAccentColor();

    // Listen to custom theme change event to update cached color
    const handleThemeChange = () => {
      // Delay slightly to let class list transitions apply
      setTimeout(resolveAccentColor, 30);
    };

    window.addEventListener('yasio-theme-change', handleThemeChange, { passive: true });
    document.addEventListener('click', handleThemeChange, { passive: true });

    // Generate particles scattered randomly over the entire screen
    const particles: Particle[] = [];
    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const px = Math.random() * width;
        const py = Math.random() * height;
        const pz = Math.random() * 2 - 1; // depth layer (-1: far background, 1: near foreground)

        particles.push({
          x: px,
          y: py,
          z: pz,
          baseX: px,
          baseY: py,
          targetX: px,
          targetY: py,
          vx: 0,
          vy: 0,
          phase: Math.random() * Math.PI * 2,
          speed: 0.18 + Math.random() * 0.35, // baseline drift speed
          sizeMultiplier: 0.6 + Math.random() * 0.7
        });
      }
    };

    createParticles();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const mouse = mouseRef.current;
    let actualMouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      actualMouseActive = true;
    };
    const handleMouseLeave = () => {
      actualMouseActive = false;
      if (!autoAnimate) {
        mouse.active = false;
        mouse.x = -2000;
        mouse.y = -2000;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let time = 0;

    const tick = () => {
      // Pause drawing and calculations if the background container is not active
      const container = document.getElementById('antigravity-bg-container');
      const isActive = container ? container.classList.contains('active') : false;

      // Pause drawing if tab is hidden to save battery/CPU resources
      if (!isActive || document.hidden) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Support Auto Animate (oscillating path when idle)
      if (autoAnimate && !actualMouseActive) {
        const cx = width / 2;
        const cy = height / 2;
        mouse.x = cx + Math.cos(time * 0.6) * (width * 0.15);
        mouse.y = cy + Math.sin(time * 0.9) * (height * 0.12);
        mouse.active = true;
      }

      // Read pre-resolved color from ref (0 forced layouts!)
      const resolvedColor = resolvedColorRef.current;

      // Calculate relative pixels ONCE per frame instead of inside the 300-particle loop
      const minDim = Math.min(width, height);
      const magnetPixels = magnetRadius <= 100 ? (magnetRadius / 100) * minDim : magnetRadius;
      const ringPixels = ringRadius <= 100 ? (ringRadius / 100) * minDim : ringRadius;

      // Sort by depth (Z) for realistic layering
      const sortedParticles = [...particles].sort((a, b) => b.z - a.z);

      sortedParticles.forEach(p => {
        // Calculate 3D scale factor based on depth z (-1 to 1)
        const scale = 1.0 + p.z * 0.45; // Foreground scale > 1, background scale < 1

        // Drift upwards against gravity, scaled by depth (foreground drifts faster)
        p.baseY -= p.speed * waveSpeed * scale * 3.5;
        if (p.baseY < -50) {
          p.baseY = height + 50;
          p.baseX = Math.random() * width;
          p.x = p.baseX;
        }

        // Horizontal waving motion
        const wave = Math.sin(time * 2.5 + p.phase) * waveAmplitude * 10 * scale;
        p.targetX = p.baseX + wave;
        p.targetY = p.baseY;

        let attracted = false;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

          if (dist < magnetPixels) {
            attracted = true;
            let angle = Math.atan2(dy, dx);
            
            // Constellation rotation orbit
            if (rotationSpeed > 0) {
              angle += time * rotationSpeed * 0.7;
            }

            // Pulse wave radius around cursor
            const pulseRadius = ringPixels + Math.sin(time * pulseSpeed + p.phase) * waveAmplitude * 8 * scale;
            
            // Circular coordinate target coordinates around the mouse pointer
            const ringX = mouse.x + Math.cos(angle) * pulseRadius;
            const ringY = mouse.y + Math.sin(angle) * pulseRadius;

            // Pull factor increases as they approach the center of the magnetic field, scaled by fieldStrength
            const pullFactor = (1 - dist / magnetPixels) * (fieldStrength / 10) * scale;
            
            // Apply accelerations to velocity instead of directly modifying coords for fluid momentum
            p.vx += (ringX - p.x) * lerpSpeed * pullFactor * 0.72;
            p.vy += (ringY - p.y) * lerpSpeed * pullFactor * 0.72;
          }
        }

        if (!attracted) {
          // Soft spring force returning particle back to flow line
          const rx = p.targetX - p.x;
          const ry = p.targetY - p.y;
          p.vx += rx * 0.016; 
          p.vy += ry * 0.016; 
        }

        // Unified physics integration step - guarantees 100% continuous, jump-free motion
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.90;
        p.vy *= 0.90;

        // Particle size calculation
        const size = Math.max(0.6, particleSize * scale * p.sizeMultiplier);

        // Draw particle representation
        ctx.beginPath();
        // Fade opacity based on depth (far background particles are dimmer)
        const depthOpacity = 0.35 + (p.z + 1.0) * 0.32; // ranges from 0.35 to 0.99
        
        ctx.fillStyle = resolvedColor;
        ctx.strokeStyle = resolvedColor;
        ctx.globalAlpha = depthOpacity * 0.85; // highly visible

        if (particleShape === 'capsule') {
          ctx.lineWidth = size * 0.85;
          ctx.lineCap = 'round';
          ctx.moveTo(p.x, p.y - size * 1.5);
          ctx.lineTo(p.x, p.y + size * 1.5);
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('yasio-theme-change', handleThemeChange);
      document.removeEventListener('click', handleThemeChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, magnetRadius, ringRadius, waveSpeed, waveAmplitude, particleSize, lerpSpeed, color, autoAnimate, rotationSpeed, pulseSpeed, particleShape, fieldStrength]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
