// 🔐 src/api/auth.ts
import { apiClient } from './client'
import type { LoginCredentials, AuthResponse, Usuario, RegisterData } from '../types/auth.types'
import { findMockUser, generateMockToken } from './mockUsers'

// 🎭 Bandera global para activar/desactivar el modo demo
export const USE_MOCK_AUTH = true  // ← Pon false cuando quieras usar el backend real

export const registerUser = async (data: RegisterData): Promise<Usuario> => {
  const response = await apiClient.post<Usuario>('/Usuarios', {
    username: data.username,
    password: data.password,
    rol: 'ESTUDIANTE',
  })
  return response.data
}

// 📌 Login con soporte para usuarios demo
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // 🎭 Modo demo: verificar primero si es un usuario mockeado
  if (USE_MOCK_AUTH) {
    const mockUser = findMockUser(credentials.username, credentials.password)

    if (mockUser) {
      const response: AuthResponse = {
        token: generateMockToken(mockUser.username),
        usuario: mockUser.usuario,
        rol: mockUser.rol,
      }

      // Guardar en localStorage igual que el flujo real
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.usuario))
      localStorage.setItem('rol', response.rol)

      // Simular delay de red para que se vea natural
      await new Promise((resolve) => setTimeout(resolve, 500))

      return response
    }

    // Si no es demo y quieres bloquear el acceso sin backend, lanza error:
    throw new Error('Usuario o contraseña incorrectos (modo demo)')

    // 👇 Si prefieres permitir el intento real cuando NO es demo, borra el throw de arriba
    // y deja que caiga al apiClient.post de abajo
  }

  // 🌐 Flujo real con backend
  const response = await apiClient.post<AuthResponse>('/Auth/login', {
    username: credentials.username,
    password: credentials.password,
  })

  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.usuario))
    localStorage.setItem('rol', response.data.rol)
  }

  return response.data
}

// 📌 Cerrar sesión
export const logoutUser = (): void => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')
  localStorage.removeItem('rol')
}

// 📌 Usuario guardado
export const getStoredUser = (): Usuario | null => {
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// 📌 Verificar auth
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token')
}