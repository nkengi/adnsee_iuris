// app/api/quiz/answer/route.js
import { z } from 'zod';
import { AnswerSchema } from '@/models/quizSchema';

export async function POST(req) {
  const body = await req.json();

  try {
    const validatedData = AnswerSchema.parse(body);
    const { quizId, questionId, selectedOptions } = validatedData;

    // Récupération des informations du quiz et de la question
    // (exemple d'une base de données ou d'un fichier statique)
    const question = await fetchQuestionFromDatabase(quizId, questionId);

    // Vérification de la réponse
    const isCorrect = question.correctAnswer.every((answer) =>
      selectedOptions.includes(answer)
    );

    return new Response(
      JSON.stringify({
        status: 'success',
        message: isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse.',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ status: 'error', message: error.errors }), {
      status: 400,
    });
  }
}
