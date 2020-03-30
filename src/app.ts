import { server } from './server';
import { createWebsocketServer } from './websocketServer';

const httpServer = server.listen(3000, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 Server ready at http://localhost:3000`);
  }
});

const websocketServer = createWebsocketServer(httpServer);
