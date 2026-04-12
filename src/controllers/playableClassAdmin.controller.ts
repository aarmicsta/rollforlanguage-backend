// src/controllers/playableClassAdmin.controller.ts

/**
 * Admin controller for playable classes.
 *
 * Responsibilities:
 * - return class browse records
 * - create new class records
 * - update scalar class fields
 * - return assigned class tags
 * - replace assigned class tags
 */

import { FastifyReply, FastifyRequest } from 'fastify'

import {
  createPlayableClassInDB,
  getPlayableClassesFromDB,
  getPlayableClassTagsFromDB,
  updatePlayableClassInDB,
  updatePlayableClassTagsInDB,
  getPlayableClassPassivesFromDB,
  updatePlayableClassPassivesInDB,
} from '../services/playableClass.service.js'

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayableClassesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const results = await getPlayableClassesFromDB()
    return reply.status(200).send(results)
  } catch (error) {
    request.log.error(error)
    return reply.status(500).send({
      error: 'Failed to fetch playable classes.',
    })
  }
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 */

export async function createPlayableClassHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received POST /admin/playable-classes request')

  try {
    const { displayName, name, slug, description, isActive } = request.body as {
      displayName?: string
      name?: string
      slug?: string
      description?: string | null
      isActive?: boolean
    }

    if (!displayName) {
      request.log.warn('Missing displayName in create playable class request')
      return reply.status(400).send({
        error: 'Missing required field: displayName.',
      })
    }

    if (!name) {
      request.log.warn('Missing name in create playable class request')
      return reply.status(400).send({
        error: 'Missing required field: name.',
      })
    }

    if (!slug) {
      request.log.warn('Missing slug in create playable class request')
      return reply.status(400).send({
        error: 'Missing required field: slug.',
      })
    }

    const createdClass = await createPlayableClassInDB({
      displayName,
      name,
      slug,
      description: description ?? null,
      isActive: isActive ?? true,
    })

    request.log.info(`Playable class created successfully: ${createdClass?.id ?? 'unknown'}`)

    return reply.status(201).send({
      message: 'Playable class created successfully.',
      data: createdClass,
    })
  } catch (err) {
    request.log.error(`Error in createPlayableClassHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */

export async function updatePlayableClassHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-classes/:id request')

  try {
    const { id } = request.params as { id?: string }
    const { displayName, description, isActive } = request.body as {
      displayName?: string
      description?: string | null
      isActive?: boolean
    }

    if (!id) {
      request.log.warn('Missing class id in update request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    if (!displayName) {
      request.log.warn('Missing displayName in update playable class request')
      return reply.status(400).send({
        error: 'Missing required field: displayName.',
      })
    }

    const updatedClass = await updatePlayableClassInDB(id, {
      displayName,
      description: description ?? null,
      isActive: isActive ?? false,
    })

    request.log.info(`Playable class updated successfully: ${id}`)

    return reply.status(200).send({
      message: 'Playable class updated successfully.',
      data: updatedClass,
    })
  } catch (err) {
    request.log.error(`Error in updatePlayableClassHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

/**
 * ---------------------------------------------------------
 * Tags
 * ---------------------------------------------------------
 */

export async function getPlayableClassTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received GET /admin/playable-classes/:id/tags request')

  try {
    const { id } = request.params as { id?: string }

    if (!id) {
      request.log.warn('Missing class id in get playable class tags request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    const tags = await getPlayableClassTagsFromDB(id)

    return reply.status(200).send(tags)
  } catch (err) {
    request.log.error(`Error in getPlayableClassTagsHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

export async function updatePlayableClassTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-classes/:id/tags request')

  try {
    const { id } = request.params as { id?: string }
    const { tagIds } = request.body as { tagIds?: string[] }

    if (!id) {
      request.log.warn('Missing class id in update playable class tags request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    if (!Array.isArray(tagIds)) {
      request.log.warn('Missing or invalid tagIds in update playable class tags request')
      return reply.status(400).send({
        error: 'Missing required field: tagIds.',
      })
    }

    const updatedTags = await updatePlayableClassTagsInDB(id, tagIds)

    request.log.info(`Playable class tags updated successfully: ${id}`)

    return reply.status(200).send({
      message: 'Playable class tags updated successfully.',
      data: updatedTags,
    })
  } catch (err) {
    request.log.error(`Error in updatePlayableClassTagsHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

/**
 * ---------------------------------------------------------
 * Passives
 * ---------------------------------------------------------
 */

export async function getPlayableClassPassivesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received GET /admin/playable-classes/:id/passives request')

  try {
    const { id } = request.params as { id?: string }

    if (!id) {
      request.log.warn('Missing class id in get playable class passives request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    const passives = await getPlayableClassPassivesFromDB(id)

    return reply.status(200).send(passives)
  } catch (err) {
    request.log.error(`Error in getPlayableClassPassivesHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}

export async function updatePlayableClassPassivesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-classes/:id/passives request')

  try {
    const { id } = request.params as { id?: string }
    const { passiveIds } = request.body as { passiveIds?: string[] }

    if (!id) {
      request.log.warn('Missing class id in update playable class passives request')
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      })
    }

    if (!Array.isArray(passiveIds)) {
      request.log.warn('Missing or invalid passiveIds in update playable class passives request')
      return reply.status(400).send({
        error: 'Missing required field: passiveIds.',
      })
    }

    const updatedPassives = await updatePlayableClassPassivesInDB(id, passiveIds)

    request.log.info(`Playable class passives updated successfully: ${id}`)

    return reply.status(200).send({
      message: 'Playable class passives updated successfully.',
      data: updatedPassives,
    })
  } catch (err) {
    request.log.error(`Error in updatePlayableClassPassivesHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}