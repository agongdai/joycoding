export type BookRowRaw = [number, number, number];

export type BookMessageRaw = [number, BookRowRaw];

export type BookBulkyMessagesRaw = [number, BookRowRaw[]];

export type BookRowParsed = {
  price?: number;
  count: number;
  amount: number;
  _total?: number; // computed value.
};

export type BookField = keyof BookRowParsed;

export enum Precision {
  P0 = 'P0',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
}

export enum Frequency {
  F0 = 'F0',
  F1 = 'F1',
}

export enum BookSide {
  Bids = 'bids',
  Asks = 'asks',
}

export type ChanMeta = {
  chanId: number | undefined;
  freq: Frequency;
  len: string;
  pair: string;
  prec: Precision;
  symbol: string;
};
