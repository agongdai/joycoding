'use server';
import { apiFailure, apiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { MyexAsset } from '@myex/types/trading';
import { Transaction } from '@prisma/client';

export async function myexUpdateTxOpenPrice(myexTxId: number, price: string) {
  const session = await auth();
  const userMyexId = Number(session?.user?.myexId);
  if (!userMyexId) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  const updatedTx = await prisma?.transaction.update({
    where: {
      myexId: myexTxId,
    },
    data: {
      openPrice: price,
    },
  });

  return apiSuccess<Transaction>(updatedTx);
}

export async function myexFetchOpenTransactions(myexAssets: MyexAsset[]): Promise<MyexAsset[]> {
  const session = await auth();
  const userMyexId = Number(session?.user?.myexId);
  if (!userMyexId) {
    return [];
  }

  const transactions = await prisma?.transaction.findMany({
    where: {
      userMyexId,
      aborted: false,
      closeTimestamp: null,
    },
  });

  const myexAssetsWithTx = await Promise.all(
    myexAssets.map(async (asset) => {
      let assetTransaction = transactions.find((t) => t.currency === asset.currency);
      if (!assetTransaction) {
        assetTransaction = await prisma.transaction.create({
          data: {
            currency: asset.currency,
            totalAmount: asset.amount,
            availableAmount: asset.amount,
            openTimestamp: new Date().toISOString(),
            exchanges: (asset.wallets.map((w) => w.exchange) as string[]).join(','),
            userMyexId,
            aborted: false,
          },
        });
      }

      return {
        ...asset,
        myexTransaction: assetTransaction,
      } as MyexAsset;
    }),
  );

  return myexAssetsWithTx;
}
