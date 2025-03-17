"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "../../context/theme-context"

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer className="w-full py-8 mt-20 border-t dark:border-white/10 border-gray-200 bg-white/70 dark:bg-dark-100/70 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              href="/"
              className="flex items-center space-x-2 mb-4"
            >
              <Image
                src="/images/esportshall.png"
                alt="EsportsHall Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-gray-900 dark:text-white">EsportsHall</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              La plataforma centralizada de esports en España. Conectamos jugadores, equipos y torneos en una única comunidad.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/esports" className="nav-link">Esports</Link></li>
              <li><Link href="/games" className="nav-link">Juegos</Link></li>
              <li><Link href="/teams" className="nav-link">Equipos</Link></li>
              <li><Link href="/comunidad" className="nav-link">Comunidad</Link></li>
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
                <Link href="/about" className="nav-link">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link">
                  Contacto
                </Link>
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
              <Link 
                href="/policy/terms-of-service" 
                className="text-gray-600 dark:text-gray-300 text-sm hover:text-brand-yellow"
              >
                Términos y Condiciones
              </Link>
              <Link 
                href="/policy/privacy-policy" 
                className="text-gray-600 dark:text-gray-300 text-sm hover:text-brand-yellow"
              >
                Política de Privacidad
              </Link>
              <Link 
                href="/policy/cookies-policy" 
                className="text-gray-600 dark:text-gray-300 text-sm hover:text-brand-yellow"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 