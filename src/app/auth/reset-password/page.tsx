"use client"

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Nav from "../../components/layout/nav"
import { Footer } from "../../components/footer"
import { useState } from 'react'

export default function ResetPassword() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            // Aquí iría la lógica para enviar el email de recuperación
            console.log('Email para recuperación:', email)
            setMessage({
                type: 'success',
                text: 'Se ha enviado un email con las instrucciones para restablecer tu contraseña'
            })
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Ha ocurrido un error al enviar el email'
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
                        <button
                            onClick={() => router.push('/auth/login')}
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Volver a inicio de sesión</span>
                        </button>
                    </div>

                    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-brand-yellow mb-2">
                                Recuperar Contraseña
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Te enviaremos un email con instrucciones para restablecer tu contraseña
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                    placeholder="tu@email.com"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary py-2 flex items-center justify-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Instrucciones'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 