import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function middleware(request: NextRequest) {
  // Desactivamos temporalmente las restricciones de autenticación
  // para permitir el acceso a la página principal
  return NextResponse.next();
  
  /* Código original comentado
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const token = request.cookies.get('next-auth.session-token')?.value;
  const localStorageToken = request.headers.get('x-auth-token');

  if (isAuthPage) {
    if (token || localStorageToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Verificar autenticación
  if (!token && !localStorageToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Verificar token de localStorage si existe
  if (localStorageToken) {
    try {
      const result = await sql(
        'SELECT * FROM users_token WHERE token = $1 AND expiration_date > NOW()',
        [localStorageToken]
      );
      
      if (result.length === 0) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    } catch (error) {
      console.error('Error al verificar token:', error);
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: ['/main/:path*', '/auth/:path*']
}; 