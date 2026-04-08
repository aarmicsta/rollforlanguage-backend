// src/plugins/jwt.plugin.ts

/**
 * JWT authentication plugin.
 *
 * Responsibilities:
 * - register Fastify JWT plugin
 * - expose `fastify.authenticate` decorator for route protection
 *
 * Notes:
 * - `request.jwtVerify()` attaches the decoded payload to `request.user`
 * - fallback secret should only be used in development
 */

import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { env } from '../config/env.js'

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    // Fallback is dev-only safety; production should always provide JWT_SECRET
    secret: env.JWT_SECRET || 'supersecretkey',
  })

  /**
   * Route guard for authenticated endpoints.
   *
   * Usage:
   * - add `preHandler: fastify.authenticate` to protected routes
   */
  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify()
      } catch (err) {
        request.log.error('JWT verification failed:', err)
        reply.status(401).send({ error: 'Unauthorized' })
      }
    }
  )
})