// src/db/schema/canon-bridge/reference/reference-playable-trait.ts

/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Character / Trait Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines controlled reference tables used by character,
 * combat, and trait-related systems across the RFL platform.
 *
 * Why these are "reference" tables:
 * - They provide standardized, reusable descriptors.
 * - They reduce free-text drift across the database.
 * - They serve as stable lookup tables for other entities.
 *
 * Tables Defined Here:
 * - ref_playable_stats
 * - ref_damage_types
 * - ref_alignments
 * - ref_status_effects
 *
 * Notes:
 * - These tables intentionally do not require foreign keys
 *   at this stage.
 * - They are meant to be populated with canonical reference
 *   data that other tables can point to later.
 * - `icon_media_asset_id` is currently stored as a plain ID
 *   field only. No foreign key constraint is added yet.
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
 * ref_playable_stats
 * ---------------------------------------------------------
 *
 * Controlled list of playable stat definitions.
 */
export const refPlayableStats = mysqlTable('ref_playable_stats', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name, intended to remain stable.
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe / code-safe identifier.
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-facing display label.
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Optional longer explanation of what the stat represents.
  description: text('description'),

  // Allows stats to be soft-disabled without deleting them.
  isActive: boolean('is_active').notNull().default(true),

  // Useful for manual ordering in admin panels / UI display.
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * ref_damage_types
 * ---------------------------------------------------------
 *
 * Controlled list of damage categories.
 */
export const refDamageTypes = mysqlTable('ref_damage_types', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * ref_alignments
 * ---------------------------------------------------------
 *
 * Controlled list of alignment values used for canonical
 * classification.
 */
export const refAlignments = mysqlTable('ref_alignments', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Broad alignment grouping / modeling axis.
  alignmentAxis: varchar('alignment_axis', { length: 100 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * ref_status_effects
 * ---------------------------------------------------------
 *
 * Controlled list of status effect definitions.
 */
export const refStatusEffects = mysqlTable('ref_status_effects', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Broad category for organizing effect behavior/types.
  effectType: varchar('effect_type', { length: 100 }),

  // Stored as an ID string for now; FK can be added later
  // once the media/assets layer is implemented.
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})