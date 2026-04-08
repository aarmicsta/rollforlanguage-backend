// src/db/index.ts

/**
 * Database connection and Drizzle ORM initialization.
 *
 * Responsibilities:
 * - create MySQL connection pool
 * - initialize Drizzle ORM instance
 *
 * Notes:
 * - environment variables are loaded via `config/env.ts`
 * - this file should not call `dotenv.config()` directly
 */

import { drizzle, MySql2Database } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

import { env } from '../config/env.js'

const pool = mysql.createPool({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USERNAME,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
})

export const db: MySql2Database = drizzle(pool)