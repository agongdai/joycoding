import { fetchBitfinexWallets } from '@myex/app/serverActions/bfxRestAuth';
import { getBinanceBalances } from '@myex/app/serverActions/binanceRestAuth';
import { getGateSpotAccounts } from '@myex/app/serverActions/gateRestAuth';
import { fetchOkxWallets } from '@myex/app/serverActions/okxRestAuth';
import { auth } from '@myex/auth';
import { CoinInMarket } from '@myex/types/coin';

export async function fetchAssetsFromExchanges(marketCoins: CoinInMarket[]) {
  const session = await auth();
  const userMyexId = Number(session?.user?.myexId);
  if (!userMyexId) {
    return [];
  }

  const [bfxWallets, binanceWallets, gateWallets, okxWallets] = await Promise.all([
    fetchBitfinexWallets(marketCoins),
    getBinanceBalances(marketCoins),
    getGateSpotAccounts(marketCoins),
    fetchOkxWallets(marketCoins),
  ]);

  return [...bfxWallets, ...binanceWallets, ...gateWallets, ...okxWallets];
}
