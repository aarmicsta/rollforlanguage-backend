// src/db/schema/canon-bridge/reference/reference-world-structure.ts

/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — World Structure Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines controlled reference tables used by the world
 * structure and location systems across the RFL platform.
 *
 * Why these are "reference" tables:
 * - They provide standardized, reusable descriptors.
 * - They prevent free-text drift across the database.
 * - They act as stable lookup tables for canonical world
 *   entities such as locations, regions, POIs, and their
 *   classifications.
 *
 * Tables Defined Here:
 * - ref_location_types
 * - ref_location_tags
 *
 * Notes:
 * - These tables intentionally do not require foreign keys
 *   at this stage.
 * - `ref_location_types` is modeled as a controlled canonical
 *   table rather than a free-text field because world
 *   structure depends heavily on consistent place typing.
 * - `parent_location_type_id` is currently stored as a plain
 *   ID field only. No foreign key constraint is added yet.
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
 * ref_location_types
 * ---------------------------------------------------------
 *
 * Controlled list of location classifications used by the
 * world structure system.
 *
 * Example entries might include:
 * - continent
 * - forest
 * - mountain_range
 * - kingdom
 * - city
 * - district
 * - shrine
 * - fissure
 *
 * `parent_location_type_id` allows hierarchical modeling of
 * broader and narrower location types.
 *
 * Example:
 * - biome
 *   - forest
 *   - desert
 * - settlement
 *   - city
 *   - village
 */
export const refLocationTypes = mysqlTable('ref_location_types', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe / system-safe identifier
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-facing label
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Optional longer explanation
  description: text('description'),

  // Optional hierarchical parent type reference
  parentLocationTypeId: varchar('parent_location_type_id', { length: 36 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * ref_location_tags
 * ---------------------------------------------------------
 *
 * Controlled list of tags used to classify locations and
 * world structure entities.
 *
 * Example entries might include:
 * - coastal
 * - sacred
 * - fortified
 * - frontier
 * - trade_hub
 * - ruined
 *
 * `tag_category` allows broad grouping of location tags.
 *
 * Example groupings:
 * - geography
 * - political
 * - cultural
 * - environmental
 * - strategic
 */
export const refLocationTags = mysqlTable('ref_location_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe / system-safe identifier
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-facing label
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Optional longer explanation
  description: text('description'),

  // Broad grouping category for tag organization
  tagCategory: varchar('tag_category', { length: 100 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})