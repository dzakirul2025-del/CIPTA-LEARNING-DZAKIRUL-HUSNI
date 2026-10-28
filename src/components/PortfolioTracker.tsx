import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PortfolioItem, SubjectId } from '../types';
import { 
  Award, 
  Layers, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  FileText, 
  Heart, 
  Trees, 
  PlusCircle, 
  X,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PortfolioTracker: React.FC = () => {
  const { portfolios, addPortfolio, reviewPortfolio, role, currentStudent, subjects, showToast } = useApp();

  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterLadder, setFilterLadder] = useState<number | 'all'>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState<PortfolioItem | null>(null);

  // Submit Portfolio form
  const [formSubjectId, setFormSubjectId] = useState<SubjectId>('ipas');
  const [formJudulKarya, setFormJudulKarya] = useState('');
  const [formLadder, setFormLadder] = useState<1 | 2 | 3 | 4 | 5 | 6>(4);
  const [formCategory, setFormCategory] = useState<'Foto Karya' | 'Laporan Aksi Nyata' | 'Hasil Eksperimen' | 'Presentasi' | 'Jurnal Refleksi'>('Laporan Aksi Nyata');
  const [formDescription, setFormDescription] = useState('');
  const [formReflection, setFormReflection] = useState('');

  // Teacher Review inputs
  const [reviewStatus, setReviewStatus] = useState<'Disetujui' | 'Perlu Perbaikan'>('Disetujui');
  const [reviewFeedback, setReviewFeedback] = useState('Karya yang mengesankan! Menggabungkan penalaran sains, empati sosial, dan tindakan nyata.');
  const [scorePemahaman, setScorePemahaman] = useState<number>(4);
  const [scoreKeterampilan, setScoreKeterampilan] = useState<number>(4);
  const [scoreKarakter, setScoreKarakter] = useState<number>(4);
  const [scoreDampak, setScoreDampak] = useState<number>(4);

  const ladderSteps = [
    { level: 1, label: '1. Memahami Konsep', desc: 'Membangun pemahaman prinsip dan esensi materi' },
    { level: 2, label: '2. Menerapkan Konsep', desc: 'Menggunakan pemahaman pada situasi terstruktur' },
    { level: 3, label: '3. Mempraktikkan Keterampilan', desc: 'Melakukan demonstrasi, pengamatan atau eksperimen' },
    { level: 4, label: '4. Menghasilkan Karya/Solusi', desc: 'Menciptakan karya atau solusi kontekstual' },
    { level: 5, label: '5. Melaksanakan Aksi Nyata', desc: 'Menerapkan tindakan nyata di madrasah & lingkungan' },
    { level: 6, label: '6. Merefleksikan Dampak', desc: 'Mengevaluasi manfaat dan rencana keberlanjutan' },
  ];

  const filteredPortfolios = portfolios.filter(p => {
    const matchesSubject = filterSubject === 'all' || p.subjectId === filterSubject;
    const matchesLadder = filterLadder === 'all' || p.tanggaKompetensi === filterLadder;
    return matchesSubject && matchesLadder;
  });

  const handleSubmitPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;

    addPortfolio({
      studentId: currentStudent.id,
      namaSiswa: currentStudent.namaLengkap,
      subjectId: formSubjectId,
      judulKarya: formJudulKarya,
      tanggal: new Date().toISOString().split('T')[0],
      tanggaKompetensi: formLadder,
      tanggaLabel: ladderSteps.find(l => l.level === formLadder)?.label || 'Karya Kompetensi',
      deskripsi: formDescription,
      kategori: formCategory,
      refleksiSiswa: formReflection,
      statusReview: 'Menunggu Review'
    });

    setIsSubmitModalOpen(false);
    setFormJudulKarya('');
    setFormDescription('');
    setFormReflection('');
  };

  const handleConfirmReview = () => {
    if (!selectedItemForReview) return;
    reviewPortfolio(
      selectedItemForReview.id,
      reviewStatus,
      reviewFeedback,
      {
        pemahaman: scorePemahaman,
        keterampilan: scoreKeterampilan,
        karakterCinta: scoreKarakter,
        dampakLingkungan: scoreDampak
      }
    );

    if (reviewStatus === 'Disetujui') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    setSelectedItemForReview(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Tangga Penguasaan Kompetensi
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Autentik • Berbasis Bukti • Bukan Sekadar Nilai Angka
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Portofolio, Aksi Nyata & Refleksi Siswa
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Siswa mendokumentasikan bukti belajar pada 6 tingkatan penguasaan: dari memahami konsep hingga menghasilkan karya, melaksanakan aksi nyata, dan merefleksikan dampaknya bagi diri sendiri, sesama, serta lingkungan hidup.
          </p>
        </div>

        {role === 'siswa' && (
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Serahkan Bukti Karya
          </button>
        )}
      </div>

      {/* 6-Stage Mastery Ladder Visualizer */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600" />
          Tangga 6 Tingkat Penguasaan Kompetensi CIPTA
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ladderSteps.map((step) => {
            const countInStep = portfolios.filter(p => p.tanggaKompetensi === step.level).length;
            const isFilterActive = filterLadder === step.level;
            return (
              <button
                key={step.level}
                type="button"
                onClick={() => setFilterLadder(isFilterActive ? 'all' : step.level)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isFilterActive
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase">Tingkat {step.level}</div>
                <div className="font-bold text-xs text-slate-900 mt-0.5 line-clamp-1">{step.label.split('.')[1]}</div>
                <div className="text-[10px] text-slate-500 mt-1">{countInStep} Karya Siswa</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Portfolio Cards Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Koleksi Portofolio ({filteredPortfolios.length})
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <option value="all">Semua Mata Pelajaran</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortfolios.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.tanggaLabel}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.statusReview === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.statusReview}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {item.judulKarya}
                </h3>
                <div className="text-xs text-slate-500 mt-1">
                  Oleh: <strong>{item.namaSiswa}</strong> • {item.kategori}
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {item.deskripsi}
                </p>

                {item.refleksiSiswa && (
                  <div className="mt-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-950">
                    <span className="font-semibold text-emerald-900">Refleksi Diri Siswa:</span>
                    <p className="italic mt-0.5">"{item.refleksiSiswa}"</p>
                  </div>
                )}

                {item.umpanBalikGuru && (
                  <div className="mt-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-blue-950">
                    <span className="font-semibold text-blue-900">Catatan Guru:</span>
                    <p className="mt-0.5">{item.umpanBalikGuru}</p>
                  </div>
                )}
              </div>

              {/* Rubric Score Badge or Review Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {item.skorRubrik ? (
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>Rubrik: {Math.round((item.skorRubrik.pemahaman + item.skorRubrik.keterampilan + item.skorRubrik.karakterCinta + item.skorRubrik.dampakLingkungan) / 4 * 25)} / 100</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">Belum dinilai rubrik</span>
                )}

                {role === 'guru' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItemForReview(item);
                      setReviewFeedback(item.umpanBalikGuru || 'Karya yang sangat bermakna dan mencerminkan akhlak mulia.');
                    }}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Tinjau & Beri Nilai
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Siswa Kirim Karya Portofolio */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Serahkan Bukti Karya / Aksi Nyata</h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPortfolio} className="space-y-4 mt-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
                <select
                  value={formSubjectId}
                  onChange={(e: any) => setFormSubjectId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                >
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Karya / Aksi Nyata</label>
                <input
                  type="text"
                  required
                  value={formJudulKarya}
                  onChange={(e) => setFormJudulKarya(e.target.value)}
                  placeholder="Contoh: Membuat Pot Gantung Hidroponik Botol Bekas"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tangga Kompetensi</label>
                  <select
                    value={formLadder}
                    onChange={(e: any) => setFormLadder(Number(e.target.value) as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    {ladderSteps.map(st => (
                      <option key={st.level} value={st.level}>{st.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Bukti</label>
                  <select
                    value={formCategory}
                    onChange={(e: any) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    <option value="Foto Karya">Foto Karya</option>
                    <option value="Laporan Aksi Nyata">Laporan Aksi Nyata</option>
                    <option value="Hasil Eksperimen">Hasil Eksperimen</option>
                    <option value="Presentasi">Presentasi</option>
                    <option value="Jurnal Refleksi">Jurnal Refleksi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Karya / Proses Pengerjaan</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ceritakan alat bahan dan bagaimana kamu mengerjakannya..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Refleksi Hati Siswa (Perasaan, Hikmah & Nilai Cinta)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formReflection}
                  onChange={(e) => setFormReflection(e.target.value)}
                  placeholder="Apa manfaat yang kamu rasakan bagi diri dan lingkungan madrasah?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Kirim Karya
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Guru Review & Nilai Rubrik Portofolio */}
      {selectedItemForReview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Evaluasi Rubrik Portofolio Guru</h3>
              <button onClick={() => setSelectedItemForReview(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="font-bold text-slate-900">{selectedItemForReview.judulKarya}</div>
                <div className="text-xs text-slate-500">Siswa: {selectedItemForReview.namaSiswa} • {selectedItemForReview.tanggaLabel}</div>
              </div>

              {/* Rubric 4 Criteria */}
              <div className="space-y-3">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Rubrik Penilaian 4 Dimensi Autentik (Skor 1 - 4):
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>1. Pemahaman Konsep (Understanding):</span>
                    <strong className="text-emerald-700">{scorePemahaman} / 4</strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={scorePemahaman}
                    onChange={(e) => setScorePemahaman(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>2. Keterampilan Praktik / Aksi:</span>
                    <strong className="text-emerald-700">{scoreKeterampilan} / 4</strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={scoreKeterampilan}
                    onChange={(e) => setScoreKeterampilan(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>3. Nilai Karakter Cinta (KBC):</span>
                    <strong className="text-emerald-700">{scoreKarakter} / 4</strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={scoreKarakter}
                    onChange={(e) => setScoreKarakter(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>4. Dampak Lingkungan / Ekoteologi:</span>
                    <strong className="text-emerald-700">{scoreDampak} / 4</strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={scoreDampak}
                    onChange={(e) => setScoreDampak(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Umpan Balik Guru yang Humanis</label>
                <textarea
                  rows={2}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Keputusan</label>
                  <select
                    value={reviewStatus}
                    onChange={(e: any) => setReviewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="Disetujui">Disetujui</option>
                    <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItemForReview(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReview}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Simpan Review & Skor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
