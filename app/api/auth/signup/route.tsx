// app/api/auth/signup/route.js
import { NextRequest, NextResponse } from 'next/server';

// import { userSchema } from "@/schemas/userSchema";
import bcrypt from "bcrypt";
import { queryDatabase } from '@/db/db';
import { sql } from '@vercel/postgres';
import { z } from "zod";


// Schéma de validation Zod
const userSchema = z.object({
    username: z.string().min(3, "Le pseudo doit contenir au moins 3 caractères."),
    mail: z.string().email("Email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    accountType: z.enum(["personel", "professionel"]),
});

export async function POST(request: NextRequest) {
    const { username, email, password, accountType } = await request.json();
    try {
        const body = await request.json();
        const validatedData = userSchema.parse(body); // Zod validation

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        // Insertion dans la base de données avec @pg
        const result = await queryDatabase(
            `INSERT INTO quiz (username, mail, password,accountTypes)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [
                validatedData.username,
                validatedData.mail,
                hashedPassword,
                validatedData.accountType,
            ]
        );

        // Insertion dans la base de données avec @vercel/postgres
        await sql`
      INSERT INTO users (username, email, password_hash, typeAccount)
      VALUES (${validatedData.username}, ${validatedData.mail}, ${hashedPassword}, ${validatedData.accountType})
    `;

        return NextResponse.json({ success: true });
    } catch (error) {
        // Gestion des erreurs de validation
        if (error instanceof z.ZodError) {
            // Erreur utilisateur
            return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
        }
        // Erreur Server?
        return NextResponse.json({ success: false, error: "Une erreur inconnue est survenue." }, { status: 500 });
    }
}
