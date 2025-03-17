"use client"

import { useState } from 'react'
import { Send, Upload } from 'lucide-react'
import MainLayout from '../components/layout/mainLayout'

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
        <MainLayout>
            <div className="max-w-2xl mx-auto">
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
                        {/* ... resto del formulario ... */}
                    </form>
                </div>
            </div>
        </MainLayout>
    )
} 