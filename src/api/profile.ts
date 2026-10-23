import { apiClient as api } from './client';
import type { ProfileData, EstudianteExtra, ProfesorExtra, AdminExtra } from '../types/profile.types';
import { USE_MOCK_AUTH } from './auth';

const mockProfiles: Record<string, ProfileData> = {
  admin: {
    id: 1,
    username: 'admin',
    rol: 'ADMIN',
    nombre: 'Carlos',
    apellido: 'Ramírez',
    email: 'admin@iu-university.edu',
    telefono: '+1 (809) 555-0101',
    direccion: 'Av. Universitaria 123, Santo Domingo',
    fechaNacimiento: '1985-03-15',
    bio: 'Administrador general del sistema académico con más de 10 años de experiencia en gestión universitaria.',
    fechaRegistro: '2020-01-10',
    ultimoAcceso: 'Hace 2 minutos',
    estado: 'ACTIVO',
  },
  profesor: {
    id: 2,
    username: 'profesor',
    rol: 'PROFESOR',
    nombre: 'María',
    apellido: 'González',
    email: 'm.gonzalez@iu-university.edu',
    telefono: '+1 (809) 555-0202',
    direccion: 'Calle Las Palmas 45, Santiago',
    fechaNacimiento: '1978-08-22',
    bio: 'Docente investigadora en el área de Ciencias de la Computación. Apasionada por la enseñanza y la inteligencia artificial.',
    fechaRegistro: '2018-09-01',
    ultimoAcceso: 'Hace 15 minutos',
    estado: 'ACTIVO',
  },
  estudiante: {
    id: 3,
    username: 'estudiante',
    rol: 'ESTUDIANTE',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@est.iu-university.edu',
    telefono: '+1 (809) 555-0303',
    direccion: 'Res. Los Álamos, Apto 5B, Santo Domingo',
    fechaNacimiento: '2002-11-07',
    bio: 'Estudiante de Ingeniería en Sistemas, apasionado por el desarrollo web y la ciberseguridad.',
    fechaRegistro: '2021-08-15',
    ultimoAcceso: 'Hace 5 minutos',
    estado: 'ACTIVO',
  },
};

const mockEstudianteExtra: EstudianteExtra = {
  matricula: '2021-IS-0458',
  carrera: 'Ingeniería en Sistemas',
  facultad: 'Facultad de Ingeniería',
  semestre: 7,
  promedio: 3.72,
  creditosAprobados: 142,
  creditosTotales: 180,
  materiasInscritas: 6,
};

const mockProfesorExtra: ProfesorExtra = {
  codigoEmpleado: 'PROF-2018-012',
  departamento: 'Ciencias de la Computación',
  facultad: 'Facultad de Ingeniería',
  especialidad: 'Inteligencia Artificial',
  aniosExperiencia: 12,
  materiasAsignadas: 4,
  estudiantesACargo: 128,
  publicaciones: 23,
};

const mockAdminExtra: AdminExtra = {
  nivelAcceso: 'Super Administrador',
  permisos: ['Usuarios', 'Académico', 'Reportes', 'Configuración', 'Finanzas'],
  departamento: 'Dirección Académica',
  aniosServicio: 5,
  usuariosGestionados: 1523,
  accionesRecientes: 47,
};

export const getMyProfile = async (): Promise<ProfileData> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 300));
    const stored = localStorage.getItem('user');
    const username = stored ? JSON.parse(stored).username : 'estudiante';
    return mockProfiles[username] || mockProfiles.estudiante;
  }
  const response = await api.get<ProfileData>('/Usuarios/mi-perfil');
  return response.data;
};

export const getRoleExtraData = async (rol: string): Promise<any> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 200));
    if (rol === 'ESTUDIANTE') return mockEstudianteExtra;
    if (rol === 'PROFESOR') return mockProfesorExtra;
    if (rol === 'ADMIN') return mockAdminExtra;
    return null;
  }
  const endpoints: Record<string, string> = {
    ESTUDIANTE: '/Estudiantes/mi-perfil',
    PROFESOR: '/Profesores/mi-perfil',
    ADMIN: '/Admin/mi-perfil',
  };
  const response = await api.get(endpoints[rol]);
  return response.data;
};

export const updateMyProfile = async (data: Partial<ProfileData>): Promise<ProfileData> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 500));
    const stored = localStorage.getItem('user');
    const username = stored ? JSON.parse(stored).username : 'estudiante';
    mockProfiles[username] = { ...mockProfiles[username], ...data };
    return mockProfiles[username];
  }
  const response = await api.put<ProfileData>('/Usuarios/mi-perfil', data);
  return response.data;
};