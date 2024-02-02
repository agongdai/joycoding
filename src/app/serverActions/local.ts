'use server';
import { User } from 'next-auth';

export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/users`, { method: 'GET' });
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
