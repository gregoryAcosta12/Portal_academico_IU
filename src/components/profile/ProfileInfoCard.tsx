import type { ReactElement } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaCalendarAlt,
} from 'react-icons/fa';
import type { ProfileData } from '../../types/profile.types';

interface ProfileInfoCardProps {
  profile: ProfileData;
}

interface InfoItem {
  icon: ReactElement;
  label: string;
  value: string;
  color: string;
  particle: string;
}

export const ProfileInfoCard = ({ profile }: ProfileInfoCardProps) => {
  const items: InfoItem[] = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: profile.email || 'No registrado',
      color: 'from-sky-400 to-blue-500',
      particle: 'bg-sky-300',
    },
    {
      icon: <FaPhone />,
      label: 'Teléfono',
      value: profile.telefono || 'No registrado',
      color: 'from-emerald-400 to-green-500',
      particle: 'bg-emerald-300',
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Dirección',
      value: profile.direccion || 'No registrada',
      color: 'from-purple-400 to-fuchsia-500',
      particle: 'bg-purple-300',
    },
    {
      icon: <FaBirthdayCake />,
      label: 'Fecha de nacimiento',
      value: profile.fechaNacimiento || 'No registrada',
      color: 'from-amber-400 to-orange-500',
      particle: 'bg-amber-300',
    },
    {
      icon: <FaCalendarAlt />,
      label: 'Miembro desde',
      value: profile.fechaRegistro || 'No registrada',
      color: 'from-indigo-400 to-violet-500',
      particle: 'bg-indigo-300',
    },
  ];

  const particles = [
    { top: '10%', left: '15%', size: 3, delay: '0s', duration: '5s' },
    { top: '75%', left: '80%', size: 2, delay: '1s', duration: '4s' },
    { top: '45%', left: '40%', size: 2, delay: '2s', duration: '6s' },
  ];

  return (
    <div className="group relative bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-cyan-200/30 dark:bg-cyan-500/10 rounded-full blur-3xl animate-orb-pulse animation-delay-2000 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-sky-300 dark:bg-sky-500 opacity-50 animate-float"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="relative mb-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-5 bg-gradient-to-b from-sky-500 to-blue-600 dark:from-sky-400 dark:to-cyan-500 rounded-full" />
          Información personal
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
          Datos de contacto y cuenta
        </p>
      </div>

      <div className="relative space-y-2">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="group/item relative flex items-center gap-4 p-3 rounded-xl hover:bg-white/70 dark:hover:bg-slate-800/50 transition-colors duration-300 overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-0 w-0.5 bg-gradient-to-b ${item.color} group-hover/item:h-8 transition-all duration-300 rounded-full`}
            />

            <div
              className={`relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-6`}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white truncate mt-0.5">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfoCard;