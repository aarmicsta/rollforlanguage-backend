// src/controllers/playableSpeciesAdmin.controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { 
  getPlayableSpeciesFromDB,
  getPlayableSpeciesTagsFromDB,
  updatePlayableSpeciesInDB,
  updatePlayableSpeciesTagsInDB,
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
    const { displayName, description, isActive } = request.body as {
      displayName?: string;
      description?: string | null;
      isActive?: boolean;
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

    const updatedSpecies = await updatePlayableSpeciesInDB(id, { 
      displayName,
      description: description ?? null,
      isActive: isActive ?? false,
    });

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

export async function getPlayableSpeciesTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received GET /admin/playable-species/:id/tags request');

  try {
    const { id } = request.params as { id?: string };

    if (!id) {
      request.log.warn('Missing species id in get playable species tags request');
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      });
    }

    const tags = await getPlayableSpeciesTagsFromDB(id);

    return reply.status(200).send(tags);
  } catch (err) {
    request.log.error(`Error in getPlayableSpeciesTagsHandler: ${err}`);
    return reply.status(500).send({ error: 'Internal server error.' });
  }
}

export async function updatePlayableSpeciesTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-species/:id/tags request');

  try {
    const { id } = request.params as { id?: string };
    const { tagIds } = request.body as { tagIds?: string[] };

    if (!id) {
      request.log.warn('Missing species id in update playable species tags request');
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      });
    }

    if (!Array.isArray(tagIds)) {
      request.log.warn('Missing or invalid tagIds in update playable species tags request');
      return reply.status(400).send({
        error: 'Missing required field: tagIds.',
      });
    }

    const updatedTags = await updatePlayableSpeciesTagsInDB(id, tagIds);

    request.log.info(`Playable species tags updated successfully: ${id}`);

    return reply.status(200).send({
      message: 'Playable species tags updated successfully.',
      data: updatedTags,
    });
  } catch (err) {
    request.log.error(`Error in updatePlayableSpeciesTagsHandler: ${err}`);
    return reply.status(500).send({ error: 'Internal server error.' });
  }
}