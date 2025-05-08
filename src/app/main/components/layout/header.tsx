"use client";

import { useState } from "react";
import Image from 'next/image';
import { Search, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../../../context/theme-context';
import { useRouter, usePathname } from 'next/navigation';
import TwitchNotification from '../../components/twitch-notification';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { name: 'Contacto', path: '/main/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 border-b z-50 backdrop-blur-md ${
      theme === 'dark' 
        ? 'bg-dark-200/95 border-dark-300 text-white' 
        : 'bg-white/95 border-gray-100 text-gray-900 shadow-sm'
    }`}>
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <button onClick={() => router.push('/')} className="flex items-center">
            <Image src="/images/esportshall.png" alt="Esports Hall" width={40} height={40} className="rounded-lg" />
          </button>
          
          {/* Navegación para desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`transition-colors ${
                  pathname === item.path
                    ? 'text-yellow-400'
                    : 'hover:text-yellow-400'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TwitchNotification />
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-400 hover:text-yellow-400 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar"
              className={`rounded-full px-4 py-2 pl-10 w-[300px] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                theme === 'dark'
                  ? 'bg-dark-300 text-white placeholder-gray-400 border border-dark-300'
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200'
              }`}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          </div>

          {/* Botón de menú móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-yellow-400 transition-colors"
          >
            <Menu size={24} />
          </button>
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
            {/* Barra de búsqueda móvil */}
            <div className="relative sm:hidden pt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar"
                className={`w-full rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                  theme === 'dark'
                    ? 'bg-dark-300 text-white placeholder-gray-400 border border-dark-300'
                    : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200'
                }`}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
