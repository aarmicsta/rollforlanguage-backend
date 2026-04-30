// src/routes/factionAdmin.route.ts

/**
 * Admin routes for factions.
 *
 * Responsibilities:
 * - protect faction admin endpoints
 * - expose canonical faction browse endpoint
 *
 * Notes:
 * - V1 scope is browse only
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import { getFactions } from '../controllers/factionAdmin.controller.js'

export async function factionAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all faction admin routes.
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
    admin.get('/factions', {
      schema: {
        tags: ['Admin'],
        summary: 'Get factions for admin browse view',
        description:
          'Returns canonical faction records for the admin dashboard browse table.',
      },
      handler: getFactions,
    })
  })
}