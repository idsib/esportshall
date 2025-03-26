import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";

export const authOptions: AuthOptions = {
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

        // Aquí deberías agregar tu lógica de verificación de usuario
        // Por ejemplo, buscar en tu base de datos y verificar la contraseña
        
        // Este es un ejemplo básico, deberás adaptarlo a tu caso de uso
        const user = {
          id: "1",
          email: credentials.email,
          name: "Usuario de prueba"
        };

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    // Puedes personalizar otras páginas aquí
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
