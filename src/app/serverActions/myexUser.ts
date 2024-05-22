'use server';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { IFormNewUser } from '@myex/types/user';
import { apiFailure, apiSuccess } from '@myex/utils/api';
import { User } from '@prisma/client';

export async function myexFetchUsers(): Promise<User[]> {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return [];
  }

  return prisma.user.findMany({});
}

export async function myexCreateUser({ username }: IFormNewUser) {
  const session = await auth();
  const sessionUser = session?.user;
  if (!sessionUser?.email) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email: sessionUser.email,
    },
  });

  if (existingUserWithEmail) {
    return apiFailure(HttpStatusCode.Conflict, `Email ${sessionUser.email} has been registered.`);
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      name: sessionUser.name || '',
      email: sessionUser.email || '',
      image: sessionUser.image || '',
      isAdmin: sessionUser.email === process.env.ADMIN_EMAIL,
      provider: sessionUser.image
        ? sessionUser.image.includes('googleusercontent')
          ? 'google'
          : 'github'
        : '',
    },
  });

  return apiSuccess<User>(newUser);
}
