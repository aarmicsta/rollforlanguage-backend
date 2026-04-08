// src/plugins/rateLimit.plugin.ts

/**
 * Global rate limiting plugin.
 *
 * Responsibilities:
 * - protect the API from excessive request rates
 * - apply limits globally across all routes
 *
 * Notes:
 * - `allowList` can be used to bypass limits (e.g., internal services)
 * - `ban` temporarily blocks repeated offenders
 */

import fp from 'fastify-plugin'
import rateLimit from '@fastify/rate-limit'
import { FastifyInstance } from 'fastify'

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(rateLimit, {
    global: true,
    max: 100, // Max requests per time window
    timeWindow: '1 minute',

    allowList: [], // Add IPs here to bypass rate limiting
    ban: 2, // Temporarily block after X violations

    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },

    /**
     * Custom response when rate limit is exceeded.
     */
    errorResponseBuilder: function () {
      return {
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please wait before retrying.',
        statusCode: 429,
      }
    },
  })
})