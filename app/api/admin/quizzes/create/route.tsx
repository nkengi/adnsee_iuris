// app/api/quiz/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { queryDatabase } from '@/db/db';
import { QuizSchema } from '@/models/quizSchema';
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const quizData = QuizSchema.parse(body); // Validation with Zod à travers schema
    const result = await queryDatabase(
      `INSERT INTO quiz (title, theme,  accessType, accountTypes, status,questions,)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        quizData.title,
        JSON.stringify(quizData.theme),
        quizData.accessType,
        JSON.stringify(quizData.accountTypes),
        quizData.status,
        JSON.stringify(quizData.questions),

      ]
    );
    
    //Insertion avec gestion type complexe
    // const result = await sql`
    //   INSERT INTO quizz (title, theme, questions, accessType, accountTypes, status, createdBy)
    //   VALUES (
    //     ${quizData.title},
    //     ${JSON.stringify(quizData.theme)},
    //     ${JSON.stringify(quizData.questions)},
    //     ${quizData.accessType},
    //     ${JSON.stringify(quizData.accountTypes)},
    //     ${quizData.status},
    //     ${quizData.createdBy},
    //   )
    //   RETURNING *;
    // `;
    
    // const test = quizData; // simulating for testing

    // Test this config with error form send back to user.
    return NextResponse.json({ success: true, message: 'Quizz créé avec succès' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
  // This works
  //   return NextResponse.json({ status: 'success', data: result });
  // } catch (error) {
  //   const message = error instanceof Error ? error.message : 'Erreur inconnue';
  //   return NextResponse.json({ status: 'error', message });
  // }
}

