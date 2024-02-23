import { NextAuthRequest } from 'next-auth/lib';

import { apiFailure, apiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { ApiHandler, HttpStatusCode } from '@myex/types/api';
import { User } from '@prisma/client';

export const GET = auth(async (req: NextAuthRequest) => {
  // @todo still need to figure out how to check if user is authenticated
  // if (!req.auth?.user?.isAdmin) {
  //   return apiFailure(HttpStatusCode.Unauthorized);
  // }

  const users: User[] = await prisma.user.findMany({});
  return apiSuccess<User[]>(users);
}) as ApiHandler<User[]>;

export const POST = auth(async (req: NextAuthRequest) => {
  const user = req.auth?.user;

  if (!user || !user.email) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const { username } = await req.json();
  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email: user.email || '',
    },
  });

  if (existingUserWithEmail) {
    return apiFailure(
      HttpStatusCode.UnprocessableEntity,
      `Email ${user.email} has been registered.`,
    );
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      name: user.name || '',
      email: user.email || '',
      image: user.image || '',
      isAdmin: user.email === process.env.ADMIN_EMAIL,
      provider: user.image ? (user.image.includes('googleusercontent') ? 'google' : 'github') : '',
    },
  });

  return apiSuccess<User>(newUser);
}) as ApiHandler<User>;
