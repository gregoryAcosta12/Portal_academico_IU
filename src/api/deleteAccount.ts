import { apiClient as api } from './client';
import { USE_MOCK_AUTH } from './auth';

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
}

/**
 * Elimina la cuenta del usuario actual.
 *
 * Modo demo:
 *   - Simula delay de red
 *   - Limpia el localStorage asociado al usuario
 *   - Devuelve éxito
 *
 * Modo real:
 *   - POST /api/Usuarios/eliminar-cuenta
 *   - El backend elimina al usuario y sus datos
 */
export const deleteAccount = async (): Promise<DeleteAccountResponse> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 1200));

    const stored = localStorage.getItem('user');
    const username = stored ? JSON.parse(stored).username : 'estudiante';

    // Limpia datos del usuario demo
    localStorage.removeItem(`2fa_enabled_${username}`);
    localStorage.removeItem(`2fa_secret_${username}`);
    localStorage.removeItem(`mock_password_${username}`);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');

    return {
      success: true,
      message: 'deleteAccountSuccess',
    };
  }

  const response = await api.post<DeleteAccountResponse>(
    '/Usuarios/eliminar-cuenta'
  );

  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  localStorage.removeItem('rol');

  return response.data;
};