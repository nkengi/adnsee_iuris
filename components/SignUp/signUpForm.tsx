"use client"; // Active les hooks React côté client

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Récupère les paramètres d'URL
import { z } from "zod"; // Importation de Zod pour la validation
import { useRouter } from 'next/navigation';

// Schéma de validation Zod pour le formulaire
const userSchema = z.object({
  username: z.string().min(3, "Le pseudo doit contenir au moins 3 caractères."),
  mail: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  accountType: z.enum(["perso", "pro"]),
});

export default function SignUpForm() {
  const [error, setError] = useState<String | null>(null); // Gestion des messages texte d'erreurs au user.
  const [errors, setErrors] = useState<any>({}); // Gestion des messages d'erreurs à afficher au user.
  const searchParams = useSearchParams();
  const initialAccountType = searchParams.get("type") || "perso"; // Type d'account par défaut "personel"
  const [accountType, setAccountType] = useState<string>(initialAccountType); // Gère le type d'account
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    mail: "",
    password: "",
    accountType: accountType,
  });


  const [theme, setTheme] = useState<string>("light"); // Gère le thème clair/sombre

  // Ajuste le thème en fonction du type d'account sélectionné
  useEffect(() => {
    setTheme(accountType === "perso" ? "light" : "dark");
  }, [accountType]); // accountType modifié reload cette fn useEffect pou changer de thème.

  // Change le type d'account via la sélection
  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountType(e.target.value);
    setFormData({ ...formData, accountType: e.target.value });
  };

  // Prend les infos des inputs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation du formulaire avant la soumission
  const validateForm = () => {
    try {
      userSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: any = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Si la validation échoue, ne pas soumettre
    console.log(formData);
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),

      });
      const result = await response.json();
      if (result.success) {
        alert("Inscription réussie !");
        router.push(`/dashboard/${result.accountType}`);
      } else {
        setErrors({ ...errors, submit: result.error });
      }
    } catch (error) {
      setErrors({ ...errors, submit: "Une erreur s'est produite lors de l'inscription." });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
    >
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>

      <form onSubmit={handleSignUp} className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
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
            name="accountType"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={accountType}
            onChange={handleAccountTypeChange}
          >
            <option value="perso">Personel</option>
            <option value="pro">Professionel</option>
          </select>
          {errors.accountType && <p className="text-red-500 text-xs">{errors.accountType}</p>}
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="on"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Choose username"
            value={formData.username}
            onChange={handleChange}
            minLength={3}
            required
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}

        </div>

        {/* Mail */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="mail">
            Mail
          </label>
          <input
            id="mail"
            type="email"
            name="mail"
            autoComplete="on"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your mail"
            value={formData.mail}
            onChange={handleChange}
            required
            maxLength={32}
          />
          {errors.mail && <p className="text-red-500 text-xs">{errors.mail}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="on"
            className="w-full p-2 border text-black border-gray-300 rounded"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            maxLength={32}
            required
            
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        {/* Bouton Sign Up */}
        <button
          type="submit"
          className={`w-full py-2 px-4 font-bold rounded ${accountType === "personel"
              ? "bg-blue-500 text-white hover:bg-blue-700"
              : "bg-green-500 text-white hover:bg-green-700"
            }`}
        >
          Sign Up
        </button>
        {errors.submit && <p className="text-red-500 text-xs mt-2">{errors.submit}</p>}
      </form>
    </div>
  );
}
