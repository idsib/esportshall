import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (isAuthPage) {
    if (token) {
      // Si el usuario está autenticado y trata de acceder a páginas de auth,
      // redirigir a main
      return NextResponse.redirect(new URL('/main', request.url));
    }
    return NextResponse.next();
  }

  // Proteger las rutas que requieren autenticación
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/main/:path*', '/auth/:path*']
}; 