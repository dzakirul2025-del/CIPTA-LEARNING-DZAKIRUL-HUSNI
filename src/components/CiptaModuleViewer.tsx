import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CiptaModule, CiptaStageContent } from '../types';
import { 
  BookOpen, 
  Layers, 
  Sparkles, 
  Heart, 
  CheckCircle, 
  Clock, 
  FileText, 
  ChevronRight, 
  Play, 
  Users, 
  Award, 
  HelpCircle,
  FileCheck2,
  Printer,
  Edit,
  ArrowLeft
} from 'lucide-react';

export const CiptaModuleViewer: React.FC = () => {
  const { modules, updateModule, role, setCurrentScreen, showToast } = useApp();
  
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || '');
  const [activeStageNumber, setActiveStageNumber] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const selectedModule = modules.find(m => m.id === selectedModuleId) || modules[0];

  if (!selectedModule) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
        <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800">Belum Ada Modul Tersedia</h3>
        <p className="text-xs text-slate-500 mt-1">Gunakan Generator AI untuk merancang modul pembelajaran baru.</p>
        <button
          type="button"
          onClick={() => setCurrentScreen('ai-generator')}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Buka Generator AI
        </button>
      </div>
    );
  }

  const activeStage = selectedModule.tahapan?.find(t => t.tahapNomor === activeStageNumber) || selectedModule.tahapan?.[0];

  const handleApproveModule = () => {
    updateModule(selectedModule.id, {
      status: 'Disetujui Kepala Madrasah',
      disetujuiOleh: 'Ismail, S.Ag.'
    });
    showToast('Modul resmi disetujui Kepala Madrasah Ismail, S.Ag.', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Module Selector & Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Modul Operasional CIPTA
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              selectedModule.status === 'Disetujui Kepala Madrasah'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : selectedModule.status === 'Draf AI'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {selectedModule.status}
            </span>
            {selectedModule.disetujuiOleh && (
              <span className="text-xs text-slate-500 hidden sm:inline">
                Oleh: {selectedModule.disetujuiOleh}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {selectedModule.judul}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            {selectedModule.tujuanPembelajaran}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <select
            value={selectedModuleId}
            onChange={(e) => {
              setSelectedModuleId(e.target.value);
              setActiveStageNumber(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 max-w-[220px] truncate"
          >
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.topik} ({m.kelas})
              </option>
            ))}
          </select>

          {role === 'guru' && selectedModule.status !== 'Disetujui Kepala Madrasah' && (
            <button
              type="button"
              onClick={handleApproveModule}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Setujui Modul
            </button>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300"
            title="Cetak Modul Ajar"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Stage Operational Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-600" />
          Alur 6 Tahap Operasional CIPTA Learning
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {selectedModule.tahapan?.map((st) => {
            const isCurrent = activeStageNumber === st.tahapNomor;
            return (
              <button
                key={st.tahapNomor}
                type="button"
                onClick={() => setActiveStageNumber(st.tahapNomor)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-700 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-emerald-200' : 'text-slate-500'}`}>
                  Tahap {st.tahapNomor}
                </div>
                <div className="font-bold text-xs sm:text-sm mt-0.5 line-clamp-1">
                  {st.namaTahap.split(':')[1]?.trim() || st.namaTahap}
                </div>
                <div className={`text-[10px] mt-1 flex items-center gap-1 font-semibold ${isCurrent ? 'text-emerald-100' : 'text-emerald-700'}`}>
                  <span>{st.unsurCipta}</span> • <span>{st.alokasiMenit} Menit</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Card */}
      {activeStage && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          {/* Header of Active Stage */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Tahap {activeStage.tahapNomor}: {activeStage.unsurCipta}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeStage.namaTahap}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Alokasi Waktu: <strong>{activeStage.alokasiMenit} Menit</strong> • Pengalaman Belajar: <strong>{activeStage.pengalamanMendalam}</strong>
              </p>
            </div>

            {/* Badges for KBC and Deep Learning */}
            <div className="flex flex-wrap items-center gap-1.5">
              {activeStage.kbcTerkait?.map((kbc, i) => (
                <span key={i} className="text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                  ❤️ {kbc}
                </span>
              ))}
              {activeStage.prinsipMendalam?.map((pr, i) => (
                <span key={i} className="text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                  🧠 {pr}
                </span>
              ))}
            </div>
          </div>

          {/* Goal & Activity Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Aktivitas & Peran Guru
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {activeStage.aktivitasGuru}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                Aktivitas & Pengalaman Siswa
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {activeStage.aktivitasSiswa}
              </p>
            </div>
          </div>

          {/* Contextual Elements Based on Stage */}
          {activeStage.tahapNomor === 1 && activeStage.pertanyaanPemantik && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Pertanyaan Pemantik Berkesadaran (Mindful Questioning)
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950">
                {activeStage.pertanyaanPemantik.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>"{q}"</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeStage.tahapNomor === 2 && activeStage.kontenMateri && (
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Inti Konsep & Eksplorasi Visual
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {activeStage.kontenMateri}
              </p>
            </div>
          )}

          {activeStage.tahapNomor === 3 && activeStage.instruksiTantangan && (
            <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
                <Play className="w-4 h-4" /> Instruksi Tantangan Interaktif
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {activeStage.instruksiTantangan}
              </p>
              <button
                type="button"
                onClick={() => setCurrentScreen('games')}
                className="mt-3 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold"
              >
                Buka Game Edukatif di Studio
              </button>
            </div>
          )}

          {activeStage.tahapNomor === 4 && activeStage.panduanDiferensiasi && (
            <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Panduan Pembelajaran Berdiferensiasi
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <div className="text-[11px] font-bold text-amber-700">1. Jalur Dukungan</div>
                  <p className="text-[11px] text-slate-600 mt-1">{activeStage.panduanDiferensiasi.dukungan}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <div className="text-[11px] font-bold text-emerald-700">2. Jalur Sesuai Target</div>
                  <p className="text-[11px] text-slate-600 mt-1">{activeStage.panduanDiferensiasi.reguler}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-200">
                  <div className="text-[11px] font-bold text-purple-700">3. Jalur Pengayaan</div>
                  <p className="text-[11px] text-slate-600 mt-1">{activeStage.panduanDiferensiasi.pengayaan}</p>
                </div>
              </div>
            </div>
          )}

          {activeStage.tahapNomor === 5 && activeStage.rencanaAksiNyata && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Rencana Aksi Nyata & Insersi Ekoteologi
              </h4>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {activeStage.rencanaAksiNyata}
              </p>
            </div>
          )}

          {activeStage.tahapNomor === 6 && activeStage.rubrikPenilaian && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-300">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4" /> Kriteria Rubrik Asesmen Akhir
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeStage.rubrikPenilaian}
              </p>
            </div>
          )}

          {/* Media and Tools */}
          {activeStage.mediaDanAlat && (
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Media & Sarana Pembelajaran:</span>
              <span>{activeStage.mediaDanAlat.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Panca Cinta & Ekoteologi Integrated Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* KBC Panca Cinta Mapping */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-rose-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Integrasi Kurikulum Berbasis Cinta (KBC)
            </h3>
          </div>
          <div className="space-y-3">
            {selectedModule.kbcMappings?.map((map, i) => (
              <div key={i} className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-xs">
                <div className="font-bold text-rose-800">{map.dimensi}</div>
                <div className="text-slate-700 mt-1"><strong>Nilai:</strong> {map.nilaiUtama}</div>
                <div className="text-slate-600 mt-0.5"><strong>Aktivitas:</strong> {map.aktivitasPenerapan}</div>
                <div className="text-slate-500 mt-0.5 text-[11px]"><strong>Bukti Refleksi:</strong> {map.buktiRefleksi}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ekoteologi Contextual Dimension */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Insersi Ekoteologi & Tanggung Jawab Moral Ciptaan
            </h3>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2">
            <div>
              <span className="font-semibold text-emerald-900">Alasan Kontekstual:</span>
              <p className="text-slate-700 mt-0.5">{selectedModule.ecoTheology?.alasanKontekstual}</p>
            </div>
            <div>
              <span className="font-semibold text-emerald-900">Tindakan Nyata Siswa:</span>
              <p className="text-slate-700 mt-0.5">{selectedModule.ecoTheology?.tindakanNyata}</p>
            </div>
            {selectedModule.ecoTheology?.targetKonservasi && (
              <div className="pt-2 border-t border-emerald-200 text-emerald-800 font-semibold">
                🎯 {selectedModule.ecoTheology.targetKonservasi}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
