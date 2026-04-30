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

import { getFactionsFromDB } from '../services/faction.service.js'

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