// src/routes/playableClassAdmin.route.ts

/**
 * Admin routes for playable classes.
 *
 * Responsibilities:
 * - protect class admin endpoints
 * - expose browse, create, update, and tag-assignment endpoints
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import {
  createPlayableClassHandler,
  getPlayableClassesHandler,
  getPlayableClassTagsHandler,
  updatePlayableClassHandler,
  updatePlayableClassTagsHandler,
  getPlayableClassPassivesHandler,
  updatePlayableClassPassivesHandler,
} from '../controllers/playableClassAdmin.controller.js'

export async function playableClassAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all playable class admin routes.
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
    admin.get('/playable-classes', {
      schema: {
        tags: ['Admin'],
        summary: 'Get playable classes for admin browse view',
        description:
          'Returns playable class records for the admin dashboard browse table.',
      },
      handler: getPlayableClassesHandler,
    })

    /**
     * ---------------------------------------------------------
     * Create
     * ---------------------------------------------------------
     */
    admin.post('/playable-classes', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a playable class',
        description:
          'Creates a new playable class record for the admin dashboard.',
      },
      handler: createPlayableClassHandler,
    })

    /**
     * ---------------------------------------------------------
     * Update
     * ---------------------------------------------------------
     */
    admin.patch('/playable-classes/:id', {
      schema: {
        tags: ['Admin'],
        summary: 'Update a playable class',
        description:
          'Updates one or more editable fields for a playable class record.',
      },
      handler: updatePlayableClassHandler,
    })

    /**
     * ---------------------------------------------------------
     * Tags
     * ---------------------------------------------------------
     */
    admin.get('/playable-classes/:id/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Get assigned tags for a playable class',
        description:
          'Returns the currently assigned playable tags for a specific playable class.',
      },
      handler: getPlayableClassTagsHandler,
    })

    admin.patch('/playable-classes/:id/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Update assigned tags for a playable class',
        description:
          'Replaces the currently assigned playable tags for a specific playable class.',
      },
      handler: updatePlayableClassTagsHandler,
    })

    /**
     * ---------------------------------------------------------
     * Passives
     * ---------------------------------------------------------
     */
    admin.get('/playable-classes/:id/passives', {
      schema: {
        tags: ['Admin'],
        summary: 'Get assigned passives for a playable class',
        description:
          'Returns the currently assigned playable passives for a specific playable class.',
      },
      handler: getPlayableClassPassivesHandler,
    })

    admin.patch('/playable-classes/:id/passives', {
      schema: {
        tags: ['Admin'],
        summary: 'Update assigned passives for a playable class',
        description:
          'Replaces the currently assigned playable passives for a specific playable class.',
      },
      handler: updatePlayableClassPassivesHandler,
    })
  })
}

