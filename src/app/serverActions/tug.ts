'use server';

import { prisma } from '@myex/db';
import { TugOfWar } from '@prisma/client';

export async function myexFetchCurrentGame(): Promise<TugOfWar | null> {
  return prisma.tugOfWar.findFirst({
    where: {
      closeTimestamp: null,
    },
  });
}
