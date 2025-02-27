import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "./context/theme-context"
import CookieConsent from './components/cookie-consent'
import Script from 'next/script'
import { AuthProvider } from "./providers/auth-provider"

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
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-dark-100 text-gray-900 dark:text-white transition-colors duration-300`}>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <CookieConsent />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

