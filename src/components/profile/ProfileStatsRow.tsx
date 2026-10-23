import type { ReactElement } from 'react';
import {
  FaBookOpen,
  FaCheckCircle,
  FaStar,
  FaClipboardList,
} from 'react-icons/fa';

interface StatItem {
  label: string;
  value: string | number;
  icon: ReactElement;
  color: string;
  bg: string;
  particle: string;
  soft: string;
  progress: number;
}

interface ProfileStatsRowProps {
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';
  extra: any;
}

export const ProfileStatsRow = ({ rol, extra }: ProfileStatsRowProps) => {
  if (!extra) return null;

  let items: StatItem[] = [];

  if (rol === 'ESTUDIANTE') {
    const progressCreditos = Math.round(
      (extra.creditosAprobados / extra.creditosTotales) * 100
    );
    items = [
      {
        label: 'Promedio',
        value: extra.promedio,
        icon: <FaStar />,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'from-amber-400 to-orange-500',
        particle: 'bg-amber-300 dark:bg-amber-500',
        soft: 'from-amber-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: Math.round((extra.promedio / 4) * 100),
      },
      {
        label: 'Materias',
        value: extra.materiasInscritas,
        icon: <FaBookOpen />,
        color: 'text-sky-600 dark:text-sky-400',
        bg: 'from-sky-400 to-blue-500',
        particle: 'bg-sky-300 dark:bg-sky-500',
        soft: 'from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: Math.min(extra.materiasInscritas * 15, 100),
      },
      {
        label: 'Créditos',
        value: `${extra.creditosAprobados}/${extra.creditosTotales}`,
        icon: <FaCheckCircle />,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'from-emerald-400 to-green-500',
        particle: 'bg-emerald-300 dark:bg-emerald-500',
        soft: 'from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: progressCreditos,
      },
      {
        label: 'Semestre',
        value: extra.semestre,
        icon: <FaClipboardList />,
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'from-purple-400 to-fuchsia-500',
        particle: 'bg-purple-300 dark:bg-purple-500',
        soft: 'from-purple-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: Math.min(extra.semestre * 12, 100),
      },
    ];
  } else if (rol === 'PROFESOR') {
    items = [
      {
        label: 'Experiencia',
        value: `${extra.aniosExperiencia} años`,
        icon: <FaStar />,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'from-amber-400 to-orange-500',
        particle: 'bg-amber-300 dark:bg-amber-500',
        soft: 'from-amber-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: Math.min(extra.aniosExperiencia * 6, 100),
      },
      {
        label: 'Materias',
        value: extra.materiasAsignadas,
        icon: <FaBookOpen />,
        color: 'text-sky-600 dark:text-sky-400',
        bg: 'from-sky-400 to-blue-500',
        particle: 'bg-sky-300 dark:bg-sky-500',
        soft: 'from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: extra.materiasAsignadas * 20,
      },
      {
        label: 'Estudiantes',
        value: extra.estudiantesACargo,
        icon: <FaCheckCircle />,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'from-emerald-400 to-green-500',
        particle: 'bg-emerald-300 dark:bg-emerald-500',
        soft: 'from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: Math.min((extra.estudiantesACargo / 200) * 100, 100),
      },
      {
        label: 'Publicaciones',
        value: extra.publicaciones,
        icon: <FaClipboardList />,
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'from-purple-400 to-fuchsia-500',
        particle: 'bg-purple-300 dark:bg-purple-500',
        soft: 'from-purple-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: Math.min((extra.publicaciones / 30) * 100, 100),
      },
    ];
  } else {
    items = [
      {
        label: 'Años servicio',
        value: extra.aniosServicio,
        icon: <FaStar />,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'from-amber-400 to-orange-500',
        particle: 'bg-amber-300 dark:bg-amber-500',
        soft: 'from-amber-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: extra.aniosServicio * 15,
      },
      {
        label: 'Usuarios',
        value: extra.usuariosGestionados,
        icon: <FaBookOpen />,
        color: 'text-sky-600 dark:text-sky-400',
        bg: 'from-sky-400 to-blue-500',
        particle: 'bg-sky-300 dark:bg-sky-500',
        soft: 'from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: Math.min((extra.usuariosGestionados / 2000) * 100, 100),
      },
      {
        label: 'Acciones hoy',
        value: extra.accionesRecientes,
        icon: <FaCheckCircle />,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'from-emerald-400 to-green-500',
        particle: 'bg-emerald-300 dark:bg-emerald-500',
        soft: 'from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: Math.min(extra.accionesRecientes * 2, 100),
      },
      {
        label: 'Permisos',
        value: extra.permisos.length,
        icon: <FaClipboardList />,
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'from-purple-400 to-fuchsia-500',
        particle: 'bg-purple-300 dark:bg-purple-500',
        soft: 'from-purple-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
        progress: extra.permisos.length * 15,
      },
    ];
  }

  const particles = [
    { top: '12%', left: '15%', size: 2, delay: '0s', duration: '4s' },
    { top: '70%', left: '80%', size: 3, delay: '0.8s', duration: '5s' },
    { top: '30%', left: '55%', size: 2, delay: '1.6s', duration: '4.5s' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slideUp animation-delay-200">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`group relative bg-gradient-to-br ${item.soft} bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-5 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/60 dark:bg-white/5 rounded-full blur-2xl animate-orb-pulse pointer-events-none" />

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p, j) => (
              <span
                key={j}
                className={`absolute rounded-full ${item.particle} opacity-60 animate-float`}
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

          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.bg} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
          />

          <div
            className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${item.bg} text-white flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
          >
            {item.icon}
          </div>

          <p className="relative text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mt-4">
            {item.label}
          </p>
          <p
            className={`relative text-2xl font-bold mt-1 ${item.color} tabular-nums`}
          >
            {item.value}
          </p>

          <div className="relative mt-3 h-1 bg-white/70 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${item.bg} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${Math.min(item.progress, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStatsRow;