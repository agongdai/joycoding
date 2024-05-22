'use server';

import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { IFormNewCoin } from '@myex/types/coin';
import { apiFailure, apiSuccess } from '@myex/utils/api';
import { Coin, User } from '@prisma/client';

export async function myexFetchCoins(): Promise<Coin[]> {
  return prisma.coin.findMany({});
}

export async function myexFetchCoinById(myexId: number): Promise<Coin | null> {
  return prisma.coin.findUnique({
    where: { myexId },
  });
}

export async function myexRemoveCoin(myexId: number) {
  const session = await auth();
  const sessionUser = session?.user;
  if (!sessionUser?.isAdmin) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const coin = await prisma.coin.findUnique({
    where: { myexId },
  });

  if (!coin) {
    return apiFailure(HttpStatusCode.NotFound, 'Coin not found.');
  }

  await prisma.coin.delete({
    where: { myexId },
  });

  return apiSuccess(coin);
}

export async function myexUpdateCoin(myexId: number, coin: IFormNewCoin) {
  const session = await auth();
  const sessionUser = session?.user;
  if (!sessionUser?.isAdmin) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingCoin = await prisma.coin.findFirst({
    where: {
      myexId,
    },
  });

  if (!existingCoin) {
    return apiFailure(HttpStatusCode.Conflict, `The coin ${coin.name} does not exist.`);
  }

  const updatedCoin = await prisma.coin.update({
    where: { myexId },
    data: {
      ...coin,
      rating: Number(coin.rating),
    },
  });

  return apiSuccess<Coin>(updatedCoin);
}

export async function myexCreateCoin(coin: IFormNewCoin) {
  const session = await auth();
  const sessionUser = session?.user;
  if (!sessionUser?.isAdmin) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingCoin = await prisma.coin.findFirst({
    where: {
      name: coin.name,
    },
  });

  if (existingCoin) {
    return apiFailure(HttpStatusCode.Conflict, `The coin ${coin.name} exists already.`);
  }

  const newCoin = await prisma.coin.create({
    data: {
      ...coin,
      rating: Number(coin.rating),
    },
  });

  return apiSuccess<Coin>(newCoin);
}
