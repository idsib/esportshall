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
  LogOut 
} from 'lucide-react';
import Image from 'next/image';

const menuItems = [
    { icon: LayoutGrid, label: 'Parrilla', path: '/grid' },
    { icon: Home, label: 'Inicio', path: '/main' },
    { icon: Compass, label: 'Explorar', path: '/explore' },
    { icon: MessageCircle, label: 'Mensajes', path: '/messages' },
    { icon: Bell, label: 'Notificaciones', path: '/notifications' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
    { icon: LogOut, label: 'Salir', path: '/exit' },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();

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
                <div className="flex flex-col">
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
            </div>
        </div>
    );
}