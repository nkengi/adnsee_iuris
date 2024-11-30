import type { NextAuthConfig } from 'next-auth';
// import { queryDatabase } from './db/lib/pgDb';
 
export const authConfig = {
  pages: {
    signIn: '/signin', // specifie routes for signin
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // User type of Auth file for Session!
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log(`auth.config: auth object:\n${auth}`);
        return Response.redirect(new URL(`/dashboard/fusion`, nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;