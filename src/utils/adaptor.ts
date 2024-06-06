import BigNumber from 'bignumber.js';

import { WsRealTimeData } from '@myex/types/trading';

export const readBitfinexWsResponse = (pair: (string | number)[]): WsRealTimeData =>
  ({
    currency: String(pair[0]),
    priceChangePercentage24h: BigNumber(pair[1]),
    price: pair[2],
  }) as WsRealTimeData;
