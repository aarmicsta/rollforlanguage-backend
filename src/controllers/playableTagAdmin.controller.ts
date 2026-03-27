// src/controllers/playableTagAdmin.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify'
import { getPlayableTagsFromDB } from '../services/playableTag.service'

/**
 * ---------------------------------------------------------
 * getPlayableTagsHandler
 * ---------------------------------------------------------
 *
 * Returns all canonical playable tag definitions for use in
 * admin selection UIs (species/class assignment).
 *
 * This endpoint does NOT return species-specific assignments.
 */
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