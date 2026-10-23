export interface Actividad {
  id: number;
  tipo: 'usuario' | 'calificacion' | 'materia' | 'inscripcion' | 'sistema';
  titulo: string;
  descripcion: string;
  fecha: string; // Fecha completa para el historial
  usuario: string; // Quién lo hizo
  iconoColor: string; // Para los gradientes
}