// src/controllers/auth.controller.ts

/**
 * Authentication controller.
 *
 * Responsibilities:
 * - register new users
 * - authenticate users and issue tokens
 * - refresh access/refresh tokens
 * - revoke refresh tokens (single-session or global logout)
 */

import '@fastify/jwt'
import { FastifyReply, FastifyRequest } from 'fastify'
import { and, eq } from 'drizzle-orm'

import { db } from '../db/index.js'
import { refreshTokens } from '../db/schema/portal/auth.js'
import {
  createUser,
  findUserByEmail,
  findUserById,
  verifyPassword,
} from '../services/auth.service.js'
import { idGenerator } from '../utils/idGenerator.js'
import { loginSchema, registerSchema } from '../validation/auth.validation.js'

export async function registerHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const parsed = registerSchema.parse(request.body)
    const user = await createUser(parsed)

    return reply.status(201).send({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        roleId: user.roleId,
      },
    })
  } catch (err: any) {
    request.log.error(err)
    return reply.status(500).send({
      error: err?.message || 'User creation failed',
    })
  }
}

export async function loginHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received /auth/login request')

  try {
    const parsed = loginSchema.parse(request.body)
    request.log.info(`Parsed login request: ${JSON.stringify(parsed)}`)

    const user = await findUserByEmail(parsed.email)
    if (!user) {
      request.log.warn(`User not found for email: ${parsed.email}`)
      return reply.status(401).send({ error: 'Invalid email or password' })
    }

    request.log.info(
      `Found user: ${JSON.stringify({
        id: user.id,
        email: user.email,
        roleId: user.roleId,
        isVerified: user.isVerified,
      })}`
    )

    const isValid = await verifyPassword(parsed.password, user.passwordHash)
    if (!isValid) {
      request.log.warn(`Invalid password for user: ${parsed.email}`)
      return reply.status(401).send({ error: 'Invalid email or password' })
    }

    request.log.info(
      `Password verified, generating tokens for user: ${parsed.email}`
    )

    const accessToken = await reply.jwtSign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.roleId,
    })

    const refreshToken = idGenerator(64)
    const refreshExpiry = new Date()
    refreshExpiry.setDate(refreshExpiry.getDate() + 7)

    await db.insert(refreshTokens).values({
      id: idGenerator(),
      userId: user.id,
      token: refreshToken,
      expiresAt: refreshExpiry,
    })

    request.log.info(`Login successful, sending tokens for user: ${parsed.email}`)

    return reply.send({
      accessToken,
      refreshToken,
    })
  } catch (err) {
    request.log.error(`Login handler error: ${err}`)
    return reply.status(400).send({ error: 'Login failed' })
  }
}

export async function refreshHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received /auth/refresh request')

  try {
    await request.jwtVerify()

    const { refreshToken } = request.body as { refreshToken: string }

    if (!refreshToken) {
      return reply.status(400).send({ error: 'Refresh token missing' })
    }

    const [stored] = await db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.token, refreshToken),
          eq(refreshTokens.isRevoked, false)
        )
      )

    if (!stored || new Date(stored.expiresAt) < new Date()) {
      return reply.status(401).send({ error: 'Invalid or expired refresh token' })
    }

    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.id, stored.id))

    const newRefreshToken = idGenerator(64)
    const newExpiry = new Date()
    newExpiry.setDate(newExpiry.getDate() + 7)

    await db.insert(refreshTokens).values({
      id: idGenerator(),
      userId: stored.userId,
      token: newRefreshToken,
      expiresAt: newExpiry,
    })

    const user = await findUserById(stored.userId)
    if (!user) {
      return reply.status(404).send({ error: 'User not found' })
    }

    const newAccessToken = await reply.jwtSign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.roleId,
    })

    return reply.send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    })
  } catch (err) {
    request.log.error(err)
    return reply.status(400).send({ error: 'Token refresh failed' })
  }
}

export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received /auth/logout request')

  try {
    await request.jwtVerify()

    const { refreshToken } = request.body as { refreshToken: string }

    if (!refreshToken) {
      return reply.status(400).send({ error: 'Refresh token missing' })
    }

    const [stored] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, refreshToken))

    if (!stored) {
      return reply.status(404).send({ error: 'Refresh token not found' })
    }

    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.id, stored.id))

    return reply.send({ message: 'Logged out successfully' })
  } catch (err) {
    request.log.error(err)
    return reply.status(400).send({ error: 'Logout failed' })
  }
}

export async function globalLogoutHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info('Received /auth/logout-all request')

  try {
    await request.jwtVerify()

    const { userId } = request.body as { userId: string }

    if (!userId) {
      return reply.status(400).send({ error: 'User ID missing' })
    }

    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.userId, userId))

    return reply.send({ message: 'All user sessions revoked successfully' })
  } catch (err) {
    request.log.error(err)
    return reply.status(400).send({ error: 'Global logout failed' })
  }
}