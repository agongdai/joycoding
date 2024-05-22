import { prisma } from '@myex/db';
import { restApiSuccess } from '@myex/utils/api';
import { Coin } from '@prisma/client';

export const GET = async () => {
  const coins: Coin[] = await prisma.coin.findMany({});
  return restApiSuccess<Coin[]>(coins);
};
