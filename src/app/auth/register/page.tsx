"use client"

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Nav from "../../components/layout/nav"
import { Footer } from "../../components/footer"

export default function Register() {
    const router = useRouter()

    return (
        <>
            <Nav />
            <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Volver al inicio</span>
                    </button>

                    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-brand-yellow mb-2">
                                Crear Cuenta
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Únete a la comunidad de EsportsHall
                            </p>
                        </div>

                        <div className="space-y-6">
                            <button
                                onClick={() => {/* Implementar registro con Google */}}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
                            >
                                <Image
                                    src="/images/google.svg"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                <span>Registrarse con Google</span>
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-dark-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-dark-200 text-gray-500 dark:text-gray-400">
                                        O regístrate con email
                                    </span>
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Apellidos
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

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

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Acepto los{' '}
                                        <button
                                            type="button"
                                            onClick={() => router.push('/policy/terms-of-service')}
                                            className="text-brand-yellow hover:text-yellow-600 transition-colors"
                                        >
                                            términos y condiciones
                                        </button>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-primary py-2"
                                >
                                    Crear Cuenta
                                </button>
                            </form>

                            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                                ¿Ya tienes una cuenta?{' '}
                                <button
                                    onClick={() => router.push('/auth/login')}
                                    className="text-brand-yellow hover:text-yellow-600 transition-colors"
                                >
                                    Inicia sesión
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 