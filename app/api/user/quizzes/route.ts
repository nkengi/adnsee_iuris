// /app/api/user/quizzes/route.ts
import { NextResponse } from "next/server";
import { queryDatabase } from '@/db/db';

// Tableau de quizzes
const quizzes = [
  {
    id: 1,
    title: "General Knowledge Quiz",
    theme: { id: "1", name: "General Knowledge" },
    asign_accountType: "perso", // Catégorie perso
    grp_category: "freemium", // Accès Freemium
    questions: [
      {
        id: 1,
        questionText: "Which of the following are programming languages?",
        options: ["A) Python", "B) Java", "C) HTML", "D) 3D Modeling"],
        correctAnswer: ["A", "B"],
        allowMultiple: true,
      },
    ],
  },
  {
    id: 2,
    title: "Math Quiz",
    theme: { id: "2", name: "Math" },
    asign_accountType: "pro", // Catégorie pro
    grp_category: "premium", // Accès Premium
    questions: [
      {
        id: 2,
        questionText: "What is 5 + 3?",
        options: ["A) 5", "B) 8", "C) 10", "D) 7"],
        correctAnswer: ["B"],
        allowMultiple: false,
      },
    ],
  },
  {
    id: 3,
    title: "Geography Quiz",
    theme: { id: "3", name: "Geography" },
    asign_accountType: "perso", // Catégorie perso
    grp_category: "freemium", // Accès Freemium
    questions: [
      {
        id: 3,
        questionText: "Which is the largest continent by area?",
        options: ["A) Africa", "B) Asia", "C) Europe", "D) Antarctica"],
        correctAnswer: ["B"],
        allowMultiple: false,
      },
    ],
  },
  {
    id: 4,
    title: "History Quiz",
    theme: { id: "4", name: "History" },
    asign_accountType: "pro", // Catégorie pro
    grp_category: "premium", // Accès Premium
    questions: [
      {
        id: 4,
        questionText: "Which of the following were World War II combatants?",
        options: ["A) Germany", "B) Japan", "C) Australia", "D) Canada"],
        correctAnswer: ["A", "B"],
        allowMultiple: true,
      },
    ],
  },
  {
    id: 5,
    title: "Art Quiz",
    theme: { id: "5", name: "Art" },
    asign_accountType: "fusion", // Catégorie fusion
    grp_category: "premium", // Accès Freemium
    questions: [
      {
        id: 5,
        questionText: "Who painted the Mona Lisa?",
        options: ["A) Vincent van Gogh", "B) Leonardo da Vinci", "C) Pablo Picasso", "D) Claude Monet"],
        correctAnswer: ["B"],
        allowMultiple: false,
      },
    ],
  },
  {
    id: 6,
    title: "Science Quiz",
    theme: { id: "6", name: "Science" },
    asign_accountType: "fusion", // Catégorie fusion
    grp_category: "freemium", // Accès Freemium
    questions: [
      {
        id: 6,
        questionText: "What is the chemical symbol for water?",
        options: ["A) O2", "B) H2O", "C) CO2", "D) H2"],
        correctAnswer: ["B"],
        allowMultiple: false,
      },
    ],
  },
  {
    id: 7,
    title: "Literature Quiz",
    theme: { id: "7", name: "Literature" },
    asign_accountType: "perso",
    grp_category: "premium",
    questions: [
      {
        id: 7,
        questionText: "Who wrote 'Pride and Prejudice'?",
        options: ["A) Emily Brontë", "B) Jane Austen", "C) Charles Dickens", "D) William Shakespeare"],
        correctAnswer: ["B"],
        allowMultiple: false,
      },
      {
        id: 8,
        questionText: "In which year was 'Moby Dick' published?",
        options: ["A) 1851", "B) 1860", "C) 1870", "D) 1845"],
        correctAnswer: ["A"],
        allowMultiple: false,
      },
    ],
  },
  {
    id: 8,
    title: "Health and Wellness Quiz",
    theme: { id: "8", name: "Health and Wellness" },
    asign_accountType: "perso",
    grp_category: "premium",
    questions: [
      {
        id: 9,
        questionText: "What is the recommended daily water intake for an adult?",
        options: ["A) 1 liter", "B) 2 liters", "C) 3 liters", "D) 4 liters"],
        correctAnswer: ["B"],
        allowMultiple: false,
      },
      {
        id: 10,
        questionText: "Which vitamin is known as the sunshine vitamin?",
        options: ["A) Vitamin A", "B) Vitamin B", "C) Vitamin C", "D) Vitamin D"],
        correctAnswer: ["D"],
        allowMultiple: false,
      },
    ],
  },
  
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const accountType = url.searchParams.get("accountType") as 'professionel' | 'personel' | 'fusion';
  const hasPremiumAccess = url.searchParams.get("souscription") === "true";

  // Filter quizzes based on account type and subscription status
  const filteredQuizzes = quizzes.filter((quiz) => {
    if (quiz.grp_category === "freemium") {
      // All accounts get access to freemium quizzes for their type or "fusion"
      return quiz.asign_accountType === accountType || quiz.asign_accountType === "fusion";
    }
    if (quiz.grp_category === "premium" && hasPremiumAccess) {
      // Premium quizzes are accessible based on account type with a subscription
      return accountType === "fusion" || quiz.asign_accountType === accountType;
    }
    return false;
  });

  return NextResponse.json({ quizzes: filteredQuizzes });
}