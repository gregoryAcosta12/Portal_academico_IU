import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';

interface PerformanceChartProps {
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';
}

const estudianteData = [
  { periodo: '1º Sem', promedio: 3.2 },
  { periodo: '2º Sem', promedio: 3.5 },
  { periodo: '3º Sem', promedio: 3.4 },
  { periodo: '4º Sem', promedio: 3.7 },
  { periodo: '5º Sem', promedio: 3.6 },
  { periodo: '6º Sem', promedio: 3.8 },
  { periodo: '7º Sem', promedio: 3.72 },
];

const profesorData = [
  { periodo: '2020', promedio: 4.2 },
  { periodo: '2021', promedio: 4.4 },
  { periodo: '2022', promedio: 4.5 },
  { periodo: '2023', promedio: 4.6 },
  { periodo: '2024', promedio: 4.8 },
];

const adminData = [
  { periodo: 'Ene', promedio: 82 },
  { periodo: 'Feb', promedio: 88 },
  { periodo: 'Mar', promedio: 91 },
  { periodo: 'Abr', promedio: 87 },
  { periodo: 'May', promedio: 94 },
  { periodo: 'Jun', promedio: 96 },
];

export const PerformanceChart = ({ rol }: PerformanceChartProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const config = {
    ESTUDIANTE: {
      title: 'Evolución del promedio',
      subtitle: 'Tu rendimiento a lo largo del tiempo',
      color: '#0ea5e9',
      gradient:
        'from-sky-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-sky-200/40 dark:bg-sky-500/10',
      data: estudianteData,
      dataKey: 'promedio',
      unit: '/ 4.0',
      trend: '+5.2%',
      tag: 'from-sky-400 to-blue-500 dark:from-sky-500 dark:to-cyan-500',
    },
    PROFESOR: {
      title: 'Evaluación docente',
      subtitle: 'Calificación de tus estudiantes',
      color: '#10b981',
      gradient:
        'from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-emerald-200/40 dark:bg-emerald-500/10',
      data: profesorData,
      dataKey: 'promedio',
      unit: '/ 5.0',
      trend: '+4.5%',
      tag: 'from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-500',
    },
    ADMIN: {
      title: 'Rendimiento operativo',
      subtitle: 'Eficiencia mensual del sistema',
      color: '#a855f7',
      gradient:
        'from-purple-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      orb: 'bg-purple-200/40 dark:bg-purple-500/10',
      data: adminData,
      dataKey: 'promedio',
      unit: '%',
      trend: '+3.8%',
      tag: 'from-purple-400 to-fuchsia-500 dark:from-purple-500 dark:to-fuchsia-500',
    },
  };

  const cfg = config[rol] || config.ESTUDIANTE;

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const axisColor = isDark ? '#64748b' : '#94a3b8';

  return (
    <div
      className={`group relative bg-gradient-to-br ${cfg.gradient} bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden`}
    >
      <div
        className={`absolute -top-16 -right-16 w-40 h-40 ${cfg.orb} rounded-full blur-3xl animate-orb-pulse pointer-events-none`}
      />

      <div className="relative flex items-center justify-between mb-6">
        <div>
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
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
          ▲ {cfg.trend}
        </span>
      </div>

      <div className="relative h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cfg.data}>
            <defs>
              <linearGradient
                id={`gradient-${rol}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={cfg.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={cfg.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="periodo"
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 11 }}
              domain={rol === 'ESTUDIANTE' ? [2.5, 4] : ['auto', 'auto']}
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
                color: isDark ? cfg.color : cfg.color,
              }}
              formatter={(value: any) => [`${value}${cfg.unit}`, 'Valor']}
            />
            <Area
              type="monotone"
              dataKey={cfg.dataKey}
              stroke={cfg.color}
              strokeWidth={3}
              fill={`url(#gradient-${rol})`}
              dot={{
                fill: cfg.color,
                r: 4,
                strokeWidth: 2,
                stroke: isDark ? '#0f172a' : 'white',
              }}
              activeDot={{
                r: 6,
                fill: cfg.color,
                stroke: isDark ? '#0f172a' : 'white',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;