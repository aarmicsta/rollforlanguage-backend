// src/controllers/playablePassiveAssignmentAdmin.controller.ts

/**
 * Admin controller for playable passive assignments.
 *
 * Responsibilities:
 * - expose admin endpoints for passive assignment operations
 * - delegate logic to service layer
 *
 * Notes:
 * - covers:
 *   - species passive assignments
 *   - class passive assignments
 * - does NOT manage canonical passive definitions
 */

import type { FastifyReply, FastifyRequest } from 'fastify'

import {
  createPlayableClassPassiveAssignmentInDB,
  createPlayableSpeciesPassiveAssignmentInDB,
  deletePlayableClassPassiveAssignmentInDB,
  deletePlayableSpeciesPassiveAssignmentInDB,
  getPlayablePassiveAssignmentsFromDB,
} from '../services/playablePassiveAssignment.service.js'

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayablePassiveAssignmentsController(
  _req: FastifyRequest,
  reply: FastifyReply
) {
  const data = await getPlayablePassiveAssignmentsFromDB()
  return reply.send(data)
}

/**
 * ---------------------------------------------------------
 * Create: Species Assignment
 * ---------------------------------------------------------
 */

export async function createPlayableSpeciesPassiveAssignmentController(
  req: FastifyRequest<{
    Body: {
      speciesId: string
      passiveId: string
    }
  }>,
  reply: FastifyReply
) {
  const created = await createPlayableSpeciesPassiveAssignmentInDB(req.body)

  return reply.send({
    message: 'Species passive assignment created successfully.',
    data: created,
  })
}

/**
 * ---------------------------------------------------------
 * Create: Class Assignment
 * ---------------------------------------------------------
 */

export async function createPlayableClassPassiveAssignmentController(
  req: FastifyRequest<{
    Body: {
      classId: string
      passiveId: string
    }
  }>,
  reply: FastifyReply
) {
  const created = await createPlayableClassPassiveAssignmentInDB(req.body)

  return reply.send({
    message: 'Class passive assignment created successfully.',
    data: created,
  })
}

/**
 * ---------------------------------------------------------
 * Delete: Species Assignment
 * ---------------------------------------------------------
 */

export async function deletePlayableSpeciesPassiveAssignmentController(
  req: FastifyRequest<{
    Params: {
      speciesId: string
      passiveId: string
    }
  }>,
  reply: FastifyReply
) {
  await deletePlayableSpeciesPassiveAssignmentInDB(
    req.params.speciesId,
    req.params.passiveId
  )

  return reply.send({
    message: 'Species passive assignment deleted successfully.',
  })
}

/**
 * ---------------------------------------------------------
 * Delete: Class Assignment
 * ---------------------------------------------------------
 */

export async function deletePlayableClassPassiveAssignmentController(
  req: FastifyRequest<{
    Params: {
      classId: string
      passiveId: string
    }
  }>,
  reply: FastifyReply
) {
  await deletePlayableClassPassiveAssignmentInDB(
    req.params.classId,
    req.params.passiveId
  )

  return reply.send({
    message: 'Class passive assignment deleted successfully.',
  })
}