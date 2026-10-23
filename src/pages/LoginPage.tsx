import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import { useTheme } from '../hooks/useTheme';
import { FaCode } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth();
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const createParticles = () => {
      const count = Math.min(
        120,
        Math.floor((window.innerWidth * window.innerHeight) / 10000)
      );
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 3.5 + 1.5,
          opacity: Math.random() * 0.6 + 0.3,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particleColor = isDark ? '125, 211, 252' : '56, 189, 248'; 
      const linkDistance = 180;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${particleColor}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < linkDistance) {
            const alpha = 0.25 * (1 - distance / linkDistance);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDark]);

  const handleSubmit = async (data: { username: string; password: string }) => {
    try {
      await login(data);
      const rol = localStorage.getItem('rol');
      const routes: Record<string, string> = {
        ADMIN: '/dashboard',
        PROFESOR: '/dashboard',
        ESTUDIANTE: '/dashboard',
      };
      navigate(routes[rol || 'ESTUDIANTE'] || '/dashboard');
    } catch (err) {
      // Manejado por AuthContext
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-[#020617] transition-colors duration-500">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-100/50 via-transparent to-transparent dark:from-sky-900/30 dark:via-transparent dark:to-transparent pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/20 backdrop-blur-[1px] transition-colors duration-500" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Lado Izquierdo - Branding */}
          <div className="hidden lg:block text-white animate-slideRight">
            {/* 🎯 TARJETA IZQUIERDA CON CRISTAL TRANSPARENTE Y PARTÍCULAS INTERNAS */}
            <div className="relative overflow-hidden bg-gradient-to-br from-sky-600/80 to-blue-700/80 dark:from-slate-900/70 dark:to-slate-900/80 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-slate-700/50 transition-colors duration-500">
              
              {/* Partículas dentro de la tarjeta izquierda */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <span className="absolute top-[15%] left-[10%] w-1.5 h-1.5 bg-white/40 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '5s' }} />
                <span className="absolute top-[25%] left-[85%] w-2 h-2 bg-cyan-200/30 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '7s' }} />
                <span className="absolute top-[65%] left-[15%] w-2 h-2 bg-sky-300/30 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '6s' }} />
                <span className="absolute top-[80%] left-[75%] w-1 h-1 bg-white/50 rounded-full animate-float" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
                <span className="absolute top-[45%] left-[40%] w-1.5 h-1.5 bg-cyan-300/40 rounded-full animate-float" style={{ animationDelay: '1.5s', animationDuration: '5.5s' }} />
              </div>

              <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 dark:bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl pointer-events-none" />

              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-md">
                <FaCode className="w-3 h-3" />
                En desarrollo
              </div>

              <div className="relative z-10 flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-white/20 dark:bg-sky-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Portal Académico</h2>
                  <p className="text-white/80 text-sm">
                    Sistema de Gestión Universitaria
                  </p>
                </div>
              </div>

              <h3 className="relative z-10 text-4xl font-bold mb-4 leading-tight text-white">
                Bienvenido a tu
                <br />
                <span className="text-sky-200 dark:text-cyan-300">
                  plataforma educativa
                </span>
              </h3>

              <p className="relative z-10 text-white/80 text-lg mb-8 leading-relaxed">
                Accede a tus cursos, calificaciones y recursos académicos desde
                un solo lugar.
              </p>

              <div className="relative z-10 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl p-4 mb-8">
                <p className="text-sm font-semibold mb-1 flex items-center gap-2 text-white">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  ¿Cómo probar la aplicación?
                </p>
                <p className="text-xs text-white/70 leading-relaxed">
                  Usa los <strong>Usuarios de prueba</strong> que aparecen abajo en el formulario. 
                  Solo haz clic en uno (Estudiante, Profesor o Admin) y pulsa <strong>"Iniciar Sesión"</strong>.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-8 border-t border-white/20 dark:border-white/10">
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Sistema seguro</span>
                  </span>
                  <span className="hidden sm:inline">|</span>
                  <span>🔒 Datos encriptados</span>
                  <span className="hidden sm:inline">|</span>
                  <span>⚡ 24/7 Disponible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Derecho - Formulario */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto animate-slideLeft">
            <AuthLayout
              title="Bienvenido de vuelta"
              subtitle="Ingresa tu nombre de usuario y contraseña"
              showLogo={true}
            >
              <LoginForm
                onSubmit={handleSubmit}
                isLoading={loading}
                error={error}
              />
            </AuthLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;