import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { login } from "../../../(services)/loginService";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password",
          type: "text",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await login({
            username: credentials?.email,
            password: credentials?.password,
          });

          if (!response) {
            throw new Error("Invalid credentials");
          }

          return response;
        } catch (error) {}
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
      }
      return session;
    },
  },
};
