import type { Usuario } from '../../types/auth.types';
import ParticleBackground from '../ui/ParticleBackground';

interface WelcomeBannerProps {
  user: Usuario | null;
}

export const WelcomeBanner = ({ user }: WelcomeBannerProps) => {
  const displayName = user?.username || 'Usuario';

  const roleConfig: Record<
    string,
    { label: string; color: string; icon: string }
  > = {
    ADMIN: {
      label: 'Administrador',
      color:
        'from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    PROFESOR: {
      label: 'Profesor',
      color:
        'from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-600',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    },
    ESTUDIANTE: {
      label: 'Estudiante',
      color:
        'from-sky-400 to-cyan-500 dark:from-sky-500 dark:to-cyan-600',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
  };

  const currentRole = user?.rol || 'ESTUDIANTE';
  const cfg = roleConfig[currentRole] || roleConfig.ESTUDIANTE;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-500 dark:from-sky-600 dark:via-sky-700 dark:to-slate-800 text-white shadow-xl shadow-sky-400/30 dark:shadow-sky-950/50 animate-slideDown transition-colors duration-500">
      <ParticleBackground
        primaryColor="255, 255, 255"
        secondaryColor="186, 230, 253"
        linkDistance={130}
        adaptToTheme={false}
      />

      <div className="absolute top-0 right-0 w-72 h-72 bg-white/15 dark:bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full translate-y-1/2 blur-2xl pointer-events-none" />

      <div className="absolute top-6 right-8 opacity-10 dark:opacity-5 pointer-events-none">
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      </div>

      <div className="relative z-10 px-8 lg:px-14 py-10 lg:py-12 flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-3xl font-bold shadow-lg">
            {initial}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-4 border-white dark:border-slate-900 rounded-full animate-pulse" />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
            ¡Bienvenido,{' '}
            <span className="text-cyan-100 dark:text-cyan-200">
              {displayName}
            </span>
            ! 👋
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${cfg.color} shadow-md border border-white/30 dark:border-white/20`}
            >
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
                  d={cfg.icon}
                />
              </svg>
              {cfg.label}
            </span>

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              En línea
            </span>
          </div>

          <p className="text-cyan-50 dark:text-slate-300 text-sm mt-4 max-w-2xl">
            Aquí tienes un resumen en tiempo real de la gestión universitaria.
            Todo lo que necesitas, en un solo lugar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;