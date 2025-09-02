'use client';

import { Bar, Doughnut } from 'react-chartjs-2';

interface TeacherOverview {
  total_students: number;
  total_classes: number;
  total_test_results: number;
  completed_tests: number;
  completion_rate: number;
  average_score: number;
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

interface DashboardContentProps {
  overview: TeacherOverview | null;
  classSummary: ClassSummary[];
  darkMode: boolean;
  onClassClick: (classItem: ClassSummary) => void;
}

export default function DashboardContent({ 
  overview, 
  classSummary, 
  darkMode, 
  onClassClick 
}: DashboardContentProps) {
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

  return (
    <>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Siswa</p>
              <p className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{overview?.total_students}</p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Kelas</p>
              <p className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{overview?.total_classes}</p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tes Selesai</p>
              <p className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{overview?.completed_tests}</p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rata-rata Nilai</p>
              <p className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{overview?.average_score?.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} mr-3`}>
              <svg className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Distribusi Kelas</h3>
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
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Distribusi Nilai</h3>
          </div>
          <div className="h-64">
            <Bar data={scoreData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Class Summary */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow mb-8`}>
        <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Ringkasan Kelas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Kelas</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Jumlah Siswa</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Tes Selesai</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Tingkat Penyelesaian</th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Rata-rata Nilai</th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
              {classSummary.map((classItem) => (
                <tr 
                  key={classItem.class_id} 
                  className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
                  onClick={() => onClassClick(classItem)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{classItem.class_name}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Kelas {classItem.grade}</div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{classItem.total_students}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{classItem.completed_tests}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-16 rounded-full h-2 mr-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${classItem.completion_rate}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{classItem.completion_rate}%</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{classItem.average_score.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
