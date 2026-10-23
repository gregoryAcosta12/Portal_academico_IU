import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaLock,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaInfoCircle,
} from 'react-icons/fa';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useLanguage } from '../../hooks/useLanguage';

interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const { t } = useLanguage();
  // 🎯 Auto-completado por defecto para pruebas
  const [username, setUsername] = useState('estudiante');
  const [password, setPassword] = useState('123456');
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [usernameValid, setUsernameValid] = useState<boolean | null>(true);

  useEffect(() => {
    if (username.length > 0) {
      setUsernameValid(username.length >= 3);
    } else {
      setUsernameValid(null);
    }
  }, [username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  const loadTestUser = (user: string) => {
    setUsername(user);
    setPassword('123456');

    const input = document.getElementById('username');
    if (input) {
      input.classList.add('border-sky-400', 'ring-2', 'ring-sky-200');
      setTimeout(() => {
        input.classList.remove('border-sky-400', 'ring-2', 'ring-sky-200');
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
      
      {/* 🎯 BANNER DE AVISO */}
      <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl p-3 flex items-start gap-2.5">
        <FaInfoCircle className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-bold text-sky-700 dark:text-sky-300">
            Modo Demostración
          </p>
          <p className="text-[11px] text-sky-600/80 dark:text-sky-400/80 leading-snug mt-0.5">
            Esta plataforma está en desarrollo. Los campos ya están prellenados para que puedas probar el sistema con un clic.
          </p>
        </div>
      </div>

      <div className="transform transition-all duration-300 hover:translate-x-1">
        <div className="relative">
          <Input
            id="username"
            label={t.login.username}
            type="text"
            placeholder={t.login.usernamePlaceholder}
            icon={
              <FaUser
                className={`transition-colors duration-300 ${
                  focusedField === 'username'
                    ? 'text-sky-500 dark:text-sky-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            }
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
            required
            disabled={isLoading}
            className={`py-3 pl-11 border transition-all duration-300 ${
              focusedField === 'username'
                ? 'border-sky-400 ring-2 ring-sky-200 dark:border-sky-500 dark:ring-sky-900/50'
                : usernameValid === false
                ? 'border-red-300 dark:border-red-700'
                : 'border-gray-200 dark:border-slate-700'
            }`}
            autoComplete="username"
          />
          {usernameValid === true && (
            <div className="absolute right-3 top-9 text-green-500 dark:text-green-400 animate-fadeIn">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>
        {usernameValid === false && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1 animate-shake">
            {t.login.usernameError}
          </p>
        )}
      </div>

      <div className="transform transition-all duration-300 hover:translate-x-1">
        <div className="relative">
          <Input
            label={t.login.password}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            icon={
              <FaLock
                className={`transition-colors duration-300 ${
                  focusedField === 'password'
                    ? 'text-sky-500 dark:text-sky-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            required
            disabled={isLoading}
            minLength={6}
            className={`py-3 pl-11 border transition-all duration-300 ${
              focusedField === 'password'
                ? 'border-sky-400 ring-2 ring-sky-200 dark:border-sky-500 dark:ring-sky-900/50'
                : 'border-gray-200 dark:border-slate-700'
            }`}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 dark:text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 hover:scale-110"
            tabIndex={-1}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-sky-600 dark:text-sky-500 focus:ring-sky-500 dark:focus:ring-sky-400 border-gray-300 dark:border-slate-600 rounded transition-all duration-200 dark:bg-slate-800"
            />
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
            {t.login.rememberMe}
          </span>
        </label>
        <Link
          to="/recuperar-password"
          className="text-sm text-sky-500 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-all duration-300 hover:underline text-left sm:text-right"
        >
          {t.login.forgotPassword}
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm flex items-center animate-shake">
          <svg
            className="h-5 w-5 mr-2 text-red-500 dark:text-red-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        fullWidth
        className="py-3.5 text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 group"
      >
        <span className="flex items-center justify-center gap-2">
          {t.login.signIn}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 transition-colors duration-500">
            {t.login.firstTime}
          </span>
        </div>
      </div>

      <Link
        to="/register"
        className="block text-center py-3 px-4 border-2 border-sky-200 dark:border-sky-800 hover:border-sky-500 dark:hover:border-sky-600 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium rounded-xl transition-all duration-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 transform hover:scale-[1.02] active:scale-95"
      >
        {t.login.createAccount}
      </Link>

      <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-3">
          <span className="text-sky-500 dark:text-sky-400">●</span>{' '}
          {t.login.testUsers}
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            type="button"
            onClick={() => loadTestUser('estudiante')}
            className={`text-center p-2 rounded-xl transition-all duration-300 border group cursor-pointer ${
              username === 'estudiante' 
                ? 'bg-sky-50 border-sky-300 dark:bg-sky-950/30 dark:border-sky-700' 
                : 'bg-gray-50 dark:bg-slate-800/60 border-transparent hover:bg-sky-50 dark:hover:bg-slate-800 hover:border-sky-200 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <FaUserGraduate className="mr-1.5 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {t.login.student}
              </span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] mt-1">
              <span className="text-gray-500 dark:text-gray-400">user:</span>{' '}
              estudiante
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[10px]">
              <span className="text-gray-500 dark:text-gray-400">pass:</span>{' '}
              123456
            </p>
          </button>

          <button
            type="button"
            onClick={() => loadTestUser('profesor')}
            className={`text-center p-2 rounded-xl transition-all duration-300 border group cursor-pointer ${
              username === 'profesor' 
                ? 'bg-sky-50 border-sky-300 dark:bg-sky-950/30 dark:border-sky-700' 
                : 'bg-gray-50 dark:bg-slate-800/60 border-transparent hover:bg-sky-50 dark:hover:bg-slate-800 hover:border-sky-200 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <FaChalkboardTeacher className="mr-1.5 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {t.login.teacher}
              </span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] mt-1">
              <span className="text-gray-500 dark:text-gray-400">user:</span>{' '}
              profesor
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[10px]">
              <span className="text-gray-500 dark:text-gray-400">pass:</span>{' '}
              123456
            </p>
          </button>

          <button
            type="button"
            onClick={() => loadTestUser('admin')}
            className={`text-center p-2 rounded-xl transition-all duration-300 border group cursor-pointer ${
              username === 'admin' 
                ? 'bg-sky-50 border-sky-300 dark:bg-sky-950/30 dark:border-sky-700' 
                : 'bg-gray-50 dark:bg-slate-800/60 border-transparent hover:bg-sky-50 dark:hover:bg-slate-800 hover:border-sky-200 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <svg
                className="mr-1.5 h-3.5 w-3.5 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {t.login.admin}
              </span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] mt-1">
              <span className="text-gray-500 dark:text-gray-400">user:</span>{' '}
              admin
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[10px]">
              <span className="text-gray-500 dark:text-gray-400">pass:</span>{' '}
              123456
            </p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;