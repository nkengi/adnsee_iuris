import { signIn } from "@/auth"
 
interface SignInButtonProps {
    theme: string; // Thème passé comme prop
  }
// interface FormD {}
  
  export function SignInButton({ theme }: SignInButtonProps) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn(); // Appelle la fonction d'authentification
        }}
      >
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
    );
  }

  export function SignUpButton({ theme }: SignInButtonProps) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("credentials", FormData); // Appelle la fonction d'authentification
        }}
      >
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
    );
  }
  