// /app/api/auth/signin/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // Connexion à la base de données
import { z } from 'zod';
import bcrypt from 'bcrypt';

// Schéma de validation pour les données de connexion
const signinSchema = z.object({
  usernameOrMail: z.string().min(3, 'Le pseudo ou email est requis'),
  password: z.string().min(8, 'Le mot de passe doit être d\'au moins 8 caractères'),
});

export async function POST(request: Request) {
  const { usernameOrMail, password } = await request.json();

  // Validation des données d'entrée
  try {
    signinSchema.parse({ usernameOrMail, password });

    // Recherche de l'utilisateur en fonction du pseudo ou de l'email
    const user = await sql`
      SELECT * FROM users WHERE mail = ${usernameOrMail} OR username = ${usernameOrMail}
    `;

    if (user.rowCount === 0) {
      return NextResponse.json({ success: false, error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const userData = user.rows[0];

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, userData.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: 'Mot de passe incorrect' }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Une erreur inconnue est survenue.' }, { status: 500 });
  }
}
