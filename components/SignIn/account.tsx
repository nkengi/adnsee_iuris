"use client"; // Obligatoire pour utiliser des hooks côté client

import { useState } from "react";

export default function Account() {
  const [theme, setTheme] = useState<string>("light"); // Gestion du thème clair ou sombre

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8">Sign In</h1>

      <form className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Votre e-mail"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-bold mb-2 text-black"
            htmlFor="password"
          >
            Mot de Passe
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Votre mot de passe"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 font-bold rounded ${
            theme === "light"
              ? "bg-blue-500 text-white hover:bg-blue-700"
              : "bg-green-500 text-white hover:bg-green-700"
          }`}
        >
          Sign In
        </button>
      </form>

      <button
        onClick={toggleTheme}
        className="mt-4 text-sm text-gray-600 dark:text-gray-400 underline"
      >
        Toggle Theme
      </button>
    </div>
  );
}
