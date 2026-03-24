// src/controllers/playableSpeciesAdmin.controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';

export async function getPlayableSpeciesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    return reply.status(200).send({
      message: 'getPlayableSpeciesHandler not yet implemented',
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to fetch playable species.',
    });
  }
}