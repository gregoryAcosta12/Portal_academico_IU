import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaGraduationCap,
  FaUniversity,
  FaClipboardList,
} from 'react-icons/fa';

type ColorKey = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo';

interface StatCardProps {
  title: string;
  value: number;
  color: ColorKey;
  trend?: number;
}

const colorMap: Record<
  ColorKey,
  {
    bg: string;
    soft: string;
    text: string;
    icon: string;
    ring: string;
    glow: string;
    particle: string;
    orb: string;
  }
> = {
  blue: {
    bg: 'from-sky-400 to-blue-500',
    soft: 'from-sky-50 via-white to-blue-50 dark:from-sky-950/40 dark:via-slate-900 dark:to-blue-950/30',
    text: 'text-sky-600 dark:text-sky-400',
    icon: 'bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-950/60 dark:to-blue-950/40',
    ring: 'group-hover:ring-sky-200 dark:group-hover:ring-sky-900',
    glow: 'group-hover:shadow-sky-200/60 dark:group-hover:shadow-sky-500/20',
    particle: 'bg-sky-400 dark:bg-sky-500',
    orb: 'bg-sky-200/50 dark:bg-sky-500/20',
  },
  green: {
    bg: 'from-emerald-400 to-green-500',
    soft: 'from-emerald-50 via-white to-green-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-green-950/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: 'bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-950/60 dark:to-green-950/40',
    ring: 'group-hover:ring-emerald-200 dark:group-hover:ring-emerald-900',
    glow: 'group-hover:shadow-emerald-200/60 dark:group-hover:shadow-emerald-500/20',
    particle: 'bg-emerald-400 dark:bg-emerald-500',
    orb: 'bg-emerald-200/50 dark:bg-emerald-500/20',
  },
  purple: {
    bg: 'from-purple-400 to-fuchsia-500',
    soft: 'from-purple-50 via-white to-fuchsia-50 dark:from-purple-950/40 dark:via-slate-900 dark:to-fuchsia-950/30',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-950/60 dark:to-fuchsia-950/40',
    ring: 'group-hover:ring-purple-200 dark:group-hover:ring-purple-900',
    glow: 'group-hover:shadow-purple-200/60 dark:group-hover:shadow-purple-500/20',
    particle: 'bg-purple-400 dark:bg-purple-500',
    orb: 'bg-purple-200/50 dark:bg-purple-500/20',
  },
  yellow: {
    bg: 'from-amber-400 to-orange-500',
    soft: 'from-amber-50 via-white to-orange-50 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/30',
    text: 'text-amber-600 dark:text-amber-400',
    icon: 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/60 dark:to-orange-950/40',
    ring: 'group-hover:ring-amber-200 dark:group-hover:ring-amber-900',
    glow: 'group-hover:shadow-amber-200/60 dark:group-hover:shadow-amber-500/20',
    particle: 'bg-amber-400 dark:bg-amber-500',
    orb: 'bg-amber-200/50 dark:bg-amber-500/20',
  },
  red: {
    bg: 'from-red-400 to-rose-500',
    soft: 'from-red-50 via-white to-rose-50 dark:from-red-950/40 dark:via-slate-900 dark:to-rose-950/30',
    text: 'text-red-600 dark:text-red-400',
    icon: 'bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-950/60 dark:to-rose-950/40',
    ring: 'group-hover:ring-red-200 dark:group-hover:ring-red-900',
    glow: 'group-hover:shadow-red-200/60 dark:group-hover:shadow-red-500/20',
    particle: 'bg-red-400 dark:bg-red-500',
    orb: 'bg-red-200/50 dark:bg-red-500/20',
  },
  indigo: {
    bg: 'from-indigo-400 to-violet-500',
    soft: 'from-indigo-50 via-white to-violet-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-violet-950/30',
    text: 'text-indigo-600 dark:text-indigo-400',
    icon: 'bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950/60 dark:to-violet-950/40',
    ring: 'group-hover:ring-indigo-200 dark:group-hover:ring-indigo-900',
    glow: 'group-hover:shadow-indigo-200/60 dark:group-hover:shadow-indigo-500/20',
    particle: 'bg-indigo-400 dark:bg-indigo-500',
    orb: 'bg-indigo-200/50 dark:bg-indigo-500/20',
  },
};

const iconMap: Record<string, ReactElement> = {
  Estudiantes: <FaUserGraduate className="w-6 h-6" />,
  Profesores: <FaChalkboardTeacher className="w-6 h-6" />,
  Materias: <FaBook className="w-6 h-6" />,
  Carreras: <FaGraduationCap className="w-6 h-6" />,
  Facultades: <FaUniversity className="w-6 h-6" />,
  Inscripciones: <FaClipboardList className="w-6 h-6" />,
};

const useCountUp = (target: number, duration = 900) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

const StatCard = ({ title, value, color, trend }: StatCardProps) => {
  const c = colorMap[color];
  const animatedValue = useCountUp(value);

  const particles = [
    { top: '12%', left: '18%', size: 3, delay: '0s', duration: '5s' },
    { top: '25%', left: '82%', size: 4, delay: '0.7s', duration: '6s' },
    { top: '45%', left: '92%', size: 2, delay: '1.4s', duration: '4.5s' },
    { top: '68%', left: '8%', size: 3, delay: '2.1s', duration: '5.5s' },
    { top: '80%', left: '55%', size: 2, delay: '2.8s', duration: '6.5s' },
    { top: '35%', left: '48%', size: 3, delay: '3.5s', duration: '7s' },
  ];

  return (
    <div
      className={`group relative bg-gradient-to-br ${c.soft} bg-[length:200%_200%] 
                  rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 
                  transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl 
                  ring-2 ring-transparent ${c.ring} ${c.glow} overflow-hidden cursor-default
                  animate-gradient-shift`}
    >
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-60 animate-orb-pulse pointer-events-none">
        <div className={`w-full h-full rounded-full ${c.orb}`} />
      </div>
      <div className="absolute -bottom-20 -left-16 w-44 h-44 rounded-full blur-3xl opacity-40 animate-orb-pulse animation-delay-2000 pointer-events-none">
        <div className={`w-full h-full rounded-full ${c.orb}`} />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${c.particle} animate-float opacity-60`}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
              boxShadow: '0 0 6px currentColor',
            }}
          />
        ))}
      </div>

      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.bg} 
                    scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
      />

      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-transparent via-white/60 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative flex items-start justify-between">
        <div
          className={`w-14 h-14 rounded-2xl ${c.icon} flex items-center justify-center ${c.text} 
                      transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-inner`}
        >
          {iconMap[title] || <FaBook className="w-6 h-6" />}
        </div>

        {typeof trend === 'number' && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              trend >= 0
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400'
            }`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d={trend >= 0 ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div className="relative mt-5">
        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
          {title}
        </p>
        <p className={`text-3xl font-bold mt-1 ${c.text} tabular-nums`}>
          {animatedValue.toLocaleString()}
        </p>
      </div>

      <div className="relative mt-4 h-1 bg-white/70 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${c.bg} rounded-full 
                      transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min((value / 400) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;