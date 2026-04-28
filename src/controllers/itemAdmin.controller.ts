// src/controllers/itemAdmin.controller.ts

/**
 * Admin controller for item management.
 *
 * Responsibilities:
 * - handle HTTP requests for item admin endpoints
 * - call the item service layer
 * - translate service results into HTTP responses
 *
 * Notes:
 * - This V1 controller manages canonical item identity,
 *   classification, economy/physical fields, and optional
 *   equipment slot assignment.
 * - Future item systems such as effects, crafting, loot,
 *   inventory, and equipment stats should be added as separate
 *   controller sections/endpoints.
 */

import type { FastifyReply, FastifyRequest } from 'fastify'

import {
  createItemInDB,
  getEquipmentSlotsFromDB,
  getItemEquipmentSlotsFromDB,
  getItemsFromDB,
  getItemTypesFromDB,
  getRarityLevelsFromDB,
  updateItemEquipmentSlotsInDB,
  updateItemInDB,
} from '../services/item.service.js'

/**
 * ---------------------------------------------------------
 * Browse Items
 * ---------------------------------------------------------
 */
export async function getItems(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const items = await getItemsFromDB()

    return reply.send({
      success: true,
      data: items,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch items')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch items',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Create Item
 * ---------------------------------------------------------
 */
export async function createItem(
  request: FastifyRequest<{
    Body: {
      displayName: string
      name: string
      slug: string
      description: string | null
      itemTypeId: string
      rarityLevelId: string
      baseValue: number
      weight: string
      maxStackSize: number
      isActive: boolean
    }
  }>,
  reply: FastifyReply
) {
  try {
    const created = await createItemInDB(request.body)

    return reply.send({
      success: true,
      data: created,
    })
  } catch (error) {
    request.log.error(error, 'Failed to create item')

    return reply.status(500).send({
      success: false,
      message: 'Failed to create item',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Update Item
 * ---------------------------------------------------------
 */
export async function updateItem(
  request: FastifyRequest<{
    Params: { id: string }
    Body: {
      displayName: string
      description: string | null
      itemTypeId: string
      rarityLevelId: string
      baseValue: number
      weight: string
      maxStackSize: number
      isActive: boolean
    }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const updated = await updateItemInDB(id, request.body)

    return reply.send({
      success: true,
      data: updated,
    })
  } catch (error) {
    request.log.error(error, 'Failed to update item')

    return reply.status(500).send({
      success: false,
      message: 'Failed to update item',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Get Item Equipment Slots
 * ---------------------------------------------------------
 */
export async function getItemEquipmentSlots(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const slots = await getItemEquipmentSlotsFromDB(id)

    return reply.send({
      success: true,
      data: slots,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch item equipment slots')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch item equipment slots',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Update Item Equipment Slots
 * ---------------------------------------------------------
 */
export async function updateItemEquipmentSlots(
  request: FastifyRequest<{
    Params: { id: string }
    Body: {
      equipmentSlotIds: string[]
    }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const updated = await updateItemEquipmentSlotsInDB(id, request.body)

    return reply.send({
      success: true,
      data: updated,
    })
  } catch (error) {
    request.log.error(error, 'Failed to update item equipment slots')

    return reply.status(500).send({
      success: false,
      message: 'Failed to update item equipment slots',
    })
  }
}

/**
 * =========================================================
 * Reference Lookups
 * =========================================================
 */

/**
 * ---------------------------------------------------------
 * Get Item Types
 * ---------------------------------------------------------
 */
export async function getItemTypes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const types = await getItemTypesFromDB()

    return reply.send({
      success: true,
      data: types,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch item types')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch item types',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Get Rarity Levels
 * ---------------------------------------------------------
 */
export async function getRarityLevels(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const levels = await getRarityLevelsFromDB()

    return reply.send({
      success: true,
      data: levels,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch rarity levels')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch rarity levels',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Get Equipment Slots
 * ---------------------------------------------------------
 */
export async function getEquipmentSlots(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const slots = await getEquipmentSlotsFromDB()

    return reply.send({
      success: true,
      data: slots,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch equipment slots')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch equipment slots',
    })
  }
}