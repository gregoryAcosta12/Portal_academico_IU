import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';

interface SkillsRadarProps {
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';
}

const estudianteSkills = [
  { skill: 'Programación', value: 85 },
  { skill: 'Matemáticas', value: 72 },
  { skill: 'Trabajo equipo', value: 90 },
  { skill: 'Comunicación', value: 68 },
  { skill: 'Resolución', value: 88 },
  { skill: 'Creatividad', value: 75 },
];

const profesorSkills = [
  { skill: 'Docencia', value: 95 },
  { skill: 'Investigación', value: 88 },
  { skill: 'Publicaciones', value: 82 },
  { skill: 'Mentoría', value: 90 },
  { skill: 'Innovación', value: 78 },
  { skill: 'Liderazgo', value: 85 },
];

const adminSkills = [
  { skill: 'Gestión', value: 92 },
  { skill: 'Liderazgo', value: 88 },
  { skill: 'Análisis', value: 85 },
  { skill: 'Comunicación', value: 80 },
  { skill: 'Estrategia', value: 90 },
  { skill: 'Tecnología', value: 78 },
];

export const SkillsRadar = ({ rol }: SkillsRadarProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const config = {
    ESTUDIANTE: {
      title: 'Competencias',
      subtitle: 'Habilidades desarrolladas',
      color: '#0ea5e9',
      gradient:
        'from-sky-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-sky-200/40 dark:bg-sky-500/10',
      data: estudianteSkills,
      tag: 'from-sky-400 to-blue-500 dark:from-sky-500 dark:to-cyan-500',
    },
    PROFESOR: {
      title: 'Áreas de expertise',
      subtitle: 'Fortalezas profesionales',
      color: '#10b981',
      gradient:
        'from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-emerald-200/40 dark:bg-emerald-500/10',
      data: profesorSkills,
      tag: 'from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-500',
    },
    ADMIN: {
      title: 'Habilidades directivas',
      subtitle: 'Competencias de gestión',
      color: '#a855f7',
      gradient:
        'from-purple-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-purple-200/40 dark:bg-purple-500/10',
      data: adminSkills,
      tag: 'from-purple-400 to-fuchsia-500 dark:from-purple-500 dark:to-fuchsia-500',
    },
  };

  const cfg = config[rol] || config.ESTUDIANTE;

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const angleTickColor = isDark ? '#cbd5e1' : '#64748b';
  const radiusTickColor = isDark ? '#475569' : '#cbd5e1';

  return (
    <div
      className={`group relative bg-gradient-to-br ${cfg.gradient} bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden`}
    >
      <div
        className={`absolute -top-16 -left-16 w-40 h-40 ${cfg.orb} rounded-full blur-3xl animate-orb-pulse pointer-events-none`}
      />

      <div className="relative mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span
            className={`w-1.5 h-5 bg-gradient-to-b ${cfg.tag} rounded-full`}
          />
          {cfg.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
          {cfg.subtitle}
        </p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={cfg.data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: angleTickColor,
                fontSize: 11,
                fontWeight: 500,
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: radiusTickColor, fontSize: 9 }}
              axisLine={false}
            />
            <Radar
              name="Nivel"
              dataKey="value"
              stroke={cfg.color}
              fill={cfg.color}
              fillOpacity={isDark ? 0.25 : 0.35}
              strokeWidth={2.5}
              dot={{ fill: cfg.color, r: 3 }}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? '#0f172a' : 'white',
                border: isDark ? '1px solid #1e293b' : '1px solid #e0f2fe',
                borderRadius: '12px',
                boxShadow: isDark
                  ? '0 10px 30px rgba(0,0,0,0.5)'
                  : '0 10px 30px rgba(14,165,233,0.15)',
                color: isDark ? '#e2e8f0' : '#0f172a',
              }}
              labelStyle={{
                color: isDark ? '#f1f5f9' : '#0f172a',
                fontWeight: 600,
              }}
              itemStyle={{
                color: cfg.color,
              }}
              formatter={(value: any) => [`${value}%`, 'Nivel']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2">
        {cfg.data.slice(0, 3).map((s) => (
          <div
            key={s.skill}
            className="text-center p-2 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 hover:scale-105 hover:shadow-md transition-all duration-300"
          >
            <p className="text-xs font-bold text-gray-800 dark:text-white">
              {s.value}%
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {s.skill}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsRadar;