"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Upload } from 'lucide-react'
import Nav from "../components/layout/nav"
import { Footer } from "../components/layout/footer"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        message: '',
        newsletter: false
    })
    const [file, setFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            // Aquí iría la lógica para enviar los datos al backend
            const formDataToSend = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value.toString())
            })
            if (file) {
                formDataToSend.append('file', file)
            }
            console.log('Datos del formulario:', formData)
            console.log('Archivo:', file)
        } catch (error) {
            console.error('Error al enviar el formulario:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Nav />
            <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
                <div className="max-w-2xl mx-auto">
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
                                Únete al Equipo
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                ¿Quieres formar parte del futuro de los esports en España?
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                    placeholder="Inserta tu nombre"
                                    required
                                />
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
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Rol de interés
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                    required
                                >
                                    <option value="">Selecciona un rol</option>
                                    <option value="admin">Administrador</option>
                                    <option value="moderator">Moderador</option>
                                    <option value="content">Creador de contenido</option>
                                    <option value="tournament">Organizador de torneos</option>
                                    <option value="other">Otro</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    ¿Por qué quieres unirte?
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                    placeholder="Cuéntanos sobre tu experiencia y motivación..."
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    name="newsletter"
                                    checked={formData.newsletter}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded"
                                />
                                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Suscribirme al newsletter para recibir actualizaciones
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Adjuntar CV o Portfolio (opcional)
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-dark-300 text-gray-700 dark:text-gray-300 rounded-lg border-2 border-dashed border-gray-300 dark:border-dark-400 cursor-pointer hover:border-brand-yellow dark:hover:border-brand-yellow transition-colors">
                                        <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                        <span className="text-sm">Haz click o arrastra archivos aquí</span>
                                        <input 
                                            type="file" 
                                            id="file" 
                                            className="hidden" 
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary py-2 flex items-center justify-center space-x-2"
                                disabled={isSubmitting}
                            >
                                <span>{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 