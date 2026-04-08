// src/utils/idGenerator.ts

/**
 * ID generator utility.
 *
 * Responsibilities:
 * - generate cryptographically secure random IDs
 * - used for primary keys and internal identifiers
 */

import crypto from 'crypto'

/**
 * Generates a secure random ID string.
 * @param length Desired string length (default 16 characters)
 */
export function idGenerator(length = 16): string {
  const byteLength = Math.ceil(length / 2)
  return crypto.randomBytes(byteLength).toString('hex').slice(0, length)
}