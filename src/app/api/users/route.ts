/**
 * @note Restful endpoints are not used right now. Replaced by server actions.
 * Keep this file for reference only.
 */

import { NextAuthRequest } from 'next-auth/lib';

import { restApiFailure, restApiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { ApiHandler, HttpStatusCode } from '@myex/types/api';
import { User } from '@prisma/client';

export const GET = auth(async (req: NextAuthRequest) => {
  if (!req.auth?.user?.isAdmin) {
    return restApiFailure(HttpStatusCode.Unauthorized);
  }

  const users: User[] = await prisma.user.findMany({});
  return restApiSuccess<User[]>(users);
}) as ApiHandler<User[]>;

export const POST = auth(async (req: NextAuthRequest) => {
  const user = req.auth?.user;

  if (!user || !user.email) {
    return restApiFailure(HttpStatusCode.Unauthorized);
  }

  const { username } = await req.json();
  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email: user.email || '',
    },
  });

  if (existingUserWithEmail) {
    return restApiFailure(
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

  return restApiSuccess<User>(newUser);
}) as ApiHandler<User>;
