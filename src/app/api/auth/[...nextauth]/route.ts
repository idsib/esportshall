import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare, hash } from "bcrypt";
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      token?: string;
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
          const user = await sql('SELECT * FROM users WHERE email = $1', [credentials.email]);
          
          if (!user || user.length === 0) {
            throw new Error("Usuario no encontrado");
          }

          const isValid = await compare(credentials.password, user[0].password);
          
          if (!isValid) {
            throw new Error("Contraseña incorrecta");
          }

          return {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
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
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        // Generar token para localStorage usando bcrypt
        const tokenData = (session.user.name || '') + Date.now();
        const localStorageToken = await hash(tokenData, 10);
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        const expirationDate = new Date(Date.now() + oneMonth);
        
        // Guardar token en la base de datos
        await sql(
          'INSERT INTO users_token (user_id, token, expiration_date) VALUES ($1, $2, $3)',
          [token.id, localStorageToken, expirationDate]
        );
        
        session.user.token = localStorageToken;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
