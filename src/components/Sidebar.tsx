import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpenCheck, 
  Sparkles, 
  FileQuestion, 
  Gamepad2, 
  Trees, 
  Award, 
  GitFork, 
  Library, 
  Settings, 
  ChevronRight,
  HeartHandshake,
  Sliders
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentScreen, setCurrentScreen, role, currentStudent } = useApp();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      roles: ['admin', 'guru', 'siswa'],
      description: 'Ringkasan & analitik kelas'
    },
    {
      id: 'students',
      label: 'Data Siswa VI-C',
      icon: Users,
      badge: '27 Siswa',
      roles: ['admin', 'guru'],
      description: 'Manajemen data, PIN & impor'
    },
    {
      id: 'modules',
      label: 'Modul CIPTA 6 Tahap',
      icon: BookOpenCheck,
      badge: 'Fase C',
      roles: ['admin', 'guru', 'siswa'],
      description: 'Alur 6 tahap pembelajaran'
    },
    {
      id: 'ai-generator',
      label: 'Generator Perangkat AI',
      icon: Sparkles,
      badge: '25 Format',
      roles: ['admin', 'guru'],
      description: 'Penyusun dokumen & modul ajar'
    },
    {
      id: 'auto-questions',
      label: 'Generator Soal Otomatis',
      icon: Sliders,
      badge: 'Manual',
      roles: ['admin', 'guru'],
      description: 'Atur jumlah 1-200 butir soal'
    },
    {
      id: 'assessments',
      label: 'Bank Soal & Asesmen',
      icon: FileQuestion,
      badge: '1-200 Soal',
      roles: ['admin', 'guru', 'siswa'],
      description: 'CBT ujian, 10 tipe soal & rubrik'
    },
    {
      id: 'games',
      label: 'Studio Game & Edukasi',
      icon: Gamepad2,
      badge: 'Interaktif',
      roles: ['admin', 'guru', 'siswa'],
      description: 'Petualangan ekoteologi & kuis'
    },
    {
      id: 'culture',
      label: 'Budaya Madrasah & Alam',
      icon: Trees,
      badge: 'Panca Cinta',
      roles: ['admin', 'guru', 'siswa'],
      description: 'Konservasi air, sampah & karakter'
    },
    {
      id: 'portfolio',
      label: 'Portofolio & Kompetensi',
      icon: Award,
      badge: '6 Tangga',
      roles: ['admin', 'guru', 'siswa'],
      description: 'Bukti karya, aksi nyata & rubrik'
    },
    {
      id: 'differentiation',
      label: 'Diferensiasi & Remedial',
      icon: GitFork,
      badge: '3 Jalur',
      roles: ['admin', 'guru'],
      description: 'Dukungan, target & pengayaan'
    },
    {
      id: 'sources',
      label: 'Sumber Regulasi Resmi',
      icon: Library,
      badge: 'Kemenag',
      roles: ['admin', 'guru', 'siswa'],
      description: 'KBC 6077/2025 & Deep Learning'
    },
    {
      id: 'admin',
      label: 'Konfigurasi & Audit',
      icon: Settings,
      badge: null,
      roles: ['admin'],
      description: 'Tahun ajaran & log keamanan'
    }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
      <div>
        {/* Role contextual card banner */}
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <HeartHandshake className="w-4 h-4 text-emerald-300" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
              {role === 'guru' ? 'Portal Guru Pengajar' : role === 'admin' ? 'Portal Administrator' : 'Portal Belajar Siswa'}
            </span>
          </div>
          <div className="text-sm font-bold truncate">
            {role === 'guru' ? 'Dzakirul Husni, S.Pd.' : role === 'admin' ? 'MIN 1 Paser (Official)' : currentStudent?.namaLengkap || 'Siswa VI-C'}
          </div>
          <div className="text-[11px] text-emerald-100 flex items-center justify-between mt-1">
            <span>Kelas VI-C (Fase C)</span>
            <span className="bg-emerald-600/60 px-1.5 py-0.5 rounded font-mono text-[10px]">
              {role === 'siswa' ? `Poin: ${currentStudent?.totalPoinKebaikan || 0}` : '2026/2027'}
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {filteredItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold' 
                    : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ml-1.5 ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer info box */}
      <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
        <div className="font-semibold text-slate-700">MIN 1 Paser</div>
        <div className="text-[10px]">Madrasah Ibtidaiyah Negeri 1 Paser</div>
        <div className="text-[10px] text-emerald-700 mt-1 font-medium">Kurikulum Berbasis Cinta & Ekoteologi</div>
      </div>
    </aside>
  );
};
