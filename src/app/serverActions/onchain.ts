'use server';

import BigNumber from 'bignumber.js';
import _compact from 'lodash/compact';

import { BLOCK_DAEMON_API_BASE } from '@myex/config';
import { BlockDaemonWallet, Wallet } from '@myex/types/wallet';

export async function fetchOnChainBalances(): Promise<Wallet[]> {
  const wallets = await prisma?.onChainWallet.findMany({});
  if (!wallets) {
    return [];
  }

  const myexWallets = await Promise.all(
    wallets.map(async (wallet) => {
      const blockDaemonUrl = `${BLOCK_DAEMON_API_BASE}/${wallet.protocol}/${wallet.network}/account/${wallet.address}`;
      try {
        const res = await fetch(blockDaemonUrl, {
          // @ts-ignore
          headers: {
            'X-API-Key': process.env.BLOCKDAEMON_API_KEY,
          },
        });
        const json = await res.json();
        const chain: BlockDaemonWallet = json[0];
        if (!chain) {
          return null;
        }

        const myexCoin = await prisma?.coin.findUnique({
          where: {
            myexId: wallet.coinMyexId,
          },
        });

        return {
          currency: chain.currency.symbol,
          address: wallet.address,
          name: wallet.name,
          provider: wallet.provider,
          amount: BigNumber(chain.confirmed_balance || 0)
            .shiftedBy(-chain?.currency?.decimals || 0)
            .toString(),
          pendingAmount: BigNumber(chain.pending_balance || 0)
            .shiftedBy(-chain?.currency?.decimals || 0)
            .toString(),
          myexCoin,
        } as Wallet;
      } catch (error) {
        console.error('Error fetching on-chain balances:', error);
        return null;
      }
    }),
  );

  return _compact(myexWallets);
}
