'use server';
import { apiFailure, apiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { IFormNewExchange } from '@myex/types/exchange';

export async function myexCreateExchange({ name, apiKey, apiSecret }: IFormNewExchange) {
  const session = await auth();
  const userMyexId = Number(session?.user?.myexId);
  if (!userMyexId) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingExchange = await prisma.exchange.findFirst({
    where: {
      name,
      userMyexId,
    },
  });

  const updatedExchange = await prisma.exchange.upsert({
    where: {
      myexId: existingExchange?.myexId,
    },
    update: {
      apiKey,
      apiSecret,
    },
    create: {
      name,
      apiKey,
      apiSecret,
      userMyexId,
    },
  });

  return apiSuccess(updatedExchange);
}
