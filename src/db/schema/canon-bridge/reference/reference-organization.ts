// src/db/schema/canon-bridge/reference/reference-organization.ts

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
 * Defines controlled reference tables used to classify
 * organizations across the RFL platform.
 *
 * Why these are "reference" tables:
 * - They provide standardized, reusable descriptors.
 * - They reduce free-text drift across the database.
 * - They serve as stable lookup tables for other entities.
 *
 * Tables Defined Here:
 * - ref_organization_tags
 *
 * Notes:
 * - These tables intentionally do not require foreign keys
 *   at this stage.
 * - They are meant to be populated with canonical reference
 *   data that other tables can point to later.
 * - Tags are flexible descriptors, not primary identity
 *   types; they supplement, rather than replace, the core
 *   organization definition.
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
 * ref_organization_tags
 * ---------------------------------------------------------
 *
 * Controlled list of tag definitions used to classify
 * organizations.
 *
 * Example entries might include:
 * - religious
 * - mercantile
 * - criminal
 * - scholarly
 * - civic
 * - arcane
 * - charitable
 * - judicial
 * - militant
 * - secretive
 *
 * These tags allow organizations to be flexibly categorized
 * across multiple dimensions without forcing all meaning
 * into a single type field.
 */
export const refOrganizationTags = mysqlTable('ref_organization_tags', {
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