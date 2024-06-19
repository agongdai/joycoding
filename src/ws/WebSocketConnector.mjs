import websocket from 'websocket';

const WebSocketClient = websocket.client;

export default class WebSocketConnector {
  constructor(wsBaseUrl) {
    this.client = new WebSocketClient();
    this.wsBaseUrl = wsBaseUrl;
    this.isConnecting = false;
    this.connection = null;
    this.onMessage = null;
    this.onConnected = null;
    this.commandsQueue = [];

    this.client.on('connectFailed', (error) => {
      console.error('Connect Error: ' + error.toString());
      this.isConnecting = false;
    });

    this.client.on('connect', (ws) => {
      this.connection = ws;
      console.log('WebSocket client connected');
      this.isConnecting = false;

      if (this.onConnected) {
        this.onConnected(ws);
      }

      while (this.commandsQueue.length > 0) {
        ws.send(JSON.stringify(this.commandsQueue.pop()));
      }

      ws.on('error', (error) => {
        console.log('WebSocket connection error: ' + error.toString());
      });

      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });

      ws.on('message', function(message) {
        const data = JSON.parse(message.utf8Data);
        console.log('Got message from WebSocket', data);
        if (this.onMessage) {
          this.onMessage(data);
        }
      });
    });
  }

  connect(onMessageCallback = null, onConnectedCallback = null) {
    if (this.connection && this.connection.connected) {
      return;
    }

    if (this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    this.client.connect(this.wsBaseUrl);
    this.onMessage = onMessageCallback;
    this.onConnected = onConnectedCallback;
  }

  isConnected() {
    return this.connection && this.connection.connected;
  };

  send(data) {
    if (this.isConnected()) {
      this.connection.send(JSON.stringify(data));
    } else {
      this.commandsQueue.push(data);
    }
  }
}
