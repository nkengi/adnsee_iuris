import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const quizzes = await sql`
    SELECT id, title, theme, accessType, status 
    FROM quizz  -- Correct table name here
    WHERE accessType IN ('freemium', 'premium')`;  // Example access filter
  
  return NextResponse.json({ quizzes });
}
