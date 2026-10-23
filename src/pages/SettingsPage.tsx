import { useState, useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { ChangePasswordModal } from '../components/settings/ChangePasswordModal';
import { TwoFactorModal } from '../components/settings/TwoFactorModal';
import { DeleteAccountModal } from '../components/settings/DeleteAccountModal';
import { getTwoFactorStatus } from '../api/twoFactor';
import {
  FaSun,
  FaMoon,
  FaDesktop,
  FaBell,
  FaLock,
  FaUserCog,
  FaTrashAlt,
  FaCheck,
  FaPalette,
  FaGlobe,
  FaEnvelope,
  FaMobileAlt,
  FaVolumeUp,
  FaShieldAlt,
} from 'react-icons/fa';

type Theme = 'light' | 'dark' | 'system';
type LanguageCode = 'es' | 'en' | 'pt';

const SectionCard = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => (
  <section
    className="group relative bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-sky-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden animate-slideUp"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-100/60 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <span className="absolute top-4 left-[15%] w-1 h-1 bg-sky-300 dark:bg-sky-500 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '5s' }} />
      <span className="absolute top-8 left-[55%] w-1.5 h-1.5 bg-cyan-300 dark:bg-cyan-500 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '6s' }} />
      <span className="absolute top-6 left-[85%] w-1 h-1 bg-sky-400 dark:bg-sky-400 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '4.5s' }} />
    </div>
    <div className="relative">{children}</div>
  </section>
);

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
      checked
        ? 'bg-gradient-to-r from-sky-400 to-cyan-500'
        : 'bg-gray-300 dark:bg-slate-700'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

export const SettingsPage = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [notifSounds, setNotifSounds] = useState(true);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  useEffect(() => {
    getTwoFactorStatus()
      .then((s) => setIs2FAEnabled(s.enabled))
      .catch(() => setIs2FAEnabled(false));
  }, []);

  const showSaved = (msg: string) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(null), 2200);
  };

  const themeOptions: {
    key: Theme;
    label: string;
    icon: ReactElement;
    desc: string;
  }[] = [
    { key: 'light', label: t.settings.light, icon: <FaSun />, desc: t.settings.lightDesc },
    { key: 'dark', label: t.settings.dark, icon: <FaMoon />, desc: t.settings.darkDesc },
    { key: 'system', label: t.settings.system, icon: <FaDesktop />, desc: t.settings.systemDesc },
  ];

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-200/40 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-sky-100/50 dark:bg-sky-500/5 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <div className="max-w-[1000px] mx-auto">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors duration-300 group"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t.profile.backToDashboard}
            </Link>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1000px] mx-auto space-y-5">
            <div className="animate-slideDown flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-sky-300/40 dark:shadow-sky-500/20">
                <FaUserCog className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {t.settings.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t.settings.subtitle}
                </p>
              </div>
            </div>

            {savedMsg && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 text-sm animate-fadeIn">
                <FaCheck className="w-4 h-4 flex-shrink-0" />
                {savedMsg}
              </div>
            )}

            <SectionCard delay={100}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaPalette />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {t.settings.appearance}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.settings.appearanceDesc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themeOptions.map((opt) => {
                  const isActive = theme === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setTheme(opt.key);
                        showSaved(`${t.settings.saved}: ${opt.label}`);
                      }}
                      className={`group/theme relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                        isActive
                          ? 'border-sky-400 bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950/50 dark:to-cyan-950/50 shadow-md'
                          : 'border-transparent bg-sky-50/50 dark:bg-slate-800/50 hover:border-sky-200 dark:hover:border-sky-800 hover:bg-sky-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] shadow">
                          <FaCheck />
                        </span>
                      )}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover/theme:scale-110 ${
                          isActive
                            ? 'bg-gradient-to-br from-sky-400 to-cyan-500 text-white shadow-md'
                            : 'bg-white dark:bg-slate-700 text-sky-500 dark:text-sky-400'
                        }`}
                      >
                        {opt.icon}
                      </div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-50/60 dark:bg-slate-800/60 text-xs text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.settings.currentlyActive}{' '}
                <strong className="text-sky-600 dark:text-sky-400">
                  {resolvedTheme === 'dark'
                    ? t.settings.darkMode
                    : t.settings.lightMode}
                </strong>
              </div>
            </SectionCard>

            <SectionCard delay={200}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 text-white flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaBell />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {t.settings.notifications}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.settings.notificationsDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    label: t.settings.emails,
                    desc: t.settings.emailsDesc,
                    icon: <FaEnvelope />,
                    state: notifEmail,
                    setState: (v: boolean) => {
                      setNotifEmail(v);
                      showSaved(`${t.settings.saved}: ${t.settings.emails}`);
                    },
                  },
                  {
                    label: t.settings.push,
                    desc: t.settings.pushDesc,
                    icon: <FaMobileAlt />,
                    state: notifPush,
                    setState: (v: boolean) => {
                      setNotifPush(v);
                      showSaved(`${t.settings.saved}: ${t.settings.push}`);
                    },
                  },
                  {
                    label: t.settings.sounds,
                    desc: t.settings.soundsDesc,
                    icon: <FaVolumeUp />,
                    state: notifSounds,
                    setState: (v: boolean) => {
                      setNotifSounds(v);
                      showSaved(`${t.settings.saved}: ${t.settings.sounds}`);
                    },
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 p-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-700 text-sky-500 dark:text-sky-400 flex items-center justify-center text-sm shadow-sm">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <Toggle checked={item.state} onChange={item.setState} />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard delay={300}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaGlobe />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {t.settings.language}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.settings.languageDesc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {languages.map((lang) => {
                  const isActive = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        showSaved(`${t.settings.saved}: ${lang.label}`);
                      }}
                      className={`relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/40 dark:to-fuchsia-950/40 shadow-md'
                          : 'border-transparent bg-sky-50/50 dark:bg-slate-800/50 hover:border-purple-200 dark:hover:border-purple-800 hover:bg-purple-50/50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        {lang.label}
                      </span>
                      {isActive && (
                        <span className="ml-auto w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] shadow">
                          <FaCheck />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard delay={400}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 text-white flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaLock />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {t.settings.security}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.settings.securityDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full flex items-center justify-between gap-4 p-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-slate-800 border border-transparent hover:border-sky-100 dark:hover:border-slate-700 transition-all duration-300 group/item"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-700 text-emerald-500 dark:text-emerald-400 flex items-center justify-center text-sm shadow-sm">
                      <FaLock />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {t.settings.changePassword}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.settings.changePasswordDesc}
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover/item:text-sky-500 group-hover/item:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setIs2FAModalOpen(true)}
                  className="w-full flex items-center justify-between gap-4 p-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-slate-800 border border-transparent hover:border-sky-100 dark:hover:border-slate-700 transition-all duration-300 group/item"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${
                        is2FAEnabled
                          ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : 'bg-white dark:bg-slate-700 text-sky-500 dark:text-sky-400'
                      } flex items-center justify-center text-sm shadow-sm`}
                    >
                      <FaShieldAlt />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {t.settings.twoFactor}
                        </p>
                        {is2FAEnabled && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            ON
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {is2FAEnabled
                          ? t.settings.twoFactorEnabled
                          : t.settings.twoFactorDesc}
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover/item:text-sky-500 group-hover/item:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </SectionCard>

            <section
              className="relative bg-red-50/60 dark:bg-red-950/20 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-red-100 dark:border-red-900/50 transition-all duration-500 overflow-hidden animate-slideUp"
              style={{ animationDelay: '500ms' }}
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-red-200/40 dark:bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 text-white flex items-center justify-center shadow-md">
                  <FaTrashAlt />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-red-700 dark:text-red-300">
                    {t.settings.dangerZone}
                  </h2>
                  <p className="text-xs text-red-500 dark:text-red-400/80 mt-0.5">
                    {t.settings.dangerZoneDesc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full flex items-center justify-between gap-4 p-3 rounded-xl bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-300 group/item"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center text-sm">
                    <FaTrashAlt />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                      {t.settings.deleteAccount}
                    </p>
                    <p className="text-xs text-red-500 dark:text-red-400/70">
                      {t.settings.deleteAccountDesc}
                    </p>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-red-400 group-hover/item:text-red-600 group-hover/item:translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </section>

            <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-4">
              Portal Académico · v1.0.0 · © 2026
            </p>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => showSaved(t.settings.passwordSuccess)}
      />

      <TwoFactorModal
        isOpen={is2FAModalOpen}
        isCurrentlyEnabled={is2FAEnabled}
        onClose={() => setIs2FAModalOpen(false)}
        onSuccess={(enabled) => {
          setIs2FAEnabled(enabled);
          showSaved(
            enabled
              ? t.settings.twoFactorSuccessEnabled
              : t.settings.twoFactorSuccessDisabled
          );
        }}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default SettingsPage;