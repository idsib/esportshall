"use client"

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from "../../components/layout/nav"
import { Footer } from "../../components/layout/footer"
import { useTheme } from "../../../context/theme-context"
import { useEffect, useState } from 'react'
import { signIn, useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

//-backend-//
import { neon } from '@neondatabase/serverless';
import { create } from '../neon/actions'
//-backend-//

export default function Register() {
    const { data: session } = useSession()
    const { theme } = useTheme()
    const router = useRouter()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        terms: false
    })

    useEffect(() => {
        if (session) {
            redirect('/main')
        }
    }, [session])

    //-backend-//
    //-backend-//

    const handleGoogleRegister = async () => {
        try {
            await signIn('google', {
                callbackUrl: '/main',
                popup: true,
                redirect: false
            })
        } catch (error) {
            console.error('Error al registrarse con Google:', error)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.terms) {
            alert('Debes aceptar los términos y condiciones')
            return
        }
        try {
            await create(new FormData(e.currentTarget))
            // Después de un registro exitoso, redirigir al login
            router.push('/auth/login')
        } catch (error) {
            console.error('Error al registrar:', error)
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
                                Crear Cuenta
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Únete a la comunidad de EsportsHall
                            </p>
                        </div>

                        <div className="space-y-6">
                            <button
                                onClick={handleGoogleRegister}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
                            >
                                <Image
                                    src={theme === 'dark' ? '/images/google-dark.svg' : '/images/google-light.svg'}
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

                            <form action={create} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                            placeholder="Pablo"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Apellidos
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                            placeholder="Torres"
                                            required
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
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        name="terms"
                                        checked={formData.terms}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 rounded border-gray-300 text-brand-yellow focus:ring-brand-yellow focus:ring-offset-0 transition duration-150 ease-in-out"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 select-none cursor-pointer">
                                        Acepto los{' '}
                                        <Link
                                            href="/policy/terms-of-service"
                                            className="text-brand-yellow hover:text-yellow-600 transition-colors"
                                        >
                                            términos y condiciones
                                        </Link>
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
                                <Link
                                    href="/auth/login"
                                    className="text-brand-yellow hover:text-yellow-600 transition-colors"
                                >
                                    Inicia sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 