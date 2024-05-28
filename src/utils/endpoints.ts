import { Endpoint } from '@myex/types/api';
import { Exchange } from '@myex/types/exchange';

const BfxBaseUrl = 'https://api-pub.bitfinex.com';
export const BfxWsBaseUrl = 'wss://api-pub.bitfinex.com/ws/2';

export const BfxApiBaseUrl = BfxBaseUrl + '/v2';

const getBfxApiUrl = (path: string) => `${BfxApiBaseUrl}${path}`;

export const BfxEndpoints: Record<string, Endpoint> = {
  status: {
    path: getBfxApiUrl('/platform/status'),
  },
  tickers: {
    path: getBfxApiUrl('/tickers'),
  },
  wallets: {
    path: getBfxApiUrl('/auth/r/wallets'),
    apiPath: 'v2/auth/r/wallets', // for signature
  },
};

export const CoinGeokoApiBaseUrl = 'https://api.coingecko.com/api/v3';

export const WsBaseUrl = {
  [Exchange.Bitfinex]: BfxWsBaseUrl,
  [Exchange.Binance]: '',
  [Exchange.OKX]: '',
  [Exchange.Bitget]: '',
  [Exchange.Gate]: '',
};
