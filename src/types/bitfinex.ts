// @doc https://docs.bitfinex.com/reference/rest-public-tickers#response-fields
export type BfxTradingPair = {
  symbol: string;
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
