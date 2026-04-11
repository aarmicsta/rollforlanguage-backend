// src/routes/playablePassiveAdmin.route.ts

/**
 * Admin routes for playable passives.
 *
 * Responsibilities:
 * - protect playable passive admin endpoints
 * - expose canonical passive definition endpoints
 *
 * Notes:
 * - these routes manage canonical passive definitions only
 * - they do NOT manage species/class passive assignments
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import {
  createPlayablePassiveController,
  getPlayablePassivesController,
  updatePlayablePassiveController,
} from '../controllers/playablePassiveAdmin.controller.js'

export async function playablePassiveAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all playable passive admin routes.
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
    admin.get('/playable-passives', {
      schema: {
        tags: ['Admin'],
        summary: 'Get all playable passives',
        description:
          'Returns canonical playable passive definitions for admin management UIs.',
      },
      handler: getPlayablePassivesController,
    })

    /**
     * ---------------------------------------------------------
     * Create
     * ---------------------------------------------------------
     */
    admin.post('/playable-passives', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a playable passive',
        description:
          'Creates a new canonical playable passive definition.',
      },
      handler: createPlayablePassiveController,
    })

    /**
     * ---------------------------------------------------------
     * Update
     * ---------------------------------------------------------
     */
    admin.patch('/playable-passives/:id', {
      schema: {
        tags: ['Admin'],
        summary: 'Update a playable passive',
        description:
          'Updates an existing canonical playable passive definition.',
      },
      handler: updatePlayablePassiveController,
    })
  })
}