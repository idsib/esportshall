"use client";

import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TwitchNotification from '../../components/twitch-notification';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 border-b z-50 backdrop-blur-md ${
      theme === 'dark' 
        ? 'bg-dark-200/95 border-dark-300 text-white' 
        : 'bg-white/95 border-gray-100 text-gray-900 shadow-sm'
    }`}>
      <div className="flex items-center h-full">
        <div className="w-20 flex-shrink-0 flex justify-center items-center">
            <button onClick={() => router.push('/')} className="flex items-center">
                <Image src="/images/esportshall.png" alt="Esports Hall" width={40} height={40} className="rounded-lg" />
            </button>
        </div>
        <div className="flex-grow flex items-center justify-between h-full px-6">
            <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                    <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`transition-colors font-medium ${
                        pathname === item.path
                        ? 'text-yellow-400'
                        : 'hover:text-yellow-400'
                    }`}
                    >
                    {item.name}
                    </button>
                ))}
            </nav>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <TwitchNotification />
                    <button
                    onClick={toggleTheme}
                    className="p-2 text-neutral-400 hover:text-yellow-400 transition-colors"
                    >
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
                {!session && (
                  <Link 
                    href="/auth/login" 
                    className="hidden sm:block bg-brand-yellow text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition-colors"
                  >
                    Empezar Ahora
                  </Link>
                )}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>
        </div>
    </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className={`md:hidden border-t py-4 px-4 ${
          theme === 'dark'
            ? 'bg-dark-200 border-dark-300'
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setIsMenuOpen(false);
                }}
                className={`text-left py-2 transition-colors ${
                  pathname === item.path
                    ? 'text-yellow-400'
                    : 'hover:text-yellow-400'
                }`}
              >
                {item.name}
              </button>
            ))}
            {!session && (
              <Link 
                href="/auth/login" 
                className="bg-brand-yellow text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Empezar Ahora
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
