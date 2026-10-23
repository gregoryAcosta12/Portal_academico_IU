import { USE_MOCK_AUTH } from './auth';
import type { Actividad } from '../types/actividad.types';

const mockActividades: Actividad[] = [
  {
    id: 1,
    tipo: 'usuario',
    titulo: 'Nuevo estudiante registrado',
    descripcion: 'Juan Pérez se inscribió en Ing. Sistemas',
    fecha: 'Hace 5 min',
    usuario: 'Sistema',
    iconoColor: 'from-sky-400 to-blue-500',
  },
  {
    id: 2,
    tipo: 'calificacion',
    titulo: 'Calificaciones publicadas',
    descripcion: 'Dr. López subió notas de Cálculo II',
    fecha: 'Hace 22 min',
    usuario: 'Dr. López',
    iconoColor: 'from-emerald-400 to-green-500',
  },
  {
    id: 3,
    tipo: 'materia',
    titulo: 'Profesor asignado',
    descripcion: 'Mtra. García asignada a Física I',
    fecha: 'Hace 1 h',
    usuario: 'Admin',
    iconoColor: 'from-purple-400 to-fuchsia-500',
  },
  {
    id: 4,
    tipo: 'materia',
    titulo: 'Nueva materia creada',
    descripcion: 'Se añadió "IA Aplicada" al catálogo',
    fecha: 'Hace 2 h',
    usuario: 'Admin',
    iconoColor: 'from-amber-400 to-orange-500',
  },
  {
    id: 5,
    tipo: 'inscripcion',
    titulo: 'Inscripción aprobada',
    descripcion: 'María Ruiz aceptada en Medicina',
    fecha: 'Hace 3 h',
    usuario: 'Sistema',
    iconoColor: 'from-indigo-400 to-violet-500',
  },
  {
    id: 6,
    tipo: 'sistema',
    titulo: 'Actualización del sistema',
    descripcion: 'Mantenimiento programado completado',
    fecha: 'Ayer, 23:00',
    usuario: 'Soporte Técnico',
    iconoColor: 'from-gray-400 to-slate-500',
  },
  {
    id: 7,
    tipo: 'calificacion',
    titulo: 'Notas modificadas',
    descripcion: 'Cambio de nota en Historia Universal',
    fecha: 'Ayer, 15:30',
    usuario: 'Mtra. Gómez',
    iconoColor: 'from-emerald-400 to-green-500',
  },
  {
    id: 8,
    tipo: 'usuario',
    titulo: 'Baja de estudiante',
    descripcion: 'Carlos Ruiz solicitó retiro voluntario',
    fecha: 'Ayer, 10:15',
    usuario: 'Admin',
    iconoColor: 'from-red-400 to-rose-500',
  },
];

export const getTodasLasActividades = async (): Promise<Actividad[]> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 800));
    return [...mockActividades];
  }
  const response = await fetch('/api/Actividades');
  return response.json();
};