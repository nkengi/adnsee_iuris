// middleware.js
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware() {
    const session = await auth();

    if (session?.user) {
        const accountType = session.user.id;
        
        alert(`AuthUer middleware component \n
        Session User existante:\n 
        ${JSON.stringify(session)}`);

        // find user details for type_account
        // return NextResponse.redirect(`/dashbord/${type_account}`);  
    }

      return NextResponse.next();
}
