// src/services/auth.service.ts

/**
 * Authentication-related data and password utilities.
 *
 * Responsibilities:
 * - hash and verify passwords
 * - create users
 * - fetch users by email or ID
 */

import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

import { db } from '../db/index.js'
import { users } from '../db/schema/portal/auth.js'
import { idGenerator } from '../utils/idGenerator.js'

const SALT_ROUNDS = 12

/**
 * Hashes a plain-text password.
 */
export async function hashPassword(
  plainTextPassword: string
): Promise<string> {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS)
}

/**
 * Verifies a plain-text password against a stored hash.
 */
export async function verifyPassword(
  plainTextPassword: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hash)
}

/**
 * Creates a new user record with a default student role.
 */
export async function createUser({
  email,
  username,
  password,
}: {
  email: string
  username: string
  password: string
}) {
  const hashedPassword = await hashPassword(password)

  const newUser = {
    id: idGenerator(16),
    email,
    username,
    passwordHash: hashedPassword,
    roleId: 'student',
    isVerified: false,
    isActive: true,
  }

  await db.insert(users).values(newUser)

  return newUser
}

/**
 * Finds a user by email.
 */
export async function findUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email))
  return result[0]
}

/**
 * Finds a user by ID.
 */
export async function findUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id))
  return user || null
}