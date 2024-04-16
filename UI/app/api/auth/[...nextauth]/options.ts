import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/(lib)/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
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
      async authorize(credentials, req) {
        try {
          /*const foundUser = await prisma.user.findUniqueOrThrow({
            where: {
              email: credentials?.email,
            },
          });

          if (foundUser) {
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );
            if (match) {
              delete foundUser.password;
              return foundUser;
            }
          }*/
          const response = await fetch(
            `http://localhost:50288/api/login/login`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          console.log("response:" + response);

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          return await response.json();
        } catch (error) {}
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
