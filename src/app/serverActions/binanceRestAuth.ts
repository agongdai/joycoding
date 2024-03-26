'use server';

import { Spot } from '@binance/connector-typescript';
import { auth } from '@myex/auth';
import { BinanceWallet } from '@myex/types/binance';
import { Exchange } from '@myex/types/exchange';

let client: Spot | null = null;

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

export const getBinanceBalances = async (): Promise<BinanceWallet[]> => {
  const client = await getBinanceClient();
  if (!client) {
    return [];
  }

  try {
    console.debug('fetching binance balances ...');
    // @doc https://binance.github.io/binance-connector-node/module-Wallet.html
    const res = await client.accountInformation();
    if (res?.canTrade) {
      return res?.balances || [];
    }
  } catch (error) {
    console.error('binance error', error);
    return [];
  }

  return [];
};
