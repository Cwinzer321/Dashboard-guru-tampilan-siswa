'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageTitle from '../../../components/PageTitle';

export default function StudentDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajors, setSelectedMajors] = useState<any[]>([]);
  const [appliedMajors, setAppliedMajors] = useState<any[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsData, setSettingsData] = useState({
    email: '',
    phone: ''
  });

  // Data jurusan yang tersedia
  const availableMajors = [
    { id: 1, name: "Teknik Informatika", university: "Universitas Indonesia", type: "Saintek", description: "Belajar pemrograman, algoritma, dan teknologi informasi" },
    { id: 2, name: "Kedokteran", university: "Universitas Gadjah Mada", type: "Saintek", description: "Ilmu kedokteran dan kesehatan manusia" },
    { id: 3, name: "Teknik Sipil", university: "Institut Teknologi Bandung", type: "Saintek", description: "Perencanaan dan konstruksi infrastruktur" },
    { id: 4, name: "Akuntansi", university: "Universitas Brawijaya", type: "Soshum", description: "Manajemen keuangan dan akuntansi bisnis" },
    { id: 5, name: "Psikologi", university: "Universitas Airlangga", type: "Soshum", description: "Studi tentang perilaku dan mental manusia" },
    { id: 6, name: "Ilmu Komunikasi", university: "Universitas Padjadjaran", type: "Soshum", description: "Media, jurnalistik, dan komunikasi massa" },
    { id: 7, name: "Sastra Indonesia", university: "Universitas Diponegoro", type: "Soshum", description: "Bahasa, sastra, dan budaya Indonesia" },
    { id: 8, name: "Teknik Mesin", university: "Institut Teknologi Sepuluh Nopember", type: "Saintek", description: "Desain dan manufaktur mesin industri" },
    { id: 9, name: "Farmasi", university: "Universitas Hasanuddin", type: "Saintek", description: "Ilmu obat-obatan dan farmakologi" },
    { id: 10, name: "Manajemen", university: "Universitas Sebelas Maret", type: "Soshum", description: "Pengelolaan bisnis dan organisasi" }
  ];

  useEffect(() => {
    // Untuk sementara bypass autentikasi untuk melihat tampilan
    setIsAuthenticated(true);
    loadStudentData();
    setLoading(false);
  }, [router]);

  const loadStudentData = () => {
    // Untuk sementara gunakan data dummy
    setStudentData({
      name: "Ahmad Rizki",
      nis: "2024001",
      class: "X IPA 1",
      email: "ahmad.rizki@student.school.id",
      phone: "081234567890"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('school_token');
    router.push('/student');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSelectedMajors([]);
    } else {
      const filtered = availableMajors.filter(major => 
        major.name.toLowerCase().includes(query.toLowerCase()) ||
        major.university.toLowerCase().includes(query.toLowerCase()) ||
        major.type.toLowerCase().includes(query.toLowerCase())
      );
      setSelectedMajors(filtered);
    }
  };

  const handleApplyMajor = (major: any) => {
    if (!appliedMajors.find(applied => applied.id === major.id)) {
      setAppliedMajors([...appliedMajors, { ...major, appliedDate: new Date().toLocaleDateString() }]);
    }
  };

  const handleRemoveApplication = (majorId: number) => {
    setAppliedMajors(appliedMajors.filter(major => major.id !== majorId));
  };

  const handleSettingsChange = (field: string, value: string) => {
    setSettingsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOpenSettings = () => {
    setSettingsData({
      email: studentData?.email || '',
      phone: studentData?.phone || ''
    });
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    // Update student data with new settings
    setStudentData(prev => ({
      ...prev,
      email: settingsData.email,
      phone: settingsData.phone
    }));
    setShowSettings(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memverifikasi autentikasi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Akan redirect ke login
  }

  return (
    <>
      <PageTitle 
        title="Dashboard Siswa - Portal Jurusan" 
        description="Portal siswa untuk mencari dan mendaftar jurusan yang diminati"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Portal Jurusan</h1>
                  <p className="text-gray-600">Temukan jurusan impianmu</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleOpenSettings}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Pengaturan
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">Halo, {studentData?.name}! 👋</h2>
                <p className="text-gray-600 text-lg">NIS: {studentData?.nis} • Kelas: {studentData?.class}</p>
                <p className="text-gray-500">Mari temukan jurusan yang sesuai dengan minat dan bakatmu</p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🔍 Cari Jurusan Impianmu</h3>
              <p className="text-gray-600">Temukan jurusan yang sesuai dengan minat dan bakatmu</p>
            </div>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari berdasarkan nama jurusan, universitas, atau tipe (Saintek/Soshum)..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Search Results */}
            {selectedMajors.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Hasil Pencarian:</h4>
                {selectedMajors.map((major) => (
                  <div key={major.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h5 className="text-lg font-semibold text-gray-900 mr-3">{major.name}</h5>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            major.type === 'Saintek' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {major.type}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium mb-1">{major.university}</p>
                        <p className="text-gray-500 text-sm">{major.description}</p>
                      </div>
                      <button
                        onClick={() => handleApplyMajor(major)}
                        className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Applied Majors */}
          {appliedMajors.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Jurusan yang Sudah Diapply</h3>
              <div className="space-y-4">
                {appliedMajors.map((major) => (
                  <div key={major.id} className="border border-green-200 bg-green-50 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h5 className="text-lg font-semibold text-gray-900 mr-3">{major.name}</h5>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            major.type === 'Saintek' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {major.type}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                            Applied
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium mb-1">{major.university}</p>
                        <p className="text-gray-500 text-sm">Tanggal Apply: {major.appliedDate}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveApplication(major.id)}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Modal */}
          {showSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Pengaturan Akun</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      value={studentData?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">NIS</label>
                    <input
                      type="text"
                      value={studentData?.nis || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                    <input
                      type="text"
                      value={studentData?.class || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={settingsData.email}
                      onChange={(e) => handleSettingsChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      value={settingsData.phone}
                      onChange={(e) => handleSettingsChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
