import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import Button from '../ui/Button';
import Input from '../ui/Input';

const registerSchema = yup.object({
  username: yup
    .string()
    .required('El nombre de usuario es obligatorio')
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede tener más de 20 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guión bajo'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(30, 'La contraseña no puede tener más de 30 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Debe tener mayúscula, minúscula y número'
    )
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const password = watch('password', '');

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const registerField = (name: keyof RegisterFormData) => {
    const { onBlur, ...rest } = register(name);
    return {
      ...rest,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur(e);
        handleBlur();
      },
    };
  };

  useEffect(() => {
    const validations = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
    setPasswordValidations(validations);

    const strength = Object.values(validations).filter(Boolean).length;
    setPasswordStrength(strength);
  }, [password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200 dark:bg-slate-700';
    if (passwordStrength <= 2) return 'bg-red-500 dark:bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500 dark:bg-yellow-500';
    return 'bg-green-500 dark:bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Débil';
    if (passwordStrength === 3) return 'Media';
    return 'Fuerte';
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 animate-fadeIn"
    >
      <div className="transform transition-all duration-300 hover:translate-x-1">
        <Input
          label="Nombre de usuario"
          type="text"
          placeholder="ejemplo_usuario"
          icon={
            <FaUser
              className={`transition-colors duration-300 ${
                focusedField === 'username'
                  ? 'text-sky-500 dark:text-sky-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            />
          }
          error={errors.username?.message}
          onFocus={() => handleFocus('username')}
          className={`py-3 pl-11 transition-all duration-300 ${
            focusedField === 'username'
              ? 'border-sky-400 ring-2 ring-sky-200 dark:border-sky-500 dark:ring-sky-900/50'
              : 'border-gray-200 dark:border-slate-700'
          }`}
          disabled={isLoading}
          {...registerField('username')}
        />
      </div>

      <div className="transform transition-all duration-300 hover:translate-x-1">
        <div className="relative">
          <Input
            label="Contraseña"
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
            error={errors.password?.message}
            onFocus={() => handleFocus('password')}
            className={`py-3 pl-11 transition-all duration-300 ${
              focusedField === 'password'
                ? 'border-sky-400 ring-2 ring-sky-200 dark:border-sky-500 dark:ring-sky-900/50'
                : 'border-gray-200 dark:border-slate-700'
            }`}
            disabled={isLoading}
            {...registerField('password')}
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

        {password.length > 0 && (
          <div className="mt-2 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 min-w-[40px]">
                {getPasswordStrengthText()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-xs">
              <div
                className={`flex items-center gap-1 ${
                  passwordValidations.length
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {passwordValidations.length ? (
                  <FaCheckCircle className="h-3 w-3" />
                ) : (
                  <FaTimesCircle className="h-3 w-3" />
                )}
                <span>Mínimo 6 caracteres</span>
              </div>
              <div
                className={`flex items-center gap-1 ${
                  passwordValidations.uppercase
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {passwordValidations.uppercase ? (
                  <FaCheckCircle className="h-3 w-3" />
                ) : (
                  <FaTimesCircle className="h-3 w-3" />
                )}
                <span>Mayúscula</span>
              </div>
              <div
                className={`flex items-center gap-1 ${
                  passwordValidations.lowercase
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {passwordValidations.lowercase ? (
                  <FaCheckCircle className="h-3 w-3" />
                ) : (
                  <FaTimesCircle className="h-3 w-3" />
                )}
                <span>Minúscula</span>
              </div>
              <div
                className={`flex items-center gap-1 ${
                  passwordValidations.number
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {passwordValidations.number ? (
                  <FaCheckCircle className="h-3 w-3" />
                ) : (
                  <FaTimesCircle className="h-3 w-3" />
                )}
                <span>Número</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="transform transition-all duration-300 hover:translate-x-1">
        <div className="relative">
          <Input
            label="Confirmar contraseña"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            icon={
              <FaLock
                className={`transition-colors duration-300 ${
                  focusedField === 'confirmPassword'
                    ? 'text-sky-500 dark:text-sky-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            }
            error={errors.confirmPassword?.message}
            onFocus={() => handleFocus('confirmPassword')}
            className={`py-3 pl-11 transition-all duration-300 ${
              focusedField === 'confirmPassword'
                ? 'border-sky-400 ring-2 ring-sky-200 dark:border-sky-500 dark:ring-sky-900/50'
                : 'border-gray-200 dark:border-slate-700'
            }`}
            disabled={isLoading}
            {...registerField('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-400 dark:text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 hover:scale-110"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>
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
          {isLoading ? 'Registrando...' : 'Crear cuenta'}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </Button>
    </form>
  );
};

export default RegisterForm;