// src/routes/itemAdmin.route.ts

/**
 * Admin routes for items.
 *
 * Responsibilities:
 * - protect item admin endpoints
 * - expose canonical item CRUD endpoints
 * - expose item equipment slot assignment endpoints
 * - expose item/equipment reference lookup endpoints
 *
 * Notes:
 * - This V1 route file manages canonical item identity,
 *   classification, economy/physical fields, and optional
 *   equipment slot assignment only.
 * - Future item systems such as effects, crafting, loot,
 *   inventory, and equipment stats should be added as separate
 *   endpoint groups.
 */

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import {
  createItem,
  getEquipmentSlots,
  getItemEquipmentSlots,
  getItems,
  getItemTypes,
  getRarityLevels,
  updateItem,
  updateItemEquipmentSlots,
} from '../controllers/itemAdmin.controller.js'

export async function itemAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all item admin routes.
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
    admin.get('/items', {
      schema: {
        tags: ['Admin'],
        summary: 'Get items for admin browse view',
        description:
          'Returns canonical item records for the admin dashboard browse table.',
      },
      handler: getItems,
    })

    /**
     * ---------------------------------------------------------
     * Create
     * ---------------------------------------------------------
     */
    admin.post('/items', {
      schema: {
        tags: ['Admin'],
        summary: 'Create item',
        description:
          'Creates a new canonical item record for the admin dashboard.',
      },
      handler: createItem,
    })

    /**
     * ---------------------------------------------------------
     * Update
     * ---------------------------------------------------------
     */
    admin.patch('/items/:id', {
      schema: {
        tags: ['Admin'],
        summary: 'Update item',
        description:
          'Updates core scalar fields for a canonical item record.',
      },
      handler: updateItem,
    })

    /**
     * ---------------------------------------------------------
     * Item Equipment Slots
     * ---------------------------------------------------------
     */
    admin.get('/items/:id/equipment-slots', {
      schema: {
        tags: ['Admin'],
        summary: 'Get item equipment slots',
        description:
          'Returns assigned equipment slots for a canonical item record.',
      },
      handler: getItemEquipmentSlots,
    })

    admin.patch('/items/:id/equipment-slots', {
      schema: {
        tags: ['Admin'],
        summary: 'Update item equipment slots',
        description:
          'Replaces assigned equipment slots for a canonical item record.',
      },
      handler: updateItemEquipmentSlots,
    })

    /**
     * ---------------------------------------------------------
     * Reference Lookups
     * ---------------------------------------------------------
     */
    admin.get('/item-types', {
      schema: {
        tags: ['Admin'],
        summary: 'Get item types',
        description:
          'Returns canonical item type options for admin item forms.',
      },
      handler: getItemTypes,
    })

    admin.get('/rarity-levels', {
      schema: {
        tags: ['Admin'],
        summary: 'Get rarity levels',
        description:
          'Returns canonical rarity level options for admin item forms.',
      },
      handler: getRarityLevels,
    })

    admin.get('/equipment-slots', {
      schema: {
        tags: ['Admin'],
        summary: 'Get equipment slots',
        description:
          'Returns canonical equipment slot options for admin item forms.',
      },
      handler: getEquipmentSlots,
    })
  })
}