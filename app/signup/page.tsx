import Account from "@/components/SignUp/account"; // Import du composant client
import { Suspense } from "react";

export default function SignUp(){
    return (
        <Suspense>
            <Account />
        </Suspense>
    );
}