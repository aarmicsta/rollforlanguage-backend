// src/controllers/playableStatAdmin.controller.ts

/**
 * Admin controller for playable stats.
 *
 * Responsibilities:
 * - return playable stat browse records
 * - create new playable stat records
 * - update scalar playable stat fields
 *
 * Notes:
 * - this controller manages canonical stat definitions
 * - it does NOT manage stat baselines or species/class modifiers
 */

import { FastifyReply, FastifyRequest } from 'fastify'

import {
  createPlayableStatInDB,
  getPlayableStatsFromDB,
  updatePlayableStatInDB,
} from '../services/playableStat.service.js'

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayableStatsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const results = await getPlayableStatsFromDB()
    return reply.status(200).send(results)
  } catch (error) {
    request.log.error(error)
    return reply.status(500).send({
      error: 'Failed to fetch playable stats.',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 */

export async function createPlayableStatHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received POST /admin/playable-stats request')

  try {
    const { displayName, name, slug, description, isActive } = request.body as {
      displayName?: string
      name?: string
      slug?: string
      description?: string | null
      isActive?: boolean
    }

    if (!displayName) {
      request.log.warn('Missing displayName in create playable stat request')
      return reply.status(400).send({
        error: 'Missing required field: displayName.',
      })
    }

    if (!name) {
      request.log.warn('Missing name in create playable stat request')
      return reply.status(400).send({
        error: 'Missing required field: name.',
      })
    }

    if (!slug) {
      request.log.warn('Missing slug in create playable stat request')
      return reply.status(400).send({
        error: 'Missing required field: slug.',
      })
    }

    const createdStat = await createPlayableStatInDB({
      displayName,
      name,
      slug,
      description: description ?? null,
      isActive: isActive ?? true,
    })

    request.log.info(`Playable stat created successfully: ${createdStat?.id ?? 'unknown'}`)

    return reply.status(201).send({
      message: 'Playable stat created successfully.',
      data: createdStat,
    })
  } catch (err) {
    request.log.error(`Error in createPlayableStatHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */

export async function updatePlayableStatHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-stats/:id request')

  try {
    const { id } = request.params as { id?: string }
    const { displayName, description, isActive, sortOrder } = request.body as {
      displayName?: string
      description?: string | null
      isActive?: boolean
      sortOrder?: number
    }

    if (!id) {
      request.log.warn('Missing stat id in update request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    if (!displayName) {
      request.log.warn('Missing displayName in update playable stat request')
      return reply.status(400).send({
        error: 'Missing required field: displayName.',
      })
    }

    const updatedStat = await updatePlayableStatInDB(id, {
      displayName,
      description: description ?? null,
      isActive: isActive ?? false,
      sortOrder,
    })

    request.log.info(`Playable stat updated successfully: ${id}`)

    return reply.status(200).send({
      message: 'Playable stat updated successfully.',
      data: updatedStat,
    })
  } catch (err) {
    request.log.error(`Error in updatePlayableStatHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}