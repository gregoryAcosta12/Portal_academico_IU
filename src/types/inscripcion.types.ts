export interface InscripcionDetalle {
  materiaId: number;
  codigo: string;
  nombre: string;
  creditos: number;
  profesor: string;
}

export interface Inscripcion {
  id: number;
  estudianteId: number;
  estudianteNombre: string;
  matricula: string;
  fecha: string;
  periodo: string;
  materias: InscripcionDetalle[];
  totalCreditos: number;
  estado: 'Confirmada' | 'Pendiente' | 'Cancelada';
}