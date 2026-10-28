import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionItem, AssessmentPackage, QuestionType, PancaCintaType } from '../types';
import { 
  Sparkles, 
  Sliders, 
  Layers, 
  CheckCircle, 
  FileCheck, 
  Copy, 
  Printer, 
  Download, 
  ArrowRight, 
  RefreshCw, 
  Heart, 
  Trees, 
  Plus, 
  Minus, 
  Check, 
  Edit3, 
  Trash2,
  Clock,
  BookOpen,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AutoQuestionGenerator: React.FC = () => {
  const { 
    subjects, 
    addBulkQuestions, 
    addAssessment, 
    config, 
    setCurrentScreen, 
    showToast 
  } = useApp();

  // Primary Configuration
  const [subjectId, setSubjectId] = useState<string>('ipas');
  const [topik, setTopik] = useState<string>('Keseimbangan Ekosistem & Konservasi Sumber Daya Air Paser');
  const [targetTp, setTargetTp] = useState<string>('Menganalisis interaksi ekosistem lokal dan mempraktikkan konservasi air wudhu');
  
  // Manual Question Count (1 to 200)
  const [manualCount, setManualCount] = useState<number>(20);

  // Difficulty Distribution
  const [difficultyMode, setDifficultyMode] = useState<'Campuran' | 'Mudah' | 'Sedang' | 'HOTS / Sulit'>('Campuran');

  // Selected Question Formats (out of 10 formats)
  const allFormats: { id: QuestionType; label: string; desc: string }[] = [
    { id: 'pilihan_ganda', label: 'Pilihan Ganda', desc: '1 opsi benar dari 4 pilihan' },
    { id: 'pilihan_ganda_kompleks', label: 'PG Kompleks', desc: 'Lebih dari 1 opsi benar' },
    { id: 'benar_salah', label: 'Benar / Salah', desc: 'Evaluasi kebenaran pernyataan' },
    { id: 'menjodohkan', label: 'Menjodohkan', desc: 'Memasangkan konsep dan definisi' },
    { id: 'isian_singkat', label: 'Isian Singkat', desc: 'Jawaban kata atau angka pasti' },
    { id: 'uraian', label: 'Uraian Mendalam', desc: 'Penalaran dan penjelasan runtut' },
    { id: 'berbasis_gambar', label: 'Berbasis Gambar', desc: 'Stimulus visual atau diagram' },
    { id: 'kontekstual', label: 'Soal Kontekstual', desc: 'Studi kasus nyata madrasah' },
    { id: 'tugas_praktik', label: 'Tugas Praktik', desc: 'Kinerja demonstrasi lapangan' },
    { id: 'penilaian_produk', label: 'Penilaian Produk', desc: 'Rubrik karya atau poster' }
  ];

  const [selectedFormats, setSelectedFormats] = useState<QuestionType[]>([
    'pilihan_ganda',
    'pilihan_ganda_kompleks',
    'benar_salah',
    'isian_singkat',
    'uraian'
  ]);

  // Pedagogical Toggles
  const [withEcoTheology, setWithEcoTheology] = useState<boolean>(true);
  const [selectedPancaCinta, setSelectedPancaCinta] = useState<PancaCintaType[]>([
    'Cinta Allah SWT dan Rasul-Nya',
    'Cinta Ilmu',
    'Cinta Lingkungan'
  ]);

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionItem[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);

  // Quick preset counts
  const countPresets = [
    { count: 5, label: '5 Butir', desc: 'Kuis Harian / Apersepsi (10 Menit)' },
    { count: 10, label: '10 Butir', desc: 'Formatif / LKPD (25 Menit)' },
    { count: 20, label: '20 Butir', desc: 'Penilaian Harian (UH) (45 Menit)' },
    { count: 40, label: '40 Butir', desc: 'ASTS / PTS Semester (60-90 Menit)' },
    { count: 50, label: '50 Butir', desc: 'ASAS / PAS Semester (90-120 Menit)' },
    { count: 100, label: '100 Butir', desc: 'Tryout & Ujian Madrasah' },
    { count: 200, label: '200 Butir', desc: 'Paket Bank Soal Lengkap' }
  ];

  const toggleFormat = (fmt: QuestionType) => {
    if (selectedFormats.includes(fmt)) {
      if (selectedFormats.length > 1) {
        setSelectedFormats(selectedFormats.filter(f => f !== fmt));
      } else {
        showToast('Paling sedikit 1 bentuk soal harus dipilih', 'info');
      }
    } else {
      setSelectedFormats([...selectedFormats, fmt]);
    }
  };

  const handleAdjustCount = (delta: number) => {
    setManualCount(prev => Math.min(200, Math.max(1, prev + delta)));
  };

  // Run generation
  const handleStartAutoGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep('Menganalisis Alur Tujuan Pembelajaran & Dimensi Panca Cinta...');

    try {
      const selectedSubject = subjects.find(s => s.id === subjectId);
      
      const res = await fetch('/api/ai/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: selectedSubject?.nama || 'IPAS',
          topik,
          jumlahSoal: manualCount,
          bentukSoal: selectedFormats,
          tingkatKesulitan: difficultyMode,
          sertakanEkoteologi: withEcoTheology
        })
      });

      const data = await res.json();
      if (data.success && data.questions) {
        setGeneratedQuestions(data.questions);
        confetti({
          particleCount: 60,
          spread: 55,
          origin: { y: 0.6 }
        });
        showToast(`Berhasil merakit otomatis ${data.questions.length} butir soal (${data.source === 'ai-live' ? 'Live Gemini AI' : 'Mesin Asesmen Terstandar'})!`, 'success');
      } else {
        throw new Error(data.error || 'Gagal menghasilkan butir soal');
      }
    } catch (err: any) {
      console.error(err);
      showToast('Gagal memproses pembuatan soal otomatis', 'error');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Bulk Action 1: Simpan ke Bank Soal
  const handleSaveToBank = () => {
    if (generatedQuestions.length === 0) return;
    addBulkQuestions(generatedQuestions);
    showToast(`${generatedQuestions.length} butir soal berhasil ditambahkan ke Bank Soal Madrasah`, 'success');
    setCurrentScreen('assessments');
  };

  // Bulk Action 2: Jadikan Paket Ujian Baru Siap CBT
  const handleMakeExamPackage = () => {
    if (generatedQuestions.length === 0) return;

    // First save questions to bank so IDs are registered
    addBulkQuestions(generatedQuestions);

    const estDuration = Math.max(30, Math.round(generatedQuestions.length * 2.2));
    const selectedSubject = subjects.find(s => s.id === subjectId);

    const newPackage: AssessmentPackage = {
      id: `asm-auto-${Date.now()}`,
      judul: `Paket Asesmen Otomatis ${selectedSubject?.nama || 'IPAS'}: ${topik} (${generatedQuestions.length} Soal)`,
      subjectId: subjectId as any,
      kelas: config.kelasUtama,
      semester: config.semesterAktif,
      durasiMenit: estDuration,
      totalSoal: generatedQuestions.length,
      soalIds: generatedQuestions.map(q => q.id),
      instruksi: 'Bacalah setiap soal dengan cermat dan berkesadaran. Jawaban Anda tersimpan otomatis setiap memilih opsi.',
      statusUjian: 'Aktif',
      kisiKisi: `Kisi-kisi otomatis: ${topik} dengan ${generatedQuestions.length} butir soal (${selectedFormats.join(', ')}). Mengintegrasikan Kurikulum Berbasis Cinta dan Ekoteologi.`
    };

    addAssessment(newPackage);
    showToast(`Paket ujian CBT "${newPackage.judul}" berhasil dibuat dan siap diujikan kepada siswa!`, 'success');
    setCurrentScreen('assessments');
  };

  // Calculate total score
  const totalMaxScore = generatedQuestions.reduce((sum, q) => sum + (q.skorMaksimal || 10), 0);
  const estimatedExamMinutes = Math.max(20, Math.round(manualCount * 2.2));

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Fitur Khusus Guru
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Generator Soal Otomatis • Jumlah Diatur Manual (1 s.d. 200 Butir)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Generator Soal Otomatis Berbasis Jumlah Manual
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Tentukan sendiri jumlah butir soal yang Anda butuhkan (5, 10, 20, 40, 50, 100, hingga 200 soal). Sistem secara cerdas merakit stimulus kontekstual, opsi jawaban acak, kunci jawaban terlindungi, pembahasan, dan rubrik penilaian autentik.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setCurrentScreen('assessments')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-slate-300"
          >
            Buka Bank Soal
          </button>
        </div>
      </div>

      {/* Main Generator Configuration Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Manual Controls & Settings */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Pengaturan Jumlah & Parameter Soal
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Dukungan 1 - 200 Butir
            </span>
          </div>

          {/* 1. MANUAL QUESTION COUNT STEPPER & SLIDER */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Jumlah Soal Yang Dibuat:
                </label>
                <div className="text-[11px] text-emerald-700">Dapat diketik atau digeser bebas</div>
              </div>
              <div className="text-3xl font-black font-mono text-emerald-900">
                {manualCount} <span className="text-xs font-semibold text-emerald-700">Butir</span>
              </div>
            </div>

            {/* Stepper Buttons and Direct Number Input */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleAdjustCount(-10)}
                className="px-2.5 py-1.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900"
                title="Kurangi 10 soal"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => handleAdjustCount(-1)}
                className="p-1.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-900"
                title="Kurangi 1 soal"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min={1}
                max={200}
                value={manualCount}
                onChange={(e) => setManualCount(Math.min(200, Math.max(1, Number(e.target.value) || 1)))}
                className="w-full text-center py-1.5 bg-white border border-emerald-400 rounded-lg font-black font-mono text-base text-emerald-950 focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="button"
                onClick={() => handleAdjustCount(1)}
                className="p-1.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-900"
                title="Tambah 1 soal"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleAdjustCount(10)}
                className="px-2.5 py-1.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900"
                title="Tambah 10 soal"
              >
                +10
              </button>
            </div>

            {/* Interactive Slider */}
            <div>
              <input
                type="range"
                min={1}
                max={200}
                value={manualCount}
                onChange={(e) => setManualCount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-emerald-800 font-semibold mt-0.5">
                <span>1 Butir</span>
                <span>50 Butir</span>
                <span>100 Butir</span>
                <span>200 Butir</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-emerald-200/60">
              <span className="text-[11px] font-bold text-emerald-900 block mb-1.5">
                Preset Jumlah Rekomendasi:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {countPresets.map((preset) => (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => setManualCount(preset.count)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      manualCount === preset.count
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}
                    title={preset.desc}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. SUBJECT & TOPIC */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold"
              >
                {subjects.map(s => <option key={s.id} value={s.id}>{s.nama} ({s.fase})</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Topik / Materi Pokok</label>
              <input
                type="text"
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                placeholder="Contoh: Menghitung Volume Wadah Kompos Daun atau Ekosistem Gambut Paser"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* 3. QUESTION TYPES DISTRIBUTION */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Pilih Ragam Bentuk Soal ({selectedFormats.length} dari 10 Bentuk Aktif):
              </label>
              <button
                type="button"
                onClick={() => {
                  if (selectedFormats.length === allFormats.length) {
                    setSelectedFormats(['pilihan_ganda']);
                  } else {
                    setSelectedFormats(allFormats.map(f => f.id));
                  }
                }}
                className="text-[10px] text-emerald-700 font-bold hover:underline"
              >
                {selectedFormats.length === allFormats.length ? 'Pilih PG Saja' : 'Pilih Semua (10 Bentuk)'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {allFormats.map((fmt) => {
                const isSelected = selectedFormats.includes(fmt.id);
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => toggleFormat(fmt.id)}
                    className={`p-2 rounded-xl border text-left text-xs transition-all flex items-start gap-2 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                    <span className="truncate">{fmt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. DIFFICULTY LEVEL MODE */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Komposisi Tingkat Kesulitan:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'Campuran', label: 'Standar Kemenag', desc: '30% Mudah, 50% Sedang, 20% HOTS' },
                { id: 'Mudah', label: 'Fokus Mudah', desc: 'Penguasaan konsep dasar' },
                { id: 'Sedang', label: 'Fokus Sedang', desc: 'Penerapan konsep' },
                { id: 'HOTS / Sulit', label: 'Fokus HOTS', desc: 'Penalaran kritis tingkat tinggi' }
              ].map((diff) => (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => setDifficultyMode(diff.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    difficultyMode === diff.id
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{diff.label}</div>
                  <div className={`text-[10px] mt-0.5 line-clamp-1 ${difficultyMode === diff.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {diff.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. ECO-THEOLOGY & PANCA CINTA INTEGRATION */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={withEcoTheology}
                onChange={(e) => setWithEcoTheology(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span className="flex items-center gap-1 text-emerald-800">
                <Trees className="w-3.5 h-3.5" /> Insersi Ekoteologi Lokal Paser (Air Wudhu, Sampah, Hutan)
              </span>
            </label>
          </div>

          {/* ACTION BUTTON */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleStartAutoGenerate}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-60 text-white rounded-xl text-sm font-black shadow-md shadow-emerald-200 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Merakit Otomatis {manualCount} Butir Soal...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Otomatis {manualCount} Butir Soal Sekarang</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output Workspace & Actions */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">Hasil Perakitan Soal Otomatis</h3>
                  {generatedQuestions.length > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 font-mono">
                      {generatedQuestions.length} Soal Siap
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Estimasi Waktu Ujian: <strong>{estimatedExamMinutes} Menit</strong> • Total Skor Maksimal: <strong>{totalMaxScore} Poin</strong>
                </p>
              </div>

              {generatedQuestions.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                    title="Cetak Naskah Ujian"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Questions Container */}
            {generatedQuestions.length > 0 ? (
              <div className="space-y-3.5 max-h-[620px] overflow-y-auto pr-2 text-xs sm:text-sm">
                {generatedQuestions.map((q, idx) => (
                  <div key={q.id || idx} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 capitalize">
                          {q.bentuk.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                          q.tingkatKesulitan === 'HOTS / Sulit' ? 'bg-purple-100 text-purple-800' :
                          q.tingkatKesulitan === 'Sedang' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {q.tingkatKesulitan}
                        </span>
                        {q.dimensiEkoteologi && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded">
                            🌿 Ekoteologi
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-600">Skor: {q.skorMaksimal}</span>
                    </div>

                    {q.stimulus && (
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 italic">
                        {q.stimulus}
                      </div>
                    )}

                    <div className="font-semibold text-slate-900 leading-relaxed">
                      {q.pertanyaan}
                    </div>

                    {q.pilihanJawaban && q.pilihanJawaban.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.pilihanJawaban.map((opt, i) => (
                          <div key={i} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-start gap-2">
                            <span className="font-bold text-emerald-800">{opt.label}.</span>
                            <span>{opt.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-emerald-700">Kunci:</span>
                        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {Array.isArray(q.kunciJawaban) ? q.kunciJawaban.join(', ') : q.kunciJawaban}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 italic truncate max-w-xs">
                        Pembahasan: {q.pembahasan}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl p-6">
                <Sparkles className="w-12 h-12 text-slate-300 mb-2" />
                <div className="font-bold text-slate-700 text-base">Belum Ada Soal Yang Dibuat</div>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Atur jumlah butir soal yang Anda inginkan (misalnya <strong>20 butir</strong> atau <strong>50 butir</strong>), lalu klik tombol <strong>"Generate Otomatis Sekarang"</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action Buttons */}
          {generatedQuestions.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
              <div className="text-xs text-slate-500 font-medium">
                Pilih aksi untuk {generatedQuestions.length} butir soal ini:
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveToBank}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Simpan ke Bank Soal</span>
                </button>

                <button
                  type="button"
                  onClick={handleMakeExamPackage}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Jadikan Paket Ujian (Siap CBT)</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
