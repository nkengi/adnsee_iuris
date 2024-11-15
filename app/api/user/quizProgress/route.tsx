// /app/api/user/quizProgress/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { queryDatabase } from "@/db/db";

const quizProgressSchema = z.object({
  userId: z.number(),
  quizId: z.number(),
  currentQuestion: z.number().optional(),
  score: z.number().optional(),
  completed: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId, quizId, currentQuestion = 1, score = 0, completed = false } = quizProgressSchema.parse(await req.json());

    const result = await queryDatabase(
      `INSERT INTO user_quiz_progress (user_id, quiz_id, current_question, score, completed)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, quiz_id) DO UPDATE 
       SET current_question = $3, score = $4, completed = $5, last_updated = NOW()
       RETURNING *`,
      [userId, quizId, currentQuestion, score, completed]
    );

    return NextResponse.json({ status: "success", data: result[0] });
  } catch (error) {
    const errorMessage = error instanceof Error? error.message : "Erreur inconnue";
    return NextResponse.json({ status: "error", message: errorMessage });
  }
}
