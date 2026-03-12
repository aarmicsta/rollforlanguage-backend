// src/server/ts

import { env } from './config/env';
import app from './app';
import { Server as SocketIOServer } from 'socket.io';

const PORT = Number(env.PORT) || 3000;

const start = async () => {
  try {
    const address = await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info(`🚀 Fastify running at ${address}`);

    const io = new SocketIOServer(app.server, {
      cors: {
        origin: '*', // ⚠️ tighten this for production!
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      app.log.info(`🔌 Socket connected: ${socket.id}`);

      socket.on('disconnect', () => {
        app.log.info(`❌ Socket disconnected: ${socket.id}`);
      });
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
