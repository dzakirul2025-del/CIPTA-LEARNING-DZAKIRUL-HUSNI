export type UserRole = 'admin' | 'guru' | 'siswa';

export interface Student {
  id: string;
  noUrut: number;
  nisn: string; // must be string to preserve leading zeroes
  nisLokal: string; // must be string
  namaLengkap: string;
  jenisKelamin: 'L' | 'P'; // 14 P, 13 L
  kelas: string; // 'VI-C'
  tahunAjaran: string; // '2026/2027'
  pin: string; // 6 digits, secure (not NISN / birthdate)
  statusVerifikasi: 'Tervalidasi' | 'Menunggu Verifikasi' | 'Perlu Perbaikan';
  catatanAdmin?: string;
  totalPoinKebaikan: number;
  levelBelajar: 'Dukungan' | 'Sesuai Target' | 'Pengayaan';
}

export type SubjectId = 'matematika' | 'ipas' | 'bahasa_indonesia' | 'pendidikan_pancasila' | 'sbdp_seni';

export interface Subject {
  id: SubjectId;
  nama: string;
  fase: string; // 'Fase C'
  kelas: string; // 'Kelas VI'
  deskripsi: string;
  iconName: string;
  warnaTema: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  alurTujuanPembelajaran: string[];
}

export type PancaCintaType = 
  | 'Cinta Allah SWT dan Rasul-Nya'
  | 'Cinta Ilmu'
  | 'Cinta Lingkungan'
  | 'Cinta Diri dan Sesama'
  | 'Cinta Tanah Air';

export interface KbcMapping {
  dimensi: PancaCintaType;
  nilaiUtama: string;
  indikatorPerilaku: string;
  aktivitasPenerapan: string;
  buktiRefleksi: string;
}

export interface DeepLearningPrinciple {
  prinsip: 'Berkesadaran (Mindful)' | 'Bermakna (Meaningful)' | 'Menggembirakan (Joyful)';
  pengalaman: 'Memahami' | 'Mengaplikasi' | 'Merefleksi';
  deskripsiAktivitas: string;
  kerangka: 'Praktik Pedagogis' | 'Kemitraan Pembelajaran' | 'Lingkungan Pembelajaran' | 'Pemanfaatan Digital';
}

export interface EcoTheologyInsertion {
  relevan: boolean;
  alasanKontekstual: string;
  kategori: 'Intrakurikuler' | 'Kokurikuler/Proyek' | 'Pembiasaan Madrasah' | 'Kolaborasi';
  tindakanNyata: string;
  indikatorPengamatan: string;
  isSimulasi: boolean;
  targetKonservasi?: string;
}

export interface CiptaStageContent {
  tahapNomor: 1 | 2 | 3 | 4 | 5 | 6;
  namaTahap: string;
  tujuan: string;
  alokasiMenit: number;
  unsurCipta: 'Compassion' | 'Technology' | 'Interactive' | 'Personalized' | 'Action Learning';
  kbcTerkait: PancaCintaType[];
  prinsipMendalam: ('Berkesadaran' | 'Bermakna' | 'Menggembirakan')[];
  pengalamanMendalam: 'Memahami' | 'Mengaplikasi' | 'Merefleksi';
  aktivitasGuru: string;
  aktivitasSiswa: string;
  pertanyaanPemantik?: string[];
  mediaDanAlat?: string[];
  kontenMateri?: string;
  instruksiTantangan?: string;
  panduanDiferensiasi?: {
    dukungan: string;
    reguler: string;
    pengayaan: string;
  };
  rencanaAksiNyata?: string;
  rubrikPenilaian?: string;
}

export interface CiptaModule {
  id: string;
  judul: string;
  subjectId: SubjectId;
  kelas: string;
  semester: 'Ganjil' | 'Genap';
  alokasiWaktu: string;
  topik: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string;
  pengetahuanAwal: string;
  karakteristikSiswa: string;
  status: 'Draf AI' | 'Diedit' | 'Diperiksa' | 'Disetujui Kepala Madrasah';
  disetujuiOleh?: string;
  tanggalUpdate: string;
  kbcMappings: KbcMapping[];
  deepLearningPrinciples: DeepLearningPrinciple[];
  ecoTheology: EcoTheologyInsertion;
  tahapan: CiptaStageContent[];
  sumberReferensi: string[];
  lkpdKonten?: string;
  rubrikPenilaian?: string;
}

export type QuestionType = 
  | 'pilihan_ganda'
  | 'pilihan_ganda_kompleks'
  | 'benar_salah'
  | 'menjodohkan'
  | 'isian_singkat'
  | 'uraian'
  | 'berbasis_gambar'
  | 'kontekstual'
  | 'tugas_praktik'
  | 'penilaian_produk';

export interface QuestionItem {
  id: string;
  subjectId: SubjectId;
  topik: string;
  tujuanPembelajaran: string;
  indikator: string;
  bentuk: QuestionType;
  tingkatKesulitan: 'Mudah' | 'Sedang' | 'HOTS / Sulit';
  stimulus?: string;
  gambarUrl?: string;
  pertanyaan: string;
  pilihanJawaban?: { label: string; text: string }[];
  kunciJawaban: string | string[]; // hidden from students during test
  pembahasan: string;
  skorMaksimal: number;
  sumberReferensi: string;
  statusTelaah: 'Terverifikasi Guru' | 'Draf Bank Soal' | 'Perlu Telaah';
  dimensiKbc?: PancaCintaType;
  dimensiEkoteologi?: boolean;
}

export interface AssessmentPackage {
  id: string;
  judul: string;
  subjectId: SubjectId;
  kelas: string;
  semester: 'Ganjil' | 'Genap';
  durasiMenit: number;
  totalSoal: number;
  soalIds: string[];
  instruksi: string;
  statusUjian: 'Draf' | 'Aktif' | 'Selesai';
  kisiKisi: string;
  tanggalMulai?: string;
  tanggalSelesai?: string;
}

export interface StudentExamAttempt {
  id: string;
  assessmentId: string;
  studentId: string;
  namaSiswa: string;
  nisn: string;
  waktuMulai: string;
  waktuSelesai?: string;
  status: 'Sedang Mengerjakan' | 'Terkumpul' | 'Dinilai';
  jawabanSiswa: Record<string, string | string[]>; // questionId -> answer
  jawabanRagu: Record<string, boolean>;
  skorObjektif: number;
  skorUraianManual: number;
  skorTotal: number;
  skorMaksimal: number;
  persentaseNilai: number;
  catatanGuru?: string;
  statusRemedial: boolean;
}

export interface PortfolioItem {
  id: string;
  studentId: string;
  namaSiswa: string;
  subjectId: SubjectId;
  judulKarya: string;
  tanggal: string;
  tanggaKompetensi: 1 | 2 | 3 | 4 | 5 | 6; // 1: Memahami -> 6: Merefleksikan Dampak
  tanggaLabel: string;
  deskripsi: string;
  kategori: 'Foto Karya' | 'Laporan Aksi Nyata' | 'Hasil Eksperimen' | 'Presentasi' | 'Jurnal Refleksi';
  lampiranUrl?: string;
  refleksiSiswa: string;
  statusReview: 'Menunggu Review' | 'Disetujui' | 'Perlu Perbaikan';
  umpanBalikGuru?: string;
  skorRubrik?: {
    pemahaman: number; // 1-4
    keterampilan: number; // 1-4
    karakterCinta: number; // 1-4
    dampakLingkungan: number; // 1-4
  };
}

export interface SchoolCultureActivity {
  id: string;
  tanggal: string;
  namaProgram: string;
  kategori: 'Pembiasaan Harian' | 'Program Cinta Lingkungan' | 'Gotong Royong' | 'Refleksi Bersama' | 'Kemitraan Keluarga & Kantin';
  dimensiPancaCinta: PancaCintaType;
  penanggungJawab: string;
  targetPeserta: string;
  jumlahPartisipan: number;
  indikatorKeberhasilan: string;
  hasilTerukur: string;
  isSimulasi: boolean;
  catatanRefleksi: string;
  rencanaTindakLanjut: string;
  dokumentasiUrl?: string;
}

export interface OfficialSource {
  id: string;
  judul: string;
  nomorDokumen: string;
  penerbit: string;
  tahun: string;
  url: string;
  ringkasan: string;
  kategori: 'Regulasi Kemenag' | 'Pedoman Kurikulum' | 'Ekoteologi' | 'Dokumen Madrasah';
  statusVerifikasi: 'Resmi Terverifikasi' | 'Acuan Primer' | 'Internal Madrasah';
  tanggalPeriksa: string;
}

export interface AuditLog {
  id: string;
  waktu: string;
  aktor: string;
  peran: UserRole;
  aksi: string;
  detail: string;
  ipAddress?: string;
}

export interface SystemConfig {
  namaAplikasi: string;
  satuanPendidikan: string;
  jenjang: string;
  kelasUtama: string;
  fase: string;
  semesterAktif: 'Ganjil' | 'Genap';
  tahunAjaranAktif: string;
  kepalaMadrasah: string;
  pengembangAplikasi: string;
  zonaWaktu: string; // 'Asia/Makassar'
  kunciUjianAktif: boolean;
  modeSimulasiData: boolean;
}
