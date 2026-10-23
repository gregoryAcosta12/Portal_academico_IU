import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaSearch,
  FaPlus,
  FaBook,
  FaTrashAlt,
  FaEdit,
  FaFilter,
  FaUsers,
} from 'react-icons/fa';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { MateriaModal } from '../components/materias/MateriaModal';
import {
  getMaterias,
  createMateria,
  updateMateria,
  deleteMateria,
} from '../api/materias';
import type { Materia } from '../types/materia.types';

export const MateriasPage = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMateria, setEditingMateria] = useState<Materia | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const data = await getMaterias();
    setMaterias(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data: Omit<Materia, 'id'>) => {
    if (editingMateria) {
      await updateMateria(editingMateria.id, data);
    } else {
      await createMateria(data);
    }
    await fetchData();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta materia?')) {
      await deleteMateria(id);
      await fetchData();
    }
  };

  const filteredMaterias = materias.filter((m) => {
    const matchSearch =
      m.nombre.toLowerCase().includes(search.toLowerCase()) ||
      m.codigo.toLowerCase().includes(search.toLowerCase()) ||
      m.profesor.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado === 'Todas' || m.estado === filterEstado;
    return matchSearch && matchEstado;
  });

  const estadoColors: Record<string, string> = {
    Activa: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
    Inactiva: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
  };

  const totalCupos = materias.reduce((acc, m) => acc + m.cupos, 0);
  const totalInscritos = materias.reduce((acc, m) => acc + m.inscritos, 0);
  const ocupacion = totalCupos > 0 ? Math.round((totalInscritos / totalCupos) * 100) : 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-200/40 dark:bg-purple-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-fuchsia-200/40 dark:bg-fuchsia-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

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
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-purple-300/40">
                  <FaBook className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Catálogo de Materias</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Explora y gestiona todas las asignaturas disponibles
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingMateria(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaPlus className="w-3.5 h-3.5" />
                Nueva Materia
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-slideUp">
              {[
                { label: 'Total materias', value: materias.length, color: 'from-purple-400 to-fuchsia-500' },
                { label: 'Activas', value: materias.filter((m) => m.estado === 'Activa').length, color: 'from-emerald-400 to-green-500' },
                { label: 'Cupos totales', value: totalCupos, color: 'from-sky-400 to-blue-500' },
                { label: 'Ocupación', value: `${ocupacion}%`, color: 'from-amber-400 to-orange-500' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-purple-100/80 dark:border-slate-800 overflow-hidden"
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

            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-sm border border-purple-100/80 dark:border-slate-800 p-4 animate-slideUp animation-delay-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar por código, nombre o profesor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
                  />
                </div>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3.5 h-3.5" />
                  <select
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                    className="pl-9 pr-8 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 outline-none transition-all text-gray-800 dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="Todas">Todas</option>
                    <option value="Activa">Activas</option>
                    <option value="Inactiva">Inactivas</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-sm border border-purple-100/80 dark:border-slate-800 overflow-hidden animate-slideUp animation-delay-300">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-purple-100 dark:border-slate-800 border-t-purple-500 dark:border-t-purple-400 animate-spin" />
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Cargando materias...</p>
                </div>
              ) : filteredMaterias.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-slate-800 flex items-center justify-center">
                    <FaBook className="w-7 h-7 text-purple-500 dark:text-purple-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No se encontraron materias</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Prueba con otro filtro o búsqueda</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-purple-50/50 dark:bg-slate-800/50 border-b border-purple-100 dark:border-slate-700">
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Materia</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Código</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Profesor</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Créditos</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Cupos</th>
                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Estado</th>
                        <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMaterias.map((m) => {
                        const porcentaje = m.cupos > 0 ? Math.round((m.inscritos / m.cupos) * 100) : 0;
                        return (
                          <tr
                            key={m.id}
                            className="border-b border-purple-50 dark:border-slate-800/50 hover:bg-purple-50/40 dark:hover:bg-slate-800/30 transition-colors duration-200"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                  <FaBook className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{m.nombre}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {m.carrera} · Semestre {m.semestre}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <code className="text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                                {m.codigo}
                              </code>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm text-gray-700 dark:text-gray-300">{m.profesor}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{m.creditos}</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                  <FaUsers className="w-3 h-3" />
                                  <span className="font-semibold">{m.inscritos}/{m.cupos}</span>
                                </div>
                                <div className="w-16 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      porcentaje >= 100
                                        ? 'bg-red-500'
                                        : porcentaje >= 80
                                        ? 'bg-amber-500'
                                        : 'bg-emerald-500'
                                    }`}
                                    style={{ width: `${Math.min(porcentaje, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${estadoColors[m.estado]}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {m.estado}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => {
                                    setEditingMateria(m);
                                    setIsModalOpen(true);
                                  }}
                                  className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 text-purple-600 dark:text-purple-400 flex items-center justify-center transition-all duration-200 hover:scale-110"
                                >
                                  <FaEdit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(m.id)}
                                  className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center transition-all duration-200 hover:scale-110"
                                >
                                  <FaTrashAlt className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MateriaModal
        isOpen={isModalOpen}
        materia={editingMateria}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default MateriasPage;