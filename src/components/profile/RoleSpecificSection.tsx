import type { ReactElement } from 'react';
import {
  FaGraduationCap,
  FaFlask,
  FaUserShield,
  FaKey,
  FaBullseye,
  FaTrophy,
  FaAward,
} from 'react-icons/fa';

interface RoleSpecificSectionProps {
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';
  extra: any;
}

interface InfoRow {
  label: string;
  value: string;
}

interface RoleConfig {
  title: string;
  subtitle: string;
  icon: ReactElement;
  gradient: string;
  particle: string;
  soft: string;
  rows: InfoRow[];
}

export const RoleSpecificSection = ({ rol, extra }: RoleSpecificSectionProps) => {
  if (!extra) return null;

  let cfg: RoleConfig;

  if (rol === 'ESTUDIANTE') {
    cfg = {
      title: 'Información académica',
      subtitle: 'Detalles de tu programa y progreso',
      icon: <FaGraduationCap />,
      gradient: 'from-sky-400 to-cyan-500',
      particle: 'bg-sky-300 dark:bg-sky-500',
      soft: 'from-sky-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      rows: [
        { label: 'Matrícula', value: extra.matricula ?? '—' },
        { label: 'Carrera', value: extra.carrera ?? '—' },
        { label: 'Facultad', value: extra.facultad ?? '—' },
        { label: 'Semestre actual', value: extra.semestre ? `${extra.semestre}º` : '—' },
      ],
    };
  } else if (rol === 'PROFESOR') {
    cfg = {
      title: 'Información profesional',
      subtitle: 'Detalles de tu cargo y especialidad',
      icon: <FaFlask />,
      gradient: 'from-emerald-400 to-green-500',
      particle: 'bg-emerald-300 dark:bg-emerald-500',
      soft: 'from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      rows: [
        { label: 'Código empleado', value: extra.codigoEmpleado ?? '—' },
        { label: 'Departamento', value: extra.departamento ?? '—' },
        { label: 'Facultad', value: extra.facultad ?? '—' },
        { label: 'Especialidad', value: extra.especialidad ?? '—' },
      ],
    };
  } else {
    cfg = {
      title: 'Información administrativa',
      subtitle: 'Detalles de tu rol y permisos',
      icon: <FaUserShield />,
      gradient: 'from-purple-400 to-fuchsia-500',
      particle: 'bg-purple-300 dark:bg-purple-500',
      soft: 'from-purple-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
      rows: [
        { label: 'Nivel de acceso', value: extra.nivelAcceso ?? '—' },
        { label: 'Departamento', value: extra.departamento ?? '—' },
        { label: 'Años de servicio', value: extra.aniosServicio ? `${extra.aniosServicio} años` : '—' },
        { label: 'Usuarios gestionados', value: extra.usuariosGestionados != null ? String(extra.usuariosGestionados) : '—' },
      ],
    };
  }

  const particles = [
    { top: '12%', left: '15%', size: 3, delay: '0s', duration: '5s' },
    { top: '70%', left: '45%', size: 4, delay: '0.8s', duration: '6s' },
    { top: '30%', left: '80%', size: 2, delay: '1.6s', duration: '4.5s' },
    { top: '85%', left: '78%', size: 3, delay: '2.4s', duration: '5.5s' },
    { top: '50%', left: '30%', size: 2, delay: '3.2s', duration: '6.5s' },
  ];

  const creditosAprobados = extra.creditosAprobados ?? 0;
  const creditosTotales = extra.creditosTotales ?? 1;
  const progresoCreditos = Math.round((creditosAprobados / creditosTotales) * 100);

  return (
    <div className={`group relative bg-gradient-to-br ${cfg.soft} bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden`}>
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/70 dark:bg-white/5 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${cfg.particle} opacity-50 animate-float`}
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

      <div className="relative flex items-start gap-4 mb-6">
        <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${cfg.gradient} text-white flex items-center justify-center shadow-lg flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
          {cfg.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{cfg.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cfg.subtitle}</p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cfg.rows.map((row, i) => (
          <div
            key={i}
            className="group/row relative p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-sky-100 dark:hover:border-slate-700 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <span className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${cfg.gradient} scale-y-0 group-hover/row:scale-y-100 origin-top transition-transform duration-300`} />
            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">
              {row.label}
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white mt-1 truncate">
              {row.value}
            </p>
          </div>
        ))}
      </div>

      {rol === 'ADMIN' && Array.isArray(extra.permisos) && extra.permisos.length > 0 && (
        <div className="relative mt-6 pt-6 border-t border-sky-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <FaKey className="w-3 h-3 text-purple-500 dark:text-purple-400" />
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
              Permisos del sistema
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {extra.permisos.map((p: string, i: number) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-950/50 dark:to-fuchsia-950/50 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/50 hover:scale-105 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <FaBullseye className="w-2.5 h-2.5" />
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {rol === 'ESTUDIANTE' && (
        <div className="relative mt-6 pt-6 border-t border-sky-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <FaTrophy className="w-3 h-3 text-sky-500 dark:text-sky-400" />
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
              Progreso de créditos
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {creditosAprobados} de {creditosTotales} créditos
            </p>
            <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
              {progresoCreditos}%
            </p>
          </div>
          <div className="h-2.5 bg-sky-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progresoCreditos}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      )}

      {rol === 'PROFESOR' && (
        <div className="relative mt-6 pt-6 border-t border-sky-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <FaAward className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
              Logros destacados
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Investigador', value: 'Top 5%' },
              { label: 'Docencia', value: 'Excelente' },
              { label: 'Publicaciones', value: `${extra.publicaciones ?? 0}+` },
            ].map((logro) => (
              <div
                key={logro.label}
                className="text-center p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/30 border border-emerald-100 dark:border-emerald-900/50 hover:scale-105 hover:shadow-md transition-all duration-300"
              >
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {logro.value}
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {logro.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSpecificSection;