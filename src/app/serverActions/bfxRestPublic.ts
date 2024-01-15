'use server';
import BigNumber from 'bignumber.js';

import { BfxEndpoints } from '@myex/api/endpoints';
import coins from '@myex/data/coins.json';
import { BfxTradingPair } from '@myex/types/bitfinex';
import { Coin } from '@myex/types/common';
import { currencyToSymbol, symbolToCurrency } from '@myex/utils/trading';

export async function fetchTradingPairs(): Promise<BfxTradingPair[]> {
  const symbolsStr = coins.map((coin: Coin) => currencyToSymbol(coin.currency)).join(',');
  const res = await fetch(`${BfxEndpoints.tickers.path}?symbols=${symbolsStr}`);
  const data = await res.json();
  return data.map((pair: (string | number)[]) => ({
    symbol: pair[0],
    _currency: symbolToCurrency(String(pair[0])),
    bid: pair[1],
    bidSize: pair[2],
    ask: pair[3],
    askSize: pair[4],
    dailyChange: pair[5],
    dailyChangePerc: pair[6],
    lastPrice: pair[7],
    volume: pair[8],
    _volumeAmount: BigNumber(pair[8]).multipliedBy(BigNumber(pair[7])).toNumber(),
    high: pair[9],
    low: pair[10],
  }));
}
