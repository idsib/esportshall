import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "./context/theme-context"
import CookieConsent from './components/cookie-consent'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EsportsHall - La Plataforma de Esports en España",
  description: "La plataforma centralizada de esports en España. Torneos, equipos, y más.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-dark-100 text-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}

