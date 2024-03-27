'use server';
import { apiFailure, apiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { IFormNewCoin } from '@myex/types/coin';
import { WalletProvider } from '@myex/types/trading';
import { IFormOnChainWallet } from '@myex/types/wallet';
import { Coin, OnChainWallet } from '@prisma/client';

export async function myexFetchOnChainWallets(): Promise<OnChainWallet[]> {
  const session = await auth();
  if (!session?.user) {
    return [];
  }

  return prisma.onChainWallet.findMany({});
}

export async function myexRemoveWallet(myexId: number) {
  const session = await auth();
  const sessionUser = session?.user;

  const wallet = await prisma.onChainWallet.findUnique({
    where: { myexId },
  });

  if (!wallet || wallet.userMyexId !== sessionUser?.myexId) {
    return apiFailure(HttpStatusCode.NotFound, 'Wallet not found.');
  }

  await prisma.onChainWallet.delete({
    where: { myexId },
  });

  return apiSuccess(wallet);
}

export async function myexUpdateWallet(myexId: number, wallet: IFormOnChainWallet) {
  const session = await auth();
  const sessionUser = session?.user;

  if (!sessionUser) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingWallet = await prisma.onChainWallet.findFirst({
    where: {
      myexId,
    },
  });

  if (!existingWallet) {
    return apiFailure(HttpStatusCode.Conflict, `The wallet with id ${myexId} does not exist.`);
  }

  const updatedWallet = await prisma.onChainWallet.update({
    where: { myexId },
    data: {
      ...wallet,
    },
  });

  return apiSuccess<OnChainWallet>(updatedWallet);
}

export async function myexCreateOnChainWallet({
  name,
  address,
  provider,
  protocol,
  network,
  coinMyexId,
}: IFormOnChainWallet) {
  const session = await auth();
  const userMyexId = Number(session?.user?.myexId);
  if (!userMyexId) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const existingWallet = await prisma.onChainWallet.findFirst({
    where: {
      address,
      userMyexId,
    },
  });

  if (existingWallet) {
    return apiFailure(HttpStatusCode.Conflict, `The wallet ${existingWallet.name} exists already.`);
  }

  const updatedWallet = await prisma.onChainWallet.create({
    data: {
      name,
      address,
      protocol,
      network,
      provider: provider || WalletProvider.Unknown,
      addedTimestamp: new Date().toISOString(),
      coinMyexId: Number(coinMyexId),
      userMyexId,
    },
  });

  return apiSuccess(updatedWallet);
}
