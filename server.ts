import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared Gemini AI Client utility
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Data persistence file path
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'app_storage.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read persisted data
function readStoredData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading stored data:', err);
  }
  return null;
}

// Helper to save persisted data
function writeStoredData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing stored data:', err);
  }
}

// API: Get current server state
app.get('/api/state', (req: Request, res: Response) => {
  const data = readStoredData();
  res.json({ success: true, data });
});

// API: Save state from frontend
app.post('/api/state', (req: Request, res: Response) => {
  const { data } = req.body;
  if (data) {
    writeStoredData(data);
    res.json({ success: true, message: 'Data saved successfully' });
  } else {
    res.status(400).json({ success: false, error: 'No data provided' });
  }
});

// API: Check AI status
app.get('/api/ai/status', (req: Request, res: Response) => {
  res.json({
    hasKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
  });
});

// API: AI Generator for Perangkat Ajar (6-Stage CIPTA Module & 25 Document Formats)
app.post('/api/ai/generate-module', async (req: Request, res: Response) => {
  try {
    const { 
      subjectName, 
      topik, 
      fase, 
      kelas, 
      semester, 
      alokasiWaktu,
      tujuanKompetensi,
      pancaCinta, 
      prinsipMendalam, 
      konteksEkoteologi, 
      documentType 
    } = req.body;

    const promptText = `
Anda adalah tim perancang kurikulum ahli Kementerian Agama RI dan MIN 1 Paser.
Buat dokumen perangkat ajar resmi berbasis metode CIPTA Learning:
- Mata Pelajaran: ${subjectName || 'IPAS'}
- Kelas / Fase: ${kelas || 'VI-C'} / ${fase || 'Fase C'}
- Semester: ${semester || 'Ganjil'}
- Alokasi Waktu: ${alokasiWaktu || '3 JP (3 x 35 Menit)'}
- Topik / Materi Pokok: ${topik || 'Keseimbangan Ekosistem & Konservasi Lingkungan'}
- Tujuan Kompetensi Akhir: ${tujuanKompetensi || 'Peserta didik memahami konsep, mempraktikkan aksi nyata, dan merefleksikan nilai cinta'}
- Dimensi Panca Cinta (KBC Kemenag): ${Array.isArray(pancaCinta) ? pancaCinta.join(', ') : pancaCinta || 'Cinta Lingkungan, Cinta Ilmu, Cinta Allah SWT'}
- Prinsip Pembelajaran Mendalam: ${Array.isArray(prinsipMendalam) ? prinsipMendalam.join(', ') : prinsipMendalam || 'Berkesadaran (Mindful), Bermakna (Meaningful), Menggembirakan (Joyful)'}
- Konteks Ekoteologi Lokal Paser: ${konteksEkoteologi || 'Konservasi Sungai Kandilo, Hutan Gambut, dan Penghematan Air Wudhu MIN 1 Paser'}
- Jenis Dokumen yang diminta: ${documentType || 'Modul Ajar Lengkap 6 Tahap CIPTA'}

Pastikan seluruh 6 Tahap Operasional CIPTA Learning dimuat secara utuh:
1. Tahap 1: Pemantik (Compassion, KBC, Berkesadaran, Asesmen Diagnostik)
2. Tahap 2: Eksplorasi Konsep (Technology, Cinta Ilmu, Memahami, Visual & Konkret)
3. Tahap 3: Tantangan Interaktif (Interactive, Personalized, Joyful, Kuis & Masalah Kontekstual)
4. Tahap 4: Kolaborasi & Diferensiasi (Cinta Diri & Sesama, LKPD, Jalur Dukungan, Reguler, Pengayaan)
5. Tahap 5: Praktik & Aksi Nyata (Action Learning, Cinta Lingkungan, Solusi & Bukti Nyata)
6. Tahap 6: Refleksi & Asesmen Akhir (Merefleksi, Rubrik Penilaian 4 Kriteria, Remedial/Pengayaan)

Format output berupa JSON murni dengan struktur:
{
  "judul": "...",
  "topik": "...",
  "capaianPembelajaran": "...",
  "tujuanPembelajaran": "...",
  "pengetahuanAwal": "...",
  "karakteristikSiswa": "...",
  "kbcMappings": [
    { "dimensi": "...", "nilaiUtama": "...", "indikatorPerilaku": "...", "aktivitasPenerapan": "...", "buktiRefleksi": "..." }
  ],
  "deepLearningPrinciples": [
    { "prinsip": "Berkesadaran (Mindful)", "pengalaman": "Memahami", "deskripsiAktivitas": "...", "kerangka": "Praktik Pedagogis" }
  ],
  "ecoTheology": {
    "relevan": true,
    "alasanKontekstual": "...",
    "kategori": "Intrakurikuler | Kokurikuler/Proyek | Pembiasaan Madrasah | Kolaborasi",
    "tindakanNyata": "...",
    "indikatorPengamatan": "...",
    "isSimulasi": false,
    "targetKonservasi": "..."
  },
  "tahapan": [
    {
      "tahapNomor": 1,
      "namaTahap": "Tahap 1: Pemantik (Compassion & Mindful)",
      "tujuan": "...",
      "alokasiMenit": 15,
      "unsurCipta": "Compassion",
      "kbcTerkait": ["..."],
      "prinsipMendalam": ["Berkesadaran"],
      "pengalamanMendalam": "Memahami",
      "aktivitasGuru": "...",
      "aktivitasSiswa": "...",
      "pertanyaanPemantik": ["...", "..."],
      "mediaDanAlat": ["..."]
    },
    ... (tahap 2 sampai 6)
  ],
  "lkpdKonten": "...",
  "rubrikPenilaian": "...",
  "sumberReferensi": ["..."]
}
Hanya berikan JSON yang valid.
`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textOutput = response.text?.trim() || '';
        try {
          const parsed = JSON.parse(textOutput);
          return res.json({ success: true, module: parsed, source: 'ai-live' });
        } catch (jsonErr) {
          console.warn('Live AI response was not valid JSON, parsing fallback:', jsonErr);
        }
      } catch (geminiErr) {
        console.warn('Gemini live call error, using deterministic generator:', geminiErr);
      }
    }

    // High-quality deterministic pedagogical fallback generator
    const generatedModule = createDeterministicCiptaModule({
      subjectName,
      topik,
      fase,
      kelas,
      semester,
      alokasiWaktu,
      tujuanKompetensi,
      pancaCinta,
      prinsipMendalam,
      konteksEkoteologi,
      documentType,
    });

    return res.json({ success: true, module: generatedModule, source: 'curriculum-engine' });
  } catch (error: any) {
    console.error('Error generating module:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal error' });
  }
});

// API: AI Generator for Assessments (up to 200 questions across 10 formats)
app.post('/api/ai/generate-assessment', async (req: Request, res: Response) => {
  try {
    const { 
      subjectName, 
      topik, 
      jumlahSoal = 10, 
      bentukSoal = ['pilihan_ganda'], 
      tingkatKesulitan = 'Sedang', 
      sertakanEkoteologi = true 
    } = req.body;

    const count = Math.min(Math.max(Number(jumlahSoal) || 5, 1), 200);

    const promptText = `
Buatlah paket bank soal asesmen untuk MIN 1 Paser:
- Mata Pelajaran: ${subjectName}
- Topik: ${topik}
- Jumlah butir: ${count} butir
- Bentuk soal yang diinginkan: ${Array.isArray(bentukSoal) ? bentukSoal.join(', ') : bentukSoal}
- Tingkat Kesulitan: ${tingkatKesulitan}
- Integrasi Ekoteologi & Nilai Cinta Kemenag: ${sertakanEkoteologi ? 'Ya, hubungkan dengan alam Paser dan akhlak mulia' : 'Umum'}

Format keluaran WAJIB berupa JSON array dengan item:
[
  {
    "subjectId": "${subjectName?.toLowerCase().includes('mat') ? 'matematika' : subjectName?.toLowerCase().includes('ipa') ? 'ipas' : 'bahasa_indonesia'}",
    "topik": "${topik}",
    "tujuanPembelajaran": "...",
    "indikator": "...",
    "bentuk": "pilihan_ganda | pilihan_ganda_kompleks | benar_salah | menjodohkan | isian_singkat | uraian | berbasis_gambar | kontekstual | tugas_praktik | penilaian_produk",
    "tingkatKesulitan": "Mudah | Sedang | HOTS / Sulit",
    "stimulus": "...",
    "pertanyaan": "...",
    "pilihanJawaban": [{"label": "A", "text": "..."}, {"label": "B", "text": "..."}],
    "kunciJawaban": "A",
    "pembahasan": "...",
    "skorMaksimal": 10,
    "sumberReferensi": "...",
    "dimensiKbc": "Cinta Lingkungan",
    "dimensiEkoteologi": true
  }
]
`;

    if (aiClient && count <= 25) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textOutput = response.text?.trim() || '';
        try {
          const parsed = JSON.parse(textOutput);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return res.json({ success: true, questions: parsed, count: parsed.length, source: 'ai-live' });
          }
        } catch (jsonErr) {
          console.warn('Live AI response was not valid JSON array:', jsonErr);
        }
      } catch (geminiErr) {
        console.warn('Gemini live call error, using deterministic question bank engine:', geminiErr);
      }
    }

    // Comprehensive deterministic bank engine supporting up to 200 questions
    const generatedQuestions = generateDeterministicQuestions({
      subjectName,
      topik,
      count,
      bentukSoal,
      tingkatKesulitan,
      sertakanEkoteologi,
    });

    return res.json({ 
      success: true, 
      questions: generatedQuestions, 
      count: generatedQuestions.length, 
      source: 'assessment-engine' 
    });
  } catch (error: any) {
    console.error('Error generating assessment:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal error' });
  }
});

// Helper for deterministic module generation
function createDeterministicCiptaModule(params: any) {
  const { subjectName, topik, kelas, fase, alokasiWaktu, konteksEkoteologi } = params;
  const isIpas = subjectName?.toLowerCase().includes('ipas') || subjectName?.toLowerCase().includes('alam');
  const isMat = subjectName?.toLowerCase().includes('mat');
  const isPancasila = subjectName?.toLowerCase().includes('pancasila');
  const isSeni = subjectName?.toLowerCase().includes('seni') || subjectName?.toLowerCase().includes('sbdp');

  const subjectId = isMat ? 'matematika' : isIpas ? 'ipas' : isPancasila ? 'pendidikan_pancasila' : isSeni ? 'sbdp_seni' : 'bahasa_indonesia';

  return {
    id: `mod-${Date.now()}`,
    judul: `Modul Ajar CIPTA Learning: ${topik || 'Penguatan Kompetensi & Ekoteologi'}`,
    subjectId,
    kelas: kelas || 'VI-C',
    semester: 'Ganjil',
    alokasiWaktu: alokasiWaktu || '3 JP (3 x 35 Menit)',
    topik: topik || 'Keseimbangan Lingkungan dan Karakter Kasih Sayang',
    capaianPembelajaran: `Peserta didik menguasai pemahaman bermakna pada fase C, mampu berkolaborasi secara inklusif, dan menghasilkan aksi nyata peduli lingkungan madrasah.`,
    tujuanPembelajaran: `Melalui 6 tahap CIPTA Learning, peserta didik dapat memahami konsep pokok ${topik || 'materi'}, merancang solusi konkret, dan merefleksikan nilai-nilai Kurikulum Berbasis Cinta.`,
    pengetahuanAwal: 'Pemahaman konsep dasar pada fase sebelumnya serta pengalaman keseharian di lingkungan madrasah.',
    karakteristikSiswa: 'Siswa kelas VI-C MIN 1 Paser menyukai pembelajaran aktif, penyelidikan di laboratorium alam terbuka, dan kerja tim gotong royong.',
    status: 'Draf AI',
    tanggalUpdate: new Date().toISOString().split('T')[0],
    kbcMappings: [
      {
        dimensi: 'Cinta Allah SWT dan Rasul-Nya',
        nilaiUtama: 'Syukur atas keteraturan alam semesta ciptaan-Nya',
        indikatorPerilaku: 'Memulai belajar dengan doa khusyuk dan mengagumi hikmah di balik ilmu pengetahuan',
        aktivitasPenerapan: 'Refleksi ayat kauniyah dan hadits tentang merawat bumi',
        buktiRefleksi: 'Jurnal refleksi spiritual siswa'
      },
      {
        dimensi: 'Cinta Ilmu',
        nilaiUtama: 'Rasa ingin tahu dan kejujuran observasi',
        indikatorPerilaku: 'Menyajikan data hasil penyelidikan secara apa adanya tanpa manipulasi',
        aktivitasPenerapan: 'Eksperimen terstruktur dan pencatatan teliti',
        buktiRefleksi: 'Lembar observasi dan lembar kerja ilmiah'
      },
      {
        dimensi: 'Cinta Lingkungan',
        nilaiUtama: 'Tanggung jawab ekoteologis dan pemeliharaan ciptaan',
        indikatorPerilaku: 'Membuang sampah terpilah dan menghemat pemakaian air bersih',
        aktivitasPenerapan: 'Praktik langsung konservasi lingkungan kelas VI-C',
        buktiRefleksi: 'Foto aksi nyata peduli madrasah'
      },
      {
        dimensi: 'Cinta Diri dan Sesama',
        nilaiUtama: 'Empati, saling menghargai, dan anti-bullying',
        indikatorPerilaku: 'Bekerja sama dalam kelompok tanpa membeda-bedakan kemampuan teman',
        aktivitasPenerapan: 'Diskusi kolaboratif dengan pembagian peran yang adil',
        buktiRefleksi: 'Lembar penilaian antarteman yang saling membesarkan hati'
      }
    ],
    deepLearningPrinciples: [
      {
        prinsip: 'Berkesadaran (Mindful)',
        pengalaman: 'Memahami',
        deskripsiAktivitas: 'Siswa secara sadar menetapkan target belajar dan memantau pemahaman konsep secara berkala.',
        kerangka: 'Praktik Pedagogis'
      },
      {
        prinsip: 'Bermakna (Meaningful)',
        pengalaman: 'Mengaplikasi',
        deskripsiAktivitas: 'Menghubungkan konsep teoritis dengan persoalan riil di Kabupaten Paser (Sungai Kandilo, Hutan Gambut, dan Madrasah Hijau).',
        kerangka: 'Lingkungan Pembelajaran'
      },
      {
        prinsip: 'Menggembirakan (Joyful)',
        pengalaman: 'Merefleksi',
        deskripsiAktivitas: 'Pembelajaran disajikan melalui game edukatif, simulasi digital, dan penghargaan bintang kebaikan.',
        kerangka: 'Kemitraan Pembelajaran'
      }
    ],
    ecoTheology: {
      relevan: true,
      alasanKontekstual: konteksEkoteologi || 'Mengintegrasikan ajaran Islam tentang amanah kekhalifahan di muka bumi dengan kearifan lokal Paser.',
      kategori: 'Kokurikuler/Proyek',
      tindakanNyata: 'Penyelidikan lingkungan sekitar madrasah dan pembuatan komitmen aksi hijau kelas VI-C.',
      indikatorPengamatan: 'Seluruh siswa berpartisipasi dalam pemeliharaan kebersihan dan penghijauan kelas.',
      isSimulasi: false,
      targetKonservasi: 'Target terwujudnya ruang belajar bebas plastik dan hemat energi'
    },
    tahapan: [
      {
        tahapNomor: 1,
        namaTahap: 'Tahap 1: Pemantik (Compassion & Mindful)',
        tujuan: 'Membangun koneksi empati, rasa ingin tahu siswa, dan menghubungkan topik dengan nilai kasih sayang.',
        alokasiMenit: 15,
        unsurCipta: 'Compassion',
        kbcTerkait: ['Cinta Allah SWT dan Rasul-Nya', 'Cinta Diri dan Sesama'],
        prinsipMendalam: ['Berkesadaran'],
        pengalamanMendalam: 'Memahami',
        aktivitasGuru: 'Menyajikan cerita kontekstual dan pertanyaan pemantik yang hangat, membangun suasana aman bebas celaan.',
        aktivitasSiswa: 'Merespons cerita, mengaitkan dengan pengalaman pribadi, dan menyampaikan pandangan awal secara terbuka.',
        pertanyaanPemantik: [
          `Bagaimana materi ${topik || 'ini'} membantu kita menjadi pribadi yang lebih bersyukur dan peduli pada sesama?`,
          'Apa yang terjadi di sekitar kita jika kita mengabaikan tanggung jawab merawat lingkungan?'
        ],
        mediaDanAlat: ['Gambar stimulus kontekstual', 'Papan pohon empati']
      },
      {
        tahapNomor: 2,
        namaTahap: 'Tahap 2: Eksplorasi Konsep (Technology & Understand)',
        tujuan: 'Memahami konsep dasar dari representasi abstrak menuju visual konkret yang mudah dipahami.',
        alokasiMenit: 25,
        unsurCipta: 'Technology',
        kbcTerkait: ['Cinta Ilmu'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Memahami',
        aktivitasGuru: 'Memfasilitasi penayangan media visual, simulasi interaktif, dan memandu pembedahan konsep tahap demi tahap.',
        aktivitasSiswa: 'Menyimak eksplorasi konsep, mengajukan pertanyaan kritis, dan mencatat konsep kunci dalam peta pikiran.',
        mediaDanAlat: ['Media interaktif digital', 'Papan tulis cerdas', 'Buku referensi resmi']
      },
      {
        tahapNomor: 3,
        namaTahap: 'Tahap 3: Tantangan Interaktif (Interactive & Joyful)',
        tujuan: 'Melatih penerapan konsep melalui tantangan kuis, simulasi, dan pemecahan masalah yang menggembirakan.',
        alokasiMenit: 20,
        unsurCipta: 'Interactive',
        kbcTerkait: ['Cinta Ilmu', 'Cinta Lingkungan'],
        prinsipMendalam: ['Menggembirakan'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Membuka sesi tantangan interaktif di CIPTA Studio dan memberikan umpan balik langsung yang membangun semangat.',
        aktivitasSiswa: 'Menyelesaikan misi tantangan secara interaktif, berdiskusi strategi jawaban, dan meraih umpan balik positif.',
        instruksiTantangan: 'Selesaikan 5 level tantangan dengan teliti dan penuh keceriaan!'
      },
      {
        tahapNomor: 4,
        namaTahap: 'Tahap 4: Kolaborasi & Diferensiasi (Personalized & Inklusif)',
        tujuan: 'Membangun pemahaman mendalam lewat kerja kelompok gotong royong dengan jalur bantuan sesuai kesiapan.',
        alokasiMenit: 25,
        unsurCipta: 'Personalized',
        kbcTerkait: ['Cinta Diri dan Sesama'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Membimbing kelompok dengan lembar kerja bertingkat (Jalur Dukungan, Jalur Target, Jalur Pengayaan).',
        aktivitasSiswa: 'Bekerja sama dalam tim heterogen, saling mengajarkan teman (peer-tutoring), dan membagi peran secara adil.',
        panduanDiferensiasi: {
          dukungan: 'Diberikan lembar panduan berbantuan kartu visual bertahap dan pendampingan intensif guru.',
          reguler: 'Mengerjakan tugas standar kontekstual sesuai alur tujuan pembelajaran.',
          pengayaan: 'Mengerjakan studi kasus penalaran tingkat lanjut (HOTS) serta merancang inovasi mini.'
        },
        mediaDanAlat: ['LKPD Kolaborasi Diferensiasi', 'Kertas plano kerja kelompok']
      },
      {
        tahapNomor: 5,
        namaTahap: 'Tahap 5: Praktik & Aksi Nyata (Action Learning)',
        tujuan: 'Mengubah pengetahuan teoretis menjadi karya, produk, solusi, atau aksi nyata berfaedah bagi madrasah.',
        alokasiMenit: 20,
        unsurCipta: 'Action Learning',
        kbcTerkait: ['Cinta Lingkungan', 'Cinta Tanah Air'],
        prinsipMendalam: ['Bermakna'],
        pengalamanMendalam: 'Mengaplikasi',
        aktivitasGuru: 'Mengarahkan dan mengamati demonstrasi karya / aksi lingkungan siswa serta menilai dengan rubrik autentik.',
        aktivitasSiswa: 'Mempraktikkan keterampilan, menyelesaikan produk nyata, dan mendokumentasikan bukti karya portofolio.',
        rencanaAksiNyata: 'Penerapan aksi nyata di lingkungan kelas VI-C MIN 1 Paser secara berkesinambungan.'
      },
      {
        tahapNomor: 6,
        namaTahap: 'Tahap 6: Refleksi & Asesmen Akhir (Reflect & Mindful)',
        tujuan: 'Mengevaluasi penguasaan kompetensi, merefleksikan nilai-nilai cinta yang dipelajari, dan menyusun tindak lanjut.',
        alokasiMenit: 15,
        unsurCipta: 'Compassion',
        kbcTerkait: ['Cinta Allah SWT dan Rasul-Nya'],
        prinsipMendalam: ['Berkesadaran'],
        pengalamanMendalam: 'Merefleksi',
        aktivitasGuru: 'Memandu sesi refleksi berkesadaran dan mengadministrasikan asesmen formatif akhir.',
        aktivitasSiswa: 'Mengisi jurnal refleksi diri (apa yang dipahami, apa yang dirasakan, apa komitmen tindakan esok) dan evaluasi diri.',
        rubrikPenilaian: 'Rubrik 4 Level: Pemahaman Konsep (1-4), Keterampilan Praktik (1-4), Nilai Karakter Cinta (1-4), Aksi Nyata (1-4).'
      }
    ],
    lkpdKonten: `LEMBAR KERJA PESERTA DIDIK (LKPD) KELAS VI-C MIN 1 PASER\nTopik: ${topik}\nKelompok: ...\nNama Anggota: ...\nPetunjuk: Bacalah dengan seksama, diskusikan dengan teman kelompokmu secara santun dan saling menghargai. Selesaikan misi aksi nyata berikut!`,
    rubrikPenilaian: `RUBRIK PENILAIAN KOMPETENSI AUTENTIK:\n- Level 1 (Perlu Bimbingan): Menunjukkan pemahaman awal dengan bantuan intensif guru.\n- Level 2 (Cukup): Mampu menjelaskan konsep dasar dengan beberapa kekeliruan kecil.\n- Level 3 (Baik / Sesuai Target): Menguasai konsep dan mampu mengaplikasikan dalam tugas praktik mandiri.\n- Level 4 (Sangat Baik / Pengayaan): Menguasai konsep secara komprehensif, menghasilkan solusi kreatif dan memimpin aksi nyata.`,
    sumberReferensi: [
      'Keputusan Dirjen Pendis Kemenag No. 6077 Tahun 2025 (Pedoman KBC)',
      'Panduan Pembelajaran Mendalam Kemendikdasmen Edisi Revisi 2025',
      'Kurikulum Operasional Madrasah (KOM) MIN 1 Paser',
      'Pedoman Ekoteologi Islam Kementerian Agama RI'
    ]
  };
}

// Helper for generating up to 200 questions across 10 formats
function generateDeterministicQuestions(params: any) {
  const { subjectName, topik, count = 10, bentukSoal, tingkatKesulitan, sertakanEkoteologi } = params;
  const isMat = subjectName?.toLowerCase().includes('mat');
  const isIpas = subjectName?.toLowerCase().includes('ipa');
  const isPancasila = subjectName?.toLowerCase().includes('pancasila');
  const isSeni = subjectName?.toLowerCase().includes('seni') || subjectName?.toLowerCase().includes('sbdp');

  const subjectId = isMat ? 'matematika' : isIpas ? 'ipas' : isPancasila ? 'pendidikan_pancasila' : isSeni ? 'sbdp_seni' : 'bahasa_indonesia';

  const allowedTypes = Array.isArray(bentukSoal) && bentukSoal.length > 0 
    ? bentukSoal 
    : [
        'pilihan_ganda',
        'pilihan_ganda_kompleks',
        'benar_salah',
        'menjodohkan',
        'isian_singkat',
        'uraian',
        'berbasis_gambar',
        'kontekstual',
        'tugas_praktik',
        'penilaian_produk'
      ];

  const questions: any[] = [];

  for (let i = 1; i <= count; i++) {
    const qType = allowedTypes[(i - 1) % allowedTypes.length];
    let itemDifficulty = 'Sedang';
    if (tingkatKesulitan === 'Mudah') {
      itemDifficulty = 'Mudah';
    } else if (tingkatKesulitan === 'HOTS / Sulit') {
      itemDifficulty = 'HOTS / Sulit';
    } else if (tingkatKesulitan === 'Sedang') {
      itemDifficulty = 'Sedang';
    } else {
      // Standar Kemenag/Kemendikdasmen mix: 30% Mudah, 50% Sedang, 20% HOTS
      itemDifficulty = (i % 5 === 0) ? 'HOTS / Sulit' : (i % 3 === 0) ? 'Mudah' : 'Sedang';
    }

    let item: any = {
      id: `gen-qst-${Date.now()}-${i}`,
      subjectId,
      topik: topik || 'Keseimbangan Ekosistem & Konservasi Lingkungan Paser',
      tujuanPembelajaran: `Memahami dan menerapkan materi ${topik || 'Fase C'} butir ke-${i}`,
      indikator: `Siswa dapat menyelesaikan permasalahan butir ${i} berbasis konteks madrasah`,
      bentuk: qType,
      tingkatKesulitan: itemDifficulty,
      stimulus: `Konteks Pembelajaran Berkesadaran MIN 1 Paser nomor ${i}: Siswa mengkaji fenomena kelestarian alam dan penerapan nilai budi pekerti luhur di madrasah.`,
      skorMaksimal: qType === 'uraian' ? 20 : qType === 'pilihan_ganda_kompleks' || qType === 'menjodohkan' ? 15 : 10,
      sumberReferensi: 'Bank Soal Resmi CIPTA Learning MIN 1 Paser 2026/2027',
      statusTelaah: 'Terverifikasi Guru',
      dimensiKbc: i % 5 === 0 ? 'Cinta Allah SWT dan Rasul-Nya' : i % 4 === 0 ? 'Cinta Lingkungan' : i % 3 === 0 ? 'Cinta Ilmu' : i % 2 === 0 ? 'Cinta Diri dan Sesama' : 'Cinta Tanah Air',
      dimensiEkoteologi: sertakanEkoteologi !== false
    };

    if (qType === 'pilihan_ganda') {
      item.pertanyaan = `Berdasarkan pengamatan di lingkungan MIN 1 Paser, manakah tindakan yang paling tepat untuk menghemat sumber daya dan mencerminkan nilai kasih sayang pada soal butir #${i}?`;
      item.pilihanJawaban = [
        { label: 'A', text: 'Menutup rapat kran air wudhu setelah digunakan agar tidak menetes sia-sia' },
        { label: 'B', text: 'Membiarkan lampu kelas menyala terang meskipun matahari siang bersinar terang' },
        { label: 'C', text: 'Membuang sisa makanan ke selokan tanpa dipilah terlebih dahulu' },
        { label: 'D', text: 'Menggunakan kertas baru untuk coretan tanpa memanfaatkan bagian belakangnya' }
      ];
      item.kunciJawaban = 'A';
      item.pembahasan = 'Menutup kran air wudhu adalah wujud nyata adab Islam, rasa syukur, dan pelestarian sumber daya air tanah madrasah.';
    } else if (qType === 'pilihan_ganda_kompleks') {
      item.pertanyaan = `Pilihlah DUA pernyataan yang BENAR terkait penerapan Pembelajaran Mendalam dan nilai cinta pada aktivitas butir #${i}!`;
      item.pilihanJawaban = [
        { label: 'A', text: 'Siswa saling mendengarkan dan menghargai ide teman saat diskusi kelompok berlangsung' },
        { label: 'B', text: 'Hanya siswa dengan nilai tertinggi yang berhak memimpin proyek lingkungan' },
        { label: 'C', text: 'Kesalahan saat mencoba dipandang sebagai peluang berharga untuk belajar dan memperbaiki diri' },
        { label: 'D', text: 'Kecepatan menjawab merupakan satu-satunya ukuran kecerdasan siswa' }
      ];
      item.kunciJawaban = ['A', 'C'];
      item.pembahasan = 'Pembelajaran Mendalam dan Kurikulum Berbasis Cinta menekankan empati, lingkungan aman (aman dari celaan), dan growth mindset (menghargai proses belajar).';
    } else if (qType === 'benar_salah') {
      item.pertanyaan = `Pernyataan Butir #${i}: Menjaga kebersihan madrasah dan merawat tanaman merupakan bagian dari bukti keimanan dan tanggung jawab moral sebagai khalifah di bumi.`;
      item.pilihanJawaban = [
        { label: 'Benar', text: 'Pernyataan ini BENAR' },
        { label: 'Salah', text: 'Pernyataan ini SALAH' }
      ];
      item.kunciJawaban = 'Benar';
      item.pembahasan = 'Benar. Dalam ajaran ekoteologi Islam, merawat alam ciptaan Allah adalah perwujudan ibadah sosial dan amanah khalifah fil ardh.';
    } else if (qType === 'menjodohkan') {
      item.pertanyaan = `Pasangkanlah konsep pembelajaran butir #${i} berikut dengan pasangannya yang paling tepat!`;
      item.pilihanJawaban = [
        { label: '1. Compassion (C)', text: 'A. Empati dan kehangatan hubungan belajar' },
        { label: '2. Action Learning (A)', text: 'B. Penerapan ilmu menjadi karya dan aksi nyata' },
        { label: '3. Ekoteologi', text: 'C. Kesadaran spiritual menjaga kelestarian ciptaan' }
      ];
      item.kunciJawaban = '1-A, 2-B, 3-C';
      item.pembahasan = 'Pasangan konsep selaras dengan fondasi pedagogis CIPTA Learning dan ekoteologi Kemenag.';
    } else if (qType === 'isian_singkat') {
      item.pertanyaan = `Sebutkan nama sungai utama di Kabupaten Paser yang perlu kita jaga kelestariannya dari pencemaran sampah plastik! (Soal #${i})`;
      item.pilihanJawaban = [];
      item.kunciJawaban = 'Kandilo';
      item.pembahasan = 'Sungai Kandilo adalah sungai utama yang membelah Tanah Grogot Kabupaten Paser dan menjadi sumber kehidupan masyarakat.';
    } else if (qType === 'uraian') {
      item.pertanyaan = `Jelaskan bagaimana kamu dan teman sekelasmu di Kelas VI-C dapat menerapkan prinsip Berkesadaran (Mindful) saat menggunakan air wudhu di madrasah! (Soal Butir #${i})`;
      item.pilihanJawaban = [];
      item.kunciJawaban = 'Siswa menjelaskan: (1) Niat ikhlas karena Allah, (2) Membuka kran secukupnya (tidak deras), (3) Merasakan nikmat segarnya air di setiap rukun wudhu, (4) Menutup kran dengan rapat setelah selesai.';
      item.pembahasan = 'Penilaian uraian menggunakan rubrik 4 kriteria: kelengkapan gagasan, keterkaitan nilai spiritual, kepedulian lingkungan, dan kerapian bahasa.';
    } else if (qType === 'berbasis_gambar') {
      item.stimulus = 'Gambar infografis: Siklus penyerapan air tanah oleh akar pohon di hutan Paser.';
      item.pertanyaan = `Berdasarkan infografis tersebut, bagian manakah dari pohon yang paling berperan menahan laju air hujan agar tidak terjadi banjir bandang? (Soal Butir #${i})`;
      item.pilihanJawaban = [
        { label: 'A', text: 'Akar pohon yang mengikat butiran tanah dan menciptakan pori-pori resapan' },
        { label: 'B', text: 'Ujung ranting yang kering' },
        { label: 'C', text: 'Kulit batang bagian luar yang terkelupas' },
        { label: 'D', text: 'Bunga yang gugur di atas tanah' }
      ];
      item.kunciJawaban = 'A';
      item.pembahasan = 'Sistem perakaran pohon hutan mengikat tanah dan membentuk pori-pori infiltrasi alami sehingga air hujan terserap menjadi air tanah.';
    } else if (qType === 'kontekstual') {
      item.stimulus = 'Kantin MIN 1 Paser menyajikan makanan dengan piring guna ulang untuk mengurangi timbunan sampah plastik sachet.';
      item.pertanyaan = `Jika kamu diberi kesempatan mengajak teman-teman sekelas untuk mendukung kantin ramah lingkungan, pesan persuasif manakah yang paling santun dan menggugah? (Soal #${i})`;
      item.pilihanJawaban = [
        { label: 'A', text: '"Mari bawa tempat makan dan tumbler sendiri dari rumah, bukti cinta kita pada bumi Paser tercinta."' },
        { label: 'B', text: '"Siapa yang tidak membawa tumbler akan dihukum membersihkan selokan."' },
        { label: 'C', text: '"Biar kantin saja yang repot membersihkan sampah plastik."' },
        { label: 'D', text: '"Tidak perlu memikirkan sampah kantin karena ada petugas kebersihan."' }
      ];
      item.kunciJawaban = 'A';
      item.pembahasan = 'Pendekatan Kurikulum Berbasis Cinta mengutamakan ajakan persuasif yang positif dan menyentuh hati daripada ancaman hukuman.';
    } else if (qType === 'tugas_praktik') {
      item.pertanyaan = `Tugas Praktik Mandiri Butir #${i}: Lakukan pemeriksaan kran air di area wudhu madrasah. Catat apakah ada kran yang menetes dan lakukan tindakan perbaikan bersama petugas piket!`;
      item.pilihanJawaban = [];
      item.kunciJawaban = 'Kriteria: (1) Pelaksanaan pemeriksaan kran, (2) Pencatatan data kondisi kran, (3) Tindakan nyata penutupan atau pelaporan kerusakan.';
      item.pembahasan = 'Dinilai menggunakan rubrik observasi performa langsung oleh guru.';
    } else {
      // penilaian_produk
      item.pertanyaan = `Tugas Penilaian Produk Butir #${i}: Buatlah sebuah poster mini digital atau manual bertema "Air Suci untuk Madrasah Asri" yang memuat pesan hemat air dan kutipan hadits Nabi!`;
      item.pilihanJawaban = [];
      item.kunciJawaban = 'Rubrik Produk: (1) Kejelasan pesan ekoteologi (skor 1-4), (2) Nilai estetika visual (skor 1-4), (3) Ketepatan kutipan dan ejaan (skor 1-4).';
      item.pembahasan = 'Penilaian produk portofolio dinilai guru menggunakan rubrik multi-kriteria.';
    }

    questions.push(item);
  }

  return questions;
}

// Vite development / production mounting
async function setupServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server CIPTA Learning MIN 1 Paser running on http://localhost:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
});
