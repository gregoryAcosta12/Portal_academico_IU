import { USE_MOCK_AUTH } from './auth';
import type { Estudiante } from '../types/estudiante.types';

const mockEstudiantes: Estudiante[] = [
  {
    id: 1,
    matricula: '2021-IS-0458',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@est.edu',
    telefono: '+1 809-555-0101',
    carrera: 'Ing. Sistemas',
    facultad: 'Ingeniería',
    semestre: 7,
    estado: 'Activo',
    fechaIngreso: '2021-08-15',
    promedio: 3.72,
  },
  {
    id: 2,
    matricula: '2020-ME-0123',
    nombre: 'María',
    apellido: 'Ruiz',
    email: 'maria.ruiz@est.edu',
    telefono: '+1 809-555-0102',
    carrera: 'Medicina',
    facultad: 'Ciencias de la Salud',
    semestre: 9,
    estado: 'Activo',
    fechaIngreso: '2020-08-20',
    promedio: 3.85,
  },
  {
    id: 3,
    matricula: '2022-DE-0789',
    nombre: 'Carlos',
    apellido: 'López',
    email: 'carlos.lopez@est.edu',
    telefono: '+1 809-555-0103',
    carrera: 'Derecho',
    facultad: 'Ciencias Sociales',
    semestre: 5,
    estado: 'Activo',
    fechaIngreso: '2022-01-10',
    promedio: 3.45,
  },
  {
    id: 4,
    matricula: '2019-AD-0456',
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana.martinez@est.edu',
    telefono: '+1 809-555-0104',
    carrera: 'Administración',
    facultad: 'Negocios',
    semestre: 10,
    estado: 'Graduado',
    fechaIngreso: '2019-08-12',
    promedio: 3.92,
  },
  {
    id: 5,
    matricula: '2023-PS-0987',
    nombre: 'Pedro',
    apellido: 'Gómez',
    email: 'pedro.gomez@est.edu',
    telefono: '+1 809-555-0105',
    carrera: 'Psicología',
    facultad: 'Ciencias Sociales',
    semestre: 3,
    estado: 'Activo',
    fechaIngreso: '2023-01-15',
    promedio: 3.60,
  },
  {
    id: 6,
    matricula: '2021-IS-0321',
    nombre: 'Laura',
    apellido: 'Sánchez',
    email: 'laura.sanchez@est.edu',
    telefono: '+1 809-555-0106',
    carrera: 'Ing. Sistemas',
    facultad: 'Ingeniería',
    semestre: 7,
    estado: 'Inactivo',
    fechaIngreso: '2021-08-15',
    promedio: 3.20,
  },
  {
    id: 7,
    matricula: '2022-ME-0654',
    nombre: 'Diego',
    apellido: 'Torres',
    email: 'diego.torres@est.edu',
    telefono: '+1 809-555-0107',
    carrera: 'Medicina',
    facultad: 'Ciencias de la Salud',
    semestre: 5,
    estado: 'Activo',
    fechaIngreso: '2022-08-18',
    promedio: 3.78,
  },
  {
    id: 8,
    matricula: '2020-AR-0147',
    nombre: 'Sofía',
    apellido: 'Ramírez',
    email: 'sofia.ramirez@est.edu',
    telefono: '+1 809-555-0108',
    carrera: 'Arquitectura',
    facultad: 'Ingeniería',
    semestre: 9,
    estado: 'Activo',
    fechaIngreso: '2020-01-20',
    promedio: 3.65,
  },
];

export const getEstudiantes = async (): Promise<Estudiante[]> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 600));
    return [...mockEstudiantes];
  }
  const response = await fetch('/api/Estudiantes');
  return response.json();
};

export const createEstudiante = async (
  data: Omit<Estudiante, 'id' | 'matricula'>
): Promise<Estudiante> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 800));
    const newId = Math.max(...mockEstudiantes.map((e) => e.id)) + 1;
    const newEstudiante: Estudiante = {
      ...data,
      id: newId,
      matricula: `${new Date().getFullYear()}-${data.carrera
        .substring(0, 2)
        .toUpperCase()}-${String(newId).padStart(4, '0')}`,
    };
    mockEstudiantes.push(newEstudiante);
    return newEstudiante;
  }
  const response = await fetch('/api/Estudiantes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateEstudiante = async (
  id: number,
  data: Partial<Estudiante>
): Promise<Estudiante> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 800));
    const index = mockEstudiantes.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Estudiante no encontrado');
    mockEstudiantes[index] = { ...mockEstudiantes[index], ...data };
    return mockEstudiantes[index];
  }
  const response = await fetch(`/api/Estudiantes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteEstudiante = async (id: number): Promise<void> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 600));
    const index = mockEstudiantes.findIndex((e) => e.id === id);
    if (index !== -1) mockEstudiantes.splice(index, 1);
    return;
  }
  await fetch(`/api/Estudiantes/${id}`, { method: 'DELETE' });
};