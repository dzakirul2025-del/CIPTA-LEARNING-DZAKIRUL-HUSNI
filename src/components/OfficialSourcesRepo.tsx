import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OfficialSource } from '../types';
import { 
  Library, 
  ExternalLink, 
  CheckCircle, 
  ShieldCheck, 
  FileText, 
  PlusCircle, 
  Calendar, 
  Search, 
  X,
  AlertCircle
} from 'lucide-react';

export const OfficialSourcesRepo: React.FC = () => {
  const { officialSources, addOfficialSource, role, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    judul: '',
    nomorDokumen: '',
    penerbit: '',
    tahun: '2025',
    url: '',
    ringkasan: '',
    kategori: 'Regulasi Kemenag' as any,
    statusVerifikasi: 'Resmi Terverifikasi' as any,
    tanggalPeriksa: new Date().toISOString().split('T')[0]
  });

  const filteredSources = officialSources.filter(s => {
    const matchesSearch = s.judul.toLowerCase().includes(searchQuery.toLowerCase()) || s.nomorDokumen.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || s.kategori === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Validitas & Akuntabilitas
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Acuan Primer Kemenag & Kemendikdasmen
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Repositori Dokumen Regulasi Resmi & Kurikulum
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Memastikan setiap materi, indikator, dan modul berpijak pada regulasi resmi Kementerian Agama RI dan Kementerian Pendidikan Dasar dan Menengah. Membedakan secara transparan antara regulasi resmi, draf AI, dan hasil observasi aktual.
          </p>
        </div>

        {role === 'admin' && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Tambah Sumber Acuan
          </button>
        )}
      </div>

      {/* Distinction Guide Box */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white rounded-xl border border-emerald-200">
          <div className="font-bold text-emerald-800">1. Regulasi Resmi</div>
          <p className="text-[11px] text-slate-600 mt-0.5">Keputusan Dirjen, BSKAP, dan pedoman kementerian yang berkekuatan hukum.</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-blue-200">
          <div className="font-bold text-blue-800">2. Input Guru Pengajar</div>
          <p className="text-[11px] text-slate-600 mt-0.5">Rancangan pembelajaran kontekstual yang disusun oleh guru kelas VI-C.</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-purple-200">
          <div className="font-bold text-purple-800">3. Draf AI Engine</div>
          <p className="text-[11px] text-slate-600 mt-0.5">Usulan materi yang dihasilkan kecerdasan buatan, wajib ditelaah oleh guru.</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-amber-200">
          <div className="font-bold text-amber-800">4. Data Observasi Lapangan</div>
          <p className="text-[11px] text-slate-600 mt-0.5">Data terukur nyata dari tim madrasah, bukan rekaan angka fiktif.</p>
        </div>
      </div>

      {/* Filter and Document List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari regulasi atau nomor dokumen..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
            >
              <option value="all">Semua Kategori Regulasi</option>
              <option value="Regulasi Kemenag">Regulasi Kemenag</option>
              <option value="Pedoman Kurikulum">Pedoman Kurikulum</option>
              <option value="Ekoteologi">Ekoteologi Islam</option>
              <option value="Dokumen Madrasah">Dokumen Internal Madrasah</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSources.map((src) => (
            <div key={src.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                    {src.kategori}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    {src.statusVerifikasi}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {src.judul}
                </h3>
                <div className="text-xs font-mono font-medium text-emerald-950 mt-1">
                  {src.nomorDokumen}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Penerbit: <strong>{src.penerbit}</strong> • Tahun {src.tahun}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {src.ringkasan}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Diperiksa: {src.tanggalPeriksa}</span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Buka Tautan Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Document */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Tambah Dokumen Acuan Resmi</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              addOfficialSource(formData);
              setIsModalOpen(false);
            }} className="space-y-4 mt-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Dokumen</label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Panduan Kurikulum Berbasis Cinta (KBC)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Regulasi / Dokumen</label>
                <input
                  type="text"
                  required
                  value={formData.nomorDokumen}
                  onChange={(e) => setFormData({ ...formData, nomorDokumen: e.target.value })}
                  placeholder="Contoh: Keputusan Dirjen Pendis No. 6077 Tahun 2025"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Penerbit</label>
                  <input
                    type="text"
                    required
                    value={formData.penerbit}
                    onChange={(e) => setFormData({ ...formData, penerbit: e.target.value })}
                    placeholder="Direktorat Jenderal Pendis Kemenag RI"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Terbit</label>
                  <input
                    type="text"
                    required
                    value={formData.tahun}
                    onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan Isi & Manfaat Pedagogis</label>
                <textarea
                  rows={3}
                  required
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
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
                  Simpan Acuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
