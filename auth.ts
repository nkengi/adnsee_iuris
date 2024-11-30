import NextAuth, { CredentialsSignin } from "next-auth"
import { authConfig } from './auth.config';
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import mongoDbClient from "./db/lib/mongoDb"
// import PostgresAdapter from "@auth/pg-adapter"
// import { Pool } from 'pg';
import { queryDatabase } from "@/db/lib/pgDb"
import { sql } from '@vercel/postgres';
import Credentials from "next-auth/providers/credentials"
import { z,ZodError } from 'zod';
import bcrypt from 'bcrypt';
// import { useRouter } from 'next/navigation';

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
import { object, string } from "zod";

export const signInSchema = object({
  usernameOrMail: string({ required_error: "Username or Email is required" })
    .min(1, "Username or Email is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_.-]+$/.test(value),
      {
        message: "Must be a valid email or username",
      }
    ),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});


export type User = {
  id: string; // Ajoutez cet identifiant unique
  username: string;
  mail: string;
  password: string;
  // accountType: "perso" | "pro" | "fusion";
};


async function getUser(usernameOrMail: string): Promise<User | null> {
  try {
    const user = await queryDatabase(
      `SELECT * FROM users WHERE mail = $1 OR username = $1 LIMIT 1`,
      [usernameOrMail]
    );
    return user[0];
  } catch (error) {
    console.error('Auth.ts - Failed to fetch username or mail:', error);
    throw new Error('Auth.js - Failed to fetch user.');
  }
}

// Your own logic for dealing with plaintext password strings; be careful!

// *DO NOT* create a `Pool` here, outside the request handler.
// Neon's Postgres cannot keep a pool alive between requests. #1
// const postgresConfig = {
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// }
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        usernameOrMail: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // try {
          // const pool = new Pool(postgresConfig);
        if (!credentials) return null;

        const parsedCredentials = await signInSchema.safeParse(credentials);

        console.log(`auth.ts usernameOrMail and password entrées:\n${JSON.stringify(parsedCredentials)}`);

        if (!parsedCredentials.success) {
          console.log("Invalid credentials format");
          return null;
        }

        const { usernameOrMail, password } = parsedCredentials.data;

        const user = await getUser(usernameOrMail);
        if (!user) {
          console.log("User not found");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          console.log("Password mismatch");
          return null;
        }

        console.log(`Auth.ts retrieved user info:\n${JSON.stringify(user)}`);
        return {
          ...user,
          id: user.username, // Assuming `username` acts as the unique ID
        };
        // } catch (error) {
        //   if (error instanceof ZodError) {
        //     // Return `null` to indicate that the credentials are invalid
        //     return null
        //   }
        // }
      },
    }),
  ],
});