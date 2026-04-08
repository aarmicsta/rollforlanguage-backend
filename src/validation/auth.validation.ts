// src/validation/auth.validation.ts

/**
 * Authentication validation schemas.
 *
 * Responsibilities:
 * - define input validation for auth-related endpoints
 * - provide inferred TypeScript types for handlers/services
 */

import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(100),
})

export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export type LoginInput = z.infer<typeof loginSchema>