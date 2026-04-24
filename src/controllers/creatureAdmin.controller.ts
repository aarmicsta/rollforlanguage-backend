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
  createCreatureInDB,
  getCreatureBaseStatsTableFromDB,
  getCreatureBaseStatsFromDB,
  updateCreatureBaseStatsInDB,
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
 * Create Creature
 * ---------------------------------------------------------
 *
 * Creates a new canonical creature record from the admin
 * create modal payload.
 *
 * Current scope:
 * - displayName
 * - name
 * - slug
 * - description
 * - creatureTypeId
 * - sizeCategoryId
 * - isActive
 *
 * Notes:
 * - required classification fields are enforced at create time
 * - optional fields such as intelligence, threat level, and
 *   icon media remain deferred in Create v1
 */
export async function createCreature(
  request: FastifyRequest<{
    Body: {
      displayName: string
      name: string
      slug: string
      description: string | null
      creatureTypeId: string
      sizeCategoryId: string
      isActive: boolean
    }
  }>,
  reply: FastifyReply
) {
  try {
    const {
      displayName,
      name,
      slug,
      description,
      creatureTypeId,
      sizeCategoryId,
      isActive,
    } = request.body

    const created = await createCreatureInDB({
      displayName,
      name,
      slug,
      description,
      creatureTypeId,
      sizeCategoryId,
      isActive,
    })

    return reply.send({
      success: true,
      data: created,
    })
  } catch (error) {
    request.log.error(error, 'Failed to create creature')

    return reply.status(500).send({
      success: false,
      message: 'Failed to create creature',
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

/**
 * =========================================================
 * Creature Base Stats
 * =========================================================
 *
 * Handles HTTP requests for the creature base stat subsystem.
 *
 * Responsibilities:
 * - return creature base stat summary rows for the admin table
 * - return editable base stat values for a selected creature
 * - replace base stat values for a selected creature
 *
 * Notes:
 * - this is the V1 base-stat layer only
 * - future derived stat systems should layer on top of these
 *   values rather than replacing this endpoint contract
 * =========================================================
 */

/**
 * ---------------------------------------------------------
 * Get Creature Base Stats Table
 * ---------------------------------------------------------
 *
 * Returns one summary row per creature for the admin Creature
 * Stats Table management surface.
 */
export async function getCreatureBaseStatsTable(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const rows = await getCreatureBaseStatsTableFromDB()

    return reply.send({
      success: true,
      data: rows,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch creature base stats table')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch creature base stats table',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Get Creature Base Stats
 * ---------------------------------------------------------
 *
 * Returns a complete editable stat list for a selected creature.
 */
export async function getCreatureBaseStats(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params

    const stats = await getCreatureBaseStatsFromDB(id)

    return reply.send({
      success: true,
      data: stats,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch creature base stats')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch creature base stats',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Update Creature Base Stats
 * ---------------------------------------------------------
 *
 * Replaces stored base stat values for a selected creature.
 */
export async function updateCreatureBaseStats(
  request: FastifyRequest<{
    Params: { id: string }
    Body: {
      stats: Array<{
        statId: string
        baseValue: number | null
      }>
    }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const { stats } = request.body

    const updated = await updateCreatureBaseStatsInDB(id, {
      stats,
    })

    return reply.send({
      success: true,
      data: updated,
    })
  } catch (error) {
    request.log.error(error, 'Failed to update creature base stats')

    return reply.status(500).send({
      success: false,
      message: 'Failed to update creature base stats',
    })
  }
}