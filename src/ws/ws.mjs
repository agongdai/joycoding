import websocket from 'websocket';

const WebSocketClient = websocket.client;

const socket = (function() {
  const client = new WebSocketClient();
  let wsBaseUrl = null;
  let isConnecting = false;
  let connection = null;
  let onMessage = null;
  let onConnected = null;
  let commandsQueue = [];

  client.on('connectFailed', function(error) {
    console.error('Connect Error: ' + error.toString());
    isConnecting = false;
  });

  client.on('connect', function(ws) {
    connection = ws;
    console.log('WebSocket client connected');
    isConnecting = false;

    if (onConnected) {
      onConnected(ws);
    }

    while (commandsQueue.length > 0) {
      ws.send(JSON.stringify(commandsQueue.pop()));
    }

    ws.on('error', function(error) {
      console.log('WebSocket connection error: ' + error.toString());
    });

    ws.on('close', function() {
      console.log('WebSocket connection closed');
    });

    ws.on('message', function(message) {
      const data = JSON.parse(message.utf8Data);
      // console.log('Got message from WebSocket', data);
      if (onMessage) {
        onMessage(data);
      }
    });
  });

  const connect = (wsUrl, onMessageCallback = null, onConnectedCallback = null) => {
    if (connection && connection.connected) {
      return;
    }

    // If already connecting or no wsUrl provided, do nothing, just wait for the existing connection to be established
    if (isConnecting || !wsUrl) {
      return;
    }

    wsBaseUrl = wsUrl;
    isConnecting = true;
    client.connect(wsBaseUrl);
    onMessageCallback && (onMessage = onMessageCallback);
    onConnectedCallback && (onConnected = onConnectedCallback);
  };

  const getConnection = () => {
    return connection;
  };

  const send = (data) => {
    if (connection && connection.connected) {
      connection.send(JSON.stringify(data));
    } else {
      commandsQueue.push(data);
      !isConnecting && connect(wsBaseUrl);
    }
  }

  return {
    connect,
    getConnection,
    send,
  };
})();

export default socket;
