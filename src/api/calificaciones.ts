import { USE_MOCK_AUTH } from './auth';
import type { RendimientoEstudiante } from '../types/calificacion.types';

const mockCalificaciones: Record<number, RendimientoEstudiante> = {
  1: {
    estudianteId: 1,
    matricula: '2021-IS-0458',
    nombreCompleto: 'Juan Pérez',
    carrera: 'Ing. Sistemas',
    promedioGeneral: 3.72,
    creditosAprobados: 142,
    asignaturas: [
      { id: 1, materiaCodigo: 'IS-101', materiaNombre: 'Intro a la Prog.', creditos: 4, profesor: 'Mtra. García', periodo: '2021-1', nota: 85, estado: 'Aprobada' },
      { id: 2, materiaCodigo: 'IS-201', materiaNombre: 'Estructuras de Datos', creditos: 4, profesor: 'Dr. López', periodo: '2022-1', nota: 92, estado: 'Aprobada' },
      { id: 3, materiaCodigo: 'IS-301', materiaNombre: 'Programación Web', creditos: 4, profesor: 'Mtra. García', periodo: '2023-1', nota: 88, estado: 'Aprobada' },
      { id: 4, materiaCodigo: 'IS-401', materiaNombre: 'Bases de Datos', creditos: 4, profesor: 'Lic. Fernández', periodo: '2023-2', nota: 78, estado: 'Aprobada' },
      { id: 5, materiaCodigo: 'IS-501', materiaNombre: 'Redes', creditos: 4, profesor: 'Ing. Torres', periodo: '2024-1', nota: 0, estado: 'En curso' },
    ],
  },
  2: {
    estudianteId: 2,
    matricula: '2020-ME-0123',
    nombreCompleto: 'María Ruiz',
    carrera: 'Medicina',
    promedioGeneral: 3.85,
    creditosAprobados: 168,
    asignaturas: [
      { id: 6, materiaCodigo: 'ME-101', materiaNombre: 'Anatomía I', creditos: 6, profesor: 'Dr. Pérez', periodo: '2020-1', nota: 95, estado: 'Aprobada' },
      { id: 7, materiaCodigo: 'ME-201', materiaNombre: 'Fisiología', creditos: 6, profesor: 'Dra. Gómez', periodo: '2021-1', nota: 90, estado: 'Aprobada' },
      { id: 8, materiaCodigo: 'ME-301', materiaNombre: 'Patología', creditos: 6, profesor: 'Dr. Ruiz', periodo: '2022-1', nota: 88, estado: 'Aprobada' },
      { id: 9, materiaCodigo: 'ME-401', materiaNombre: 'Farmacología', creditos: 6, profesor: 'Dra. Díaz', periodo: '2023-1', nota: 92, estado: 'Aprobada' },
    ],
  },
  6: {
    estudianteId: 6,
    matricula: '2021-IS-0321',
    nombreCompleto: 'Laura Sánchez',
    carrera: 'Ing. Sistemas',
    promedioGeneral: 3.20,
    creditosAprobados: 90,
    asignaturas: [
      { id: 10, materiaCodigo: 'IS-101', materiaNombre: 'Intro a la Prog.', creditos: 4, profesor: 'Mtra. García', periodo: '2021-1', nota: 70, estado: 'Aprobada' },
      { id: 11, materiaCodigo: 'IS-201', materiaNombre: 'Estructuras de Datos', creditos: 4, profesor: 'Dr. López', periodo: '2022-1', nota: 65, estado: 'Aprobada' },
      { id: 12, materiaCodigo: 'IS-301', materiaNombre: 'Programación Web', creditos: 4, profesor: 'Mtra. García', periodo: '2023-1', nota: 45, estado: 'Reprobada' },
    ],
  },
};

export const getRendimientoEstudiante = async (id: number): Promise<RendimientoEstudiante> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 600));
    if (!mockCalificaciones[id]) {
      throw new Error('No hay calificaciones registradas para este estudiante.');
    }
    return mockCalificaciones[id];
  }
  const response = await fetch(`/api/Calificaciones/estudiante/${id}`);
  if (!response.ok) throw new Error('Error al obtener calificaciones');
  return response.json();
};

export const getMisCalificaciones = async (): Promise<RendimientoEstudiante> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 600));
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (user?.username === 'estudiante') {
      return mockCalificaciones[1];
    }
    return mockCalificaciones[1];
  }
  const response = await fetch('/api/Calificaciones/mis-notas');
  if (!response.ok) throw new Error('Error al obtener tus calificaciones');
  return response.json();
};