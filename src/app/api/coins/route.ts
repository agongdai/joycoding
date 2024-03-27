import { restApiSuccess } from '@myex/api/utils';
import { prisma } from '@myex/db';
import { Coin } from '@prisma/client';

export const GET = async () => {
  const coins: Coin[] = await prisma.coin.findMany({});
  return restApiSuccess<Coin[]>(coins);
};
