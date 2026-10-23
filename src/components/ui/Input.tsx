import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-sky-500 dark:group-focus-within:text-sky-400 transition-colors duration-300">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full
              ${icon ? 'pl-10' : 'px-4'}
              py-2.5
              border
              ${
                error
                  ? 'border-red-500 dark:border-red-500'
                  : 'border-gray-200 dark:border-slate-700'
              }
              rounded-xl
              bg-white dark:bg-slate-800
              focus:outline-none
              focus:ring-2
              ${
                error
                  ? 'focus:ring-red-500 dark:focus:ring-red-500'
                  : 'focus:ring-sky-400 dark:focus:ring-sky-500'
              }
              focus:border-transparent
              transition-all duration-300
              text-gray-800 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              disabled:bg-gray-50 dark:disabled:bg-slate-900 disabled:text-gray-500 dark:disabled:text-gray-500
              hover:border-gray-300 dark:hover:border-slate-600
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;