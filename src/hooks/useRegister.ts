// 📁 src/hooks/useRegister.ts
import { useState } from 'react';
import { registerUser } from '../api/auth';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await registerUser({
        username: data.username,
        password: data.password
      });
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Error al registrar usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};