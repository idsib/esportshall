import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare, hash } from "bcrypt";
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

// Función para generar un ID compatible usando bcrypt
async function generateCompatibleId(googleId: string): Promise<string> {
  const saltRounds = 10;
  const hashedId = await hash(googleId, saltRounds);
  // Tomamos los primeros 16 caracteres del hash
  return hashedId.substring(0, 16);
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      token?: string;
      localStorageScript?: string;
    }
  }
}

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && user) {
        try {
          // Verificar si el usuario ya existe
          const existingUser = await sql('SELECT * FROM users WHERE email = $1', [user.email]);
          
          if (existingUser.length === 0) {
            // Generar un ID compatible usando bcrypt
            const compatibleId = await generateCompatibleId(user.id);
            
            // Crear nuevo usuario si no existe
            await sql(
              'INSERT INTO users (id, email, name, image) VALUES ($1, $2, $3, $4)',
              [compatibleId, user.email, user.name, user.image]
            );
            
            // Actualizar el token con el nuevo ID
            token.id = compatibleId;
          } else {
            // Si el usuario existe, usar su ID existente
            token.id = existingUser[0].id;
          }
        } catch (error) {
          console.error('Error en jwt callback:', error);
        }
      } else if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        
        // Generar token manual usando bcrypt
        const tokenData = `${session.user.email}-${Date.now()}`;
        const manualToken = await hash(tokenData, 10);
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        const expirationDate = new Date(Date.now() + oneMonth);
        
        try {
          // Verificar si ya existe un token para este usuario
          const existingToken = await sql('SELECT * FROM users_token WHERE user_id = $1', [token.id]);
          
          if (existingToken.length > 0) {
            // Actualizar token existente
            await sql(
              'UPDATE users_token SET token = $1, expiration_date = $2 WHERE user_id = $3',
              [manualToken, expirationDate, token.id]
            );
          } else {
            // Crear nuevo token
            await sql(
              'INSERT INTO users_token (user_id, token, expiration_date) VALUES ($1, $2, $3)',
              [token.id, manualToken, expirationDate]
            );
          }
          
          // Asignar el token manual a la sesión
          session.user.token = manualToken;
          
          // Añadir script para guardar en localStorage (se ejecutará en el cliente)
                                       session.user.localStorageScript = `
            localStorage.setItem('auth_token', '${manualToken}');
            localStorage.setItem('user_id', '${token.id}');
            localStorage.setItem('user_email', '${session.user.email}');
            localStorage.setItem('user_name', '${session.user.name}');
            localStorage.setItem('token_expiry', '${expirationDate.toISOString()}');
          `;
        } catch (error) {
          console.error('Error al guardar token:', error);
        }
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
