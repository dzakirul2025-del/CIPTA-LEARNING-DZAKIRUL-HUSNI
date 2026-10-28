import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Student } from '../types';
import { 
  GitFork, 
  HelpCircle, 
  Target, 
  Sparkles, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Flame,
  Award
} from 'lucide-react';

export const DifferentiationPortal: React.FC = () => {
  const { students, updateStudent, attempts, showToast } = useApp();

  const [activePathway, setActivePathway] = useState<'Dukungan' | 'Sesuai Target' | 'Pengayaan'>('Sesuai Target');

  const pathwayData = {
    'Dukungan': {
      title: 'Jalur Dukungan (Fondasi & Bantuan Bertingkat)',
      color: 'amber',
      description: 'Diberikan model konkret, visualisasi representatif, petunjuk bertahap (scaffolding), serta pendampingan langsung guru tanpa melabeli siswa secara permanen.',
      rekomendasiAktivitas: [
        'Model peraga kubus satuan kayu untuk menghitung volume wadah',
        'Kartu langkah wudhu bergambar dan tabel takaran air sederhana',
        'Pendampingan tutor sebaya (peer-tutoring) dalam kelompok heterogen'
      ]
    },
    'Sesuai Target': {
      title: 'Jalur Sesuai Target (Reguler & Kontekstual)',
      color: 'emerald',
      description: 'Latihan terstruktur memecahkan masalah kontekstual nyata di madrasah, diskusi strategi penyelesaian, dan penjelasan mandiri.',
      rekomendasiAktivitas: [
        'Menghitung kapasitas liter penampung air wudhu MIN 1 Paser',
        'Analisis diagram batang timbulan botol plastik kantin madrasah',
        'Menuliskan refleksi teks eksplanasi siklus air sungai Kandilo'
      ]
    },
    'Pengayaan': {
      title: 'Jalur Pengayaan (Penalaran Mendalam & Proyek Inovasi)',
      color: 'purple',
      description: 'Masalah multi-langkah, penalaran HOTS, pembuatan soal oleh siswa, perancangan proyek inovasi ekoteologi, dan kepemimpinan aksi nyata.',
      rekomendasiAktivitas: [
        'Merancang instalasi pipa resapan air wudhu otomatis ke kebun toga',
        'Menjadi duta kampanye kantin ramah lingkungan bebas sampah sachet',
        'Membuat soal tantangan baru untuk bank soal madrasah'
      ]
    }
  };

  const studentsInPathway = students.filter(s => s.levelBelajar === activePathway);

  const handleChangePathway = (studentId: string, newLevel: 'Dukungan' | 'Sesuai Target' | 'Pengayaan') => {
    updateStudent(studentId, { levelBelajar: newLevel });
    showToast(`Jalur belajar siswa diperbarui ke: ${newLevel}`, 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" /> Pembelajaran Berdiferensiasi
            </span>
            <span className="text-xs text-slate-500 font-medium">
              3 Jalur Belajar Fleksibel • Tanpa Label Permanen
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Diferensiasi, Remedial & Pengayaan Kelas VI-C
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Menyesuaikan tingkat dukungan dan tantangan berdasarkan asesmen diagnostik dan formatif. Setiap anak memiliki keunikan dan potensi untuk bertumbuh mekar.
          </p>
        </div>
      </div>

      {/* 3 Pathway Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['Dukungan', 'Sesuai Target', 'Pengayaan'] as const).map((level) => {
          const info = pathwayData[level];
          const count = students.filter(s => s.levelBelajar === level).length;
          const isSelected = activePathway === level;

          let borderClass = 'border-slate-200 bg-white hover:border-slate-300';
          if (isSelected) {
            borderClass = level === 'Dukungan' ? 'border-amber-500 ring-2 ring-amber-400 bg-amber-50/30' :
                          level === 'Pengayaan' ? 'border-purple-500 ring-2 ring-purple-400 bg-purple-50/30' :
                          'border-emerald-500 ring-2 ring-emerald-400 bg-emerald-50/30';
          }

          return (
            <button
              key={level}
              type="button"
              onClick={() => setActivePathway(level)}
              className={`p-5 rounded-2xl border text-left transition-all shadow-xs cursor-pointer ${borderClass}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  level === 'Dukungan' ? 'bg-amber-100 text-amber-800' :
                  level === 'Pengayaan' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {level}
                </span>
                <span className="text-base font-black text-slate-900 font-mono">
                  {count} Siswa
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {info.title.split('(')[0]}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {info.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Pathway Details & Students List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              activePathway === 'Dukungan' ? 'bg-amber-100 text-amber-800' :
              activePathway === 'Pengayaan' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {activePathway}
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {pathwayData[activePathway].title}
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            {pathwayData[activePathway].description}
          </p>
        </div>

        {/* Recommended Activities for This Pathway */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Rancangan Dukungan Pembelajaran Khusus:
          </div>
          <ul className="space-y-1.5 text-slate-700">
            {pathwayData[activePathway].rekomendasiAktivitas.map((act, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Students in this Pathway Table */}
        <div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Daftar Siswa di Jalur {activePathway} ({studentsInPathway.length})
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5 w-12 text-center">No</th>
                  <th className="px-4 py-2.5">Nama Lengkap</th>
                  <th className="px-4 py-2.5">NISN</th>
                  <th className="px-4 py-2.5 text-center">L/P</th>
                  <th className="px-4 py-2.5 text-center">Poin Kebaikan</th>
                  <th className="px-4 py-2.5 text-right">Pindahkan Jalur Belajar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {studentsInPathway.length > 0 ? (
                  studentsInPathway.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 text-center font-bold text-slate-500">{st.noUrut}</td>
                      <td className="px-4 py-2.5 font-semibold text-slate-900">{st.namaLengkap}</td>
                      <td className="px-4 py-2.5 font-mono text-slate-500">{st.nisn}</td>
                      <td className="px-4 py-2.5 text-center font-bold">{st.jenisKelamin}</td>
                      <td className="px-4 py-2.5 text-center font-bold text-amber-600">⭐ {st.totalPoinKebaikan}</td>
                      <td className="px-4 py-2.5 text-right">
                        <select
                          value={st.levelBelajar}
                          onChange={(e: any) => handleChangePathway(st.id, e.target.value)}
                          className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Dukungan">Jalur Dukungan</option>
                          <option value="Sesuai Target">Jalur Sesuai Target</option>
                          <option value="Pengayaan">Jalur Pengayaan</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-slate-400">
                      Tidak ada siswa pada jalur ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
