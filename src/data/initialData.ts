import { 
  Student, 
  Subject, 
  CiptaModule, 
  QuestionItem, 
  AssessmentPackage, 
  PortfolioItem, 
  SchoolCultureActivity, 
  OfficialSource, 
  SystemConfig 
} from '../types';

export const initialConfig: SystemConfig = {
  namaAplikasi: 'CIPTA Learning',
  satuanPendidikan: 'MIN 1 Paser',
  jenjang: 'Madrasah Ibtidaiyah',
  kelasUtama: 'VI-C',
  fase: 'Fase C',
  semesterAktif: 'Ganjil',
  tahunAjaranAktif: '2026/2027',
  kepalaMadrasah: 'Ismail, S.Ag.',
  pengembangAplikasi: 'Dzakirul Husni, S.Pd.',
  zonaWaktu: 'Asia/Makassar',
  kunciUjianAktif: true,
  modeSimulasiData: false,
};

// 27 Siswa Kelas VI-C MIN 1 Paser: 14 Perempuan (P), 13 Laki-laki (L)
// NISN dan NIS Lokal disimpan sebagai string untuk menjaga angka 0 di awal.
export const initialStudents: Student[] = [
  {
    id: 'std-01',
    noUrut: 1,
    nisn: '0142839101',
    nisLokal: '2401',
    namaLengkap: 'Achmad Fauzan Ramadhan',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '782103',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 145,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-02',
    noUrut: 2,
    nisn: '0148729102',
    nisLokal: '2402',
    namaLengkap: 'Adelia Putri Salsabila',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '649201',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 180,
    levelBelajar: 'Pengayaan'
  },
  {
    id: 'std-03',
    noUrut: 3,
    nisn: '0141938203',
    nisLokal: '2403',
    namaLengkap: 'Ahmad Danial Al-Ghifari',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '839210',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 130,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-04',
    noUrut: 4,
    nisn: '0149021804',
    nisLokal: '2404',
    namaLengkap: 'Aisyah Nur Hafizhah',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '912048',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 195,
    levelBelajar: 'Pengayaan'
  },
  {
    id: 'std-05',
    noUrut: 5,
    nisn: '0147820105',
    nisLokal: '2405',
    namaLengkap: 'Althaf Dwi Prakoso',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '420185',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 120,
    levelBelajar: 'Dukungan'
  },
  {
    id: 'std-06',
    noUrut: 6,
    nisn: '0146392006',
    nisLokal: '2406',
    namaLengkap: 'Anida Zahra Syakira',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '592014',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 160,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-07',
    noUrut: 7,
    nisn: '0143829107',
    nisLokal: '2407',
    namaLengkap: 'Aqila Khansa Mahira',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '318290',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 175,
    levelBelajar: 'Pengayaan'
  },
  {
    id: 'std-08',
    noUrut: 8,
    nisn: '0149201808',
    nisLokal: '2408',
    namaLengkap: 'Bagas Satria Pratama',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '748291',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 135,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-09',
    noUrut: 9,
    nisn: '0145029109',
    nisLokal: '2409',
    namaLengkap: 'Bilqis Humaira Azizah',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '629104',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 155,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-10',
    noUrut: 10,
    nisn: '0148192010',
    nisLokal: '2410',
    namaLengkap: 'Fakhri Dzaky Mubarak',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '859201',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 140,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-11',
    noUrut: 11,
    nisn: '0147391011',
    nisLokal: '2411',
    namaLengkap: 'Fatimatuzzahra Al-Banjari',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '294810',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 185,
    levelBelajar: 'Pengayaan'
  },
  {
    id: 'std-12',
    noUrut: 12,
    nisn: '0146029112',
    nisLokal: '2412',
    namaLengkap: 'Gibran Athalla Nugraha',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '739102',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 115,
    levelBelajar: 'Dukungan'
  },
  {
    id: 'std-13',
    noUrut: 13,
    nisn: '0144920113',
    nisLokal: '2413',
    namaLengkap: 'Hafizhah Nurul Izzah',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '948201',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 165,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-14',
    noUrut: 14,
    nisn: '0143920114',
    nisLokal: '2414',
    namaLengkap: 'Ibrahim Khalilurrahman',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '482019',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 150,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-15',
    noUrut: 15,
    nisn: '0142019115',
    nisLokal: '2415',
    namaLengkap: 'Khadijah Maryam Qonita',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '582910',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 170,
    levelBelajar: 'Pengayaan'
  },
  {
    id: 'std-16',
    noUrut: 16,
    nisn: '0141029116',
    nisLokal: '2416',
    namaLengkap: 'Muhammad Alifandra Paser',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '839104',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 145,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-17',
    noUrut: 17,
    nisn: '0149301817',
    nisLokal: '2417',
    namaLengkap: 'Muhammad Faris Ihsanuddin',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '619284',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 160,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-18',
    noUrut: 18,
    nisn: '0148201918',
    nisLokal: '2418',
    namaLengkap: 'Muhammad Raihan Saputra',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '729103',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 125,
    levelBelajar: 'Dukungan'
  },
  {
    id: 'std-19',
    noUrut: 19,
    nisn: '0147192019',
    nisLokal: '2419',
    namaLengkap: 'Nabila Syifa Wardani',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '918204',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 155,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-20',
    noUrut: 20,
    nisn: '0146920120',
    nisLokal: '2420',
    namaLengkap: 'Najwa Maulida Rahmah',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '482910',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 190,
    levelBelajar: 'Pengayaan'
  },
  {
    id: 'std-21',
    noUrut: 21,
    nisn: '0145820121',
    nisLokal: '2421',
    namaLengkap: 'Nur Azkia Hasanah',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '529104',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 165,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-22',
    noUrut: 22,
    nisn: '0144910222',
    nisLokal: '2422',
    namaLengkap: 'Raditya Arya Wardana',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '839201',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 130,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-23',
    noUrut: 23,
    nisn: '0143820123',
    nisLokal: '2423',
    namaLengkap: 'Raihana Safitri Anindya',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '619382',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 175,
    levelBelajar: 'Pengayaan'
  },
  {
    id: 'std-24',
    noUrut: 24,
    nisn: '0142910224',
    nisLokal: '2424',
    namaLengkap: 'Rifqi Zaidan Maulana',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '748192',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 140,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-25',
    noUrut: 25,
    nisn: '0141829125',
    nisLokal: '2425',
    namaLengkap: 'Salwa Aulia Damayanti',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '928301',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 185,
    levelBelajar: 'Pengayaan'
  },
  {
    id: 'std-26',
    noUrut: 26,
    nisn: '0149028126',
    nisLokal: '2426',
    namaLengkap: 'Syifa Nabila Zahira',
    jenisKelamin: 'P',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '382910',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 160,
    levelBelajar: 'Sesuai Target'
  },
  {
    id: 'std-27',
    noUrut: 27,
    nisn: '0148192027',
    nisLokal: '2427',
    namaLengkap: 'Yusuf Habibi Firmansyah',
    jenisKelamin: 'L',
    kelas: 'VI-C',
    tahunAjaran: '2026/2027',
    pin: '519283',
    statusVerifikasi: 'Tervalidasi',
    totalPoinKebaikan: 150,
    levelBelajar: 'Sesuai Target'
  }
];

export const initialSubjects: Subject[] = [
  {
    id: 'matematika',
    nama: 'Matematika',
    fase: 'Fase C',
    kelas: 'Kelas VI',
    deskripsi: 'Penalaran bilangan bulat, pecahan & desimal, pengukuran volume & luas bangun ruang, serta analisis data konteks konservasi lingkungan Paser.',
    iconName: 'Calculator',
    warnaTema: 'blue',
    capaianPembelajaran: 'Peserta didik dapat memahami konsep pecahan desimal, rasio, geometri bangun ruang wadah ramah lingkungan, serta membaca dan menyajikan data statistik kelestarian air dan sampah.',
    tujuanPembelajaran: [
      'Menghitung operasi pecahan dan desimal dalam perhitungan jejak air wudhu',
      'Menghitung volume bangun ruang prisma dan silinder penampung air hujan madrasah',
      'Menganalisis diagram data timbulan sampah plastik di lingkungan madrasah'
    ],
    alurTujuanPembelajaran: [
      'TP 6.1: Operasi hitung desimal kontekstual',
      'TP 6.2: Geometri wadah dan kubikasi konservasi',
      'TP 6.3: Pengolahan data statistik ramah lingkungan'
    ]
  },
  {
    id: 'ipas',
    nama: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    fase: 'Fase C',
    kelas: 'Kelas VI',
    deskripsi: 'Integrasi sains alam dan sosial berfokus pada ekosistem hutan gambut, mangrove Teluk Adang Paser, penghematan energi, dan siklus air ciptaan Allah SWT.',
    iconName: 'Leaf',
    warnaTema: 'emerald',
    capaianPembelajaran: 'Peserta didik memahami interaksi komponen ekosistem lokal Paser, pemanfaatan sumber energi terbarukan, serta tanggung jawab manusia sebagai khalifah pelestari bumi.',
    tujuanPembelajaran: [
      'Mengidentifikasi jaring-jaring makanan di ekosistem mangrove dan lahan gambut Paser',
      'Menganalisis prinsip konservasi air bersih dan energi listrik madrasah',
      'Merancang solusi biopori dan pemilahan sampah organik untuk kompos tanaman obat madrasah'
    ],
    alurTujuanPembelajaran: [
      'TP 6.1: Keseimbangan ekosistem ciptaan Allah SWT',
      'TP 6.2: Hemat energi dan air bersih berkelanjutan',
      'TP 6.3: Proyek aksi nyata pembuatan pupuk kompos kelas'
    ]
  },
  {
    id: 'bahasa_indonesia',
    nama: 'Bahasa Indonesia',
    fase: 'Fase C',
    kelas: 'Kelas VI',
    deskripsi: 'Keterampilan literasi kritis, membaca teks eksplanasi lingkungan, menulis surat permohonan aksi lingkungan hidup, dan puisi persaudaraan madrasah.',
    iconName: 'BookOpen',
    warnaTema: 'amber',
    capaianPembelajaran: 'Peserta didik mampu memahami teks eksplanasi fenomena alam dan sosial, menyampaikan gagasan advokasi lingkungan secara santun, dan menyusun teks persuasif cinta tanah air.',
    tujuanPembelajaran: [
      'Menemukan informasi tersirat dari teks eksplanasi pelestarian Sungai Kandilo',
      'Menulis surat resmi permohonan bibit tanaman kepada Dinas Lingkungan Hidup Kab. Paser',
      'Membaca nyaring dan mendeklamasikan puisi bertema cinta sesama dan alam'
    ],
    alurTujuanPembelajaran: [
      'TP 6.1: Literasi kritis teks eksplanasi alam',
      'TP 6.2: Komunikasi tertulis santun dan persuasif',
      'TP 6.3: Ekspresi karya sastra humanis dan ekoteologis'
    ]
  },
  {
    id: 'pendidikan_pancasila',
    nama: 'Pendidikan Pancasila',
    fase: 'Fase C',
    kelas: 'Kelas VI',
    deskripsi: 'Penanaman nilai gotong royong, musyawarah mufakat, toleransi keragaman suku di Paser (Paser, Banjar, Bugis, Jawa), dan kepatuhan norma kebaikan.',
    iconName: 'ShieldCheck',
    warnaTema: 'red',
    capaianPembelajaran: 'Peserta didik memahami dan menerapkan nilai-nilai Pancasila dalam kehidupan madrasah, menghargai keberagaman budaya, serta mempraktikkan gotong royong merawat lingkungan belajar.',
    tujuanPembelajaran: [
      'Menganalisis penerapan sila kedua dan kelima dalam pencegahan perundungan (anti-bullying)',
      'Mempraktikkan gotong royong musyawarah pemilihan koordinator piket hijau kelas VI-C',
      'Menghargai warisan kearifan lokal suku Paser dalam menjaga hutan larangan'
    ],
    alurTujuanPembelajaran: [
      'TP 6.1: Kemanusiaan yang adil dan beradab di madrasah',
      'TP 6.2: Gotong royong dan musyawarah mufakat kelas',
      'TP 6.3: Bhinneka Tunggal Ika dalam mozaik budaya Paser'
    ]
  },
  {
    id: 'sbdp_seni',
    nama: 'Seni Rupa & Prakarya (SBdP)',
    fase: 'Fase C',
    kelas: 'Kelas VI',
    deskripsi: 'Eksplorasi seni kriya daur ulang limbah botol plastik, melukis motif ukir tradisional Paser pada media ramah lingkungan, dan pameran karya cinta bumi.',
    iconName: 'Palette',
    warnaTema: 'purple',
    capaianPembelajaran: 'Peserta didik mampu menciptakan karya seni rupa dua dimensi dan tiga dimensi dengan memanfaatkan material limbah daur ulang serta mengapresiasi nilai estetika dan ekologis.',
    tujuanPembelajaran: [
      'Membuat pot vertikal gantung dari botol plastik bekas untuk taman kelas VI-C',
      'Menggambar ragam hias motif Paser (Ukir Belian) dengan pewarna alami',
      'Menyelenggarakan pameran kelas karya seni ekoteologi ramah lingkungan'
    ],
    alurTujuanPembelajaran: [
      'TP 6.1: Eksplorasi limbah anorganik menjadi produk artistik',
      'TP 6.2: Warisan seni motif Paser berkarakter cinta alam',
      'TP 6.3: Pameran dan apresiasi karya seni cinta lingkungan'
    ]
  }
];

export const initialModules: CiptaModule[] = [
  {
    id: 'mod-ipas-01',
    judul: 'Menjaga Keseimbangan Ekosistem & Konservasi Air Bersih',
    subjectId: 'ipas',
    kelas: 'VI-C',
    semester: 'Ganjil',
    alokasiWaktu: '3 JP (3 x 35 Menit)',
    topik: 'Ekosistem Sungai Kandilo dan Konservasi Air Wudhu MIN 1 Paser',
    capaianPembelajaran: 'Peserta didik memahami interaksi makhluk hidup dengan lingkungannya serta merancang upaya pelestarian air sebagai karunia agung Allah SWT.',
    tujuanPembelajaran: 'Peserta didik mampu menganalisis siklus air bersih, menghitung penghematan air wudhu, dan mempraktikkan pemanfaatan air buangan wudhu untuk menyiram kebun madrasah.',
    pengetahuanAwal: 'Siswa sudah memahami komponen biotik dan abiotik sederhana dari Fase B.',
    karakteristikSiswa: 'Siswa kelas VI-C aktif bergerak, menyukai kegiatan observasi langsung, dan telah terbiasa sholat berjamaah di madrasah.',
    status: 'Disetujui Kepala Madrasah',
    disetujuiOleh: 'Ismail, S.Ag.',
    tanggalUpdate: '2026-10-25',
    kbcMappings: [
      {
        dimensi: 'Cinta Allah SWT dan Rasul-Nya',
        nilaiUtama: 'Syukur atas nikmat air suci dan amanah tidak boros',
        indikatorPerilaku: 'Menutup keran air wudhu secara sempurna dan tidak menyalakan aliran terlalu deras',
        aktivitasPenerapan: 'Mengingat hadits Rasulullah SAW larangan berlebih-lebihan dalam berwudhu meski di sungai yang mengalir',
        buktiRefleksi: 'Jurnal harian wudhu berkesadaran'
      },
      {
        dimensi: 'Cinta Lingkungan',
        nilaiUtama: 'Konservasi sumber daya air tanah madrasah',
        indikatorPerilaku: 'Membuat saluran pipa sederhana penampung air limpasan wudhu',
        aktivitasPenerapan: 'Aksi nyata pengaliran air bekas wudhu ke taman bunga kelas VI-C',
        buktiRefleksi: 'Laporan foto aksi nyata taman kelas'
      }
    ],
    deepLearningPrinciples: [
      {
        prinsip: 'Berkesadaran (Mindful)',
        pengalaman: 'Memahami',
        deskripsiAktivitas: 'Siswa diajak mengamati tetesan air keran dan merasakan betapa berharganya setiap tetes air bersih bagi kehidupan.',
        kerangka: 'Praktik Pedagogis'
      },
      {
        prinsip: 'Bermakna (Meaningful)',
        pengalaman: 'Mengaplikasi',
        deskripsiAktivitas: 'Menghubungkan perhitungan volume debit air wudhu dengan ketersediaan sumur bor madrasah di musim kemarau Paser.',
        kerangka: 'Lingkungan Pembelajaran'
      },
      {
        prinsip: 'Menggembirakan (Joyful)',
        pengalaman: 'Merefleksi',
        deskripsiAktivitas: 'Permainan simulasi tim detektif air: mencari keran bocor dan memasang cap sahabat air.',
        kerangka: 'Kemitraan Pembelajaran'
      }
    ],
    ecoTheology: {
      relevan: true,
      alasanKontekstual: 'Air adalah anugerah Allah SWT yang disebutkan berkali-kali dalam Al-Qur’an sebagai sumber segala kehidupan. Menjaga air wudhu agar tidak mubazir adalah ibadah ekologis.',
      kategori: 'Kokurikuler/Proyek',
      tindakanNyata: 'Penyaluran air sisa wudhu untuk kebun hidroponik kangkung dan bayam kelas VI-C.',
      indikatorPengamatan: 'Tercatat penurunan debit buangan air sia-sia sebanyak minimal 40 liter per hari.',
      isSimulasi: false,
      targetKonservasi: 'Target hemat 200 liter per pekan'
    },
    tahapan: [
      {
        tahapNomor: 1,
        namaTahap: 'Tahap 1: Pemantik (Compassion & Mindful)',
        tujuan: 'Membangkitkan empati siswa terhadap krisis air bersih dan syukur atas ketersediaan air di madrasah.',
        alokasiMenit: 15,
        unsurCipta: 'Compassion',
        kbcTerkait: ['Cinta Allah SWT dan Rasul-Nya', 'Cinta Diri dan Sesama'],
        prinsipMendalam: ['Berkesadaran'],
        pengalamanMendalam: 'Memahami',
        aktivitasGuru: 'Menampilkan video pendek kekeringan sawah di Paser dan memperdengarkan suara gemercik air wudhu yang syahdu.',
        aktivitasSiswa: 'Siswa menceritakan pengalaman pribadi ketika air di rumah mati dan menuliskan 1 kata syukur di kertas daun kebaikan.',
        pertanyaanPemantik: [
          'Apa yang kita rasakan jika satu hari saja madrasah kita tidak memiliki air bersih?',
          'Mengapa Rasulullah SAW melarang berwudhu berlebihan meskipun kita berada di tepi sungai yang melimpah?'
        ],
        mediaDanAlat: ['Video dokumenter singkat', 'Papan pohon syukur madrasah']
      },
      {
        tahapNomor: 2,
        namaTahap: 'Tahap 2: Eksplorasi Konsep (Technology & Understand)',
        tujuan: 'Memahami siklus air, sistem resapan air tanah, dan anatomi kran hemat air secara visual interaktif.',
        alokasiMenit: 25,
        unsurCipta: 'Technology',
        kbcTerkait: ['Cinta Ilmu'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Memahami',
        aktivitasGuru: 'Mendemonstrasikan simulator siklus air dan diagram filtrasi alami pasir-kerikil arang aktif.',
        aktivitasSiswa: 'Mengamati model penampang tanah, mengidentifikasi zona resapan air, dan mencatat istilah evaporasi, kondensasi, presipitasi.',
        mediaDanAlat: ['Diagram digital siklus hidrologi', 'Alat peraga botol filtrasi sederhana'],
        kontenMateri: 'Siklus hidrologi menjaga keseimbangan bumi. Air di permukaan bumi menguap karena panas matahari, membentuk awan, dan turun kembali sebagai hujan yang diserap oleh akar pohon di hutan Paser.'
      },
      {
        tahapNomor: 3,
        namaTahap: 'Tahap 3: Tantangan Interaktif (Interactive & Joyful)',
        tujuan: 'Melatih daya nalar matematis-ekologis melalui kuis simulasi debit air wudhu per siswa.',
        alokasiMenit: 20,
        unsurCipta: 'Interactive',
        kbcTerkait: ['Cinta Ilmu', 'Cinta Lingkungan'],
        prinsipMendalam: ['Menggembirakan'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Memandu kuis tantangan kuis interaktif di CIPTA Studio: Misi Detektif Keran MIN 1 Paser.',
        aktivitasSiswa: 'Secara berpasangan menyelesaikan kuis teka-teki: jika 27 siswa VI-C berwudhu dengan aliran 3 liter/menit vs 1 liter/menit, berapa liter air yang diselamatkan?',
        instruksiTantangan: 'Buka CIPTA Studio menu Tantangan Air Bersih, jawab 5 soal misi detektif dengan ketelitian tinggi!'
      },
      {
        tahapNomor: 4,
        namaTahap: 'Tahap 4: Kolaborasi & Diferensiasi (Personalized & Inklusif)',
        tujuan: 'Bekerja sama dalam kelompok heterogen dengan jalur pendampingan bertingkat.',
        alokasiMenit: 25,
        unsurCipta: 'Personalized',
        kbcTerkait: ['Cinta Diri dan Sesama'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Membagi kelas menjadi 5 kelompok kolaboratif, mendistribusikan LKPD ramah lingkungan, dan memberikan bimbingan spesifik.',
        aktivitasSiswa: 'Kelompok mendiskusikan rancangan denah instalasi penampung air wudhu kelas VI-C menuju pot tanaman sirih dan serai.',
        panduanDiferensiasi: {
          dukungan: 'Diberikan kartu petunjuk bergambar instalasi selang air dan bimbingan langsung guru.',
          reguler: 'Mendesain denah dan menghitung kapasitas ember penampung air 50 liter.',
          pengayaan: 'Menghitung estimasi luas taman yang dapat diairi dan merancang filter arang aktif alami.'
        },
        mediaDanAlat: ['LKPD Kolaborasi Fase C', 'Kertas plano daur ulang', 'Meteran kain']
      },
      {
        tahapNomor: 5,
        namaTahap: 'Tahap 5: Praktik & Aksi Nyata (Action Learning)',
        tujuan: 'Menerapkan pengetahuan menjadi tindakan nyata merawat tanaman menggunakan air wudhu terfilter.',
        alokasiMenit: 20,
        unsurCipta: 'Action Learning',
        kbcTerkait: ['Cinta Lingkungan', 'Cinta Tanah Air'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Mendampingi siswa di area tempat wudhu madrasah untuk menguji coba penampungan air buangan dan penyiraman taman.',
        aktivitasSiswa: 'Siswa mengalirkan air sisa wudhu ke bak penampungan bersaring kawat halus, lalu menyiram tanaman obat madrasah (TOGA).',
        rencanaAksiNyata: 'Piket Harian Sahabat Air VI-C: mengontrol kran tempat wudhu sebelum dan sesudah sholat Dzuhur berjamaah.'
      },
      {
        tahapNomor: 6,
        namaTahap: 'Tahap 6: Refleksi & Asesmen Akhir (Reflect & Mindful)',
        tujuan: 'Mengukur pemahaman konsep, merefleksikan perubahan sikap, dan merencanakan komitmen berkelanjutan.',
        alokasiMenit: 15,
        unsurCipta: 'Compassion',
        kbcTerkait: ['Cinta Allah SWT dan Rasul-Nya', 'Cinta Ilmu'],
        prinsipMendalam: ['Berkesadaran'],
        pengalamanMendalam: 'Merefleksi',
        aktivitasGuru: 'Membimbing refleksi hening 3 menit dan membuka asesmen formatif akhir modul di aplikasi.',
        aktivitasSiswa: 'Mengerjakan asesmen akhir 5 butir soal pemahaman dan menuliskan komitmen pribadi pada lembar refleksi hati.',
        rubrikPenilaian: 'Kriteria: Pemahaman Siklus Air (1-4), Keterampilan Praktik Hemat Air (1-4), Nilai Akhlak Syukur (1-4), Aksi Nyata Berkelanjutan (1-4).'
      }
    ],
    sumberReferensi: [
      'Keputusan Dirjen Pendis Kemenag No. 6077 Tahun 2025 (Kurikulum Berbasis Cinta)',
      'Panduan Pembelajaran Mendalam Kemendikdasmen Edisi 2025',
      'Buku Panduan Ekoteologi Islam: Menjaga Kelestarian Ciptaan Ilahi',
      'BSKAP No. 032/H/KR/2024 tentang Capaian Pembelajaran Fase C'
    ],
    lkpdKonten: 'LEMBAR KERJA PESERTA DIDIK (LKPD) KELAS VI-C: MISI EKOTEOLOGI AIR SUCI MIN 1 PASER\nNama Kelompok: ...\nAnggota: ...\nTugas: Ukur debit aliran air kran wudhu madrasah dan hitung berapa ember air yang dapat dialirkan ke kebun toga madrasah!'
  },
  {
    id: 'mod-mat-01',
    judul: 'Menghitung Kubikasi Wadah Ramah Lingkungan & Olah Data Konservasi',
    subjectId: 'matematika',
    kelas: 'VI-C',
    semester: 'Ganjil',
    alokasiWaktu: '3 JP (3 x 35 Menit)',
    topik: 'Volume Bangun Ruang Wadah Kompos dan Diagram Sampah Plastik',
    capaianPembelajaran: 'Peserta didik dapat menentukan volume bangun ruang prisma dan balok serta menyajikan data statistika dalam diagram batang kontekstual.',
    tujuanPembelajaran: 'Peserta didik mampu menghitung volume kotak komposter organik kelas VI-C dan menyajikan grafik pemilahan sampah plastik madrasah.',
    pengetahuanAwal: 'Konsep luas bangun datar persegi panjang dan operasi perkalian dasar.',
    karakteristikSiswa: 'Menyukai representasi benda konkret dan visualisasi grafik berwarna.',
    status: 'Disetujui Kepala Madrasah',
    disetujuiOleh: 'Ismail, S.Ag.',
    tanggalUpdate: '2026-10-26',
    kbcMappings: [
      {
        dimensi: 'Cinta Ilmu',
        nilaiUtama: 'Ketelitian berhitung dan kejujuran data',
        indikatorPerilaku: 'Mencatat ukuran panjang, lebar, dan tinggi kotak kompos sesuai kenyataan pengukuran',
        aktivitasPenerapan: 'Praktik pengukuran langsung menggunakan meteran saku dengan cermat',
        buktiRefleksi: 'Tabel data pengukuran kelompok'
      },
      {
        dimensi: 'Cinta Lingkungan',
        nilaiUtama: 'Pemanfaatan barang bekas untuk wadah komposting',
        indikatorPerilaku: 'Membuat kotak kompos dari kayu sisa palet madrasah',
        aktivitasPenerapan: 'Menghitung volume ruang aerobik daun kering',
        buktiRefleksi: 'Foto komposter terpasang di samping kelas VI-C'
      }
    ],
    deepLearningPrinciples: [
      {
        prinsip: 'Bermakna (Meaningful)',
        pengalaman: 'Memahami',
        deskripsiAktivitas: 'Menyadari bahwa rumus volume kubus dan balok (p x l x t) secara langsung berguna untuk mengetahui kapasitas daya tampung sampah daun di madrasah.',
        kerangka: 'Praktik Pedagogis'
      },
      {
        prinsip: 'Menggembirakan (Joyful)',
        pengalaman: 'Mengaplikasi',
        deskripsiAktivitas: 'Tantangan arsitek cilik hijau: merancang wadah kompos dengan volume maksimal dari bahan kayu sisa yang terbatas.',
        kerangka: 'Pemanfaatan Digital'
      }
    ],
    ecoTheology: {
      relevan: true,
      alasanKontekstual: 'Sampah organik daun pohon peneduh MIN 1 Paser dapat diolah menjadi berkah tanah subur bila dihitung volumenya dengan tepat.',
      kategori: 'Kokurikuler/Proyek',
      tindakanNyata: 'Pembuatan komposter daun mini berukuran 60 cm x 40 cm x 50 cm di sudut taman kelas VI-C.',
      indikatorPengamatan: 'Tampungan 120 liter daun kering per bulan terurai menjadi kompos alami.',
      isSimulasi: false,
      targetKonservasi: 'Pengurangan 30 kg sampah daun terbakar per semester'
    },
    tahapan: [
      {
        tahapNomor: 1,
        namaTahap: 'Tahap 1: Pemantik (Compassion & Mindful)',
        tujuan: 'Melihat tumpukan daun kering madrasah bukan sebagai kotoran, melainkan anugerah yang perlu dihitung ruang simpanannya.',
        alokasiMenit: 15,
        unsurCipta: 'Compassion',
        kbcTerkait: ['Cinta Lingkungan', 'Cinta Ilmu'],
        prinsipMendalam: ['Berkesadaran'],
        pengalamanMendalam: 'Memahami',
        aktivitasGuru: 'Membawa satu keranjang daun kering gugur dari halaman MIN 1 Paser ke dalam kelas.',
        aktivitasSiswa: 'Mengamati dan menaksir berapa keranjang daun yang gugur setiap hari dan bagaimana cara menampungnya.',
        pertanyaanPemantik: [
          'Jika halaman kita menghasilkan 5 keranjang daun setiap pagi, berapakah ukuran kotak yang kita perlukan agar halaman selalu bersih?'
        ],
        mediaDanAlat: ['Keranjang daun', 'Kotak kubus peraga']
      },
      {
        tahapNomor: 2,
        namaTahap: 'Tahap 2: Eksplorasi Konsep (Technology & Understand)',
        tujuan: 'Memahami konsep volume bangun ruang balok dan kubus dengan kubus satuan.',
        alokasiMenit: 25,
        unsurCipta: 'Technology',
        kbcTerkait: ['Cinta Ilmu'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Memahami',
        aktivitasGuru: 'Menampilkan animasi 3D perakitan balok dari susunan kubus satuan di proyektor.',
        aktivitasSiswa: 'Menyusun kubus satuan kayu membentuk balok berbagai ukuran dan merumuskan Volume = p x l x t.',
        mediaDanAlat: ['Aplikasi visualisasi 3D bangun ruang', 'Kubus satuan']
      },
      {
        tahapNomor: 3,
        namaTahap: 'Tahap 3: Tantangan Interaktif (Interactive & Joyful)',
        tujuan: 'Menghitung volume berbagai wadah ramah lingkungan dengan cepat dan tepat.',
        alokasiMenit: 20,
        unsurCipta: 'Interactive',
        kbcTerkait: ['Cinta Ilmu'],
        prinsipMendalam: ['Menggembirakan'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Mengaktifkan Misi Hitung Cepat Volume Komposter di studio kuis.',
        aktivitasSiswa: 'Menghitung volume kotak komposter ukuran 80cm x 50cm x 40cm dan mengubahnya ke satuan liter.',
        instruksiTantangan: 'Ketik hasil perhitungan pada perangkat atau papan jawab kelas!'
      },
      {
        tahapNomor: 4,
        namaTahap: 'Tahap 4: Kolaborasi & Diferensiasi (Personalized & Inklusif)',
        tujuan: 'Merancang bangun komposter kelompok dengan diferensiasi tantangan.',
        alokasiMenit: 25,
        unsurCipta: 'Personalized',
        kbcTerkait: ['Cinta Diri dan Sesama'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Membimbing kelompok dengan lembar kerja bertingkat sesuai kesiapan belajar siswa.',
        aktivitasSiswa: 'Bekerja sama menggambar jaring-jaring balok wadah kompos dan menghitung volumenya.',
        panduanDiferensiasi: {
          dukungan: 'Menghitung volume balok dengan angka bulat puluhan sederhana berbantuan tabel rumus.',
          reguler: 'Menghitung volume wadah dan konversi satuan centimeter kubik ke liter.',
          pengayaan: 'Menghitung rasio perbandingan volume wadah terhadap berat kompos yang dihasilkan.'
        },
        mediaDanAlat: ['Penggaris panjang', 'Karton jaring-jaring', 'Gunting dan perekat ramah lingkungan']
      },
      {
        tahapNomor: 5,
        namaTahap: 'Tahap 5: Praktik & Aksi Nyata (Action Learning)',
        tujuan: 'Menyusun dan mengukur langsung kotak komposter mini kelas VI-C.',
        alokasiMenit: 20,
        unsurCipta: 'Action Learning',
        kbcTerkait: ['Cinta Lingkungan'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Memandu pengukuran kotak komposter nyata di samping ruang kelas.',
        aktivitasSiswa: 'Memasukkan cacahan daun kering dan menuangkan cairan mikroorganisme pengurai.',
        rencanaAksiNyata: 'Pencatatan data penurunan volume daun setiap pekan pada diagram batang kelas.'
      },
      {
        tahapNomor: 6,
        namaTahap: 'Tahap 6: Refleksi & Asesmen Akhir (Reflect & Mindful)',
        tujuan: 'Menyimpulkan pembelajaran matematika yang bermanfaat bagi pelestarian alam madrasah.',
        alokasiMenit: 15,
        unsurCipta: 'Compassion',
        kbcTerkait: ['Cinta Allah SWT dan Rasul-Nya'],
        prinsipMendalam: ['Berkesadaran'],
        pengalamanMendalam: 'Merefleksi',
        aktivitasGuru: 'Mendorong siswa merenungkan keteraturan matematika dalam ciptaan alam semesta.',
        aktivitasSiswa: 'Menyelesaikan kuis evaluasi 5 soal pilihan ganda dan refleksi manfaat matematika.',
        rubrikPenilaian: 'Rubrik pemahaman rumus volume (skor 1-4) dan ketepatan perhitungan (skor 1-4).'
      }
    ],
    sumberReferensi: [
      'Panduan Kurikulum Merdeka Matematika Fase C Kemendikdasmen',
      'Kepdirjen Pendis Kemenag No. 6077 Tahun 2025',
      'Modul Ajar Matematika Berbasis Proyek Lingkungan MIN 1 Paser'
    ]
  }
];

export const initialQuestions: QuestionItem[] = [
  {
    id: 'qst-01',
    subjectId: 'ipas',
    topik: 'Ekosistem Sungai Kandilo Paser',
    tujuanPembelajaran: 'Menganalisis rantai makanan dan ekosistem perairan lokal',
    indikator: 'Siswa dapat menentukan dampak pencemaran air terhadap rantai makanan sungai',
    bentuk: 'pilihan_ganda',
    tingkatKesulitan: 'Sedang',
    stimulus: 'Sungai Kandilo merupakan urat nadi kehidupan di Kabupaten Paser. Jika limbah plastik dibuang ke sungai, ikan-ikan kecil akan memakan mikroplastik.',
    pertanyaan: 'Apakah dampak jangka panjang terhadap burung bangau dan manusia pemakan ikan di sekitar Sungai Kandilo jika sungai terus tercemar plastik?',
    pilihanJawaban: [
      { label: 'A', text: 'Ikan semakin bertambah banyak karena plastik menjadi tempat bertelur' },
      { label: 'B', text: 'Zat beracun mikroplastik terakumulasi di tubuh burung bangau dan manusia' },
      { label: 'C', text: 'Air sungai menjadi lebih jernih karena plastik menyaring lumpur' },
      { label: 'D', text: 'Rantai makanan sungai tidak terpengaruh sama sekali' }
    ],
    kunciJawaban: 'B',
    pembahasan: 'Mikroplastik yang tertelan ikan kecil akan terakumulasi melalui rantai makanan (biomagnifikasi) hingga ke predator tingkat tinggi seperti burung bangau dan manusia, membahayakan kesehatan organ tubuh.',
    skorMaksimal: 10,
    sumberReferensi: 'Buku IPAS Fase C & Riset Lingkungan Hidup Kab. Paser',
    statusTelaah: 'Terverifikasi Guru',
    dimensiKbc: 'Cinta Lingkungan',
    dimensiEkoteologi: true
  },
  {
    id: 'qst-02',
    subjectId: 'matematika',
    topik: 'Geometri Wadah Ramah Lingkungan',
    tujuanPembelajaran: 'Menghitung volume bangun ruang balok',
    indikator: 'Siswa dapat menghitung daya tampung air wudhu dalam wadah balok',
    bentuk: 'pilihan_ganda',
    tingkatKesulitan: 'Sedang',
    stimulus: 'Kelas VI-C membuat bak penampung air sisa wudhu berbentuk balok dengan panjang 80 cm, lebar 50 cm, dan tinggi 60 cm.',
    pertanyaan: 'Berapa liter volume air maksimal yang dapat ditampung oleh bak penampung tersebut? (Ingat: 1 liter = 1.000 cm³)',
    pilihanJawaban: [
      { label: 'A', text: '240 liter' },
      { label: 'B', text: '190 liter' },
      { label: 'C', text: '120 liter' },
      { label: 'D', text: '2.400 liter' }
    ],
    kunciJawaban: 'A',
    pembahasan: 'Volume = p x l x t = 80 cm x 50 cm x 60 cm = 240.000 cm³. Dikonversi ke liter: 240.000 / 1.000 = 240 liter.',
    skorMaksimal: 10,
    sumberReferensi: 'Buku Matematika Fase C Kurikulum Merdeka',
    statusTelaah: 'Terverifikasi Guru',
    dimensiKbc: 'Cinta Ilmu',
    dimensiEkoteologi: true
  },
  {
    id: 'qst-03',
    subjectId: 'pendidikan_pancasila',
    topik: 'Pencegahan Perundungan & Disiplin Positif',
    tujuanPembelajaran: 'Menerapkan nilai kemanusiaan yang adil dan beradab',
    indikator: 'Siswa dapat menentukan sikap empati saat melihat teman diejek',
    bentuk: 'pilihan_ganda_kompleks',
    tingkatKesulitan: 'Sedang',
    stimulus: 'Ketika jam istirahat di lapangan MIN 1 Paser, salah seorang teman terpeleset dan pakaiannya terkena tanah basah sehingga ditertawakan oleh beberapa anak.',
    pertanyaan: 'Tindakan manakah yang mencerminkan nilai Kurikulum Berbasis Cinta (Panca Cinta: Cinta Diri dan Sesama)? (Pilihlah DUA jawaban yang benar!)',
    pilihanJawaban: [
      { label: 'A', text: 'Segera mendekatinya, membantu berdiri, dan membersihkan bajunya dengan ramah' },
      { label: 'B', text: 'Merekam kejadian dengan ponsel untuk dijadikan bahan gurauan di grup' },
      { label: 'C', text: 'Menegur teman-teman yang menertawakan dengan santun agar tidak mempermalukan' },
      { label: 'D', text: 'Membiarkan saja karena merasa bukan urusan pribadi' }
    ],
    kunciJawaban: ['A', 'C'],
    pembahasan: 'Nilai Cinta Diri dan Sesama mengajarkan empati aktif (membantu teman) dan keberanian moral menegur perbuatan mempermalukan secara santun tanpa kekerasan.',
    skorMaksimal: 15,
    sumberReferensi: 'Kepdirjen Pendis No. 6077 Tahun 2025',
    statusTelaah: 'Terverifikasi Guru',
    dimensiKbc: 'Cinta Diri dan Sesama',
    dimensiEkoteologi: false
  },
  {
    id: 'qst-04',
    subjectId: 'bahasa_indonesia',
    topik: 'Teks Eksplanasi Lingkungan Paser',
    tujuanPembelajaran: 'Mengidentifikasi struktur dan sebab-akibat dalam teks eksplanasi',
    indikator: 'Siswa menentukan pernyataan benar atau salah terkait fenomena abrasi pantai',
    bentuk: 'benar_salah',
    tingkatKesulitan: 'Mudah',
    stimulus: 'Hutan mangrove di pesisir Teluk Adang Paser berfungsi sebagai pemecah ombak alami dan tempat berkembang biak ikan kepiting bakau.',
    pertanyaan: 'Penebangan pohon mangrove secara liar akan mempercepat terjadinya abrasi pantai dan mengurangi populasi ikan di pesisir Paser.',
    pilihanJawaban: [
      { label: 'Benar', text: 'Pernyataan ini BENAR sesuai fakta ilmiah' },
      { label: 'Salah', text: 'Pernyataan ini SALAH' }
    ],
    kunciJawaban: 'Benar',
    pembahasan: 'Benar. Akar mangrove yang kuat mengikat sedimen lumpur pantai dan meredam gelombang pasang, sehingga hilangnya mangrove memicu abrasi pantai yang parah.',
    skorMaksimal: 10,
    sumberReferensi: 'Materi Bahasa Indonesia & Ekologi Pesisir Paser',
    statusTelaah: 'Terverifikasi Guru',
    dimensiKbc: 'Cinta Lingkungan',
    dimensiEkoteologi: true
  },
  {
    id: 'qst-05',
    subjectId: 'sbdp_seni',
    topik: 'Seni Kriya Daur Ulang Sampah',
    tujuanPembelajaran: 'Menjodohkan jenis limbah dengan teknik pengolahan kriya yang tepat',
    indikator: 'Siswa dapat memasangkan material bekas dengan karya seni fungsional',
    bentuk: 'menjodohkan',
    tingkatKesulitan: 'Sedang',
    stimulus: 'Di MIN 1 Paser terkumpul beberapa jenis limbah anorganik yang dapat diubah menjadi karya seni bernilai estetika dan fungsi.',
    pertanyaan: 'Pasangkan jenis limbah berikut dengan produk kriya yang paling sesuai!',
    pilihanJawaban: [
      { label: '1. Botol plastik air mineral 1,5 liter', text: 'A. Pot tanaman hidroponik vertikal gantung' },
      { label: '2. Kardus bekas kotak snack', text: 'B. Bingkai foto kaligrafi ragam hias Paser' },
      { label: '3. Tutup botol warna-warni', text: 'C. Mozaik hiasan dinding lambang madrasah' }
    ],
    kunciJawaban: '1-A, 2-B, 3-C',
    pembahasan: 'Botol plastik tebal cocok untuk pot vertikal, kardus kokoh cocok untuk frame kaligrafi, dan tutup botol warna warni sangat pas untuk teknik kolase/mozaik.',
    skorMaksimal: 15,
    sumberReferensi: 'Modul SBdP Ekologis Kelas VI',
    statusTelaah: 'Terverifikasi Guru',
    dimensiKbc: 'Cinta Lingkungan',
    dimensiEkoteologi: true
  },
  {
    id: 'qst-06',
    subjectId: 'ipas',
    topik: 'Hemat Energi dan Siklus Air',
    tujuanPembelajaran: 'Menjelaskan hadits dan adab hemat air dalam perspektif sains dan agama',
    indikator: 'Siswa menuliskan refleksi dan hitungan debit hemat air',
    bentuk: 'isian_singkat',
    tingkatKesulitan: 'Mudah',
    stimulus: 'Rasulullah SAW berwudhu dengan takaran 1 mud air (kurang lebih 0,6 liter atau 600 mililiter).',
    pertanyaan: 'Jika seorang siswa berwudhu menggunakan gayung berisi 2 liter air, berapa mililiter air yang dapat dihemat jika siswa tersebut menerapkan keteladanan wudhu Rasulullah SAW?',
    pilihanJawaban: [],
    kunciJawaban: '1400',
    pembahasan: '2 liter = 2.000 ml. Wudhu sunnah = 600 ml. Air yang dihemat = 2.000 ml - 600 ml = 1.400 ml (atau 1,4 liter).',
    skorMaksimal: 10,
    sumberReferensi: 'Fiqih Ibadah & Pembelajaran Berbasis Ekoteologi',
    statusTelaah: 'Terverifikasi Guru',
    dimensiKbc: 'Cinta Allah SWT dan Rasul-Nya',
    dimensiEkoteologi: true
  },
  {
    id: 'qst-07',
    subjectId: 'pendidikan_pancasila',
    topik: 'Gotong Royong & Tanggung Jawab Sosial',
    tujuanPembelajaran: 'Menguraikan solusi konflik kelompok dengan musyawarah humanis',
    indikator: 'Siswa menuliskan rencana tindakan damai saat pembagian tugas piket',
    bentuk: 'uraian',
    tingkatKesulitan: 'HOTS / Sulit',
    stimulus: 'Dalam kelompok piket hijau kelas VI-C, terjadi perselisihan karena dua orang siswa merasa selalu mendapat tugas membersihkan tempat sampah yang kotor, sementara teman lain hanya menyiram bunga.',
    pertanyaan: 'Sebagai ketua kelas yang menerapkan Kurikulum Berbasis Cinta dan Pembelajaran Mendalam, rancanglah langkah musyawarah yang adil untuk menyelesaikan masalah tersebut tanpa menyakiti perasaan siapapun!',
    pilihanJawaban: [],
    kunciJawaban: 'Langkah musyawarah: (1) Mengumpulkan seluruh anggota dengan suasana tenang dan penuh kasih sayang (Compassion). (2) Mendengarkan keluh kesah kedua siswa secara bergantian tanpa memotong (Mindful). (3) Membuat sistem rotasi jadwal piket mingguan agar setiap siswa merasakan semua tugas secara adil. (4) Menyepakati bahwa menjaga kebersihan adalah amanah bersama demi madrasah asri (Action Learning).',
    pembahasan: 'Penyelesaian masalah harus memadukan empati (Cinta Sesama), keadilan musyawarah (Sila ke-4 Pancasila), dan solusi konkret sistematis (rotasi tugas).',
    skorMaksimal: 20,
    sumberReferensi: 'Pedoman Karakter Madrasah Kemenag 2025',
    statusTelaah: 'Terverifikasi Guru',
    dimensiKbc: 'Cinta Diri dan Sesama',
    dimensiEkoteologi: false
  },
  {
    id: 'qst-08',
    subjectId: 'ipas',
    topik: 'Pengamatan Lapangan Kebun Madrasah',
    tujuanPembelajaran: 'Melakukan observasi kualitas tanah kompos',
    indikator: 'Siswa melakukan uji fisik kelembaban dan warna tanah subur',
    bentuk: 'tugas_praktik',
    tingkatKesulitan: 'Sedang',
    stimulus: 'Tugas Praktik Kelompok di Kebun TOGA MIN 1 Paser.',
    pertanyaan: 'Ambillah satu genggam tanah di bawah pohon mangga dan satu genggam kompos daun kelas VI-C. Amati warna, aroma, dan teksturnya. Catat hasil observasimu dalam rubrik laporan pengamatan!',
    pilihanJawaban: [],
    kunciJawaban: 'Kriteria Praktik: (1) Ketepatan prosedur pengambilan sampel tanah. (2) Keakuratan identifikasi ciri fisik kompos matang (warna cokelat kehitaman, aroma humus tidak busuk, tekstur remah). (3) Kesimpulan manfaat kompos bagi kesuburan tanaman.',
    pembahasan: 'Penilaian dilakukan melalui observasi performa langsung guru menggunakan rubrik 4 level kompetensi.',
    skorMaksimal: 20,
    sumberReferensi: 'Panduan Asesmen Kinerja Laboratorium Alam MIN 1 Paser',
    statusTelaah: 'Terverifikasi Guru',
    dimensiKbc: 'Cinta Lingkungan',
    dimensiEkoteologi: true
  }
];

export const initialAssessments: AssessmentPackage[] = [
  {
    id: 'asm-pts-01',
    judul: 'Asesmen Sumatif Tengah Semester (ASTS) Fase C: Integrasi IPAS & Ekoteologi',
    subjectId: 'ipas',
    kelas: 'VI-C',
    semester: 'Ganjil',
    durasiMenit: 60,
    totalSoal: 8,
    soalIds: ['qst-01', 'qst-02', 'qst-03', 'qst-04', 'qst-05', 'qst-06', 'qst-07', 'qst-08'],
    instruksi: 'Kerjakan soal dengan cermat dan jujur. Awali dengan Basmalah. Jawaban Anda tersimpan otomatis setiap kali memilih opsi.',
    statusUjian: 'Aktif',
    kisiKisi: 'Mencakup materi ekosistem Sungai Kandilo, konservasi air wudhu, kubikasi wadah ramah lingkungan, etika kasih sayang, dan pengamatan kompos.',
    tanggalMulai: '2026-10-25 08:00',
    tanggalSelesai: '2026-11-10 12:00'
  }
];

export const initialPortfolios: PortfolioItem[] = [
  {
    id: 'port-01',
    studentId: 'std-02',
    namaSiswa: 'Adelia Putri Salsabila',
    subjectId: 'ipas',
    judulKarya: 'Sistem Daur Ulang Air Sisa Wudhu untuk Hidroponik Selada',
    tanggal: '2026-10-24',
    tanggaKompetensi: 5,
    tanggaLabel: '5. Melaksanakan Aksi Nyata',
    deskripsi: 'Merancang dan memasang selang saring dari kran wudhu perempuan ke talang hidroponik selada di beranda kelas VI-C.',
    kategori: 'Laporan Aksi Nyata',
    refleksiSiswa: 'Saya merasa sangat senang karena tanaman selada kami tumbuh segar tanpa perlu menggunakan air keran baru. Ini wujud rasa syukur saya kepada Allah atas nikmat air.',
    statusReview: 'Disetujui',
    umpanBalikGuru: 'Luar biasa Adelia! Tindakan nyata yang menggabungkan kecerdasan sains, cinta lingkungan, dan keteladanan akhlak. Terus kembangkan!',
    skorRubrik: {
      pemahaman: 4,
      keterampilan: 4,
      karakterCinta: 4,
      dampakLingkungan: 4
    }
  },
  {
    id: 'port-02',
    studentId: 'std-04',
    namaSiswa: 'Aisyah Nur Hafizhah',
    subjectId: 'sbdp_seni',
    judulKarya: 'Lukisan Kaligrafi Ekoteologi pada Papan Kayu Daur Ulang',
    tanggal: '2026-10-25',
    tanggaKompetensi: 4,
    tanggaLabel: '4. Menghasilkan Karya atau Solusi',
    deskripsi: 'Melukis ayat Al-Qur’an tentang larangan berbuat kerusakan di muka bumi yang dipadukan dengan ukiran motif khas Paser.',
    kategori: 'Foto Karya',
    refleksiSiswa: 'Saya memanfaatkan potongan kayu sisa renovasi pagar madrasah. Seni ini mengingatkan teman-teman agar selalu mencintai alam ciptaan Allah.',
    statusReview: 'Disetujui',
    umpanBalikGuru: 'Karya seni yang amat indah dan bernyawa spiritual tinggi. Sangat tepat dipajang di lobi utama MIN 1 Paser.',
    skorRubrik: {
      pemahaman: 4,
      keterampilan: 4,
      karakterCinta: 4,
      dampakLingkungan: 3
    }
  },
  {
    id: 'port-03',
    studentId: 'std-01',
    namaSiswa: 'Achmad Fauzan Ramadhan',
    subjectId: 'matematika',
    judulKarya: 'Analisis Grafik Timbulan Botol Plastik Kantin Sehat Paser',
    tanggal: '2026-10-26',
    tanggaKompetensi: 3,
    tanggaLabel: '3. Mempraktikkan Keterampilan',
    deskripsi: 'Menghitung dan membuat diagram batang jumlah botol plastik yang berhasil dikumpulkan kelas VI-C selama 2 pekan berturut-turut.',
    kategori: 'Hasil Eksperimen',
    refleksiSiswa: 'Ternyata dengan program membawa botol minum sendiri (tumbler), sampah botol berkurang hingga 45%. Matematika membantu kami melihat hasil nyata.',
    statusReview: 'Disetujui',
    umpanBalikGuru: 'Analisis yang rapi dan objektif Fauzan. Pertahankan ketelitian mencatat datamu.',
    skorRubrik: {
      pemahaman: 3,
      keterampilan: 4,
      karakterCinta: 4,
      dampakLingkungan: 4
    }
  }
];

export const initialCultureActivities: SchoolCultureActivity[] = [
  {
    id: 'act-01',
    tanggal: '2026-10-27',
    namaProgram: 'Sedekah Sampah Plastik & Sholat Dhuha Berjamaah',
    kategori: 'Program Cinta Lingkungan',
    dimensiPancaCinta: 'Cinta Allah SWT dan Rasul-Nya',
    penanggungJawab: 'Dzakirul Husni, S.Pd.',
    targetPeserta: 'Seluruh siswa Kelas VI-C dan dewan guru',
    jumlahPartisipan: 27,
    indikatorKeberhasilan: 'Siswa mengumpulkan botol plastik bersih dan menunaikan sholat Dhuha dengan khusyuk.',
    hasilTerukur: 'Terkumpul 14,5 kg botol plastik untuk bank sampah madrasah',
    isSimulasi: false,
    catatanRefleksi: 'Siswa sangat antusias memasukkan botol ke keranjang sedekah sampah sebelum masuk masjid.',
    rencanaTindakLanjut: 'Dana penjualan sedekah sampah dibelikan bibit pohon jambu air untuk taman kelas.'
  },
  {
    id: 'act-02',
    tanggal: '2026-10-26',
    namaProgram: 'Gerakan Sahabat Hemat Air Wudhu',
    kategori: 'Pembiasaan Harian',
    dimensiPancaCinta: 'Cinta Lingkungan',
    penanggungJawab: 'Ismail, S.Ag.',
    targetPeserta: 'Seluruh warga MIN 1 Paser',
    jumlahPartisipan: 27,
    indikatorKeberhasilan: 'Tidak ada kran wudhu yang menetes atau dibiarkan mengalir deras saat membasuh wajah.',
    hasilTerukur: 'Penghematan meteran air tercatat 185 liter per hari',
    isSimulasi: false,
    catatanRefleksi: 'Pembiasaan membuka kran setengah putaran sudah mulai membudaya pada siswa.',
    rencanaTindakLanjut: 'Memasang stiker doa wudhu dan petunjuk hemat air pada setiap tiang kran.'
  },
  {
    id: 'act-03',
    tanggal: '2026-10-24',
    namaProgram: 'Jumat Bersih Gotong Royong Kebun TOGA & Biopori',
    kategori: 'Gotong Royong',
    dimensiPancaCinta: 'Cinta Tanah Air',
    penanggungJawab: 'Koordinator Lingkungan MIN 1 Paser',
    targetPeserta: 'Siswa, Orang Tua Komite, dan Penjaga Madrasah',
    jumlahPartisipan: 42,
    indikatorKeberhasilan: 'Terbuat 10 lubang biopori baru di sekitar lapangan upacara.',
    hasilTerukur: '10 pipa biopori terpasang dengan resapan 100% saat hujan deras',
    isSimulasi: false,
    catatanRefleksi: 'Kemitraan orang tua dan siswa terjalin sangat hangat dan penuh kekeluargaan.',
    rencanaTindakLanjut: 'Pengisian sampah organik daun ke dalam pipa biopori setiap hari Selasa dan Jumat.'
  }
];

export const initialOfficialSources: OfficialSource[] = [
  {
    id: 'src-01',
    judul: 'Panduan Kurikulum Berbasis Cinta (KBC) pada Madrasah',
    nomorDokumen: 'Keputusan Dirjen Pendis Nomor 6077 Tahun 2025',
    penerbit: 'Direktorat Jenderal Pendidikan Islam Kementerian Agama RI',
    tahun: '2025',
    url: 'https://kemenag.go.id/pendis/regulasi-6077-2025',
    ringkasan: 'Pedoman resmi pengintegrasian Panca Cinta (Cinta Allah & Rasul, Cinta Ilmu, Cinta Lingkungan, Cinta Diri & Sesama, Cinta Tanah Air) dalam pembelajaran madrasah yang humanis, toleran, dan berkarakter.',
    kategori: 'Regulasi Kemenag',
    statusVerifikasi: 'Acuan Primer',
    tanggalPeriksa: '2026-10-20'
  },
  {
    id: 'src-02',
    judul: 'Panduan Pembelajaran Mendalam (Deep Learning) Jenjang Pendidikan Dasar',
    nomorDokumen: 'Edisi Revisi 2025',
    penerbit: 'Kementerian Pendidikan Dasar dan Menengah RI',
    tahun: '2025',
    url: 'https://kemdikdasmen.go.id/panduan-deep-learning-2025',
    ringkasan: 'Kerangka kerja 3 prinsip (Berkesadaran, Bermakna, Menggembirakan), 3 pengalaman (Memahami, Mengaplikasi, Merefleksi), dan 4 pilar implementasi pedagogis untuk memperdalam kualitas nalar siswa.',
    kategori: 'Pedoman Kurikulum',
    statusVerifikasi: 'Resmi Terverifikasi',
    tanggalPeriksa: '2026-10-22'
  },
  {
    id: 'src-03',
    judul: 'Capaian Pembelajaran (CP) Fase C Madrasah Ibtidaiyah',
    nomorDokumen: 'Keputusan Kepala BSKAP No. 032/H/KR/2024 & Penyesuaian Kemenag',
    penerbit: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan & Kemenag RI',
    tahun: '2024/2025',
    url: 'https://kurikulum.kemdikbud.go.id/fase-c-madrasah',
    ringkasan: 'Standar kompetensi minimum dan capaian pembelajaran mata pelajaran Matematika, IPAS, Bahasa Indonesia, Pendidikan Pancasila, dan Seni untuk Kelas V dan VI.',
    kategori: 'Pedoman Kurikulum',
    statusVerifikasi: 'Resmi Terverifikasi',
    tanggalPeriksa: '2026-10-18'
  },
  {
    id: 'src-04',
    judul: 'Pedoman Implementasi Ekoteologi Islam dan Madrasah Adiwiyata',
    nomorDokumen: 'Panduan Teknis Direktorat KSKK Madrasah',
    penerbit: 'Kementerian Agama Republik Indonesia',
    tahun: '2025',
    url: 'https://madrasah.kemenag.go.id/ekoteologi-adiwiyata',
    ringkasan: 'Konsep integrasi kesadaran tauhid dan moralitas Islam dalam merawat alam lingkungan hidup (Hifzhul Bi\'ah) sebagai aksi nyata khalifah di muka bumi.',
    kategori: 'Ekoteologi',
    statusVerifikasi: 'Acuan Primer',
    tanggalPeriksa: '2026-10-24'
  },
  {
    id: 'src-05',
    judul: 'Kurikulum Operasional Madrasah (KOM) & Rancangan CIPTA Learning MIN 1 Paser',
    nomorDokumen: 'Dokumen I & II TP 2026/2027',
    penerbit: 'MIN 1 Paser (Kepala Madrasah Ismail, S.Ag. & Tim Pengembang)',
    tahun: '2026',
    url: 'internal://min1paser.sch.id/kurikulum-cipta',
    ringkasan: 'Dokumen kurikulum internal MIN 1 Paser yang memadukan kerangka operasional CIPTA Learning dengan kekhasan ekologis dan budaya Kabupaten Paser.',
    kategori: 'Dokumen Madrasah',
    statusVerifikasi: 'Internal Madrasah',
    tanggalPeriksa: '2026-10-27'
  }
];
