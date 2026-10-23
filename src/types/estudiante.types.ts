export interface Estudiante {
  id: number;
  matricula: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  carrera: string;
  facultad: string;
  semestre: number;
  estado: 'Activo' | 'Inactivo' | 'Graduado';
  fechaIngreso: string;
  promedio: number;
}