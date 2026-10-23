import StatCard from '../ui/StatCard';
import type { DashboardStats as DashboardStatsData } from '../../types/dashboard.types';
import { useLanguage } from '../../hooks/useLanguage';

interface DashboardStatsProps {
  stats: DashboardStatsData | null;
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';
}

export const DashboardStats = ({ stats, rol }: DashboardStatsProps) => {
  const { t } = useLanguage();

  if (!stats) return null;

  // 🎯 LÓGICA POR ROL: Si es estudiante, mostramos datos personales
  const isStudent = rol === 'ESTUDIANTE';

  const items = isStudent
    ? ([
        { title: 'Mis Materias', value: 6, color: 'blue', trend: 0 },
        { title: 'Mi Promedio', value: 3.72, color: 'green', trend: 5 },
        { title: 'Créditos Aprobados', value: 142, color: 'purple', trend: 12 },
        { title: 'Asistencia', value: 95, color: 'yellow', trend: 2 },
        { title: 'Tareas Pendientes', value: 3, color: 'red', trend: -1 },
        { title: 'Semestre Actual', value: 7, color: 'indigo', trend: 0 },
      ] as const)
    : ([
        { title: t.dashboard.students, value: stats.totalEstudiantes, color: 'blue', trend: 5 },
        { title: t.dashboard.teachers, value: stats.totalProfesores, color: 'green', trend: 14 },
        { title: t.dashboard.subjects, value: stats.totalMaterias, color: 'purple', trend: 10 },
        { title: t.dashboard.careers, value: stats.totalCarreras, color: 'yellow', trend: 3 },
        { title: t.dashboard.faculties, value: stats.totalFacultades, color: 'red', trend: 3 },
        { title: t.dashboard.enrollments, value: stats.totalInscripciones, color: 'indigo', trend: 2 },
      ] as const);

  return (
    <section className="animate-slideUp animation-delay-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-sky-500 to-blue-600 dark:from-sky-400 dark:to-cyan-500 rounded-full" />
            {isStudent ? 'Mi Resumen' : t.dashboard.summary}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
            {isStudent ? 'Tu rendimiento académico actual' : t.dashboard.summaryDesc}
          </p>
        </div>
        
        {/* El botón de reportes solo lo mostramos a admins/profesores */}
        {!isStudent && (
          <button className="hidden sm:flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors duration-300 group">
            {t.dashboard.viewReports}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="animate-slideUp"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <StatCard
              title={item.title}
              value={item.value}
              color={item.color}
              trend={item.trend}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;