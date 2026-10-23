import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl shadow-xl hover:shadow-2xl dark:shadow-slate-950/50 border border-transparent dark:border-slate-800 transition-all duration-500 ${className}`}
    >
      {(title || subtitle) && (
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-gray-100 dark:border-slate-800">
          {title && (
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="px-6 sm:px-8 py-6 sm:py-8">
        {children}
      </div>
    </div>
  );
};

export default Card;