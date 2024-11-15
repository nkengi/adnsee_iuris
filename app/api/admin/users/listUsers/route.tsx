// /app/api/admin/users/listUsers/route.ts
import { NextResponse } from "next/server";
import { queryDatabase } from '@/db/db';
// Example user data with different roles, access types, and status
// const users = [
//     {
//         id: 1,
//         name: "Alice Johnson",
//         email: "alice@example.com",
//         role: "admin",
//         accountType: "fusion", // Account with access to both "pro" and "perso" categories
//         subscriptionStatus: "active", // Has access to premium content
//     },
//     {
//         id: 2,
//         name: "Bob Smith",
//         email: "bob@example.com",
//         role: "user",
//         accountType: "pro", // Pro account
//         subscriptionStatus: "inactive", // Only has access to freemium content
//     },
//     {
//         id: 3,
//         name: "Charlie Evans",
//         email: "charlie@example.com",
//         role: "user",
//         accountType: "perso", // Perso account
//         subscriptionStatus: "active", // Has access to premium content
//     },
//     {
//         id: 4,
//         name: "Diana Roberts",
//         email: "diana@example.com",
//         role: "user",
//         accountType: "fusion", // Fusion account
//         subscriptionStatus: "inactive", // Only freemium access
//     },
//     {
//         id: 5,
//         name: "Evan Thompson",
//         email: "evan@example.com",
//         role: "admin",
//         accountType: "pro", // Pro account with admin role
//         subscriptionStatus: "active", // Has premium access
//     }
// ];
export async function GET() {
    try {
        // Return the user data as JSON
        const allusers = await queryDatabase(
            `SELECT u.*, COALESCE(s.current_role, 'none')
            FROM users u
            LEFT JOIN super_user s ON u.id = s.user_id;
            `
        );
        
        return NextResponse.json({ status: 'sucess', allusers });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue';
        return NextResponse.json({ status: 'error', message });
    }
}
