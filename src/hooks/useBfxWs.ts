import { useCallback, useEffect, useState } from 'react';

import { useMyexSelector } from '@myex/store';
import { selectLive } from '@myex/store/trading/selectors';
import { BfxWsBaseUrl } from '@myex/utils/endpoints';

export default function useBfxWs() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const live = useMyexSelector(selectLive);

  const connect = useCallback(() => {
    if (ws) {
      ws.close();
    }
    const newWs = new WebSocket(BfxWsBaseUrl);
    setWs(newWs);
  }, [ws]);

  const disconnect = useCallback(() => {
    ws?.close();
    setWs(null);
  }, [ws]);

  useEffect(() => {
    if (!ws && live) {
      connect();
    }
  }, [connect, ws, live]);

  useEffect(() => {
    if (!live) {
      disconnect();
    }
  }, [disconnect, live]);

  return {
    connect,
    disconnect,
    ws,
  };
}
