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

import { getCreaturesFromDB } from '../services/creature.service.js'

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