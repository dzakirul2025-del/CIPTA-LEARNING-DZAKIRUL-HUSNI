import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionItem, AssessmentPackage, StudentExamAttempt, QuestionType } from '../types';
import { 
  FileCheck, 
  PlusCircle, 
  Sparkles, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Award, 
  HelpCircle, 
  Printer, 
  Eye, 
  Edit3, 
  Trash2, 
  X,
  ChevronLeft,
  ChevronRight,
  Flag,
  Save,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AssessmentStudio: React.FC = () => {
  const { 
    questions, 
    addQuestion, 
    addBulkQuestions, 
    assessments, 
    addAssessment, 
    attempts, 
    recordAttempt, 
    gradeEssayAttempt,
    role, 
    currentStudent, 
    subjects,
    config, 
    setCurrentScreen,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'packages' | 'bank' | 'generate' | 'grading'>('packages');
  
  // Search and filter for question bank
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Generator states (supporting up to 200 questions)
  const [genSubject, setGenSubject] = useState('IPAS');
  const [genTopic, setGenTopic] = useState('Ekosistem Air dan Konservasi Sungai Kandilo');
  const [genCount, setGenCount] = useState<number>(10);
  const [genDifficulty, setGenDifficulty] = useState('Sedang');
  const [isGenerating, setIsGenerating] = useState(false);

  // CBT Exam State for Student
  const [activeExam, setActiveExam] = useState<AssessmentPackage | null>(null);
  const [examQuestions, setExamQuestions] = useState<QuestionItem[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [doubtful, setDoubtful] = useState<Record<string, boolean>>({});
  const [remainingSeconds, setRemainingSeconds] = useState<number>(3600);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [latestAttemptResult, setLatestAttemptResult] = useState<StudentExamAttempt | null>(null);

  // Manual Grading Modal for Teacher
  const [selectedAttemptForGrading, setSelectedAttemptForGrading] = useState<StudentExamAttempt | null>(null);
  const [essayScoreInput, setEssayScoreInput] = useState<number>(15);
  const [teacherFeedbackInput, setTeacherFeedbackInput] = useState<string>('Jawaban uraian runtut, mencerminkan pemahaman bermakna dan empati yang baik.');

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase()) || q.topik.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'all' || q.subjectId === filterSubject;
    const matchesType = filterType === 'all' || q.bentuk === filterType;
    const matchesDifficulty = filterDifficulty === 'all' || q.tingkatKesulitan === filterDifficulty;
    return matchesSearch && matchesSubject && matchesType && matchesDifficulty;
  });

  // Timer effect for CBT exam
  useEffect(() => {
    if (!activeExam || isExamCompleted) return;
    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeExam, isExamCompleted]);

  // Start CBT Exam
  const handleStartExam = (pkg: AssessmentPackage) => {
    const pkgQuestions = questions.filter(q => pkg.soalIds.includes(q.id));
    setActiveExam(pkg);
    setExamQuestions(pkgQuestions.length > 0 ? pkgQuestions : questions.slice(0, pkg.totalSoal));
    setCurrentQIndex(0);
    setAnswers({});
    setDoubtful({});
    setRemainingSeconds(pkg.durasiMenit * 60);
    setIsExamCompleted(false);
    setLatestAttemptResult(null);
  };

  // Submit CBT Exam
  const handleSubmitExam = () => {
    if (!activeExam || !currentStudent) return;

    let objectiveScore = 0;
    let maxObjectiveScore = 0;

    examQuestions.forEach(q => {
      maxObjectiveScore += q.skorMaksimal;
      const studentAns = answers[q.id];

      if (q.bentuk === 'pilihan_ganda' || q.bentuk === 'benar_salah' || q.bentuk === 'berbasis_gambar' || q.bentuk === 'kontekstual') {
        if (studentAns === q.kunciJawaban) {
          objectiveScore += q.skorMaksimal;
        }
      } else if (q.bentuk === 'pilihan_ganda_kompleks' && Array.isArray(q.kunciJawaban)) {
        if (Array.isArray(studentAns) && studentAns.length === q.kunciJawaban.length && studentAns.every(v => q.kunciJawaban.includes(v))) {
          objectiveScore += q.skorMaksimal;
        }
      } else if (q.bentuk === 'isian_singkat') {
        if (typeof studentAns === 'string' && typeof q.kunciJawaban === 'string' && studentAns.trim().toLowerCase() === q.kunciJawaban.trim().toLowerCase()) {
          objectiveScore += q.skorMaksimal;
        }
      } else if (q.bentuk === 'menjodohkan') {
        if (studentAns === q.kunciJawaban) {
          objectiveScore += q.skorMaksimal;
        }
      }
    });

    const totalScore = objectiveScore;
    const percentage = Math.round((totalScore / maxObjectiveScore) * 100);

    const attempt: StudentExamAttempt = {
      id: `att-${Date.now()}`,
      assessmentId: activeExam.id,
      studentId: currentStudent.id,
      namaSiswa: currentStudent.namaLengkap,
      nisn: currentStudent.nisn,
      waktuMulai: new Date().toISOString(),
      waktuSelesai: new Date().toISOString(),
      status: 'Terkumpul',
      jawabanSiswa: answers,
      jawabanRagu: doubtful,
      skorObjektif: objectiveScore,
      skorUraianManual: 0,
      skorTotal: totalScore,
      skorMaksimal: maxObjectiveScore,
      persentaseNilai: percentage,
      statusRemedial: percentage < 75
    };

    recordAttempt(attempt);
    setLatestAttemptResult(attempt);
    setIsExamCompleted(true);

    if (percentage >= 75) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    showToast('Ujian Anda berhasil diserahkan dengan jujur dan tersimpan!', 'success');
  };

  // Generate Questions via AI or Question Bank Engine
  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: genSubject,
          topik: genTopic,
          jumlahSoal: genCount,
          tingkatKesulitan: genDifficulty,
          sertakanEkoteologi: true
        })
      });

      const data = await res.json();
      if (data.success && data.questions) {
        addBulkQuestions(data.questions);

        // Also optionally package into an assessment
        const newPkg: AssessmentPackage = {
          id: `asm-${Date.now()}`,
          judul: `Paket Asesmen ${genSubject}: ${genTopic} (${data.questions.length} Soal)`,
          subjectId: data.questions[0]?.subjectId || 'ipas',
          kelas: config.kelasUtama,
          semester: config.semesterAktif,
          durasiMenit: Math.max(30, Math.round(data.questions.length * 2.5)),
          totalSoal: data.questions.length,
          soalIds: data.questions.map((q: any) => q.id),
          instruksi: 'Kerjakan soal dengan cermat dan berkesadaran. Percayalah pada kemampuan dirimu.',
          statusUjian: 'Aktif',
          kisiKisi: `Kisi-kisi asesmen ${genSubject} mencakup materi ${genTopic} dengan 10 bentuk soal terintegrasi Panca Cinta dan Ekoteologi.`
        };
        addAssessment(newPkg);

        setActiveTab('packages');
        showToast(`Berhasil merakit paket asesmen ${data.questions.length} butir soal!`, 'success');
      } else {
        throw new Error(data.error || 'Gagal menghasilkan butir soal');
      }
    } catch (err: any) {
      console.error(err);
      showToast('Gagal menghasilkan butir soal', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // If active in CBT exam mode
  if (activeExam && !isExamCompleted) {
    const currentQ = examQuestions[currentQIndex];
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
      <div className="space-y-4">
        {/* Exam Navigation Top Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              CBT Ujian Aktif • {activeExam.judul}
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Peserta: <strong>{currentStudent?.namaLengkap}</strong> (NISN: {currentStudent?.nisn})
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
              remainingSeconds < 300 ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-slate-100 text-slate-800'
            }`}>
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin menyelesaikan dan mengumpulkan ujian sekarang?')) {
                  handleSubmitExam();
                }
              }}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              Kumpulkan Ujian
            </button>
          </div>
        </div>

        {/* Question Area & Navigator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Main Question Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Soal Nomor {currentQIndex + 1} dari {examQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 capitalize">
                  Bentuk: {currentQ.bentuk.replace('_', ' ')}
                </span>
                <button
                  type="button"
                  onClick={() => setDoubtful({ ...doubtful, [currentQ.id]: !doubtful[currentQ.id] })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    doubtful[currentQ.id]
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Flag className="w-3 h-3" />
                  <span>Ragu-ragu</span>
                </button>
              </div>
            </div>

            {/* Stimulus if any */}
            {currentQ.stimulus && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                {currentQ.stimulus}
              </div>
            )}

            {/* Question Text */}
            <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
              {currentQ.pertanyaan}
            </div>

            {/* Interactive Answer Input based on format */}
            <div className="space-y-2 pt-2">
              {/* Pilihan Ganda & Benar/Salah */}
              {(currentQ.bentuk === 'pilihan_ganda' || currentQ.bentuk === 'benar_salah' || currentQ.bentuk === 'berbasis_gambar' || currentQ.bentuk === 'kontekstual') && (
                <div className="space-y-2">
                  {currentQ.pilihanJawaban?.map((opt, i) => {
                    const isSelected = answers[currentQ.id] === opt.label;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAnswers({ ...answers, [currentQ.id]: opt.label })}
                        className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 font-medium'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {opt.label}
                        </span>
                        <span className="mt-0.5">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Pilihan Ganda Kompleks (Multi Select) */}
              {currentQ.bentuk === 'pilihan_ganda_kompleks' && (
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 mb-1 italic">Pilih opsi yang sesuai (dapat lebih dari satu):</div>
                  {currentQ.pilihanJawaban?.map((opt, i) => {
                    const currentSelected = Array.isArray(answers[currentQ.id]) ? answers[currentQ.id] : [];
                    const isChecked = currentSelected.includes(opt.label);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const next = isChecked
                            ? currentSelected.filter((v: string) => v !== opt.label)
                            : [...currentSelected, opt.label];
                          setAnswers({ ...answers, [currentQ.id]: next });
                        }}
                        className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 font-medium'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {opt.label}
                        </span>
                        <span className="mt-0.5">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Isian Singkat */}
              {currentQ.bentuk === 'isian_singkat' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ketikkan Jawaban Singkat Anda:</label>
                  <input
                    type="text"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                    placeholder="Tuliskan jawaban..."
                    className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}

              {/* Uraian & Tugas Praktik */}
              {(currentQ.bentuk === 'uraian' || currentQ.bentuk === 'tugas_praktik' || currentQ.bentuk === 'penilaian_produk') && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Uraikan Penjelasan / Gagasan Solusi Anda:
                  </label>
                  <textarea
                    rows={4}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                    placeholder="Jelaskan dengan bahasa yang santun, runtut, dan bermakna..."
                    className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>

            {/* Bottom Nav Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 border border-slate-300 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Soal Sebelumnya
              </button>

              <button
                type="button"
                disabled={currentQIndex === examQuestions.length - 1}
                onClick={() => setCurrentQIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                Soal Berikutnya <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Number Navigator (1 to 200 items support) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Navigasi Butir Soal ({examQuestions.length})
            </h4>

            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
              {examQuestions.map((q, idx) => {
                const hasAnswer = answers[q.id] !== undefined && answers[q.id] !== '';
                const isDoubt = doubtful[q.id];
                const isCurrent = idx === currentQIndex;

                let btnClass = 'bg-slate-100 text-slate-700 border-slate-200';
                if (hasAnswer) btnClass = 'bg-emerald-600 text-white border-emerald-600';
                if (isDoubt) btnClass = 'bg-amber-400 text-amber-950 border-amber-500';
                if (isCurrent) btnClass += ' ring-2 ring-emerald-950 font-black';

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block" />
                <span>Sudah Dijawab ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block" />
                <span>Ragu-ragu ({Object.values(doubtful).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200 inline-block" />
                <span>Belum Dijawab ({examQuestions.length - Object.keys(answers).length})</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // If exam was just completed
  if (isExamCompleted && latestAttemptResult) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Ujian Telah Berhasil Diselesaikan!</h2>
        <p className="text-xs text-slate-500">
          Alhamdulillah, terima kasih atas kesungguhan dan kejujuranmu dalam mengerjakan asesmen ini.
        </p>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nilai Objektif Sementara</div>
          <div className="text-4xl font-black text-emerald-700 mt-1">
            {latestAttemptResult.persentaseNilai} <span className="text-base text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs text-slate-600 mt-2">
            Skor Objektif: <strong>{latestAttemptResult.skorObjektif}</strong> dari total {latestAttemptResult.skorMaksimal}
          </div>
          {latestAttemptResult.persentaseNilai >= 75 ? (
            <div className="mt-3 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full inline-block">
              🎉 Tuntas Sesuai Kriteria Capaian!
            </div>
          ) : (
            <div className="mt-3 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full inline-block">
              🌱 Terjadwal Pendampingan / Penguatan Remedial
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveExam(null);
            setIsExamCompleted(false);
          }}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
        >
          Kembali ke Menu Asesmen
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              Studio Asesmen & CBT
            </span>
            <span className="text-xs text-slate-500 font-medium">
              10 Bentuk Soal • Paket 1 s.d. 200 Butir • Perlindungan Kunci Jawaban
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Bank Soal & Asesmen Berbasis Kurikulum Cinta
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Menilai pengetahuan kognitif, penalaran HOTS, empati karakter, dan kinerja aksi nyata ekoteologi. Dilengkapi fitur timer, autosave, anti-bocor kunci, dan penilaian rubrik guru.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('packages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'packages' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paket Ujian ({assessments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bank')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'bank' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bank Soal ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => setCurrentScreen('auto-questions')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generator Jumlah Manual</span>
          </button>
          {role === 'guru' && (
            <button
              type="button"
              onClick={() => setActiveTab('grading')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'grading' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hasil & Nilai ({attempts.length})
            </button>
          )}
        </div>
      </div>

      {/* Tab: Paket Ujian */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {pkg.subjectId}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {pkg.totalSoal} Butir Soal
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {pkg.judul}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {pkg.kisiKisi}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {pkg.durasiMenit} Menit
                  </span>
                  <span>Kelas {pkg.kelas}</span>
                  <span className="font-semibold text-emerald-600">{pkg.statusUjian}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Autosave & Acak Opsi</span>
                <button
                  type="button"
                  onClick={() => handleStartExam(pkg)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{role === 'siswa' ? 'Mulai Ujian CBT' : 'Uji Coba CBT'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Bank Soal */}
      {activeTab === 'bank' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pertanyaan atau topik..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="all">Semua Mapel</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="all">Semua Bentuk (10 Tipe)</option>
                <option value="pilihan_ganda">Pilihan Ganda</option>
                <option value="pilihan_ganda_kompleks">PG Kompleks</option>
                <option value="benar_salah">Benar/Salah</option>
                <option value="menjodohkan">Menjodohkan</option>
                <option value="isian_singkat">Isian Singkat</option>
                <option value="uraian">Uraian</option>
                <option value="berbasis_gambar">Berbasis Gambar</option>
                <option value="kontekstual">Kontekstual</option>
                <option value="tugas_praktik">Tugas Praktik</option>
                <option value="penilaian_produk">Penilaian Produk</option>
              </select>

              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="all">Semua Tingkat Kesulitan</option>
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="HOTS / Sulit">HOTS / Sulit</option>
              </select>
            </div>
          </div>

          {/* Questions list */}
          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 capitalize">
                      {q.bentuk.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      q.tingkatKesulitan === 'HOTS / Sulit' ? 'bg-purple-50 text-purple-700' :
                      q.tingkatKesulitan === 'Sedang' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {q.tingkatKesulitan}
                    </span>
                    {q.dimensiEkoteologi && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded">
                        🌿 Ekoteologi
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-500">Skor: {q.skorMaksimal}</span>
                </div>

                {q.stimulus && (
                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg italic">
                    {q.stimulus}
                  </div>
                )}

                <div className="text-sm font-semibold text-slate-900">{q.pertanyaan}</div>

                {q.pilihanJawaban && q.pilihanJawaban.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.pilihanJawaban.map((opt, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                        <strong>{opt.label}.</strong> {opt.text}
                      </div>
                    ))}
                  </div>
                )}

                {/* Answer key and discussion only visible to teacher/admin */}
                {role !== 'siswa' ? (
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                    <div>
                      <span className="font-semibold text-emerald-700">Kunci:</span>{' '}
                      <span className="font-mono font-bold text-slate-800">
                        {Array.isArray(q.kunciJawaban) ? q.kunciJawaban.join(', ') : q.kunciJawaban}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      TP: {q.tujuanPembelajaran}
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 italic">
                    🔒 Kunci jawaban dilindungi selama masa evaluasi
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Rakit 200 Soal AI Generator */}
      {activeTab === 'generate' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-4">
          <div className="text-center pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">Generator Asesmen Hingga 200 Butir Soal</h3>
            <p className="text-xs text-slate-500 mt-1">
              Membangun paket soal komprehensif 10 bentuk terintegrasi Panca Cinta dan Ekoteologi
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran</label>
              <select
                value={genSubject}
                onChange={(e) => setGenSubject(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
              >
                {subjects.map(s => <option key={s.id} value={s.nama}>{s.nama}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Topik Spesifik</label>
              <input
                type="text"
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                placeholder="Contoh: Kubikasi Wadah Kompos atau Ekosistem Sungai Kandilo"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jumlah Butir Soal (1 - 200)
                </label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={genCount}
                  onChange={(e) => setGenCount(Math.min(200, Math.max(1, Number(e.target.value) || 10)))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dominasi Kesulitan</label>
                <select
                  value={genDifficulty}
                  onChange={(e) => setGenDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                >
                  <option value="Mudah">Mudah (Pemahaman Awal)</option>
                  <option value="Sedang">Sedang (Aplikasi Konsep)</option>
                  <option value="HOTS / Sulit">HOTS (Penalaran & Analisis)</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerateQuestions}
              className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Sedang Merakit Soal...' : `Rakit ${genCount} Butir Soal Sekarang`}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab: Penilaian & Grading Siswa */}
      {activeTab === 'grading' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Hasil Ujian CBT Siswa Kelas VI-C</h3>
              <p className="text-xs text-slate-500">Skor objektif terhitung otomatis. Guru dapat menilai uraian manual dengan rubrik.</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Nama Siswa</th>
                  <th className="px-4 py-2.5">NISN</th>
                  <th className="px-4 py-2.5 text-center">Skor Objektif</th>
                  <th className="px-4 py-2.5 text-center">Skor Uraian</th>
                  <th className="px-4 py-2.5 text-center">Total Persentase</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                  <th className="px-4 py-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attempts.length > 0 ? (
                  attempts.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-900">{att.namaSiswa}</td>
                      <td className="px-4 py-3 font-mono text-slate-500">{att.nisn}</td>
                      <td className="px-4 py-3 text-center font-bold text-slate-700">{att.skorObjektif}</td>
                      <td className="px-4 py-3 text-center font-bold text-blue-700">{att.skorUraianManual}</td>
                      <td className="px-4 py-3 text-center font-black text-emerald-700">{att.persentaseNilai}%</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          att.statusRemedial ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {att.statusRemedial ? 'Remedial' : 'Tuntas'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAttemptForGrading(att);
                            setEssayScoreInput(att.skorUraianManual || 15);
                          }}
                          className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold"
                        >
                          Nilai Rubrik
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      Belum ada siswa yang menyelesaikan sesi ujian CBT.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Manual Grading Rubric */}
      {selectedAttemptForGrading && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Penilaian Rubrik Uraian & Praktik</h3>
              <button onClick={() => setSelectedAttemptForGrading(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div>Siswa: <strong>{selectedAttemptForGrading.namaSiswa}</strong> (NISN: {selectedAttemptForGrading.nisn})</div>
                <div>Skor Objektif Tercatat: <strong>{selectedAttemptForGrading.skorObjektif}</strong></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Skor Uraian / Kinerja Praktik (Maksimal 30 Poin)
                </label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={essayScoreInput}
                  onChange={(e) => setEssayScoreInput(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Umpan Balik Guru (Membangun & Humanis)
                </label>
                <textarea
                  rows={3}
                  value={teacherFeedbackInput}
                  onChange={(e) => setTeacherFeedbackInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAttemptForGrading(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    gradeEssayAttempt(selectedAttemptForGrading.id, essayScoreInput, teacherFeedbackInput);
                    setSelectedAttemptForGrading(null);
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Simpan Penilaian
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
