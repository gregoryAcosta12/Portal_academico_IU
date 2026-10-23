import { useEffect, useState } from 'react';
import { FaTimes, FaUserGraduate, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import type { Estudiante } from '../../types/estudiante.types';

interface EstudianteModalProps {
  isOpen: boolean;
  estudiante: Estudiante | null;
  onClose: () => void;
  onSave: (data: Omit<Estudiante, 'id' | 'matricula'>) => Promise<void>;
}

export const EstudianteModal = ({ isOpen, estudiante, onClose, onSave }: EstudianteModalProps) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    carrera: 'Ing. Sistemas',
    facultad: 'Ingeniería',
    semestre: 1,
    estado: 'Activo' as Estudiante['estado'],
    promedio: 0,
    fechaIngreso: new Date().toISOString().split('T')[0],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (estudiante) {
        setForm({
          nombre: estudiante.nombre,
          apellido: estudiante.apellido,
          email: estudiante.email,
          telefono: estudiante.telefono,
          carrera: estudiante.carrera,
          facultad: estudiante.facultad,
          semestre: estudiante.semestre,
          estado: estudiante.estado,
          promedio: estudiante.promedio,
          fechaIngreso: estudiante.fechaIngreso,
        });
      } else {
        setForm({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          carrera: 'Ing. Sistemas',
          facultad: 'Ingeniería',
          semestre: 1,
          estado: 'Activo',
          promedio: 0,
          fechaIngreso: new Date().toISOString().split('T')[0],
        });
      }
      setError(null);
    }
  }, [isOpen, estudiante]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.nombre || !form.apellido || !form.email) {
      setError('Por favor completa los campos obligatorios.');
      return;
    }

    try {
      setSaving(true);
      await onSave(form);
      onClose();
    } catch {
      setError('Ocurrió un error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-sky-100 dark:border-slate-800 animate-slideUp">
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-sky-100 dark:border-slate-800 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-md">
              <FaUserGraduate className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {estudiante ? 'Editar Estudiante' : 'Nuevo Estudiante'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {estudiante ? 'Modifica la información del estudiante' : 'Registra un nuevo estudiante'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border border-sky-100 dark:border-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 disabled:opacity-50"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Apellido</label>
              <input
                type="text"
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Teléfono</label>
              <input
                type="text"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Carrera</label>
              <select
                value={form.carrera}
                onChange={(e) => setForm({ ...form, carrera: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              >
                <option>Ing. Sistemas</option>
                <option>Medicina</option>
                <option>Derecho</option>
                <option>Administración</option>
                <option>Psicología</option>
                <option>Arquitectura</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Facultad</label>
              <select
                value={form.facultad}
                onChange={(e) => setForm({ ...form, facultad: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              >
                <option>Ingeniería</option>
                <option>Ciencias de la Salud</option>
                <option>Ciencias Sociales</option>
                <option>Negocios</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Semestre</label>
              <input
                type="number"
                min={1}
                max={12}
                value={form.semestre}
                onChange={(e) => setForm({ ...form, semestre: Number(e.target.value) })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Promedio</label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={4}
                value={form.promedio}
                onChange={(e) => setForm({ ...form, promedio: Number(e.target.value) })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Estado</label>
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value as Estudiante['estado'] })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Graduado">Graduado</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Fecha Ingreso</label>
              <input
                type="date"
                value={form.fechaIngreso}
                onChange={(e) => setForm({ ...form, fechaIngreso: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>

            {error && (
              <div className="col-span-full flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-sm animate-shake">
                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-sky-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  <FaCheck className="w-4 h-4" />
                  Guardar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstudianteModal;