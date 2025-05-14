"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        // Verificar si ya se aceptaron las cookies
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowConsent(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true');
        setShowConsent(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookie-consent', 'false');
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-4 right-4 max-w-md z-50 animate-fade-in">
            <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-300">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        🍪 Cookies
                    </h3>
                    <button
                        onClick={declineCookies}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Utilizamos cookies para mejorar tu experiencia en nuestra plataforma. 
                    Al continuar navegando, aceptas nuestra política de cookies.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                        onClick={acceptCookies}
                        className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow/90 text-black font-medium rounded-lg transition-all py-2 px-6"
                    >
                        Aceptar cookies
                    </button>
                    <Link
                        href="/policy/cookies-policy"
                        className="w-full sm:w-auto text-center py-2 px-6 text-sm text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors"
                    >
                        Ver política de cookies
                    </Link>
                </div>
            </div>
        </div>
    );
} 