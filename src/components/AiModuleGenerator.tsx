import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CiptaModule, PancaCintaType } from '../types';
import { 
  Sparkles, 
  BookOpen, 
  Send, 
  Layers, 
  FileText, 
  CheckCircle, 
  Copy, 
  Printer, 
  Clock, 
  RefreshCw,
  Heart,
  Trees,
  Check
} from 'lucide-react';

export const AiModuleGenerator: React.FC = () => {
  const { addModule, subjects, config, setCurrentScreen, showToast } = useApp();

  const [subjectId, setSubjectId] = useState<string>('ipas');
  const [topik, setTopik] = useState<string>('Konservasi Ekosistem Mangrove & Sungai Kandilo Paser');
  const [alokasiWaktu, setAlokasiWaktu] = useState<string>('3 JP (3 x 35 Menit)');
  const [tujuanKompetensi, setTujuanKompetensi] = useState<string>('Siswa mampu menganalisis siklus air bersih, mempraktikkan penghematan air wudhu, dan merawat tanaman madrasah');
  const [konteksEkoteologi, setKonteksEkoteologi] = useState<string>('Pelestarian air wudhu dan pencegahan sampah plastik di lingkungan MIN 1 Paser');
  
  const [selectedPancaCinta, setSelectedPancaCinta] = useState<PancaCintaType[]>([
    'Cinta Allah SWT dan Rasul-Nya',
    'Cinta Lingkungan',
    'Cinta Ilmu'
  ]);

  const [documentType, setDocumentType] = useState<string>('Modul Ajar Lengkap 6 Tahap CIPTA');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // 25 Document Formats as requested by Bagian 11
  const documentOptions = [
    'Modul Ajar Lengkap 6 Tahap CIPTA',
    'Analisis Capaian Pembelajaran (CP)',
    'Rumusan Tujuan Pembelajaran (TP)',
    'Alur Tujuan Pembelajaran (ATP)',
    'Rencana Pelaksanaan Pembelajaran (RPP/Modul)',
    'Bahan Ajar Siswa',
    'Media Pembelajaran & Peraga',
    'Lembar Kerja Peserta Didik (LKPD)',
    'Kisi-kisi Asesmen',
    'Kartu Soal Terstandar',
    'Naskah Soal Ujian',
    'Kunci Jawaban Resmi',
    'Pembahasan Mendalam Soal',
    'Rubrik Penilaian Multi-Kriteria',
    'Instrumen Asesmen Diagnostik Awal',
    'Instrumen Asesmen Formatif Berkesadaran',
    'Instrumen Asesmen Sumatif Akhir',
    'Panduan Pembelajaran Remedial',
    'Panduan Pembelajaran Pengayaan',
    'Lembar Refleksi Guru',
    'Jurnal Refleksi Siswa Berkesadaran',
    'Modul Proyek Kolaboratif (Kokurikuler)',
    'Instrumen Aksi Nyata Lingkungan',
    'Instrumen Evaluasi Portofolio',
    'Laporan Capaian Kompetensi Siswa'
  ];

  const pancaCintaList: PancaCintaType[] = [
    'Cinta Allah SWT dan Rasul-Nya',
    'Cinta Ilmu',
    'Cinta Lingkungan',
    'Cinta Diri dan Sesama',
    'Cinta Tanah Air'
  ];

  const togglePancaCinta = (item: PancaCintaType) => {
    if (selectedPancaCinta.includes(item)) {
      setSelectedPancaCinta(selectedPancaCinta.filter(p => p !== item));
    } else {
      setSelectedPancaCinta([...selectedPancaCinta, item]);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const selectedSubject = subjects.find(s => s.id === subjectId);
      const res = await fetch('/api/ai/generate-module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: selectedSubject?.nama || 'IPAS',
          topik,
          fase: config.fase,
          kelas: config.kelasUtama,
          semester: config.semesterAktif,
          alokasiWaktu,
          tujuanKompetensi,
          pancaCinta: selectedPancaCinta,
          prinsipMendalam: ['Berkesadaran (Mindful)', 'Bermakna (Meaningful)', 'Menggembirakan (Joyful)'],
          konteksEkoteologi,
          documentType,
        })
      });

      const data = await res.json();
      if (data.success && data.module) {
        setGeneratedResult(data.module);
        showToast(`Dokumen "${documentType}" berhasil dirancang (${data.source === 'ai-live' ? 'Live Gemini AI' : 'Mesin Kurikulum'})`, 'success');
      } else {
        throw new Error(data.error || 'Gagal menghasilkan modul');
      }
    } catch (err: any) {
      console.error(err);
      showToast('Terjadi kesalahan saat memproses generator AI', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToModules = () => {
    if (!generatedResult) return;
    const newMod: CiptaModule = {
      ...generatedResult,
      id: `mod-ai-${Date.now()}`,
      subjectId: subjectId as any,
      kelas: config.kelasUtama,
      semester: config.semesterAktif,
      status: 'Draf AI',
      tanggalUpdate: new Date().toISOString().split('T')[0]
    };
    addModule(newMod);
    setCurrentScreen('modules');
  };

  const handleCopyText = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(JSON.stringify(generatedResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Teks dokumen disalin ke papan klip', 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Curriculum Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Model: gemini-3.8-flash (Server-Side Proxy)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Generator Perangkat Ajar & Dokumen Kurikulum (25 Format)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Menghasilkan Modul Ajar 6 Tahap CIPTA, analisis CP, ATP, LKPD, kisi-kisi, rubrik penilaian autentik, hingga instrumen portofolio dan aksi nyata ekoteologi MIN 1 Paser.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Generator Input Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Parameter Perangkat Ajar
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Jenis Dokumen Yang Diinginkan (Pilih dari 25 Format)
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              {documentOptions.map((doc, idx) => (
                <option key={idx} value={doc}>
                  #{idx + 1}. {doc}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.nama}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Alokasi Waktu</label>
              <input
                type="text"
                value={alokasiWaktu}
                onChange={(e) => setAlokasiWaktu(e.target.value)}
                placeholder="3 JP (3 x 35 Menit)"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Topik / Materi Pokok</label>
            <input
              type="text"
              value={topik}
              onChange={(e) => setTopik(e.target.value)}
              placeholder="Contoh: Kubikasi Wadah Kompos atau Keseimbangan Air"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tujuan Kompetensi Akhir</label>
            <textarea
              rows={2}
              value={tujuanKompetensi}
              onChange={(e) => setTujuanKompetensi(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              Pilih Dimensi Panca Cinta KBC Kemenag
            </label>
            <div className="flex flex-wrap gap-1.5">
              {pancaCintaList.map((kbc) => {
                const isSelected = selectedPancaCinta.includes(kbc);
                return (
                  <button
                    key={kbc}
                    type="button"
                    onClick={() => togglePancaCinta(kbc)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {kbc}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Trees className="w-3.5 h-3.5 text-emerald-600" />
              Konteks Ekoteologi Lokal Paser
            </label>
            <input
              type="text"
              value={konteksEkoteologi}
              onChange={(e) => setKonteksEkoteologi(e.target.value)}
              placeholder="Konservasi Sungai Kandilo, Hutan Gambut, Air Wudhu"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm"
            />
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleGenerate}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Merancang Dokumen...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Rancang Dokumen Sekarang</span>
              </>
            )}
          </button>
        </div>

        {/* Generator Output Preview */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Hasil Rancangan Dokumen</h3>
                <span className="text-xs text-slate-500">Status: Draf AI • Format: {documentType}</span>
              </div>

              {generatedResult && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                    title="Salin JSON"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                    title="Cetak"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {generatedResult ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 text-xs sm:text-sm">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="font-bold text-emerald-950 text-base">{generatedResult.judul}</div>
                  <div className="text-emerald-800 text-xs mt-1">
                    <strong>Tujuan:</strong> {generatedResult.tujuanPembelajaran}
                  </div>
                  <div className="text-emerald-700 text-xs mt-0.5">
                    <strong>Fase/Kelas:</strong> {config.fase} / {config.kelasUtama} • {generatedResult.alokasiWaktu || alokasiWaktu}
                  </div>
                </div>

                {/* 6 Stages list */}
                {generatedResult.tahapan && (
                  <div className="space-y-2.5">
                    <div className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                      Struktur 6 Tahap Operasional CIPTA Learning:
                    </div>
                    {generatedResult.tahapan.map((st: any, i: number) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{st.namaTahap}</span>
                          <span className="text-[11px] text-emerald-700">{st.alokasiMenit} Menit</span>
                        </div>
                        <div className="text-slate-600 mt-1">
                          <strong>Aktivitas Siswa:</strong> {st.aktivitasSiswa}
                        </div>
                        {st.pertanyaanPemantik && (
                          <div className="text-amber-800 mt-1">
                            <strong>Pemantik:</strong> "{st.pertanyaanPemantik[0]}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* LKPD / Rubrik Preview */}
                {generatedResult.lkpdKonten && (
                  <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs font-mono whitespace-pre-line">
                    <div className="font-bold text-blue-900 font-sans mb-1">Draf LKPD Siap Pakai:</div>
                    {generatedResult.lkpdKonten}
                  </div>
                )}

                {generatedResult.rubrikPenilaian && (
                  <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200 text-xs font-mono whitespace-pre-line">
                    <div className="font-bold text-amber-900 font-sans mb-1">Draf Rubrik Penilaian:</div>
                    {generatedResult.rubrikPenilaian}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-6">
                <Sparkles className="w-10 h-10 text-slate-300 mb-2" />
                <div className="font-semibold text-slate-600 text-sm">Belum Ada Dokumen Dihasilkan</div>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Pilih parameter kurikulum di sebelah kiri dan klik tombol <strong>"Rancang Dokumen Sekarang"</strong>.
                </p>
              </div>
            )}
          </div>

          {generatedResult && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-xs text-slate-500 font-medium">
                Siap disimpan ke daftar modul ajar madrasah
              </span>
              <button
                type="button"
                onClick={handleSaveToModules}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" /> Simpan ke Bank Modul CIPTA
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
