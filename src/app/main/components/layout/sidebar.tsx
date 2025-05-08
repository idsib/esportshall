'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Home, Gamepad2, Bell, Settings, Mail, Newspaper, User, Users, Trophy, UserCircle, MessageCircle } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Sidebar() {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 border-r flex flex-col items-center py-6 z-40 ${
      theme === 'dark'
        ? 'bg-dark-200/95 border-dark-300'
        : 'bg-white/95 border-gray-200 shadow-sm'
    }`}>
      <nav className="flex flex-col items-center gap-8">
        <button 
          onClick={() => router.push('/main')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main' 
              ? 'text-brand-yellow' 
              : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
          }`}
        >
          <Home size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/teams')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/teams' 
              ? 'text-brand-yellow' 
              : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
          }`}
        >
          <Users size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/players')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/players' 
              ? 'text-brand-yellow' 
              : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
          }`}
        >
          <UserCircle size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/tournaments')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/tournaments' 
              ? 'text-brand-yellow' 
              : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
          }`}
        >
          <Trophy size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/news')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/news' 
              ? 'text-brand-yellow' 
              : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
          }`}
        >
          <Newspaper size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/communities')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/communities' 
              ? 'text-brand-yellow' 
              : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
          }`}
        >
          <MessageCircle size={24} />
        </button>
      </nav>
      
      <div className="mt-auto flex flex-col items-center gap-6">
        <button 
          onClick={() => router.push('/main/settings')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/settings' 
              ? 'text-brand-yellow' 
              : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
          }`}
        >
          <Settings size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/profile')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/profile' 
              ? 'text-brand-yellow' 
              : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
          }`}
        >
          <User size={24} />
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-colors ${
              showProfileMenu
                ? 'border-brand-yellow'
                : theme === 'dark' 
                  ? 'border-dark-300 hover:border-brand-yellow' 
                  : 'border-gray-200 hover:border-brand-yellow'
            }`}
          >
            <Image
              src={session?.user?.image || '/images/esportshall.png'}
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </button>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className={`absolute bottom-0 left-16 mb-0 w-72 rounded-lg shadow-lg z-50 overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-dark-200 border border-dark-300' 
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={session?.user?.image || '/images/esportshall.png'}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{session?.user?.name}</p>
                      <p className="text-sm text-gray-500">@{session?.user?.email?.split('@')[0]}</p>
                    </div>
                  </div>
                </div>
                <div className={`border-t ${theme === 'dark' ? 'border-dark-300' : 'border-gray-200'}`}>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Cerrar la sesión de @{session?.user?.email?.split('@')[0]}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
