import { useDashboard } from '../hooks/useDashboard';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { QuickActions } from '../components/dashboard/QuickActions';
import { EnrollmentChart } from '../components/dashboard/EnrollmentChart';
import { FacultyDonut } from '../components/dashboard/FacultyDonut';
import { TopCareersChart } from '../components/dashboard/TopCareersChart';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import ParticleBackground from '../components/ui/ParticleBackground';

export const DashboardPage = () => {
  const { stats, user, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center gap-4 transition-colors duration-500">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-sky-100 dark:border-slate-800 border-t-sky-500 dark:border-t-sky-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-sky-500 dark:bg-sky-400 rounded-full animate-pulse" />
          </div>
        </div>
        <p className="text-sky-600 dark:text-sky-400 font-medium animate-pulse">
          Cargando tu dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/40 p-8 max-w-md w-full text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Ups, algo salió mal
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const rol = user?.rol || 'ESTUDIANTE';

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-200/40 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-sky-100/50 dark:bg-sky-500/5 rounded-full blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

      <ParticleBackground
        primaryColor="14, 165, 233"
        secondaryColor="34, 211, 238"
        linkDistance={160}
      />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            <WelcomeBanner user={user} />

            {/* 🎯 Le pasamos el ROL a las Stats */}
            <DashboardStats stats={stats} rol={rol} />

            {/* 🎯 Le pasamos el ROL a los Accesos Rápidos */}
            <QuickActions rol={rol} />

            {/* Ocultamos los gráficos globales si es estudiante */}
            {rol !== 'ESTUDIANTE' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-slideUp animation-delay-300">
                  <div className="lg:col-span-2">
                    <EnrollmentChart />
                  </div>
                  <FacultyDonut />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-slideUp animation-delay-500">
                  <TopCareersChart />
                  <ActivityFeed />
                </div>
              </>
            )}

            <div className="animate-slideUp animation-delay-600">
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;