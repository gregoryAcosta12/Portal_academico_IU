import { apiClient as api } from './client';
import { USE_MOCK_AUTH } from './auth';

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const changePassword = async (
  data: ChangePasswordData
): Promise<ChangePasswordResponse> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 800));

    const stored = localStorage.getItem('user');
    const username = stored ? JSON.parse(stored).username : 'estudiante';

    const MOCK_CURRENT_PASSWORD = '123456';

    if (data.currentPassword !== MOCK_CURRENT_PASSWORD) {
      throw new Error('currentPasswordIncorrect');
    }

    if (data.currentPassword === data.newPassword) {
      throw new Error('passwordSameAsCurrent');
    }

    localStorage.setItem(`mock_password_${username}`, data.newPassword);

    return {
      success: true,
      message: 'passwordSuccess',
    };
  }

  const response = await api.post<ChangePasswordResponse>(
    '/Usuarios/cambiar-password',
    {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }
  );

  return response.data;
};