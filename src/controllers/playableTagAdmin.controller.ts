// src/controllers/playableTagAdmin.controller.ts

/**
 * Admin controller for playable tags.
 *
 * Responsibilities:
 * - return canonical playable tag definitions
 * - used for admin selection UIs (species/class assignment)
 *
 * Notes:
 * - does NOT return assignment data (species/class relationships)
 */

import { FastifyReply, FastifyRequest } from 'fastify'

import { getPlayableTagsFromDB } from '../services/playableTag.service.js'

export async function getPlayableTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received GET /admin/playable/tags request')

  try {
    const tags = await getPlayableTagsFromDB()
    return reply.status(200).send(tags)
  } catch (err) {
    request.log.error(`Error in getPlayableTagsHandler: ${err}`)
    return reply.status(500).send({ error: 'Internal server error.' })
  }
}