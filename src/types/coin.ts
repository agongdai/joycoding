import BigNumber from 'bignumber.js';

import { Coin } from '@prisma/client';

export interface IFormNewCoin {
  name: string;
  currency: string;
  projectUrl: string;
  cmcUrl: string;
  rating: number;
  coinGeckoId?: string | null;
  icon?: string | null;
  exchangeSymbols?: string | null;
  exchanges?: string | null;
}

/** The market coin information (from CoinGeoko, CoinMarketCap, or Bitfinex/Binance. **/
export type CoinInMarket = {
  geckoId: string;
  currency: string;
  image: string;
  price: string;
  priceChangePercentage24h: BigNumber;
  priceHigh24h: BigNumber;
  priceLow24h: BigNumber;
  marketCap: BigNumber;
  marketCapRank: number;
  volume24h: BigNumber;
  lastUpdated: number;
  circulatingSupply: BigNumber;
  totalSupply: BigNumber;
  maxSupply: BigNumber;
  rating: number;
  exchanges: string;
  myexCoin?: Coin | null;
};
