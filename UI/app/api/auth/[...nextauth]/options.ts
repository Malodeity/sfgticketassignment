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
        username: {
          label: "username",
          type: "text",
          placeholder: "your-username",
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
            username: credentials?.username,
            password: credentials?.password,
          });

          if (!response) {
            throw new Error("Invalid credentials");
          }

          return response;
          //return await { id: 1, name: "John Doe", email: 'john@doe.com' };
        } catch (error) {
          return null;
        }
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
