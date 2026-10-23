import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';

const data = [
  { name: 'Ing. Sistemas', estudiantes: 320, color: '#0ea5e9' },
  { name: 'Medicina', estudiantes: 280, color: '#ef4444' },
  { name: 'Derecho', estudiantes: 210, color: '#a855f7' },
  { name: 'Administración', estudiantes: 180, color: '#f59e0b' },
  { name: 'Psicología', estudiantes: 150, color: '#22c55e' },
];

export const TopCareersChart = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="group relative bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-200/40 dark:bg-emerald-500/10 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />

      <div className="relative mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-5 bg-gradient-to-b from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 rounded-full" />
          Top 5 carreras
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
          Con más estudiantes matriculados
        </p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 20, right: 20 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: isDark ? '#cbd5e1' : '#475569',
                fontSize: 12,
                fontWeight: 500,
              }}
              width={110}
            />
            <Tooltip
              cursor={{
                fill: isDark ? 'rgba(34,197,94,0.08)' : 'rgba(34,197,94,0.05)',
              }}
              contentStyle={{
                background: isDark ? '#0f172a' : 'white',
                border: isDark ? '1px solid #1e293b' : '1px solid #d1fae5',
                borderRadius: '12px',
                boxShadow: isDark
                  ? '0 10px 30px rgba(0,0,0,0.5)'
                  : '0 10px 30px rgba(34,197,94,0.15)',
                color: isDark ? '#e2e8f0' : '#0f172a',
              }}
              labelStyle={{
                color: isDark ? '#f1f5f9' : '#0f172a',
                fontWeight: 600,
              }}
              itemStyle={{
                color: isDark ? '#6ee7b7' : '#10b981',
              }}
            />
            <Bar dataKey="estudiantes" radius={[0, 8, 8, 0]} barSize={20}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCareersChart;