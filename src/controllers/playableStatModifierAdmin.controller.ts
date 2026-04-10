// src/controllers/playableStatModifierAdmin.controller.ts

/**
 * Admin controller for playable stat modifiers.
 *
 * Responsibilities:
 * - expose admin endpoints for stat modifier operations
 * - delegate logic to service layer
 *
 * Notes:
 * - covers:
 *   - stat baselines
 *   - species stat modifiers
 *   - class stat modifiers
 */

import type { FastifyReply, FastifyRequest } from 'fastify'

import {
  createPlayableClassStatModifierInDB,
  createPlayableSpeciesStatModifierInDB,
  createPlayableStatBaselineInDB,
  getPlayableStatModifiersFromDB,
  updatePlayableClassStatModifierInDB,
  updatePlayableSpeciesStatModifierInDB,
  updatePlayableStatBaselineInDB,
} from '../services/playableStatModifier.service.js'

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayableStatModifiersController(
  _req: FastifyRequest,
  reply: FastifyReply
) {
  const data = await getPlayableStatModifiersFromDB()
  return reply.send(data)
}

/**
 * ---------------------------------------------------------
 * Create: Baseline
 * ---------------------------------------------------------
 */

export async function createPlayableStatBaselineController(
  req: FastifyRequest<{
    Body: {
      statId: string
      baseValue: number
    }
  }>,
  reply: FastifyReply
) {
  const created = await createPlayableStatBaselineInDB(req.body)

  return reply.send({
    message: 'Stat baseline created successfully.',
    data: created,
  })
}

/**
 * ---------------------------------------------------------
 * Create: Species Modifier
 * ---------------------------------------------------------
 */

export async function createPlayableSpeciesStatModifierController(
  req: FastifyRequest<{
    Body: {
      speciesId: string
      statId: string
      modifierValue: number
    }
  }>,
  reply: FastifyReply
) {
  const created = await createPlayableSpeciesStatModifierInDB(req.body)

  return reply.send({
    message: 'Species stat modifier created successfully.',
    data: created,
  })
}

/**
 * ---------------------------------------------------------
 * Create: Class Modifier
 * ---------------------------------------------------------
 */

export async function createPlayableClassStatModifierController(
  req: FastifyRequest<{
    Body: {
      classId: string
      statId: string
      modifierValue: number
    }
  }>,
  reply: FastifyReply
) {
  const created = await createPlayableClassStatModifierInDB(req.body)

  return reply.send({
    message: 'Class stat modifier created successfully.',
    data: created,
  })
}

/**
 * ---------------------------------------------------------
 * Update: Baseline
 * ---------------------------------------------------------
 */

export async function updatePlayableStatBaselineController(
  req: FastifyRequest<{
    Params: {
      statId: string
    }
    Body: {
      baseValue: number
    }
  }>,
  reply: FastifyReply
) {
  const updated = await updatePlayableStatBaselineInDB(
    req.params.statId,
    req.body
  )

  return reply.send({
    message: 'Stat baseline updated successfully.',
    data: updated,
  })
}

/**
 * ---------------------------------------------------------
 * Update: Species Modifier
 * ---------------------------------------------------------
 */

export async function updatePlayableSpeciesStatModifierController(
  req: FastifyRequest<{
    Params: {
      speciesId: string
      statId: string
    }
    Body: {
      modifierValue: number
    }
  }>,
  reply: FastifyReply
) {
  const updated = await updatePlayableSpeciesStatModifierInDB(
    req.params.speciesId,
    req.params.statId,
    req.body
  )

  return reply.send({
    message: 'Species stat modifier updated successfully.',
    data: updated,
  })
}

/**
 * ---------------------------------------------------------
 * Update: Class Modifier
 * ---------------------------------------------------------
 */

export async function updatePlayableClassStatModifierController(
  req: FastifyRequest<{
    Params: {
      classId: string
      statId: string
    }
    Body: {
      modifierValue: number
    }
  }>,
  reply: FastifyReply
) {
  const updated = await updatePlayableClassStatModifierInDB(
    req.params.classId,
    req.params.statId,
    req.body
  )

  return reply.send({
    message: 'Class stat modifier updated successfully.',
    data: updated,
  })
}