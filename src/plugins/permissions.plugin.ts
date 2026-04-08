// src/plugins/permissions.plugin.ts

/**
 * Permissions plugin.
 *
 * Responsibilities:
 * - expose `request.hasPermission(permission)` helper
 * - evaluate permissions based on user role
 *
 * Notes:
 * - depends on `request.user` being populated (via JWT plugin)
 * - `superadmin` bypasses all permission checks
 */

import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'

import { checkPermission } from '../utils/permissions.js'

interface JwtUser {
  id: string
  email: string
  username: string
  role: string
}

const permissionsPlugin: FastifyPluginAsync = async (app) => {
  /**
   * Checks whether the current request user has a given permission.
   */
  app.decorateRequest('hasPermission', function (
    this: FastifyRequest,
    permission: string
  ) {
    const rawUser = this.user

    if (
      typeof rawUser === 'object' &&
      rawUser !== null &&
      'role' in rawUser &&
      typeof (rawUser as JwtUser).role === 'string'
    ) {
      const user = rawUser as JwtUser

      // Superadmin bypass
      if (user.role === 'superadmin') {
        return true
      }

      return checkPermission(user.role, permission)
    }

    return false
  })
}

// Wrapped with fastify-plugin to ensure proper scope and reuse
export default fp(permissionsPlugin, { name: 'permissionsPlugin' })