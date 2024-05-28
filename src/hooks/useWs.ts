'use client';

import { useCallback, useEffect, useState } from 'react';

import { useMyexSelector } from '@myex/store';
import { selectWsLive } from '@myex/store/trading/selectors';
import { Exchange } from '@myex/types/exchange';
import { WsBaseUrl } from '@myex/utils/endpoints';

export default function useWs(exchange: Exchange, connectInitially = false) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const wsLive = useMyexSelector(selectWsLive);

  const live = wsLive[exchange];
  const wsExchangeBaseUrl = WsBaseUrl[exchange];

  const connect = useCallback(() => {
    if (ws) {
      ws.close();
    }
    const newWs = new WebSocket(wsExchangeBaseUrl);
    setWs(newWs);
  }, [ws, wsExchangeBaseUrl]);

  const disconnect = useCallback(() => {
    ws?.close();
    setWs(null);
  }, [ws]);

  useEffect(() => {
    if (!ws && live && connectInitially) {
      connect();
    }
  }, [connect, ws, live, connectInitially]);

  useEffect(() => {
    if (!live) {
      disconnect();
    }
  }, [disconnect, live]);

  return {
    connect,
    disconnect,
    ws,
    alive: ws && ws.readyState === WebSocket.OPEN,
  };
}
