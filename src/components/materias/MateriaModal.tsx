import { useEffect, useState } from 'react';
import { FaTimes, FaBook, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import type { Materia } from '../../types/materia.types';

interface MateriaModalProps {
  isOpen: boolean;
  materia: Materia | null;
  onClose: () => void;
  onSave: (data: Omit<Materia, 'id'>) => Promise<void>;
}

export const MateriaModal = ({ isOpen, materia, onClose, onSave }: MateriaModalProps) => {
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    creditos: 3,
    profesor: '',
    carrera: 'Ing. Sistemas',
    semestre: 1,
    cupos: 30,
    inscritos: 0,
    estado: 'Activa' as Materia['estado'],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (materia) {
        setForm({
          codigo: materia.codigo,
          nombre: materia.nombre,
          creditos: materia.creditos,
          profesor: materia.profesor,
          carrera: materia.carrera,
          semestre: materia.semestre,
          cupos: materia.cupos,
          inscritos: materia.inscritos,
          estado: materia.estado,
        });
      } else {
        setForm({
          codigo: '',
          nombre: '',
          creditos: 3,
          profesor: '',
          carrera: 'Ing. Sistemas',
          semestre: 1,
          cupos: 30,
          inscritos: 0,
          estado: 'Activa',
        });
      }
      setError(null);
    }
  }, [isOpen, materia]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.codigo || !form.nombre || !form.profesor) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (form.inscritos > form.cupos) {
      setError('Los inscritos no pueden superar los cupos disponibles.');
      return;
    }

    try {
      setSaving(true);
      await onSave(form);
      onClose();
    } catch {
      setError('Ocurrió un error al guardar la materia.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-purple-100 dark:border-slate-800 animate-slideUp">
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-purple-100 dark:border-slate-800 bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-slate-800 dark:to-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center text-white shadow-md">
              <FaBook className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {materia ? 'Editar Materia' : 'Nueva Materia'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {materia ? 'Modifica la información de la materia' : 'Registra una nueva materia en el catálogo'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700 border border-purple-100 dark:border-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 disabled:opacity-50"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Código</label>
              <input
                type="text"
                value={form.codigo}
                onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                required
                placeholder="Ej: IS-301"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
                placeholder="Ej: Programación Web"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Profesor</label>
              <input
                type="text"
                value={form.profesor}
                onChange={(e) => setForm({ ...form, profesor: e.target.value })}
                required
                placeholder="Ej: Mtra. García"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Créditos</label>
              <input
                type="number"
                min={1}
                max={10}
                value={form.creditos}
                onChange={(e) => setForm({ ...form, creditos: Number(e.target.value) })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Carrera</label>
              <select
                value={form.carrera}
                onChange={(e) => setForm({ ...form, carrera: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
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
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Semestre</label>
              <input
                type="number"
                min={1}
                max={12}
                value={form.semestre}
                onChange={(e) => setForm({ ...form, semestre: Number(e.target.value) })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Cupos</label>
              <input
                type="number"
                min={1}
                value={form.cupos}
                onChange={(e) => setForm({ ...form, cupos: Number(e.target.value) })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Inscritos</label>
              <input
                type="number"
                min={0}
                value={form.inscritos}
                onChange={(e) => setForm({ ...form, inscritos: Number(e.target.value) })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Estado</label>
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value as Materia['estado'] })}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all text-gray-800 dark:text-white"
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </select>
            </div>

            {error && (
              <div className="col-span-full flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-sm animate-shake">
                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-purple-100 dark:border-slate-800 flex justify-end gap-3">
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
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-purple-400 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-600 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
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

export default MateriaModal;