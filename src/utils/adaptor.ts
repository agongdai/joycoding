import BigNumber from 'bignumber.js';

import { WsRealTimeData } from '@myex/types/trading';
import { bitfinexSymbolToCurrency } from '@myex/utils/trading';

export const readBitfinexWsResponse = (pair: (string | number)[]): WsRealTimeData =>
  ({
    currency: String(pair[0]),
    priceChangePercentage24h: BigNumber(pair[6]),
    price: pair[7],
    volume24h: BigNumber(pair[8]),
  }) as WsRealTimeData;
