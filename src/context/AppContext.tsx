import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Student, 
  Subject, 
  CiptaModule, 
  QuestionItem, 
  AssessmentPackage, 
  StudentExamAttempt, 
  PortfolioItem, 
  SchoolCultureActivity, 
  OfficialSource, 
  AuditLog, 
  SystemConfig 
} from '../types';
import { 
  initialConfig, 
  initialStudents, 
  initialSubjects, 
  initialModules, 
  initialQuestions, 
  initialAssessments, 
  initialPortfolios, 
  initialCultureActivities, 
  initialOfficialSources 
} from '../data/initialData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  currentStudent: Student | undefined;
  
  config: SystemConfig;
  updateConfig: (cfg: Partial<SystemConfig>) => void;
  
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  importStudents: (newStudents: Omit<Student, 'id'>[]) => { successCount: number; duplicateCount: number; errors: string[] };
  resetStudentPin: (id: string, newPin?: string) => string;
  
  subjects: Subject[];
  updateSubject: (id: string, data: Partial<Subject>) => void;
  
  modules: CiptaModule[];
  addModule: (module: CiptaModule) => void;
  updateModule: (id: string, data: Partial<CiptaModule>) => void;
  deleteModule: (id: string) => void;
  
  questions: QuestionItem[];
  addQuestion: (q: QuestionItem) => void;
  updateQuestion: (id: string, data: Partial<QuestionItem>) => void;
  deleteQuestion: (id: string) => void;
  addBulkQuestions: (qs: QuestionItem[]) => void;
  
  assessments: AssessmentPackage[];
  addAssessment: (asm: AssessmentPackage) => void;
  updateAssessment: (id: string, data: Partial<AssessmentPackage>) => void;
  
  attempts: StudentExamAttempt[];
  recordAttempt: (attempt: StudentExamAttempt) => void;
  gradeEssayAttempt: (attemptId: string, essayScore: number, teacherNotes?: string) => void;
  
  portfolios: PortfolioItem[];
  addPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  reviewPortfolio: (id: string, status: 'Disetujui' | 'Perlu Perbaikan', feedback: string, rubricScore?: { pemahaman: number; keterampilan: number; karakterCinta: number; dampakLingkungan: number }) => void;
  
  cultureActivities: SchoolCultureActivity[];
  addCultureActivity: (act: Omit<SchoolCultureActivity, 'id'>) => void;
  
  officialSources: OfficialSource[];
  addOfficialSource: (src: Omit<OfficialSource, 'id'>) => void;
  
  auditLogs: AuditLog[];
  addAuditLog: (aksi: string, detail: string) => void;
  
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('guru');
  const [activeStudentId, setActiveStudentId] = useState<string>('std-02'); // Adelia Putri Salsabila by default
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Core state collections
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('cipta_config');
    return saved ? JSON.parse(saved) : initialConfig;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('cipta_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('cipta_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [modules, setModules] = useState<CiptaModule[]>(() => {
    const saved = localStorage.getItem('cipta_modules');
    return saved ? JSON.parse(saved) : initialModules;
  });

  const [questions, setQuestions] = useState<QuestionItem[]>(() => {
    const saved = localStorage.getItem('cipta_questions');
    return saved ? JSON.parse(saved) : initialQuestions;
  });

  const [assessments, setAssessments] = useState<AssessmentPackage[]>(() => {
    const saved = localStorage.getItem('cipta_assessments');
    return saved ? JSON.parse(saved) : initialAssessments;
  });

  const [attempts, setAttempts] = useState<StudentExamAttempt[]>(() => {
    const saved = localStorage.getItem('cipta_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('cipta_portfolios');
    return saved ? JSON.parse(saved) : initialPortfolios;
  });

  const [cultureActivities, setCultureActivities] = useState<SchoolCultureActivity[]>(() => {
    const saved = localStorage.getItem('cipta_culture');
    return saved ? JSON.parse(saved) : initialCultureActivities;
  });

  const [officialSources, setOfficialSources] = useState<OfficialSource[]>(() => {
    const saved = localStorage.getItem('cipta_sources');
    return saved ? JSON.parse(saved) : initialOfficialSources;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('cipta_audit');
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-01',
        waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' }),
        aktor: 'Dzakirul Husni, S.Pd.',
        peran: 'guru',
        aksi: 'Inisialisasi Sistem',
        detail: 'Memuat data resmi 27 Siswa VI-C MIN 1 Paser & Kurikulum Berbasis Cinta'
      }
    ];
  });

  // Persist locally
  useEffect(() => { localStorage.setItem('cipta_config', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('cipta_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('cipta_subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('cipta_modules', JSON.stringify(modules)); }, [modules]);
  useEffect(() => { localStorage.setItem('cipta_questions', JSON.stringify(questions)); }, [questions]);
  useEffect(() => { localStorage.setItem('cipta_assessments', JSON.stringify(assessments)); }, [assessments]);
  useEffect(() => { localStorage.setItem('cipta_attempts', JSON.stringify(attempts)); }, [attempts]);
  useEffect(() => { localStorage.setItem('cipta_portfolios', JSON.stringify(portfolios)); }, [portfolios]);
  useEffect(() => { localStorage.setItem('cipta_culture', JSON.stringify(cultureActivities)); }, [cultureActivities]);
  useEffect(() => { localStorage.setItem('cipta_sources', JSON.stringify(officialSources)); }, [officialSources]);
  useEffect(() => { localStorage.setItem('cipta_audit', JSON.stringify(auditLogs)); }, [auditLogs]);

  // Sync with backend API if available
  useEffect(() => {
    fetch('/api/state')
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          if (res.data.config) setConfig(res.data.config);
          if (res.data.students?.length) setStudents(res.data.students);
          if (res.data.modules?.length) setModules(res.data.modules);
          if (res.data.questions?.length) setQuestions(res.data.questions);
          if (res.data.assessments?.length) setAssessments(res.data.assessments);
          if (res.data.attempts?.length) setAttempts(res.data.attempts);
          if (res.data.portfolios?.length) setPortfolios(res.data.portfolios);
          if (res.data.cultureActivities?.length) setCultureActivities(res.data.cultureActivities);
        }
      })
      .catch(() => {
        // Backend offline or local fallback
      });
  }, []);

  const saveBackendState = () => {
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          config,
          students,
          subjects,
          modules,
          questions,
          assessments,
          attempts,
          portfolios,
          cultureActivities,
          officialSources,
        }
      })
    }).catch(() => {});
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addAuditLog = (aksi: string, detail: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' }),
      aktor: role === 'guru' ? 'Dzakirul Husni, S.Pd.' : role === 'admin' ? 'Administrator MIN 1 Paser' : currentStudent?.namaLengkap || 'Siswa',
      peran: role,
      aksi,
      detail,
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 100)]);
  };

  const currentStudent = students.find(s => s.id === activeStudentId);

  const updateConfig = (cfg: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...cfg }));
    addAuditLog('Pengaturan Sistem Diperbarui', JSON.stringify(cfg));
    showToast('Pengaturan resmi berhasil diperbarui', 'success');
  };

  const addStudent = (st: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...st,
      id: `std-${Date.now()}`,
    };
    setStudents(prev => [...prev, newStudent]);
    addAuditLog('Tambah Siswa', `Menambahkan siswa: ${st.namaLengkap} (NISN: ${st.nisn})`);
    showToast(`Siswa ${st.namaLengkap} berhasil ditambahkan`, 'success');
    saveBackendState();
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    addAuditLog('Pembaruan Data Siswa', `Mengubah data siswa ID: ${id}`);
    showToast('Data siswa berhasil diperbarui', 'success');
    saveBackendState();
  };

  const deleteStudent = (id: string) => {
    const target = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    addAuditLog('Hapus Siswa', `Menghapus siswa: ${target?.namaLengkap || id}`);
    showToast('Siswa berhasil dihapus dari daftar kelas', 'info');
    saveBackendState();
  };

  const importStudents = (newStudents: Omit<Student, 'id'>[]) => {
    let successCount = 0;
    let duplicateCount = 0;
    const errors: string[] = [];

    const existingNisns = new Set(students.map(s => s.nisn));
    const toAdd: Student[] = [];

    newStudents.forEach((st, idx) => {
      if (!st.namaLengkap || st.namaLengkap.trim().length < 3) {
        errors.push(`Baris ${idx + 1}: Nama lengkap tidak valid`);
        return;
      }
      if (!st.nisn || st.nisn.length < 5) {
        errors.push(`Baris ${idx + 1}: NISN '${st.nisn}' tidak valid`);
        return;
      }
      if (existingNisns.has(st.nisn)) {
        duplicateCount++;
        errors.push(`Baris ${idx + 1}: Duplikasi NISN ${st.nisn} (${st.namaLengkap})`);
        return;
      }

      existingNisns.add(st.nisn);
      toAdd.push({
        ...st,
        id: `std-imp-${Date.now()}-${idx}`,
        pin: st.pin || Math.floor(100000 + Math.random() * 900000).toString(),
        statusVerifikasi: 'Tervalidasi',
        totalPoinKebaikan: st.totalPoinKebaikan || 100,
        levelBelajar: st.levelBelajar || 'Sesuai Target'
      });
      successCount++;
    });

    if (toAdd.length > 0) {
      setStudents(prev => [...prev, ...toAdd]);
      addAuditLog('Impor Data Siswa', `Berhasil mengimpor ${successCount} siswa (Ditolak duplikat/gagal: ${duplicateCount})`);
      saveBackendState();
    }

    return { successCount, duplicateCount, errors };
  };

  const resetStudentPin = (id: string, newPin?: string): string => {
    const pinToSet = newPin || Math.floor(100000 + Math.random() * 900000).toString();
    setStudents(prev => prev.map(s => s.id === id ? { ...s, pin: pinToSet } : s));
    addAuditLog('Reset PIN Siswa', `Reset PIN untuk siswa ID: ${id}`);
    showToast('PIN berhasil direset dengan aman', 'success');
    saveBackendState();
    return pinToSet;
  };

  const updateSubject = (id: string, data: Partial<Subject>) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    showToast('Data kurikulum mata pelajaran diperbarui', 'success');
  };

  const addModule = (mod: CiptaModule) => {
    setModules(prev => [mod, ...prev]);
    addAuditLog('Buat Modul Ajar', `Modul baru dibuat: ${mod.judul}`);
    showToast(`Modul "${mod.judul}" berhasil disimpan`, 'success');
    saveBackendState();
  };

  const updateModule = (id: string, data: Partial<CiptaModule>) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    addAuditLog('Perbarui Modul Ajar', `Memperbarui modul ID: ${id}`);
    showToast('Modul berhasil diperbarui', 'success');
    saveBackendState();
  };

  const deleteModule = (id: string) => {
    setModules(prev => prev.filter(m => m.id !== id));
    addAuditLog('Hapus Modul Ajar', `Menghapus modul ID: ${id}`);
    showToast('Modul dihapus', 'info');
    saveBackendState();
  };

  const addQuestion = (q: QuestionItem) => {
    setQuestions(prev => [q, ...prev]);
    showToast('Butir soal berhasil ditambahkan ke Bank Soal', 'success');
    saveBackendState();
  };

  const addBulkQuestions = (qs: QuestionItem[]) => {
    setQuestions(prev => [...qs, ...prev]);
    addAuditLog('Generator Soal Berjalan', `Menambahkan ${qs.length} butir soal ke bank soal`);
    showToast(`Berhasil menambahkan ${qs.length} butir soal baru`, 'success');
    saveBackendState();
  };

  const updateQuestion = (id: string, data: Partial<QuestionItem>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...data } : q));
    showToast('Butir soal diperbarui', 'success');
    saveBackendState();
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    showToast('Soal dihapus dari bank soal', 'info');
    saveBackendState();
  };

  const addAssessment = (asm: AssessmentPackage) => {
    setAssessments(prev => [asm, ...prev]);
    addAuditLog('Buat Paket Asesmen', `Paket asesmen baru: ${asm.judul} (${asm.totalSoal} soal)`);
    showToast(`Paket asesmen "${asm.judul}" siap digunakan`, 'success');
    saveBackendState();
  };

  const updateAssessment = (id: string, data: Partial<AssessmentPackage>) => {
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    showToast('Paket asesmen diperbarui', 'success');
    saveBackendState();
  };

  const recordAttempt = (attempt: StudentExamAttempt) => {
    setAttempts(prev => {
      const filtered = prev.filter(a => !(a.assessmentId === attempt.assessmentId && a.studentId === attempt.studentId));
      return [attempt, ...filtered];
    });
    addAuditLog('Ujian Selesai', `Siswa ${attempt.namaSiswa} mengumpulkan asesmen. Skor objektif: ${attempt.skorObjektif}`);
    saveBackendState();
  };

  const gradeEssayAttempt = (attemptId: string, essayScore: number, teacherNotes?: string) => {
    setAttempts(prev => prev.map(att => {
      if (att.id === attemptId) {
        const total = att.skorObjektif + essayScore;
        const pct = Math.round((total / att.skorMaksimal) * 100);
        return {
          ...att,
          skorUraianManual: essayScore,
          skorTotal: total,
          persentaseNilai: pct,
          catatanGuru: teacherNotes || att.catatanGuru,
          status: 'Dinilai'
        };
      }
      return att;
    }));
    showToast('Penilaian rubrik uraian/praktik berhasil disimpan', 'success');
    saveBackendState();
  };

  const addPortfolio = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`
    };
    setPortfolios(prev => [newItem, ...prev]);
    addAuditLog('Portofolio Dikirim', `Siswa ${item.namaSiswa} mengirimkan karya: ${item.judulKarya}`);
    showToast('Karya portofolio berhasil diserahkan kepada guru', 'success');
    saveBackendState();
  };

  const reviewPortfolio = (id: string, status: 'Disetujui' | 'Perlu Perbaikan', feedback: string, rubricScore?: { pemahaman: number; keterampilan: number; karakterCinta: number; dampakLingkungan: number }) => {
    setPortfolios(prev => prev.map(p => p.id === id ? {
      ...p,
      statusReview: status,
      umpanBalikGuru: feedback,
      skorRubrik: rubricScore || p.skorRubrik
    } : p));
    addAuditLog('Review Portofolio', `Guru meninjau portofolio ID: ${id} (${status})`);
    showToast(`Portofolio berhasil ditinjau (${status})`, 'success');
    saveBackendState();
  };

  const addCultureActivity = (act: Omit<SchoolCultureActivity, 'id'>) => {
    const newAct: SchoolCultureActivity = {
      ...act,
      id: `act-${Date.now()}`
    };
    setCultureActivities(prev => [newAct, ...prev]);
    addAuditLog('Kegiatan Budaya Madrasah', `Mencatat kegiatan: ${act.namaProgram}`);
    showToast('Catatan budaya madrasah berhasil disimpan', 'success');
    saveBackendState();
  };

  const addOfficialSource = (src: Omit<OfficialSource, 'id'>) => {
    const newSrc: OfficialSource = {
      ...src,
      id: `src-${Date.now()}`
    };
    setOfficialSources(prev => [newSrc, ...prev]);
    showToast('Dokumen acuan resmi berhasil ditambahkan', 'success');
    saveBackendState();
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      activeStudentId,
      setActiveStudentId,
      currentStudent,
      config,
      updateConfig,
      students,
      addStudent,
      updateStudent,
      deleteStudent,
      importStudents,
      resetStudentPin,
      subjects,
      updateSubject,
      modules,
      addModule,
      updateModule,
      deleteModule,
      questions,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      addBulkQuestions,
      assessments,
      addAssessment,
      updateAssessment,
      attempts,
      recordAttempt,
      gradeEssayAttempt,
      portfolios,
      addPortfolio,
      reviewPortfolio,
      cultureActivities,
      addCultureActivity,
      officialSources,
      addOfficialSource,
      auditLogs,
      addAuditLog,
      currentScreen,
      setCurrentScreen,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
