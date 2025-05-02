import type { DefaultSession, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { compare, hash } from "bcrypt"
import NextAuth from "next-auth"
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // role: UserRole;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    // role: UserRole;
    name?: string;
    email?: string;
  }
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          // role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          id: token.id as string,
          email: token.email,
          name: token.name,
          // role: token.role,
        };
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email;
        token.name = user.name;
        // token.role = user.role;
      }
      return token
    },
  },
}

export const { auth } = NextAuth(authOptions);

// Hash password
export async function hashPassword(password: string) {
  return await hash(password, 10)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}

// Register a new user
export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return user
}
