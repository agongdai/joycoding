'use server';
import { User } from '@prisma/client';

export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/users`, { method: 'GET' });
    const json = await res.json();
    console.log('json', json);
    return json?.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
