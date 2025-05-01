// Hook personalizado para autenticación
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token && !session) {
        router.push('/auth/login')
        return
      }

      if (token) {
        try {
          const response = await fetch('/api/auth/verify-token', {
            headers: {
              'x-auth-token': token
            }
          })

          if (!response.ok) {
            localStorage.removeItem('token')
            router.push('/auth/login')
          }
        } catch (error) {
          console.error('Error al verificar token:', error)
          localStorage.removeItem('token')
          router.push('/auth/login')
        }
      }
    }

    checkAuth()
  }, [session, router])

  return {
    isAuthenticated: !!session || !!localStorage.getItem('token'),
    session
  }
} 