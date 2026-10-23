import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTheme } from '../../hooks/useTheme';

const data = [
  { name: 'Ingeniería', value: 420, color: '#0ea5e9' },
  { name: 'Ciencias', value: 310, color: '#22c55e' },
  { name: 'Humanidades', value: 180, color: '#a855f7' },
  { name: 'Artes', value: 120, color: '#f59e0b' },
];

const total = data.reduce((s, d) => s + d.value, 0);

export const FacultyDonut = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="group relative bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-purple-200/40 dark:bg-purple-500/10 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />

      <div className="relative mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-5 bg-gradient-to-b from-purple-500 to-fuchsia-600 dark:from-purple-400 dark:to-fuchsia-500 rounded-full" />
          Distribución por facultad
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
          Total de estudiantes activos
        </p>
      </div>

      <div className="relative grid grid-cols-2 items-center">
        <div className="relative h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: isDark ? '#0f172a' : 'white',
                  border: isDark
                    ? '1px solid #1e293b'
                    : '1px solid #e9d5ff',
                  borderRadius: '12px',
                  boxShadow: isDark
                    ? '0 10px 30px rgba(0,0,0,0.5)'
                    : '0 10px 30px rgba(168,85,247,0.15)',
                  color: isDark ? '#e2e8f0' : '#0f172a',
                }}
                labelStyle={{
                  color: isDark ? '#f1f5f9' : '#0f172a',
                  fontWeight: 600,
                }}
                itemStyle={{
                  color: isDark ? '#c4b5fd' : '#a855f7',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {total}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Total
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((f) => (
            <div key={f.name} className="flex items-center gap-2 group/item">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125"
                style={{ background: f.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">
                  {f.name}
                </p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  {f.value} ({Math.round((f.value / total) * 100)}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyDonut;