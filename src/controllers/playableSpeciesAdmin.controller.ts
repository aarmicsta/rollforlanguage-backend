// src/controllers/playableSpeciesAdmin.controller.ts

/**
 * Admin controller for playable species.
 *
 * Responsibilities:
 * - return species browse records
 * - create new species records
 * - update scalar species fields
 * - return assigned species tags
 * - replace assigned species tags
 */

import { FastifyReply, FastifyRequest } from 'fastify'

import {
  createPlayableSpeciesInDB,
  getPlayableSpeciesFromDB,
  getPlayableSpeciesTagsFromDB,
  updatePlayableSpeciesInDB,
  updatePlayableSpeciesTagsInDB,
  getPlayableSpeciesPassivesFromDB,
  updatePlayableSpeciesPassivesInDB,
} from '../services/playableSpecies.service.js'

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayableSpeciesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const results = await getPlayableSpeciesFromDB()
    return reply.status(200).send(results)
  } catch (error) {
    request.log.error(error)
    return reply.status(500).send({
      error: 'Failed to fetch playable species.',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 */

export async function createPlayableSpeciesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received POST /admin/playable-species request')

  try {
    const { displayName, name, slug, description, isActive } = request.body as {
      displayName?: string
      name?: string
      slug?: string
      description?: string | null
      isActive?: boolean
    }

    if (!displayName) {
      request.log.warn('Missing displayName in create playable species request')
      return reply.status(400).send({
        error: 'Missing required field: displayName.',
      })
    }

    if (!name) {
      request.log.warn('Missing name in create playable species request')
      return reply.status(400).send({
        error: 'Missing required field: name.',
      })
    }

    if (!slug) {
      request.log.warn('Missing slug in create playable species request')
      return reply.status(400).send({
        error: 'Missing required field: slug.',
      })
    }

    const createdSpecies = await createPlayableSpeciesInDB({
      displayName,
      name,
      slug,
      description: description ?? null,
      isActive: isActive ?? true,
    })

    request.log.info(`Playable species created successfully: ${createdSpecies?.id ?? 'unknown'}`)

    return reply.status(201).send({
      message: 'Playable species created successfully.',
      data: createdSpecies,
    })
  } catch (err) {
    request.log.error(`Error in createPlayableSpeciesHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */

export async function updatePlayableSpeciesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-species/:id request')

  try {
    const { id } = request.params as { id?: string }
    const { displayName, description, isActive } = request.body as {
      displayName?: string
      description?: string | null
      isActive?: boolean
    }

    if (!id) {
      request.log.warn('Missing species id in update request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    if (!displayName) {
      request.log.warn('Missing displayName in update playable species request')
      return reply.status(400).send({
        error: 'Missing required field: displayName.',
      })
    }

    const updatedSpecies = await updatePlayableSpeciesInDB(id, {
      displayName,
      description: description ?? null,
      isActive: isActive ?? false,
    })

    request.log.info(`Playable species updated successfully: ${id}`)

    return reply.status(200).send({
      message: 'Playable species updated successfully.',
      data: updatedSpecies,
    })
  } catch (err) {
    request.log.error(`Error in updatePlayableSpeciesHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

/**
 * ---------------------------------------------------------
 * Tags
 * ---------------------------------------------------------
 */

export async function getPlayableSpeciesTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received GET /admin/playable-species/:id/tags request')

  try {
    const { id } = request.params as { id?: string }

    if (!id) {
      request.log.warn('Missing species id in get playable species tags request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    const tags = await getPlayableSpeciesTagsFromDB(id)

    return reply.status(200).send(tags)
  } catch (err) {
    request.log.error(`Error in getPlayableSpeciesTagsHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

export async function updatePlayableSpeciesTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-species/:id/tags request')

  try {
    const { id } = request.params as { id?: string }
    const { tagIds } = request.body as { tagIds?: string[] }

    if (!id) {
      request.log.warn('Missing species id in update playable species tags request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    if (!Array.isArray(tagIds)) {
      request.log.warn('Missing or invalid tagIds in update playable species tags request')
      return reply.status(400).send({
        error: 'Missing required field: tagIds.',
      })
    }

    const updatedTags = await updatePlayableSpeciesTagsInDB(id, tagIds)

    request.log.info(`Playable species tags updated successfully: ${id}`)

    return reply.status(200).send({
      message: 'Playable species tags updated successfully.',
      data: updatedTags,
    })
  } catch (err) {
    request.log.error(`Error in updatePlayableSpeciesTagsHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

/**
 * ---------------------------------------------------------
 * Passives
 * ---------------------------------------------------------
 */

export async function getPlayableSpeciesPassivesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received GET /admin/playable-species/:id/passives request')

  try {
    const { id } = request.params as { id?: string }

    if (!id) {
      request.log.warn('Missing species id in get playable species passives request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    const passives = await getPlayableSpeciesPassivesFromDB(id)

    return reply.status(200).send(passives)
  } catch (err) {
    request.log.error(`Error in getPlayableSpeciesPassivesHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

export async function updatePlayableSpeciesPassivesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-species/:id/passives request')

  try {
    const { id } = request.params as { id?: string }
    const { passiveIds } = request.body as { passiveIds?: string[] }

    if (!id) {
      request.log.warn('Missing species id in update playable species passives request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    if (!Array.isArray(passiveIds)) {
      request.log.warn('Missing or invalid passiveIds in update playable species passives request')
      return reply.status(400).send({
        error: 'Missing required field: passiveIds.',
      })
    }

    const updatedPassives = await updatePlayableSpeciesPassivesInDB(
      id,
      passiveIds
    )

    request.log.info(`Playable species passives updated successfully: ${id}`)

    return reply.status(200).send({
      message: 'Playable species passives updated successfully.',
      data: updatedPassives,
    })
  } catch (err) {
    request.log.error(`Error in updatePlayableSpeciesPassivesHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}