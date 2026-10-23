import { useLocation, Link } from 'react-router-dom';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import {
  FaUsers,
  FaBook,
  FaClipboardList,
  FaChartLine,
  FaArrowLeft,
  FaTools,
  FaCheckCircle,
  FaRocket,
} from 'react-icons/fa';
import type { ReactElement } from 'react';

interface ModuleConfig {
  title: string;
  description: string;
  icon: ReactElement;
  gradient: string;
  particle: string;
  features: string[];
}

const modulesConfig: Record<string, ModuleConfig> = {
  '/estudiantes': {
    title: 'Gestión de Estudiantes',
    description: 'Administra el listado completo de estudiantes de la universidad.',
    icon: <FaUsers />,
    gradient: 'from-sky-400 to-blue-500',
    particle: 'bg-sky-300',
    features: [
      'Registro y edición de estudiantes',
      'Búsqueda avanzada y filtros',
      'Asignación de carreras y facultades',
      'Historial académico completo',
    ],
  },
  '/materias': {
    title: 'Catálogo de Materias',
    description: 'Explora y gestiona todas las asignaturas disponibles.',
    icon: <FaBook />,
    gradient: 'from-purple-400 to-fuchsia-500',
    particle: 'bg-purple-300',
    features: [
      'Listado de materias por carrera',
      'Asignación de profesores',
      'Control de cupos',
      'Prerrequisitos y correquisitos',
    ],
  },
  '/inscripciones/nueva': {
    title: 'Nueva Inscripción',
    description: 'Registra un nuevo ingreso al sistema académico.',
    icon: <FaClipboardList />,
    gradient: 'from-emerald-400 to-green-500',
    particle: 'bg-emerald-300',
    features: [
      'Validación de datos en tiempo real',
      'Selección de materias y horarios',
      'Cálculo automático de créditos',
      'Generación de comprobante',
    ],
  },
  '/calificaciones': {
    title: 'Calificaciones',
    description: 'Consulta el rendimiento académico y las notas registradas.',
    icon: <FaChartLine />,
    gradient: 'from-amber-400 to-orange-500',
    particle: 'bg-amber-300',
    features: [
      'Visualización de notas por materia',
      'Promedio general y por período',
      'Historial de calificaciones',
      'Reportes de rendimiento',
    ],
  },
};

export const ModulePlaceholderPage = () => {
  const location = useLocation();
  const config = modulesConfig[location.pathname] || {
    title: 'Módulo en Desarrollo',
    description: 'Esta sección estará disponible próximamente.',
    icon: <FaTools />,
    gradient: 'from-slate-400 to-slate-500',
    particle: 'bg-slate-300',
    features: [],
  };

  const particles = [
    { top: '15%', left: '10%', size: 3, delay: '0s', duration: '5s' },
    { top: '70%', left: '20%', size: 4, delay: '0.8s', duration: '6s' },
    { top: '25%', left: '85%', size: 2, delay: '1.6s', duration: '4.5s' },
    { top: '80%', left: '75%', size: 3, delay: '2.4s', duration: '5.5s' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-200/40 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <div className="max-w-[1200px] mx-auto">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors duration-300 group"
            >
              <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Volver al dashboard
            </Link>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1200px] mx-auto">
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${config.gradient} text-white shadow-xl animate-slideDown`}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((p, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full bg-white/60 animate-float"
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

              <div className="absolute top-0 right-0 w-72 h-72 bg-white/15 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />

              <div className="relative z-10 px-8 lg:px-14 py-10 lg:py-12 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                  {config.icon}
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                    {config.title}
                  </h1>
                  <p className="text-white/90 text-sm mt-2 max-w-2xl">
                    {config.description}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-semibold">
                  <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" />
                  En construcción
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
              <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-sky-100/80 dark:border-slate-800 animate-slideUp">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${config.gradient} text-white flex items-center justify-center shadow-md`}>
                    <FaRocket />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                      ¿Qué podrás hacer aquí?
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Funcionalidades planificadas para este módulo
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/50 border border-sky-100/60 dark:border-slate-700"
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} text-white flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <FaCheckCircle className="w-3 h-3" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-sky-100/80 dark:border-slate-800 flex flex-col items-center justify-center text-center animate-slideUp animation-delay-200">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} text-white flex items-center justify-center text-2xl shadow-lg mb-4 animate-float`}>
                  <FaTools />
                </div>
                <h3 className="text-base font-bold text-gray-800 dark:text-white">
                  Próximamente
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-[200px]">
                  Estamos trabajando para tener este módulo listo.
                </p>
                <Link
                  to="/dashboard"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaArrowLeft className="w-3 h-3" />
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePlaceholderPage;