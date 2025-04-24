import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { neon } from '@neondatabase/serverless';
import { hashMD5 } from '@/app/auth/neon/hashPass';

const sql = neon(`${process.env.DATABASE_URL}`);

// Extender los tipos de NextAuth
declare module "next-auth" {
  interface User {
    token?: string;
    expirationDate?: Date;
  }
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string;
      expirationDate?: Date;
    }
  }
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email && user.name) {
        try {
          // Verificar si el usuario ya existe
          const existingUser = await sql('SELECT * FROM users WHERE email = $1', [user.email]);
          
          if (existingUser.length === 0) {
            // Crear nuevo usuario si no existe
            await sql(
              'INSERT INTO users (name, email) VALUES ($1, $2)',
              [user.name, user.email]
            );
          }

          // Generar token personalizado
          const token = await hashMD5(user.name + Date.now());
          const oneMonth = 30 * 24 * 60 * 60 * 1000;
          const expirationDate = new Date(Date.now() + oneMonth);

          // Obtener el ID del usuario
          const [dbUser] = await sql('SELECT id FROM users WHERE email = $1', [user.email]);

          // Almacenar el token
          await sql(
            'INSERT INTO users_token (user_id, token, expiration_date) VALUES ($1, $2, $3)',
            [dbUser.id, token, expirationDate]
          );

          // Agregar el token a la sesión
          user.token = token;
          user.expirationDate = expirationDate;
          
          return true;
        } catch (error) {
          console.error('Error en el proceso de autenticación:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user && user) {
        session.user.token = user.token;
        session.user.expirationDate = user.expirationDate;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
