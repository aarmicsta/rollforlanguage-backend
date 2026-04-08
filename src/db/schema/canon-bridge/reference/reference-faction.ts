// src/db/schema/canon-bridge/reference/reference-faction.ts

/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Social Entities
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines controlled reference tags used to classify
 * factions across the RFL platform.
 *
 * Why this is a "reference" table:
 * - It provides standardized, reusable descriptors.
 * - It reduces free-text drift across the database.
 * - It serves as a stable lookup table for faction tagging.
 *
 * Tables Defined Here:
 * - ref_faction_tags
 *
 * Notes:
 * - This table intentionally does not require foreign keys
 *   at this stage.
 * - It is meant to be populated with canonical reference
 *   data that faction records can point to later through
 *   a junction table.
 * - Tags are flexible descriptors, not primary identity
 *   types; they supplement, rather than replace, the core
 *   faction definition.
 *
 * =========================================================
 */

import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

/**
 * ---------------------------------------------------------
 * ref_faction_tags
 * ---------------------------------------------------------
 *
 * Controlled list of tag definitions used to classify
 * factions.
 *
 * Example entries might include:
 * - political
 * - military
 * - tribal
 * - religious
 * - mercantile
 * - criminal
 * - maritime
 * - nomadic
 *
 * These tags allow factions to be flexibly categorized
 * across multiple dimensions without forcing all meaning
 * into a single type field.
 */
export const refFactionTags = mysqlTable('ref_faction_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name, intended to remain stable.
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe / code-safe identifier.
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-facing display label.
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Optional longer explanation of what the tag signifies.
  description: text('description'),

  // Allows tags to be soft-disabled without deleting them.
  isActive: boolean('is_active').notNull().default(true),

  // Useful for manual ordering in admin panels / UI display.
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})