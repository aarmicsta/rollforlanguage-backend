/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Authentication and Identity
 * Layer: Portal
 *
 * Purpose:
 * Defines account identity, role-based access, session state,
 * refresh tokens, and user-level settings.
 *
 * Tables Defined Here:
 * - roles
 * - users
 * - refresh_tokens
 * - user_settings
 * - login_sessions
 *
 * Relationships:
 * - users.role_id → roles.id
 * - refresh_tokens.user_id → users.id
 * - user_settings.user_id → users.id
 * - login_sessions.user_id → users.id
 *
 * Notes:
 * - This schema manages authentication/account concerns only.
 * - It does not contain gameplay/runtime character data.
 * - The login_sessions token field is now session_token.
 *   This replaces the older jwt_token naming for clearer,
 *   more implementation-agnostic session modeling.
 *
 * =========================================================
 */

import {
  mysqlTable,
  varchar,
  timestamp,
  boolean,
  text,
} from 'drizzle-orm/mysql-core';

// Roles table
export const roles = mysqlTable('roles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Users table
export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  roleId: varchar('role_id', { length: 36 }).notNull(),
  displayName: varchar('display_name', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  isActive: boolean('is_active').default(true),
  username: varchar('username', { length: 100 }).notNull().unique(),
  genderIdentity: varchar('gender_identity', { length: 100 }),
  pronouns: varchar('pronouns', { length: 100 }),
  isVerified: boolean('is_verified').default(false),
});

// Refresh Tokens table
export const refreshTokens = mysqlTable('refresh_tokens', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
  isRevoked: boolean('is_revoked').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
});

// User Settings table
export const userSettings = mysqlTable('user_settings', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  preferredLanguage: varchar('preferred_language', { length: 100 }),
  theme: varchar('theme', { length: 50 }),
  timezone: varchar('timezone', { length: 100 }),
  notificationsEnabled: boolean('notifications_enabled').default(true),
  soundEnabled: boolean('sound_enabled').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Login Sessions table
export const loginSessions = mysqlTable('login_sessions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),

  // NOTE:
  // session_token replaces the older jwt_token naming.
  // The intent is the same: this field stores the session auth token.
  // The new name is broader and avoids over-coupling the schema
  // to one specific token implementation detail.
  sessionToken: text('session_token').notNull(),

  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  lastActiveAt: timestamp('last_active_at'),
  expiresAt: timestamp('expires_at').notNull(),
  isRevoked: boolean('is_revoked').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});