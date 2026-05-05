// src/controllers/factionAdmin.controller.ts

/**
 * Admin controller for faction management.
 *
 * Responsibilities:
 * - handle HTTP requests for faction admin endpoints
 * - call the faction service layer
 * - translate service results into HTTP responses
 *
 * Notes:
 * - V1 scope is browse only
 * - future endpoints (create/update/tags) will be added later
 */

import type { FastifyReply, FastifyRequest } from 'fastify'

import { 
  getFactionsFromDB,
  updateFactionInDB,
  getAlignmentsFromDB,
  createFactionInDB
} from '../services/faction.service.js'

/**
 * ---------------------------------------------------------
 * Browse Factions
 * ---------------------------------------------------------
 */
export async function getFactions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const factions = await getFactionsFromDB()

    return reply.send({
      success: true,
      data: factions,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch factions')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch factions',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Update Faction
 * ---------------------------------------------------------
 */
export async function updateFaction(
  request: FastifyRequest<{
    Params: { id: string }
    Body: {
      displayName: string
      description: string | null
      alignmentId: string | null
      isActive: boolean
    }
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params

    const updated = await updateFactionInDB(id, request.body)

    return reply.send({
      success: true,
      data: updated,
    })
  } catch (error) {
    request.log.error(error, 'Failed to update faction')

    return reply.status(500).send({
      success: false,
      message: 'Failed to update faction',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Create Faction
 * ---------------------------------------------------------
 *
 * Creates a new canonical faction record from the admin
 * create modal payload.
 *
 * Current scope:
 * - displayName
 * - name
 * - slug
 * - description
 * - alignmentId (optional)
 * - isActive
 */
export async function createFaction(
  request: FastifyRequest<{
    Body: {
      displayName: string
      name: string
      slug: string
      description: string | null
      alignmentId: string | null
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
      alignmentId,
      isActive,
    } = request.body

    const created = await createFactionInDB({
      displayName,
      name,
      slug,
      description,
      alignmentId,
      isActive,
    })

    return reply.send({
      success: true,
      data: created,
    })
  } catch (error) {
    request.log.error(error, 'Failed to create faction')

    return reply.status(500).send({
      success: false,
      message: 'Failed to create faction',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Get Alignments
 * ---------------------------------------------------------
 */
export async function getAlignments(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const alignments = await getAlignmentsFromDB()

    return reply.send({
      success: true,
      data: alignments,
    })
  } catch (error) {
    request.log.error(error, 'Failed to fetch alignments')

    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch alignments',
    })
  }
}