'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import _difference from 'lodash/difference';
import { enqueueSnackbar } from 'notistack';

import useWs from '@myex/hooks/useWs';
import { MarketCoin } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { readBitfinexWsResponse } from '@myex/utils/adaptor';
import { replaceArrayIndexes } from '@myex/utils/array';
import { bitfinexSymbolToCurrency, currencyToBitfinexSymbol } from '@myex/utils/trading';

import usePrevious from './usePrevious';

export default function useWsMarketCoins(defaultMarketCoins: MarketCoin[]): MarketCoin[] {
  const [marketCoins, setMarketCoins] = useState<MarketCoin[]>(defaultMarketCoins);
  const realTimeCurrencies = useMemo(
    () =>
      defaultMarketCoins
        .filter((coin) => !coin.invisible && coin.exchanges === Exchange.Bitfinex)
        .map((coin) => coin.currency),
    [defaultMarketCoins],
  );
  const { ws, disconnect, alive, connect } = useWs(
    Exchange.Bitfinex,
    realTimeCurrencies.length > 0,
  );
  const mapCurrencyToChannelId = useRef<Record<string, number>>({});
  const mapChannelIdToCurrency = useRef<Record<number, string>>({});

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
            event: 'unsubscribe',
            chanId: mapCurrencyToChannelId.current[currency],
          }),
        );
      });

      const newCurrencies = _difference(realTimeCurrencies, prevRealTimeCurrencies);
      newCurrencies.forEach((currency) => {
        ws?.send(
          JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: currencyToBitfinexSymbol(currency),
          }),
        );
      });
    }
  }, [alive, disconnect, prevRealTimeCurrencies, realTimeCurrencies, ws]);

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
    ws.addEventListener('open', (event) => {
      enqueueSnackbar('WebSocket connection to Bitfinex has been established.', {
        variant: 'success',
        preventDuplicate: true,
      });
      realTimeCurrencies.forEach((currency) => {
        ws.send(
          JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: currencyToBitfinexSymbol(currency),
          }),
        );
      });
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message?.event === 'subscribed') {
        mapChannelIdToCurrency.current[message.chanId] = bitfinexSymbolToCurrency(message.symbol);
        mapCurrencyToChannelId.current[bitfinexSymbolToCurrency(message.symbol)] = message.chanId;
      }
      if (message?.event === 'unsubscribed') {
        const currency = mapChannelIdToCurrency.current[message.chanId];
        delete mapChannelIdToCurrency.current[message.chanId];
        delete mapCurrencyToChannelId.current[currency];
      }
      if (Array.isArray(message) && message[0]) {
        if (Array.isArray(message[1])) {
          const channelId = message[0];
          const currency = mapChannelIdToCurrency.current[channelId];
          const index = mapCurrencyToIndexInArray[currency];
          const updatedMarketCoin = readBitfinexWsResponse([currency, ...message[1]]);
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
  }, [disconnect, mapCurrencyToIndexInArray, realTimeCurrencies, ws]);

  return marketCoins;
}
