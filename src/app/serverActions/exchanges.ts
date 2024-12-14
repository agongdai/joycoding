import { fetchBitfinexWallets } from '@myex/app/serverActions/bfxRestAuth';
import { getBinanceBalances } from '@myex/app/serverActions/binanceRestAuth';
import { getBitgetBalances } from '@myex/app/serverActions/bitgetRestAuth';
import { getGateSpotAccounts } from '@myex/app/serverActions/gateRestAuth';
import { fetchOkxWallets } from '@myex/app/serverActions/okxRestAuth';
import { auth } from '@myex/auth';
import { MarketCoin } from '@myex/types/coin';

export async function fetchAssetsFromExchanges(marketCoins: MarketCoin[]) {
  const session = await auth();
  const userMyexId = Number(session?.user?.myexId);
  if (!userMyexId) {
    return [];
  }

  const [bfxWallets, binanceWallets, gateWallets, okxWallets, bitgetWallets] = await Promise.all([
    fetchBitfinexWallets(marketCoins),
    getBinanceBalances(marketCoins),
    getGateSpotAccounts(marketCoins),
    fetchOkxWallets(marketCoins),
    getBitgetBalances(marketCoins),
  ]);

  return [...bfxWallets, ...binanceWallets, ...gateWallets, ...okxWallets, ...bitgetWallets];
}
