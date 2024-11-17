"use client"; // Obligatoire pour utiliser des hooks côté client

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { z } from "zod"; // Importation de Zod pour la validation

// Schéma de validation pour les données de connexion
const signinSchema = z.object({
  usernameOrMail: z.string().min(3, 'Username or mail est required.'),
  password: z.string().min(8, 'Password need 8 caracter min.'),
});

export default function SignInForm() {
  const [theme, setTheme] = useState<string>("light"); // Gestion du thème clair ou sombre
  const [usernameOrMail, setusernameOrMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<String | null>(null); // Gestion des messages texte d'erreurs au user.
  const [errors, setErrors] = useState<any>({}); // Gestion des messages d'erreurs à afficher au user.
  const router = useRouter();
  const [formData, setFormData] = useState({
    usernameOrMail: "",
    password: "",
  });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Prend les infos des inputs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation du formulaire avant la soumission
  const validateForm = () => {
    try {
      signinSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: any = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        // console.log(newErrors);

        setErrors(newErrors);
        console.log(`errors validation fn:\n${JSON.stringify(errors)}`);


      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Si la validation échoue, ne pas soumettre
    console.log(`formData:\n${formData}`);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),

      });
      const result = await response.json();
      if (result.success) {
        console.log(`handleSignIn result sucess:\n${JSON.stringify(result)}`);


        alert("Login succeeded!");
        router.push(`/dashboard/${result.user.type_account}`);
      } else {
        setErrors({ ...errors, submit: result.error });
        console.log(`handleSignIn fn errors:\n${JSON.stringify(errors)}`);

      }
    } catch (error) {
      setErrors({ ...errors, submit: "Une erreur s'est produite lors du login." });
    }
    console.log(`errors:\n${JSON.stringify(errors)}`);

  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
    >
      <h1 className="text-4xl font-bold mb-8">Sign In</h1>

      <form onSubmit={handleSignIn} className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black"
            htmlFor="usernameOrMail"
          >
            Username or E-mail
          </label>
          <input
            id="usernameOrMail"
            type="text"
            name="usernameOrMail"
            autoComplete="on"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Username or mail"
            value={formData.usernameOrMail}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-xs mt-4 ">{errors.username}</p>}
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-bold mb-2 text-black"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="on"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          // Check errors type warning
          />
          {errors.password && <p className="text-red-500 text-xs mt-4">{errors.password}</p>}

        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 font-bold rounded ${theme === "light"
            ? "bg-blue-500 text-white hover:bg-blue-700"
            : "bg-green-500 text-white hover:bg-green-700"
            }`}
        >
          Sign In
        </button>
        {errors.submit && <p className="text-red-500 text-xs mt-4">{errors.submit}</p>}
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
