"use client"

import { useState } from 'react'
import { Send, Upload, ArrowLeft } from 'lucide-react'
import MainLayout from '../components/layout/mainLayout'
import Link from 'next/link'

interface ValorantFields {
    agent: string;
    role: string;
    peakRank: string;
}

interface LolFields {
    role: string;
    champions: string;
    peakRank: string;
}

interface CsgoFields {
    role: string;
    weapons: string;
    peakRank: string;
}

interface RocketLeagueFields {
    position: string;
    car: string;
    peakRank: string;
}

interface FifaFields {
    formation: string;
    playStyle: string;
    peakRank: string;
}

interface FormData {
    type: string;
    name: string;
    email: string;
    phone: string;
    game: string;
    nickname: string;
    rank: string;
    experience: string;
    valorant: ValorantFields;
    lol: LolFields;
    csgo: CsgoFields;
    'rocket-league': RocketLeagueFields;
    fifa: FifaFields;
    teamName: string;
    teamSize: string;
    teamDescription: string;
    message: string;
    newsletter: boolean;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        type: '',
        name: '',
        email: '',
        phone: '',
        game: '',
        nickname: '',
        rank: '',
        experience: '',
        valorant: {
            agent: '',
            role: '',
            peakRank: ''
        },
        lol: {
            role: '',
            champions: '',
            peakRank: ''
        },
        csgo: {
            role: '',
            weapons: '',
            peakRank: ''
        },
        'rocket-league': {
            position: '',
            car: '',
            peakRank: ''
        },
        fifa: {
            formation: '',
            playStyle: '',
            peakRank: ''
        },
        teamName: '',
        teamSize: '',
        teamDescription: '',
        message: '',
        newsletter: false
    })
    const [file, setFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        
        if (name.includes('.')) {
            const [gameKey, field] = name.split('.')
            setFormData(prev => {
                const game = gameKey as keyof Pick<FormData, 'valorant' | 'lol' | 'csgo' | 'rocket-league' | 'fifa'>
                return {
                    ...prev,
                    [game]: {
                        ...prev[game],
                        [field]: value
                    }
                }
            })
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
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
            // Aquí va la lógica para enviar los datos al backend
            const formDataToSend = new FormData()
            
            // Aplanar los datos del formulario para enviarlos
            const flattenFormData = (obj: any, prefix = '') => {
                Object.keys(obj).forEach(key => {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        flattenFormData(obj[key], `${prefix}${key}.`)
                    } else {
                        formDataToSend.append(`${prefix}${key}`, obj[key].toString())
                    }
                })
            }
            
            flattenFormData(formData)
            
            if (file) {
                formDataToSend.append('file', file)
            }
            
            console.log('Datos del formulario:', formData)
            console.log('Archivo:', file)
            
            // Aquí iría la llamada a la API
            // await fetch('/api/contact', {
            //     method: 'POST',
            //     body: formDataToSend
            // })
            
            // Resetear el formulario después del envío exitoso
            setFormData({
                type: '',
                name: '',
                email: '',
                phone: '',
                game: '',
                nickname: '',
                rank: '',
                experience: '',
                valorant: {
                    agent: '',
                    role: '',
                    peakRank: ''
                },
                lol: {
                    role: '',
                    champions: '',
                    peakRank: ''
                },
                csgo: {
                    role: '',
                    weapons: '',
                    peakRank: ''
                },
                'rocket-league': {
                    position: '',
                    car: '',
                    peakRank: ''
                },
                fifa: {
                    formation: '',
                    playStyle: '',
                    peakRank: ''
                },
                teamName: '',
                teamSize: '',
                teamDescription: '',
                message: '',
                newsletter: false
            })
            setFile(null)
            
            // Mostrar mensaje de éxito (puedes implementar un sistema de notificaciones)
            alert('Formulario enviado con éxito')
            
        } catch (error) {
            console.error('Error al enviar el formulario:', error)
            alert('Error al enviar el formulario. Por favor, inténtalo de nuevo.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <MainLayout>
            <div className="pt-0 pb-0 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
                <div className="max-w-1xl mx-auto">
                    <div className="flex justify-start mb-4">
                        <Link
                            href="/main"
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Volver al inicio</span>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-brand-yellow mb-2">
                                Inscripción para Jugadores y Equipos
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Únete a nuestra comunidad de esports y comienza tu carrera competitiva
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tipo de Inscripción
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                    required
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="player">Jugador Individual</option>
                                    <option value="team">Equipo</option>
                                </select>
                            </div>

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
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="game" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Juego
                                </label>
                                <select
                                    id="game"
                                    name="game"
                                    value={formData.game}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                    required
                                >
                                    <option value="">Selecciona un juego</option>
                                    <option value="valorant">Valorant</option>
                                    <option value="lol">League of Legends</option>
                                    <option value="csgo">CS:GO</option>
                                </select>
                            </div>

                            {formData.type === 'player' && formData.game && (
                                <>
                                    {formData.game === 'valorant' && (
                                        <>
                                            <div>
                                                <label htmlFor="valorant-agent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Agente Principal
                                                </label>
                                                <select
                                                    id="valorant-agent"
                                                    name="valorant.agent"
                                                    value={formData.valorant.agent}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                                    required
                                                >
                                                    <option value="">Selecciona un agente</option>
                                                    <option value="duelist">Duelista</option>
                                                    <option value="sentinel">Centinela</option>
                                                    <option value="initiator">Iniciador</option>
                                                    <option value="controller">Controlador</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="valorant-role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Rol Preferido
                                                </label>
                                                <input
                                                    type="text"
                                                    id="valorant-role"
                                                    name="valorant.role"
                                                    value={formData.valorant.role}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                                    placeholder="Ej: Entry Fragger, Support"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}

                                    {formData.game === 'lol' && (
                                        <>
                                            <div>
                                                <label htmlFor="lol-role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Rol Principal
                                                </label>
                                                <select
                                                    id="lol-role"
                                                    name="lol.role"
                                                    value={formData.lol.role}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                                    required
                                                >
                                                    <option value="">Selecciona un rol</option>
                                                    <option value="top">Top</option>
                                                    <option value="jungle">Jungla</option>
                                                    <option value="mid">Mid</option>
                                                    <option value="adc">ADC</option>
                                                    <option value="support">Support</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="lol-champions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Campeones Principales
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lol-champions"
                                                    name="lol.champions"
                                                    value={formData.lol.champions}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                                    placeholder="Ej: Yasuo, Zed, Fizz"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}

                                    {formData.game === 'csgo' && (
                                        <>
                                            <div>
                                                <label htmlFor="csgo-role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Rol en el Equipo
                                                </label>
                                                <select
                                                    id="csgo-role"
                                                    name="csgo.role"
                                                    value={formData.csgo.role}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                                    required
                                                >
                                                    <option value="">Selecciona un rol</option>
                                                    <option value="awper">Awper</option>
                                                    <option value="rifler">Rifler</option>
                                                    <option value="support">Support</option>
                                                    <option value="igl">IGL</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label htmlFor="peakRank" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Rango Máximo Alcanzado
                                        </label>
                                        <input
                                            type="text"
                                            id="peakRank"
                                            name={`${formData.game}.peakRank`}
                                            value={
                                                formData.game === 'valorant' ? formData.valorant.peakRank :
                                                formData.game === 'lol' ? formData.lol.peakRank :
                                                formData.game === 'csgo' ? formData.csgo.peakRank :
                                                formData.game === 'rocket-league' ? formData['rocket-league'].peakRank :
                                                formData.game === 'fifa' ? formData.fifa.peakRank : ''
                                            }
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {formData.type === 'team' && (
                                <>
                                    <div>
                                        <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nombre del Equipo
                                        </label>
                                        <input
                                            type="text"
                                            id="teamName"
                                            name="teamName"
                                            value={formData.teamName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Descripción del Equipo
                                        </label>
                                        <textarea
                                            id="teamDescription"
                                            name="teamDescription"
                                            value={formData.teamDescription}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border dark:border-dark-300 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-colors"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            
                            <div className="space-y-2">
                                <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Adjuntar CV o Portfolio
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-dark-300 text-gray-700 dark:text-gray-300 rounded-lg border-2 border-dashed border-gray-300 dark:border-dark-400 cursor-pointer hover:border-brand-yellow dark:hover:border-brand-yellow transition-colors">
                                        <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                        <span className="text-sm">Haz click o arrastra archivos aquí</span>
                                        <input 
                                            type="file" 
                                            id="file" 
                                            className="hidden" 
                                            accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
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
                                <span>{isSubmitting ? 'Enviando...' : 'Enviar Inscripción'}</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
} 