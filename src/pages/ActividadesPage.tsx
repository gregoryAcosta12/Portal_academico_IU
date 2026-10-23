import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaHistory,
  FaUserPlus,
  FaClipboardCheck,

  FaBookOpen,
  FaFileSignature,
  FaServer,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { getTodasLasActividades } from '../api/actividades';
import type { Actividad } from '../types/actividad.types';

export const ActividadesPage = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('todos');

  useEffect(() => {
    getTodasLasActividades()
      .then(setActividades)
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'usuario': return <FaUserPlus />;
      case 'calificacion': return <FaClipboardCheck />;
      case 'materia': return <FaBookOpen />;
      case 'inscripcion': return <FaFileSignature />;
      default: return <FaServer />;
    }
  };

  const filteredActividades = actividades.filter((a) => {
    const matchSearch =
      a.titulo.toLowerCase().includes(search.toLowerCase()) ||
      a.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      a.usuario.toLowerCase().includes(search.toLowerCase());
    const matchTipo = filterTipo === 'todos' || a.tipo === filterTipo;
    return matchSearch && matchTipo;
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-200/40 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <div className="max-w-[900px] mx-auto">
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
          <div className="max-w-[900px] mx-auto space-y-5">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slideDown">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-sky-300/40">
                  <FaHistory className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Historial de Actividad</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Registro cronológico de todo lo que sucede en el sistema
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-sm border border-sky-100/80 dark:border-slate-800 p-4 animate-slideUp">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar en el historial..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
                  />
                </div>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3.5 h-3.5" />
                  <select
                    value={filterTipo}
                    onChange={(e) => setFilterTipo(e.target.value)}
                    className="pl-9 pr-8 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 outline-none transition-all text-gray-800 dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="todos">Todas las actividades</option>
                    <option value="usuario">Usuarios</option>
                    <option value="calificacion">Calificaciones</option>
                    <option value="materia">Materias</option>
                    <option value="inscripcion">Inscripciones</option>
                    <option value="sistema">Sistema</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-sm border border-sky-100/80 dark:border-slate-800 p-6 sm:p-8 animate-slideUp animation-delay-200">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-sky-100 dark:border-slate-800 border-t-sky-500 dark:border-t-sky-400 animate-spin" />
                  <p className="text-sm text-sky-600 dark:text-sky-400 font-medium">Cargando historial...</p>
                </div>
              ) : filteredActividades.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-slate-800 flex items-center justify-center">
                    <FaHistory className="w-7 h-7 text-sky-500 dark:text-sky-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No se encontraron actividades</p>
                </div>
              ) : (
                <div className="relative border-l-2 border-sky-100 dark:border-slate-800 ml-4 space-y-8 pb-4">
                  {filteredActividades.map((act) => (
                    <div key={act.id} className="relative pl-8 group">
                      <div className={`absolute -left-[21px] top-1 w-10 h-10 rounded-full bg-gradient-to-br ${act.iconoColor} text-white flex items-center justify-center text-sm shadow-md border-4 border-white dark:border-slate-900 group-hover:scale-110 transition-transform duration-300 z-10`}>
                        {getIcon(act.tipo)}
                      </div>
                      
                      <div className="bg-sky-50/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-sky-100/50 dark:border-slate-700/50 group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h3 className="text-base font-bold text-gray-800 dark:text-white">
                            {act.titulo}
                          </h3>
                          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/50 px-2 py-0.5 rounded-full">
                            {act.fecha}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {act.descripcion}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600" />
                          Realizado por: <span className="font-semibold">{act.usuario}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActividadesPage;