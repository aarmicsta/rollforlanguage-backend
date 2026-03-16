/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Creature / Encounter Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines controlled reference tables used by creature,
 * encounter, and world-threat systems across the RFL platform.
 *
 * Why these are "reference" tables:
 * - They provide standardized, reusable descriptors.
 * - They reduce free-text drift across the database.
 * - They act as stable lookup tables for canonical entities
 *   such as creatures and encounters.
 *
 * Tables Defined Here:
 * - ref_creature_types
 * - ref_size_categories
 * - ref_movement_types
 * - ref_intelligence_categories
 * - ref_threat_levels
 *
 * Notes:
 * - These tables intentionally do not require foreign keys
 *   at this stage.
 * - They are meant to be populated with canonical reference
 *   data that other tables can point to later.
 *
 * =========================================================
 */

import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  int,
} from 'drizzle-orm/mysql-core';

/**
 * ---------------------------------------------------------
 * ref_creature_types
 * ---------------------------------------------------------
 *
 * Controlled list of broad creature classifications.
 *
 * Example entries might include:
 * - beast
 * - sapient
 * - undead
 * - construct
 * - celestial
 *
 * This table defines the high-level canonical type, not
 * a specific creature entry.
 */
export const refCreatureTypes = mysqlTable('ref_creature_types', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name, intended to remain stable.
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe / code-safe identifier.
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-facing display label.
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Optional longer explanation of the creature type.
  description: text('description'),

  // Allows types to be soft-disabled without deletion.
  isActive: boolean('is_active').default(true),

  // Useful for manual ordering in admin/UI display.
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * ref_size_categories
 * ---------------------------------------------------------
 *
 * Controlled list of size classifications.
 *
 * Example entries might include:
 * - tiny
 * - small
 * - medium
 * - large
 * - colossal
 *
 * `size_rank` allows ordered comparison and sorting.
 */
export const refSizeCategories = mysqlTable('ref_size_categories', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Numeric ordering value for size comparisons.
  sizeRank: int('size_rank'),

  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * ref_movement_types
 * ---------------------------------------------------------
 *
 * Controlled list of movement capabilities.
 *
 * Example entries might include:
 * - walking
 * - flying
 * - swimming
 * - burrowing
 * - teleporting
 *
 * `movement_category` allows broader grouping if needed.
 * Example groupings:
 * - physical
 * - magical
 * - environmental
 */
export const refMovementTypes = mysqlTable('ref_movement_types', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Broad grouping/category of movement style.
  movementCategory: varchar('movement_category', { length: 100 }),

  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * ref_intelligence_categories
 * ---------------------------------------------------------
 *
 * Controlled list of intelligence classifications.
 *
 * Example entries might include:
 * - mindless
 * - instinctive
 * - animal
 * - sapient
 * - genius
 *
 * `intelligence_rank` allows ordered comparison if needed.
 */
export const refIntelligenceCategories = mysqlTable('ref_intelligence_categories', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Numeric ordering value for intelligence comparisons.
  intelligenceRank: int('intelligence_rank'),

  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * ref_threat_levels
 * ---------------------------------------------------------
 *
 * Controlled list of threat classifications used to indicate
 * how dangerous a creature or encounter is expected to be.
 *
 * Example entries might include:
 * - trivial
 * - low
 * - moderate
 * - severe
 * - catastrophic
 *
 * `threat_rank` provides a sortable severity value.
 * `recommended_level_min` and `recommended_level_max`
 * provide a rough guide for intended character/group level.
 */
export const refThreatLevels = mysqlTable('ref_threat_levels', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Numeric ordering value for severity comparisons.
  threatRank: int('threat_rank'),

  // Suggested lower bound for intended level range.
  recommendedLevelMin: int('recommended_level_min'),

  // Suggested upper bound for intended level range.
  recommendedLevelMax: int('recommended_level_max'),

  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});