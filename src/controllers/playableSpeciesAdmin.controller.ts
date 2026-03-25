// src/controllers/playableSpeciesAdmin.controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { 
  getPlayableSpeciesFromDB,
  updatePlayableSpeciesInDB
 } from '../services/playableSpecies.service';


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

export async function updatePlayableSpeciesHandler(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('Received PATCH /admin/playable-species/:id request');

  try {
    const { id } = request.params as { id?: string };
    const { displayName } = request.body as {
      displayName?: string;
    };

    if (!id) {
      request.log.warn('Missing species id in update request');
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      });
    }

    if (!displayName) {
      request.log.warn('Missing displayName in update playable species request');
      return reply.status(400).send({
        error: 'Missing required field: displayName.',
      });
    }

    const updatedSpecies = await updatePlayableSpeciesInDB(id, { displayName });

    request.log.info(`Playable species updated successfully: ${id}`);

    return reply.status(200).send({
      message: 'Playable species updated successfully.',
      data: updatedSpecies,
    });
  } catch (err) {
    request.log.error(`Error in updatePlayableSpeciesHandler: ${err}`);
    return reply.status(500).send({ error: 'Internal server error.' });
  }
}