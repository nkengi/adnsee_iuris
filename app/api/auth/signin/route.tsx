// /app/api/auth/signin/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // Connexion à la base de données
import { queryDatabase } from "@/db/db";

import { z } from 'zod';
import bcrypt from 'bcrypt';

// Schéma de validation pour les données de connexion
const signinSchema = z.object({
  usernameOrMail: z.string().min(3, 'Le pseudo ou email est requis'),
  password: z.string().min(8, 'Le mot de passe doit être d\'au moins 8 caractères'),
});

export async function POST(request: Request) {

  // Validation des données d'entrée
  try {
    // Parse and validate request body
    const { usernameOrMail, password } = signinSchema.parse(await request.json());
    console.log(`{ usernameOrMail, password }:\n ${JSON.stringify({ usernameOrMail, password })}`);
    

    // Recherche de l'utilisateur en fonction du pseudo ou de l'email
    // const user = await sql`
    //   SELECT * FROM users WHERE mail = ${usernameOrMail} OR username = ${usernameOrMail}
    // `;

    // const user = await queryDatabase(`SELECT * FROM users WHERE mail = $1 OR username = $1`,[usernameOrMail]);
    // Recherche de l'utilisateur
    const user = await queryDatabase(
      `SELECT * FROM users WHERE mail = $1 OR username = $1 LIMIT 1`,
      [usernameOrMail]
    );
  
    console.log(`single user:\n${JSON.stringify(user)}`);
    

    if (user.length === 0) {
      return NextResponse.json({ success: false, error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    const userData = user[0];

    // const userData = user[0];

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, userData.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: 'Mot de passe incorrect' }, { status: 401 });
    }
    console.log(`password matched`);
    

    // return NextResponse.json({ success: true, user: userData });

    // Send success response
    return NextResponse.json({
      success: true,
      user: userData
    });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }

    // Handle server errors
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Une erreur inconnue est survenue." },
      { status: 500 }
    );
  }
}
