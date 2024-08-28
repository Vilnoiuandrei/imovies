import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongoDB";
import { compare } from "bcryptjs";
import { use } from "react";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("ITMB");

        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (user && (await compare(credentials.password, user.password))) {
          return { id: user._id, name: user.name, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      const client = await clientPromise;
      const db = client.db("ITMB");

      if (user) {
        // Check if the user exists in the database
        let dbUser = await db
          .collection("users")
          .findOne({ email: user.email });

        // If the user doesn't exist, create a new one
        if (!dbUser) {
          const newUser = {
            name: user.name || profile?.name,
            email: user.email,
            createdAt: new Date(),
          };
          const result = await db.collection("users").insertOne(newUser);
          dbUser = { ...newUser, _id: result.insertedId };
        }

        // Store the user ID in the token
        token.userId = dbUser._id;
      } else if (token.userId) {
        // If the token already has a userId, skip database checks
        const dbUser = await db
          .collection("users")
          .findOne({ _id: token.userId });

        // Ensure the user still exists in the database
        if (!dbUser) {
          token.userId = null; // Invalidate token if the user was deleted
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
