'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TeacherDashboard from '../../components/TeacherDashboard';
import PageTitle from '../../components/PageTitle';

export default function TeacherPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Untuk sementara bypass autentikasi untuk melihat tampilan
    setIsAuthenticated(true);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
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
        title="Dashboard Guru - Sistem TKA" 
        description="Dashboard utama guru untuk mengelola data siswa, kelas, dan hasil tes TKA"
      />
      <TeacherDashboard />
    </>
  );
}
