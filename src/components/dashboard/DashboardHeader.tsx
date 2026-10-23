import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { FaMoon, FaSun } from 'react-icons/fa';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export const DashboardHeader = ({
  title = 'Portal Académico',
  subtitle = 'Sistema de Gestión Universitaria',
}: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = user?.username || 'Usuario';
  const initial = displayName.charAt(0).toUpperCase();

  const currentRole = (user?.rol || 'ESTUDIANTE') as keyof typeof t.roles;
  const roleLabel = t.roles[currentRole] || t.roles.ESTUDIANTE;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full relative border-b border-sky-100/80 dark:border-slate-800 shadow-sm transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-sky-50/90 to-cyan-50/90 dark:from-slate-950/90 dark:via-slate-900/90 dark:to-slate-950/90 backdrop-blur-md" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-2 left-[10%] w-1 h-1 bg-sky-300 dark:bg-sky-500 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <span className="absolute top-8 left-[25%] w-1.5 h-1.5 bg-cyan-300 dark:bg-cyan-500 rounded-full animate-float" style={{ animationDelay: '0.5s', animationDuration: '5s' }} />
        <span className="absolute top-3 left-[45%] w-1 h-1 bg-sky-400 dark:bg-sky-400 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '4.5s' }} />
        <span className="absolute top-10 left-[60%] w-1 h-1 bg-cyan-400 dark:bg-cyan-400 rounded-full animate-float" style={{ animationDelay: '1.5s', animationDuration: '5.5s' }} />
        <span className="absolute top-4 left-[75%] w-1.5 h-1.5 bg-sky-300 dark:bg-sky-500 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <span className="absolute top-9 left-[88%] w-1 h-1 bg-cyan-300 dark:bg-cyan-500 rounded-full animate-float" style={{ animationDelay: '2.5s', animationDuration: '5s' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 group cursor-pointer"
            title="Ir al dashboard"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-300/50 dark:shadow-sky-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                </svg>
              </div>
              <span className="absolute -inset-1 rounded-xl bg-sky-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-gray-800 dark:text-white leading-tight">
                {title}
              </h1>
              <p className="text-[11px] text-sky-600 dark:text-sky-400 leading-tight">
                {subtitle}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              title={
                resolvedTheme === 'dark' ? t.settings.lightMode : t.settings.darkMode
              }
              className="w-9 h-9 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-sky-100/60 dark:border-slate-700 hover:border-sky-200 dark:hover:border-slate-600 flex items-center justify-center text-sky-600 dark:text-sky-400 hover:shadow-md hover:shadow-sky-100 dark:hover:shadow-slate-900 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {resolvedTheme === 'dark' ? (
                <FaSun className="w-4 h-4" />
              ) : (
                <FaMoon className="w-4 h-4" />
              )}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-sky-100/60 dark:border-slate-700 hover:border-sky-200 dark:hover:border-slate-600 hover:shadow-md hover:shadow-sky-100 dark:hover:shadow-slate-900 transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {initial}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white dark:border-slate-900 rounded-full">
                    <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-sky-600 dark:text-sky-400 leading-tight">
                    {roleLabel}
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 dark:text-slate-500 transition-transform duration-300 ${
                    menuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-sky-200/50 dark:shadow-slate-950/50 border border-sky-100 dark:border-slate-800 overflow-hidden z-40 animate-fadeIn">
                    <div className="relative px-4 py-4 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70 border-b border-sky-100 dark:border-slate-800 overflow-hidden">
                      <span className="absolute top-2 right-3 w-1 h-1 bg-sky-400 dark:bg-sky-500 rounded-full animate-float" style={{ animationDelay: '0s' }} />
                      <span className="absolute top-6 right-8 w-1.5 h-1.5 bg-cyan-400 dark:bg-cyan-500 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                            {displayName}
                          </p>
                          <p className="text-xs text-sky-600 dark:text-sky-400">
                            {roleLabel}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-300 transition-colors duration-200 group/item"
                      >
                        <span className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-slate-800 group-hover/item:bg-sky-100 dark:group-hover/item:bg-slate-700 flex items-center justify-center transition-colors duration-200">
                          <svg className="w-4 h-4 text-sky-500 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </span>
                        {t.nav.dashboard}
                      </Link>

                      <Link
                        to="/perfil"
                        onClick={() => setMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-300 transition-colors duration-200 group/item"
                      >
                        <span className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-slate-800 group-hover/item:bg-sky-100 dark:group-hover/item:bg-slate-700 flex items-center justify-center transition-colors duration-200">
                          <svg className="w-4 h-4 text-sky-500 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        {t.nav.profile}
                      </Link>

                      <Link
                        to="/configuracion"
                        onClick={() => setMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-300 transition-colors duration-200 group/item"
                      >
                        <span className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-slate-800 group-hover/item:bg-sky-100 dark:group-hover/item:bg-slate-700 flex items-center justify-center transition-colors duration-200">
                          <svg className="w-4 h-4 text-sky-500 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                        {t.nav.settings}
                      </Link>
                    </div>

                    <div className="border-t border-sky-100 dark:border-slate-800 p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors duration-200 group/item"
                      >
                        <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 group-hover/item:bg-red-100 dark:group-hover/item:bg-red-950/60 flex items-center justify-center transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </span>
                        {t.nav.logout}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;