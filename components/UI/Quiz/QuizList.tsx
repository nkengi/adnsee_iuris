"use client"
import { useEffect, useState } from "react";

type Quiz = {
  id: number;
  title: string;
  theme: {
    id: string;
    name: string;
  };
  questions: Array<{
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: string[];
    allowMultiple: boolean;
  }>;
  accessType: 'freemium' | 'premium';
  accountTypes: 'pro' | 'perso' | 'fusion';
  status: 'en cours' | 'publie' | 'fini'; // Updated status options
};

// type UserAccountType = 'pro' | 'perso' | 'fusion';

type QuizStats = {
  inProgress: number;
  completed: number;
};

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizStats, setQuizStats] = useState<QuizStats>({ inProgress: 0, completed: 0 });

  // Replace these values with actual logic or API calls in production
  // const userAccountType: UserAccountType = 'perso'; // Set default for testing
  const accountType = 'perso'; // Set default for testing
  const hasPremiumAccess = true // Simulate active subscription for testing

  useEffect(() => {
    async function fetchQuizzes() {
      const response = await fetch(`/api/user/quizzes?accountType=${accountType}&souscription=${hasPremiumAccess}`);
      const data = await response.json();
      setQuizzes(data.quizzes);
    }
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Available Quizzes: {quizzes.length}</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            {quiz.title} - {quiz.theme.name}
          </li>
        ))}
      </ul>
      <p>
        Progress: {quizStats.inProgress} in progress, {quizStats.completed} completed.
      </p>
    </div>
  );
}
