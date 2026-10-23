export type Language = 'es' | 'en' | 'pt';

export interface TranslationKeys {
  common: {
    save: string;
    cancel: string;
    delete: string;
    confirm: string;
    back: string;
    loading: string;
    search: string;
    close: string;
    edit: string;
  };
  nav: {
    dashboard: string;
    profile: string;
    settings: string;
    logout: string;
  };
  settings: {
    title: string;
    subtitle: string;
    appearance: string;
    appearanceDesc: string;
    light: string;
    lightDesc: string;
    dark: string;
    darkDesc: string;
    system: string;
    systemDesc: string;
    currentlyActive: string;
    lightMode: string;
    darkMode: string;
    notifications: string;
    notificationsDesc: string;
    emails: string;
    emailsDesc: string;
    push: string;
    pushDesc: string;
    sounds: string;
    soundsDesc: string;
    language: string;
    languageDesc: string;
    security: string;
    securityDesc: string;
    changePassword: string;
    changePasswordDesc: string;
    twoFactor: string;
    twoFactorDesc: string;
    dangerZone: string;
    dangerZoneDesc: string;
    deleteAccount: string;
    deleteAccountDesc: string;
    areYouSure: string;
    deleteWarning: string;
    yesDelete: string;
    comingSoon: string;
    saved: string;
    changePasswordTitle: string;
    changePasswordSubtitle: string;
    currentPassword: string;
    currentPasswordPlaceholder: string;
    newPassword: string;
    newPasswordPlaceholder: string;
    confirmNewPassword: string;
    confirmNewPasswordPlaceholder: string;
    passwordRequirements: string;
    passwordReqLength: string;
    passwordReqUpper: string;
    passwordReqLower: string;
    passwordReqNumber: string;
    passwordMismatch: string;
    passwordSuccess: string;
    passwordError: string;
    passwordSaving: string;
    currentPasswordIncorrect: string;
    passwordSameAsCurrent: string;
    showPassword: string;
    hidePassword: string;
    twoFactorTitle: string;
    twoFactorSubtitle: string;
    twoFactorEnable: string;
    twoFactorDisable: string;
    twoFactorEnabled: string;
    twoFactorDisabled: string;
    twoFactorStep1: string;
    twoFactorStep1Desc: string;
    twoFactorStep2: string;
    twoFactorStep2Desc: string;
    twoFactorScanQr: string;
    twoFactorSecretKey: string;
    twoFactorEnterCode: string;
    twoFactorCodePlaceholder: string;
    twoFactorVerify: string;
    twoFactorVerifying: string;
    twoFactorInvalidCode: string;
    twoFactorSuccessEnabled: string;
    twoFactorSuccessDisabled: string;
    twoFactorWarning: string;
    twoFactorWarningDesc: string;
    twoFactorUseAuthenticator: string;
    twoFactorDone: string;
    deleteAccountTitle: string;
    deleteAccountSubtitle: string;
    deleteAccountWarning: string;
    deleteAccountWarningDesc: string;
    deleteAccountConfirmLabel: string;
    deleteAccountConfirmPlaceholder: string;
    deleteAccountConfirmError: string;
    deleteAccountDeleting: string;
    deleteAccountSuccess: string;
    deleteAccountBack: string;
    deleteAccountCancel: string;
    deleteAccountConfirm: string;
  };
  dashboard: {
    welcome: string;
    welcomeBack: string;
    online: string;
    admin: string;
    teacher: string;
    student: string;
    summary: string;
    summaryDesc: string;
    viewReports: string;
    quickActions: string;
    quickActionsDesc: string;
    recentActivity: string;
    recentActivityDesc: string;
    live: string;
    viewAllActivity: string;
    activity1Title: string;
    activity1Desc: string;
    activity1Time: string;
    activity2Title: string;
    activity2Desc: string;
    activity2Time: string;
    activity3Title: string;
    activity3Desc: string;
    activity3Time: string;
    activity4Title: string;
    activity4Desc: string;
    activity4Time: string;
    activity5Title: string;
    activity5Desc: string;
    activity5Time: string;
    students: string;
    teachers: string;
    subjects: string;
    careers: string;
    faculties: string;
    enrollments: string;
     reportsTitle: string;
    reportsSubtitle: string;
    reportsPeriod: string;
    reportsToday: string;
    reportsWeek: string;
    reportsMonth: string;
    reportsYear: string;
    reportsTotalStudents: string;
    reportsTotalTeachers: string;
    reportsAvgGrade: string;
    reportsEnrollmentRate: string;
    reportsDistribution: string;
    reportsTrends: string;
    reportsTopCareers: string;
    reportsExport: string;
    reportsExportCsv: string;
    reportsExportPdf: string;
    reportsDownloading: string;
    reportsDownloaded: string;
    reportsNoData: string;
    reportsLoading: string;
  };
  profile: {
    title: string;
    editProfile: string;
    personalInfo: string;
    personalInfoDesc: string;
    academicInfo: string;
    professionalInfo: string;
    adminInfo: string;
    achievements: string;
    skills: string;
    performance: string;
    backToDashboard: string;
  };
  login: {
    title: string;
    subtitle: string;
    username: string;
    password: string;
    rememberMe: string;
    forgotPassword: string;
    signIn: string;
    firstTime: string;
    createAccount: string;
    testUsers: string;
    student: string;
    teacher: string;
    admin: string;
    user: string;
    pass: string;
    usernameError: string;
    usernamePlaceholder: string;
    portalTitle: string;
    portalSubtitle: string;
    heroLine1: string;
    heroLine2: string;
    heroDesc: string;
    feature1: string;
    feature2: string;
    feature3: string;
    secureSystem: string;
    encryptedData: string;
    available247: string;
    twoFactorRequired: string;
    twoFactorSubtitle: string;
    twoFactorCode: string;
    twoFactorVerify: string;
    twoFactorVerifying: string;
    twoFactorBack: string;
    twoFactorInvalid: string;
  };
  roles: {
    ADMIN: string;
    PROFESOR: string;
    ESTUDIANTE: string;
  };
}

export const translations: Record<Language, TranslationKeys> = {
  es: {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      confirm: 'Confirmar',
      back: 'Volver',
      loading: 'Cargando...',
      search: 'Buscar',
      close: 'Cerrar',
      edit: 'Editar',
    },
    nav: {
      dashboard: 'Dashboard',
      profile: 'Mi perfil',
      settings: 'Configuración',
      logout: 'Cerrar sesión',
    },
    settings: {
      title: 'Configuración',
      subtitle: 'Personaliza tu experiencia en la plataforma',
      appearance: 'Apariencia',
      appearanceDesc: 'Elige cómo se ve la plataforma',
      light: 'Claro',
      lightDesc: 'Siempre modo claro',
      dark: 'Oscuro',
      darkDesc: 'Siempre modo oscuro',
      system: 'Sistema',
      systemDesc: 'Sigue tu dispositivo',
      currentlyActive: 'Actualmente activo:',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Oscuro',
      notifications: 'Notificaciones',
      notificationsDesc: 'Controla cómo te avisamos',
      emails: 'Correos electrónicos',
      emailsDesc: 'Recibe resúmenes por correo',
      push: 'Push del navegador',
      pushDesc: 'Notificaciones en tiempo real',
      sounds: 'Sonidos',
      soundsDesc: 'Reproducir sonido en alertas',
      language: 'Idioma y región',
      languageDesc: 'Elige tu idioma preferido',
      security: 'Seguridad',
      securityDesc: 'Protege tu cuenta',
      changePassword: 'Cambiar contraseña',
      changePasswordDesc: 'Última actualización hace 3 meses',
      twoFactor: 'Autenticación en dos pasos',
      twoFactorDesc: 'Añade una capa extra de seguridad',
      dangerZone: 'Zona peligrosa',
      dangerZoneDesc: 'Acciones irreversibles',
      deleteAccount: 'Eliminar cuenta',
      deleteAccountDesc: 'Esta acción no se puede deshacer',
      areYouSure: '¿Estás seguro?',
      deleteWarning: 'Perderás acceso a todos tus datos permanentemente.',
      yesDelete: 'Sí, eliminar',
      comingSoon: 'Función próximamente disponible',
      saved: 'Guardado',
      changePasswordTitle: 'Cambiar contraseña',
      changePasswordSubtitle: 'Ingresa tu contraseña actual y la nueva',
      currentPassword: 'Contraseña actual',
      currentPasswordPlaceholder: 'Tu contraseña actual',
      newPassword: 'Nueva contraseña',
      newPasswordPlaceholder: 'Tu nueva contraseña',
      confirmNewPassword: 'Confirmar nueva contraseña',
      confirmNewPasswordPlaceholder: 'Repite la nueva contraseña',
      passwordRequirements: 'Requisitos de seguridad',
      passwordReqLength: 'Mínimo 8 caracteres',
      passwordReqUpper: 'Al menos una mayúscula',
      passwordReqLower: 'Al menos una minúscula',
      passwordReqNumber: 'Al menos un número',
      passwordMismatch: 'Las contraseñas no coinciden',
      passwordSuccess: '¡Contraseña actualizada correctamente!',
      passwordError: 'Error al cambiar la contraseña',
      passwordSaving: 'Guardando...',
      currentPasswordIncorrect: 'La contraseña actual es incorrecta',
      passwordSameAsCurrent: 'La nueva contraseña no puede ser igual a la actual',
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña',
      twoFactorTitle: 'Autenticación en dos pasos',
      twoFactorSubtitle: 'Añade una capa extra de seguridad a tu cuenta',
      twoFactorEnable: 'Activar 2FA',
      twoFactorDisable: 'Desactivar 2FA',
      twoFactorEnabled: '2FA Activado',
      twoFactorDisabled: '2FA Desactivado',
      twoFactorStep1: 'Paso 1: Escanea el código QR',
      twoFactorStep1Desc: 'Usa Google Authenticator, Authy o cualquier app de autenticación',
      twoFactorStep2: 'Paso 2: Ingresa el código de 6 dígitos',
      twoFactorStep2Desc: 'Introduce el código que aparece en tu app',
      twoFactorScanQr: 'Escanea este código QR',
      twoFactorSecretKey: 'O ingresa esta clave manualmente',
      twoFactorEnterCode: 'Código de verificación',
      twoFactorCodePlaceholder: '000000',
      twoFactorVerify: 'Verificar',
      twoFactorVerifying: 'Verificando...',
      twoFactorInvalidCode: 'Código inválido. Intenta de nuevo.',
      twoFactorSuccessEnabled: '¡2FA activado correctamente!',
      twoFactorSuccessDisabled: '2FA desactivado',
      twoFactorWarning: 'Guarda tu código de respaldo',
      twoFactorWarningDesc: 'Si pierdes acceso a tu app, no podrás iniciar sesión.',
      twoFactorUseAuthenticator: 'Usa una app de autenticación',
      twoFactorDone: 'Listo',
      deleteAccountTitle: 'Eliminar cuenta',
      deleteAccountSubtitle: 'Esta acción es permanente e irreversible',
      deleteAccountWarning: '¿Estás seguro de eliminar tu cuenta?',
      deleteAccountWarningDesc: 'Perderás acceso a todos tus datos: calificaciones, historial académico, materiales y cualquier información asociada. Esta acción NO se puede deshacer.',
      deleteAccountConfirmLabel: 'Escribe "ELIMINAR" para confirmar',
      deleteAccountConfirmPlaceholder: 'ELIMINAR',
      deleteAccountConfirmError: 'Debes escribir "ELIMINAR" exactamente para confirmar',
      deleteAccountDeleting: 'Eliminando...',
      deleteAccountSuccess: 'Cuenta eliminada correctamente',
      deleteAccountBack: 'Volver',
      deleteAccountCancel: 'Cancelar',
      deleteAccountConfirm: 'Eliminar mi cuenta',
    },
    dashboard: {
      welcome: '¡Bienvenido',
      welcomeBack: 'Bienvenido de vuelta',
      online: 'En línea',
      admin: 'Administrador',
      teacher: 'Profesor',
      student: 'Estudiante',
      summary: 'Resumen general',
      summaryDesc: 'Estadísticas actualizadas del sistema',
      viewReports: 'Ver reportes',
      quickActions: 'Accesos Rápidos',
      quickActionsDesc: 'Atajos a las funciones más usadas',
      recentActivity: 'Actividad reciente',
      recentActivityDesc: 'Últimos movimientos del sistema',
      live: 'En vivo',
      viewAllActivity: 'Ver toda la actividad',
      activity1Title: 'Nuevo estudiante registrado',
      activity1Desc: 'Juan Pérez se inscribió en Ing. Sistemas',
      activity1Time: 'Hace 5 min',
      activity2Title: 'Calificaciones publicadas',
      activity2Desc: 'Dr. López subió notas de Cálculo II',
      activity2Time: 'Hace 22 min',
      activity3Title: 'Profesor asignado',
      activity3Desc: 'Mtra. García asignada a Física I',
      activity3Time: 'Hace 1 h',
      activity4Title: 'Nueva materia creada',
      activity4Desc: 'Se añadió "IA Aplicada" al catálogo',
      activity4Time: 'Hace 2 h',
      activity5Title: 'Inscripción aprobada',
      activity5Desc: 'María Ruiz aceptada en Medicina',
      activity5Time: 'Hace 3 h',
      students: 'Estudiantes',
      teachers: 'Profesores',
      subjects: 'Materias',
      careers: 'Carreras',
      faculties: 'Facultades',
      enrollments: 'Inscripciones',
            reportsTitle: 'Reportes y análisis',
      reportsSubtitle: 'Visualiza el rendimiento del sistema',
      reportsPeriod: 'Período',
      reportsToday: 'Hoy',
      reportsWeek: 'Última semana',
      reportsMonth: 'Último mes',
      reportsYear: 'Último año',
      reportsTotalStudents: 'Total estudiantes',
      reportsTotalTeachers: 'Total profesores',
      reportsAvgGrade: 'Promedio general',
      reportsEnrollmentRate: 'Tasa de inscripción',
      reportsDistribution: 'Distribución por facultad',
      reportsTrends: 'Tendencia de inscripciones',
      reportsTopCareers: 'Top carreras',
      reportsExport: 'Exportar',
      reportsExportCsv: 'Exportar CSV',
      reportsExportPdf: 'Exportar PDF',
      reportsDownloading: 'Descargando...',
      reportsDownloaded: '¡Descarga completada!',
      reportsNoData: 'No hay datos para este período',
      reportsLoading: 'Cargando reportes...',
      
    },
    profile: {
      title: 'Mi perfil',
      editProfile: 'Editar perfil',
      personalInfo: 'Información personal',
      personalInfoDesc: 'Datos de contacto y cuenta',
      academicInfo: 'Información académica',
      professionalInfo: 'Información profesional',
      adminInfo: 'Información administrativa',
      achievements: 'Logros desbloqueados',
      skills: 'Competencias',
      performance: 'Evolución del promedio',
      backToDashboard: 'Volver al dashboard',
    },
    login: {
      title: 'Bienvenido de vuelta',
      subtitle: 'Ingresa tu nombre de usuario y contraseña',
      username: 'Nombre de Usuario',
      password: 'Contraseña',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      signIn: 'Iniciar Sesión',
      firstTime: '¿Primera vez en el sistema?',
      createAccount: 'Crear nueva cuenta',
      testUsers: 'Usuarios de prueba disponibles',
      student: 'Estudiante',
      teacher: 'Profesor',
      admin: 'Admin',
      user: 'user',
      pass: 'pass',
      usernameError: 'El usuario debe tener al menos 3 caracteres',
      usernamePlaceholder: 'ejemplo_usuario',
      portalTitle: 'Portal Académico',
      portalSubtitle: 'Sistema de Gestión Universitaria',
      heroLine1: 'Bienvenido a tu',
      heroLine2: 'plataforma educativa',
      heroDesc:
        'Accede a tus cursos, calificaciones y recursos académicos desde un solo lugar.',
      feature1: 'Gestión de cursos y materias',
      feature2: 'Calificaciones en tiempo real',
      feature3: 'Comunicación con profesores',
      secureSystem: 'Sistema seguro',
      encryptedData: '🔒 Datos encriptados',
      available247: '⚡ 24/7 Disponible',
      twoFactorRequired: 'Verificación en dos pasos',
      twoFactorSubtitle: 'Ingresa el código de 6 dígitos de tu app',
      twoFactorCode: 'Código de 6 dígitos',
      twoFactorVerify: 'Verificar',
      twoFactorVerifying: 'Verificando...',
      twoFactorBack: 'Volver',
      twoFactorInvalid: 'Código incorrecto. Intenta de nuevo.',
    },
    roles: {
      ADMIN: 'Administrador',
      PROFESOR: 'Profesor',
      ESTUDIANTE: 'Estudiante',
    },
  },
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      confirm: 'Confirm',
      back: 'Back',
      loading: 'Loading...',
      search: 'Search',
      close: 'Close',
      edit: 'Edit',
    },
    nav: {
      dashboard: 'Dashboard',
      profile: 'My profile',
      settings: 'Settings',
      logout: 'Log out',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Customize your experience on the platform',
      appearance: 'Appearance',
      appearanceDesc: 'Choose how the platform looks',
      light: 'Light',
      lightDesc: 'Always light mode',
      dark: 'Dark',
      darkDesc: 'Always dark mode',
      system: 'System',
      systemDesc: 'Follows your device',
      currentlyActive: 'Currently active:',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      notifications: 'Notifications',
      notificationsDesc: 'Control how we notify you',
      emails: 'Emails',
      emailsDesc: 'Receive summaries by email',
      push: 'Browser push',
      pushDesc: 'Real-time notifications',
      sounds: 'Sounds',
      soundsDesc: 'Play sound on alerts',
      language: 'Language and region',
      languageDesc: 'Choose your preferred language',
      security: 'Security',
      securityDesc: 'Protect your account',
      changePassword: 'Change password',
      changePasswordDesc: 'Last updated 3 months ago',
      twoFactor: 'Two-factor authentication',
      twoFactorDesc: 'Add an extra layer of security',
      dangerZone: 'Danger zone',
      dangerZoneDesc: 'Irreversible actions',
      deleteAccount: 'Delete account',
      deleteAccountDesc: 'This action cannot be undone',
      areYouSure: 'Are you sure?',
      deleteWarning: 'You will permanently lose access to all your data.',
      yesDelete: 'Yes, delete',
      comingSoon: 'Feature coming soon',
      saved: 'Saved',
      changePasswordTitle: 'Change password',
      changePasswordSubtitle: 'Enter your current and new password',
      currentPassword: 'Current password',
      currentPasswordPlaceholder: 'Your current password',
      newPassword: 'New password',
      newPasswordPlaceholder: 'Your new password',
      confirmNewPassword: 'Confirm new password',
      confirmNewPasswordPlaceholder: 'Repeat the new password',
      passwordRequirements: 'Security requirements',
      passwordReqLength: 'Minimum 8 characters',
      passwordReqUpper: 'At least one uppercase letter',
      passwordReqLower: 'At least one lowercase letter',
      passwordReqNumber: 'At least one number',
      passwordMismatch: 'Passwords do not match',
      passwordSuccess: 'Password updated successfully!',
      passwordError: 'Error changing password',
      passwordSaving: 'Saving...',
      currentPasswordIncorrect: 'Current password is incorrect',
      passwordSameAsCurrent: 'New password cannot be the same as the current one',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      twoFactorTitle: 'Two-factor authentication',
      twoFactorSubtitle: 'Add an extra layer of security to your account',
      twoFactorEnable: 'Enable 2FA',
      twoFactorDisable: 'Disable 2FA',
      twoFactorEnabled: '2FA Enabled',
      twoFactorDisabled: '2FA Disabled',
      twoFactorStep1: 'Step 1: Scan the QR code',
      twoFactorStep1Desc: 'Use Google Authenticator, Authy or any authenticator app',
      twoFactorStep2: 'Step 2: Enter the 6-digit code',
      twoFactorStep2Desc: 'Enter the code shown in your app',
      twoFactorScanQr: 'Scan this QR code',
      twoFactorSecretKey: 'Or enter this key manually',
      twoFactorEnterCode: 'Verification code',
      twoFactorCodePlaceholder: '000000',
      twoFactorVerify: 'Verify',
      twoFactorVerifying: 'Verifying...',
      twoFactorInvalidCode: 'Invalid code. Try again.',
      twoFactorSuccessEnabled: '2FA enabled successfully!',
      twoFactorSuccessDisabled: '2FA disabled',
      twoFactorWarning: 'Save your backup code',
      twoFactorWarningDesc: "If you lose access to your app, you won't be able to log in.",
      twoFactorUseAuthenticator: 'Use an authenticator app',
      twoFactorDone: 'Done',
      deleteAccountTitle: 'Delete account',
      deleteAccountSubtitle: 'This action is permanent and irreversible',
      deleteAccountWarning: 'Are you sure you want to delete your account?',
      deleteAccountWarningDesc: 'You will lose access to all your data: grades, academic history, materials and any associated information. This action CANNOT be undone.',
      deleteAccountConfirmLabel: 'Type "DELETE" to confirm',
      deleteAccountConfirmPlaceholder: 'DELETE',
      deleteAccountConfirmError: 'You must type "DELETE" exactly to confirm',
      deleteAccountDeleting: 'Deleting...',
      deleteAccountSuccess: 'Account deleted successfully',
      deleteAccountBack: 'Back',
      deleteAccountCancel: 'Cancel',
      deleteAccountConfirm: 'Delete my account',
    },
    dashboard: {
      welcome: 'Welcome',
      welcomeBack: 'Welcome back',
      online: 'Online',
      admin: 'Administrator',
      teacher: 'Teacher',
      student: 'Student',
      summary: 'Overview',
      summaryDesc: 'System updated statistics',
      viewReports: 'View reports',
      quickActions: 'Quick Actions',
      quickActionsDesc: 'Shortcuts to the most used features',
      recentActivity: 'Recent activity',
      recentActivityDesc: 'Latest system movements',
      live: 'Live',
      viewAllActivity: 'View all activity',
      activity1Title: 'New student registered',
      activity1Desc: 'Juan Pérez enrolled in Systems Eng.',
      activity1Time: '5 min ago',
      activity2Title: 'Grades published',
      activity2Desc: 'Dr. López uploaded Calculus II grades',
      activity2Time: '22 min ago',
      activity3Title: 'Teacher assigned',
      activity3Desc: 'Mtra. García assigned to Physics I',
      activity3Time: '1 h ago',
      activity4Title: 'New subject created',
      activity4Desc: '"Applied AI" was added to the catalog',
      activity4Time: '2 h ago',
      activity5Title: 'Enrollment approved',
      activity5Desc: 'María Ruiz accepted in Medicine',
      activity5Time: '3 h ago',
      students: 'Students',
      teachers: 'Teachers',
      subjects: 'Subjects',
      careers: 'Careers',
      faculties: 'Faculties',
      enrollments: 'Enrollments',
            reportsTitle: 'Reports & analytics',
      reportsSubtitle: 'View system performance',
      reportsPeriod: 'Period',
      reportsToday: 'Today',
      reportsWeek: 'Last week',
      reportsMonth: 'Last month',
      reportsYear: 'Last year',
      reportsTotalStudents: 'Total students',
      reportsTotalTeachers: 'Total teachers',
      reportsAvgGrade: 'Average grade',
      reportsEnrollmentRate: 'Enrollment rate',
      reportsDistribution: 'Distribution by faculty',
      reportsTrends: 'Enrollment trends',
      reportsTopCareers: 'Top careers',
      reportsExport: 'Export',
      reportsExportCsv: 'Export CSV',
      reportsExportPdf: 'Export PDF',
      reportsDownloading: 'Downloading...',
      reportsDownloaded: 'Download complete!',
      reportsNoData: 'No data for this period',
      reportsLoading: 'Loading reports...',
    },
    profile: {
      title: 'My profile',
      editProfile: 'Edit profile',
      personalInfo: 'Personal information',
      personalInfoDesc: 'Contact and account data',
      academicInfo: 'Academic information',
      professionalInfo: 'Professional information',
      adminInfo: 'Administrative information',
      achievements: 'Unlocked achievements',
      skills: 'Skills',
      performance: 'Average evolution',
      backToDashboard: 'Back to dashboard',
    },
    login: {
      title: 'Welcome back',
      subtitle: 'Enter your username and password',
      username: 'Username',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      signIn: 'Sign In',
      firstTime: 'First time here?',
      createAccount: 'Create new account',
      testUsers: 'Test users available',
      student: 'Student',
      teacher: 'Teacher',
      admin: 'Admin',
      user: 'user',
      pass: 'pass',
      usernameError: 'Username must be at least 3 characters',
      usernamePlaceholder: 'example_user',
      portalTitle: 'Academic Portal',
      portalSubtitle: 'University Management System',
      heroLine1: 'Welcome to your',
      heroLine2: 'educational platform',
      heroDesc:
        'Access your courses, grades and academic resources from a single place.',
      feature1: 'Course and subject management',
      feature2: 'Real-time grades',
      feature3: 'Communication with teachers',
      secureSystem: 'Secure system',
      encryptedData: '🔒 Encrypted data',
      available247: '⚡ 24/7 Available',
      twoFactorRequired: 'Two-factor verification',
      twoFactorSubtitle: 'Enter the 6-digit code from your app',
      twoFactorCode: '6-digit code',
      twoFactorVerify: 'Verify',
      twoFactorVerifying: 'Verifying...',
      twoFactorBack: 'Back',
      twoFactorInvalid: 'Incorrect code. Try again.',
    },
    roles: {
      ADMIN: 'Administrator',
      PROFESOR: 'Teacher',
      ESTUDIANTE: 'Student',
    },
  },
  pt: {
    common: {
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Excluir',
      confirm: 'Confirmar',
      back: 'Voltar',
      loading: 'Carregando...',
      search: 'Buscar',
      close: 'Fechar',
      edit: 'Editar',
    },
    nav: {
      dashboard: 'Painel',
      profile: 'Meu perfil',
      settings: 'Configurações',
      logout: 'Sair',
    },
    settings: {
      title: 'Configurações',
      subtitle: 'Personalize sua experiência na plataforma',
      appearance: 'Aparência',
      appearanceDesc: 'Escolha como a plataforma aparece',
      light: 'Claro',
      lightDesc: 'Sempre modo claro',
      dark: 'Escuro',
      darkDesc: 'Sempre modo escuro',
      system: 'Sistema',
      systemDesc: 'Segue seu dispositivo',
      currentlyActive: 'Atualmente ativo:',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Escuro',
      notifications: 'Notificações',
      notificationsDesc: 'Controle como avisamos você',
      emails: 'E-mails',
      emailsDesc: 'Receba resumos por e-mail',
      push: 'Push do navegador',
      pushDesc: 'Notificações em tempo real',
      sounds: 'Sons',
      soundsDesc: 'Reproduzir som em alertas',
      language: 'Idioma e região',
      languageDesc: 'Escolha seu idioma preferido',
      security: 'Segurança',
      securityDesc: 'Proteja sua conta',
      changePassword: 'Alterar senha',
      changePasswordDesc: 'Última atualização há 3 meses',
      twoFactor: 'Autenticação em duas etapas',
      twoFactorDesc: 'Adicione uma camada extra de segurança',
      dangerZone: 'Zona de perigo',
      dangerZoneDesc: 'Ações irreversíveis',
      deleteAccount: 'Excluir conta',
      deleteAccountDesc: 'Esta ação não pode ser desfeita',
      areYouSure: 'Tem certeza?',
      deleteWarning:
        'Você perderá permanentemente o acesso a todos os seus dados.',
      yesDelete: 'Sim, excluir',
      comingSoon: 'Recurso em breve',
      saved: 'Salvo',
      changePasswordTitle: 'Alterar senha',
      changePasswordSubtitle: 'Digite sua senha atual e a nova',
      currentPassword: 'Senha atual',
      currentPasswordPlaceholder: 'Sua senha atual',
      newPassword: 'Nova senha',
      newPasswordPlaceholder: 'Sua nova senha',
      confirmNewPassword: 'Confirmar nova senha',
      confirmNewPasswordPlaceholder: 'Repita a nova senha',
      passwordRequirements: 'Requisitos de segurança',
      passwordReqLength: 'Mínimo 8 caracteres',
      passwordReqUpper: 'Pelo menos uma letra maiúscula',
      passwordReqLower: 'Pelo menos uma letra minúscula',
      passwordReqNumber: 'Pelo menos um número',
      passwordMismatch: 'As senhas não coincidem',
      passwordSuccess: 'Senha atualizada com sucesso!',
      passwordError: 'Erro ao alterar a senha',
      passwordSaving: 'Salvando...',
      currentPasswordIncorrect: 'A senha atual está incorreta',
      passwordSameAsCurrent: 'A nova senha não pode ser igual à atual',
      showPassword: 'Mostrar senha',
      hidePassword: 'Ocultar senha',
      twoFactorTitle: 'Autenticação em duas etapas',
      twoFactorSubtitle: 'Adicione uma camada extra de segurança à sua conta',
      twoFactorEnable: 'Ativar 2FA',
      twoFactorDisable: 'Desativar 2FA',
      twoFactorEnabled: '2FA Ativado',
      twoFactorDisabled: '2FA Desativado',
      twoFactorStep1: 'Passo 1: Escaneie o código QR',
      twoFactorStep1Desc: 'Use Google Authenticator, Authy ou qualquer app de autenticação',
      twoFactorStep2: 'Passo 2: Digite o código de 6 dígitos',
      twoFactorStep2Desc: 'Digite o código que aparece no seu app',
      twoFactorScanQr: 'Escaneie este código QR',
      twoFactorSecretKey: 'Ou digite esta chave manualmente',
      twoFactorEnterCode: 'Código de verificação',
      twoFactorCodePlaceholder: '000000',
      twoFactorVerify: 'Verificar',
      twoFactorVerifying: 'Verificando...',
      twoFactorInvalidCode: 'Código inválido. Tente novamente.',
      twoFactorSuccessEnabled: '2FA ativado com sucesso!',
      twoFactorSuccessDisabled: '2FA desativado',
      twoFactorWarning: 'Salve seu código de backup',
      twoFactorWarningDesc: 'Se perder acesso ao seu app, não conseguirá fazer login.',
      twoFactorUseAuthenticator: 'Use um app de autenticação',
      twoFactorDone: 'Pronto',
      deleteAccountTitle: 'Excluir conta',
      deleteAccountSubtitle: 'Esta ação é permanente e irreversível',
      deleteAccountWarning: 'Tem certeza de que deseja excluir sua conta?',
      deleteAccountWarningDesc: 'Você perderá o acesso a todos os seus dados: notas, histórico acadêmico, materiais e qualquer informação associada. Esta ação NÃO pode ser desfeita.',
      deleteAccountConfirmLabel: 'Digite "EXCLUIR" para confirmar',
      deleteAccountConfirmPlaceholder: 'EXCLUIR',
      deleteAccountConfirmError: 'Você deve digitar "EXCLUIR" exatamente para confirmar',
      deleteAccountDeleting: 'Excluindo...',
      deleteAccountSuccess: 'Conta excluída com sucesso',
      deleteAccountBack: 'Voltar',
      deleteAccountCancel: 'Cancelar',
      deleteAccountConfirm: 'Excluir minha conta',
    },
    dashboard: {
      welcome: 'Bem-vindo',
      welcomeBack: 'Bem-vindo de volta',
      online: 'Online',
      admin: 'Administrador',
      teacher: 'Professor',
      student: 'Estudante',
      summary: 'Visão geral',
      summaryDesc: 'Estatísticas atualizadas do sistema',
      viewReports: 'Ver relatórios',
      quickActions: 'Ações Rápidas',
      quickActionsDesc: 'Atalhos para as funções mais usadas',
      recentActivity: 'Atividade recente',
      recentActivityDesc: 'Últimos movimentos do sistema',
      live: 'Ao vivo',
      viewAllActivity: 'Ver toda a atividade',
      activity1Title: 'Novo estudante registrado',
      activity1Desc: 'Juan Pérez se inscreveu em Eng. de Sistemas',
      activity1Time: 'Há 5 min',
      activity2Title: 'Notas publicadas',
      activity2Desc: 'Dr. López enviou notas de Cálculo II',
      activity2Time: 'Há 22 min',
      activity3Title: 'Professor atribuído',
      activity3Desc: 'Mtra. García atribuída a Física I',
      activity3Time: 'Há 1 h',
      activity4Title: 'Nova matéria criada',
      activity4Desc: '"IA Aplicada" foi adicionada ao catálogo',
      activity4Time: 'Há 2 h',
      activity5Title: 'Inscrição aprovada',
      activity5Desc: 'María Ruiz aceita em Medicina',
      activity5Time: 'Há 3 h',
      students: 'Estudantes',
      teachers: 'Professores',
      subjects: 'Matérias',
      careers: 'Cursos',
      faculties: 'Faculdades',
      enrollments: 'Inscrições',
            reportsTitle: 'Relatórios e análises',
      reportsSubtitle: 'Visualize o desempenho do sistema',
      reportsPeriod: 'Período',
      reportsToday: 'Hoje',
      reportsWeek: 'Última semana',
      reportsMonth: 'Último mês',
      reportsYear: 'Último ano',
      reportsTotalStudents: 'Total de estudantes',
      reportsTotalTeachers: 'Total de professores',
      reportsAvgGrade: 'Média geral',
      reportsEnrollmentRate: 'Taxa de inscrição',
      reportsDistribution: 'Distribuição por faculdade',
      reportsTrends: 'Tendência de inscrições',
      reportsTopCareers: 'Top cursos',
      reportsExport: 'Exportar',
      reportsExportCsv: 'Exportar CSV',
      reportsExportPdf: 'Exportar PDF',
      reportsDownloading: 'Baixando...',
      reportsDownloaded: 'Download concluído!',
      reportsNoData: 'Sem dados para este período',
      reportsLoading: 'Carregando relatórios...',
    },
    profile: {
      title: 'Meu perfil',
      editProfile: 'Editar perfil',
      personalInfo: 'Informações pessoais',
      personalInfoDesc: 'Dados de contato e conta',
      academicInfo: 'Informações acadêmicas',
      professionalInfo: 'Informações profissionais',
      adminInfo: 'Informações administrativas',
      achievements: 'Conquistas desbloqueadas',
      skills: 'Competências',
      performance: 'Evolução da média',
      backToDashboard: 'Voltar ao painel',
      
    },
    login: {
      title: 'Bem-vindo de volta',
      subtitle: 'Digite seu nome de usuário e senha',
      username: 'Nome de Usuário',
      password: 'Senha',
      rememberMe: 'Lembrar-me',
      forgotPassword: 'Esqueceu sua senha?',
      signIn: 'Entrar',
      firstTime: 'Primeira vez aqui?',
      createAccount: 'Criar nova conta',
      testUsers: 'Usuários de teste disponíveis',
      student: 'Estudante',
      teacher: 'Professor',
      admin: 'Admin',
      user: 'user',
      pass: 'pass',
      usernameError: 'O usuário deve ter pelo menos 3 caracteres',
      usernamePlaceholder: 'exemplo_usuario',
      portalTitle: 'Portal Acadêmico',
      portalSubtitle: 'Sistema de Gestão Universitária',
      heroLine1: 'Bem-vindo à sua',
      heroLine2: 'plataforma educacional',
      heroDesc:
        'Acesse seus cursos, notas e recursos acadêmicos de um só lugar.',
      feature1: 'Gestão de cursos e matérias',
      feature2: 'Notas em tempo real',
      feature3: 'Comunicação com professores',
      secureSystem: 'Sistema seguro',
      encryptedData: '🔒 Dados criptografados',
      available247: '⚡ 24/7 Disponível',
      twoFactorRequired: 'Verificação em duas etapas',
      twoFactorSubtitle: 'Digite o código de 6 dígitos do seu app',
      twoFactorCode: 'Código de 6 dígitos',
      twoFactorVerify: 'Verificar',
      twoFactorVerifying: 'Verificando...',
      twoFactorBack: 'Voltar',
      twoFactorInvalid: 'Código incorreto. Tente novamente.',
    },
    roles: {
      ADMIN: 'Administrador',
      PROFESOR: 'Professor',
      ESTUDIANTE: 'Estudante',
    },
  },
};