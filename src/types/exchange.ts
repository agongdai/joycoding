export interface IFormNewExchange {
  name: string;
  apiKey: string;
  apiSecret: string;
}

export enum Exchange {
  Bitfinex = 'Bitfinex',
  Binance = 'Binance',
  OKX = 'OKX',
  Bitget = 'Bitget',
  GateIo = 'Gate.io',
}
