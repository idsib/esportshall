"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import Nav from "../components/layout/nav";
import { Footer } from "../components/layout/footer";


export default function PolicyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-100">
            <Nav />
            {/* Header with Navigation */}
            <header className="fixed top-16 left-0 right-0 bg-white/70 dark:bg-dark-100/70 backdrop-blur-md z-40 border-b dark:border-white/10 border-gray-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Inicio</span>
                    </Link>

                    {/* Navigation moved here */}
                    <div className="flex items-center space-x-8">
<<<<<<< HEAD
                        <Link 
                            href="/policy/terms-of-service"
                            className={`text-sm transition-colors ${
                                pathname === '/policy/terms-of-service'
=======
                        <button
                            onClick={() => router.push('/policy/terms-of-service')}
                            className={`text-sm transition-colors ${pathname === '/policy/terms-of-service'
>>>>>>> 2c458d85bca5b1b691cd59bccb06ca24d35b087e
                                ? 'text-brand-yellow'
                                : 'text-gray-600 dark:text-gray-300 hover:text-brand-yellow'
                                }`}
                        >
                            Términos de Servicio
<<<<<<< HEAD
                        </Link>
                        <Link 
                            href="/policy/privacy-policy"
                            className={`text-sm transition-colors ${
                                pathname === '/policy/privacy-policy'
=======
                        </button>
                        <button
                            onClick={() => router.push('/policy/privacy-policy')}
                            className={`text-sm transition-colors ${pathname === '/policy/privacy-policy'
>>>>>>> 2c458d85bca5b1b691cd59bccb06ca24d35b087e
                                ? 'text-brand-yellow'
                                : 'text-gray-600 dark:text-gray-300 hover:text-brand-yellow'
                                }`}
                        >
                            Política de Privacidad
<<<<<<< HEAD
                        </Link>
                        <Link 
                            href="/policy/cookies-policy"
                            className={`text-sm transition-colors ${
                                pathname === '/policy/cookies-policy'
=======
                        </button>
                        <button
                            onClick={() => router.push('/policy/cookies-policy')}
                            className={`text-sm transition-colors ${pathname === '/policy/cookies-policy'
>>>>>>> 2c458d85bca5b1b691cd59bccb06ca24d35b087e
                                ? 'text-brand-yellow'
                                : 'text-gray-600 dark:text-gray-300 hover:text-brand-yellow'
                                }`}
                        >
                            Política de Cookies
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-32">
                {children}
            </main>
            <Footer />
        </div>
    );
} 