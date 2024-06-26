'use server';

import BigNumber from 'bignumber.js';
import { SpotAccountApi } from 'bitget-api-node-sdk';

import cache from '@myex/app/serverActions/cache';
import { auth } from '@myex/auth';
import { BitgetWallet } from '@myex/types/bitget';
import { MarketCoin } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { BalanceBreakdownFromExchange } from '@myex/types/trading';
import { filterWalletsWithValue } from '@myex/utils/trading';

let client: any | null = null;

/**
 * Get the cache key for Gate exchange for current user
 */
const getBitgetCacheKey = async () => {
  const session = await auth();
  const bitgetKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Bitget,
  );
  if (!session?.user || !bitgetKey) {
    return '';
  }
  return `${Exchange.Bitget}-${session?.user?.myexId}-${bitgetKey?.apiKey}`;
};

const getBitgetClient = async () => {
  if (client) {
    return client;
  }

  const session = await auth();
  const bitgetKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Bitget,
  );
  if (
    !session?.user ||
    !bitgetKey ||
    !bitgetKey.apiKey ||
    !bitgetKey.apiSecret ||
    !bitgetKey.apiPassphrase
  ) {
    return null;
  }

  client = new SpotAccountApi(bitgetKey.apiKey, bitgetKey.apiSecret, bitgetKey.apiPassphrase);
  return client;
};

export const getBitgetBalances = async (
  marketCoins: MarketCoin[],
): Promise<BalanceBreakdownFromExchange[]> => {
  const client = await getBitgetClient();
  if (!client) {
    return [];
  }

  const bitgetCacheKey = await getBitgetCacheKey();

  if (!bitgetCacheKey) {
    return [];
  }

  if (cache.get(bitgetCacheKey)) {
    return cache.get(bitgetCacheKey) as BalanceBreakdownFromExchange[];
  }

  try {
    console.debug('fetching bitget balances ...');
    // @doc https://www.bitget.com/api-doc/spot/account/Get-Account-Assets
    const res = await client.assets();
    const wallets: BitgetWallet[] = res?.data || [];
    const myexWallets: BalanceBreakdownFromExchange[] = wallets.map((wallet) => ({
      currency: wallet.coinName,
      totalAmount: BigNumber(wallet.available).plus(BigNumber(wallet.frozen)).toString(),
      availableAmount: wallet.available,
      exchange: Exchange.Bitget,
    }));

    const myexWalletsWithBalance = filterWalletsWithValue(myexWallets, marketCoins);
    cache.put(bitgetCacheKey, myexWalletsWithBalance);
    return myexWalletsWithBalance;
  } catch (error) {
    console.error('bitget error', error);
    return [];
  }
};
