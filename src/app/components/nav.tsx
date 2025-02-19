"use client"

import Image from "next/image"
import Link from "next/link"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useState } from "react"
import { useTheme } from "../context/theme-context"

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-dark-100/70 backdrop-blur-md border-b border-gray-200 dark:border-dark-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/esportshall.png"
              alt="EsportsHall Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-gray-900 dark:text-white">EsportsHall</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="nav-link">Torneos</Link>
            <Link href="#" className="nav-link">Equipos</Link>
            <Link href="#" className="nav-link">Comunidad</Link>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
            >
              {theme === "dark" ? 
                <Sun className="w-5 h-5 text-brand-yellow" /> : 
                <Moon className="w-5 h-5 text-gray-600" />
              }
            </button>
            <button className="btn-primary">
              Empezar Ahora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" /> : 
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-dark-300">
            <div className="flex flex-col space-y-4">
              <Link href="#" className="nav-link">Torneos</Link>
              <Link href="#" className="nav-link">Equipos</Link>
              <Link href="#" className="nav-link">Comunidad</Link>
              <button className="btn-primary w-full">
                Empezar Ahora
              </button>
              <button 
                onClick={toggleTheme}
                className="flex items-center space-x-2 nav-link"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Modo Oscuro</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

