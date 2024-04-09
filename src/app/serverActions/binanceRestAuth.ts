'use server';

import BigNumber from 'bignumber.js';

import { Spot } from '@binance/connector-typescript';
import { auth } from '@myex/auth';
import { BinanceWallet } from '@myex/types/binance';
import { CoinInMarket } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { BalanceBreakdownFromExchange } from '@myex/types/trading';
import { filterWalletsWithValue } from '@myex/utils/trading';

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

export const getBinanceBalances = async (
  marketCoins: CoinInMarket[],
): Promise<BalanceBreakdownFromExchange[]> => {
  const client = await getBinanceClient();
  if (!client) {
    return [];
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
    return filterWalletsWithValue(myexWallets, marketCoins);
  } catch (error) {
    console.error('binance error', error);
    return [];
  }
};
