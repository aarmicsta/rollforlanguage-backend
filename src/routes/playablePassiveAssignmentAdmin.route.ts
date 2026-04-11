// src/routes/playablePassiveAssignmentAdmin.route.ts

/**
 * Admin routes for playable passive assignments.
 *
 * Responsibilities:
 * - protect playable passive assignment admin endpoints
 * - expose browse, create, and delete endpoints
 *
 * Notes:
 * - these routes manage species/class passive assignments
 * - they do NOT manage canonical passive definitions themselves
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import {
  createPlayableClassPassiveAssignmentController,
  createPlayableSpeciesPassiveAssignmentController,
  deletePlayableClassPassiveAssignmentController,
  deletePlayableSpeciesPassiveAssignmentController,
  getPlayablePassiveAssignmentsController,
} from '../controllers/playablePassiveAssignmentAdmin.controller.js'

export async function playablePassiveAssignmentAdminRoutes(
  app: FastifyInstance
) {
  app.register(async function (admin) {
    /**
     * Protect all playable passive assignment admin routes.
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
    admin.get('/playable-passive-assignments', {
      schema: {
        tags: ['Admin'],
        summary: 'Get playable passive assignments for admin browse view',
        description:
          'Returns unified admin-facing rows for species and class passive assignments.',
      },
      handler: getPlayablePassiveAssignmentsController,
    })

    /**
     * ---------------------------------------------------------
     * Create: Species Assignment
     * ---------------------------------------------------------
     */
    admin.post('/playable-passive-assignments/species', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a species passive assignment',
        description:
          'Creates a species-to-passive assignment using a canonical playable passive.',
      },
      handler: createPlayableSpeciesPassiveAssignmentController,
    })

    /**
     * ---------------------------------------------------------
     * Create: Class Assignment
     * ---------------------------------------------------------
     */
    admin.post('/playable-passive-assignments/classes', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a class passive assignment',
        description:
          'Creates a class-to-passive assignment using a canonical playable passive.',
      },
      handler: createPlayableClassPassiveAssignmentController,
    })

    /**
     * ---------------------------------------------------------
     * Delete: Species Assignment
     * ---------------------------------------------------------
     */
    admin.delete('/playable-passive-assignments/species/:speciesId/:passiveId', {
      schema: {
        tags: ['Admin'],
        summary: 'Delete a species passive assignment',
        description:
          'Deletes a species-to-passive assignment identified by species and passive.',
      },
      handler: deletePlayableSpeciesPassiveAssignmentController,
    })

    /**
     * ---------------------------------------------------------
     * Delete: Class Assignment
     * ---------------------------------------------------------
     */
    admin.delete('/playable-passive-assignments/classes/:classId/:passiveId', {
      schema: {
        tags: ['Admin'],
        summary: 'Delete a class passive assignment',
        description:
          'Deletes a class-to-passive assignment identified by class and passive.',
      },
      handler: deletePlayableClassPassiveAssignmentController,
    })
  })
}