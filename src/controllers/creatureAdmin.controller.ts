// src/controllers/creatureAdmin.controller.ts

/**
 * Admin controller for creature management.
 *
 * Responsibilities:
 * - handle HTTP requests for creature admin endpoints
 * - call the creature service layer
 * - translate service results into HTTP responses
 *
 * Notes:
 * - This first-pass controller is intentionally limited to the
 *   browse/list endpoint only.
 * - More specific handlers for create, edit, detail loading,
 *   tag assignment, and stat assignment can be added later
 *   once the first vertical slice is stable.
 */

import type { FastifyReply, FastifyRequest } from 'fastify'

import { 
  getCreaturesFromDB,
  updateCreatureInDB,
  getCreatureTagsFromDB,
  updateCreatureTagsInDB,
  getCreatureTypesFromDB,
  getSizeCategoriesFromDB,
} from '../services/creature.service.js'

/**
 * ---------------------------------------------------------
 * Browse Creatures
 * ---------------------------------------------------------
 *
 * Returns the canonical creature records used by the admin
 * browse table.
 */
export async function getCreatures(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const creatures = await getCreaturesFromDB()

    return reply.send({
      success: true,
      data: creatures,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch creatures')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch creatures',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Update Creature
 * ---------------------------------------------------------
 *
 * Updates core scalar creature fields from admin edit modal.
 */
export async function updateCreature(
  request: FastifyRequest<{
    Params: { id: string }
    Body: {
      displayName: string
      description: string | null
      isActive: boolean
    }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const { displayName, description, isActive } = request.body

    const updated = await updateCreatureInDB(id, {
      displayName,
      description,
      isActive,
    })

    return reply.send({
      success: true,
      data: updated,
    })
  } catch (error) {
    request.log.error(error, 'Failed to update creature')

    return reply.status(500).send({
      success: false,
      message: 'Failed to update creature',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Get Creature Tags
 * ---------------------------------------------------------
 *
 * Returns assigned tags for a specific creature.
 */
export async function getCreatureTags(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params

    const tags = await getCreatureTagsFromDB(id)

    return reply.send({
      success: true,
      data: tags,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch creature tags')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch creature tags',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Update Creature Tags
 * ---------------------------------------------------------
 *
 * Replaces all assigned tags for a creature.
 */
export async function updateCreatureTags(
  request: FastifyRequest<{
    Params: { id: string }
    Body: {
      tagIds: string[]
    }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const { tagIds } = request.body

    const updated = await updateCreatureTagsInDB(id, tagIds)

    return reply.send({
      success: true,
      data: updated,
    })
  } catch (error) {
    request.log.error(error, 'Failed to update creature tags')

    return reply.status(500).send({
      success: false,
      message: 'Failed to update creature tags',
    })
  }
}

/**
 * =========================================================
 * Reference Lookups
 * =========================================================
 *
 * Handles HTTP requests for canonical creature reference data.
 *
 * Responsibilities:
 * - return creature type options
 * - return size category options
 *
 * Notes:
 * - mirrors existing admin controller patterns
 * - delegates all data access to the service layer
 * =========================================================
 */

/**
 * ---------------------------------------------------------
 * Get Creature Types
 * ---------------------------------------------------------
 *
 * Returns canonical creature type options for admin forms.
 */
export async function getCreatureTypes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const types = await getCreatureTypesFromDB()

    return reply.send({
      success: true,
      data: types,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch creature types')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch creature types',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Get Size Categories
 * ---------------------------------------------------------
 *
 * Returns canonical size category options for admin forms.
 */
export async function getSizeCategories(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const sizes = await getSizeCategoriesFromDB()

    return reply.send({
      success: true,
      data: sizes,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch size categories')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch size categories',
    })
  }
}