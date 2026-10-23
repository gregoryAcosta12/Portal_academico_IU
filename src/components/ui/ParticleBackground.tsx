import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface ParticleBackgroundProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  darkPrimaryColor?: string;
  darkSecondaryColor?: string;
  particleCount?: number;
  linkDistance?: number;
  adaptToTheme?: boolean;
}

const ParticleBackground = ({
  className = '',
  primaryColor = '14, 165, 233',
  secondaryColor = '139, 92, 246',
  darkPrimaryColor,
  darkSecondaryColor,
  particleCount,
  linkDistance = 150,
  adaptToTheme = true,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const effectivePrimary = adaptToTheme
    ? isDark
      ? darkPrimaryColor ?? '125, 211, 252'
      : primaryColor
    : primaryColor;

  const effectiveSecondary = adaptToTheme
    ? isDark
      ? darkSecondaryColor ?? '167, 139, 250'
      : secondaryColor
    : secondaryColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const parent = canvas.parentElement;
    const resize = () => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.floor(rect.width);
      canvas.height = Math.floor(rect.height);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    resize();

    const count =
      particleCount ??
      Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.25,
        color: Math.random() > 0.5 ? effectivePrimary : effectiveSecondary,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < linkDistance) {
            const alpha = 0.15 * (1 - distance / linkDistance);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const ro = new ResizeObserver(() => {
      resize();
      particles.length = 0;
      const newCount =
        particleCount ??
        Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
      for (let i = 0; i < newCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.5 + 0.25,
          color: Math.random() > 0.5 ? effectivePrimary : effectiveSecondary,
        });
      }
    });

    if (parent) ro.observe(parent);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [
    effectivePrimary,
    effectiveSecondary,
    particleCount,
    linkDistance,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 block pointer-events-none ${className}`}
    />
  );
};

export default ParticleBackground;