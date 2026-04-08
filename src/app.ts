// src/app.ts

/**
 * Fastify application composition root.
 *
 * Responsibilities:
 * - create the Fastify app instance
 * - register global platform/security plugins
 * - register route groups
 * - define global error handling
 *
 * Notes:
 * - `server.ts` is responsible for runtime startup (`app.listen`)
 * - this file is responsible for assembling the application
 * - plugin registration order matters, especially for auth/permission flow
 */

import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

import { corsOptions } from './config/cors.js'
import jwtPlugin from './plugins/jwt.plugin.js'
import permissionsPlugin from './plugins/permissions.plugin.js'
import rateLimitPlugin from './plugins/rateLimit.plugin.js'

import { adminRoutes } from './routes/admin.route.js'
import { authRoutes } from './routes/auth.route.js'
import { playableClassAdminRoutes } from './routes/playableClassAdmin.route.js'
import { playableSpeciesAdminRoutes } from './routes/playableSpeciesAdmin.route.js'
import { playableTagAdminRoutes } from './routes/playableTagAdmin.route.js'
// import { playableStatAdminRoutes } from './routes/playableStatAdmin.route.js'
// import { playablePassiveAdminRoutes } from './routes/playablePassiveAdmin.route.js'
// import { mediaUploadRoutes } from './routes/mediaUpload.route.js'
// import { playableTagCategoryAdminRoutes } from './routes/playableTagCategoryAdmin.route.js'
// import { playableTagCategoryLinkAdminRoutes } from './routes/playableTagCategoryLinkAdmin.route.js'

const app = Fastify({
  logger: true,
})

/**
 * Register security-related middleware first.
 *
 * `contentSecurityPolicy` is currently disabled to avoid interfering
 * with tooling such as Swagger UI during development.
 */
app.register(helmet, {
  global: true,
  contentSecurityPolicy: false,
})

/**
 * Register cross-origin policy configuration.
 */
app.register(cors, corsOptions)

/**
 * Register backend plugins.
 *
 * Order matters:
 * - rate limiting first
 * - JWT before permission checks
 * - permissions after JWT so `request.user` is available
 */
app.register(rateLimitPlugin)
app.register(jwtPlugin)
app.register(permissionsPlugin)

/**
 * Lightweight request logging for non-OPTIONS requests.
 */
app.addHook('onRequest', (request, reply, done) => {
  if (request.method !== 'OPTIONS') {
    app.log.info(`Incoming request: ${request.method} ${request.url}`)
  }
  done()
})

/**
 * Register top-level route groups.
 *
 * Additional playable/admin route groups are being layered in
 * incrementally as those systems are completed.
 */
app.register(authRoutes, { prefix: '/auth' })
app.register(adminRoutes, { prefix: '/admin' })
app.register(playableSpeciesAdminRoutes, { prefix: '/admin' })
app.register(playableClassAdminRoutes, { prefix: '/admin' })
app.register(playableTagAdminRoutes, { prefix: '/admin' })
// app.register(playableStatAdminRoutes, { prefix: '/admin' })
// app.register(playablePassiveAdminRoutes, { prefix: '/admin' })
// app.register(mediaUploadRoutes)
// app.register(playableTagCategoryAdminRoutes, { prefix: '/admin' })
// app.register(playableTagCategoryLinkAdminRoutes, { prefix: '/admin' })

/**
 * Global error handler fallback.
 *
 * This ensures unexpected uncaught route/plugin errors return a
 * consistent server error response and are logged centrally.
 */
app.setErrorHandler((error, request, reply) => {
  app.log.error(`Global error handler caught: ${error.message}`)
  reply.status(500).send({
    error: 'Internal Server Error',
    message: error.message,
  })
})

export default app