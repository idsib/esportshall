'use client';

import Header from './header';
import Sidebar from './sidebar';
import Calendar from './calendar';
import { useTheme } from '../../../context/theme-context';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-dark-100 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      <Sidebar />
      
      <main className={`pt-16 pl-16 ${
        theme === 'dark' 
          ? 'bg-dark-100' 
          : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              {children}
            </div>
            
            <div className="col-span-4 space-y-6">
              <Calendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 