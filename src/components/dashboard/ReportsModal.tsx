import { useEffect, useState } from 'react';
import {
  FaTimes,
  FaDownload,
  FaFileCsv,
  FaFilePdf,
  FaChartLine,
  FaUsers,
  FaChalkboardTeacher,
  FaStar,
  FaChartPie,
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import {
  getReports,
  exportReportsCsv,
  exportReportsPdf,
} from '../../api/reports';
import type { ReportData, ReportPeriod } from '../../api/reports';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportsModal = ({ isOpen, onClose }: ReportsModalProps) => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [period, setPeriod] = useState<ReportPeriod>('month');
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [downloadedMsg, setDownloadedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchData(period);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, period]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !exporting) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, exporting, onClose]);

  const fetchData = async (p: ReportPeriod) => {
    try {
      setLoading(true);
      const result = await getReports(p);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: 'csv' | 'pdf') => {
    try {
      setExporting(type);
      const blob =
        type === 'csv'
          ? await exportReportsCsv(period)
          : await exportReportsPdf(period);

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reporte-${period}.${type}`;
      link.click();
      URL.revokeObjectURL(url);

      setDownloadedMsg(t.dashboard.reportsDownloaded);
      setTimeout(() => setDownloadedMsg(null), 2200);
    } finally {
      setExporting(null);
    }
  };

  if (!isOpen) return null;

  const periods: { key: ReportPeriod; label: string }[] = [
    { key: 'today', label: t.dashboard.reportsToday },
    { key: 'week', label: t.dashboard.reportsWeek },
    { key: 'month', label: t.dashboard.reportsMonth },
    { key: 'year', label: t.dashboard.reportsYear },
  ];

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const axisColor = isDark ? '#64748b' : '#94a3b8';

  const tooltipStyle = {
    background: isDark ? '#0f172a' : 'white',
    border: isDark ? '1px solid #1e293b' : '1px solid #e0f2fe',
    borderRadius: '12px',
    boxShadow: isDark
      ? '0 10px 30px rgba(0,0,0,0.5)'
      : '0 10px 30px rgba(14,165,233,0.15)',
    color: isDark ? '#e2e8f0' : '#0f172a',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-900/70 dark:bg-slate-950/85 backdrop-blur-sm"
        onClick={() => !exporting && onClose()}
      />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-sky-100 dark:border-slate-800 animate-slideUp">
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-sky-100 dark:border-slate-800 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <FaChartLine className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {t.dashboard.reportsTitle}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.dashboard.reportsSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleExport('csv')}
                disabled={!!exporting}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 rounded-lg border border-emerald-200 dark:border-emerald-900/60 transition-all duration-300 disabled:opacity-50"
              >
                {exporting === 'csv' ? (
                  <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <FaFileCsv className="w-3 h-3" />
                )}
                {t.dashboard.reportsExportCsv}
              </button>
              <button
                onClick={() => handleExport('pdf')}
                disabled={!!exporting}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-950/80 rounded-lg border border-red-200 dark:border-red-900/60 transition-all duration-300 disabled:opacity-50"
              >
                {exporting === 'pdf' ? (
                  <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <FaFilePdf className="w-3 h-3" />
                )}
                {t.dashboard.reportsExportPdf}
              </button>
            </div>

            <button
              onClick={onClose}
              disabled={!!exporting}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border border-sky-100 dark:border-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 disabled:opacity-50"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(92vh-80px)]">
          <div className="p-6 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.dashboard.reportsPeriod}:
              </span>
              {periods.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  disabled={loading}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-300 ${
                    period === p.key
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-transparent shadow-md'
                      : 'bg-sky-50/60 dark:bg-slate-800/60 text-gray-700 dark:text-gray-300 border-sky-100 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {downloadedMsg && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-sm animate-fadeIn">
                <FaDownload className="w-4 h-4" />
                {downloadedMsg}
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-sky-100 dark:border-slate-800 border-t-sky-500 dark:border-t-sky-400 animate-spin" />
                <p className="text-sm text-sky-600 dark:text-sky-400 font-medium">
                  {t.dashboard.reportsLoading}
                </p>
              </div>
            ) : data ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <SummaryCard
                    icon={<FaUsers />}
                    label={t.dashboard.reportsTotalStudents}
                    value={data.summary.totalStudents.toString()}
                    color="from-sky-400 to-blue-500"
                  />
                  <SummaryCard
                    icon={<FaChalkboardTeacher />}
                    label={t.dashboard.reportsTotalTeachers}
                    value={data.summary.totalTeachers.toString()}
                    color="from-emerald-400 to-green-500"
                  />
                  <SummaryCard
                    icon={<FaStar />}
                    label={t.dashboard.reportsAvgGrade}
                    value={data.summary.avgGrade.toFixed(2)}
                    color="from-amber-400 to-orange-500"
                  />
                  <SummaryCard
                    icon={<FaChartPie />}
                    label={t.dashboard.reportsEnrollmentRate}
                    value={`${data.summary.enrollmentRate}%`}
                    color="from-purple-400 to-fuchsia-500"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 p-4 rounded-2xl bg-sky-50/40 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-700">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <FaChartLine className="w-3.5 h-3.5 text-sky-500" />
                      {t.dashboard.reportsTrends}
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.trends}>
                          <defs>
                            <linearGradient id="reportGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                          <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: axisColor, fontSize: 10 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: axisColor, fontSize: 10 }}
                          />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#0ea5e9"
                            strokeWidth={2.5}
                            fill="url(#reportGradient)"
                            dot={{ fill: '#0ea5e9', r: 3, strokeWidth: 2, stroke: isDark ? '#0f172a' : 'white' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <FaChartPie className="w-3.5 h-3.5 text-purple-500" />
                      {t.dashboard.reportsDistribution}
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data.distribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={65}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                          >
                            {data.distribution.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-800/40 border border-emerald-100 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <FaChartLine className="w-3.5 h-3.5 text-emerald-500" />
                    {t.dashboard.reportsTopCareers}
                  </h3>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.topCareers} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: axisColor, fontSize: 11 }}
                          width={110}
                        />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="students" radius={[0, 6, 6, 0]} barSize={18}>
                          {data.topCareers.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex sm:hidden items-center gap-2">
                  <button
                    onClick={() => handleExport('csv')}
                    disabled={!!exporting}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg border border-emerald-200 dark:border-emerald-900/60 disabled:opacity-50"
                  >
                    <FaFileCsv className="w-3 h-3" />
                    {t.dashboard.reportsExportCsv}
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    disabled={!!exporting}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-900/60 disabled:opacity-50"
                  >
                    <FaFilePdf className="w-3 h-3" />
                    {t.dashboard.reportsExportPdf}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) => (
  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-700 shadow-sm">
    <div
      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center text-sm shadow-md mb-2`}
    >
      {icon}
    </div>
    <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
      {label}
    </p>
    <p className="text-xl font-bold text-gray-800 dark:text-white mt-0.5">
      {value}
    </p>
  </div>
);

export default ReportsModal;