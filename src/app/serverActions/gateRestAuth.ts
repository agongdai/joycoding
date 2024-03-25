'use server';

import { SpotAccount, SpotApi } from 'gate-api';

import { auth } from '@myex/auth';
import { Exchange } from '@myex/types/exchange';
import { GateWallet } from '@myex/types/gate';

const GateApi = require('gate-api');

let client: SpotApi | null = null;

const getGateClient = async () => {
  if (client) {
    return client;
  }

  const session = await auth();
  const gateKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Gate,
  );
  if (!session?.user || !gateKey) {
    return null;
  }

  const gateClient = new GateApi.ApiClient();
  gateClient.setApiKeySecret(gateKey.apiKey, gateKey.apiSecret);
  client = new GateApi.SpotApi(gateClient);
  return client;
};

export const getGateSpotAccounts = async (): Promise<GateWallet[]> => {
  const client = await getGateClient();
  if (!client) {
    return [];
  }

  // @doc https://github.com/gateio/gateapi-nodejs/blob/master/docs/SpotApi.md#listSpotAccounts
  const res = await client.listSpotAccounts({});
  const body = res.body;
  return body.map(
    (account: SpotAccount) =>
      ({
        currency: account.currency,
        available: account.available,
        locked: account.locked,
      }) as GateWallet,
  );
};
