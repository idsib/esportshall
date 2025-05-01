import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(request: Request) {
  const token = request.headers.get('x-auth-token');

  if (!token) {
    return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
  }

  try {
    const result = await sql(
      'SELECT * FROM users_token WHERE token = $1 AND expiration_date > NOW()',
      [token]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Error al verificar token:', error);
    return NextResponse.json({ error: 'Error al verificar token' }, { status: 500 });
  }
} 