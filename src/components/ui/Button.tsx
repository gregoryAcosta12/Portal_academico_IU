import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  onClick,
  className = '',
  fullWidth = false,
}) => {
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 dark:from-sky-500 dark:to-blue-600 dark:hover:from-sky-400 dark:hover:to-blue-500 text-white shadow-md hover:shadow-lg shadow-sky-200/50 dark:shadow-sky-500/20',
    secondary:
      'bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200',
    danger:
      'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white shadow-md hover:shadow-lg shadow-red-200/50 dark:shadow-red-500/20',
    success:
      'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white shadow-md hover:shadow-lg shadow-green-200/50 dark:shadow-green-500/20',
    outline:
      'border-2 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/40',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const baseStyles = `
    rounded-xl font-medium
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
    inline-flex items-center justify-center gap-2
    ${fullWidth ? 'w-full' : ''}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={baseStyles}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;