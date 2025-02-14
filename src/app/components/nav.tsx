"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/70 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/esportshall-logo.png"
              alt="EsportsHall Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-xl">EsportsHall</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#torneos" className="hover:text-brand-yellow transition-colors">
              Torneos
            </Link>
            <Link href="#equipos" className="hover:text-brand-yellow transition-colors">
              Equipos
            </Link>
            <Link href="#comunidad" className="hover:text-brand-yellow transition-colors">
              Comunidad
            </Link>
            <Link
              href="#registro"
              className="px-4 py-2 bg-brand-yellow text-background rounded-md hover:bg-opacity-90 transition-all"
            >
              Únete
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-md border-t border-gray-800 animate-slide-down">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                href="#torneos"
                className="hover:text-brand-yellow transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Torneos
              </Link>
              <Link
                href="#equipos"
                className="hover:text-brand-yellow transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Equipos
              </Link>
              <Link
                href="#comunidad"
                className="hover:text-brand-yellow transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Comunidad
              </Link>
              <Link
                href="#registro"
                className="px-4 py-2 bg-brand-yellow text-background rounded-md hover:bg-opacity-90 transition-all inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                Únete
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav

