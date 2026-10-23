export type Rol = 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';

export interface ProfileData {
  id: number;
  username: string;
  rol: Rol;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  avatarUrl?: string;
  bio?: string;
  fechaRegistro?: string;
  ultimoAcceso?: string;
  estado: 'ACTIVO' | 'INACTIVO' | 'SUSPENDIDO';
}

export interface EstudianteExtra {
  matricula: string;
  carrera: string;
  facultad: string;
  semestre: number;
  promedio: number;
  creditosAprobados: number;
  creditosTotales: number;
  materiasInscritas: number;
}

export interface ProfesorExtra {
  codigoEmpleado: string;
  departamento: string;
  facultad: string;
  especialidad: string;
  aniosExperiencia: number;
  materiasAsignadas: number;
  estudiantesACargo: number;
  publicaciones: number;
}

export interface AdminExtra {
  nivelAcceso: string;
  permisos: string[];
  departamento: string;
  aniosServicio: number;
  usuariosGestionados: number;
  accionesRecientes: number;
}