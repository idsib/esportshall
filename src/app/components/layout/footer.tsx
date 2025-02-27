"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTheme } from "../../context/theme-context"

export function Footer() {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <footer className="w-full py-8 mt-20 border-t dark:border-white/10 border-gray-200 bg-white/70 dark:bg-dark-100/70 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div 
              className="flex items-center space-x-2 mb-4 cursor-pointer" 
              onClick={() => router.push('/')}
            >
              <Image
                src="/images/esportshall.png"
                alt="EsportsHall Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-gray-900 dark:text-white">EsportsHall</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              La plataforma centralizada de esports en España. Conectamos jugadores, equipos y torneos en una única comunidad.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><button onClick={() => router.push('/esports')} className="nav-link">Esports</button></li>
              <li><button onClick={() => router.push('/teams')} className="nav-link">Equipos</button></li>
              <li><button onClick={() => router.push('/comunidad')} className="nav-link">Comunidad</button></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@esportshall.com" className="nav-link">
                  info@esportshall.com
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/idsib/esportshall" 
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <button onClick={() => router.push('/about')} className="nav-link">
                  Sobre Nosotros
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t dark:border-white/10 border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} EsportsHall. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button 
                onClick={() => router.push('/policy/terms-of-service')} 
                className="text-gray-600 dark:text-gray-300 text-sm hover:text-brand-yellow"
              >
                Términos y Condiciones
              </button>
              <button 
                onClick={() => router.push('/policy/privacy-policy')} 
                className="text-gray-600 dark:text-gray-300 text-sm hover:text-brand-yellow"
              >
                Política de Privacidad
              </button>
              <button 
                onClick={() => router.push('/policy/cookies-policy')} 
                className="text-gray-600 dark:text-gray-300 text-sm hover:text-brand-yellow"
              >
                Política de Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 