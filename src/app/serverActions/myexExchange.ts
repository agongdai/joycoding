'use server';
import { apiFailure, apiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { IFormNewExchangeApi } from '@myex/types/exchange';

export async function myexCreateExchangeApi({
  exchangeId,
  apiKey,
  apiSecret,
  apiPassphrase,
  url,
}: IFormNewExchangeApi) {
  const session = await auth();
  const userMyexId = Number(session?.user?.myexId);
  if (!userMyexId) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingExchange = await prisma.exchangeApi.findFirst({
    where: {
      exchangeId,
      userMyexId,
    },
  });

  const updatedExchange = await prisma.exchangeApi.upsert({
    where: {
      myexId: existingExchange?.myexId || 0,
    },
    update: {
      apiKey,
      apiSecret,
      apiPassphrase,
      url,
    },
    create: {
      exchangeId,
      apiKey,
      apiSecret,
      apiPassphrase,
      userMyexId,
      url,
    },
  });

  return apiSuccess(updatedExchange);
}
