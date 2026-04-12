// src/routes/playableSpeciesAdmin.route.ts

/**
 * Admin routes for playable species.
 *
 * Responsibilities:
 * - protect species admin endpoints
 * - expose browse, create, update, and tag-assignment endpoints
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import {
  createPlayableSpeciesHandler,
  getPlayableSpeciesHandler,
  getPlayableSpeciesTagsHandler,
  updatePlayableSpeciesHandler,
  updatePlayableSpeciesTagsHandler,
  getPlayableSpeciesPassivesHandler,
  updatePlayableSpeciesPassivesHandler,
} from '../controllers/playableSpeciesAdmin.controller.js'

export async function playableSpeciesAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all playable species admin routes.
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
    admin.get('/playable-species', {
      schema: {
        tags: ['Admin'],
        summary: 'Get playable species for admin browse view',
        description:
          'Returns playable species records for the admin dashboard browse table.',
      },
      handler: getPlayableSpeciesHandler,
    })

    /**
     * ---------------------------------------------------------
     * Create
     * ---------------------------------------------------------
     */
    admin.post('/playable-species', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a playable species',
        description:
          'Creates a new playable species record for the admin dashboard.',
      },
      handler: createPlayableSpeciesHandler,
    })

    /**
     * ---------------------------------------------------------
     * Update
     * ---------------------------------------------------------
     */
    admin.patch('/playable-species/:id', {
      schema: {
        tags: ['Admin'],
        summary: 'Update a playable species',
        description:
          'Updates one or more editable fields for a playable species record.',
      },
      handler: updatePlayableSpeciesHandler,
    })

    /**
     * ---------------------------------------------------------
     * Tags
     * ---------------------------------------------------------
     */
    admin.get('/playable-species/:id/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Get assigned tags for a playable species',
        description:
          'Returns the currently assigned playable tags for a specific playable species.',
      },
      handler: getPlayableSpeciesTagsHandler,
    })

    admin.patch('/playable-species/:id/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Update assigned tags for a playable species',
        description:
          'Replaces the currently assigned playable tags for a specific playable species.',
      },
      handler: updatePlayableSpeciesTagsHandler,
    })

    /**
     * ---------------------------------------------------------
     * Passives
     * ---------------------------------------------------------
     */
    admin.get('/playable-species/:id/passives', {
      schema: {
        tags: ['Admin'],
        summary: 'Get assigned passives for a playable species',
        description:
          'Returns the currently assigned playable passives for a specific playable species.',
      },
      handler: getPlayableSpeciesPassivesHandler,
    })

    admin.patch('/playable-species/:id/passives', {
      schema: {
        tags: ['Admin'],
        summary: 'Update assigned passives for a playable species',
        description:
          'Replaces the currently assigned playable passives for a specific playable species.',
      },
      handler: updatePlayableSpeciesPassivesHandler,
    })
  })
}