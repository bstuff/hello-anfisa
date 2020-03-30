import _debug from 'debug';
import { Server as HttpServer } from 'http';
import WebSocket, { Server } from 'ws';

const debug = _debug('app:wss');

export const createWebsocketServer = (server: HttpServer) => {
  const websocketServer = new Server({
    server,
  });

  websocketServer.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
      debug(message);
    });
  });

  return websocketServer;
};
