'use server';
import { signIn, signOut } from '@myex/auth';

export async function authSignIn() {
  await signIn();
}

export async function authSignOut() {
  await signOut();
}
