// @doc https://docs.bitfinex.com/reference/rest-public-tickers#response-fields
export type BfxTradingPair = {
  symbol: string;
  _currency: string; // derived coin name
  bid: number;
  bidSize: number;
  ask: number;
  askSize: number;
  dailyChange: number;
  dailyChangePerc: number;
  lastPrice: number;
  volume: number;
  _volumeAmount: number;
  high: number;
  low: number;
};

// @doc https://docs.bitfinex.com/reference/rest-auth-wallets#wallet-arrays
export type BfxWallet = {
  type: string;
  currency: string;
  balance: number;
  unsettledInterest: number;
  availableBalance: number;
  lastChange: string;
  tradeDetails: string;
};
