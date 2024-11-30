"use server"
import { signIn } from "@/auth"
import { AuthError } from 'next-auth';

export async function serverSignIn(formData:{}){
  await signIn("Credentials", formData);
};
// interface forme{};
export async function authenticate(
  prevState: string | undefined,
  formData:{},
) {
  try {
  await signIn("Credentials",formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'signInSever: Invalid credentials.';
        default:
          return 'signInSever: Something went wrong.';
      }
    }
    throw error;
  }
}