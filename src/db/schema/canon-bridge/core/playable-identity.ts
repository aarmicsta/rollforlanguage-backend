// src/db/schema/canon-bridge/core/playable-identity.ts

/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Playable Identity Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines canonical playable identity entities used across
 * the RFL platform. These tables represent structured,
 * reusable identity templates for species, classes, tags,
 * passive abilities, and stat baselines/modifiers.
 *
 * Why these belong in the Canon Bridge layer:
 * - They define stable canonical game-world entities
 * - They are reusable by portal/runtime systems later
 * - They preserve structured data separately from lore text
 *   and from mutable player/session state
 *
 * Notes:
 * - Foreign key constraints are intentionally deferred for now,
 *   consistent with the current schema strategy
 * - Relationship tables are included so the playable identity
 *   model is immediately usable before full FK enforcement
 * - `icon_media_asset_id` and `starting_weapon_item_id` remain
 *   plain ID fields until those systems are formally linked
 *
 * =========================================================
 */

import {
  boolean,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

/**
 * ---------------------------------------------------------
 * playable_species
 * ---------------------------------------------------------
 *
 * Canonical list of playable species definitions.
 *
 * These are reusable identity templates, not player-owned
 * character records.
 */
export const playableSpecies = mysqlTable('playable_species', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name, intended to remain stable.
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe / code-safe identifier.
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-facing display label.
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Optional longer explanation of the species.
  description: text('description'),

  // Stored as an ID string for now; FK can be added later
  // once the media/assets layer is implemented.
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  // Allows species to be soft-disabled without deleting them.
  isActive: boolean('is_active').notNull().default(true),

  // Useful for manual ordering in admin panels / UI display.
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * playable_classes
 * ---------------------------------------------------------
 *
 * Canonical list of playable class definitions.
 *
 * These are reusable identity templates, not player
 * progression records.
 */
export const playableClasses = mysqlTable('playable_classes', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Reserved for future linkage to canonical items/equipment.
  startingWeaponItemId: varchar('starting_weapon_item_id', { length: 36 }),

  // Stored as an ID string for now; FK can be added later
  // once the media/assets layer is implemented.
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * playable_tags
 * ---------------------------------------------------------
 *
 * Controlled list of reusable tags for playable identity
 * classification.
 */
export const playableTags = mysqlTable('playable_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Broad category/grouping for organizational use.
  tagCategory: varchar('tag_category', { length: 100 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * playable_passives
 * ---------------------------------------------------------
 *
 * Controlled list of reusable passive effects that may be
 * assigned to playable species and/or classes.
 */
export const playablePassives = mysqlTable('playable_passives', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Human-readable summary of the passive's effect.
  effectText: text('effect_text'),

  // Broad category for organizing passive behavior/types.
  effectType: varchar('effect_type', { length: 100 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * playable_species_tags
 * ---------------------------------------------------------
 *
 * Junction table linking playable species to reusable tags.
 */
export const playableSpeciesTags = mysqlTable(
  'playable_species_tags',
  {
    speciesId: varchar('species_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.speciesId, table.tagId],
    }),
  })
)

/**
 * ---------------------------------------------------------
 * playable_class_tags
 * ---------------------------------------------------------
 *
 * Junction table linking playable classes to reusable tags.
 */
export const playableClassTags = mysqlTable(
  'playable_class_tags',
  {
    classId: varchar('class_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.classId, table.tagId],
    }),
  })
)

/**
 * ---------------------------------------------------------
 * playable_species_passives
 * ---------------------------------------------------------
 *
 * Junction table linking playable species to reusable passives.
 */
export const playableSpeciesPassives = mysqlTable(
  'playable_species_passives',
  {
    speciesId: varchar('species_id', { length: 36 }).notNull(),
    passiveId: varchar('passive_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.speciesId, table.passiveId],
    }),
  })
)

/**
 * ---------------------------------------------------------
 * playable_class_passives
 * ---------------------------------------------------------
 *
 * Junction table linking playable classes to reusable passives.
 */
export const playableClassPassives = mysqlTable(
  'playable_class_passives',
  {
    classId: varchar('class_id', { length: 36 }).notNull(),
    passiveId: varchar('passive_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.classId, table.passiveId],
    }),
  })
)

/**
 * ---------------------------------------------------------
 * playable_stat_baselines
 * ---------------------------------------------------------
 *
 * Universal baseline value for each playable stat before
 * species, class, or other modifiers are applied.
 */
export const playableStatBaselines = mysqlTable('playable_stat_baselines', {
  statId: varchar('stat_id', { length: 36 }).primaryKey(),

  // Universal default value for the stat.
  baseValue: int('base_value').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * playable_species_stat_modifiers
 * ---------------------------------------------------------
 *
 * Species-to-stat modifier contributions relative to the
 * universal stat baseline.
 */
export const playableSpeciesStatModifiers = mysqlTable(
  'playable_species_stat_modifiers',
  {
    speciesId: varchar('species_id', { length: 36 }).notNull(),
    statId: varchar('stat_id', { length: 36 }).notNull(),

    // Flat modifier applied to the referenced stat.
    modifierValue: int('modifier_value').notNull().default(0),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.speciesId, table.statId],
    }),
  })
)

/**
 * ---------------------------------------------------------
 * playable_class_stat_modifiers
 * ---------------------------------------------------------
 *
 * Class-to-stat modifier contributions relative to the
 * universal stat baseline.
 */
export const playableClassStatModifiers = mysqlTable(
  'playable_class_stat_modifiers',
  {
    classId: varchar('class_id', { length: 36 }).notNull(),
    statId: varchar('stat_id', { length: 36 }).notNull(),

    // Flat modifier applied to the referenced stat.
    modifierValue: int('modifier_value').notNull().default(0),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.classId, table.statId],
    }),
  })
)