"use client"

import { useRouter } from 'next/navigation'
import Nav from "../components/nav"
import { Footer } from "../components/layout/footer"
import { Trophy, Users, Globe, Target, Award, Rocket, ArrowLeft } from "lucide-react"

export default function About() {
    const router = useRouter();

    return (
        <>
            <Nav />
            <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
                <div className="max-w-7xl mx-auto">
                    {/* Botón Volver */}
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Volver al Inicio</span>
                    </button>

                    {/* Sección Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-yellow mb-6">
                            Sobre EsportsHall
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            La plataforma líder en esports que conecta jugadores, equipos y torneos 
                            en toda España, creando una comunidad vibrante y competitiva.
                        </p>
                    </div>

                    {/* Cards de Características */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <FeatureCard 
                            icon={<Trophy />}
                            title="Torneos Competitivos"
                            description="Mostramos los torneos disponibles para múltiples juegos competitivos."
                        />
                        <FeatureCard 
                            icon={<Users />}
                            title="Gestión de Equipos"
                            description="Herramientas completas para crear, administrar y desarrollar tu equipo de esports."
                        />
                        <FeatureCard 
                            icon={<Globe />}
                            title="Comunidad Activa"
                            description="Una comunidad vibrante de jugadores, entrenadores y entusiastas de los esports."
                        />
                        <FeatureCard 
                            icon={<Target />}
                            title="Desarrollo de Talento"
                            description="Juegos organizados para desarrollar nuevos talentos en el mundo de los esports."
                        />
                        <FeatureCard 
                            icon={<Award />}
                            title="Títulos y Logros"
                            description="Organizamos a los equipos por títulos y logros conseguidos por secciones."
                        />
                        <FeatureCard 
                            icon={<Rocket />}
                            title="Innovación Constante"
                            description="Siempre a la vanguardia con las últimas tendencias y tecnologías en esports."
                        />
                    </div>

                    {/* Sección de Estadísticas */}
                    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-8 mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <StatCard number="10,000+" label="Jugadores Activos" />
                            <StatCard number="500+" label="Torneos Organizados" />
                            <StatCard number="200+" label="Equipos Registrados" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

function FeatureCard({ icon, title, description }: { 
    icon: React.ReactNode, 
    title: string, 
    description: string 
}) {
    return (
        <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
            <div className="text-brand-yellow mb-4 w-12 h-12">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
                {description}
            </p>
        </div>
    )
}

function StatCard({ number, label }: { number: string, label: string }) {
    return (
        <div className="space-y-2">
            <div className="text-4xl font-bold text-brand-yellow">
                {number}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
                {label}
            </div>
        </div>
    )
} 