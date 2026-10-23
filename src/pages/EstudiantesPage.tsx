import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaSearch,
  FaPlus,
  FaUserGraduate,
  FaTrashAlt,
  FaEdit,
  FaFilter,
} from 'react-icons/fa';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { EstudianteModal } from '../components/estudiantes/EstudianteModal';
import {
  getEstudiantes,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante,
} from '../api/estudiantes';
import type { Estudiante } from '../types/estudiante.types';

export const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEstudiante, setEditingEstudiante] = useState<Estudiante | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const data = await getEstudiantes();
    setEstudiantes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data: Omit<Estudiante, 'id' | 'matricula'>) => {
    if (editingEstudiante) {
      await updateEstudiante(editingEstudiante.id, data);
    } else {
      await createEstudiante(data);
    }
    await fetchData();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
      await deleteEstudiante(id);
      await fetchData();
    }
  };

  const filteredEstudiantes = estudiantes.filter((e) => {
    const matchSearch =
      e.nombre.toLowerCase().includes(search.toLowerCase()) ||
      e.apellido.toLowerCase().includes(search.toLowerCase()) ||
      e.matricula.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado === 'Todos' || e.estado === filterEstado;
    return matchSearch && matchEstado;
  });

  const estadoColors: Record<string, string> = {
    Activo: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
    Inactivo: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
    Graduado: 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400',
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-200/40 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <div className="max-w-[1400px] mx-auto">
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
          <div className="max-w-[1400px] mx-auto space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slideDown">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-sky-300/40">
                  <FaUserGraduate className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Estudiantes</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Administra el listado completo de estudiantes
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingEstudiante(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaPlus className="w-3.5 h-3.5" />
                Nuevo Estudiante
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-slideUp">
              {[
                { label: 'Total', value: estudiantes.length, color: 'from-sky-400 to-blue-500' },
                { label: 'Activos', value: estudiantes.filter((e) => e.estado === 'Activo').length, color: 'from-emerald-400 to-green-500' },
                { label: 'Inactivos', value: estudiantes.filter((e) => e.estado === 'Inactivo').length, color: 'from-red-400 to-rose-500' },
                { label: 'Graduados', value: estudiantes.filter((e) => e.estado === 'Graduado').length, color: 'from-purple-400 to-fuchsia-500' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-sky-100/80 dark:border-slate-800 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-sm border border-sky-100/80 dark:border-slate-800 p-4 animate-slideUp animation-delay-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, apellido o matrícula..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
                  />
                </div>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3.5 h-3.5" />
                  <select
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                    className="pl-9 pr-8 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 outline-none transition-all text-gray-800 dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="Todos">Todos los estados</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Graduado">Graduado</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-sm border border-sky-100/80 dark:border-slate-800 overflow-hidden animate-slideUp animation-delay-300">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-sky-100 dark:border-slate-800 border-t-sky-500 dark:border-t-sky-400 animate-spin" />
                  <p className="text-sm text-sky-600 dark:text-sky-400 font-medium">Cargando estudiantes...</p>
                </div>
              ) : filteredEstudiantes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-slate-800 flex items-center justify-center">
                    <FaUserGraduate className="w-7 h-7 text-sky-500 dark:text-sky-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No se encontraron estudiantes</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Prueba con otro filtro o búsqueda</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-sky-50/50 dark:bg-slate-800/50 border-b border-sky-100 dark:border-slate-700">
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Estudiante</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Matrícula</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Carrera</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Semestre</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Promedio</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Estado</th>
                        <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEstudiantes.map((e) => (
                        <tr
                          key={e.id}
                          className="border-b border-sky-50 dark:border-slate-800/50 hover:bg-sky-50/40 dark:hover:bg-slate-800/30 transition-colors duration-200"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {e.nombre.charAt(0)}{e.apellido.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{e.nombre} {e.apellido}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{e.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-xs font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded">
                              {e.matricula}
                            </code>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm text-gray-700 dark:text-gray-300">{e.carrera}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{e.facultad}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{e.semestre}º</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-sm font-bold ${e.promedio >= 3.5 ? 'text-emerald-600 dark:text-emerald-400' : e.promedio >= 3 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                              {e.promedio.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${estadoColors[e.estado]}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {e.estado}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  setEditingEstudiante(e);
                                  setIsModalOpen(true);
                                }}
                                className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 text-sky-600 dark:text-sky-400 flex items-center justify-center transition-all duration-200 hover:scale-110"
                              >
                                <FaEdit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(e.id)}
                                className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center transition-all duration-200 hover:scale-110"
                              >
                                <FaTrashAlt className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EstudianteModal
        isOpen={isModalOpen}
        estudiante={editingEstudiante}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default EstudiantesPage;