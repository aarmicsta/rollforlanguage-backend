// src/controllers/playableSpeciesAdmin.controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { getPlayableSpeciesFromDB } from '../services/playableSpecies.service';

export async function getPlayableSpeciesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const results = await getPlayableSpeciesFromDB();
    return reply.status(200).send(results);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to fetch playable species.',
    });
  }
}