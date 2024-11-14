"use client";

import { useState } from 'react';
import { z } from 'zod';
import { QuizSchema } from "@/models/quizSchema";
import { AnswerSchema } from "@/models/quizSchema";

// 2 ways of zod validation
// type QuizData = z.infer<typeof QuizSchema>; // Manque id dans le schéma -> warning
type QuizData = {
    id: number;
    title: string;
    theme: { name: string };
    accessType: 'freemium' | 'premium';
    accountTypes: 'fusion' | 'personnel' | 'professionel' // use filter with user account type
    status: 'en cours' | 'publie' | 'terminé';
    questions: {
      id: number;
      questionText: string;
      options: string[];
      allowMultiple: boolean;
      correctAnswers: number[];
    }[];
  };
type User = {
    hasActiveSubscription: boolean;
    accountType: 'personel' | 'professionel' | 'fusion';
};

export default function QuizPlay({ quizData, user }: { quizData: QuizData; user: User }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [notification, setNotification] = useState<string | null>(null);

    // Vérifie si le quiz est accessible
    // Filtre par type de compte ici? check les autres components code
    const isAccessible = () => {
        if (quizData.status !== 'publie') return false;
        if (quizData.accessType === 'freemium') return true;
        return quizData.accessType === 'premium' && user.hasActiveSubscription;
    };

    if (!isAccessible()) {
        return <div>Accès restreint : ce quiz est réservé aux utilisateurs premium ou ayant un compte éligible.</div>;
    }

    // Schéma Zod pour valider les réponses utilisateur
  const answerSchema = z.array(z.number()).min(1);

  const handleAnswerSubmit = async (selectedOptions: number[]) => {
    const currentQuestion = quizData.questions[currentQuestionIndex];

    // Validation des réponses utilisateur avec Zod
    try {
      answerSchema.parse(selectedOptions);
    } catch (e) {
      setNotification('Veuillez sélectionner une option valide.');
      return;
    }

    // Envoie de la réponse au serveur pour vérification
    const response = await fetch('/api/quiz/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId: quizData.id,
        questionId: currentQuestion.id,
        selectedOptions,
      }),
    });

    const result = await response.json();
    if (result.status === 'success') {
      setNotification(result.message);
      if (result.message === 'Bonne réponse !') {
        setScore(score + 1);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Erreur : ' + result.message);
    }
  };


    if (currentQuestionIndex >= quizData.questions.length) {
        return <div>Quiz terminé! Score : {score} / {quizData.questions.length}</div>;
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
        <div>
            <h2>{quizData.title} ({quizData.theme.name})</h2>
            <p>Question {currentQuestionIndex + 1} / {quizData.questions.length}</p>
            <h3>{currentQuestion.questionText}</h3>
            <ul>
                {currentQuestion.options.map((option, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type={currentQuestion.allowMultiple ? 'checkbox' : 'radio'}
                                name="options"
                                value={index}
                                onChange={() => handleAnswerSubmit([index])}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
            <progress value={currentQuestionIndex} max={quizData.questions.length}></progress>
            {notification && <p>{notification}</p>}
        </div>
    );
}
