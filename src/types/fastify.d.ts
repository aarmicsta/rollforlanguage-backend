// src/types/fastify.d.ts

/**
 * Fastify type augmentations.
 *
 * Responsibilities:
 * - extend Fastify JWT payload/user typing
 * - add custom decorators (`authenticate`, `hasPermission`)
 *
 * Notes:
 * - must be included via `tsconfig.json` typeRoots
 * - relied upon by plugins and controllers for type safety
 */

import 'fastify'
import '@fastify/jwt'

type JwtUser = {
  id: string
  email: string
  username: string
  role: string
  iat: number
  exp: number
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string
      email: string
      username: string
      role: string
    }
    user: JwtUser
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: import('fastify').FastifyRequest,
      reply: import('fastify').FastifyReply
    ) => Promise<void>
  }

  interface FastifyRequest {
    /**
     * Checks if the user has the specified permission
     */
    hasPermission: (permission: string) => boolean

    /**
     * Authenticated user payload (populated by JWT plugin)
     */
    user: JwtUser
  }
}