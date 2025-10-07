'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Home, Settings, User, Users, Trophy, UserCircle, MessageCircle, Calendar, Newspaper } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const mainNavItems = [
  { path: '/', icon: Home },
  { path: '/teams', icon: Users },
  { path: '/players', icon: UserCircle },
  { path: '/tournaments', icon: Trophy },
  { path: '/matches', icon: Calendar },
  { path: '/news', icon: Newspaper },
  { path: '/communities', icon: MessageCircle },
];

const bottomNavItems = [
    { path: '/settings', icon: Settings },
    { path: '/profile', icon: User },
]

const allNavItems = [...mainNavItems, ...bottomNavItems];

export default function Sidebar() {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: '0px', opacity: 0 });
  
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, allNavItems.length);
  }, []);

  const activeItemIndex = useMemo(() => {
    let bestMatchIndex = -1;
    let bestMatchLength = -1;

    allNavItems.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
            if (item.path.length > bestMatchLength) {
                bestMatchLength = item.path.length;
                bestMatchIndex = index;
            }
        }
    });
    return bestMatchIndex;
  }, [pathname]);

  useEffect(() => {
    if (activeItemIndex !== -1 && itemRefs.current[activeItemIndex] && asideRef.current) {
      const activeItem = itemRefs.current[activeItemIndex]!;
      const asideRect = asideRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      
      const indicatorHeight = 40; // h-10
      const itemHeight = itemRect.height;
      const indicatorOffset = (itemHeight - indicatorHeight) / 2;

      setIndicatorStyle({
        top: `${itemRect.top - asideRect.top + indicatorOffset}px`,
        opacity: 1,
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeItemIndex]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  const NavButton = ({ item, index }: { item: { path: string, icon: React.ElementType }, index: number }) => {
    const isActive = index === activeItemIndex;
    return (
        <button
            ref={el => { itemRefs.current[index] = el; }}
            onClick={() => router.push(item.path)}
            className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors relative z-10 ${
            isActive
                ? 'text-black'
                : theme === 'dark'
                ? 'text-neutral-400 hover:text-brand-yellow'
                : 'text-gray-500 hover:text-brand-yellow'
            }`}
        >
            <item.icon size={22} />
        </button>
    );
  }

  return (
    <aside 
        ref={asideRef}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 border-r flex flex-col items-center py-8 z-40 ${
      theme === 'dark'
        ? 'bg-dark-200/95 border-dark-300'
        : 'bg-white/95 border-gray-200 shadow-sm'
    }`}>
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-brand-yellow rounded-full transition-all duration-500 ease-smooth-out z-0"
          style={indicatorStyle}
        />
      <nav className="flex flex-col items-center gap-6 h-full justify-center">
        {mainNavItems.map((item, index) => (
            <NavButton key={item.path} item={item} index={index} />
        ))}
      </nav>
      
      <div className="mt-auto flex flex-col items-center gap-6">
        {bottomNavItems.map((item, index) => (
            <NavButton key={item.path} item={item} index={mainNavItems.length + index} />
        ))}
        <div className="relative">
          <button 
            onClick={() => session ? setShowProfileMenu(!showProfileMenu) : router.push('/auth/login')}
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

          {showProfileMenu && session && (
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
                        src={session.user.image || '/images/esportshall.png'}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{session.user.name}</p>
                      <p className="text-sm text-gray-500">@{session.user.email?.split('@')[0]}</p>
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
                    Cerrar la sesión de @{session.user.email?.split('@')[0]}
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
