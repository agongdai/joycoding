'use client';

import { useCallback, useEffect, useState } from 'react';
import _includes from 'lodash/includes';
import _values from 'lodash/values';

import { useMyexSelector } from '@myex/store';
import { selectWsLive } from '@myex/store/trading/selectors';
import { MyExWsBaseUrl } from '@myex/utils/endpoints';

export default function useWs(connectInitially = false) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const wsLive = useMyexSelector(selectWsLive);

  const live = _includes(_values(wsLive), true);

  const connect = useCallback(() => {
    if (ws) {
      ws.close();
    }
    const newWs = new WebSocket(MyExWsBaseUrl, ['echo-protocol']);
    setWs(newWs);
  }, [ws]);

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
