import { useEffect, useState } from 'react';
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import { changePassword } from '../../api/password';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ValidationState {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
}

export const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) => {
  const { t } = useLanguage();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [validations, setValidations] = useState<ValidationState>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  useEffect(() => {
    setValidations({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
    });
  }, [newPassword]);

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
      setSuccess(false);
      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    }
  }, [isOpen]);

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

  const allValid =
    validations.length &&
    validations.uppercase &&
    validations.lowercase &&
    validations.number;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword) {
      setError(t.settings.currentPasswordPlaceholder);
      return;
    }

    if (!allValid) {
      setError(t.settings.passwordRequirements);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t.settings.passwordMismatch);
      return;
    }

    try {
      setSaving(true);
      await changePassword({
        currentPassword,
        newPassword,
      });
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      const message = err.message || '';
      if (message === 'currentPasswordIncorrect') {
        setError(t.settings.currentPasswordIncorrect);
      } else if (message === 'passwordSameAsCurrent') {
        setError(t.settings.passwordSameAsCurrent);
      } else {
        setError(t.settings.passwordError);
      }
    } finally {
      setSaving(false);
    }
  };

  const renderPasswordInput = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    show: boolean,
    toggleShow: () => void,
    placeholder: string
  ) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <FaLock className="w-4 h-4" />
        </div>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={saving || success}
          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-sky-50/50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 border border-sky-100 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900/50 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={toggleShow}
          disabled={saving || success}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 disabled:opacity-50"
          tabIndex={-1}
        >
          {show ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm"
        onClick={() => !saving && onClose()}
      />

      <div className="relative w-full max-w-md max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-sky-100 dark:border-slate-800 animate-slideUp">
        <div className="absolute top-0 right-0 w-56 h-56 bg-sky-100/60 dark:bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-100/60 dark:bg-cyan-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-between px-6 py-5 border-b border-sky-100 dark:border-slate-800 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white shadow-md">
              <FaLock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {t.settings.changePasswordTitle}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.settings.changePasswordSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border border-sky-100 dark:border-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 disabled:opacity-50"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="p-6 space-y-4">
            {renderPasswordInput(
              t.settings.currentPassword,
              currentPassword,
              setCurrentPassword,
              showCurrent,
              () => setShowCurrent(!showCurrent),
              t.settings.currentPasswordPlaceholder
            )}

            {renderPasswordInput(
              t.settings.newPassword,
              newPassword,
              setNewPassword,
              showNew,
              () => setShowNew(!showNew),
              t.settings.newPasswordPlaceholder
            )}

            {newPassword.length > 0 && (
              <div className="p-3 rounded-xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 animate-fadeIn">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
                  {t.settings.passwordRequirements}
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { key: 'length', label: t.settings.passwordReqLength },
                    { key: 'uppercase', label: t.settings.passwordReqUpper },
                    { key: 'lowercase', label: t.settings.passwordReqLower },
                    { key: 'number', label: t.settings.passwordReqNumber },
                  ].map((req) => {
                    const isValid = validations[req.key as keyof ValidationState];
                    return (
                      <div
                        key={req.key}
                        className={`flex items-center gap-1.5 transition-colors duration-300 ${
                          isValid
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {isValid ? (
                          <FaCheckCircle className="w-3 h-3 flex-shrink-0" />
                        ) : (
                          <FaTimesCircle className="w-3 h-3 flex-shrink-0" />
                        )}
                        <span>{req.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {renderPasswordInput(
              t.settings.confirmNewPassword,
              confirmPassword,
              setConfirmPassword,
              showConfirm,
              () => setShowConfirm(!showConfirm),
              t.settings.confirmNewPasswordPlaceholder
            )}

            {confirmPassword.length > 0 && newPassword !== confirmPassword && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs animate-shake">
                <FaExclamationTriangle className="w-3 h-3 flex-shrink-0" />
                {t.settings.passwordMismatch}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-sm animate-shake">
                <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 text-sm animate-fadeIn">
                <FaCheck className="w-4 h-4 flex-shrink-0" />
                {t.settings.passwordSuccess}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-sky-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving || success}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={
                saving ||
                success ||
                !currentPassword ||
                !allValid ||
                newPassword !== confirmPassword
              }
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 shadow-md hover:shadow-lg shadow-emerald-200 dark:shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {saving ? (
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
                  {t.settings.passwordSaving}
                </>
              ) : success ? (
                <>
                  <FaCheck className="w-4 h-4" />
                  {t.settings.passwordSuccess}
                </>
              ) : (
                <>
                  <FaCheck className="w-4 h-4" />
                  {t.settings.changePassword}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;