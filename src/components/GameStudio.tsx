import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Gamepad2, 
  Sparkles, 
  Trees, 
  Droplet, 
  Heart, 
  Award, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Sliders, 
  ArrowRight,
  Flame,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GameStudio: React.FC = () => {
  const { currentStudent, updateStudent, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'quest' | 'compost_sim' | 'water_sim'>('quest');

  // Eco-Quest State
  const [questLevel, setQuestLevel] = useState<number>(0);
  const [questScore, setQuestScore] = useState<number>(0);
  const [questFeedback, setQuestFeedback] = useState<string | null>(null);
  const [selectedQuestOption, setSelectedQuestOption] = useState<number | null>(null);

  const questLevels = [
    {
      level: 1,
      title: 'Misi 1: Penyelamatan Bibit Mangrove Teluk Adang',
      story: 'Kamu dan regu hijau kelas VI-C tiba di pesisir Teluk Adang Paser. Ombak besar mengancam pantai karena hutan mangrove mulai berkurang.',
      question: 'Apa langkah awal paling tepat yang mencerminkan rasa cinta lingkungan dan kepedulian terhadap ekosistem pesisir?',
      options: [
        { text: 'Membuat pemecah ombak dari semen tanpa menanam pohon', correct: false, explain: 'Semen tidak dapat berkembang biak secara alami dan merusak habitat kepiting bakau.' },
        { text: 'Menanam bibit mangrove berakar tunjang bersama warga sekitar secara gotong royong', correct: true, explain: 'Luar biasa! Akar tunjang mangrove meredam gelombang, mengikat lumpur, dan menjadi rumah ikan.' },
        { text: 'Membuang sampah botol plastik ke laut agar terapung', correct: false, explain: 'Plastik akan menjadi mikroplastik yang meracuni ikan dan manusia.' }
      ]
    },
    {
      level: 2,
      title: 'Misi 2: Konservasi Sungai Kandilo Tanah Grogot',
      story: 'Di tepian Sungai Kandilo, terlihat beberapa orang membuang kantong plastik ke air yang mengalir tenang.',
      question: 'Bagaimana pendekatan Kurikulum Berbasis Cinta (Compassion) dalam menegur perilaku tersebut?',
      options: [
        { text: 'Meneriaki dan memotretnya untuk diviralkan di media sosial', correct: false, explain: 'Mempermalukan orang lain melanggar adab kasih sayang dan memicu kemarahan.' },
        { text: 'Mendekati dengan senyum santun, mengajak membuang ke tempat sampah, dan membagikan totebag ramah lingkungan', correct: true, explain: 'Tepat sekali! Menghargai sesama dengan teladan baik menyentuh hati dan mengubah perilaku secara berkelanjutan.' },
        { text: 'Masa bodoh karena bukan urusan kita', correct: false, explain: 'Seorang muslim yang peduli lingkungan tidak boleh apatis terhadap kerusakan alam.' }
      ]
    },
    {
      level: 3,
      title: 'Misi 3: Hemat Air Wudhu Masjid Madrasah',
      story: 'Siswa kelas VI-C bersiap menunaikan sholat Dzuhur berjamaah di masjid MIN 1 Paser. Terdapat 12 kran wudhu.',
      question: 'Berapakah takaran wudhu ideal yang dicontohkan Rasulullah SAW agar tidak mubazir?',
      options: [
        { text: 'Sekitar 1 ember besar (10 liter)', correct: false, explain: 'Terlalu banyak dan masuk kategori mubazir (berlebih-lebihan).' },
        { text: 'Sekitar 1 mud (sekitar 0,6 liter atau 1 botol minum sedang)', correct: true, explain: 'Masya Allah benar! Rasulullah SAW berwudhu dengan 1 mud air, membasuh dengan tertib dan hemat.' },
        { text: 'Membuka kran sebesar-besarnya agar cepat bersih', correct: false, explain: 'Membuka kran deras membuat air terbuang ke selokan tanpa mengenai anggota wudhu secara sempurna.' }
      ]
    },
    {
      level: 4,
      title: 'Misi 4: Kompos Daun Peneduh Kelas VI-C',
      story: 'Halaman kelas penuh dengan guguran daun pohon mangga dan ketapang. Temanmu berniat membakarnya agar cepat hilang.',
      question: 'Mengapa membakar sampah daun dilarang dalam pandangan sains dan ekoteologi?',
      options: [
        { text: 'Membakar daun menghasilkan gas karbon monoksida dan asap yang merusak pernapasan serta ozon bumi', correct: true, explain: 'Tepat sekali! Daun kering lebih mulia dicacah menjadi kompos untuk menyuburkan tanah madrasah.' },
        { text: 'Membakar daun membutuhkan korek api yang mahal', correct: false, explain: 'Bukan alasan ilmiah dan ekologis yang substantif.' },
        { text: 'Membakar daun membuat tanah menjadi terlalu dingin', correct: false, explain: 'Salah secara sains biologi tanah.' }
      ]
    }
  ];

  const handleAnswerQuest = (optionIndex: number) => {
    setSelectedQuestOption(optionIndex);
    const currentQ = questLevels[questLevel];
    const option = currentQ.options[optionIndex];

    if (option.correct) {
      setQuestScore(prev => prev + 25);
      setQuestFeedback(option.explain);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
      if (currentStudent) {
        updateStudent(currentStudent.id, {
          totalPoinKebaikan: (currentStudent.totalPoinKebaikan || 100) + 10
        });
      }
    } else {
      setQuestFeedback(option.explain);
    }
  };

  const nextQuestLevel = () => {
    setSelectedQuestOption(null);
    setQuestFeedback(null);
    if (questLevel < questLevels.length - 1) {
      setQuestLevel(prev => prev + 1);
    } else {
      showToast('Selamat! Seluruh Misi Ekoteologi telah berhasil kamu selesaikan!', 'success');
    }
  };

  // Compost Simulator State
  const [leafVolume, setLeafVolume] = useState<number>(60); // liters
  const [moisturePercent, setMoisturePercent] = useState<number>(50); // %
  const [starterEm4, setStarterEm4] = useState<number>(100); // ml

  const estimatedDays = Math.round(30 - (starterEm4 / 20) + Math.abs(50 - moisturePercent) / 3);
  const compostYieldKg = Math.round(leafVolume * 0.35);
  const co2PreventedKg = Math.round(leafVolume * 0.22);

  // Water Conservation Simulator State
  const [tapFlowRate, setTapFlowRate] = useState<number>(3); // liters per min
  const [wudhuMinutes, setWudhuMinutes] = useState<number>(1.5); // min per student
  const [activeStudentsCount, setActiveStudentsCount] = useState<number>(27);

  const baselineWaterUsed = Math.round(6 * wudhuMinutes * activeStudentsCount); // if opened fully at 6L/min
  const actualWaterUsed = Math.round(tapFlowRate * wudhuMinutes * activeStudentsCount);
  const waterSavedLiters = Math.max(0, baselineWaterUsed - actualWaterUsed);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5" /> Studio Game Edukatif
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Joyful Learning • Simulasi Sains • Skor Bintang Kebaikan
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Game Edukatif & Simulator Ekoteologi Paser
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Belajar menyenangkan tanpa rasa takut salah. Mengasah empati, berpikir kritis, dan mensimulasikan dampak nyata aksi lingkungan di madrasah.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('quest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'quest' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Petualangan Ekoteologi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compost_sim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'compost_sim' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Simulasi Komposter
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('water_sim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'water_sim' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Simulasi Hemat Air
          </button>
        </div>
      </div>

      {/* Tab: Quest Petualangan Ekoteologi */}
      {activeTab === 'quest' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Tingkat {questLevels[questLevel].level} dari {questLevels.length}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                {questLevels[questLevel].title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total Skor Quest</span>
              <div className="text-2xl font-black text-amber-500 flex items-center gap-1 justify-end">
                <Star className="w-5 h-5 fill-amber-400" /> {questScore}
              </div>
            </div>
          </div>

          {/* Story Narrative Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 leading-relaxed">
            📜 <strong>Kisah Tantangan:</strong> {questLevels[questLevel].story}
          </div>

          {/* Question Text */}
          <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            ❓ {questLevels[questLevel].question}
          </div>

          {/* Option Choices */}
          <div className="space-y-3">
            {questLevels[questLevel].options.map((opt, idx) => {
              const isSelected = selectedQuestOption === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={selectedQuestOption !== null}
                  onClick={() => handleAnswerQuest(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${
                    isSelected
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500'
                        : 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 ${
                    isSelected
                      ? opt.correct ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="mt-0.5 font-medium">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback Area */}
          {questFeedback && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
              questLevels[questLevel].options[selectedQuestOption!].correct
                ? 'bg-emerald-100 border border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border border-amber-300 text-amber-950'
            }`}>
              {questLevels[questLevel].options[selectedQuestOption!].correct ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold mb-0.5">
                  {questLevels[questLevel].options[selectedQuestOption!].correct ? 'Jawaban Tepat! (+25 Skor Bintang)' : 'Ulasan Pembelajaran Mendalam:'}
                </div>
                <div>{questFeedback}</div>
              </div>
            </div>
          )}

          {/* Next Level Button */}
          {selectedQuestOption !== null && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={nextQuestLevel}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{questLevel < questLevels.length - 1 ? 'Lanjut ke Misi Berikutnya' : 'Selesaikan Petualangan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Simulasi Komposter Daun Kering */}
      {activeTab === 'compost_sim' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Kontrol Parameter Komposter Organik MIN 1 Paser
            </h3>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Volume Cacahan Daun Kering:</span>
                <span className="font-mono text-emerald-700">{leafVolume} Liter</span>
              </div>
              <input
                type="range"
                min={20}
                max={150}
                step={5}
                value={leafVolume}
                onChange={(e) => setLeafVolume(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Kapasitas tong komposter kelas VI-C (20 - 150 Liter)</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Tingkat Kelembaban Air (Moisture):</span>
                <span className="font-mono text-emerald-700">{moisturePercent}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={80}
                step={5}
                value={moisturePercent}
                onChange={(e) => setMoisturePercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Kelembaban optimal mikroba aerobik berada pada 50%</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Aktivator Mikroorganisme (EM4):</span>
                <span className="font-mono text-emerald-700">{starterEm4} mL</span>
              </div>
              <input
                type="range"
                min={20}
                max={200}
                step={10}
                value={starterEm4}
                onChange={(e) => setStarterEm4(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Cairan bakteri pengurai alami</span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Estimasi Panen & Dampak Ekoteologi
                </span>
                <span className="text-[11px] bg-emerald-700/60 px-2 py-0.5 rounded text-emerald-200">
                  Simulasi Ilmiah
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                  <div className="text-xs text-emerald-200">Waktu Kematangan Kompos</div>
                  <div className="text-3xl font-black text-white mt-1">{estimatedDays} Hari</div>
                  <div className="text-[10px] text-emerald-300 mt-1">Siap dipanen untuk tanaman obat</div>
                </div>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                  <div className="text-xs text-emerald-200">Hasil Pupuk Kompos Alami</div>
                  <div className="text-3xl font-black text-white mt-1">{compostYieldKg} Kg</div>
                  <div className="text-[10px] text-emerald-300 mt-1">Subur tanpa bahan kimia</div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/50 flex items-center gap-3">
                <Trees className="w-8 h-8 text-emerald-300 shrink-0" />
                <div className="text-xs leading-relaxed">
                  <strong>Pencegahan Polusi Udara:</strong> Dengan mengomposkan {leafVolume} liter daun, kelas VI-C mencegah pelepasan <strong>{co2PreventedKg} kg emisi CO2</strong> dari pembakaran sampah terbuka!
                </div>
              </div>
            </div>

            <div className="text-[11px] text-emerald-200/80 pt-4 border-t border-emerald-700/40 mt-4">
              Nilai KBC: Cinta Lingkungan & Cinta Ilmu • Data dapat digunakan untuk bahan laporan portofolio.
            </div>
          </div>
        </div>
      )}

      {/* Tab: Simulasi Penghematan Air Wudhu */}
      {activeTab === 'water_sim' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-sky-600" />
              Parameter Penggunaan Air Wudhu MIN 1 Paser
            </h3>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Debit Aliran Kran (Bukaan Kran):</span>
                <span className="font-mono text-sky-700">{tapFlowRate} Liter / Menit</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                step={0.5}
                value={tapFlowRate}
                onChange={(e) => setTapFlowRate(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Bukaan kran santun (1 - 2 L/m) vs bukaan penuh boros (6 L/m)</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Rata-rata Durasi Wudhu:</span>
                <span className="font-mono text-sky-700">{wudhuMinutes} Menit</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.5}
                value={wudhuMinutes}
                onChange={(e) => setWudhuMinutes(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Jumlah Siswa Berwudhu (Kelas VI-C):</span>
                <span className="font-mono text-sky-700">{activeStudentsCount} Siswa</span>
              </div>
              <input
                type="range"
                min={1}
                max={27}
                value={activeStudentsCount}
                onChange={(e) => setActiveStudentsCount(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-sky-800 to-indigo-900 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  Hasil Perhitungan Konservasi Air Bersih
                </span>
                <span className="text-[11px] bg-sky-700/60 px-2 py-0.5 rounded text-sky-200">
                  Matematika Ramah Lingkungan
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                  <div className="text-xs text-sky-200">Air Terpakai Saat Ini</div>
                  <div className="text-3xl font-black text-white mt-1">{actualWaterUsed} Liter</div>
                  <div className="text-[10px] text-sky-300 mt-1">Untuk {activeStudentsCount} siswa sekali sholat</div>
                </div>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                  <div className="text-xs text-emerald-300 font-bold">Air Yang Diselamatkan</div>
                  <div className="text-3xl font-black text-emerald-300 mt-1">{waterSavedLiters} Liter</div>
                  <div className="text-[10px] text-emerald-200 mt-1">Dibandingkan kran dibuka penuh</div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-sky-950/40 border border-sky-700/50 flex items-center gap-3">
                <Droplet className="w-8 h-8 text-sky-300 shrink-0" />
                <div className="text-xs leading-relaxed">
                  <strong>Hikmah Hadits:</strong> "Janganlah kamu berlebih-lebihan dalam berwudhu meskipun kamu berada di sungai yang mengalir deras." (HR. Ibnu Majah).
                </div>
              </div>
            </div>

            <div className="text-[11px] text-sky-200/80 pt-4 border-t border-sky-700/40 mt-4">
              Air bekas wudhu yang ditampung dapat menyirami 15 pot hidroponik sayur mayur madrasah.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
