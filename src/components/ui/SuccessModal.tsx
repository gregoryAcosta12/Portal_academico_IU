import React, { useEffect } from 'react';
import {
  FaCheckCircle,
  FaTimes,
  FaRocket,
  FaExclamationTriangle,
  FaServer,
  FaSync,
  FaArrowLeft,
} from 'react-icons/fa';

type ModalType = 'success' | 'error' | 'warning' | 'info';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  type: ModalType;
  title: string;
  message: string;
  details?: string;
  showRetry?: boolean;
  showBackButton?: boolean;
  backButtonText?: string;
  confirmButtonText?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  type = 'success',
  title,
  message,
  details,
  showRetry = false,
  showBackButton = false,
  backButtonText = 'Volver',
  confirmButtonText = 'Continuar',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: FaCheckCircle,
          iconBg: 'from-sky-100 to-blue-100 dark:from-sky-950/60 dark:to-blue-950/40',
          iconWrapper: 'from-sky-400 to-blue-500',
          iconColor: 'text-white',
          pingBg: 'from-sky-200/30 to-blue-200/30 dark:from-sky-500/20 dark:to-blue-500/20',
          gradient: 'from-sky-400 to-blue-500',
          hoverGradient: 'hover:from-sky-500 hover:to-blue-600',
          border: 'border-sky-100 dark:border-slate-800',
          textColor: 'from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400',
          bgLight: 'bg-sky-50/80 dark:bg-sky-950/40',
          bgLightBorder: 'border-sky-100 dark:border-sky-900/60',
          textLight: 'text-sky-700 dark:text-sky-300',
          textIcon: 'text-sky-400 dark:text-sky-500',
          closeColor: 'text-sky-400 dark:text-sky-500 hover:text-sky-600 dark:hover:text-sky-300',
          footerColor: 'text-sky-400/60 dark:text-sky-500/60',
        };
      case 'error':
        return {
          icon: FaExclamationTriangle,
          iconBg: 'from-red-100 to-rose-100 dark:from-red-950/60 dark:to-rose-950/40',
          iconWrapper: 'from-red-400 to-rose-500',
          iconColor: 'text-white',
          pingBg: 'from-red-200/30 to-rose-200/30 dark:from-red-500/20 dark:to-rose-500/20',
          gradient: 'from-red-400 to-rose-500',
          hoverGradient: 'hover:from-red-500 hover:to-rose-600',
          border: 'border-red-100 dark:border-red-900/60',
          textColor: 'from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400',
          bgLight: 'bg-red-50/80 dark:bg-red-950/40',
          bgLightBorder: 'border-red-100 dark:border-red-900/60',
          textLight: 'text-red-700 dark:text-red-300',
          textIcon: 'text-red-400 dark:text-red-500',
          closeColor: 'text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-300',
          footerColor: 'text-red-400/60 dark:text-red-500/60',
        };
      case 'warning':
        return {
          icon: FaExclamationTriangle,
          iconBg: 'from-yellow-100 to-amber-100 dark:from-yellow-950/60 dark:to-amber-950/40',
          iconWrapper: 'from-yellow-400 to-amber-500',
          iconColor: 'text-white',
          pingBg: 'from-yellow-200/30 to-amber-200/30 dark:from-yellow-500/20 dark:to-amber-500/20',
          gradient: 'from-yellow-400 to-amber-500',
          hoverGradient: 'hover:from-yellow-500 hover:to-amber-600',
          border: 'border-yellow-100 dark:border-yellow-900/60',
          textColor: 'from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400',
          bgLight: 'bg-yellow-50/80 dark:bg-yellow-950/40',
          bgLightBorder: 'border-yellow-100 dark:border-yellow-900/60',
          textLight: 'text-yellow-700 dark:text-yellow-300',
          textIcon: 'text-yellow-400 dark:text-yellow-500',
          closeColor: 'text-yellow-400 dark:text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-300',
          footerColor: 'text-yellow-400/60 dark:text-yellow-500/60',
        };
      case 'info':
      default:
        return {
          icon: FaServer,
          iconBg: 'from-sky-100 to-blue-100 dark:from-sky-950/60 dark:to-blue-950/40',
          iconWrapper: 'from-sky-400 to-blue-500',
          iconColor: 'text-white',
          pingBg: 'from-sky-200/30 to-blue-200/30 dark:from-sky-500/20 dark:to-blue-500/20',
          gradient: 'from-sky-400 to-blue-500',
          hoverGradient: 'hover:from-sky-500 hover:to-blue-600',
          border: 'border-sky-100 dark:border-slate-800',
          textColor: 'from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400',
          bgLight: 'bg-sky-50/80 dark:bg-sky-950/40',
          bgLightBorder: 'border-sky-100 dark:border-sky-900/60',
          textLight: 'text-sky-700 dark:text-sky-300',
          textIcon: 'text-sky-400 dark:text-sky-500',
          closeColor: 'text-sky-400 dark:text-sky-500 hover:text-sky-600 dark:hover:text-sky-300',
          footerColor: 'text-sky-400/60 dark:text-sky-500/60',
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div
        className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-sky-700/50 to-blue-900/70 dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-950/80 backdrop-blur-md transition-colors duration-500"
        onClick={onClose}
      />

      <div
        className={`relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-slate-950/50 max-w-md w-full mx-4 p-8 transform animate-scaleIn border ${config.border} transition-colors duration-500`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 transition-all duration-300 hover:rotate-90 hover:scale-110 ${config.closeColor}`}
          aria-label="Cerrar modal"
        >
          <FaTimes className="h-5 w-5" />
        </button>

        <div
          className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r rounded-full animate-pulse ${config.gradient}`}
        />

        <div className="flex justify-center mb-6 relative">
          <div className="absolute inset-0 flex justify-center">
            <div
              className={`w-28 h-28 bg-gradient-to-r rounded-full animate-ping ${config.pingBg}`}
            />
          </div>
          <div
            className={`relative w-24 h-24 bg-gradient-to-br rounded-full flex items-center justify-center animate-bounce shadow-lg ${config.iconBg}`}
          >
            <div
              className={`w-20 h-20 bg-gradient-to-br rounded-full flex items-center justify-center shadow-inner ${config.iconWrapper}`}
            >
              <IconComponent
                className={`h-12 w-12 ${config.iconColor} animate-scaleIn`}
              />
            </div>
          </div>
        </div>

        <h3
          className={`text-2xl font-bold text-center mb-3 bg-gradient-to-r bg-clip-text text-transparent ${config.textColor}`}
        >
          {title}
        </h3>

        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-1 bg-gradient-to-r rounded-full ${config.gradient}`}
          />
        </div>

        <p className="text-center text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-base">
          {message}
        </p>

        {details && (
          <div
            className={`mb-6 p-4 rounded-xl border ${config.bgLight} ${config.bgLightBorder}`}
          >
            <div className="flex items-start gap-3">
              <FaExclamationTriangle
                className={`${config.textIcon} mt-0.5 flex-shrink-0`}
              />
              <p className={`text-sm ${config.textLight}`}>{details}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={type === 'error' && onRetry ? onRetry : onClose}
            className={`w-full py-3.5 bg-gradient-to-r ${config.gradient} ${config.hoverGradient} text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-xl group relative overflow-hidden`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {type === 'error' ? (
                <>
                  <FaSync className="group-hover:rotate-180 transition-transform duration-500" />
                  {showRetry ? 'Reintentar' : confirmButtonText}
                </>
              ) : (
                <>
                  <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  {confirmButtonText}
                  <FaRocket className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          {showBackButton && (
            <button
              onClick={onClose}
              className="w-full py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="h-4 w-4" />
              {backButtonText}
            </button>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className={`text-xs ${config.footerColor}`}>
            {type === 'error'
              ? 'Servidor off'
              : '¡Bienvenido a la comunidad!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;