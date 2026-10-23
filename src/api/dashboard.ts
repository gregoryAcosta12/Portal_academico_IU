import { apiClient as api } from './client'
import type { DashboardStats, UserInfo } from '../types/dashboard.types'
import { USE_MOCK_AUTH } from './auth'

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // 🎭 Datos fake para modo demo
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 300))
    return {
      totalEstudiantes: 128,
      totalProfesores: 24,
      totalMaterias: 56,
      totalCarreras: 8,
      totalFacultades: 4,
      totalInscripciones: 342,
    }
  }

  const [estudiantes, profesores, materias, carreras, facultades, inscripciones] =
    await Promise.all([
      api.get('/Estudiantes'),
      api.get('/Profesores'),
      api.get('/Materias'),
      api.get('/Carreras'),
      api.get('/Facultades'),
      api.get('/Inscripciones'),
    ])

  return {
    totalEstudiantes: estudiantes.data.length || 0,
    totalProfesores: profesores.data.length || 0,
    totalMaterias: materias.data.length || 0,
    totalCarreras: carreras.data.length || 0,
    totalFacultades: facultades.data.length || 0,
    totalInscripciones: inscripciones.data.length || 0,
  }
}

export const getCurrentUser = async (): Promise<UserInfo> => {
  if (USE_MOCK_AUTH) {
    const stored = localStorage.getItem('user')
    if (stored) return JSON.parse(stored)
    throw new Error('No hay usuario demo')
  }

  const response = await api.get('/Usuarios/mi-perfil')
  return response.data
}