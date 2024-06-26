'use server';

import BigNumber from 'bignumber.js';

import { Spot } from '@binance/connector-typescript';
import cache from '@myex/app/serverActions/cache';
import { auth } from '@myex/auth';
import { BinanceWallet } from '@myex/types/binance';
import { MarketCoin } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { BalanceBreakdownFromExchange } from '@myex/types/trading';
import { filterWalletsWithValue } from '@myex/utils/trading';

let client: Spot | null = null;

/**
 * Get the cache key for Gate exchange for current user
 */
const getBinanceCacheKey = async () => {
  const session = await auth();
  const binanceKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Binance,
  );
  if (!session?.user || !binanceKey) {
    return '';
  }
  return `${Exchange.Binance}-${session?.user?.myexId}-${binanceKey?.apiKey}`;
};

const getBinanceClient = async () => {
  if (client) {
    return client;
  }

  const session = await auth();
  const binanceKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Binance,
  );
  if (!session?.user || !binanceKey) {
    return null;
  }

  client = new Spot(binanceKey.apiKey, binanceKey.apiSecret);
  return client;
};

export const getBinanceBalances = async (
  marketCoins: MarketCoin[],
): Promise<BalanceBreakdownFromExchange[]> => {
  const client = await getBinanceClient();
  if (!client) {
    return [];
  }

  const binanceCacheKey = await getBinanceCacheKey();

  if (!binanceCacheKey) {
    return [];
  }

  if (cache.get(binanceCacheKey)) {
    return cache.get(binanceCacheKey) as BalanceBreakdownFromExchange[];
  }

  try {
    console.debug('fetching binance balances ...');
    // @doc https://binance.github.io/binance-connector-node/module-Wallet.html
    const res = await client.accountInformation();
    const wallets: BinanceWallet[] = res?.balances || [];
    const myexWallets: BalanceBreakdownFromExchange[] = wallets.map((wallet) => ({
      currency: wallet.asset,
      totalAmount: BigNumber(wallet.free).plus(BigNumber(wallet.locked)).toString(),
      availableAmount: wallet.free,
      exchange: Exchange.Binance,
    }));

    const myexWalletsWithBalance = filterWalletsWithValue(myexWallets, marketCoins);
    cache.put(binanceCacheKey, myexWalletsWithBalance);
    return myexWalletsWithBalance;
  } catch (error) {
    console.error('binance error', error);
    return [];
  }
};
