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

const data = [
  { mes: 'Ene', inscripciones: 45 },
  { mes: 'Feb', inscripciones: 62 },
  { mes: 'Mar', inscripciones: 58 },
  { mes: 'Abr', inscripciones: 78 },
  { mes: 'May', inscripciones: 92 },
  { mes: 'Jun', inscripciones: 85 },
  { mes: 'Jul', inscripciones: 40 },
  { mes: 'Ago', inscripciones: 55 },
  { mes: 'Sep', inscripciones: 120 },
  { mes: 'Oct', inscripciones: 98 },
  { mes: 'Nov', inscripciones: 88 },
  { mes: 'Dic', inscripciones: 72 },
];

export const EnrollmentChart = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const axisColor = isDark ? '#64748b' : '#94a3b8';
  const gridColor = isDark ? '#1e293b' : '#e0f2fe';

  return (
    <div className="group relative bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />

      <div className="relative flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-5 bg-gradient-to-b from-sky-500 to-blue-600 dark:from-sky-400 dark:to-cyan-500 rounded-full" />
            Inscripciones mensuales
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
            Evolución de los últimos 12 meses
          </p>
        </div>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
          ▲ 23% anual
        </span>
      </div>

      <div className="relative h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 12 }}
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
                color: isDark ? '#7dd3fc' : '#0ea5e9',
              }}
            />
            <Area
              type="monotone"
              dataKey="inscripciones"
              stroke="#0ea5e9"
              strokeWidth={3}
              fill="url(#enrollGradient)"
              dot={{ fill: '#0ea5e9', r: 4, strokeWidth: 2, stroke: isDark ? '#0f172a' : 'white' }}
              activeDot={{ r: 6, fill: '#0284c7', stroke: isDark ? '#0f172a' : 'white', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnrollmentChart;