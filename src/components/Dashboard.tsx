import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  BookOpen, 
  FileCheck, 
  Sparkles, 
  Award, 
  Trees, 
  Droplet, 
  Heart, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Activity,
  Target,
  Sliders
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    role, 
    students, 
    subjects, 
    modules, 
    assessments, 
    portfolios, 
    cultureActivities, 
    currentStudent,
    setCurrentScreen,
    config
  } = useApp();

  const perempuanCount = students.filter(s => s.jenisKelamin === 'P').length;
  const lakiLakiCount = students.filter(s => s.jenisKelamin === 'L').length;
  const approvedPortfolios = portfolios.filter(p => p.statusReview === 'Disetujui').length;
  const pendingPortfolios = portfolios.filter(p => p.statusReview === 'Menunggu Review').length;

  return (
    <div className="space-y-6">
      
      {/* Official Welcome & Pedagogical Hierarchy Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white p-6 sm:p-8 shadow-md">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/40 text-emerald-200 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Integrasi Kurikulum Berbasis Cinta (Kemenag) & Pembelajaran Mendalam
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Ekosistem CIPTA Learning — MIN 1 Paser
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Platform pembelajaran digital holistik Kelas VI-C / Fase C. Memadukan metode operasional CIPTA (Compassion, Interactive, Personalized, Technology, Action Learning), Panca Cinta Kemenag, dan insersi ekoteologi menjaga kelestarian alam Paser.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-emerald-900/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-emerald-700/50">
              <span className="text-emerald-300">Kepala Madrasah:</span> <span className="font-semibold text-white">{config.kepalaMadrasah}</span>
            </div>
            <div className="bg-emerald-900/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-emerald-700/50">
              <span className="text-emerald-300">Pengembang:</span> <span className="font-semibold text-white">{config.pengembangAplikasi}</span>
            </div>
            <div className="bg-emerald-900/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-emerald-700/50">
              <span className="text-emerald-300">Tahun Ajaran:</span> <span className="font-semibold text-white">{config.tahunAjaranAktif} ({config.semesterAktif})</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Pedagogical Hierarchy Layers Visualizer */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <h2 className="font-bold text-slate-800 text-sm sm:text-base">
              Fondasi Hierarki Pedagogis 5 Lapisan
            </h2>
          </div>
          <span className="text-xs text-slate-500">Bukan label belaka, diterapkan operasional</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">Lapisan 1</div>
            <div className="font-bold text-slate-800 text-xs mt-0.5">CIPTA Learning</div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Alur operasional: <strong>C</strong>ompassion, <strong>I</strong>nteractive, <strong>P</strong>ersonalized, <strong>T</strong>echnology, <strong>A</strong>ction Learning.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
            <div className="text-[10px] font-bold uppercase text-rose-700 tracking-wider">Lapisan 2</div>
            <div className="font-bold text-slate-800 text-xs mt-0.5">KBC Kemenag 6077/2025</div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Panca Cinta: Cinta Allah & Rasul, Cinta Ilmu, Cinta Lingkungan, Cinta Sesama, Cinta Tanah Air.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="text-[10px] font-bold uppercase text-blue-700 tracking-wider">Lapisan 3</div>
            <div className="font-bold text-slate-800 text-xs mt-0.5">Pembelajaran Mendalam</div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              3 Prinsip (Mindful, Meaningful, Joyful) & 3 Pengalaman (Memahami, Mengaplikasi, Merefleksi).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200">
            <div className="text-[10px] font-bold uppercase text-teal-700 tracking-wider">Lapisan 4</div>
            <div className="font-bold text-slate-800 text-xs mt-0.5">Insersi Ekoteologi</div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Tanggung jawab spiritual merawat alam: konservasi air wudhu, kompos daun, dan perlindungan mangrove Paser.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">Lapisan 5</div>
            <div className="font-bold text-slate-800 text-xs mt-0.5">Kompetensi & Aksi Nyata</div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              6 Tangga Penguasaan: Dari Memahami konsep hingga Menghasilkan karya dan Merefleksikan dampak.
            </p>
          </div>
        </div>
      </div>

      {/* Role-Specific Content */}
      {role === 'guru' || role === 'admin' ? (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setCurrentScreen('students')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-400 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">Siswa Kelas VI-C</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{students.length} Siswa</div>
              <div className="text-[11px] text-slate-500 mt-1">
                {perempuanCount} Perempuan • {lakiLakiCount} Laki-laki
              </div>
            </div>

            <div 
              onClick={() => setCurrentScreen('modules')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-400 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">Modul CIPTA 6 Tahap</span>
                <BookOpen className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{modules.length} Modul</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">
                Terverifikasi & Siap Ajar
              </div>
            </div>

            <div 
              onClick={() => setCurrentScreen('assessments')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-400 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">Paket Asesmen & Ujian</span>
                <FileCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{assessments.length} Paket</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Mendukung 1-200 Butir Soal
              </div>
            </div>

            <div 
              onClick={() => setCurrentScreen('portfolio')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-400 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">Portofolio & Aksi Nyata</span>
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{portfolios.length} Karya</div>
              <div className="text-[11px] text-amber-600 font-medium mt-1">
                {pendingPortfolios > 0 ? `${pendingPortfolios} Menunggu Review` : `${approvedPortfolios} Disetujui`}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for Teacher */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
              Tindakan Cepat Guru Kelas VI-C
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <button
                type="button"
                onClick={() => setCurrentScreen('auto-questions')}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-300 ring-1 ring-emerald-200 hover:border-emerald-600 hover:shadow-xs transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Rakit Soal Otomatis</div>
                    <div className="text-[10px] text-emerald-700 font-semibold">Atur Manual 1-200</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentScreen('ai-generator')}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Generator AI</div>
                    <div className="text-[10px] text-slate-500">Rancang modul & LKPD</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentScreen('assessments')}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Bank Soal & CBT</div>
                    <div className="text-[10px] text-slate-500">Buat paket s.d. 200 soal</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentScreen('culture')}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800">
                    <Trees className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Budaya Madrasah</div>
                    <div className="text-[10px] text-slate-500">Catat meteran air & sampah</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentScreen('differentiation')}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-200 hover:border-emerald-500 hover:shadow-xs transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Diferensiasi Siswa</div>
                    <div className="text-[10px] text-slate-500">Jalur Dukungan & Pengayaan</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </button>
            </div>
          </div>

          {/* 5 Subjects Card Overview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">5 Mata Pelajaran Utama Kelas VI-C</h3>
                <p className="text-xs text-slate-500">Terintegrasi Capaian Pembelajaran, KBC Kemenag & Insersi Ekoteologi</p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentScreen('modules')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Buka Semua Modul <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {subjects.map((sub) => (
                <div 
                  key={sub.id}
                  onClick={() => setCurrentScreen('modules')}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-emerald-50/50 hover:border-emerald-300 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {sub.fase}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-1">{sub.nama}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {sub.deskripsi}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{sub.tujuanPembelajaran.length} TP</span>
                    <span className="font-semibold text-emerald-600">Aktif</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Student Specific View */
        <div className="space-y-6">
          {/* Student Profile Card */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-emerald-100">
                {currentStudent?.namaLengkap.slice(0, 2).toUpperCase() || 'SW'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {currentStudent?.namaLengkap}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    #{currentStudent?.noUrut} • {currentStudent?.jenisKelamin === 'P' ? 'Perempuan' : 'Laki-laki'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-3">
                  <span>NISN: <strong>{currentStudent?.nisn}</strong></span>
                  <span>NIS Lokal: <strong>{currentStudent?.nisLokal}</strong></span>
                  <span>Kelas: <strong>{currentStudent?.kelas}</strong></span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">Jalur Belajar:</span>
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                    currentStudent?.levelBelajar === 'Pengayaan' ? 'bg-purple-100 text-purple-800' :
                    currentStudent?.levelBelajar === 'Dukungan' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {currentStudent?.levelBelajar}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:pl-6 border-slate-100">
              <div className="text-xs text-slate-500">Poin Bintang Kebaikan</div>
              <div className="text-3xl font-black text-amber-600 flex items-center gap-1 justify-end mt-0.5">
                <span>⭐</span> {currentStudent?.totalPoinKebaikan || 100}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Diraih dari kebaikan & keaktifan belajar</p>
            </div>
          </div>

          {/* Student Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => setCurrentScreen('modules')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Modul CIPTA 6 Tahap</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Pelajari materi terstruktur dari Pemantik, Eksplorasi, Tantangan, hingga Praktik Aksi Nyata.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700">
                Buka Modul Pembelajaran <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => setCurrentScreen('assessments')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Ujian CBT & Asesmen</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Asesmen sumatif tengah semester aktif. Timer otomatis, simpan instan, dan bebas rasa cemas.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-700">
                Ikuti Ujian Sekarang <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => setCurrentScreen('games')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-teal-500 cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Studio Game Ekoteologi</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Bermain sambil belajar konservasi Sungai Kandilo, hemat air wudhu, dan simulator kompos.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-teal-700">
                Mainkan Game Edukatif <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conservation Meter & Daily Madrasah Culture Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Trees className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Capaian Nyata Ekoteologi MIN 1 Paser
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bukti bahwa ilmu dipraktikkan dalam aksi nyata menjaga lingkungan madrasah
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Terverifikasi Tim Lingkungan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Droplet className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-sky-700 font-medium">Air Wudhu Diselamatkan</div>
              <div className="text-xl font-black text-sky-950">185 Liter/Hari</div>
              <div className="text-[10px] text-sky-600">Dialirkan ke kebun toga & hidroponik</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-emerald-700 font-medium">Sampah Plastik Terpilah</div>
              <div className="text-xl font-black text-emerald-950">14,5 Kg/Pekan</div>
              <div className="text-[10px] text-emerald-600">Sedekah sampah botol & kresek</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-amber-700 font-medium">Biopori Resapan Aktif</div>
              <div className="text-xl font-black text-amber-950">10 Titik Baru</div>
              <div className="text-[10px] text-amber-600">Hasil gotong royong Jumat Bersih</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
