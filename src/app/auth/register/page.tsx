"use client"

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from "../../components/layout/nav"
import { Footer } from "../../components/layout/footer"
import { useTheme } from "../../../context/theme-context"
import { useEffect, useState } from 'react'
import { signIn, useSession } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'

//-backend-//
import { register, checkEmailExists } from '../neon/actionsServer'
//-backend-//

export default function Register() {
    const { data: session } = useSession()
    const { theme } = useTheme()
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        terms: false
    })
    
    const [emailError, setEmailError] = useState('')
    const [isCheckingEmail, setIsCheckingEmail] = useState(false)

    useEffect(() => {
        if (session) {
            redirect('/')
        }
    }, [session])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        
        // Clear email error when user starts typing a new email
        if (name === 'email') {
            setEmailError('')
        }
    }
    
    const handleEmailBlur = async () => {
        if (formData.email && formData.email.includes('@')) {
            setIsCheckingEmail(true)
            try {
                const result = await checkEmailExists(formData.email)
                if (result.exists) {
                    setEmailError(result.message)
                } else {
                    setEmailError('')
                }
            } catch (error) {
                console.error('Error al verificar email:', error)
            } finally {
                setIsCheckingEmail(false)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.terms) {
            alert('Debes aceptar los términos y condiciones')
            return
        }
        
        // Verifica si hay errores de correo antes de enviar
        if (emailError) {
            alert('Por favor utiliza un correo electrónico diferente')
            return
        }
        
        try {
            const result = await register(new FormData(e.currentTarget))
            
            if (!result.success) {
                throw new Error(result.error)
            }
            
            setIsSuccess(true)
            // Esperar 2 segundos antes de redirigir
            setTimeout(() => {
                router.push('/auth/login')
            }, 2000)
        } catch (error) {
            console.error('Error al registrar:', error)
            alert('Error al registrar: ' + (error instanceof Error ? error.message : error))
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
                        {isSuccess ? (
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-brand-yellow mb-4">
                                    ¡Registro Exitoso!
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Te has registrado correctamente. Serás redirigido a la página de inicio de sesión en unos segundos...
                                </p>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto"></div>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-brand-yellow mb-2">
                                        Crear Cuenta
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Únete a la comunidad de EsportsHall
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow dark:bg-dark-300 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Apellido
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow dark:bg-dark-300 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

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
                                            onBlur={handleEmailBlur}
                                            className={`mt-1 block w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300 dark:border-dark-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow dark:bg-dark-300 dark:text-white`}
                                            required
                                        />
                                        {isCheckingEmail && (
                                            <p className="text-sm text-gray-500 mt-1">Verificando disponibilidad...</p>
                                        )}
                                        {emailError && (
                                            <p className="text-sm text-red-500 mt-1">{emailError}</p>
                                        )}
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

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            id="terms"
                                            checked={formData.terms}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded"
                                        />
                                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Acepto los{' '}
                                            <Link href="/terms" className="text-brand-yellow hover:text-brand-yellow-dark">
                                                términos y condiciones
                                            </Link>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-yellow hover:bg-brand-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow"
                                    >
                                        Registrarse
                                    </button>
                                </form>

                                <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
                                    ¿Ya tienes una cuenta?{' '}
                                    <Link href="/auth/login" className="text-brand-yellow hover:text-brand-yellow-dark">
                                        Inicia sesión
                                    </Link>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 