'use client';

import { Bar, Doughnut } from 'react-chartjs-2';

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

interface TeacherOverview {
  total_students: number;
  total_classes: number;
  total_test_results: number;
  completed_tests: number;
  completion_rate: number;
  average_score: number;
}

interface ReportsContentProps {
  students: Student[];
  classSummary: ClassSummary[];
  overview: TeacherOverview | null;
  darkMode: boolean;
}

export default function ReportsContent({ students, classSummary, overview, darkMode }: ReportsContentProps) {
  const classChartData = {
    labels: classSummary.map(cls => cls.class_name),
    datasets: [
      {
        label: 'Jumlah Siswa',
        data: classSummary.map(cls => cls.total_students),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const scoreData = {
    labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
    datasets: [
      {
        label: 'Distribusi Nilai',
        data: [2, 8, 25, 45, 20],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const majorData = {
    labels: ['Teknik', 'Kedokteran', 'Ekonomi', 'Hukum', 'Pertanian', 'Seni & Desain'],
    datasets: [
      {
        label: 'Jumlah Siswa',
        data: [32, 28, 25, 18, 15, 12],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Laporan
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-white bg-opacity-30 mr-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-blue-100">Partisipasi</p>
              <p className="text-2xl font-semibold">{overview?.completion_rate?.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-white bg-opacity-30 mr-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-green-100">Rata-rata Nilai</p>
              <p className="text-2xl font-semibold">{overview?.average_score?.toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-white bg-opacity-30 mr-4">
              <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-yellow-100">Nilai Tertinggi</p>
              <p className="text-2xl font-semibold">
                {Math.max(...students.filter(s => s.latest_test_result).map(s => s.latest_test_result!.total_score))}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-white bg-opacity-30 mr-4">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-purple-100">Jurusan Populer</p>
              <p className="text-2xl font-semibold">IPA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} mr-3`}>
              <svg className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Distribusi Kelas</h3>
          </div>
          <div className="h-64">
            <Doughnut data={classChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'} mr-3`}>
              <svg className={`w-6 h-6 ${darkMode ? 'text-green-300' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Distribusi Nilai</h3>
          </div>
          <div className="h-64">
            <Bar data={scoreData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} mr-3`}>
              <svg className={`w-6 h-6 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Statistik Bakat Siswa</h3>
          </div>
          <div className="h-64">
            <Bar 
              data={majorData} 
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 5
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performers */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'} mr-3`}>
                <svg className={`w-6 h-6 ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Siswa Terbaik</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {students
                .filter(s => s.latest_test_result)
                .sort((a, b) => (b.latest_test_result?.total_score || 0) - (a.latest_test_result?.total_score || 0))
                .slice(0, 5)
                .map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-yellow-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{student.school_class.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.latest_test_result?.total_score}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{student.latest_test_result?.recommended_major}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Class Performance */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} mr-3`}>
                <svg className={`w-6 h-6 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Performa Kelas</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {classSummary
                .sort((a, b) => b.average_score - a.average_score)
                .map((classItem, index) => (
                  <div key={classItem.class_id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-gray-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{classItem.class_name}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{classItem.total_students} siswa</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{classItem.average_score.toFixed(1)}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{classItem.completion_rate}% selesai</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
