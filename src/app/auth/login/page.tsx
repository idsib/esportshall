"use client"

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Nav from "../../components/layout/nav"
import { Footer } from "../../components/layout/footer"
import { useTheme } from "../../context/theme-context"
import { useEffect, useState } from 'react'
import { initializeGoogleAuth } from '@/lib/google-auth'
import { signIn, useSession } from "next-auth/react"

export default function Login() {
    const { data: session } = useSession()
    const router = useRouter()
    const { theme } = useTheme()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    })

    useEffect(() => {
        if (session) {
            router.push('/main')
        }
    }, [session, router])

    useEffect(() => {
        // Inicializar Google Auth
        initializeGoogleAuth();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            // Aquí iría la lógica para enviar los datos al backend
            console.log('Datos del formulario:', formData)
            // Después de un inicio de sesión exitoso
            router.push('/main')
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await signIn('google', {
                callbackUrl: '/main',
                popup: true,
                redirect: false
            })
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error)
        }
    }

    return (
        <>
            <Nav />
            <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-start mb-8">
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Volver al inicio</span>
                        </button>
                    </div>

                    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-brand-yellow mb-2">
                                Iniciar Sesión
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Bienvenido de nuevo a EsportsHall
                            </p>
                        </div>

                        <div className="space-y-6">
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
                            >
                                <Image
                                    src={theme === 'dark' ? '/images/google-dark.svg' : '/images/google-light.svg'}
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                <span>Continuar con Google</span>
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-dark-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-dark-200 text-gray-500 dark:text-gray-400">
                                        O inicia sesión con email
                                    </span>
                                </div>
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

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 rounded border-gray-300 text-brand-yellow focus:ring-brand-yellow focus:ring-offset-0 transition duration-150 ease-in-out"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 select-none cursor-pointer">
                                            Recordarme
                                        </label>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => router.push('/auth/reset-password')}
                                        className="text-sm text-brand-yellow hover:text-yellow-600 transition-colors"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-primary py-2"
                                >
                                    Iniciar Sesión
                                </button>
                            </form>

                            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                                ¿No tienes una cuenta?{' '}
                                <button
                                    onClick={() => router.push('/auth/register')}
                                    className="text-brand-yellow hover:text-yellow-600 transition-colors"
                                >
                                    Regístrate
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