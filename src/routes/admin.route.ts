// src/routes/admin.route.ts

import type {} from '../types/fastify.js'

import { FastifyInstance } from 'fastify'

import {
  createUserHandler,
  getUserMetricsHandler,
  getUsersHandler,
} from '../controllers/admin.controller.js'

/**
 * Admin routes.
 *
 * Responsibilities:
 * - protect admin user-management endpoints
 * - expose user creation, listing, and metrics endpoints
 *
 * Notes:
 * - route-level access is gated here
 * - finer-grained role creation rules are enforced in the controller
 */

export async function adminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    /**
     * Protect all /admin routes.
     *
     * Requirements:
     * - valid JWT
     * - at least one user-management-related permission
     *
     * Additional restriction:
     * - GET /admin/users is limited to users with `manage_users`
     */
    admin.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        return reply.status(401).send({ error: 'Unauthorized' })
      }

      const hasManageUsers = request.hasPermission('manage_users')
      const hasCreateStudent = request.hasPermission('create_student')

      if (!hasManageUsers && !hasCreateStudent) {
        return reply.status(403).send({ error: 'Forbidden' })
      }

      if (
        request.method === 'GET' &&
        request.url.startsWith('/users') &&
        !hasManageUsers
      ) {
        return reply
          .status(403)
          .send({ error: 'Insufficient permissions to view users.' })
      }
    })

    admin.post('/users', createUserHandler)

    admin.get('/users', {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            search: { type: 'string' },
            role: { type: 'string' },
            roles: { type: 'array', items: { type: 'string' } },
            page: { type: 'number' },
            limit: { type: 'number' },
            sortBy: { type: 'string' },
            sortOrder: { type: 'string' },
            createdBefore: { type: 'string', format: 'date-time' },
            createdAfter: { type: 'string', format: 'date-time' },
            includeSuspended: { type: 'boolean' },
            includeCountOnly: { type: 'boolean' },
          },
          additionalProperties: true,
        },
        tags: ['Admin'],
        summary: 'Get paginated list of users for admin dashboard',
        description:
          'Returns filtered, sortable, paginated user data. Supports role filters, date range, and future enhancements.',
      },
      handler: getUsersHandler,
    })

    admin.get('/users/metrics', {
      schema: {
        tags: ['Admin'],
        summary: 'Get user statistics for admin overview widget',
        description:
          'Returns total, active, suspended user counts, role distribution, and new users in the last 7 days.',
      },
      handler: getUserMetricsHandler,
    })
  })
}