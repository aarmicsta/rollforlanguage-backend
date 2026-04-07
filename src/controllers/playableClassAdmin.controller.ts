// src/controllers/playableClassAdmin.controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import {
  getPlayableClassesFromDB,
  getPlayableClassTagsFromDB,
  updatePlayableClassInDB,
  updatePlayableClassTagsInDB,
} from '../services/playableClass.service';

export async function getPlayableClassesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const results = await getPlayableClassesFromDB();
    return reply.status(200).send(results);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Failed to fetch playable classes.',
    });
  }
}

export async function updatePlayableClassHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-classes/:id request');

  try {
    const { id } = request.params as { id?: string };
    const { displayName, description, isActive } = request.body as {
      displayName?: string;
      description?: string | null;
      isActive?: boolean;
    };

    if (!id) {
      request.log.warn('Missing class id in update request');
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      });
    }

    if (!displayName) {
      request.log.warn('Missing displayName in update playable class request');
      return reply.status(400).send({
        error: 'Missing required field: displayName.',
      });
    }

    const updatedClass = await updatePlayableClassInDB(id, {
      displayName,
      description: description ?? null,
      isActive: isActive ?? false,
    });

    request.log.info(`Playable class updated successfully: ${id}`);

    return reply.status(200).send({
      message: 'Playable class updated successfully.',
      data: updatedClass,
    });
  } catch (err) {
    request.log.error(`Error in updatePlayableClassHandler: ${err}`);
    return reply.status(500).send({ error: 'Internal server error.' });
  }
}

export async function getPlayableClassTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received GET /admin/playable-classes/:id/tags request');

  try {
    const { id } = request.params as { id?: string };

    if (!id) {
      request.log.warn('Missing class id in get playable class tags request');
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      });
    }

    const tags = await getPlayableClassTagsFromDB(id);

    return reply.status(200).send(tags);
  } catch (err) {
    request.log.error(`Error in getPlayableClassTagsHandler: ${err}`);
    return reply.status(500).send({ error: 'Internal server error.' });
  }
}

export async function updatePlayableClassTagsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received PATCH /admin/playable-classes/:id/tags request');

  try {
    const { id } = request.params as { id?: string };
    const { tagIds } = request.body as { tagIds?: string[] };

    if (!id) {
      request.log.warn('Missing class id in update playable class tags request');
      return reply.status(400).send({
        error: 'Missing required route parameter: id.',
      });
    }

    if (!Array.isArray(tagIds)) {
      request.log.warn('Missing or invalid tagIds in update playable class tags request');
      return reply.status(400).send({
        error: 'Missing required field: tagIds.',
      });
    }

    const updatedTags = await updatePlayableClassTagsInDB(id, tagIds);

    request.log.info(`Playable class tags updated successfully: ${id}`);

    return reply.status(200).send({
      message: 'Playable class tags updated successfully.',
      data: updatedTags,
    });
  } catch (err) {
    request.log.error(`Error in updatePlayableClassTagsHandler: ${err}`);
    return reply.status(500).send({ error: 'Internal server error.' });
  }
}