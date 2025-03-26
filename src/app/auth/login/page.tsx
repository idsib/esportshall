"use client"

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from "../../components/layout/nav"
import { Footer } from "../../components/layout/footer"
import { useTheme } from "../../context/theme-context"
import { useEffect, useState } from 'react'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function Login() {
    const { data: session } = useSession()
    const { theme } = useTheme()
    const router = useRouter()

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
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (result?.error) {
                console.error('Error al iniciar sesión:', result.error)
                // Aquí podrías mostrar un mensaje de error al usuario
            } else {
                router.push('/main')
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
        }
    }

    return (
        <>
            <Nav />
            <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-start mb-8">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Volver al inicio</span>
                        </Link>
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow dark:bg-dark-300 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow dark:bg-dark-300 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                        checked={formData.remember}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Recordarme
                                    </label>
                                </div>
                                <Link href="/auth/forgot-password" className="text-sm text-brand-yellow hover:text-brand-yellow-dark">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-yellow hover:bg-brand-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow"
                            >
                                Iniciar Sesión
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-dark-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-dark-200 text-gray-500 dark:text-gray-400">
                                        O continúa con
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => signIn('google', { callbackUrl: '/main' })}
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
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
                            ¿No tienes una cuenta?{' '}
                            <Link href="/auth/register" className="text-brand-yellow hover:text-brand-yellow-dark">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 