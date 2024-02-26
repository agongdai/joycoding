'use server';
import { apiFailure, apiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { IFormNewUser } from '@myex/types/user';
import { User } from '@prisma/client';

export async function fetchUsers(): Promise<User[]> {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return [];
  }

  return prisma.user.findMany({});
}

export async function createUser({ username }: IFormNewUser) {
  const session = await auth();
  if (!session?.user?.email) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (existingUserWithEmail) {
    return apiFailure(HttpStatusCode.Conflict, `Email ${session.user.email} has been registered.`);
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      name: session.user.name || '',
      email: session.user.email || '',
      image: session.user.image || '',
      isAdmin: session.user.email === process.env.ADMIN_EMAIL,
      provider: session.user.image
        ? session.user.image.includes('googleusercontent')
          ? 'google'
          : 'github'
        : '',
    },
  });

  return apiSuccess<User>(newUser);
}
