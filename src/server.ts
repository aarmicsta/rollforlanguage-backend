// src/server.ts

/**
 * Backend runtime entrypoint.
 *
 * Responsibilities:
 * - start the Fastify application server
 * - attach Socket.IO to the underlying HTTP server
 * - log startup and socket lifecycle events
 *
 * Notes:
 * - `app.ts` is responsible for application composition and route/plugin registration
 * - this file is responsible for runtime startup only
 */

import { Server as SocketIOServer } from 'socket.io'
import { env } from './config/env.js'
import app from './app.js'

const PORT = Number(env.PORT) || 3000

/**
 * Starts the Fastify server and attaches Socket.IO to the
 * active underlying HTTP server instance.
 */
const start = async (): Promise<void> => {
  try {
    const address = await app.listen({ port: PORT, host: '0.0.0.0' })
    app.log.info(`🚀 Fastify running at ${address}`)

    const io = new SocketIOServer(app.server, {
      cors: {
        // Development-friendly default.
        // Production should restrict this to explicit trusted origins.
        origin: '*',
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      app.log.info(`🔌 Socket connected: ${socket.id}`)

      socket.on('disconnect', () => {
        app.log.info(`❌ Socket disconnected: ${socket.id}`)
      })
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

void start()