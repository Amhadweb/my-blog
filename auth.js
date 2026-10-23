import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Пароль", type: "password"},
            },
            async authorize(credentials) {
                const email = credentials.email.trim().toLowerCase();
                
                const user = await prisma.user.findUnique({
                    where: { email }
                });
                if (!user) return null;

                const ok = await bcrypt.compare(credentials.password, user.password);
                if (!ok) return null;

                return { id: user.id, email: user.email};
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user}) {
            if (user) token.id = user.id;
            return token; 
        },
        async session({ session, token }) {
            if (token.id) session.user.id = token.id; 
            return session;
        }
    }
})