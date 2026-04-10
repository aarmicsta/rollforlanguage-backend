// src/routes/playableStatModifierAdmin.route.ts

/**
 * Admin routes for playable stat modifiers.
 *
 * Responsibilities:
 * - protect playable stat modifier admin endpoints
 * - expose browse, create, and update endpoints
 *
 * Notes:
 * - these routes manage stat baselines and species/class stat modifiers
 * - they do NOT manage canonical stat definitions themselves
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import {
  createPlayableClassStatModifierController,
  createPlayableSpeciesStatModifierController,
  createPlayableStatBaselineController,
  getPlayableStatModifiersController,
  updatePlayableClassStatModifierController,
  updatePlayableSpeciesStatModifierController,
  updatePlayableStatBaselineController,
} from '../controllers/playableStatModifierAdmin.controller.js'

export async function playableStatModifierAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all playable stat modifier admin routes.
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
    admin.get('/playable-stat-modifiers', {
      schema: {
        tags: ['Admin'],
        summary: 'Get playable stat modifiers for admin browse view',
        description:
          'Returns unified admin-facing rows for stat baselines and species/class stat modifiers.',
      },
      handler: getPlayableStatModifiersController,
    })

    /**
     * ---------------------------------------------------------
     * Create: Baseline
     * ---------------------------------------------------------
     */
    admin.post('/playable-stat-modifiers/baselines', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a stat baseline',
        description:
          'Creates a universal baseline value for a canonical playable stat.',
      },
      handler: createPlayableStatBaselineController,
    })

    /**
     * ---------------------------------------------------------
     * Create: Species Modifier
     * ---------------------------------------------------------
     */
    admin.post('/playable-stat-modifiers/species', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a species stat modifier',
        description:
          'Creates a species-specific stat modifier relative to the universal stat baseline.',
      },
      handler: createPlayableSpeciesStatModifierController,
    })

    /**
     * ---------------------------------------------------------
     * Create: Class Modifier
     * ---------------------------------------------------------
     */
    admin.post('/playable-stat-modifiers/classes', {
      schema: {
        tags: ['Admin'],
        summary: 'Create a class stat modifier',
        description:
          'Creates a class-specific stat modifier relative to the universal stat baseline.',
      },
      handler: createPlayableClassStatModifierController,
    })

    /**
     * ---------------------------------------------------------
     * Update: Baseline
     * ---------------------------------------------------------
     */
    admin.patch('/playable-stat-modifiers/baselines/:statId', {
      schema: {
        tags: ['Admin'],
        summary: 'Update a stat baseline',
        description:
          'Updates the universal baseline value for a canonical playable stat.',
      },
      handler: updatePlayableStatBaselineController,
    })

    /**
     * ---------------------------------------------------------
     * Update: Species Modifier
     * ---------------------------------------------------------
     */
    admin.patch('/playable-stat-modifiers/species/:speciesId/:statId', {
      schema: {
        tags: ['Admin'],
        summary: 'Update a species stat modifier',
        description:
          'Updates a species-specific stat modifier identified by species and stat.',
      },
      handler: updatePlayableSpeciesStatModifierController,
    })

    /**
     * ---------------------------------------------------------
     * Update: Class Modifier
     * ---------------------------------------------------------
     */
    admin.patch('/playable-stat-modifiers/classes/:classId/:statId', {
      schema: {
        tags: ['Admin'],
        summary: 'Update a class stat modifier',
        description:
          'Updates a class-specific stat modifier identified by class and stat.',
      },
      handler: updatePlayableClassStatModifierController,
    })
  })
}