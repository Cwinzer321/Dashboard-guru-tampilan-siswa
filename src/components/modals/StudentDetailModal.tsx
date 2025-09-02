'use client';

interface Student {
  id: number;
  nis: string;
  name: string;
  gender: string;
  school_class: {
    name: string;
    grade: string;
  };
  phone?: string;
  email?: string;
  parent_phone?: string;
  latest_test_result?: {
    total_score: number;
    recommended_major: string;
    major_confidence: number;
    test_date: string;
  };
}

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  darkMode: boolean;
}

export default function StudentDetailModal({ isOpen, onClose, student, darkMode }: StudentDetailModalProps) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/20 via-gray-800/30 to-gray-900/20 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95' : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95'} backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border ${darkMode ? 'border-gray-600/50' : 'border-gray-200/50'}`}>
        {/* Modal Header */}
        <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 via-gray-800/90 to-gray-700/90' : 'border-gray-200/50 bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90'} backdrop-blur-sm rounded-t-2xl flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Detail Siswa</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Informasi lengkap siswa</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2.5 rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <svg className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Student Avatar and Basic Info */}
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className={`h-20 w-20 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                  <span className={`text-2xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {student.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.name}</h3>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>NIS: {student.nis}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{student.school_class.name}</p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-6`}>
                <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Informasi Pribadi
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nama Lengkap</p>
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.name}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>NIS</p>
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.nis}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jenis Kelamin</p>
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {student.email || 'Tidak tersedia'}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nomor Telepon</p>
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {student.phone || 'Tidak tersedia'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-6`}>
                <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Informasi Akademik
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Kelas</p>
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.school_class.name}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tingkat</p>
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Kelas {student.school_class.grade}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status Tes</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.latest_test_result 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.latest_test_result ? 'Sudah Tes' : 'Belum Tes'}
                    </span>
                  </div>
                  {student.latest_test_result && (
                    <>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nilai Tes</p>
                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {student.latest_test_result.total_score}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jurusan Direkomendasikan</p>
                        <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {student.latest_test_result.recommended_major}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tingkat Kepercayaan</p>
                        <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {student.latest_test_result.major_confidence}%
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tanggal Tes</p>
                        <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {new Date(student.latest_test_result.test_date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-6 mt-6`}>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Informasi Orang Tua
              </h4>
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nomor Telepon Orang Tua</p>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {student.parent_phone || 'Tidak tersedia'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-5 border-t ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90'} backdrop-blur-sm rounded-b-2xl flex-shrink-0`}>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
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
  );
}
