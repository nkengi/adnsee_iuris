"use client"; // Active les hooks React côté client

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Récupère les paramètres d'URL

export default function Account() {
  const searchParams = useSearchParams();
  const initialAccountType = searchParams.get("type") || "personel"; // Type d'account par défaut "personel"

  const [accountType, setAccountType] = useState<string>(initialAccountType); // Gère le type d'account
  const [theme, setTheme] = useState<string>("light"); // Gère le thème clair/sombre

  // Ajuste le thème en fonction du type d'account sélectionné
  useEffect(() => {
    setTheme(accountType === "personel" ? "light" : "dark");
  }, [accountType]);

  // Change le type d'account via la sélection
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
        {/* Type de Compte */}
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black" // Texte des labels fixe en noir
            htmlFor="accountType"
          >
            Type de Compte
          </label>
          <select
            id="accountType"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={accountType}
            onChange={handleAccountTypeChange}
          >
            <option value="personel">Personel</option>
            <option value="professionel">Professionel</option>
          </select>
        </div>

        {/* Pseudo */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="username">
            Pseudo
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Votre pseudo"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Votre e-mail"
          />
        </div>

        {/* Mot de Passe */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="password">
            Mot de Passe
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Votre mot de passe"
          />
        </div>

        {/* Bouton Sign Up */}
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
