import { NextRequest, NextResponse } from 'next/server';
import { NextAuthRequest } from 'next-auth/lib';

import { auth } from '@myex/auth';
import { prisma } from '@myex/db';

export const GET = auth(async (req: NextAuthRequest) => {
  // @todo limit to admin
  // if (!req.auth?.user?.isAdmin) {
  //   return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  // }

  const users = await prisma.user.findMany({});
  return NextResponse.json(users);
});

export const POST = auth(async (req: NextAuthRequest) => {
  const { username } = await req.json();
  const user = req.auth?.user;

  if (!user || !user.email) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email: user.email || '',
    },
  });

  if (existingUserWithEmail) {
    return Response.json({ message: `Email ${user.email} has been registered.` }, { status: 422 });
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

  return NextResponse.json({
    user: newUser,
  });
});
