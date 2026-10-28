import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Student } from '../types';
import { 
  Users, 
  UserPlus, 
  Upload, 
  Download, 
  KeyRound, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Edit3, 
  Trash2, 
  Printer, 
  FileSpreadsheet, 
  ShieldCheck,
  RefreshCw,
  QrCode
} from 'lucide-react';

export const StudentManager: React.FC = () => {
  const { 
    students, 
    addStudent, 
    updateStudent, 
    deleteStudent, 
    importStudents, 
    resetStudentPin, 
    config, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState<'all' | 'L' | 'P'>('all');
  const [filterLevel, setFilterLevel] = useState<'all' | 'Dukungan' | 'Sesuai Target' | 'Pengayaan'>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [selectedStudentForPin, setSelectedStudentForPin] = useState<Student | null>(null);
  const [newGeneratedPin, setNewGeneratedPin] = useState<string>('');
  const [isPrintCardOpen, setIsPrintCardOpen] = useState(false);

  // Form states for manual student
  const [formData, setFormData] = useState({
    noUrut: students.length + 1,
    namaLengkap: '',
    nisn: '',
    nisLokal: '',
    jenisKelamin: 'L' as 'L' | 'P',
    kelas: 'VI-C',
    tahunAjaran: config.tahunAjaranAktif,
    pin: '',
    levelBelajar: 'Sesuai Target' as 'Dukungan' | 'Sesuai Target' | 'Pengayaan'
  });

  // Import State
  const [importText, setImportText] = useState('');
  const [previewList, setPreviewList] = useState<any[]>([]);
  const [importReport, setImportReport] = useState<{ success: number; dup: number; errors: string[] } | null>(null);

  // Filtered Students
  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery) ||
      s.nisLokal.includes(searchQuery);
    const matchesGender = filterGender === 'all' || s.jenisKelamin === filterGender;
    const matchesLevel = filterLevel === 'all' || s.levelBelajar === filterLevel;
    return matchesSearch && matchesGender && matchesLevel;
  });

  const perempuanCount = students.filter(s => s.jenisKelamin === 'P').length;
  const lakiLakiCount = students.filter(s => s.jenisKelamin === 'L').length;

  // Handle parse pasted/uploaded CSV
  const handleParseCsv = (text: string) => {
    const lines = text.trim().split('\n');
    const parsed: any[] = [];
    const errors: string[] = [];

    lines.forEach((line, index) => {
      // Skip empty or header line
      if (!line.trim() || index === 0 && line.toLowerCase().includes('nama')) return;

      // Split by semicolon, comma, or tab
      const parts = line.split(/[;,\t]/).map(p => p.trim().replace(/^["']|["']$/g, ''));
      if (parts.length >= 3) {
        const noUrut = Number(parts[0]) || index;
        const namaLengkap = parts[1];
        const nisn = parts[2];
        const nisLokal = parts[3] || `${2400 + index}`;
        const jkRaw = parts[4]?.toUpperCase();
        const jenisKelamin = jkRaw === 'P' || jkRaw === 'PEREMPUAN' ? 'P' : 'L';

        if (!namaLengkap || namaLengkap.length < 3) {
          errors.push(`Baris ${index + 1}: Nama '${namaLengkap}' tidak valid.`);
          return;
        }
        if (!nisn || nisn.length < 5) {
          errors.push(`Baris ${index + 1}: NISN '${nisn}' tidak valid.`);
          return;
        }

        parsed.push({
          noUrut,
          namaLengkap,
          nisn,
          nisLokal,
          jenisKelamin,
          kelas: 'VI-C',
          tahunAjaran: config.tahunAjaranAktif,
          pin: Math.floor(100000 + Math.random() * 900000).toString(),
          statusVerifikasi: 'Tervalidasi',
          totalPoinKebaikan: 120,
          levelBelajar: 'Sesuai Target'
        });
      }
    });

    setPreviewList(parsed);
    if (errors.length > 0) {
      setImportReport({ success: parsed.length, dup: 0, errors });
    }
  };

  const handleExecuteImport = () => {
    if (previewList.length === 0) return;
    const result = importStudents(previewList);
    setImportReport({
      success: result.successCount,
      dup: result.duplicateCount,
      errors: result.errors
    });
    setPreviewList([]);
    setImportText('');
  };

  // Export to CSV string
  const handleExportCsv = () => {
    const headers = 'No,Nama Lengkap,NISN,NIS Lokal,Jenis Kelamin,Kelas,Tahun Ajaran,Status,Level Belajar\n';
    const rows = students.map(s => 
      `"${s.noUrut}","${s.namaLengkap}","\t${s.nisn}","\t${s.nisLokal}","${s.jenisKelamin}","${s.kelas}","${s.tahunAjaran}","${s.statusVerifikasi}","${s.levelBelajar}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DATA_SISWA_VI-C_MIN_1_PASER_${config.tahunAjaranAktif.replace('/', '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data siswa berhasil diekspor ke CSV', 'success');
  };

  const openResetPin = (st: Student) => {
    setSelectedStudentForPin(st);
    setNewGeneratedPin(Math.floor(100000 + Math.random() * 900000).toString());
    setIsPinModalOpen(true);
  };

  const confirmResetPin = () => {
    if (selectedStudentForPin) {
      resetStudentPin(selectedStudentForPin.id, newGeneratedPin);
      setIsPinModalOpen(false);
      setSelectedStudentForPin(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Roster Resmi Kelas VI-C
            </span>
            <span className="text-xs text-slate-500 font-medium">
              MIN 1 Paser • TP {config.tahunAjaranAktif}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Manajemen Data Siswa & Kredensial PIN
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Data sumber terverifikasi: <strong>27 Siswa</strong> ({perempuanCount} Perempuan, {lakiLakiCount} Laki-laki). NISN & NIS Lokal disimpan aman sebagai string berdigit utuh.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-slate-300"
          >
            <Upload className="w-4 h-4 text-slate-600" />
            <span>Impor CSV / Excel</span>
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-slate-300"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Ekspor Data</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPrintCardOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-slate-300"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak Kartu Siswa</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({
                noUrut: students.length + 1,
                namaLengkap: '',
                nisn: '',
                nisLokal: `${2400 + students.length + 1}`,
                jenisKelamin: 'L',
                kelas: 'VI-C',
                tahunAjaran: config.tahunAjaranAktif,
                pin: Math.floor(100000 + Math.random() * 900000).toString(),
                levelBelajar: 'Sesuai Target'
              });
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Siswa</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, NISN, atau NIS lokal..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterGender}
            onChange={(e: any) => setFilterGender(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Semua Gender ({students.length})</option>
            <option value="P">Perempuan ({perempuanCount})</option>
            <option value="L">Laki-laki ({lakiLakiCount})</option>
          </select>

          <select
            value={filterLevel}
            onChange={(e: any) => setFilterLevel(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Semua Jalur Belajar</option>
            <option value="Dukungan">Jalur Dukungan</option>
            <option value="Sesuai Target">Jalur Sesuai Target</option>
            <option value="Pengayaan">Jalur Pengayaan</option>
          </select>
        </div>
      </div>

      {/* Table of Students */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3 text-center w-12">No</th>
                <th className="px-4 py-3">Nama Lengkap</th>
                <th className="px-4 py-3">NISN</th>
                <th className="px-4 py-3">NIS Lokal</th>
                <th className="px-4 py-3 text-center">L/P</th>
                <th className="px-4 py-3">Jalur Belajar</th>
                <th className="px-4 py-3 text-center">PIN Akses</th>
                <th className="px-4 py-3 text-center">Poin Kebaikan</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 text-center font-bold text-slate-500">
                      {st.noUrut}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {st.namaLengkap}
                    </td>
                    <td className="px-4 py-3 font-mono text-emerald-900 font-medium">
                      {st.nisn}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">
                      {st.nisLokal}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        st.jenisKelamin === 'P' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {st.jenisKelamin}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        st.levelBelajar === 'Pengayaan' ? 'bg-purple-100 text-purple-800' :
                        st.levelBelajar === 'Dukungan' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {st.levelBelajar}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-slate-800">
                      <div className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        <span>{st.pin}</span>
                        <button
                          type="button"
                          onClick={() => openResetPin(st)}
                          title="Reset PIN"
                          className="text-slate-400 hover:text-emerald-700 ml-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-amber-600">
                      ⭐ {st.totalPoinKebaikan}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        {st.statusVerifikasi}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingStudent(st)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Edit Siswa"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus data ${st.namaLengkap}?`)) {
                              deleteStudent(st.id);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-400">
                    Tidak ditemukan data siswa yang sesuai pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Tambah Siswa Baru */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Tambah Data Siswa Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              addStudent({
                ...formData,
                statusVerifikasi: 'Tervalidasi',
                totalPoinKebaikan: 100
              });
              setIsAddModalOpen(false);
            }} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  value={formData.namaLengkap}
                  onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                  placeholder="Contoh: Muhammad Raihan Pratama"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NISN (10 Digit String)</label>
                  <input
                    type="text"
                    required
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    placeholder="Contoh: 0148291028"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NIS Lokal</label>
                  <input
                    type="text"
                    required
                    value={formData.nisLokal}
                    onChange={(e) => setFormData({ ...formData, nisLokal: e.target.value })}
                    placeholder="Contoh: 2428"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e: any) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jalur Belajar</label>
                  <select
                    value={formData.levelBelajar}
                    onChange={(e: any) => setFormData({ ...formData, levelBelajar: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="Sesuai Target">Sesuai Target</option>
                    <option value="Dukungan">Jalur Dukungan</option>
                    <option value="Pengayaan">Jalur Pengayaan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PIN Login (Aman 6 Digit)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.pin}
                    onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, pin: Math.floor(100000 + Math.random() * 900000).toString() })}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg shrink-0"
                  >
                    Acak PIN
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Siswa */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Edit Data Siswa</h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              updateStudent(editingStudent.id, editingStudent);
              setEditingStudent(null);
            }} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  value={editingStudent.namaLengkap}
                  onChange={(e) => setEditingStudent({ ...editingStudent, namaLengkap: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NISN</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.nisn}
                    onChange={(e) => setEditingStudent({ ...editingStudent, nisn: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NIS Lokal</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.nisLokal}
                    onChange={(e) => setEditingStudent({ ...editingStudent, nisLokal: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={editingStudent.jenisKelamin}
                    onChange={(e: any) => setEditingStudent({ ...editingStudent, jenisKelamin: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jalur Belajar</label>
                  <select
                    value={editingStudent.levelBelajar}
                    onChange={(e: any) => setEditingStudent({ ...editingStudent, levelBelajar: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="Sesuai Target">Sesuai Target</option>
                    <option value="Dukungan">Jalur Dukungan</option>
                    <option value="Pengayaan">Jalur Pengayaan</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Impor CSV / Excel Data Siswa */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Impor Data Siswa Kelas VI-C</h3>
                <p className="text-xs text-slate-500">Salin dan tempel data berformat CSV atau teks tabel excel</p>
              </div>
              <button onClick={() => { setIsImportModalOpen(false); setImportReport(null); setPreviewList([]); }} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                <strong>Format Kolom:</strong> <code>No; Nama Lengkap; NISN; NIS Lokal; L/P</code><br />
                Pemisah dapat berupa titik koma (;), koma (,), atau tabulasi. NISN dan NIS lokal akan otomatis disimpan sebagai teks string.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tempel Baris Data Disini:
                </label>
                <textarea
                  rows={5}
                  value={importText}
                  onChange={(e) => {
                    setImportText(e.target.value);
                    handleParseCsv(e.target.value);
                  }}
                  placeholder="1; Ahmad Fatih; 0148291028; 2428; L&#10;2; Siti Nurhaliza; 0149201928; 2429; P"
                  className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Preview Table */}
              {previewList.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">
                      Pratinjau Data Siap Impor ({previewList.length} Siswa):
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Semua kolom valid</span>
                  </div>
                  <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-3 py-2">No</th>
                          <th className="px-3 py-2">Nama</th>
                          <th className="px-3 py-2">NISN</th>
                          <th className="px-3 py-2">NIS</th>
                          <th className="px-3 py-2">L/P</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {previewList.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-3 py-1.5 font-bold text-slate-500">{p.noUrut}</td>
                            <td className="px-3 py-1.5 font-semibold text-slate-800">{p.namaLengkap}</td>
                            <td className="px-3 py-1.5 font-mono text-emerald-800">{p.nisn}</td>
                            <td className="px-3 py-1.5 font-mono">{p.nisLokal}</td>
                            <td className="px-3 py-1.5 font-bold">{p.jenisKelamin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Import Report */}
              {importReport && (
                <div className={`p-4 rounded-xl text-xs ${
                  importReport.errors.length > 0 ? 'bg-amber-50 border border-amber-200 text-amber-900' : 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                }`}>
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {importReport.errors.length > 0 ? <AlertTriangle className="w-4 h-4 text-amber-600" /> : <CheckCircle className="w-4 h-4 text-emerald-600" />}
                    Laporan Hasil Validasi:
                  </div>
                  <div>• Berhasil diimpor: <strong>{importReport.success}</strong> baris</div>
                  {importReport.dup > 0 && <div>• Duplikasi NISN diabaikan: <strong>{importReport.dup}</strong> baris</div>}
                  {importReport.errors.length > 0 && (
                    <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                      {importReport.errors.map((err, i) => (
                        <div key={i} className="text-rose-700">• {err}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  disabled={previewList.length === 0}
                  onClick={handleExecuteImport}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Proses Impor {previewList.length > 0 ? `(${previewList.length} Siswa)` : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reset PIN */}
      {isPinModalOpen && selectedStudentForPin && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Reset Kredensial PIN Siswa</h3>
            <p className="text-xs text-slate-500 mt-1">
              {selectedStudentForPin.namaLengkap} (NISN: {selectedStudentForPin.nisn})
            </p>

            <div className="my-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">PIN Baru Yang Dihasilkan</div>
              <div className="text-2xl font-black text-emerald-800 tracking-widest font-mono mt-1">
                {newGeneratedPin}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Bukan NISN / tanggal lahir (sesuai standar privasi)</p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="w-1/2 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmResetPin}
                className="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Simpan PIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cetak Kartu Siswa */}
      {isPrintCardOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 print:hidden">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Kartu Digital Peserta Didik MIN 1 Paser</h3>
                <p className="text-xs text-slate-500">Kelas VI-C • Tahun Pelajaran {config.tahunAjaranAktif}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-emerald-700 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak Semua
                </button>
                <button onClick={() => setIsPrintCardOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {students.map((st) => (
                <div key={st.id} className="p-4 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/50 to-white shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-2 mb-2">
                      <div className="text-[11px] font-bold text-emerald-900">MIN 1 PASER</div>
                      <span className="text-[10px] font-semibold bg-emerald-200/60 text-emerald-800 px-1.5 py-0.5 rounded">
                        KARTU SISWA VI-C
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm truncate">{st.namaLengkap}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">NISN: <span className="font-mono font-semibold">{st.nisn}</span></div>
                    <div className="text-[11px] text-slate-600">NIS Lokal: <span className="font-mono font-semibold">{st.nisLokal}</span></div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">PIN LOGIN CBT</div>
                      <div className="text-base font-black font-mono text-emerald-800">{st.pin}</div>
                    </div>
                    <div className="p-1.5 bg-white rounded-lg border border-emerald-200">
                      <QrCode className="w-6 h-6 text-emerald-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
