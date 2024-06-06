'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import _difference from 'lodash/difference';
import { enqueueSnackbar } from 'notistack';

import useWs from '@myex/hooks/useWs';
import { MarketCoin } from '@myex/types/coin';
import { Exchange, MapExchangeNameToId } from '@myex/types/exchange';
import { readBitfinexWsResponse } from '@myex/utils/adaptor';
import { replaceArrayIndexes } from '@myex/utils/array';
import { bitfinexSymbolToCurrency, currencyToBitfinexSymbol } from '@myex/utils/trading';

import usePrevious from './usePrevious';

export default function useWsMarketCoins(defaultMarketCoins: MarketCoin[]): MarketCoin[] {
  const [marketCoins, setMarketCoins] = useState<MarketCoin[]>(defaultMarketCoins);
  const realTimeMarketCoins = useMemo(
    () =>
      defaultMarketCoins.filter((coin) => !coin.invisible && coin.exchanges === Exchange.Bitfinex),
    [defaultMarketCoins],
  );
  const realTimeCurrencies = useMemo(
    () => realTimeMarketCoins.map((coin) => coin.currency),
    [realTimeMarketCoins],
  );

  // Map currency to exchange @todo to support multiple exchanges
  const mapCurrencyToExchange: Record<string, Exchange> = useMemo(
    () =>
      defaultMarketCoins.reduce(
        (prev, coin, index) => ({
          ...prev,
          [coin.currency]: coin.exchanges as Exchange,
        }),
        {} as Record<string, Exchange>,
      ),
    [defaultMarketCoins],
  );

  const mapCurrencyToChannelId = useRef<Record<string, string>>({});
  const mapChannelIdToCurrency = useRef<Record<string, string>>({});

  const { ws, disconnect, alive, connect } = useWs(realTimeCurrencies.length > 0);

  const mapCurrencyToIndexInArray: Record<string, number> = useMemo(() => {
    return defaultMarketCoins.reduce(
      (acc, pair, index) => {
        acc[pair.currency.toUpperCase()] = index;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [defaultMarketCoins]);

  // Whenever page shows a different set of MarketCoins, unsubscribe from the old ones and subscribe to the new ones
  const prevRealTimeCurrencies = usePrevious(realTimeCurrencies);
  useEffect(() => {
    if (prevRealTimeCurrencies !== realTimeCurrencies && alive) {
      const removedCurrencies = _difference(prevRealTimeCurrencies, realTimeCurrencies);

      removedCurrencies.forEach((currency) => {
        ws?.send(
          JSON.stringify({
            exchange: MapExchangeNameToId[mapCurrencyToExchange[currency]],
            payload: {
              event: 'unsubscribe',
              chanId: Number(mapCurrencyToChannelId.current[currency].split('-')[1] || 0),
            },
          }),
        );
      });

      const newCurrencies = _difference(realTimeCurrencies, prevRealTimeCurrencies);
      newCurrencies.forEach((currency) => {
        ws?.send(
          JSON.stringify({
            exchange: MapExchangeNameToId[mapCurrencyToExchange[currency]],
            payload: {
              event: 'subscribe',
              channel: 'ticker',
              symbol: currencyToBitfinexSymbol(currency),
            },
          }),
        );
      });
    }
  }, [alive, disconnect, mapCurrencyToExchange, prevRealTimeCurrencies, realTimeCurrencies, ws]);

  // Connect to WebSocket when there are realTimeCurrencies and disconnect when there are none
  useEffect(() => {
    if (prevRealTimeCurrencies !== realTimeCurrencies) {
      if (prevRealTimeCurrencies?.length === 0 && realTimeCurrencies?.length > 0 && !alive) {
        connect();
      }
      if (realTimeCurrencies.length === 0 && alive) {
        disconnect();
      }
    }
  }, [alive, connect, disconnect, prevRealTimeCurrencies, realTimeCurrencies]);

  useEffect(() => {
    setMarketCoins(defaultMarketCoins);
  }, [defaultMarketCoins]);

  useEffect(() => {
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      return;
    }

    // WebSocket event handlers
    // When the WebSocket opens, make sure the latest currencies are subscribed.
    ws.addEventListener('open', (event) => {
      enqueueSnackbar('WebSocket connection to MyEx.AI has been established.', {
        variant: 'success',
        preventDuplicate: true,
        persist: false,
      });
      realTimeCurrencies.forEach((currency) => {
        ws.send(
          JSON.stringify({
            exchange: MapExchangeNameToId[mapCurrencyToExchange[currency]],
            payload: {
              event: 'subscribe',
              channel: 'ticker',
              symbol: currencyToBitfinexSymbol(currency),
            },
          }),
        );
      });
    });

    // Whenever a message arrives
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      const exchange = message?.exchange;
      const payload = message?.payload;
      // To handle multiple exchanges, make the channel id unique by prefixing it with the exchange id
      const uniqueChanId = `${exchange}-${payload?.chanId || ''}`;

      // Handle subscription and unsubscription events
      if (payload?.event === 'subscribed') {
        mapChannelIdToCurrency.current[uniqueChanId] = bitfinexSymbolToCurrency(payload.symbol);
        mapCurrencyToChannelId.current[bitfinexSymbolToCurrency(payload.symbol)] = uniqueChanId;
      }
      if (payload?.event === 'unsubscribed') {
        const currency = mapChannelIdToCurrency.current[uniqueChanId];
        delete mapChannelIdToCurrency.current[uniqueChanId];
        delete mapCurrencyToChannelId.current[currency];
      }

      // Handle ticker updates
      if (Array.isArray(payload) && payload[0]) {
        if (Array.isArray(payload[1])) {
          const uniqueChanId = `${exchange}-${payload[0]}`;
          const currency = mapChannelIdToCurrency.current[uniqueChanId];
          const index = mapCurrencyToIndexInArray[currency];
          const updatedMarketCoin = readBitfinexWsResponse([currency, ...payload[1]]);
          currency &&
            index >= 0 &&
            setMarketCoins((prevMarketCoins) =>
              replaceArrayIndexes(
                prevMarketCoins,
                [index],
                [
                  {
                    ...prevMarketCoins[index],
                    ...updatedMarketCoin,
                  },
                ],
              ),
            );
        }
      }
    });

    ws.addEventListener('close', (event) => {
      enqueueSnackbar('WebSocket connection to Bitfinex has been shut down.', {
        variant: 'warning',
        preventDuplicate: true,
      });
    });
  }, [disconnect, mapCurrencyToExchange, mapCurrencyToIndexInArray, realTimeCurrencies, ws]);

  return marketCoins;
}
