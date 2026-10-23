import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import EstudiantesPage from './pages/EstudiantesPage';
import MateriasPage from './pages/MateriasPage';
import InscripcionPage from './pages/InscripcionPage';
import CalificacionesPage from './pages/CalificacionesPage';
import ActividadesPage from './pages/ActividadesPage'; 

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/configuracion" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

              <Route path="/estudiantes" element={<ProtectedRoute><EstudiantesPage /></ProtectedRoute>} />
              <Route path="/materias" element={<ProtectedRoute><MateriasPage /></ProtectedRoute>} />
              <Route path="/inscripciones/nueva" element={<ProtectedRoute><InscripcionPage /></ProtectedRoute>} />
              <Route path="/calificaciones" element={<ProtectedRoute><CalificacionesPage /></ProtectedRoute>} />

              <Route path="/actividades" element={<ProtectedRoute><ActividadesPage /></ProtectedRoute>} />

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;