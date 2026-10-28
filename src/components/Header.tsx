import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  GraduationCap, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Info,
  ChevronDown,
  Sparkles,
  School
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    config, 
    students, 
    activeStudentId, 
    setActiveStudentId, 
    currentStudent,
    toast 
  } = useApp();

  const [timeWita, setTimeWita] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeWita(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Makassar',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' WITA'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Toast Notification Bar */}
      {toast && (
        <div className={`px-4 py-2 text-sm text-white flex items-center justify-between transition-all ${
          toast.type === 'success' ? 'bg-emerald-600' :
          toast.type === 'error' ? 'bg-rose-600' : 'bg-sky-600'
        }`}>
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 shrink-0" />}
            <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Institution Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200 shrink-0">
              <School className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-emerald-950">
                  CIPTA <span className="text-emerald-600">Learning</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {config.kelasUtama} • {config.fase}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium truncate max-w-[200px] sm:max-w-none">
                {config.satuanPendidikan} • TP {config.tahunAjaranAktif} ({config.semesterAktif})
              </p>
            </div>
          </div>

          {/* Center Info: Official Identity & Time */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-mono font-medium text-gray-700">{timeWita}</span>
            </div>
            <div className="text-right leading-tight">
              <div className="font-semibold text-gray-800">Kamad: {config.kepalaMadrasah}</div>
              <div className="text-gray-500">Pengembang: {config.pengembangAplikasi}</div>
            </div>
          </div>

          {/* Right Action: Role Selector & Active Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Student Switcher when in Student Mode */}
            {role === 'siswa' && (
              <div className="relative">
                <select
                  value={activeStudentId}
                  onChange={(e) => setActiveStudentId(e.target.value)}
                  className="bg-emerald-50 text-emerald-900 text-xs sm:text-sm font-semibold rounded-lg px-2.5 py-1.5 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[130px] sm:max-w-[210px] truncate"
                  title="Pilih Siswa Aktif"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      #{st.noUrut} {st.namaLengkap} ({st.jenisKelamin})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quick Role Switcher Pill */}
            <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setRole('guru')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === 'guru'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
                title="Beralih ke Peran Guru (Dzakirul Husni, S.Pd.)"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Guru</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('siswa')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === 'siswa'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-teal-700'
                }`}
                title="Beralih ke Peran Siswa VI-C"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Siswa</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-indigo-700'
                }`}
                title="Beralih ke Peran Administrator"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>

            {/* User Indicator Badge */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-300">
                {role === 'guru' ? 'DH' : role === 'admin' ? 'AD' : currentStudent?.namaLengkap.slice(0, 2).toUpperCase() || 'SW'}
              </div>
              <div className="text-left text-xs leading-none">
                <div className="font-bold text-gray-800 truncate max-w-[120px]">
                  {role === 'guru' ? 'Dzakirul Husni' : role === 'admin' ? 'Administrator' : currentStudent?.namaLengkap.split(' ')[0]}
                </div>
                <div className="text-gray-400 text-[10px] capitalize">
                  {role === 'guru' ? 'Guru Kelas VI-C' : role === 'admin' ? 'Admin Madrasah' : `NISN: ${currentStudent?.nisn}`}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
