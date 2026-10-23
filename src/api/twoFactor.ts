import { USE_MOCK_AUTH } from './auth';

export interface TwoFactorStatus {
  enabled: boolean;
  secretKey?: string;
  qrCodeUrl?: string;
  backupCode?: string;
}

const MOCK_2FA_SECRET = 'JBSWY3DPEHPK3PXP';
const MOCK_2FA_BACKUP = 'ABCD-EFGH-IJKL-MNOP';
const MOCK_VALID_CODE = '123456';

/**
 * Obtiene el estado actual del 2FA del usuario.
 */
export const getTwoFactorStatus = async (): Promise<TwoFactorStatus> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 300));

    const stored = localStorage.getItem('user');
    const username = stored ? JSON.parse(stored).username : 'estudiante';
    const enabled = localStorage.getItem(`2fa_enabled_${username}`) === 'true';

    return {
      enabled,
      secretKey: enabled ? MOCK_2FA_SECRET : undefined,
      backupCode: enabled ? MOCK_2FA_BACKUP : undefined,
    };
  }

  const response = await fetch('/api/Usuarios/2fa/status');
  return response.json();
};

/**
 * Genera el secreto y QR para activar 2FA.
 */
export const generateTwoFactorSecret = async (): Promise<{
  secretKey: string;
  qrCodeUrl: string;
  backupCode: string;
}> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 400));

    return {
      secretKey: MOCK_2FA_SECRET,
      qrCodeUrl: `otpauth://totp/PortalAcademico?secret=${MOCK_2FA_SECRET}&issuer=PortalAcademico`,
      backupCode: MOCK_2FA_BACKUP,
    };
  }

  const response = await fetch('/api/Usuarios/2fa/generate', {
    method: 'POST',
  });
  return response.json();
};

/**
 * Verifica el código de 6 dígitos y activa el 2FA si es correcto.
 */
export const enableTwoFactor = async (code: string): Promise<{ success: boolean }> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 600));

    if (code !== MOCK_VALID_CODE) {
      throw new Error('invalidCode');
    }

    const stored = localStorage.getItem('user');
    const username = stored ? JSON.parse(stored).username : 'estudiante';
    localStorage.setItem(`2fa_enabled_${username}`, 'true');
    localStorage.setItem(`2fa_secret_${username}`, MOCK_2FA_SECRET);

    return { success: true };
  }

  const response = await fetch('/api/Usuarios/2fa/enable', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return response.json();
};

/**
 * Desactiva el 2FA del usuario.
 */
export const disableTwoFactor = async (): Promise<{ success: boolean }> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 500));

    const stored = localStorage.getItem('user');
    const username = stored ? JSON.parse(stored).username : 'estudiante';
    localStorage.removeItem(`2fa_enabled_${username}`);
    localStorage.removeItem(`2fa_secret_${username}`);

    return { success: true };
  }

  const response = await fetch('/api/Usuarios/2fa/disable', {
    method: 'POST',
  });
  return response.json();
};

/**
 * Verifica el código durante el login.
 */
export const verifyTwoFactorCode = async (username: string, code: string): Promise<boolean> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 500));

    const enabled = localStorage.getItem(`2fa_enabled_${username}`) === 'true';
    if (!enabled) return true;

    if (code !== MOCK_VALID_CODE) {
      throw new Error('invalidCode');
    }
    return true;
  }

  const response = await fetch('/api/Auth/2fa/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, code }),
  });
  return response.ok;
};