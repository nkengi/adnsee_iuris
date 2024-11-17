import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { queryDatabase } from "@/db/db";
import { z } from "zod";

// Schema validation with Zod
const userSchema = z.object({
  username: z.string().min(3, "Le pseudo doit contenir au moins 3 caractères."),
  mail: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  accountType: z.enum(["perso", "pro"]),
});

export async function POST(request:NextRequest) {
  try {
    // Parse and validate request body
    const { username, mail, password, accountType } = userSchema.parse(await request.json());

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const result = await queryDatabase(
      `
      INSERT INTO users (username, mail, password_hash, type_account, account_status, subscription_status, created_at)
      VALUES ($1, $2, $3, $4, true, false, NOW())
      RETURNING id, type_account;
      `,
      [username, mail, hashedPassword, accountType]
    );

    // Send success response
    return NextResponse.json({
      success: true,
      userId: result[0].id,
      accountType: result[0].type_account,
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
