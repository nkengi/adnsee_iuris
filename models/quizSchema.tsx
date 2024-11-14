// models/quizSchmal.ts
import { z } from 'zod';

export const QuizSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    theme: z.string(),
    accessType: z.enum(['freemium', 'premium']), // Différencie les types d'accès pour les quizz
    accountTypes: z.array(z.enum(['personel', 'professionel', 'fusion'])), // Spécifie les comptes ayant accès
    status: z.enum(['en_cours', 'publie', 'termine']).default('en_cours'), // Cycle de vie du quiz
    questions: z.array(
        z.object({
            id: z.number().optional(),
            questionText: z.string(),
            options: z.array(z.string()),
            correctAnswers: z.array(z.number()),
            allowMultiple: z.boolean(),
        })
    ),
});


export const AnswerSchema = z.object({
  quizId: z.number(),
  questionId: z.number(),
  selectedOption: z.number().int(),
});
