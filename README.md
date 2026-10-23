<div align="center">

# 🎓 Portal Académico - IU University

### 🚀 Plataforma de Gestión Universitaria (En Desarrollo)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[![Estado](https://img.shields.io/badge/Estado-En_Desarrollo-orange?style=for-the-badge&logo=statuspage&logoColor=white)]()

<br />

> ⚠️ **AVISO IMPORTANTE:** Este proyecto se encuentra actualmente **en fase de desarrollo**. Algunas funcionalidades son simuladas (Mock Data) y no están conectadas a un backend real todavía. Se recomienda usar los **Usuarios de Prueba** para explorar la plataforma.

</div>

---

## 📸 Capturas de Pantalla

| 🔐 Inicio de Sesión | 📊 Dashboard |
| :---: | :---: |
| *Diseño moderno con partículas animadas y modo oscuro.* | *Resumen general con gráficos dinámicos, accesos rápidos y actividad reciente.* |

| 👤 Perfil de Usuario | ⚙️ Configuración |
| :---: | :---: |
| *Información personal, académica y logros según el rol.* | *Gestión de tema (Claro/Oscuro), idioma (ES/EN/PT) y seguridad.* |

---

## ✨ Características Principales

### 🎨 Interfaz y Experiencia de Usuario (UI/UX)
- 🌓 **Modo Oscuro / Claro:** Transiciones suaves y persistencia en `localStorage`.
- 🌐 **Multi-idioma (i18n):** Soporte completo para Español, Inglés y Portugués.
- ✨ **Animaciones Fluidas:** Partículas de fondo interactivas, transiciones en CSS y micro-interacciones.
- 📱 **Diseño Responsive:** Adaptado para móviles, tablets y escritorio.
- 💎 **Glassmorphism:** Efectos de cristal esmerilado en tarjetas y modales.

### 🛡️ Seguridad y Autenticación
- 🔑 **Sistema de Login:** Validación en tiempo real y carga de usuarios demo.
- 🔒 **Cambio de Contraseña:** Modal con validación de requisitos de seguridad (8 caracteres, mayúscula, minúscula, número).
- 🛡️ **Autenticación 2FA (Simulada):** Configuración de dos pasos con código QR falso y verificación de código.
- 🗑️ **Eliminación de Cuenta:** Flujo de confirmación de doble paso.

### 🎓 Módulos Académicos (Simulados)
- 👨‍🎓 **Gestión de Estudiantes:** Tabla interactiva con buscador, filtros y CRUD completo.
- 📚 **Catálogo de Materias:** Gestión de créditos, cupos disponibles y profesores asignados.
- 📝 **Nueva Inscripción:** Wizard de 3 pasos con cálculo automático de créditos.
- 📊 **Calificaciones:** Historial académico, promedios y estados (Aprobado/Reprobado).
- 📈 **Reportes Dinámicos:** Gráficos de tendencias, distribución de facultades y exportación a CSV/PDF.

---

## 👥 Roles y Permisos

El sistema cuenta con un control de acceso basado en roles (RBAC). La interfaz se adapta dinámicamente según el usuario que inicie sesión:

| Rol | Descripción | Acceso Principal |
| :--- | :--- | :--- |
| 🛡️ **Admin** | Control total del sistema. | Gestión de estudiantes, materias, reportes globales y configuración. |
| 👨‍🏫 **Profesor** | Gestión docente. | Visualización de estudiantes, materias y reporte de calificaciones. |
| 👨‍🎓 **Estudiante** | Vista personal. | Mi Perfil, Mis Calificaciones, Mi Progreso, Mis Materias. |

---

## 🔐 Usuarios de Prueba (Modo Demo)

Para explorar la plataforma, no necesitas registrarte. Usa las siguientes credenciales en la pantalla de Login:

| Usuario | Contraseña | Rol | Notas |
| :--- | :--- | :--- | :--- |
| `admin` | `123456` | Administrador | Acceso completo a módulos de gestión. |
| `profesor` | `123456` | Profesor | Vista de gestión académica. |
| `estudiante` | `123456` | Estudiante | Vista de calificaciones y perfil personal. |

> 💡 *Tip: Los campos ya vienen prellenados con el usuario `estudiante` para que entres con un solo clic.*

---

## 🛠️ Stack Tecnológico

### Frontend
- ⚛️ **React 18** (Functional Components, Hooks, Context API)
- 🟦 **TypeScript** (Tipado estricto y modular)
- 🎨 **Tailwind CSS** (Utility-first, Dark Mode, Animaciones personalizadas)
- 🚦 **React Router DOM v6** (Navegación SPA)
- 📊 **Recharts** (Gráficos y visualización de datos)
- 🎭 **React Icons** (Librería de íconos vectoriales)
- 📝 **React Hook Form + Yup** (Validación de formularios)

### Estado Global (Context API)
- 🌓 **ThemeContext:** Manejo del tema claro/oscuro/sistema.
- 🌐 **LanguageContext:** Traducciones dinámicas (i18n).
- 🎭 **AuthContext:** Manejo de sesión y roles del usuario.

---
FOTOS:
<img width="1505" height="905" alt="image" src="https://github.com/user-attachments/assets/d2e9b86a-4a0f-4e84-b08b-59f7a72e7abc" />

<img width="1206" height="835" alt="image" src="https://github.com/user-attachments/assets/0639cef9-15da-467d-9b59-d9996408ae19" />

<img width="1502" height="857" alt="image" src="https://github.com/user-attachments/assets/cb9a0c85-cd4d-472b-a6a1-e7f5fd16e01f" />

<img width="1341" height="880" alt="image" src="https://github.com/user-attachments/assets/2c4c782e-d387-40cc-b6aa-b92d3dff0a17" />

<img width="1160" height="876" alt="image" src="https://github.com/user-attachments/assets/b758dedc-228d-46d5-936e-fd0049068f64" />

<img width="932" height="452" alt="image" src="https://github.com/user-attachments/assets/0d15477f-f3b6-4655-b458-218a6c03aa8e" />

<img width="937" height="817" alt="image" src="https://github.com/user-attachments/assets/bb2d256e-7dc5-4bb5-8d60-3dfbf6a1d5f4" />

<img width="1400" height="915" alt="image" src="https://github.com/user-attachments/assets/6ca25a3d-82b2-4ca6-b619-971e3deb4b90" />

<img width="1460" height="857" alt="image" src="https://github.com/user-attachments/assets/34366928-68f2-4eed-a739-bf78336a55d2" />

<img width="1431" height="850" alt="image" src="https://github.com/user-attachments/assets/a422766d-6741-45df-8bcf-d8e75fe11ad3" />

<img width="1457" height="916" alt="image" src="https://github.com/user-attachments/assets/05f83692-5644-489d-a376-87d056c0fa81" />

<img width="1311" height="816" alt="image" src="https://github.com/user-attachments/assets/e16a001d-3bcf-45b2-ac48-5c1abebffb90" />


## 📁 Estructura del Proyecto

```text
mi-frontend/
├── public/                  # Archivos estáticos
├── src/
│   ├── api/                 # Lógica de API (Mocks y configuración de Axios)
│   ├── components/          # Componentes reutilizables
│   │   ├── auth/            # Login, Register, AuthLayout
│   │   ├── dashboard/       # Gráficos, Stats, QuickActions, etc.
│   │   ├── estudiantes/     # Tablas y modales de estudiantes
│   │   ├── layout/          # Header, Sidebar
│   │   ├── profile/         # Componentes del perfil
│   │   ├── settings/        # Modales de Seguridad y Configuración
│   │   └── ui/              # Componentes base (Button, Input, Card, Modal)
│   ├── contexts/            # Contextos globales (Auth, Theme, Language)
│   ├── hooks/               # Custom Hooks (useAuth, useTheme, useLanguage)
│   ├── i18n/                # Archivos de traducción (ES/EN/PT)
│   ├── pages/               # Vistas principales
│   ├── types/               # Interfaces y tipos de TypeScript
│   └── index.css            # Estilos globales y animaciones
├── tailwind.config.js       # Configuración de Tailwind (o equivalente)
├── vite.config.ts           # Configuración de Vite
└── package.json
