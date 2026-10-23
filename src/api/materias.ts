import { USE_MOCK_AUTH } from './auth';
import type { Materia } from '../types/materia.types';

const mockMaterias: Materia[] = [
  {
    id: 1,
    codigo: 'IS-301',
    nombre: 'Programación Web',
    creditos: 4,
    profesor: 'Mtra. García',
    carrera: 'Ing. Sistemas',
    semestre: 5,
    cupos: 40,
    inscritos: 35,
    estado: 'Activa',
  },
  {
    id: 2,
    codigo: 'ME-201',
    nombre: 'Anatomía Humana',
    creditos: 6,
    profesor: 'Dr. López',
    carrera: 'Medicina',
    semestre: 3,
    cupos: 30,
    inscritos: 30,
    estado: 'Activa',
  },
  {
    id: 3,
    codigo: 'DE-101',
    nombre: 'Derecho Civil I',
    creditos: 3,
    profesor: 'Lic. Fernández',
    carrera: 'Derecho',
    semestre: 1,
    cupos: 50,
    inscritos: 42,
    estado: 'Activa',
  },
  {
    id: 4,
    codigo: 'AD-401',
    nombre: 'Gestión Empresarial',
    creditos: 4,
    profesor: 'Mba. Torres',
    carrera: 'Administración',
    semestre: 7,
    cupos: 35,
    inscritos: 20,
    estado: 'Activa',
  },
  {
    id: 5,
    codigo: 'PS-202',
    nombre: 'Psicología Social',
    creditos: 3,
    profesor: 'Mtra. Díaz',
    carrera: 'Psicología',
    semestre: 4,
    cupos: 45,
    inscritos: 45,
    estado: 'Activa',
  },
  {
    id: 6,
    codigo: 'AR-501',
    nombre: 'Diseño Estructural',
    creditos: 5,
    profesor: 'Arq. Ruiz',
    carrera: 'Arquitectura',
    semestre: 8,
    cupos: 25,
    inscritos: 0,
    estado: 'Inactiva',
  },
];

export const getMaterias = async (): Promise<Materia[]> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 600));
    return [...mockMaterias];
  }
  const response = await fetch('/api/Materias');
  return response.json();
};

export const createMateria = async (data: Omit<Materia, 'id'>): Promise<Materia> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 800));
    const newId = Math.max(...mockMaterias.map((m) => m.id), 0) + 1;
    const newMateria: Materia = { ...data, id: newId };
    mockMaterias.push(newMateria);
    return newMateria;
  }
  const response = await fetch('/api/Materias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateMateria = async (id: number, data: Partial<Materia>): Promise<Materia> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 800));
    const index = mockMaterias.findIndex((m) => m.id === id);
    if (index === -1) throw new Error('Materia no encontrada');
    mockMaterias[index] = { ...mockMaterias[index], ...data };
    return mockMaterias[index];
  }
  const response = await fetch(`/api/Materias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteMateria = async (id: number): Promise<void> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 600));
    const index = mockMaterias.findIndex((m) => m.id === id);
    if (index !== -1) mockMaterias.splice(index, 1);
    return;
  }
  await fetch(`/api/Materias/${id}`, { method: 'DELETE' });
};