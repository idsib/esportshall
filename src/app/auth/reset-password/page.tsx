"use client"

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Nav from "../../components/layout/nav"
import { Footer } from "../../components/footer"

export default function ResetPassword() {
    const router = useRouter()

    return (
        <>
            <Nav />
            <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Volver a inicio de sesión</span>
                    </button>

                    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-brand-yellow mb-2">
                                Recuperar Contraseña
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Te enviaremos un email con instrucciones para restablecer tu contraseña
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary py-2"
                            >
                                Enviar Instrucciones
                            </button>

                            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                                ¿Recordaste tu contraseña?{' '}
                                <button
                                    onClick={() => router.push('/auth/login')}
                                    className="text-brand-yellow hover:text-yellow-600 transition-colors"
                                >
                                    Volver al login
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 