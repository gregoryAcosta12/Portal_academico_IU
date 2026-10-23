import { useEffect, useState } from 'react';
import {
  FaShieldAlt,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import {
  generateTwoFactorSecret,
  enableTwoFactor,
  disableTwoFactor,
} from '../../api/twoFactor';

interface TwoFactorModalProps {
  isOpen: boolean;
  isCurrentlyEnabled: boolean;
  onClose: () => void;
  onSuccess: (enabled: boolean) => void;
}

type Step = 'setup' | 'success' | 'disable';

export const TwoFactorModal = ({
  isOpen,
  isCurrentlyEnabled,
  onClose,
  onSuccess,
}: TwoFactorModalProps) => {
  const { t } = useLanguage();

  const [step, setStep] = useState<Step>('setup');
  const [secretKey, setSecretKey] = useState('');
  const [backupCode, setBackupCode] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError(null);
      setStep(isCurrentlyEnabled ? 'disable' : 'setup');

      if (!isCurrentlyEnabled) {
        generateTwoFactorSecret().then((res) => {
          setSecretKey(res.secretKey);
          setBackupCode(res.backupCode);
        });
      }
    }
  }, [isOpen, isCurrentlyEnabled]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !loading) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError(t.settings.twoFactorInvalidCode);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await enableTwoFactor(code);
      setStep('success');
      setTimeout(() => {
        onSuccess(true);
        onClose();
      }, 1800);
    } catch {
      setError(t.settings.twoFactorInvalidCode);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async () => {
    try {
      setLoading(true);
      await disableTwoFactor();
      onSuccess(false);
      onClose();
    } catch {
      setError(t.settings.twoFactorInvalidCode);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm"
        onClick={() => !loading && onClose()}
      />

      <div className="relative w-full max-w-md max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-sky-100 dark:border-slate-800 animate-slideUp">
        <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-100/60 dark:bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-between px-6 py-5 border-b border-sky-100 dark:border-slate-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md">
              <FaShieldAlt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {t.settings.twoFactorTitle}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.settings.twoFactorSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-emerald-100 dark:border-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 disabled:opacity-50"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-4">
            {step === 'setup' && (
              <>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    {t.settings.twoFactorStep1}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-8">
                    {t.settings.twoFactorStep1Desc}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-56 h-56 rounded-2xl bg-white p-3 border-2 border-emerald-100 dark:border-emerald-900 shadow-lg">
                    <div className="grid grid-cols-[repeat(21,1fr)] gap-px w-full h-full">
                      {Array.from({ length: 441 }).map((_, i) => {
                        const row = Math.floor(i / 21);
                        const col = i % 21;

                        const inTopLeftFinder = row < 7 && col < 7;
                        const inTopRightFinder = row < 7 && col >= 14;
                        const inBottomLeftFinder = row >= 14 && col < 7;

                        const isFinderPattern =
                          inTopLeftFinder ||
                          inTopRightFinder ||
                          inBottomLeftFinder;

                        let isFilled = false;

                        if (isFinderPattern) {
                          let localRow = 0;
                          let localCol = 0;

                          if (inTopLeftFinder) {
                            localRow = row;
                            localCol = col;
                          } else if (inTopRightFinder) {
                            localRow = row;
                            localCol = col - 14;
                          } else {
                            localRow = row - 14;
                            localCol = col;
                          }

                          const isBorder =
                            localRow === 0 ||
                            localRow === 6 ||
                            localCol === 0 ||
                            localCol === 6;
                          const isCenter =
                            localRow >= 2 &&
                            localRow <= 4 &&
                            localCol >= 2 &&
                            localCol <= 4;

                          isFilled = isBorder || isCenter;
                        } else {
                          isFilled = (row * 31 + col * 17) % 3 !== 0;
                        }

                        return (
                          <div
                            key={i}
                            className={`aspect-square rounded-[1px] ${
                              isFilled ? 'bg-slate-900' : 'bg-white'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    {t.settings.twoFactorSecretKey}
                  </p>
                  <code className="text-xs font-mono text-sky-600 dark:text-sky-400 break-all">
                    {secretKey || '...'}
                  </code>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    {t.settings.twoFactorStep2}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-8">
                    {t.settings.twoFactorStep2Desc}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                    {t.settings.twoFactorEnterCode}
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, ''));
                      setError(null);
                    }}
                    placeholder={t.settings.twoFactorCodePlaceholder}
                    className="w-full text-center text-2xl font-mono tracking-[0.5em] px-4 py-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 ml-1">
                    💡 Demo: usa el código{' '}
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      123456
                    </strong>
                  </p>
                </div>
              </>
            )}

            {step === 'disable' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
                  <FaExclamationTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                      {t.settings.twoFactorWarning}
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400/80 mt-0.5">
                      {t.settings.twoFactorWarningDesc}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 text-center py-2">
                  {t.settings.twoFactorEnabled}. ¿Desactivar?
                </p>
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center gap-3 py-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                  <FaCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 text-center">
                  {t.settings.twoFactorSuccessEnabled}
                </p>
                {backupCode && (
                  <div className="w-full p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold mb-1">
                      {t.settings.twoFactorWarning}
                    </p>
                    <code className="text-sm font-mono text-amber-700 dark:text-amber-300 font-bold">
                      {backupCode}
                    </code>
                  </div>
                )}
              </div>
            )}

            {error && step !== 'success' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-sm animate-shake">
                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-sky-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {step === 'success' ? t.settings.twoFactorDone : t.common.cancel}
            </button>

            {step === 'setup' && (
              <button
                type="button"
                onClick={handleVerify}
                disabled={loading || code.length !== 6}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 shadow-md hover:shadow-lg shadow-emerald-200 dark:shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                    {t.settings.twoFactorVerifying}
                  </>
                ) : (
                  <>
                    <FaCheck className="w-4 h-4" />
                    {t.settings.twoFactorVerify}
                  </>
                )}
              </button>
            )}

            {step === 'disable' && (
              <button
                type="button"
                onClick={handleDisable}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-lg shadow-red-200 dark:shadow-red-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
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
                    ...
                  </>
                ) : (
                  <>
                    <FaTimes className="w-4 h-4" />
                    {t.settings.twoFactorDisable}
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

export default TwoFactorModal;