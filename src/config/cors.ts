// src/config/cors.ts

import { FastifyCorsOptions } from '@fastify/cors'

/**
 * Allowed origins for CORS.
 *
 * Expand as needed for additional environments (staging, admin tools, etc.).
 */
const allowedOrigins: string[] = [
  'http://localhost:5173', // Local Vite dev
  'https://www.rollforlanguage.com', // Production frontend
  'https://bug-free-parakeet-x5p69xpg56qvfvvx5-4000.app.github.dev', // Codespaces (frontend)
  'https://bug-free-parakeet-x5p69xpg56qvfvvx5-4001.app.github.dev',
]

/**
 * Fastify CORS configuration.
 *
 * Notes:
 * - Allows requests with no origin (e.g., server-to-server, curl)
 * - Logs decisions for debugging (can be reduced/removed in production)
 */
export const corsOptions: FastifyCorsOptions = {
  origin: (origin, cb) => {
    // Debug logging — consider reducing verbosity in production
    console.log(`[CORS] Incoming origin: ${origin}`)

    if (!origin) {
      console.log('[CORS] No origin → allowing request')
      cb(null, true)
    } else if (allowedOrigins.includes(origin)) {
      console.log(`[CORS] Allowed origin: ${origin}`)
      cb(null, true)
    } else {
      console.warn(`[CORS] Blocked origin: ${origin}`)
      cb(new Error(`Not allowed by CORS: ${origin}`), false)
    }
  },

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
  credentials: true,
  maxAge: 86400, // Cache preflight for 1 day
  preflightContinue: false, // Let Fastify handle OPTIONS automatically
}