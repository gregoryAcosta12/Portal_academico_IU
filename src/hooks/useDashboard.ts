// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { getDashboardStats, getCurrentUser } from '../api/dashboard';
import type { DashboardStats, UserInfo } from '../types/dashboard.types';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, userData] = await Promise.all([
          getDashboardStats(),
          getCurrentUser(),
        ]);
        setStats(statsData);
        setUser(userData);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, user, loading, error };
};