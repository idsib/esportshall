import { Context } from 'hono';
import { jwt } from 'hono/jwt';
import { env } from '../config/env';

export const authMiddleware = jwt({
  secret: env.JWT_SECRET,
  cookie: 'auth_token',
});

export async function getCurrentUser(c: Context) {
  const payload = c.get('jwtPayload');
  if (!payload?.sub) {
    return null;
  }
  
  // TODO: Obtener el usuario de la base de datos Fetch
  return payload;
}

export function generateToken(userId: string) {
  // TODO: Implementar Token JWT con el ID del usuario
  return '';
}
