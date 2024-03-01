export interface IFormNewExchange {
  exchangeId: string;
  apiKey: string;
  apiSecret: string;
}

export enum Exchange {
  Bitfinex = 'bitfinex',
  Binance = 'binance',
  OKX = 'okx',
  Bitget = 'bitget',
  GateIo = 'gateio',
}
