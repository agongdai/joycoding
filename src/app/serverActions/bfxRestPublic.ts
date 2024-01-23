'use server';

import { bfxResponseToTradingPair } from '@myex/api/adaptors/bitfinex';
import { BfxEndpoints } from '@myex/api/endpoints';
import coins from '@myex/data/coins.json';
import { BfxTradingPair } from '@myex/types/bitfinex';
import { Coin } from '@myex/types/common';
import { currencyToSymbol } from '@myex/utils/trading';

export async function fetchTradingPairs(): Promise<BfxTradingPair[]> {
  const symbolsStr = coins.map((coin: Coin) => currencyToSymbol(coin.currency)).join(',');
  const res = await fetch(`${BfxEndpoints.tickers.path}?symbols=${symbolsStr}`);
  const data = await res.json();
  return data.map(bfxResponseToTradingPair) as BfxTradingPair[];
}
