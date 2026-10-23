import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';
import {
  FaUserPlus,
  FaClipboardCheck,
  FaChalkboardTeacher,
  FaBookOpen,
  FaFileSignature,
  FaArrowRight,
} from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';

interface Activity {
  id: number;
  icon: ReactElement;
  color: string;
  title: string;
  description: string;
  time: string;
}

export const ActivityFeed = () => {
  const { t } = useLanguage();

  const activities: Activity[] = [
    {
      id: 1,
      icon: <FaUserPlus />,
      color: 'from-sky-400 to-blue-500',
      title: t.dashboard.activity1Title,
      description: t.dashboard.activity1Desc,
      time: t.dashboard.activity1Time,
    },
    {
      id: 2,
      icon: <FaClipboardCheck />,
      color: 'from-emerald-400 to-green-500',
      title: t.dashboard.activity2Title,
      description: t.dashboard.activity2Desc,
      time: t.dashboard.activity2Time,
    },
    {
      id: 3,
      icon: <FaChalkboardTeacher />,
      color: 'from-purple-400 to-fuchsia-500',
      title: t.dashboard.activity3Title,
      description: t.dashboard.activity3Desc,
      time: t.dashboard.activity3Time,
    },
    {
      id: 4,
      icon: <FaBookOpen />,
      color: 'from-amber-400 to-orange-500',
      title: t.dashboard.activity4Title,
      description: t.dashboard.activity4Desc,
      time: t.dashboard.activity4Time,
    },
    {
      id: 5,
      icon: <FaFileSignature />,
      color: 'from-indigo-400 to-violet-500',
      title: t.dashboard.activity5Title,
      description: t.dashboard.activity5Desc,
      time: t.dashboard.activity5Time,
    },
  ];

  return (
    <div className="group relative bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />

      <div className="relative flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-5 bg-gradient-to-b from-sky-500 to-blue-600 dark:from-sky-400 dark:to-cyan-500 rounded-full" />
            {t.dashboard.recentActivity}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
            {t.dashboard.recentActivityDesc}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          {t.dashboard.live}
        </span>
      </div>

      <div className="relative space-y-1">
        {activities.map((a, i) => (
          <div
            key={a.id}
            className="group/item relative flex items-start gap-3 p-3 rounded-xl hover:bg-white/70 dark:hover:bg-slate-800/50 transition-colors duration-300"
          >
            {i < activities.length - 1 && (
              <div className="absolute left-[30px] top-[52px] bottom-0 w-px bg-gradient-to-b from-sky-200 dark:from-sky-900 to-transparent" />
            )}

            <div
              className={`relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${a.color} text-white flex items-center justify-center text-xs shadow-md transition-transform duration-300 group-hover/item:scale-110`}
            >
              {a.icon}
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
                {a.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                {a.description}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                {a.time}
              </p>
            </div>
          </div>
        ))}
      </div>


      <Link
        to="/actividades"
        className="relative mt-4 flex items-center justify-center gap-2 w-full text-center py-2 rounded-xl text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-slate-800/50 hover:bg-sky-100 dark:hover:bg-slate-700 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-300 group/btn"
      >
        {t.dashboard.viewAllActivity}
        <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
};

export default ActivityFeed;