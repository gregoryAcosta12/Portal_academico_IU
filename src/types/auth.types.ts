// 📝 Credenciales de registro (SOLO lo que tiene el backend)
export interface RegisterData {
  username: string
  password: string
  rol?: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE'  // Opcional, por defecto 'ESTUDIANTE'
}

// Credenciales de login
export interface LoginCredentials {
  username: string
  password: string
}

// Usuario
export interface Usuario {
  id: number
  username: string
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE'
}

// Respuesta del login
export interface AuthResponse {
  token: string
  usuario: Usuario
  rol: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE'
  estudianteId?: number
  profesorId?: number
}

// Contexto de autenticación
export interface AuthContextType {
  user: Usuario | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  userRole: 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE' | null
}