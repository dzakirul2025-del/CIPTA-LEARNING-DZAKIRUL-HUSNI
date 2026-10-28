import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Shield, 
  Database, 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  Lock, 
  CheckCircle, 
  Clock, 
  FileText,
  School
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { config, updateConfig, auditLogs, students, modules, questions, assessments, showToast } = useApp();

  const [formConfig, setFormConfig] = useState({
    satuanPendidikan: config.satuanPendidikan,
    kelasUtama: config.kelasUtama,
    fase: config.fase,
    semesterAktif: config.semesterAktif,
    tahunAjaranAktif: config.tahunAjaranAktif,
    kepalaMadrasah: config.kepalaMadrasah,
    pengembangAplikasi: config.pengembangAplikasi,
    zonaWaktu: config.zonaWaktu,
    modeSimulasiData: config.modeSimulasiData,
    kunciUjianAktif: config.kunciUjianAktif
  });

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formConfig);
  };

  const handleExportFullBackup = () => {
    const fullBackup = {
      config,
      students,
      modules,
      questions,
      assessments,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BACKUP_CIPTA_LEARNING_MIN1PASER_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Cadangan basis data lengkap berhasil diunduh', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Pusat Kendali Administrator
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Keamanan • Konfigurasi Dinamis • Log Audit
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Pengaturan Sistem & Keamanan Madrasah
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Konfigurasi tahun pelajaran berikutnya tanpa mengubah kode program, manajemen kredensial, pencadangan basis data, dan audit jejak aktivitas sistem.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportFullBackup}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Unduh Cadangan JSON
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Configuration Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
            <School className="w-4 h-4 text-emerald-600" />
            Konfigurasi Identitas Resmi Satuan Pendidikan
          </h3>

          <form onSubmit={handleSaveConfig} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Satuan Pendidikan</label>
                <input
                  type="text"
                  required
                  value={formConfig.satuanPendidikan}
                  onChange={(e) => setFormConfig({ ...formConfig, satuanPendidikan: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kelas Utama</label>
                <input
                  type="text"
                  required
                  value={formConfig.kelasUtama}
                  onChange={(e) => setFormConfig({ ...formConfig, kelasUtama: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Pelajaran (Dinamis)</label>
                <input
                  type="text"
                  required
                  value={formConfig.tahunAjaranAktif}
                  onChange={(e) => setFormConfig({ ...formConfig, tahunAjaranAktif: e.target.value })}
                  placeholder="2026/2027"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Semester Aktif</label>
                <select
                  value={formConfig.semesterAktif}
                  onChange={(e: any) => setFormConfig({ ...formConfig, semesterAktif: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="Ganjil">Semester Ganjil</option>
                  <option value="Genap">Semester Genap</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kepala Madrasah</label>
                <input
                  type="text"
                  required
                  value={formConfig.kepalaMadrasah}
                  onChange={(e) => setFormConfig({ ...formConfig, kepalaMadrasah: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pengembang Aplikasi</label>
                <input
                  type="text"
                  required
                  value={formConfig.pengembangAplikasi}
                  onChange={(e) => setFormConfig({ ...formConfig, pengembangAplikasi: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Zona Waktu Resmi</label>
                <input
                  type="text"
                  disabled
                  value={formConfig.zonaWaktu}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-100 rounded-xl font-mono text-slate-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kunci Jawaban CBT</label>
                <select
                  value={formConfig.kunciUjianAktif ? 'aktif' : 'nonaktif'}
                  onChange={(e) => setFormConfig({ ...formConfig, kunciUjianAktif: e.target.value === 'aktif' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="aktif">Terkunci (Aman dari Siswa)</option>
                  <option value="nonaktif">Terbuka (Mode Pembahasan)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Simpan Konfigurasi
              </button>
            </div>
          </form>
        </div>

        {/* System Health & Audit Trail */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              Integritas & Kesehatan Database
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Tabel Siswa (VI-C):</span>
                <span className="font-bold text-slate-800">{students.length} Records</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Tabel Modul CIPTA:</span>
                <span className="font-bold text-slate-800">{modules.length} Records</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Tabel Bank Soal:</span>
                <span className="font-bold text-slate-800">{questions.length} Butir Soal</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Status Server-Side AI:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> gemini-3.8-flash Siap
                </span>
              </div>
            </div>
          </div>

          {/* Audit Logs list */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              Log Audit Keamanan & Aktivitas
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>{log.aksi}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{log.waktu}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{log.detail}</div>
                  <div className="text-[10px] text-emerald-800 font-semibold mt-1">Oleh: {log.aktor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
