import { NextRequest, NextResponse } from 'next/server';
import { NextAuthRequest } from 'next-auth/lib';

import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode, ResponseError } from '@myex/types/api';
import { User } from '@prisma/client';

export const GET = async (req: NextRequest, res: NextResponse) => {
  // @todo limit to admin
  // if (!req.auth?.user?.isAdmin) {
  //   return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  // }

  const users: User[] = await prisma.user.findMany({});
  return NextResponse.json(users);
};

export const POST = async (req: NextAuthRequest): Promise<Response> => {
  const { username } = await req.json();
  const user = req.auth?.user;

  if (!user || !user.email) {
    return Response.json(
      {
        message: 'Not authenticated',
        status: HttpStatusCode.Unauthorized,
      },
      { status: HttpStatusCode.Unauthorized },
    );
  }

  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email: user.email || '',
    },
  });

  if (existingUserWithEmail) {
    return Response.json(
      {
        message: `Email ${user.email} has been registered.`,
        status: HttpStatusCode.UnprocessableEntity,
      },
      { status: HttpStatusCode.UnprocessableEntity },
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

  return Response.json({
    ...newUser,
  });
};
