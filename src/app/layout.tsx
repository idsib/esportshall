import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { AnimatedBackground } from "./components/animated-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EsportsHall - La Plataforma de Esports en España",
  description: "La plataforma centralizada de esports en España. Torneos, equipos, y más.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  )
}

