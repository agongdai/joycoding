'use server';

import BigNumber from 'bignumber.js';
import { SpotAccountApi } from 'bitget-api-node-sdk';

import { auth } from '@myex/auth';
import { BinanceWallet } from '@myex/types/binance';
import { BitgetWallet } from '@myex/types/bitget';
import { CoinInMarket } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { BalanceBreakdownFromExchange } from '@myex/types/trading';
import { filterWalletsWithValue } from '@myex/utils/trading';

let client: any | null = null;

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
  marketCoins: CoinInMarket[],
): Promise<BalanceBreakdownFromExchange[]> => {
  const client = await getBitgetClient();
  if (!client) {
    return [];
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
    return filterWalletsWithValue(myexWallets, marketCoins);
  } catch (error) {
    console.error('binance error', error);
    return [];
  }
};
