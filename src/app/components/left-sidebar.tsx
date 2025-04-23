'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutGrid, 
  Home, 
  Compass, 
  MessageCircle, 
  Bell, 
  Settings,
  LogOut,
  User,
  ChevronUp
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from '@/context/theme-context';

const menuItems = [
    { icon: LayoutGrid, label: 'Parrilla', path: '/grid' },
    { icon: Home, label: 'Inicio', path: '/main' },
    { icon: Compass, label: 'Explorar', path: '/explore' },
    { icon: MessageCircle, label: 'Mensajes', path: '/messages' },
    { icon: Bell, label: 'Notificaciones', path: '/notifications' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { data: session } = useSession();
    const { theme } = useTheme();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/auth/login' });
    };

    return (
        <div className="relative w-[280px] h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
            <div className="flex flex-col h-full overflow-auto">
                {/* Logo */}
                <div className="flex items-center justify-center py-4">
                    <Image
                        src="/images/esportshall.png"
                        alt="Esports Hall Logo"
                        width={250}
                        height={150}
                        className="text-blue-700 dark:text-blue-500"
                    />
                </div>

                {/* Menú */}
                <div className="flex flex-col flex-grow">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        const IconComponent = item.icon;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center px-6 py-4 text-lg transition ${
                                    isActive
                                        ? 'text-blue-700 dark:text-blue-500'
                                        : 'text-black dark:text-white'
                                }`}
                                onClick={onClose}
                            >
                                <IconComponent
                                    size={26}
                                    className="mr-4"
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Perfil */}
                <div className="mt-auto relative">
                    <button
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors ${
                            isProfileMenuOpen ? 'bg-gray-100 dark:bg-gray-900' : ''
                        }`}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                <Image
                                    src={session?.user?.image || '/images/esportshall.png'}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-sm dark:text-white">
                                    {session?.user?.name || 'Usuario'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    @{session?.user?.email?.split('@')[0] || 'usuario'}
                                </p>
                            </div>
                        </div>
                        <ChevronUp
                            size={20}
                            className={`text-gray-500 transition-transform ${
                                isProfileMenuOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {/* Menú desplegable */}
                    {isProfileMenuOpen && (
                        <div className={`absolute bottom-full left-0 w-full mb-1 rounded-lg shadow-lg overflow-hidden border ${
                            theme === 'dark'
                                ? 'bg-black border-gray-800'
                                : 'bg-white border-gray-200'
                        }`}>
                            <button
                                onClick={() => {/* Implementar lógica para agregar cuenta */}}
                                className={`w-full px-6 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-900 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}
                            >
                                Agregar una cuenta existente
                            </button>
                            <button
                                onClick={handleLogout}
                                className={`w-full px-6 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-900 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}
                            >
                                Cerrar la sesión de @{session?.user?.email?.split('@')[0] || 'usuario'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}