import {
  FaTrophy,
  FaMedal,
  FaStar,
  FaAward,
  FaCrown,
  FaFire,
  FaRocket,
  FaShieldAlt,
} from 'react-icons/fa';
import type { ReactElement } from 'react';

interface AchievementsGridProps {
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: ReactElement;
  gradient: string;
  particle: string;
  unlocked: boolean;
}

const achievementsByRole: Record<string, Achievement[]> = {
  ESTUDIANTE: [
    { id: '1', title: 'Primer Semestre', description: 'Completaste tu primer semestre', icon: <FaStar />, gradient: 'from-sky-400 to-blue-500', particle: 'bg-sky-300', unlocked: true },
    { id: '2', title: 'Honor Roll', description: 'Promedio mayor a 3.5', icon: <FaTrophy />, gradient: 'from-amber-400 to-orange-500', particle: 'bg-amber-300', unlocked: true },
    { id: '3', title: '100 Créditos', description: 'Superaste los 100 créditos', icon: <FaMedal />, gradient: 'from-emerald-400 to-green-500', particle: 'bg-emerald-300', unlocked: true },
    { id: '4', title: 'Racha perfecta', description: '30 días seguidos activo', icon: <FaFire />, gradient: 'from-red-400 to-rose-500', particle: 'bg-red-300', unlocked: true },
    { id: '5', title: 'Investigador', description: 'Publica tu primer paper', icon: <FaRocket />, gradient: 'from-purple-400 to-fuchsia-500', particle: 'bg-purple-300', unlocked: false },
    { id: '6', title: 'Graduación', description: 'Completa todos los créditos', icon: <FaCrown />, gradient: 'from-indigo-400 to-violet-500', particle: 'bg-indigo-300', unlocked: false },
  ],
  PROFESOR: [
    { id: '1', title: 'Docente Novato', description: 'Primer año enseñando', icon: <FaStar />, gradient: 'from-emerald-400 to-green-500', particle: 'bg-emerald-300', unlocked: true },
    { id: '2', title: 'Top Rated', description: 'Calificación 4.5+', icon: <FaTrophy />, gradient: 'from-amber-400 to-orange-500', particle: 'bg-amber-300', unlocked: true },
    { id: '3', title: 'Investigador Senior', description: '20+ publicaciones', icon: <FaAward />, gradient: 'from-sky-400 to-blue-500', particle: 'bg-sky-300', unlocked: true },
    { id: '4', title: 'Mentor', description: '10 estudiantes graduados', icon: <FaShieldAlt />, gradient: 'from-purple-400 to-fuchsia-500', particle: 'bg-purple-300', unlocked: true },
    { id: '5', title: 'Innovador', description: 'Patente registrada', icon: <FaRocket />, gradient: 'from-red-400 to-rose-500', particle: 'bg-red-300', unlocked: false },
    { id: '6', title: 'Maestro', description: '15 años de docencia', icon: <FaCrown />, gradient: 'from-indigo-400 to-violet-500', particle: 'bg-indigo-300', unlocked: false },
  ],
  ADMIN: [
    { id: '1', title: 'Iniciado', description: 'Primer año como admin', icon: <FaStar />, gradient: 'from-purple-400 to-fuchsia-500', particle: 'bg-purple-300', unlocked: true },
    { id: '2', title: 'Guardián', description: '1000+ usuarios gestionados', icon: <FaShieldAlt />, gradient: 'from-sky-400 to-blue-500', particle: 'bg-sky-300', unlocked: true },
    { id: '3', title: 'Estratega', description: '5 reportes ejecutivos', icon: <FaTrophy />, gradient: 'from-amber-400 to-orange-500', particle: 'bg-amber-300', unlocked: true },
    { id: '4', title: 'Optimizador', description: 'Mejora del 20% en procesos', icon: <FaRocket />, gradient: 'from-emerald-400 to-green-500', particle: 'bg-emerald-300', unlocked: true },
    { id: '5', title: 'Líder', description: '10 años de servicio', icon: <FaCrown />, gradient: 'from-red-400 to-rose-500', particle: 'bg-red-300', unlocked: false },
    { id: '6', title: 'Leyenda', description: '20 años de servicio', icon: <FaMedal />, gradient: 'from-indigo-400 to-violet-500', particle: 'bg-indigo-300', unlocked: false },
  ],
};

export const AchievementsGrid = ({ rol }: AchievementsGridProps) => {
  const achievements = achievementsByRole[rol] || achievementsByRole.ESTUDIANTE;
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const config = {
    ESTUDIANTE: {
      soft: 'from-sky-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-sky-200/40 dark:bg-sky-500/10',
      tag: 'from-sky-400 to-blue-500 dark:from-sky-500 dark:to-cyan-500',
    },
    PROFESOR: {
      soft: 'from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-emerald-200/40 dark:bg-emerald-500/10',
      tag: 'from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-500',
    },
    ADMIN: {
      soft: 'from-purple-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-purple-200/40 dark:bg-purple-500/10',
      tag: 'from-purple-400 to-fuchsia-500 dark:from-purple-500 dark:to-fuchsia-500',
    },
  };
  const cfg = config[rol] || config.ESTUDIANTE;

  return (
    <div className={`group relative bg-gradient-to-br ${cfg.soft} bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden`}>
      <div className={`absolute -top-16 -right-16 w-40 h-40 ${cfg.orb} rounded-full blur-3xl animate-orb-pulse pointer-events-none`} />

      <div className="relative flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <span className={`w-1.5 h-5 bg-gradient-to-b ${cfg.tag} rounded-full`} />
            Logros desbloqueados
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
            {unlockedCount} de {achievements.length} completados
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 border border-gray-100 dark:border-slate-700">
          <FaTrophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {Math.round((unlockedCount / achievements.length) * 100)}%
          </span>
        </div>
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {achievements.map((a, i) => (
          <div
            key={a.id}
            className={`group/item relative rounded-xl p-4 text-center transition-all duration-500 overflow-hidden border ${
              a.unlocked
                ? 'bg-white/80 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border-sky-100 dark:border-slate-700 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
                : 'bg-gray-50/80 dark:bg-slate-900/60 border-gray-100 dark:border-slate-800 opacity-60 cursor-not-allowed'
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {a.unlocked && (
              <>
                <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${a.particle} animate-pulse`} />
                <span className={`absolute -inset-1 bg-gradient-to-br ${a.gradient} opacity-0 group-hover/item:opacity-10 rounded-xl transition-opacity duration-500`} />
              </>
            )}

            <div
              className={`relative w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-500 ${
                a.unlocked
                  ? `bg-gradient-to-br ${a.gradient} group-hover/item:scale-110 group-hover/item:rotate-6`
                  : 'bg-gray-300 dark:bg-slate-700'
              }`}
            >
              {a.icon}
            </div>

            <p
              className={`relative text-xs font-bold mt-3 ${
                a.unlocked ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {a.title}
            </p>
            <p
              className={`relative text-[10px] mt-1 ${
                a.unlocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {a.description}
            </p>

            {!a.unlocked && (
              <div className="relative mt-2 inline-flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Bloqueado
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsGrid;