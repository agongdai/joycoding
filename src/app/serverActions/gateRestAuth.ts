'use server';

import BigNumber from 'bignumber.js';
import { SpotAccount, SpotApi } from 'gate-api';

import { auth } from '@myex/auth';
import { MarketCoin } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { GateWallet } from '@myex/types/gate';
import { BalanceBreakdownFromExchange } from '@myex/types/trading';
import { filterWalletsWithValue } from '@myex/utils/trading';

import cache from './cache';

const GateApi = require('gate-api');

let client: SpotApi | null = null;

/**
 * Get the cache key for Gate exchange for current user
 */
const getGateCacheKey = async () => {
  const session = await auth();
  const gateKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Gate,
  );
  if (!session?.user || !gateKey) {
    return '';
  }
  return `${Exchange.Gate}-${session?.user?.myexId}-${gateKey?.apiKey}`;
};

const getGateClient = async () => {
  if (client) {
    return client;
  }

  const session = await auth();
  const gateKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Gate,
  );
  if (!session?.user || !gateKey) {
    return null;
  }

  const gateClient = new GateApi.ApiClient();
  gateClient.setApiKeySecret(gateKey.apiKey, gateKey.apiSecret);
  client = new GateApi.SpotApi(gateClient);
  return client;
};

export const getGateSpotAccounts = async (
  marketCoins: MarketCoin[],
): Promise<BalanceBreakdownFromExchange[]> => {
  const client = await getGateClient();
  if (!client) {
    return [];
  }

  const gateCacheKey = await getGateCacheKey();

  if (!gateCacheKey) {
    return [];
  }

  if (cache.get(gateCacheKey)) {
    return cache.get(gateCacheKey) as BalanceBreakdownFromExchange[];
  }

  try {
    console.debug('fetching gate spot accounts ...');
    // @doc https://github.com/gateio/gateapi-nodejs/blob/master/docs/SpotApi.md#listSpotAccounts
    const res = await client.listSpotAccounts({});
    const body = res.body;
    const wallets: GateWallet[] = body.map(
      (account: SpotAccount) =>
        ({
          currency: account.currency,
          available: account.available,
          locked: account.locked,
        }) as GateWallet,
    );

    const myexWallets: BalanceBreakdownFromExchange[] = wallets.map((wallet) => ({
      currency: wallet.currency,
      totalAmount: BigNumber(wallet.available).plus(BigNumber(wallet.locked)).toString(),
      availableAmount: wallet.available,
      exchange: Exchange.Gate,
    }));
    const myexWalletsWithBalance = filterWalletsWithValue(myexWallets, marketCoins);
    cache.put(gateCacheKey, myexWalletsWithBalance);
    return myexWalletsWithBalance;
  } catch (error) {
    console.error('gate error', error);
    return [];
  }
};
