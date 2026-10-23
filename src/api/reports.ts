import { USE_MOCK_AUTH } from './auth';
import { apiClient as api } from './client';

export type ReportPeriod = 'today' | 'week' | 'month' | 'year';

export interface ReportSummary {
  totalStudents: number;
  totalTeachers: number;
  avgGrade: number;
  enrollmentRate: number;
}

export interface FacultyDistribution {
  name: string;
  value: number;
  color: string;
}

export interface EnrollmentTrend {
  label: string;
  value: number;
}

export interface TopCareer {
  name: string;
  students: number;
  color: string;
}

export interface ReportData {
  summary: ReportSummary;
  distribution: FacultyDistribution[];
  trends: EnrollmentTrend[];
  topCareers: TopCareer[];
}

const mockDataByPeriod: Record<ReportPeriod, ReportData> = {
  today: {
    summary: {
      totalStudents: 128,
      totalTeachers: 24,
      avgGrade: 3.72,
      enrollmentRate: 92,
    },
    distribution: [
      { name: 'Ingeniería', value: 45, color: '#0ea5e9' },
      { name: 'Ciencias', value: 32, color: '#22c55e' },
      { name: 'Humanidades', value: 28, color: '#a855f7' },
      { name: 'Artes', value: 23, color: '#f59e0b' },
    ],
    trends: [
      { label: '08:00', value: 12 },
      { label: '10:00', value: 18 },
      { label: '12:00', value: 25 },
      { label: '14:00', value: 22 },
      { label: '16:00', value: 31 },
      { label: '18:00', value: 20 },
    ],
    topCareers: [
      { name: 'Ing. Sistemas', students: 32, color: '#0ea5e9' },
      { name: 'Medicina', students: 28, color: '#ef4444' },
      { name: 'Derecho', students: 21, color: '#a855f7' },
    ],
  },
  week: {
    summary: {
      totalStudents: 128,
      totalTeachers: 24,
      avgGrade: 3.68,
      enrollmentRate: 88,
    },
    distribution: [
      { name: 'Ingeniería', value: 420, color: '#0ea5e9' },
      { name: 'Ciencias', value: 310, color: '#22c55e' },
      { name: 'Humanidades', value: 180, color: '#a855f7' },
      { name: 'Artes', value: 120, color: '#f59e0b' },
    ],
    trends: [
      { label: 'Lun', value: 45 },
      { label: 'Mar', value: 62 },
      { label: 'Mié', value: 58 },
      { label: 'Jue', value: 78 },
      { label: 'Vie', value: 92 },
      { label: 'Sáb', value: 40 },
      { label: 'Dom', value: 22 },
    ],
    topCareers: [
      { name: 'Ing. Sistemas', students: 320, color: '#0ea5e9' },
      { name: 'Medicina', students: 280, color: '#ef4444' },
      { name: 'Derecho', students: 210, color: '#a855f7' },
      { name: 'Administración', students: 180, color: '#f59e0b' },
    ],
  },
  month: {
    summary: {
      totalStudents: 128,
      totalTeachers: 24,
      avgGrade: 3.72,
      enrollmentRate: 85,
    },
    distribution: [
      { name: 'Ingeniería', value: 450, color: '#0ea5e9' },
      { name: 'Ciencias', value: 330, color: '#22c55e' },
      { name: 'Humanidades', value: 190, color: '#a855f7' },
      { name: 'Artes', value: 130, color: '#f59e0b' },
    ],
    trends: [
      { label: 'Sem 1', value: 45 },
      { label: 'Sem 2', value: 62 },
      { label: 'Sem 3', value: 78 },
      { label: 'Sem 4', value: 92 },
    ],
    topCareers: [
      { name: 'Ing. Sistemas', value: 340, color: '#0ea5e9' },
      { name: 'Medicina', value: 290, color: '#ef4444' },
      { name: 'Derecho', value: 220, color: '#a855f7' },
      { name: 'Administración', value: 190, color: '#f59e0b' },
      { name: 'Psicología', value: 160, color: '#22c55e' },
    ].map((c) => ({
      name: c.name,
      students: c.value,
      color: c.color,
    })) as TopCareer[],
  },
  year: {
    summary: {
      totalStudents: 128,
      totalTeachers: 24,
      avgGrade: 3.65,
      enrollmentRate: 80,
    },
    distribution: [
      { name: 'Ingeniería', value: 520, color: '#0ea5e9' },
      { name: 'Ciencias', value: 380, color: '#22c55e' },
      { name: 'Humanidades', value: 220, color: '#a855f7' },
      { name: 'Artes', value: 160, color: '#f59e0b' },
    ],
    trends: [
      { label: 'Ene', value: 45 },
      { label: 'Feb', value: 62 },
      { label: 'Mar', value: 58 },
      { label: 'Abr', value: 78 },
      { label: 'May', value: 92 },
      { label: 'Jun', value: 85 },
      { label: 'Jul', value: 40 },
      { label: 'Ago', value: 55 },
      { label: 'Sep', value: 120 },
      { label: 'Oct', value: 98 },
      { label: 'Nov', value: 88 },
      { label: 'Dic', value: 72 },
    ],
    topCareers: [
      { name: 'Ing. Sistemas', students: 420, color: '#0ea5e9' },
      { name: 'Medicina', students: 380, color: '#ef4444' },
      { name: 'Derecho', students: 310, color: '#a855f7' },
      { name: 'Administración', students: 280, color: '#f59e0b' },
      { name: 'Psicología', students: 250, color: '#22c55e' },
    ],
  },
};

export const getReports = async (period: ReportPeriod): Promise<ReportData> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 600));
    return mockDataByPeriod[period];
  }

  const response = await api.get<ReportData>(`/Reports?period=${period}`);
  return response.data;
};

export const exportReportsCsv = async (period: ReportPeriod): Promise<Blob> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 800));

    const data = mockDataByPeriod[period];
    const rows = [
      ['Métrica', 'Valor'],
      ['Estudiantes', String(data.summary.totalStudents)],
      ['Profesores', String(data.summary.totalTeachers)],
      ['Promedio', String(data.summary.avgGrade)],
      ['Tasa de inscripción', `${data.summary.enrollmentRate}%`],
      [''],
      ['Facultad', 'Cantidad'],
      ...data.distribution.map((f) => [f.name, String(f.value)]),
    ];

    const csv = rows.map((row) => row.join(',')).join('\n');
    return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  }

  const response = await api.get(`/Reports/export/csv?period=${period}`, {
    responseType: 'blob',
  });
  return response.data;
};

export const exportReportsPdf = async (period: ReportPeriod): Promise<Blob> => {
  if (USE_MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 1000));
    const data = mockDataByPeriod[period];
    const content = `Reporte ${period}\n\n${JSON.stringify(data, null, 2)}`;
    return new Blob([content], { type: 'application/pdf' });
  }

  const response = await api.get(`/Reports/export/pdf?period=${period}`, {
    responseType: 'blob',
  });
  return response.data;
};