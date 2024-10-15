export interface IFormNewExchangeApi {
  exchangeId: string;
  apiKey: string;
  apiSecret: string;
  url?: string;
  apiPassphrase?: string;
}

export enum Exchange {
  Bitfinex = 'bitfinex',
  Binance = 'binance',
  OKX = 'okx',
  Bitget = 'bitget',
  Gate = 'gate',
  Game = 'game',
}

export enum ExchangeId {
  Bitfinex = 1,
  Binance = 2,
  OKX = 3,
  Bitget = 4,
  Gate = 5,
  Game = 6,
}

export const MapExchangeNameToId: Record<Exchange, ExchangeId> = {
  [Exchange.Bitfinex]: ExchangeId.Bitfinex,
  [Exchange.Binance]: ExchangeId.Binance,
  [Exchange.OKX]: ExchangeId.OKX,
  [Exchange.Bitget]: ExchangeId.Bitget,
  [Exchange.Gate]: ExchangeId.Gate,
  [Exchange.Game]: ExchangeId.Game,
};

export const MapExchangeIdToName: Record<ExchangeId, Exchange> = {
  [ExchangeId.Bitfinex]: Exchange.Bitfinex,
  [ExchangeId.Binance]: Exchange.Binance,
  [ExchangeId.OKX]: Exchange.OKX,
  [ExchangeId.Bitget]: Exchange.Bitget,
  [ExchangeId.Gate]: Exchange.Gate,
  [ExchangeId.Game]: Exchange.Game,
};
