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
  getCreatureTags,
  updateCreatureTags,
  getCreatureTypes,
  getSizeCategories,
  createCreature,
  getCreatureBaseStatsTable,
  getCreatureBaseStats,
  updateCreatureBaseStats,
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

    /**
     * ---------------------------------------------------------
     * Create
     * ---------------------------------------------------------
     */
    admin.post('/creatures', {
      schema: {
        tags: ['Admin'],
        summary: 'Create creature',
        description:
          'Creates a new canonical creature record for the admin dashboard.',
      },
      handler: createCreature,
    })

    /**
     * ---------------------------------------------------------
     * Creature Base Stats
     * ---------------------------------------------------------
     */
    admin.get('/creature-base-stats', {
      schema: {
        tags: ['Admin'],
        summary: 'Get creature base stats table',
        description:
          'Returns creature base stat summary rows for the admin Creature Stats Table.',
      },
      handler: getCreatureBaseStatsTable,
    })

    admin.get('/creatures/:id/base-stats', {
      schema: {
        tags: ['Admin'],
        summary: 'Get creature base stats',
        description:
          'Returns editable base stat values for a selected canonical creature.',
      },
      handler: getCreatureBaseStats,
    })

    admin.patch('/creatures/:id/base-stats', {
      schema: {
        tags: ['Admin'],
        summary: 'Update creature base stats',
        description:
          'Replaces stored base stat values for a selected canonical creature.',
      },
      handler: updateCreatureBaseStats,
    })

        /**
     * ---------------------------------------------------------
     * Get Creature Tags
     * ---------------------------------------------------------
     */
    admin.get('/creatures/:id/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Get creature tags',
        description:
          'Returns assigned tags for a canonical creature record.',
      },
      handler: getCreatureTags,
    })

    /**
     * ---------------------------------------------------------
     * Update Creature Tags
     * ---------------------------------------------------------
     */
    admin.patch('/creatures/:id/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Update creature tags',
        description:
          'Replaces assigned tags for a canonical creature record.',
      },
      handler: updateCreatureTags,
    })

    /**
     * ---------------------------------------------------------
     * Reference Lookups
     * ---------------------------------------------------------
     */
    admin.get('/creature-types', {
      schema: {
        tags: ['Admin'],
        summary: 'Get creature types',
        description:
          'Returns canonical creature type options for admin forms.',
      },
      handler: getCreatureTypes,
    })

    admin.get('/size-categories', {
      schema: {
        tags: ['Admin'],
        summary: 'Get size categories',
        description:
          'Returns canonical size category options for admin forms.',
      },
      handler: getSizeCategories,
    })
  })
}