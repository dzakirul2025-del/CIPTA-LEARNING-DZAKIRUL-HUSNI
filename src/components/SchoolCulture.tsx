import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolCultureActivity, PancaCintaType } from '../types';
import { 
  Trees, 
  Calendar, 
  Droplet, 
  Trash2, 
  Heart, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  PlusCircle, 
  FileCheck, 
  Camera, 
  Sparkles,
  X
} from 'lucide-react';

export const SchoolCulture: React.FC = () => {
  const { cultureActivities, addCultureActivity, role, showToast } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [formData, setFormData] = useState({
    namaProgram: '',
    tanggal: new Date().toISOString().split('T')[0],
    kategori: 'Program Cinta Lingkungan' as any,
    dimensiPancaCinta: 'Cinta Lingkungan' as PancaCintaType,
    penanggungJawab: 'Dzakirul Husni, S.Pd.',
    targetPeserta: 'Siswa Kelas VI-C MIN 1 Paser',
    jumlahPartisipan: 27,
    indikatorKeberhasilan: '',
    hasilTerukur: '',
    isSimulasi: false,
    catatanRefleksi: '',
    rencanaTindakLanjut: ''
  });

  const filteredActivities = cultureActivities.filter(a => {
    return filterCategory === 'all' || a.kategori === filterCategory;
  });

  const pancaCintaList: PancaCintaType[] = [
    'Cinta Allah SWT dan Rasul-Nya',
    'Cinta Ilmu',
    'Cinta Lingkungan',
    'Cinta Diri dan Sesama',
    'Cinta Tanah Air'
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Budaya Madrasah Humanis & Hijau
            </span>
            <span className="text-xs text-slate-500 font-medium">
              MIN 1 Paser • Kemenag RI
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Pembiasaan Harian, Karakter Cinta & Ekoteologi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Membangun ekosistem madrasah yang penuh kasih sayang, disiplin positif, dan peduli kelestarian alam ciptaan Allah SWT melalui pembiasaan nyata, gotong royong, dan kemitraan keluarga.
          </p>
        </div>

        {role === 'guru' && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Catat Kegiatan Baru
          </button>
        )}
      </div>

      {/* Conservation Dashboard with Real vs Simulated Badges */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Meteran Capaian Konservasi Lingkungan
            </h3>
            <p className="text-xs text-slate-500">
              Data terverifikasi tim kebersihan madrasah vs data model simulasi
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            Adiwiyata Ramah Lingkungan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
            <div className="flex items-center justify-between text-xs text-sky-800 font-medium mb-1">
              <span>Konservasi Air Wudhu</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-200 text-sky-900">
                Pengukuran Lapangan
              </span>
            </div>
            <div className="text-2xl font-black text-sky-950 mt-1">185 L / Hari</div>
            <p className="text-[11px] text-sky-700 mt-1">
              Ditampung dan dialirkan ke kebun toga & hidroponik madrasah.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between text-xs text-emerald-800 font-medium mb-1">
              <span>Sedekah Sampah Plastik</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900">
                Pengukuran Lapangan
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-950 mt-1">14,5 Kg / Pekan</div>
            <p className="text-[11px] text-emerald-700 mt-1">
              Botol dan gelas plastik terpilah dijual untuk kas sosial anak yatim.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-center justify-between text-xs text-amber-800 font-medium mb-1">
              <span>Penghematan Listrik Kelas</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                Data Simulasi
              </span>
            </div>
            <div className="text-2xl font-black text-amber-950 mt-1">32 kWh / Bulan</div>
            <p className="text-[11px] text-amber-700 mt-1">
              Matikan lampu & kipas saat jam istirahat dan jendela terbuka luas.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Activities List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Daftar Kegiatan Budaya Madrasah ({filteredActivities.length})
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <option value="all">Semua Kategori</option>
              <option value="Pembiasaan Harian">Pembiasaan Harian</option>
              <option value="Program Cinta Lingkungan">Program Cinta Lingkungan</option>
              <option value="Gotong Royong">Gotong Royong</option>
              <option value="Kemitraan Keluarga & Kantin">Kemitraan Keluarga & Kantin</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredActivities.map((act) => (
            <div key={act.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {act.kategori}
                  </span>
                  <span className="font-mono text-[11px]">{act.tanggal}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {act.namaProgram}
                </h3>

                <div className="mt-2 text-xs text-rose-700 font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> {act.dimensiPancaCinta}
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-700">Hasil Terukur:</span>{' '}
                    <span className="font-bold text-emerald-800">{act.hasilTerukur}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Partisipan:</span>{' '}
                    <span>{act.jumlahPartisipan} orang ({act.targetPeserta})</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Refleksi:</span>{' '}
                    <span className="italic">{act.catatanRefleksi}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">PJ: {act.penanggungJawab}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  act.isSimulasi ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {act.isSimulasi ? 'Data Simulasi' : 'Aktual'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Catat Kegiatan Budaya Madrasah */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Catat Kegiatan Budaya Madrasah</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              addCultureActivity(formData);
              setIsModalOpen(false);
            }} className="space-y-4 mt-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Program / Kegiatan</label>
                <input
                  type="text"
                  required
                  value={formData.namaProgram}
                  onChange={(e) => setFormData({ ...formData, namaProgram: e.target.value })}
                  placeholder="Contoh: Operasi Semut Bersih dan Sayangi Tanaman"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formData.kategori}
                    onChange={(e: any) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    <option value="Pembiasaan Harian">Pembiasaan Harian</option>
                    <option value="Program Cinta Lingkungan">Program Cinta Lingkungan</option>
                    <option value="Gotong Royong">Gotong Royong</option>
                    <option value="Kemitraan Keluarga & Kantin">Kemitraan Keluarga & Kantin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dimensi Panca Cinta</label>
                  <select
                    value={formData.dimensiPancaCinta}
                    onChange={(e: any) => setFormData({ ...formData, dimensiPancaCinta: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    {pancaCintaList.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hasil Terukur Nyata</label>
                  <input
                    type="text"
                    required
                    value={formData.hasilTerukur}
                    onChange={(e) => setFormData({ ...formData, hasilTerukur: e.target.value })}
                    placeholder="Contoh: 12 kg botol plastik terpilah"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Partisipan</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.jumlahPartisipan}
                    onChange={(e) => setFormData({ ...formData, jumlahPartisipan: Number(e.target.value) || 27 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Refleksi & Dampak Perilaku</label>
                <textarea
                  rows={2}
                  required
                  value={formData.catatanRefleksi}
                  onChange={(e) => setFormData({ ...formData, catatanRefleksi: e.target.value })}
                  placeholder="Ceritakan perubahan sikap atau antusiasme siswa..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
