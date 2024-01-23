import { useEffect, useMemo, useState } from 'react';

import { bfxResponseToTradingPair } from '@myex/api/adaptors/bitfinex';
import useBfxWs from '@myex/hooks/useBfxWs';
import { BfxTradingPair } from '@myex/types/bitfinex';
import { replaceArrayIndexes } from '@myex/utils/array';

import usePrevious from './usePrevious';

export default function useWsTradingPairs(defaultPairs: BfxTradingPair[]): BfxTradingPair[] {
  const [tradingPairs, setTradingPairs] = useState<BfxTradingPair[]>(defaultPairs);
  const { ws, disconnect } = useBfxWs();

  const mapSymbolToIndexInArray: Record<string, number> = useMemo(() => {
    return defaultPairs.reduce(
      (acc, pair, index) => {
        acc[pair.symbol] = index;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [defaultPairs]);

  const realTimeSymbols = useMemo(() => defaultPairs.map((pair) => pair.symbol), [defaultPairs]);

  const prevDefaultPairs = usePrevious(defaultPairs);
  useEffect(() => {
    if (prevDefaultPairs?.length !== defaultPairs?.length) {
      setTradingPairs(defaultPairs);
    }
  }, [defaultPairs, prevDefaultPairs]);

  useEffect(() => {
    if (!ws) {
      return;
    }

    const mapChannelIdToSymbol = {} as Record<number, string>;

    // WebSocket event handlers
    ws.addEventListener('open', (event) => {
      console.log('WebSocket connection opened', event, 'ws', ws);
      realTimeSymbols.forEach((symbol) => {
        ws.send(
          JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol,
          }),
        );
      });
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message?.event === 'subscribed') {
        mapChannelIdToSymbol[message.chanId] = message.symbol;
      }
      if (Array.isArray(message) && message[0]) {
        if (Array.isArray(message[1])) {
          const channelId = message[0];
          const symbol = mapChannelIdToSymbol[channelId];
          const index = mapSymbolToIndexInArray[symbol];
          const updatedTradingPair = bfxResponseToTradingPair([symbol, ...message[1]]);
          setTradingPairs((prevTradingPairs) =>
            replaceArrayIndexes(
              prevTradingPairs,
              [index],
              [
                {
                  ...prevTradingPairs[index],
                  ...updatedTradingPair,
                },
              ],
            ),
          );
        }
      }
    });

    ws.addEventListener('close', (event) => {
      console.log('WebSocket connection closed', event);
    });

    return () => {
      disconnect();
    };
  }, [disconnect, mapSymbolToIndexInArray, realTimeSymbols, ws]);

  return tradingPairs;
}
