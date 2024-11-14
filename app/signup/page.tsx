import SignUpForm from "@/components/SignUp/signUpForm"; // Import du composant client
import { Suspense } from "react";

export default function SignUp(){
    return (
        <Suspense>
            <SignUpForm />
        </Suspense>
    );
}