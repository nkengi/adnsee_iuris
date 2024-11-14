// middleware.js
// import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware() {
    const session = await auth();

    if (session?.user) {
        // const accountType = session.user.typeAccount;
        // return NextResponse.redirect(`/${accountType}/dashboard`);
        alert(`AuthUer middleware component \n
        Session User existante:\n 
        ${JSON.stringify(session)}`);   
    }

    //   return NextResponse.next();
}
