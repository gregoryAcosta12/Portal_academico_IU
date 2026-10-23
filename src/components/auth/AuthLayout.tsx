import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showLogo?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
}) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        {showLogo && (
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 dark:shadow-sky-500/20">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
            </div>
          </div>
        )}
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-500">
          {title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 transition-colors duration-500">
          {subtitle}
        </p>
      </div>

      <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/50 p-8 transition-colors duration-500 overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute top-[10%] left-[20%] w-1.5 h-1.5 bg-sky-400 dark:bg-sky-300 rounded-full animate-float opacity-50" style={{ animationDelay: '0s', animationDuration: '4s' }} />
          <span className="absolute top-[30%] left-[80%] w-2 h-2 bg-cyan-400 dark:bg-cyan-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1s', animationDuration: '6s' }} />
          <span className="absolute top-[70%] left-[10%] w-1 h-1 bg-blue-400 dark:bg-blue-300 rounded-full animate-float opacity-60" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <span className="absolute top-[85%] left-[65%] w-2 h-2 bg-sky-500 dark:bg-sky-200 rounded-full animate-float opacity-30" style={{ animationDelay: '0.5s', animationDuration: '7s' }} />
          <span className="absolute top-[45%] left-[50%] w-1.5 h-1.5 bg-cyan-300 dark:bg-cyan-200 rounded-full animate-float opacity-50" style={{ animationDelay: '1.5s', animationDuration: '5.5s' }} />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;