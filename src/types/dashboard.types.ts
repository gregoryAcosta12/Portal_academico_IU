
export interface DashboardStats {
  totalEstudiantes: number;
  totalProfesores: number;
  totalMaterias: number;
  totalCarreras: number;
  totalFacultades: number;
  totalInscripciones: number;
}


export interface UserInfo {
  id: number;
  username: string;
   nombreCompleto?: string;
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';
}