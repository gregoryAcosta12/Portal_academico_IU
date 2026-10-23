import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaChartLine,
  FaUserGraduate,
  FaSearch,
  FaPrint,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaAward,
} from 'react-icons/fa';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { useAuth } from '../hooks/useAuth';
import { getEstudiantes } from '../api/estudiantes';
import { getRendimientoEstudiante, getMisCalificaciones } from '../api/calificaciones';
import type { Estudiante } from '../types/estudiante.types';
import type { RendimientoEstudiante } from '../types/calificacion.types';

export const CalificacionesPage = () => {
  const { user } = useAuth();
  const isStudent = user?.rol === 'ESTUDIANTE';

  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [rendimiento, setRendimiento] = useState<RendimientoEstudiante | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isStudent) {
      setLoading(true);
      getMisCalificaciones()
        .then((data) => setRendimiento(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      getEstudiantes().then(setEstudiantes);
    }
  }, [isStudent]);

  const handleSelectEstudiante = async (id: number) => {
    if (isStudent) return;
    
    try {
      setSelectedId(id);
      setLoading(true);
      setError(null);
      setRendimiento(null);
      const data = await getRendimientoEstudiante(id);
      setRendimiento(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredEstudiantes = estudiantes.filter(
    (e) =>
      e.nombre.toLowerCase().includes(search.toLowerCase()) ||
      e.apellido.toLowerCase().includes(search.toLowerCase()) ||
      e.matricula.toLowerCase().includes(search.toLowerCase())
  );

  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case 'Aprobada': return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50';
      case 'Reprobada': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50';
      case 'En curso': return 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-amber-200/40 dark:bg-amber-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-orange-200/40 dark:bg-orange-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

      <div className="relative z-10 print:hidden">
        <DashboardHeader />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors duration-300 group print:hidden"
          >
            <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
            Volver al dashboard
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center gap-4 mb-6 animate-slideDown print:hidden">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-300/40">
              <FaChartLine className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {isStudent ? 'Mis Calificaciones' : 'Calificaciones'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isStudent ? 'Consulta tu historial académico' : 'Consulta el rendimiento de los estudiantes'}
              </p>
            </div>
          </div>

          <div className={isStudent ? "max-w-4xl mx-auto" : "grid grid-cols-1 lg:grid-cols-12 gap-6"}>
            
            {!isStudent && (
              <div className="lg:col-span-4 space-y-4 print:hidden">
                <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-sm border border-amber-100/80 dark:border-slate-800 p-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar estudiante..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-100 dark:border-slate-700 focus:border-amber-400 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900/50 outline-none transition-all text-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-sm border border-amber-100/80 dark:border-slate-800 overflow-hidden max-h-[600px] overflow-y-auto">
                  {filteredEstudiantes.map((est) => (
                    <button
                      key={est.id}
                      onClick={() => handleSelectEstudiante(est.id)}
                      className={`w-full flex items-center gap-3 p-4 border-b border-gray-100 dark:border-slate-800 last:border-0 transition-colors text-left ${
                        selectedId === est.id
                          ? 'bg-amber-50 dark:bg-amber-950/20 border-l-4 border-l-amber-500'
                          : 'hover:bg-gray-50 dark:hover:bg-slate-800/50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {est.nombre[0]}{est.apellido[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 dark:text-white truncate">{est.nombre} {est.apellido}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{est.matricula}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={isStudent ? "col-span-1" : "lg:col-span-8"}>
              {!isStudent && !selectedId ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-gray-300 dark:border-slate-700 p-8 text-center print:hidden">
                  <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl mb-4">
                    <FaUserGraduate />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Selecciona un estudiante</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    Elige un estudiante de la lista de la izquierda para ver su historial académico.
                  </p>
                </div>
              ) : loading ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-amber-100 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-full border-4 border-amber-100 dark:border-slate-800 border-t-amber-500 animate-spin mb-3" />
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Cargando calificaciones...</p>
                </div>
              ) : error ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-red-200 dark:border-red-900/40 p-8 text-center">
                  <FaTimesCircle className="w-12 h-12 text-red-500 mb-3" />
                  <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                </div>
              ) : rendimiento ? (
                <div className="space-y-5 animate-slideUp">
                  <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-100/80 dark:border-slate-800 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 dark:bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl text-white font-bold shadow-lg shadow-amber-300/40">
                          {rendimiento.nombreCompleto.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{rendimiento.nombreCompleto}</h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{rendimiento.carrera} · {rendimiento.matricula}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200 transition-all print:hidden"
                      >
                        <FaPrint /> Imprimir
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3 text-center border border-amber-100 dark:border-amber-900/50">
                        <p className="text-[10px] uppercase text-amber-700 dark:text-amber-400 font-bold mb-1">Promedio</p>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{rendimiento.promedioGeneral.toFixed(2)}</p>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 text-center border border-emerald-100 dark:border-emerald-900/50">
                        <p className="text-[10px] uppercase text-emerald-700 dark:text-emerald-400 font-bold mb-1">Créditos</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{rendimiento.creditosAprobados}</p>
                      </div>
                      <div className="bg-sky-50 dark:bg-sky-950/30 rounded-xl p-3 text-center border border-sky-100 dark:border-sky-900/50">
                        <p className="text-[10px] uppercase text-sky-700 dark:text-sky-400 font-bold mb-1">Materias</p>
                        <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{rendimiento.asignaturas.length}</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-3 text-center border border-purple-100 dark:border-purple-900/50">
                        <p className="text-[10px] uppercase text-purple-700 dark:text-purple-400 font-bold mb-1">Aprobadas</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {rendimiento.asignaturas.filter(a => a.estado === 'Aprobada').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-100/80 dark:border-slate-800 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
                      <FaAward className="text-amber-500 text-lg" />
                      <h3 className="font-bold text-gray-800 dark:text-white">Historial Académico</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                            <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Materia</th>
                            <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Período</th>
                            <th className="text-center px-5 py-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Nota</th>
                            <th className="text-center px-5 py-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rendimiento.asignaturas.map((nota) => (
                            <tr key={nota.id} className="border-b border-gray-100 dark:border-slate-800/50 hover:bg-amber-50/30 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="px-5 py-4">
                                <p className="text-sm font-semibold text-gray-800 dark:text-white">{nota.materiaNombre}</p>
                                <p className="text-xs text-gray-500">{nota.materiaCodigo} · {nota.creditos} cr.</p>
                              </td>
                              <td className="px-5 py-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{nota.periodo}</span>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <span className={`text-lg font-bold ${
                                  nota.estado === 'En curso' ? 'text-gray-400' :
                                  nota.nota >= 80 ? 'text-emerald-600' : 
                                  nota.nota >= 70 ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                  {nota.estado === 'En curso' ? '--' : nota.nota}
                                </span>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getEstadoStyle(nota.estado)}`}>
                                  {nota.estado === 'Aprobada' && <FaCheckCircle className="w-2.5 h-2.5" />}
                                  {nota.estado === 'Reprobada' && <FaTimesCircle className="w-2.5 h-2.5" />}
                                  {nota.estado === 'En curso' && <FaClock className="w-2.5 h-2.5" />}
                                  {nota.estado}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalificacionesPage;