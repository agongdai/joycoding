export interface IFormNewExchangeApi {
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
