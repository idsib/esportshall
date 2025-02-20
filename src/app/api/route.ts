import { NextRequest, NextResponse } from 'next/server'
import { Hono } from 'hono'
import { authMiddleware } from '@/server/middleware/auth'

const app = new Hono().basePath('/api')

// Rutas públicas
app.get('/games', async (c: { json: (data: any) => any }) => {
  // TODO: Implement lista de juegos
  return c.json({ message: 'Games list' })
})

// Rutas protegidas
app.use('/user/*', authMiddleware)
app.get('/user/profile', async (c: { json: (data: any) => any }) => {
  // Implementar lógica de perfil de usuario
  return c.json({ message: 'User profile' })
})

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const response = await app.fetch(request, {
    path: url.pathname
  })
  return response
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const response = await app.fetch(request, {
    path: url.pathname
  })
  return response
}
