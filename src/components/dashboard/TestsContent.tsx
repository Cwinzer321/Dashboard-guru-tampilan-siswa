'use client';

import { useState } from 'react';

interface Student {
  id: number;
  nis: string;
  name: string;
  gender: string;
  school_class: {
    name: string;
    grade: string;
  };
  latest_test_result?: {
    total_score: number;
    recommended_major: string;
    major_confidence: number;
    test_date: string;
  };
}

interface TeacherOverview {
  total_students: number;
  total_classes: number;
  total_test_results: number;
  completed_tests: number;
  completion_rate: number;
  average_score: number;
}

interface TestsContentProps {
  students: Student[];
  overview: TeacherOverview | null;
  darkMode: boolean;
}

export default function TestsContent({ students, overview, darkMode }: TestsContentProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleDetailClick = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const handlePrintClick = (student: Student) => {
    setSelectedStudent(student);
    setShowPrintModal(true);
  };

  const handleAnalysisClick = (student: Student) => {
    setSelectedStudent(student);
    setShowAnalysisModal(true);
  };

  const handleExportResults = () => {
    setShowExportModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedStudent(null);
  };

  const closePrintModal = () => {
    setShowPrintModal(false);
    setSelectedStudent(null);
  };

  const closeAnalysisModal = () => {
    setShowAnalysisModal(false);
    setSelectedStudent(null);
  };

  const closeExportModal = () => {
    setShowExportModal(false);
  };

  const handlePrint = () => {
    if (selectedStudent) {
      // Simulasi print
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Hasil Tes - ${selectedStudent.name}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info { margin-bottom: 20px; }
                .score { font-size: 24px; font-weight: bold; color: #059669; }
                .recommendation { background: #f3f4f6; padding: 15px; border-radius: 8px; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>HASIL TES BAKAT DAN MINAT</h1>
                <h2>${selectedStudent.name}</h2>
                <p>NIS: ${selectedStudent.nis} | Kelas: ${selectedStudent.school_class.name}</p>
              </div>
              <div class="info">
                <h3>Informasi Tes:</h3>
                <p>Tanggal: ${selectedStudent.latest_test_result?.test_date}</p>
                <p class="score">Nilai: ${selectedStudent.latest_test_result?.total_score}</p>
              </div>
              <div class="recommendation">
                <h3>Rekomendasi Jurusan:</h3>
                <p><strong>${selectedStudent.latest_test_result?.recommended_major}</strong></p>
                <p>Tingkat Kepercayaan: ${((selectedStudent.latest_test_result?.major_confidence || 0) * 100).toFixed(1)}%</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
    closePrintModal();
  };



  const handleExportData = () => {
    // Simulasi export data
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Nama,NIS,Kelas,Nilai,Jurusan Disarankan,Confidence,Tanggal Tes\n" +
      students.filter(s => s.latest_test_result).map(s => 
        `${s.name},${s.nis},${s.school_class.name},${s.latest_test_result?.total_score},${s.latest_test_result?.recommended_major},${((s.latest_test_result?.major_confidence || 0) * 100).toFixed(1)}%,${s.latest_test_result?.test_date}`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hasil_tes_siswa.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    closeExportModal();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button 
            onClick={handleExportResults}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Export Hasil
          </button>
        </div>
      </div>

             {/* Statistik Tes */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
           <div className="flex items-center">
             <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
               <svg className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
             </div>
             <div className="ml-4">
               <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Tes</p>
               <p className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{overview?.total_test_results}</p>
             </div>
           </div>
         </div>
         <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
           <div className="flex items-center">
             <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/50' : 'bg-green-100'}`}>
               <svg className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <div className="ml-4">
               <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Selesai</p>
               <p className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{overview?.completed_tests}</p>
             </div>
           </div>
         </div>
         <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
           <div className="flex items-center">
             <div className={`p-3 rounded-lg ${darkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'}`}>
               <svg className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <div className="ml-4">
               <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Belum Selesai</p>
               <p className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{(overview?.total_test_results || 0) - (overview?.completed_tests || 0)}</p>
             </div>
           </div>
         </div>
         <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
           <div className="flex items-center">
             <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
               <svg className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
             </div>
             <div className="ml-4">
               <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tingkat Selesai</p>
               <p className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{overview?.completion_rate?.toFixed(1)}%</p>
             </div>
           </div>
         </div>
       </div>

             {/* Filter */}
       <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div>
             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cari Siswa</label>
                           <input
                type="text"
                placeholder="Masukkan nama atau NIS siswa..."
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
              />
           </div>
           <div>
             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Kelas</label>
             <select className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
               <option value="" className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Semua Kelas</option>
               <option value="X IPA 1" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>X IPA 1</option>
               <option value="X IPA 2" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>X IPA 2</option>
               <option value="X IPS 1" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>X IPS 1</option>
             </select>
           </div>
           <div>
             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Jurusan Rekomendasi</label>
             <select className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
               <option value="" className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Semua Jurusan</option>
               <option value="IPA" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>IPA</option>
               <option value="IPS" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>IPS</option>
               <option value="Bahasa" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Bahasa</option>
               <option value="Agama" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Agama</option>
             </select>
           </div>
           <div>
             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rentang Nilai</label>
             <select className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
               <option value="" className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Semua Nilai</option>
               <option value="80-100" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>80-100 (Sangat Baik)</option>
               <option value="60-79" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>60-79 (Baik)</option>
               <option value="40-59" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>40-59 (Cukup)</option>
               <option value="0-39" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>0-39 (Kurang)</option>
             </select>
           </div>
         </div>
       </div>

             {/* Tabel Hasil Tes */}
       <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
         <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
           <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Hasil Tes Siswa</h3>
         </div>
         <div className="overflow-x-auto">
           <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
             <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
               <tr>
                 <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Siswa</th>
                 <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Kelas</th>
                 <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Nilai</th>
                 <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Jurusan Disarankan</th>
                 <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Confidence</th>
                 <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Tanggal Tes</th>
                 <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Aksi</th>
               </tr>
             </thead>
             <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
               {students.filter(student => student.latest_test_result).map((student) => (
                 <tr key={student.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10">
                         <div className={`h-10 w-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                           <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                             {student.name.charAt(0)}
                           </span>
                         </div>
                       </div>
                       <div className="ml-4">
                         <div className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{student.name}</div>
                         <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{student.nis}</div>
                       </div>
                     </div>
                   </td>
                   <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{student.school_class.name}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                       (student.latest_test_result?.total_score || 0) >= 80 
                         ? 'bg-green-100 text-green-800' 
                         : (student.latest_test_result?.total_score || 0) >= 60 
                         ? 'bg-yellow-100 text-yellow-800' 
                         : 'bg-red-100 text-red-800'
                     }`}>
                       {student.latest_test_result?.total_score}
                     </span>
                   </td>
                   <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                     {student.latest_test_result?.recommended_major}
                   </td>
                   <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                     {((student.latest_test_result?.major_confidence || 0) * 100).toFixed(1)}%
                   </td>
                   <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                     {student.latest_test_result?.test_date}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-32">
                     <div className="flex items-center space-x-2">
                       <button 
                         onClick={() => handleDetailClick(student)}
                         className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" 
                         title="Detail"
                       >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                         </svg>
                       </button>
                       <button 
                         onClick={() => handlePrintClick(student)}
                         className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" 
                         title="Print"
                       >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                         </svg>
                       </button>
                       <button 
                         onClick={() => handleAnalysisClick(student)}
                         className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" 
                         title="Analisis"
                       >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                         </svg>
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>

      {/* Detail Modal */}
      {showDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900/20 via-gray-800/30 to-gray-900/20 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95' : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95'} backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full border ${darkMode ? 'border-gray-600/50' : 'border-gray-200/50'}`}>
            <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-blue-50/90 to-indigo-50/90'} backdrop-blur-sm rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Detail Hasil Tes</h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Informasi lengkap hasil tes siswa</p>
                  </div>
                </div>
                <button
                  onClick={closeDetailModal}
                  className={`p-2.5 rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <svg className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Informasi Siswa</h3>
                  <div className="space-y-3">
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nama</p>
                      <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>NIS</p>
                      <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedStudent.nis}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Kelas</p>
                      <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedStudent.school_class.name}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hasil Tes</h3>
                  <div className="space-y-3">
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nilai</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedStudent.latest_test_result?.total_score}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jurusan Disarankan</p>
                      <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedStudent.latest_test_result?.recommended_major}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tingkat Kepercayaan</p>
                      <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{((selectedStudent.latest_test_result?.major_confidence || 0) * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tanggal Tes</p>
                      <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedStudent.latest_test_result?.test_date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`px-6 py-5 border-t ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90'} backdrop-blur-sm rounded-b-2xl`}>
              <div className="flex justify-end">
                <button
                  onClick={closeDetailModal}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-400 ${
                    darkMode 
                      ? 'border-gray-500 text-gray-300 hover:bg-gray-600 hover:border-gray-400' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Tutup</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Modal */}
      {showPrintModal && selectedStudent && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900/20 via-gray-800/30 to-gray-900/20 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95' : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95'} backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full border ${darkMode ? 'border-gray-600/50' : 'border-gray-200/50'}`}>
            <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-green-50/90 to-emerald-50/90'} backdrop-blur-sm rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Print Hasil Tes</h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cetak hasil tes siswa</p>
                  </div>
                </div>
                <button
                  onClick={closePrintModal}
                  className={`p-2.5 rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <svg className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Apakah Anda yakin ingin mencetak hasil tes untuk <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{selectedStudent.name}</strong>?
              </p>
            </div>

            <div className={`px-6 py-5 border-t ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-green-50/90'} backdrop-blur-sm rounded-b-2xl`}>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closePrintModal}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-400 ${
                    darkMode 
                      ? 'border-gray-500 text-gray-300 hover:bg-gray-600 hover:border-gray-400' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Batal</span>
                  </div>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 border-2 border-transparent hover:border-green-400"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>Print</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Modal */}
      {showAnalysisModal && selectedStudent && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900/20 via-gray-800/30 to-gray-900/20 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95' : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95'} backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border ${darkMode ? 'border-gray-600/50' : 'border-gray-200/50'}`}>
            <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-purple-50/90 to-pink-50/90'} backdrop-blur-sm rounded-t-2xl flex-shrink-0`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analisis Hasil Tes</h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Analisis mendalam hasil tes siswa</p>
                  </div>
                </div>
                <button
                  onClick={closeAnalysisModal}
                  className={`p-2.5 rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <svg className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Student Info Header */}
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'} rounded-xl p-6 mb-6`}>
                  <div className="flex items-center space-x-4">
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-blue-200'}`}>
                      <span className={`text-2xl font-bold ${darkMode ? 'text-gray-300' : 'text-blue-700'}`}>
                        {selectedStudent.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>{selectedStudent.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-700'}`}>NIS: {selectedStudent.nis} | Kelas: {selectedStudent.school_class.name}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                          Nilai: {selectedStudent.latest_test_result?.total_score}
                        </span>
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                          {selectedStudent.latest_test_result?.recommended_major}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Strengths */}
                  <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-green-50'} rounded-xl p-6 border-l-4 border-green-500`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'} mr-3`}>
                        <svg className={`w-5 h-5 ${darkMode ? 'text-green-300' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-green-300' : 'text-green-900'}`}>Kekuatan & Potensi</h4>
                    </div>
                    <ul className={`text-sm space-y-2 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Logika dan analisis yang sangat baik</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Kemampuan matematika di atas rata-rata</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Pemahaman konseptual yang kuat</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Kemampuan problem solving yang baik</span>
                      </li>
                    </ul>
                  </div>

                  {/* Areas for Development */}
                  <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-yellow-50'} rounded-xl p-6 border-l-4 border-yellow-500`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'} mr-3`}>
                        <svg className={`w-5 h-5 ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>Area Pengembangan</h4>
                    </div>
                    <ul className={`text-sm space-y-2 ${darkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>Kreativitas dan inovasi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>Kemampuan komunikasi verbal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>Kerjasama tim dan kolaborasi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>Kemampuan presentasi</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'} rounded-xl p-6 mb-6`}>
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} mr-3`}>
                      <svg className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className={`text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>Analisis Detail</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                        {selectedStudent.latest_test_result?.total_score}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Total Nilai</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                        {((selectedStudent.latest_test_result?.major_confidence || 0) * 100).toFixed(1)}%
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Tingkat Kepercayaan</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                        {selectedStudent.latest_test_result?.test_date}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Tanggal Tes</div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-purple-50'} rounded-xl p-6 mb-6`}>
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} mr-3`}>
                      <svg className={`w-5 h-5 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className={`text-lg font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>Rekomendasi Pengembangan</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className={`font-medium mb-2 ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>Program Pengembangan</h5>
                      <ul className={`text-sm space-y-1 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                        <li>• Ikuti program pengembangan bakat di bidang {selectedStudent.latest_test_result?.recommended_major}</li>
                        <li>• Latih kemampuan komunikasi melalui presentasi</li>
                        <li>• Ikuti kegiatan ekstrakurikuler yang sesuai</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className={`font-medium mb-2 ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>Konsultasi & Bimbingan</h5>
                      <ul className={`text-sm space-y-1 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                        <li>• Konsultasi dengan konselor karir</li>
                        <li>• Diskusi dengan orang tua tentang minat</li>
                        <li>• Ikuti workshop pengembangan diri</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Career Prospects */}
                <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-indigo-50'} rounded-xl p-6`}>
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'} mr-3`}>
                      <svg className={`w-5 h-5 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2z" />
                      </svg>
                    </div>
                    <h4 className={`text-lg font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>Prospek Karir & Jurusan</h4>
                  </div>
                  <div className="space-y-3">
                    <p className={`text-sm ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>
                      Berdasarkan hasil tes dengan tingkat kepercayaan <strong>{((selectedStudent.latest_test_result?.major_confidence || 0) * 100).toFixed(1)}%</strong>, 
                      siswa memiliki potensi yang sangat baik untuk berkarir di bidang <strong>{selectedStudent.latest_test_result?.recommended_major}</strong>.
                    </p>
                    <div className={`${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-100'} rounded-lg p-4`}>
                      <h5 className={`font-medium mb-2 ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>Jurusan Perkuliahan yang Cocok:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        <span className={`${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>• Teknik Informatika</span>
                        <span className={`${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>• Matematika</span>
                        <span className={`${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>• Fisika</span>
                        <span className={`${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>• Statistika</span>
                        <span className={`${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>• Ekonomi</span>
                        <span className={`${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>• Manajemen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`px-6 py-5 border-t ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-purple-50/90'} backdrop-blur-sm rounded-b-2xl flex-shrink-0`}>
              <div className="flex justify-end">
                <button
                  onClick={closeAnalysisModal}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-400 ${
                    darkMode 
                      ? 'border-gray-500 text-gray-300 hover:bg-gray-600 hover:border-gray-400' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Tutup</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900/20 via-gray-800/30 to-gray-900/20 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95' : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95'} backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full border ${darkMode ? 'border-gray-600/50' : 'border-gray-200/50'}`}>
            <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-green-50/90 to-emerald-50/90'} backdrop-blur-sm rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Export Hasil Tes</h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Export data hasil tes ke file CSV</p>
                  </div>
                </div>
                <button
                  onClick={closeExportModal}
                  className={`p-2.5 rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <svg className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Apakah Anda yakin ingin mengekspor data hasil tes ke file CSV?
              </p>
            </div>

            <div className={`px-6 py-5 border-t ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-green-50/90'} backdrop-blur-sm rounded-b-2xl`}>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeExportModal}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-400 ${
                    darkMode 
                      ? 'border-gray-500 text-gray-300 hover:bg-gray-600 hover:border-gray-400' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Batal</span>
                  </div>
                </button>
                <button
                  onClick={handleExportData}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 border-2 border-transparent hover:border-green-400"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>Export</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
