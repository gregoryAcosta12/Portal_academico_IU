import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';
import {
  FaUsers,
  FaBook,
  FaClipboardList,
  FaChartLine,
  FaArrowRight,
  FaUser,
  FaGraduationCap,
} from 'react-icons/fa';

interface Action {
  label: string;
  path: string;
  icon: ReactElement;
  gradient: string;
  description: string;
}

interface QuickActionsProps {
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';
}

export const QuickActions = ({ rol }: QuickActionsProps) => {
  const isStudent = rol === 'ESTUDIANTE';

  // 🎯 Acciones para ADMIN y PROFESOR
  const adminActions: Action[] = [
    {
      label: 'Ver Estudiantes',
      path: '/estudiantes',
      icon: <FaUsers />,
      gradient: 'from-sky-400 to-blue-500',
      description: 'Gestiona el listado completo',
    },
    {
      label: 'Ver Materias',
      path: '/materias',
      icon: <FaBook />,
      gradient: 'from-purple-400 to-fuchsia-500',
      description: 'Catálogo de asignaturas',
    },
    {
      label: 'Nueva Inscripción',
      path: '/inscripciones/nueva',
      icon: <FaClipboardList />,
      gradient: 'from-emerald-400 to-green-500',
      description: 'Registra un nuevo ingreso',
    },
    {
      label: 'Ver Calificaciones',
      path: '/calificaciones',
      icon: <FaChartLine />,
      gradient: 'from-amber-400 to-orange-500',
      description: 'Consulta el rendimiento',
    },
  ];

  // 🎯 Acciones para ESTUDIANTE
  const studentActions: Action[] = [
    {
      label: 'Mis Calificaciones',
      path: '/calificaciones',
      icon: <FaChartLine />,
      gradient: 'from-amber-400 to-orange-500',
      description: 'Consulta tus notas',
    },
    {
      label: 'Mis Materias',
      path: '/materias',
      icon: <FaBook />,
      gradient: 'from-purple-400 to-fuchsia-500',
      description: 'Materias inscritas',
    },
    {
      label: 'Mi Perfil',
      path: '/perfil',
      icon: <FaUser />,
      gradient: 'from-sky-400 to-blue-500',
      description: 'Tus datos personales',
    },
    {
      label: 'Mi Progreso',
      path: '/perfil',
      icon: <FaGraduationCap />,
      gradient: 'from-emerald-400 to-green-500',
      description: 'Créditos y avance',
    },
  ];

  const actions = isStudent ? studentActions : adminActions;

  return (
    <section className="animate-slideUp animation-delay-400">
      <div className="relative bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 dark:border-slate-800 p-6 lg:p-8 overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-sky-500 to-blue-600 dark:from-sky-400 dark:to-cyan-500 rounded-full" />
              Accesos Rápidos
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
              {isStudent ? 'Tus atajos como estudiante' : 'Atajos a las funciones más usadas'}
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:border-transparent dark:hover:border-transparent"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} text-white flex items-center justify-center text-lg shadow-md transition-all duration-500 group-hover:bg-white/25 group-hover:backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3`}
                >
                  {action.icon}
                </div>

                <h3 className="mt-4 font-semibold text-gray-800 dark:text-white group-hover:text-white transition-colors duration-300">
                  {action.label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-white/80 transition-colors duration-300">
                  {action.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400 group-hover:text-white transition-colors duration-300">
                  Ir ahora
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;