// 🎭 src/api/mockUsers.ts
import type { Usuario } from '../types/auth.types'

type Rol = 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE'

interface MockUser {
  username: string
  password: string
  usuario: Usuario
  rol: Rol
  estudianteId?: number
  profesorId?: number
}

export const mockUsers: MockUser[] = [
  {
    username: 'admin',
    password: '123456',
    rol: 'ADMIN',
    usuario: {
      id: 1,
      username: 'admin',
      rol: 'ADMIN',
    },
  },
  {
    username: 'profesor',
    password: '123456',
    rol: 'PROFESOR',
    usuario: {
      id: 2,
      username: 'profesor',
      rol: 'PROFESOR',
    },
    profesorId: 1,
  },
  {
    username: 'estudiante',
    password: '123456',
    rol: 'ESTUDIANTE',
    usuario: {
      id: 3,
      username: 'estudiante',
      rol: 'ESTUDIANTE',
    },
    estudianteId: 1,
  },
]

// 🔍 Buscar usuario demo
export const findMockUser = (username: string, password: string): MockUser | null => {
  return (
    mockUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    ) || null
  )
}

// 🎫 Generar token falso
export const generateMockToken = (username: string): string => {
  return `mock-token-${username}-${Date.now()}`
}