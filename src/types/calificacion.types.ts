export interface Nota {
  id: number;
  materiaCodigo: string;
  materiaNombre: string;
  creditos: number;
  profesor: string;
  periodo: string; // Ej: "2023-1", "2023-2"
  nota: number; // 0 a 100
  estado: 'Aprobada' | 'Reprobada' | 'En curso';
}

export interface RendimientoEstudiante {
  estudianteId: number;
  matricula: string;
  nombreCompleto: string;
  carrera: string;
  promedioGeneral: number;
  creditosAprobados: number;
  asignaturas: Nota[];
}