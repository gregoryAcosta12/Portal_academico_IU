import { useState } from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaLaptopCode,
  FaFileAlt,
  FaTimes,
  FaMapMarkerAlt,
  FaInfoCircle,
} from 'react-icons/fa';

const events = [
  {
    id: 1,
    day: '15',
    month: 'NOV',
    title: 'Examen final Cálculo II',
    subtitle: 'Auditorio A · 08:00 AM',
    icon: <FaGraduationCap />,
    color: 'from-red-400 to-rose-500',
    tag: 'Examen',
    location: 'Auditorio A, Edificio de Ingeniería',
    description: 'Examen final de la materia Cálculo II. Traer calculadora científica y formulario.',
  },
  {
    id: 2,
    day: '18',
    month: 'NOV',
    title: 'Hackathon IA 2024',
    subtitle: 'Laboratorio 3 · Todo el día',
    icon: <FaLaptopCode />,
    color: 'from-sky-400 to-blue-500',
    tag: 'Evento',
    location: 'Laboratorio 3, Facultad de Ingeniería',
    description: 'Competencia de 24 horas creando soluciones con Inteligencia Artificial. ¡Inscripciones abiertas!',
  },
  {
    id: 3,
    day: '22',
    month: 'NOV',
    title: 'Entrega proyecto final',
    subtitle: 'Plataforma virtual · 11:59 PM',
    icon: <FaFileAlt />,
    color: 'from-amber-400 to-orange-500',
    tag: 'Entrega',
    location: 'Plataforma Virtual (Moodle)',
    description: 'Subir el documento PDF del proyecto final de Programación Web antes de la medianoche.',
  },
];

export const UpcomingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  return (
    <>
      {/* 🎯 1. LA TARJETA */}
      <div className="group relative bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 bg-[length:200%_200%] animate-gradient-shift rounded-2xl p-6 shadow-sm border border-gray-100/80 dark:border-slate-800 hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-amber-200/40 dark:bg-amber-500/10 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />

        <div className="relative flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 rounded-full" />
              Próximos eventos
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3.5">
              No te pierdas ninguna fecha
            </p>
          </div>
          
          <button 
            onClick={() => setSelectedEvent(events[0])}
            className="w-8 h-8 rounded-lg bg-white/60 dark:bg-slate-800/60 flex items-center justify-center text-amber-500 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700 hover:scale-110 transition-all duration-300 cursor-pointer"
            title="Ver calendario completo"
          >
            <FaCalendarAlt className="w-4 h-4" />
          </button>
        </div>

        <div className="relative space-y-3">
          {events.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelectedEvent(e)}
              className="group/item w-full flex items-center gap-4 p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-amber-100 dark:hover:border-amber-900/50 hover:shadow-md transition-all duration-300 cursor-pointer text-left"
            >
              <div className="flex-shrink-0 w-14 text-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white leading-none">
                  {e.day}
                </p>
                <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mt-1">
                  {e.month}
                </p>
              </div>

              <div className={`w-1 self-stretch rounded-full bg-gradient-to-b ${e.color}`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${e.color} text-white shadow-sm`}>
                    {e.tag}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white mt-1 truncate">
                  {e.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                  <FaClock className="w-2.5 h-2.5" />
                  {e.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 🎯 2. EL MODAL (Fuera de la tarjeta para que el fondo oscuro cubra todo) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          />

          <div className="relative w-full max-w-md overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-100 dark:border-slate-800 animate-slideUp">
            <div className={`relative px-6 py-6 bg-gradient-to-r ${selectedEvent.color} text-white`}>
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
              
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl mb-4">
                {selectedEvent.icon}
              </div>
              
              <span className="inline-block px-2.5 py-1 rounded-full bg-black/20 text-[10px] font-bold uppercase tracking-wider mb-2">
                {selectedEvent.tag}
              </span>
              
              <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                  <FaCalendarAlt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                    {selectedEvent.day} de {selectedEvent.month}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
                  <FaClock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hora</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                    {selectedEvent.subtitle.split('·')[1]?.trim() || 'Todo el día'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <FaMapMarkerAlt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ubicación</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                    {selectedEvent.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                  <FaInfoCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;