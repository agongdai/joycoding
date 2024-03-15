'use server';

import { bfxResponseToTradingPair } from '@myex/api/adaptors/bitfinex';
import { BfxEndpoints } from '@myex/api/endpoints';
import { myexFetchCoins } from '@myex/app/serverActions/myexCoin';
import { BfxTradingPair } from '@myex/types/bitfinex';
import { currencyToSymbol } from '@myex/utils/trading';
import { Coin } from '@prisma/client';

export async function fetchTradingPairs(): Promise<BfxTradingPair[]> {
  const coins = await myexFetchCoins();
  const symbolsStr = coins.map((coin: Coin) => currencyToSymbol(coin.currency)).join(',');
  const res = await fetch(`${BfxEndpoints.tickers.path}?symbols=${symbolsStr}`);
  const data = await res.json();
  return data.map((pair: (string | number)[]) => {
    const mappedTradingPair = bfxResponseToTradingPair(pair);
    const myexCoin = coins.find((coin: Coin) => coin.currency === mappedTradingPair._currency);
    return {
      ...mappedTradingPair,
      _rating: myexCoin?.rating,
      myexCoin,
    };
  });
}
