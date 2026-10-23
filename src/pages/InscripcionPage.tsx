import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaUserGraduate,
  FaBook,
  FaCheckCircle,
  FaPrint,
  FaArrowRight,
  FaClipboardList,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { getEstudiantes } from '../api/estudiantes';
import { getMaterias } from '../api/materias';
import type { Estudiante } from '../types/estudiante.types';
import type { Materia } from '../types/materia.types';

type Step = 1 | 2 | 3 | 4;

export const InscripcionPage = () => {
  const [step, setStep] = useState<Step>(1);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);

  // Selecciones
  const [selectedEstudiante, setSelectedEstudiante] = useState<Estudiante | null>(null);
  const [selectedMaterias, setSelectedMaterias] = useState<Materia[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [e, m] = await Promise.all([getEstudiantes(), getMaterias()]);
      setEstudiantes(e);
      // Solo mostramos materias activas y con cupos
      setMaterias(m.filter((mat) => mat.estado === 'Activa' && mat.inscritos < mat.cupos));
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleMateria = (materia: Materia) => {
    setError(null);
    const isSelected = selectedMaterias.find((m) => m.id === materia.id);
    if (isSelected) {
      setSelectedMaterias(selectedMaterias.filter((m) => m.id !== materia.id));
    } else {
      setSelectedMaterias([...selectedMaterias, materia]);
    }
  };

  const totalCreditos = selectedMaterias.reduce((acc, m) => acc + m.creditos, 0);
  const MAX_CREDITOS = 18;

  const handleNextStep = () => {
    if (step === 2) {
      if (totalCreditos > MAX_CREDITOS) {
        setError(`No puedes inscribir más de ${MAX_CREDITOS} créditos. Llevas ${totalCreditos}.`);
        return;
      }
    }
    setStep((prev) => (prev + 1) as Step);
  };

  const handleConfirm = () => {
    setStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500 print:bg-white">
      <div className="relative z-10 print:hidden">
        <DashboardHeader />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-[900px] mx-auto print:py-0 print:max-w-full">
        
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 font-medium mb-6 print:hidden group"
        >
          <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Cancelar y volver al dashboard
        </Link>

        {/* Stepper (Barra de progreso) */}
        {step < 4 && (
          <div className="mb-8 print:hidden">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-slate-800 -z-10" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-500 -z-10" 
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
              
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2 bg-sky-50 dark:bg-slate-950 px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step >= s ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400'
                  }`}>
                    {step > s ? <FaCheckCircle /> : s}
                  </div>
                  <span className={`text-xs font-semibold ${step >= s ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                    {s === 1 ? 'Estudiante' : s === 2 ? 'Materias' : 'Confirmar'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PASO 1: Seleccionar Estudiante */}
        {step === 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 shadow-xl border border-sky-100 dark:border-slate-800 animate-slideUp">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
                <FaUserGraduate />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Paso 1: Seleccionar Estudiante</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">¿Quién va a realizar la inscripción?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
              {estudiantes.map((est) => (
                <button
                  key={est.id}
                  onClick={() => setSelectedEstudiante(est)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                    selectedEstudiante?.id === est.id
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md'
                      : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {est.nombre[0]}{est.apellido[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-white truncate">{est.nombre} {est.apellido}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{est.matricula} · {est.carrera}</p>
                  </div>
                  {selectedEstudiante?.id === est.id && (
                    <FaCheckCircle className="ml-auto text-emerald-500 w-5 h-5 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => handleNextStep()}
                disabled={!selectedEstudiante}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold disabled:opacity-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Continuar
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: Seleccionar Materias */}
        {step === 2 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 shadow-xl border border-sky-100 dark:border-slate-800 animate-slideUp">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl">
                  <FaBook />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Paso 2: Seleccionar Materias</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Elige las asignaturas a inscribir</p>
                </div>
              </div>
              <div className="bg-sky-50 dark:bg-slate-800 px-4 py-2 rounded-xl text-center border border-sky-100 dark:border-slate-700">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">Créditos</p>
                <p className={`text-xl font-bold ${totalCreditos > MAX_CREDITOS ? 'text-red-500' : 'text-sky-600 dark:text-sky-400'}`}>
                  {totalCreditos} / {MAX_CREDITOS}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
              {materias.map((mat) => {
                const isSelected = selectedMaterias.find((m) => m.id === mat.id);
                return (
                  <button
                    key={mat.id}
                    onClick={() => toggleMateria(mat)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 shadow-md'
                        : 'border-gray-200 dark:border-slate-700 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-purple-500 border-purple-500' : 'border-gray-300 dark:border-slate-600'
                    }`}>
                      {isSelected && <FaCheckCircle className="text-white w-3 h-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40 px-2 py-0.5 rounded">
                          {mat.codigo}
                        </span>
                        <p className="font-semibold text-gray-800 dark:text-white truncate">{mat.nombre}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{mat.profesor} · {mat.creditos} créditos</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm animate-shake">
                <FaExclamationTriangle /> {error}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 transition-all"
              >
                Atrás
              </button>
              <button
                onClick={handleNextStep}
                disabled={selectedMaterias.length === 0}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold disabled:opacity-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Continuar
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: Confirmar */}
        {step === 3 && selectedEstudiante && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 shadow-xl border border-sky-100 dark:border-slate-800 animate-slideUp">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl mx-auto mb-4">
                <FaClipboardList />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Confirmar Inscripción</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Revisa los datos antes de finalizar</p>
            </div>

            <div className="bg-sky-50/50 dark:bg-slate-800/50 rounded-2xl p-5 mb-6 border border-sky-100 dark:border-slate-700">
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-2">Estudiante</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
                  {selectedEstudiante.nombre[0]}{selectedEstudiante.apellido[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">{selectedEstudiante.nombre} {selectedEstudiante.apellido}</p>
                  <p className="text-xs text-gray-500">{selectedEstudiante.matricula} · {selectedEstudiante.carrera}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50/50 dark:bg-slate-800/50 rounded-2xl p-5 mb-6 border border-purple-100 dark:border-slate-700">
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-3">Materias ({selectedMaterias.length})</p>
              <div className="space-y-2">
                {selectedMaterias.map((m) => (
                  <div key={m.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{m.nombre}</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{m.creditos} cr.</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-purple-200 dark:border-slate-700 mt-3 pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-800 dark:text-white">Total Créditos</span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{totalCreditos}</span>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 transition-all"
              >
                Atrás
              </button>
              <button
                onClick={handleConfirm}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <FaCheckCircle />
                Confirmar e Inscribir
              </button>
            </div>
          </div>
        )}

        {/* PASO 4: Comprobante */}
        {step === 4 && selectedEstudiante && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-sky-100 dark:border-slate-800 animate-slideUp overflow-hidden print:shadow-none print:border-none">
            
            {/* Header del comprobante */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-8 text-white text-center relative overflow-hidden print:bg-white print:text-black print:border-b-2 print:border-gray-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl" />
              <FaCheckCircle className="w-16 h-16 mx-auto mb-4 text-emerald-100 print:text-emerald-600" />
              <h1 className="text-3xl font-bold mb-2 print:text-black">¡Inscripción Exitosa!</h1>
              <p className="text-emerald-50 print:text-gray-600">El comprobante ha sido generado correctamente.</p>
            </div>

            <div className="p-8">
              {/* Info Estudiante */}
              <div className="grid grid-cols-2 gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-slate-800">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Estudiante</p>
                  <p className="font-bold text-gray-800 dark:text-white">{selectedEstudiante.nombre} {selectedEstudiante.apellido}</p>
                  <p className="text-sm text-gray-500">{selectedEstudiante.matricula}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Fecha de Emisión</p>
                  <p className="font-bold text-gray-800 dark:text-white">{new Date().toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</p>
                </div>
              </div>

              {/* Tabla Materias */}
              <div className="mb-8">
                <h3 className="text-sm uppercase font-bold text-gray-500 mb-3">Detalle de Materias</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="text-left py-2 font-semibold text-gray-600 dark:text-gray-400">Código</th>
                      <th className="text-left py-2 font-semibold text-gray-600 dark:text-gray-400">Materia</th>
                      <th className="text-center py-2 font-semibold text-gray-600 dark:text-gray-400">Créditos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMaterias.map((m) => (
                      <tr key={m.id} className="border-b border-gray-100 dark:border-slate-800">
                        <td className="py-3 font-mono text-gray-800 dark:text-gray-300">{m.codigo}</td>
                        <td className="py-3 text-gray-800 dark:text-gray-300">{m.nombre}</td>
                        <td className="py-3 text-center font-bold text-gray-800 dark:text-gray-300">{m.creditos}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} className="text-right py-4 font-bold text-gray-800 dark:text-white">Total Créditos:</td>
                      <td className="text-center py-4 font-bold text-lg text-emerald-600">{totalCreditos}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Footer botones */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10 print:hidden">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-200 transition-all"
                >
                  <FaPrint /> Imprimir Comprobante
                </button>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold hover:shadow-lg transition-all"
                >
                  Volver al Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InscripcionPage;