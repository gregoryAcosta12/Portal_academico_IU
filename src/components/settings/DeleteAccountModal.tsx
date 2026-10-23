import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTrashAlt,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { deleteAccount } from '../../api/deleteAccount';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'warning' | 'success';

export const DeleteAccountModal = ({
  isOpen,
  onClose,
}: DeleteAccountModalProps) => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('warning');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const expectedText = t.settings.deleteAccountConfirmPlaceholder;

  useEffect(() => {
    if (isOpen) {
      setStep('warning');
      setConfirmText('');
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !loading && step !== 'success') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, loading, step, onClose]);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (confirmText !== expectedText) {
      setError(t.settings.deleteAccountConfirmError);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await deleteAccount();
      setStep('success');
      setTimeout(() => {
        logout();
        navigate('/login', { replace: true });
      }, 1800);
    } catch {
      setError(t.settings.deleteAccountConfirmError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-900/70 dark:bg-slate-950/85 backdrop-blur-sm"
        onClick={() => !loading && step !== 'success' && onClose()}
      />

      <div className="relative w-full max-w-md max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-red-100 dark:border-red-900/60 animate-slideUp">
        <div className="absolute top-0 right-0 w-56 h-56 bg-red-100/60 dark:bg-red-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-rose-100/60 dark:bg-rose-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-between px-6 py-5 border-b border-red-100 dark:border-red-900/60 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/40 dark:to-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md">
              <FaTrashAlt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-700 dark:text-red-300">
                {t.settings.deleteAccountTitle}
              </h2>
              <p className="text-xs text-red-500 dark:text-red-400/80">
                {t.settings.deleteAccountSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading || step === 'success'}
            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-slate-700 border border-red-100 dark:border-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 disabled:opacity-50"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-4">
            {step === 'warning' && (
              <>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60">
                  <FaExclamationTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-700 dark:text-red-300">
                      {t.settings.deleteAccountWarning}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400/80 mt-1 leading-relaxed">
                      {t.settings.deleteAccountWarningDesc}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                    {t.settings.deleteAccountConfirmLabel}
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => {
                      setConfirmText(e.target.value);
                      setError(null);
                    }}
                    placeholder={expectedText}
                    disabled={loading}
                    className="w-full text-center text-lg font-mono tracking-widest px-4 py-3 rounded-xl bg-red-50/50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/60 focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-red-700 dark:text-red-300 placeholder:text-red-300 dark:placeholder:text-red-700/50 disabled:opacity-60"
                  />
                </div>
              </>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center gap-3 py-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                  <FaCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 text-center">
                  {t.settings.deleteAccountSuccess}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Redirigiendo al login...
                </p>
              </div>
            )}

            {error && step !== 'success' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-sm animate-shake">
                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-red-100 dark:border-red-900/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading || step === 'success'}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {t.settings.deleteAccountCancel}
            </button>

            {step === 'warning' && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading || confirmText !== expectedText}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-lg shadow-red-200 dark:shadow-red-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    {t.settings.deleteAccountDeleting}
                  </>
                ) : (
                  <>
                    <FaTrashAlt className="w-4 h-4" />
                    {t.settings.deleteAccountConfirm}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;