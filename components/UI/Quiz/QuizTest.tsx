"use client";
import { useEffect, useState } from "react";

type Quiz = {
  id: number;
  title: string;
  theme: {
    id: string;
    name: string;
  };
  asign_accountType: 'pro' | 'perso' | 'fusion';
  grp_category: 'freemium' | 'premium';
};

type TestCase = {
  description: string;
  accountType: 'pro' | 'perso' | 'fusion';
  hasPremiumAccess: boolean;
};

const testCases: TestCase[] = [
  { description: "Case 1: pro account with active subscription", accountType: "pro", hasPremiumAccess: true },
  { description: "Case 2: pro account without subscription", accountType: "pro", hasPremiumAccess: false },
  { description: "Case 3: perso account with active subscription", accountType: "perso", hasPremiumAccess: true },
  { description: "Case 4: perso account without subscription", accountType: "perso", hasPremiumAccess: false },
  { description: "Case 5: fusion account with subscription", accountType: "fusion", hasPremiumAccess: true },
  { description: "Case 6: fusion account without subscription", accountType: "fusion", hasPremiumAccess: false },
];

export default function QuizTest() {
  const [results, setResults] = useState<{ [key: string]: Quiz[] }>({});

  useEffect(() => {
    testCases.forEach(({ description, accountType, hasPremiumAccess }) => {
      const url = `/api/user/quizzes?accountType=${accountType}&souscription=${hasPremiumAccess}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setResults((prevResults) => ({
            ...prevResults,
            [description]: data.quizzes,
          }));
        })
        .catch((error) => {
          console.error(`Error fetching quizzes for ${description}:`, error);
        });
    });
  }, []);

  return (
    <div>
      <h2>Quiz Access Testing Scenarios:</h2>
      {testCases.map(({ description }, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{description}</h3>
          <ul>
            {results[description]?.map((quiz) => (
              <li key={quiz.id}>
                {quiz.title} - {quiz.theme.name} ({quiz.grp_category})
              </li>
            )) || <p>Loading...</p>}
          </ul>
        </div>
      ))}
    </div>
  );
}
