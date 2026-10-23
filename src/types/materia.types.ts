export interface Materia {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
  profesor: string;
  carrera: string;
  semestre: number;
  cupos: number;
  inscritos: number;
  estado: 'Activa' | 'Inactiva';
}