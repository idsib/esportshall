import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { authMiddleware } from '@/server/middleware/auth';

const app = new Hono().basePath('/api');

// Rutas públicas
app.get('/games', async (c) => {
  // TODO: Implement lista de juegos
  return c.json({ message: 'Games list' });
});

// Rutas protegidas
app.use('/user/*', authMiddleware);
app.get('/user/profile', async (c) => {
  // Implementar lógica de perfil de usuario
  return c.json({ message: 'User profile' });
});

export const GET = handle(app);
