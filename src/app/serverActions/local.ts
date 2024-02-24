'use server';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { User } from '@prisma/client';

export async function fetchUsers(): Promise<User[]> {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return [];
  }

  return prisma.user.findMany({});
}
