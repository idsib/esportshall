"use client"

import { SessionProvider } from "next-auth/react"
import GoogleAuthHandler from "../auth/components/GoogleAuthHandler"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <GoogleAuthHandler />
            {children}
        </SessionProvider>
    )
} 