import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileInfoCard } from '../components/profile/ProfileInfoCard';
import { ProfileStatsRow } from '../components/profile/ProfileStatsRow';
import { RoleSpecificSection } from '../components/profile/RoleSpecificSection';
import { PerformanceChart } from '../components/profile/PerformanceChart';
import { SkillsRadar } from '../components/profile/SkillsRadar';
import { AchievementsGrid } from '../components/profile/AchievementsGrid';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { getMyProfile, getRoleExtraData, updateMyProfile } from '../api/profile';
import type { ProfileData } from '../types/profile.types';

export const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [extra, setExtra] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const p = await getMyProfile();
        setProfile(p);
        const e = await getRoleExtraData(p.rol);
        setExtra(e);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSaveProfile = async (data: Partial<ProfileData>) => {
    const updated = await updateMyProfile(data);
    setProfile(updated);
  };

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
          Cargando tu perfil...
        </p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/40 p-8 max-w-md w-full text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Ups, algo salió mal
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {error || 'Perfil no disponible'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors duration-300"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-200/40 dark:bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-sky-100/50 dark:bg-sky-500/5 rounded-full blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <div className="max-w-[1400px] mx-auto">
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
              Volver al dashboard
            </Link>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-[1400px] mx-auto space-y-6">
            <ProfileHeader
              profile={profile}
              onEdit={() => setIsEditOpen(true)}
            />

            <ProfileStatsRow rol={profile.rol} extra={extra} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-slideUp animation-delay-300">
              <div className="lg:col-span-2">
                <PerformanceChart rol={profile.rol} />
              </div>
              <SkillsRadar rol={profile.rol} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 animate-slideUp animation-delay-400">
              <div className="lg:col-span-2">
                <ProfileInfoCard profile={profile} />
              </div>
              <div className="lg:col-span-3">
                <RoleSpecificSection rol={profile.rol} extra={extra} />
              </div>
            </div>

            <div className="animate-slideUp animation-delay-500">
              <AchievementsGrid rol={profile.rol} />
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        profile={profile}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfilePage;