// src/routes/playableClassAdmin.route.ts

import type {} from '../types/fastify';

import { FastifyInstance } from 'fastify';
import {
  getPlayableClassesHandler,
  updatePlayableClassHandler,
  getPlayableClassTagsHandler,
  updatePlayableClassTagsHandler,
} from '../controllers/playableClassAdmin.controller';

export async function playableClassAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    admin.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      const hasManageUsers = request.hasPermission('manage_users');

      if (!hasManageUsers) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    admin.get('/playable-classes', {
      schema: {
        tags: ['Admin'],
        summary: 'Get playable classes for admin browse view',
        description:
          'Returns playable class records for the admin dashboard browse table.',
      },
      handler: getPlayableClassesHandler,
    });

    admin.patch('/playable-classes/:id', {
      schema: {
        tags: ['Admin'],
        summary: 'Update a playable class',
        description:
          'Updates one or more editable fields for a playable class record.',
      },
      handler: updatePlayableClassHandler,
    });

    admin.get('/playable-classes/:id/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Get assigned tags for a playable class',
        description:
          'Returns the currently assigned playable tags for a specific playable class.',
      },
      handler: getPlayableClassTagsHandler,
    });

    admin.patch('/playable-classes/:id/tags', {
      schema: {
        tags: ['Admin'],
        summary: 'Update assigned tags for a playable class',
        description:
          'Replaces the currently assigned playable tags for a specific playable class.',
      },
      handler: updatePlayableClassTagsHandler,
    });
  });
}