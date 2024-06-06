import { IS_PROD } from '@myex/config';
import { Endpoint } from '@myex/types/api';

const BfxBaseUrl = 'https://api-pub.bitfinex.com';

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

export const MyExWsBaseUrl = IS_PROD ? 'wss://ws.myex.ai/' : 'ws://localhost:8080/';
