import { useEffect, useState } from 'react';
import type { ProfileData } from '../../types/profile.types';

interface EditProfileModalProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ProfileData>) => Promise<void>;
}

export const EditProfileModal = ({
  profile,
  isOpen,
  onClose,
  onSave,
}: EditProfileModalProps) => {
  const [form, setForm] = useState({
    nombre: profile.nombre || '',
    apellido: profile.apellido || '',
    email: profile.email || '',
    telefono: profile.telefono || '',
    direccion: profile.direccion || '',
    fechaNacimiento: profile.fechaNacimiento || '',
    bio: profile.bio || '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        email: profile.email || '',
        telefono: profile.telefono || '',
        direccion: profile.direccion || '',
        fechaNacimiento: profile.fechaNacimiento || '',
        bio: profile.bio || '',
      });
      setError(null);
      setSuccess(false);
    }
  }, [isOpen, profile]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !saving) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, saving, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email.includes('@')) {
      setError('El email no es válido');
      return;
    }

    try {
      setSaving(true);
      await onSave(form);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre', grid: 'col-span-1' },
    { name: 'apellido', label: 'Apellido', type: 'text', placeholder: 'Tu apellido', grid: 'col-span-1' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com', grid: 'col-span-2' },
    { name: 'telefono', label: 'Teléfono', type: 'text', placeholder: '+1 (809) 000-0000', grid: 'col-span-2' },
    { name: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Calle, número, ciudad', grid: 'col-span-2' },
    { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date', placeholder: '', grid: 'col-span-2' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-sm"
        onClick={() => !saving && onClose()}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-sky-100 dark:border-slate-800 animate-slideUp transition-colors duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/60 dark:bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100/60 dark:bg-cyan-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute top-6 left-[15%] w-1 h-1 bg-sky-300 dark:bg-sky-500 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '5s' }} />
          <span className="absolute top-10 left-[45%] w-1.5 h-1.5 bg-cyan-300 dark:bg-cyan-500 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '6s' }} />
          <span className="absolute top-4 left-[75%] w-1 h-1 bg-sky-400 dark:bg-sky-400 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '4.5s' }} />
        </div>

        <div className="relative flex items-center justify-between px-6 py-5 border-b border-sky-100 dark:border-slate-800 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Editar perfil
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Actualiza tu información personal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border border-sky-100 dark:border-slate-700 hover:border-sky-200 dark:hover:border-slate-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.name} className={f.grid}>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={(form as any)[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    disabled={saving}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-60"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                Biografía
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Cuéntanos un poco sobre ti..."
                rows={4}
                disabled={saving}
                className="w-full px-4 py-3 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none disabled:opacity-60"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-sm animate-shake">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 text-sm animate-fadeIn">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                ¡Cambios guardados correctamente!
              </div>
            )}
          </div>

          <div className="sticky bottom-0 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-sky-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || success}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 shadow-md hover:shadow-lg shadow-sky-200 dark:shadow-sky-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Guardando...
                </>
              ) : success ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Guardado
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;