// src/routes/auth.route.ts

/**
 * Authentication route registration.
 *
 * Responsibilities:
 * - expose registration, login, refresh, and logout endpoints
 * - attach auth guards where required
 * - provide route schemas for validation/docs
 */

import { FastifyInstance } from 'fastify'
import { zodToJsonSchema } from 'zod-to-json-schema'

import {
  globalLogoutHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from '../controllers/auth.controller.js'
import { loginSchema, registerSchema } from '../validation/auth.validation.js'

export async function authRoutes(server: FastifyInstance) {
  const authenticate = (server as any).authenticate

  server.post('/register', {
    schema: {
      description: 'Create a new user account',
      tags: ['Auth'],
      body: zodToJsonSchema(registerSchema),
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
          properties: {
            message: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                username: { type: 'string' },
                roleId: { type: 'string' },
              },
              required: ['id', 'email', 'username', 'roleId'],
            },
          },
          required: ['message', 'user'],
          example: {
            message: 'User created successfully',
            user: {
              id: 'abc123',
              email: 'user@example.com',
              username: 'mycoolusername',
              roleId: 'student',
            },
          },
        },
      },
    },
    handler: registerHandler,
  })

  server.post('/login', {
    schema: {
      description: 'Log in with email and password',
      tags: ['Auth'],
      body: zodToJsonSchema(loginSchema),
      response: {
        200: {
          description: 'Successful login with JWT token',
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
          },
          required: ['accessToken', 'refreshToken'],
          example: {
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refreshToken: 'abc123refresh...',
          },
        },
      },
    },
    handler: loginHandler,
  })

  server.post('/refresh', {
    preHandler: [authenticate],
    schema: {
      description: 'Refresh access token using refresh token',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          refreshToken: { type: 'string' },
        },
        required: ['refreshToken'],
      },
      response: {
        200: {
          description: 'New access token issued',
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
          },
          required: ['accessToken', 'refreshToken'],
          example: {
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refreshToken: 'newrefresh123...',
          },
        },
      },
    },
    handler: refreshHandler,
  })

  server.post('/logout', {
    preHandler: [authenticate],
    schema: {
      description: 'Log out of the current session (invalidate refresh token)',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          refreshToken: { type: 'string' },
        },
        required: ['refreshToken'],
      },
      response: {
        200: {
          description: 'Successfully logged out',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
          required: ['message'],
          example: {
            message: 'Logged out successfully',
          },
        },
      },
    },
    handler: logoutHandler,
  })

  server.post('/logout-all', {
    preHandler: [authenticate],
    schema: {
      description: 'Log out from all sessions (invalidate all refresh tokens)',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
        },
        required: ['userId'],
      },
      response: {
        200: {
          description: 'Successfully logged out from all sessions',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
          required: ['message'],
          example: {
            message: 'Logged out from all sessions',
          },
        },
      },
    },
    handler: globalLogoutHandler,
  })
}