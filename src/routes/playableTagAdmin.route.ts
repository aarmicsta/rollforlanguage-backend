// src/routes/playableTagAdmin.route.ts

/**
 * Admin routes for playable tags.
 *
 * Responsibilities:
 * - protect tag admin endpoints
 * - expose canonical tag definitions for admin UIs
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import { getPlayableTagsHandler } from '../controllers/playableTagAdmin.controller.js'

export async function playableTagAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all playable tag admin routes.
     *
     * Requirements:
     * - valid JWT
     * - `manage_users` permission
     */
    admin.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        return reply.status(401).send({ error: 'Unauthorized' })
      }

      const hasManageUsers = request.hasPermission('manage_users')

      if (!hasManageUsers) {
        return reply.status(403).send({ error: 'Forbidden' })
      }
    })

    admin.get('/playable/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Get all playable tags',
        description:
          'Returns all canonical playable tag definitions for admin assignment and management UIs.',
      },
      handler: getPlayableTagsHandler,
    })
  })
}