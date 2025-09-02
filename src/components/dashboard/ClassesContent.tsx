'use client';

import { useState } from 'react';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import ClassDetailModal from '../modals/ClassDetailModal';
import EditClassModal from '../modals/EditClassModal';

interface ClassSummary {
  class_id: number;
  class_name: string;
  grade: string;
  total_students: number;
  total_tests: number;
  completed_tests: number;
  completion_rate: number;
  average_score: number;
}

interface ClassesContentProps {
  classSummary: ClassSummary[];
  darkMode: boolean;
  onAddClass: () => void;
}

export default function ClassesContent({ classSummary, darkMode, onAddClass }: ClassesContentProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSummary | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassSummary | null>(null);
  const [viewingClass, setViewingClass] = useState<ClassSummary | null>(null);

  const handleDeleteClick = (classItem: ClassSummary) => {
    setSelectedClass(classItem);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedClass) {
      // Simulasi penghapusan kelas
      console.log('Menghapus kelas:', selectedClass.class_name);
      alert(`Kelas ${selectedClass.class_name} berhasil dihapus!`);
    }
    setShowDeleteModal(false);
    setSelectedClass(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedClass(null);
  };

  const handleEditClick = (classItem: ClassSummary) => {
    setEditingClass(classItem);
    setShowEditModal(true);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    setEditingClass(null);
  };

  const handleEditSave = (updatedClass: ClassSummary) => {
    // Simulasi update kelas
    console.log('Mengupdate kelas:', updatedClass);
    alert(`Kelas ${updatedClass.class_name} berhasil diupdate!`);
    setShowEditModal(false);
    setEditingClass(null);
  };

  const handleDetailClick = (classItem: ClassSummary) => {
    setViewingClass(classItem);
    setShowDetailModal(true);
  };

  const handleDetailClose = () => {
    setShowDetailModal(false);
    setViewingClass(null);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
                 <button 
           onClick={onAddClass}
           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
         >
           + Tambah Kelas
         </button>
      </div>

      {/* Statistik Kelas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
              <svg className={`w-8 h-8 ${darkMode ? 'text-green-300' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Kelas</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{classSummary.length}</p>
            </div>
          </div>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
              <svg className={`w-8 h-8 ${darkMode ? 'text-green-300' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Siswa</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{classSummary.reduce((sum, cls) => sum + cls.total_students, 0)}</p>
            </div>
          </div>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
              <svg className={`w-8 h-8 ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rata-rata per Kelas</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{(classSummary.reduce((sum, cls) => sum + cls.total_students, 0) / classSummary.length).toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Kelas */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
        <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daftar Kelas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Nama Kelas</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Tingkat</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Jumlah Siswa</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Tes Selesai</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Progress</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Rata-rata Nilai</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Aksi</th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
              {classSummary.map((classItem, index) => (
                <tr key={classItem.class_id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{classItem.class_name}</div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Kelas {classItem.grade}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{classItem.total_students}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{classItem.completed_tests}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-16 rounded-full h-2 mr-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${classItem.completion_rate}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{classItem.completion_rate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                      {classItem.average_score.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-32">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDetailClick(classItem)}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" 
                        title="Detail"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleEditClick(classItem)}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" 
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(classItem)}
                        className="text-red-600 hover:text-red-900 p-1 rounded transition-colors" 
                        title="Hapus"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Konfirmasi Hapus Kelas"
        message="Apakah Anda yakin ingin menghapus kelas ini?"
        itemName={selectedClass ? `${selectedClass.class_name} (${selectedClass.total_students} siswa)` : undefined}
        darkMode={darkMode}
      />

      {/* Class Detail Modal */}
      <ClassDetailModal
        isOpen={showDetailModal}
        onClose={handleDetailClose}
        classData={viewingClass}
        darkMode={darkMode}
      />

      {/* Edit Class Modal */}
      <EditClassModal
        isOpen={showEditModal}
        onClose={handleEditCancel}
        onSave={handleEditSave}
        classData={editingClass}
        darkMode={darkMode}
      />
    </div>
  );
}
