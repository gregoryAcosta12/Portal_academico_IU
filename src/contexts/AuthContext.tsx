// 🔐 src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { loginUser, logoutUser, getStoredUser } from '../api/auth'
import type { Usuario, LoginCredentials, AuthContextType } from '../types/auth.types'

// 📝 Creamos el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 📝 Props del provider
interface AuthProviderProps {
  children: ReactNode
}

// 📝 Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userRole, setUserRole] = useState<'ADMIN' | 'PROFESOR' | 'ESTUDIANTE' | null>(null)

  // 📌 Verificar sesión al cargar
  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
      setIsAuthenticated(true)
      setUserRole(storedUser.rol || null)
    }
  }, [])

  // 📌 Login
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await loginUser(credentials)
      
      setUser(response.usuario)
      setIsAuthenticated(true)
      setUserRole(response.rol)
      
    } catch (err: any) {
      const message = err.response?.data?.mensaje || 
                      err.response?.data?.message || 
                      'Error al iniciar sesión'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  // 📌 Logout
  const logout = () => {
    logoutUser()
    setUser(null)
    setIsAuthenticated(false)
    setUserRole(null)
    setError(null)
  }

  // 📦 Valor del contexto
  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    error,
    isAuthenticated,
    userRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}