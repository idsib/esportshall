"use client"

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Nav from "../../../components/layout/nav"
import { Footer } from "../../../components/layout/footer"
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyTokenAndResetPassword } from '../../neon/resetPassword'

export default function ResetPasswordConfirm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [isTokenValid, setIsTokenValid] = useState(true)

    useEffect(() => {
        const tokenParam = searchParams.get('token')
        const emailParam = searchParams.get('email')
        
        if (!tokenParam || !emailParam) {
            setIsTokenValid(false)
            setMessage({
                type: 'error',
                text: 'Enlace de restablecimiento no válido o expirado'
            })
            return
        }
        
        setToken(tokenParam)
        setEmail(emailParam)
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (password !== confirmPassword) {
            setMessage({
                type: 'error',
                text: 'Las contraseñas no coinciden'
            })
            return
        }
        
        if (password.length < 8) {
            setMessage({
                type: 'error',
                text: 'La contraseña debe tener al menos 8 caracteres'
            })
            return
        }
        
        setIsSubmitting(true)
        
        try {
            const result = await verifyTokenAndResetPassword(token, email, password)
            
            setMessage({
                type: result.success ? 'success' : 'error',
                text: result.message
            })
            
            if (result.success) {
                // Redirigir al login después de 3 segundos
                setTimeout(() => {
                    router.push('/auth/login')
                }, 3000)
            }
        } catch (error) {
            console.error('Error al restablecer contraseña:', error)
            setMessage({
                type: 'error',
                text: 'Ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Nav />
            <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-start mb-8">
                        <Link
                            href="/auth/login"
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Volver a inicio de sesión</span>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-brand-yellow mb-2">
                                Crear Nueva Contraseña
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Ingresa tu nueva contraseña para tu cuenta
                            </p>
                        </div>

                        {message && (
                            <div className={`mb-6 p-4 rounded-lg ${
                                message.type === 'success' 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' 
                                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        {isTokenValid && message?.type !== 'success' && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nueva Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                        placeholder="Mínimo 8 caracteres"
                                        required
                                        disabled={isSubmitting}
                                        minLength={8}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                        placeholder="Repite tu contraseña"
                                        required
                                        disabled={isSubmitting}
                                        minLength={8}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-primary py-2 flex items-center justify-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Procesando...' : 'Cambiar Contraseña'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
