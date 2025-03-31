'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Home, Gamepad2, Users, Bell, Settings, Mail, Newspaper, User } from 'lucide-react';
import { useTheme } from '../../../../app/context/theme-context';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 border-r flex flex-col items-center py-6 z-40 ${
      theme === 'dark'
        ? 'bg-dark-200/95 border-dark-300'
        : 'bg-white/95 border-gray-200'
    }`}>
      <nav className="flex flex-col items-center gap-8">
        <button 
          onClick={() => router.push('/main')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main' 
              ? 'text-yellow-400' 
              : 'text-neutral-400 hover:text-yellow-400'
          }`}
        >
          <Home size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/discover')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/discover' 
              ? 'text-yellow-400' 
              : 'text-neutral-400 hover:text-yellow-400'
          }`}
        >
          <Gamepad2 size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/social')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/social' 
              ? 'text-yellow-400' 
              : 'text-neutral-400 hover:text-yellow-400'
          }`}
        >
          <Users size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/notifications')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/notifications' 
              ? 'text-yellow-400' 
              : 'text-neutral-400 hover:text-yellow-400'
          }`}
        >
          <Bell size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/messages')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/messages' 
              ? 'text-yellow-400' 
              : 'text-neutral-400 hover:text-yellow-400'
          }`}
        >
          <Mail size={24} />
        </button>
      </nav>
      
      <div className="mt-auto flex flex-col items-center gap-6">
        <button 
          onClick={() => router.push('/main/settings')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/settings' 
              ? 'text-yellow-400' 
              : 'text-neutral-400 hover:text-yellow-400'
          }`}
        >
          <Settings size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/profile')}
          className={`p-2 rounded-lg transition-colors ${
            pathname === '/main/profile' 
              ? 'text-yellow-400' 
              : 'text-neutral-400 hover:text-yellow-400'
          }`}
        >
          <User size={24} />
        </button>
        <button 
          onClick={() => router.push('/main/profile')}
          className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-colors ${
            pathname === '/main/profile'
              ? 'border-yellow-400'
              : theme === 'dark' 
                ? 'border-dark-300 hover:border-yellow-400' 
                : 'border-gray-200 hover:border-yellow-400'
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
      </div>
    </aside>
  );
}
