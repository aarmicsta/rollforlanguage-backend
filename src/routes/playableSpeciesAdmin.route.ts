// src/routes/playableSpeciesAdmin.route.ts

import type {} from '../types/fastify';

import { FastifyInstance } from 'fastify';
import { getPlayableSpeciesHandler } from '../controllers/playableSpeciesAdmin.controller';

export async function playableSpeciesAdminRoutes(app: FastifyInstance) {
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

    admin.get('/playable-species', {
      schema: {
        tags: ['Admin'],
        summary: 'Get playable species for admin browse view',
        description:
          'Returns playable species records for the admin dashboard browse table.',
      },
      handler: getPlayableSpeciesHandler,
    });
  });
}