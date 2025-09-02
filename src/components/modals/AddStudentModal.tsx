'use client';

import { useState } from 'react';

interface NewStudent {
  nis: string;
  name: string;
  gender: string;
  class: string;
  phone: string;
  email: string;
  parentPhone: string;
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: NewStudent) => void;
  darkMode: boolean;
}

export default function AddStudentModal({ isOpen, onClose, onAddStudent, darkMode }: AddStudentModalProps) {
  const [newStudent, setNewStudent] = useState<NewStudent>({
    nis: '',
    name: '',
    gender: '',
    class: '',
    phone: '',
    email: '',
    parentPhone: ''
  });

  const handleInputChange = (field: keyof NewStudent, value: string) => {
    setNewStudent(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent(newStudent);
    setNewStudent({
      nis: '',
      name: '',
      gender: '',
      class: '',
      phone: '',
      email: '',
      parentPhone: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/20 via-gray-800/30 to-gray-900/20 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95' : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95'} backdrop-blur-xl rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col border ${darkMode ? 'border-gray-600/50' : 'border-gray-200/50'}`}>
        {/* Modal Header */}
        <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 via-gray-800/90 to-gray-700/90' : 'border-gray-200/50 bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90'} backdrop-blur-sm rounded-t-2xl flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tambah Siswa Baru</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Daftarkan siswa baru ke dalam sistem</p>
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
          <form onSubmit={handleSubmit} className="p-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Masukkan nama lengkap siswa (contoh: Ahmad Suryadi)"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300 hover:border-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  NIS <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.nis}
                  onChange={(e) => handleInputChange('nis', e.target.value)}
                  placeholder="Masukkan Nomor Induk Siswa (contoh: 2024001)"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300 hover:border-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Kelas <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={newStudent.class}
                  onChange={(e) => handleInputChange('class', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 hover:border-gray-500' : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
                  }`}
                >
                  <option value="" className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Pilih kelas</option>
                  <option value="X IPA 1" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>X IPA 1</option>
                  <option value="X IPA 2" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>X IPA 2</option>
                  <option value="X IPS 1" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>X IPS 1</option>
                  <option value="X IPS 2" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>X IPS 2</option>
                  <option value="XI IPA 1" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>XI IPA 1</option>
                  <option value="XI IPA 2" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>XI IPA 2</option>
                  <option value="XI IPS 1" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>XI IPS 1</option>
                  <option value="XI IPS 2" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>XI IPS 2</option>
                  <option value="XII IPA 1" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>XII IPA 1</option>
                  <option value="XII IPA 2" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>XII IPA 2</option>
                  <option value="XII IPS 1" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>XII IPS 1</option>
                  <option value="XII IPS 2" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>XII IPS 2</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={newStudent.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 hover:border-gray-500' : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
                  }`}
                >
                  <option value="" className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Pilih jenis kelamin</option>
                  <option value="Laki-laki" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Laki-laki</option>
                  <option value="Perempuan" className={`${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Perempuan</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Masukkan alamat email (contoh: ahmad@email.com)"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300 hover:border-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={newStudent.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Masukkan nomor telepon (contoh: 081234567890)"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300 hover:border-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                  }`}
                />
              </div>

              <div className="lg:col-span-2">
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Nomor Telepon Orang Tua
                </label>
                <input
                  type="tel"
                  value={newStudent.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  placeholder="Masukkan nomor telepon orang tua (contoh: 081234567890)"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-300 hover:border-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className={`${darkMode ? 'bg-gradient-to-r from-gray-700/80 to-gray-800/80' : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80'} backdrop-blur-sm rounded-2xl p-5 border ${darkMode ? 'border-gray-600/50' : 'border-blue-200/50'} mb-6`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                    Informasi Penting
                  </h3>
                  <div className={`space-y-2.5 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Siswa akan otomatis terdaftar untuk mengikuti tes TKA</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Data yang ditandai dengan <span className="text-red-500 font-semibold">*</span> wajib diisi</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Email dan nomor telepon dapat ditambahkan nanti</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Siswa dapat login menggunakan NIS sebagai username</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-5 border-t ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-gray-700/90 to-gray-800/90' : 'border-gray-200/50 bg-gradient-to-r from-gray-50/90 to-blue-50/90'} backdrop-blur-sm rounded-b-2xl flex-shrink-0`}>
          <div className="flex justify-end space-x-3">
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
                <span>Batal</span>
              </div>
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Tambah Siswa</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
