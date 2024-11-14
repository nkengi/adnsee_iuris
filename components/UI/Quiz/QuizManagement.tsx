"use client"
import { useState } from "react";
import { QuizSchema } from "@/models/quizSchema";
import { z } from "zod";

// Define the TypeScript type for the quiz data based on QuizSchema
// type QuizData = z.infer<typeof QuizSchema>;


// Define the structure of a question
type Question = {
  questionText: string;
  options: string[];
  correctAnswer: number[]; // Array of indexes to support multiple correct answers
  allowMultiple?: boolean;
};

// Define the Quiz data structure based on your table schema
type QuizData = {
  title: string;
  theme: { id: string; name: string };
  accessType: 'freemium' | 'premium';
  accountTypes: string[]; // List of account types
  status: 'en cours' | 'publie' | 'fini';
  questions: Question[];
  createdBy: number;
};

export default function QuizManagement() {
  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    theme: { id: "", name: "" },
    accessType: "freemium",
    accountTypes: [],
    status: "en cours",
    questions: [],
    createdBy: 1, // Default user ID, adjust as needed
  });
  const [errors, setErrors] = useState<any>({}); // Gestion des messages d'erreurs à afficher au user.


  console.log(quizData);
  

  const toggleAccountType = (type: string) => {
    setQuizData((prevData) => {
      const newAccountTypes = prevData.accountTypes.includes(type)
        ? prevData.accountTypes.filter((t) => t !== type)
        : [...prevData.accountTypes, type];

      return { ...prevData, accountTypes: newAccountTypes };
    });
  };


  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { questionText: "", options: [], correctAnswer: [] },
      ],
    });
  };

  const handleDeleteQuestion = (index: number) => {
    setQuizData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((_, i) => i !== index),
    }));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string | string[] | boolean | number[]) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };



  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(`Quiz Data being sent:\n`, quizData);
  
      const response = await fetch("/api/admin/quizzes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
  
      const result = await response.text(); // Read the response as text first
      console.log("Log & Read the response as raw text response to check what it contains"); // Log the raw response to check what it contains
      console.log(result); // Log the raw response to check what it contains

      // Gestion des erreur a check pour affichage user sous les éléments form
      // if (response.ok) {
      //   const jsonResult = JSON.parse(result); // Parse it manually
      //   alert(`Quiz created successfully \n ${JSON.stringify(jsonResult, null, 2)}`);
      // } else {
      //   throw new Error(result); // Throw an error with the response body if not OK
      // }
      if (!response.ok) {
        console.log('Error details:', result);
        throw new Error(result || 'Quiz creation failed');
      }
        const jsonResult = JSON.parse(result); // Parse it manually
        alert(`Quiz created successfully \n ${JSON.stringify(jsonResult, null, 2)}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating quiz:", error.message);
        alert("Error creating quiz: " + error.message); // Use the error message here
      } else {
        console.error("Erreur inconnue:", error);
        alert("Une Erreur inconnue s'est produit");
      }
    }
  };
  
  

  return (
    <form onSubmit={handleFormSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto text-black">
      <h2 className="text-xl font-bold">Create a New Quiz</h2>

      {/* Title */}
      <label className="block">
        <span className="text-gray-700">Title</span>
        <input
          type="text"
          value={quizData.title}
          onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Theme Name</span>
        <input
          type="text"
          value={quizData.theme.name}
          onChange={(e) => setQuizData({ ...quizData, theme: { ...quizData.theme, name: e.target.value } })}
          required
          placeholder="Theme Name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </label>

      {/* Access Type */}
      <label className="block">
        <span className="text-gray-700">Access Type</span>
        <select
          value={quizData.accessType}
          onChange={(e) => setQuizData({ ...quizData, accessType: e.target.value as 'freemium' | 'premium' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="freemium">Freemium</option>
          <option value="premium">Premium</option>
        </select>
      </label>

      {/* Account Types with checkboxes */}
      <label className="block">
        <span className="text-gray-700">Account Types</span>
        <div className="mt-1 space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={quizData.accountTypes.includes("pro")}
              onChange={() => toggleAccountType("pro")}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Pro</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={quizData.accountTypes.includes("perso")}
              onChange={() => toggleAccountType("perso")}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Perso</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={quizData.accountTypes.includes("fusion")}
              onChange={() => toggleAccountType("fusion")}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Fusion</span>
          </div>
        </div>
      </label>


      {/* Status */}
      <label className="block">
        <span className="text-gray-700">Status</span>
        <select
          value={quizData.status}
          onChange={(e) => setQuizData({ ...quizData, status: e.target.value as 'en cours' | 'publie' | 'fini' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="en cours">En cours</option>
          <option value="fini">Terminé</option>
          <option value="publie">Publié</option>

        </select>
      </label>

      {/* Questions */}
      <h3 className="text-lg font-semibold">Questions ({quizData.questions.length})</h3>
      {quizData.questions.map((question, index) => (
        <div key={index} className="space-y-2 border-b border-gray-300 py-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">Question {index + 1}</h4>
            <button
              type="button"
              onClick={() => handleDeleteQuestion(index)}
              className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
            >
              Delete
            </button>
          </div>
          <label className="block">
            <span className="text-gray-700">Question Text</span>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Options (comma-separated)</span>
            <input
              type="text"
              onChange={(e) => handleQuestionChange(index, "options", e.target.value.split(","))}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Correct Answer (comma-separated indexes)</span>
            <input
              type="text"
              onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value.split(",").map(Number))}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block flex items-center">
            <span className="text-gray-700 mr-2">Allow Multiple</span>
            <input
              type="checkbox"
              checked={question.allowMultiple || false}
              onChange={(e) => handleQuestionChange(index, "allowMultiple", e.target.checked)}
              className="rounded text-indigo-600 shadow-sm focus:ring-indigo-500"
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion} className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Add Question
      </button>

      {/* Submit Button */}
      <button type="submit" className="px-6 py-2 mt-4 bg-green-600 text-white rounded-md">
        Create Quiz
      </button>
    </form>
  );
}
