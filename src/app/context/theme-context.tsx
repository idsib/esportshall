"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark")

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Theme | null
    if (localTheme) {
      setTheme(localTheme)
      document.documentElement.className = localTheme
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("theme", theme)
    document.documentElement.className = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
} 