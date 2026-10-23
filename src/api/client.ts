// 📡 Configuración de Axios para tu backend .NET

import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://localhost:7145/api',  // ← Tu backend .NET
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
})

// 📌 Interceptor: Agrega el token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 📌 Interceptor: Maneja errores 401 (token expirado)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)