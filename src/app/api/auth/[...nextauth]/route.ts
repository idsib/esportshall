import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/',
        error: '/auth/error',
    },
    callbacks: {
        async session({ session, token, user }) {
            return session
        },
        async jwt({ token, user, account, profile }) {
            return token
        }
    }
})

export { handler as GET, handler as POST } 