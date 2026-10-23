import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import StatusModal from '../components/ui/SuccessModal';
import { registerUser } from '../api/auth';
import { useTheme } from '../hooks/useTheme';

const RegisterPage: React.FC = () => {
  const { loading, error } = useAuth();
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isDark = resolvedTheme === 'dark';

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
    title: '',
    message: '',
    details: '',
    showRetry: false,
  });
  const [registeredUser, setRegisteredUser] = useState<string>('');
  const [lastSubmitData, setLastSubmitData] = useState<any>(null);

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
        80,
        Math.floor((window.innerWidth * window.innerHeight) / 15000)
      );
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particleColor = isDark ? '125, 211, 252' : '14, 165, 233';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${
              0.1 * (1 - distance / 150)
            })`;
            ctx.lineWidth = 0.5;
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

  const showErrorModal = (
    title: string,
    message: string,
    details: string = '',
    showRetry: boolean = true
  ) => {
    setModalState({
      isOpen: true,
      type: 'error',
      title,
      message,
      details,
      showRetry,
    });
  };

  const showSuccessModal = (username: string) => {
    setModalState({
      isOpen: true,
      type: 'success',
      title: '¡Bienvenido! ✨',
      message: `¡Hola ${username}! Tu cuenta ha sido creada con éxito. Estás a un paso de comenzar tu viaje académico.`,
      details: '',
      showRetry: false,
    });
  };

  const handleSubmit = async (data: any) => {
    try {
      setLastSubmitData(data);

      const newUser = await registerUser({
        username: data.username,
        password: data.password,
      });

      console.log('✅ Usuario registrado:', newUser);

      setRegisteredUser(data.username);
      showSuccessModal(data.username);
    } catch (err: any) {
      console.error('❌ Error en registro:', err);

      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        showErrorModal(
          'Tiempo de Espera Agotado ⏰',
          'El servidor no está respondiendo. Por favor, verifica tu conexión a internet.',
          'El servidor tardó demasiado en responder. Asegúrate de estar conectado a internet e intenta nuevamente.',
          true
        );
      } else if (err.message?.includes('Network Error') || !err.response) {
        showErrorModal(
          'Servidor No Disponible 🌐',
          'No se puede conectar al servidor. Verifica tu conexión a internet.',
          'El servidor está fuera de servicio o tu conexión a internet podría estar fallando.',
          true
        );
      } else if (err.response?.status === 409) {
        showErrorModal(
          'Usuario No Disponible 👤',
          'El nombre de usuario ya está en uso.',
          `El usuario "${data.username}" ya existe. Por favor, elige otro nombre de usuario.`,
          true
        );
      } else if (err.response?.status === 400) {
        const errorMessage =
          err.response?.data?.message ||
          'Datos inválidos. Verifica tu información.';
        showErrorModal(
          'Datos Inválidos 📝',
          'Hay errores en la información proporcionada.',
          errorMessage,
          true
        );
      } else if (err.response?.status === 500) {
        showErrorModal(
          'Error del Servidor ⚠️',
          'El servidor tuvo un problema interno.',
          'Estamos trabajando para resolverlo. Por favor, intenta nuevamente más tarde.',
          true
        );
      } else if (err.response?.status === 429) {
        showErrorModal(
          'Demasiados Intentos 🚦',
          'Has realizado demasiados intentos de registro.',
          'Por favor, espera unos minutos antes de intentar nuevamente.',
          true
        );
      } else if (err.response?.status === 403) {
        showErrorModal(
          'Acceso Denegado 🔒',
          'No tienes permiso para registrarte.',
          'Contacta al administrador si crees que esto es un error.',
          false
        );
      } else {
        showErrorModal(
          'Error Inesperado ❌',
          'Ocurrió un error al registrar tu cuenta.',
          err.message || 'Por favor, intenta nuevamente más tarde.',
          true
        );
      }
    }
  };

  const handleRetry = async () => {
    if (lastSubmitData) {
      setModalState((prev) => ({ ...prev, isOpen: false }));
      await handleSubmit(lastSubmitData);
    }
  };

  const handleModalClose = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));

    if (modalState.type === 'success') {
      navigate('/login', {
        state: {
          message: `✅ Cuenta "${registeredUser}" creada exitosamente. Ahora inicia sesión.`,
        },
      });
    }
  };

  const displayError = error;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/40 backdrop-blur-[2px] transition-colors duration-500" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="hidden lg:block text-white animate-slideRight">
            <div className="relative overflow-hidden bg-gradient-to-br from-sky-600/90 to-blue-700/90 dark:from-sky-800/90 dark:to-slate-800/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-white/10 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 dark:bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl pointer-events-none" />

              <div className="relative flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-white/20 dark:bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Crear Cuenta</h2>
                  <p className="text-white/80 text-sm">
                    Únete a nuestra comunidad
                  </p>
                </div>
              </div>

              <h3 className="relative text-4xl font-bold mb-4 leading-tight">
                Comienza tu <br />
                <span className="text-sky-200 dark:text-cyan-300">
                  viaje académico
                </span>
              </h3>

              <p className="relative text-white/80 text-lg mb-8 leading-relaxed">
                Regístrate y accede a todos los recursos educativos, cursos y
                herramientas de aprendizaje.
              </p>

              <div className="relative space-y-4">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Acceso a todos los cursos</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Materiales educativos exclusivos</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Comunidad de aprendizaje</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Soporte 24/7</span>
                </div>
              </div>

              <div className="relative mt-8 pt-8 border-t border-white/20 dark:border-white/10">
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>100% Gratuito</span>
                  </span>
                  <span className="hidden sm:inline">|</span>
                  <span>🔒 Datos seguros</span>
                  <span className="hidden sm:inline">|</span>
                  <span>⚡ Registro rápido</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto animate-slideLeft">
            <AuthLayout
              title="Crear Cuenta"
              subtitle="Regístrate para comenzar tu viaje académico"
              showLogo={true}
            >
              <RegisterForm
                onSubmit={handleSubmit}
                isLoading={loading}
                error={displayError}
              />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ¿Ya tienes cuenta?{' '}
                  <Link
                    to="/login"
                    className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-all duration-300 hover:underline"
                  >
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Al registrarte, aceptas nuestros{' '}
                  <a
                    href="#"
                    className="text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Términos y Condiciones
                  </a>{' '}
                  y nuestra{' '}
                  <a
                    href="#"
                    className="text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Política de Privacidad
                  </a>
                </p>
              </div>
            </AuthLayout>
          </div>
        </div>
      </div>

      <StatusModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        onRetry={handleRetry}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        details={modalState.details}
        showRetry={modalState.showRetry}
        showBackButton={modalState.type === 'error' && !modalState.showRetry}
        confirmButtonText={
          modalState.type === 'success' ? 'Ir al Login' : 'Entendido'
        }
        backButtonText="Volver al Registro"
      />
    </div>
  );
};

export default RegisterPage;