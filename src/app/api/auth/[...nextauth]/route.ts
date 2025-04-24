import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { neon } from '@neondatabase/serverless';
import { hashMD5 } from '@/app/auth/neon/hashPass';
import { login } from '@/app/auth/neon/actionsServer';

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciales inválidas");
        }

        try {
          const token = await login(credentials.email, credentials.password);
          if (!token) {
            throw new Error("Credenciales inválidas");
          }

          // Obtener el usuario de la base de datos
          const [user] = await sql('SELECT * FROM users WHERE email = $1', [credentials.email]);
          
          if (!user) {
            throw new Error("Usuario no encontrado");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            token: token.token,
            expirationDate: token.expirateDate
          };
        } catch (error) {
          console.error('Error en la autenticación:', error);
          throw new Error("Error en la autenticación");
        }
      }
    })
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

          // Obtener el ID del usuario
          const [dbUser] = await sql('SELECT id FROM users WHERE email = $1', [user.email]);

          // Generar token personalizado
          const token = await hashMD5(user.name + Date.now());
          const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
          const expirationDate = new Date(Date.now() + oneMonth);

          // Almacenar el token en la base de datos
          await sql(
            'INSERT INTO users_token (user_id, token, expiration_date) VALUES ($1, $2, $3)',
            [dbUser.id, token, expirationDate]
          );

          // Almacenar el token en localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }

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
