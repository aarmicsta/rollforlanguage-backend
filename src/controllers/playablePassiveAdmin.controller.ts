// src/controllers/playablePassiveAdmin.controller.ts

/**
 * Admin controller for playable passives.
 *
 * Responsibilities:
 * - expose admin endpoints for canonical passive operations
 * - delegate logic to service layer
 *
 * Notes:
 * - covers canonical passive definitions only
 * - does NOT manage species/class passive assignments
 */

import type { FastifyReply, FastifyRequest } from 'fastify'

import {
  createPlayablePassiveInDB,
  getPlayablePassivesFromDB,
  updatePlayablePassiveInDB,
} from '../services/playablePassive.service.js'

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayablePassivesController(
  _req: FastifyRequest,
  reply: FastifyReply
) {
  const data = await getPlayablePassivesFromDB()
  return reply.send(data)
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 */

export async function createPlayablePassiveController(
  req: FastifyRequest<{
    Body: {
      displayName: string
      name: string
      slug: string
      description?: string | null
      effectText?: string | null
      effectType?: string | null
      isActive?: boolean
    }
  }>,
  reply: FastifyReply
) {
  const created = await createPlayablePassiveInDB(req.body)

  return reply.send({
    message: 'Playable passive created successfully.',
    data: created,
  })
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */

export async function updatePlayablePassiveController(
  req: FastifyRequest<{
    Params: {
      id: string
    }
    Body: {
      displayName: string
      description?: string | null
      effectText?: string | null
      effectType?: string | null
      isActive?: boolean
      sortOrder?: number
    }
  }>,
  reply: FastifyReply
) {
  const updated = await updatePlayablePassiveInDB(req.params.id, req.body)

  return reply.send({
    message: 'Playable passive updated successfully.',
    data: updated,
  })
}