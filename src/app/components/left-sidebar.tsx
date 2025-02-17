'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Ionicons } from '@expo/vector-icons';
import Image from 'next/image';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const menuItems: Array<{ icon: IconName; activeIcon: IconName; label: string; path: string }> = [
    { icon: 'grid-outline', activeIcon: 'grid', label: 'Parrilla', path: '/grid' },
    { icon: 'home-outline', activeIcon: 'home', label: 'Inicio', path: '/main' },
    { icon: 'compass-outline', activeIcon: 'compass', label: 'Explorar', path: '/explore' },
    { icon: 'chatbubbles-outline', activeIcon: 'chatbubbles', label: 'Mensajes', path: '/messages' },
    { icon: 'notifications-outline', activeIcon: 'notifications', label: 'Notificaciones', path: '/notifications' },
    { icon: 'settings-outline', activeIcon: 'settings', label: 'Configuración', path: '/settings' },
    { icon: 'exit-outline', activeIcon: 'exit', label: 'Salir', path: '/exit' },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();

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
                        return (
                            <button
                                key={item.path}
                                className={`flex items-center px-6 py-4 text-lg transition ${
                                    isActive
                                        ? 'text-blue-700 dark:text-blue-500'
                                        : 'text-black dark:text-white'
                                }`}
                                onClick={() => {
                                    router.push(item.path);
                                    onClose?.();
                                }}
                            >
                                <Ionicons
                                    name={isActive ? item.activeIcon : item.icon}
                                    size={26}
                                    className="mr-4"
                                />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}