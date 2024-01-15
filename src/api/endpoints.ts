import { Endpoint } from '@jses/types/api';

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
