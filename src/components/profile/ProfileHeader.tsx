import type { ProfileData } from '../../types/profile.types';

interface ProfileHeaderProps {
  profile: ProfileData;
  onEdit: () => void;
}

export const ProfileHeader = ({ profile, onEdit }: ProfileHeaderProps) => {
  const roleConfig: Record<
    string,
    { label: string; color: string; icon: string; gradient: string; shadow: string }
  > = {
    ADMIN: {
      label: 'Administrador',
      color: 'from-sky-400 to-blue-500',
      gradient:
        'from-sky-400 via-sky-500 to-cyan-500 dark:from-sky-600 dark:via-sky-700 dark:to-slate-800',
      shadow: 'shadow-sky-400/30 dark:shadow-sky-950/50',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    PROFESOR: {
      label: 'Profesor',
      color: 'from-emerald-400 to-green-500',
      gradient:
        'from-emerald-400 via-green-500 to-teal-500 dark:from-emerald-600 dark:via-emerald-700 dark:to-slate-800',
      shadow: 'shadow-emerald-400/30 dark:shadow-emerald-950/50',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    },
    ESTUDIANTE: {
      label: 'Estudiante',
      color: 'from-sky-400 to-cyan-500',
      gradient:
        'from-sky-400 via-cyan-500 to-blue-500 dark:from-sky-600 dark:via-cyan-700 dark:to-slate-800',
      shadow: 'shadow-sky-400/30 dark:shadow-sky-950/50',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
  };

  const cfg = roleConfig[profile.rol] || roleConfig.ESTUDIANTE;
  const fullName =
    `${profile.nombre || ''} ${profile.apellido || ''}`.trim() || profile.username;
  const initial = (profile.nombre?.[0] || profile.username[0]).toUpperCase();

  const particles = [
    { top: '15%', left: '10%', size: 3, delay: '0s', duration: '5s' },
    { top: '70%', left: '25%', size: 4, delay: '0.8s', duration: '6s' },
    { top: '25%', left: '85%', size: 2, delay: '1.6s', duration: '4.5s' },
    { top: '80%', left: '70%', size: 3, delay: '2.4s', duration: '5.5s' },
    { top: '45%', left: '50%', size: 2, delay: '3.2s', duration: '7s' },
  ];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${cfg.gradient} text-white shadow-xl ${cfg.shadow} animate-slideDown transition-colors duration-500`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/50 dark:bg-white/40 animate-float"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-white/15 dark:bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full translate-y-1/2 blur-2xl pointer-events-none" />

      <div className="relative z-10 px-8 lg:px-14 pt-16 pb-10 lg:pb-12 flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-3xl bg-white/25 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl font-bold shadow-2xl">
            {initial}
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-400 border-4 border-white dark:border-slate-900 rounded-full">
            <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate text-white">
              {fullName}
            </h1>
            <span className="text-sm bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/30 dark:border-white/20">
              @{profile.username}
            </span>
          </div>

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
              {profile.estado}
            </span>

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {profile.ultimoAcceso}
            </span>
          </div>

          {profile.bio && (
            <p className="text-cyan-50 dark:text-slate-300 text-sm mt-4 max-w-2xl line-clamp-2">
              {profile.bio}
            </p>
          )}
        </div>

        <button
          onClick={onEdit}
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/25 hover:bg-white/40 dark:bg-white/15 dark:hover:bg-white/25 backdrop-blur-md border border-white/40 dark:border-white/25 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Editar perfil
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;