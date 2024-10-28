"use client"; // Permet d'utiliser des hooks React côté client

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Utilisé pour capturer les paramètres d'URL dans Next.js

export default function Account() {
  const searchParams = useSearchParams(); // Capture les paramètres de la query string
  const initialAccountType = searchParams.get("type") || "personel"; // Récupère le type depuis l'URL ou par défaut "personel"

  const [accountType, setAccountType] = useState<string>(initialAccountType); // State pour stocker le type d'account
  const [theme, setTheme] = useState<string>("light"); // State pour le thème

  // Change le thème en fonction du type d'account
  useEffect(() => {
    if (accountType === "personel") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [accountType]);

  // Gestionnaire pour changer le type d'account via le formulaire
  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountType(e.target.value);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>

      <form className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black" // Forcer le texte en noir
            htmlFor="accountType"
          >
            Type de Compte
          </label>
          <select
            id="accountType"
            className="w-full p-2 border border-gray-300 rounded"
            value={accountType}
            onChange={handleAccountTypeChange}
          >
            <option value="personel">Personel</option>
            <option value="professionel">Professionel</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black" // Forcer le texte en noir
            htmlFor="username"
          >
            Pseudo
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Votre pseudo"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black" // Forcer le texte en noir
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
            className="block text-sm font-bold mb-2 text-black" // Forcer le texte en noir
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
            accountType === "personel"
              ? "bg-blue-500 text-white hover:bg-blue-700"
              : "bg-green-500 text-white hover:bg-green-700"
          }`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
