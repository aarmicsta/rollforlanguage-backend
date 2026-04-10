// src/routes/playableStatAdmin.route.ts

/**
 * Admin routes for playable stats.
 *
 * Responsibilities:
 * * protect playable stat admin endpoints
 * * expose browse, create, and update endpoints
 *
 * Notes:
 * - these routes manage canonical stat definitions
 * - they do NOT manage stat baselines or species/class modifiers
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import {
  createPlayableStatHandler,
  getPlayableStatsHandler,
  updatePlayableStatHandler,
} from '../controllers/playableStatAdmin.controller.js'

export async function playableStatAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all playable stat admin routes.
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

    /**
     * ---------------------------------------------------------
     * Browse
     * ---------------------------------------------------------
     */
    admin.get('/playable-stats', {
      schema: {
        tags: ['Admin'],
        summary: 'Get playable stats for admin browse view',
        description:
          'Returns canonical playable stat definitions for the admin dashboard browse table.',
      },
      handler: getPlayableStatsHandler,
    })

    /**
     * ---------------------------------------------------------
     * Create
     * ---------------------------------------------------------
     */
    admin.post('/playable-stats', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a playable stat',
        description:
          'Creates a new canonical playable stat definition for the admin dashboard.',
      },
      handler: createPlayableStatHandler,
    })

    /**
     * ---------------------------------------------------------
     * Update
     * ---------------------------------------------------------
     */
    admin.patch('/playable-stats/:id', {
      schema: {
        tags: ['Admin'],
        summary: 'Update a playable stat',
        description:
          'Updates one or more editable fields for a canonical playable stat definition.',
      },
      handler: updatePlayableStatHandler,
    })
  })
}