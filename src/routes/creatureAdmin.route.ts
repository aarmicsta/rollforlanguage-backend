// src/routes/creatureAdmin.route.ts

/**
 * Admin routes for creatures.
 *
 * Responsibilities:
 * - protect creature admin endpoints
 * - expose browse endpoints for canonical creature records
 *
 * Notes:
 * - This first-pass route file is intentionally limited to the
 *   browse/list endpoint only.
 * - Additional endpoints for create, update, tag assignment,
 *   stat assignment, and detail loading can be added later
 *   once the first vertical slice is stable.
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import { 
  getCreatures,
  updateCreature,
} from '../controllers/creatureAdmin.controller.js'

export async function creatureAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all creature admin routes.
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
    admin.get('/creatures', {
      schema: {
        tags: ['Admin'],
        summary: 'Get creatures for admin browse view',
        description:
          'Returns canonical creature records for the admin dashboard browse table.',
      },
      handler: getCreatures,
    })

        /**
     * ---------------------------------------------------------
     * Update
     * ---------------------------------------------------------
     */
    admin.patch('/creatures/:id', {
      schema: {
        tags: ['Admin'],
        summary: 'Update creature',
        description:
          'Updates core scalar fields for a canonical creature record.',
      },
      handler: updateCreature,
    })
  })
}