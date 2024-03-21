import _maxBy from 'lodash/maxBy';

import { AccountSnapshotType, Spot } from '@binance/connector-typescript';
import { auth } from '@myex/auth';
import { HttpStatusCode } from '@myex/types/api';
import { BinanceWallet } from '@myex/types/binance';
import { Exchange } from '@myex/types/exchange';

const getBinanceClient = async () => {
  const session = await auth();
  const binanceKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Binance,
  );
  if (!session?.user || !binanceKey) {
    return null;
  }

  return new Spot(binanceKey.apiKey, binanceKey.apiSecret);
};

export const getBalances = async (): Promise<BinanceWallet[]> => {
  const client = await getBinanceClient();
  if (!client) {
    return [];
  }

  // @doc https://binance.github.io/binance-connector-node/module-Wallet.html
  const res = await client.accountInformation();
  if (res?.canTrade) {
    return res?.balances || [];
  }
  return [];
};
