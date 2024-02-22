import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@myex/db';

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
  const id = Number(context.params.id || 0);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json({ user });
};
