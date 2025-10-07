'use client';

import Header from './header';
import Sidebar from './sidebar';
import { useTheme } from '@/context/theme-context';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark'
        ? 'bg-dark-100 text-white'
        : 'bg-gray-50 text-gray-900'
      }`}>
      <Header />
      <Sidebar />

      <main className={`pt-16 pl-20 ${theme === 'dark'
          ? 'bg-dark-100'
          : 'bg-gray-50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
} 