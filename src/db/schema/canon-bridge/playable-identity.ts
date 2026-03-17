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
 * and passive abilities.
 *
 * Why these belong in the Canon Bridge layer:
 * - They define stable canonical game-world entities.
 * - They are reusable by portal/runtime systems later.
 * - They preserve structured data separate from lore text
 *   and separate from mutable player/session state.
 *
 * Tables Defined Here:
 * - playable_species
 * - playable_classes
 * - playable_tags
 * - playable_passives
 * - playable_species_tags
 * - playable_class_tags
 * - playable_species_passives
 * - playable_class_passives
 *
 * Notes:
 * - Foreign key constraints are intentionally deferred for
 *   now, consistent with the current schema strategy.
 * - Relationship tables are included so the playable
 *   identity model is immediately useful, even before full
 *   foreign key enforcement is introduced.
 * - `icon_media_asset_id` and `starting_weapon_item_id`
 *   are currently stored as plain ID fields only. No foreign
 *   key constraints are added yet.
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
  primaryKey,
} from 'drizzle-orm/mysql-core';

/**
 * ---------------------------------------------------------
 * playable_species
 * ---------------------------------------------------------
 *
 * Canonical list of playable species definitions.
 *
 * Example entries might include:
 * - human
 * - elf
 * - dwarf
 * - halfling
 * - dragonborn
 *
 * This table defines baseline species identity templates,
 * not player-owned characters.
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
  isActive: boolean('is_active').default(true),

  // Useful for manual ordering in admin panels / UI display.
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * playable_classes
 * ---------------------------------------------------------
 *
 * Canonical list of playable class definitions.
 *
 * Example entries might include:
 * - warrior
 * - mage
 * - rogue
 * - cleric
 * - ranger
 *
 * This table defines baseline class identity templates,
 * not player progression records.
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

  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * playable_tags
 * ---------------------------------------------------------
 *
 * Controlled list of tags used to classify playable species,
 * classes, and other identity-related entities.
 *
 * Example entries might include:
 * - agile
 * - scholarly
 * - divine
 * - martial
 * - stealth
 *
 * `tag_category` remains a plain field for now rather than a
 * normalized taxonomy system.
 */
export const playableTags = mysqlTable('playable_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Broad category/grouping for organizational use.
  tagCategory: varchar('tag_category', { length: 100 }),

  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * playable_passives
 * ---------------------------------------------------------
 *
 * Controlled list of reusable passive effects that may be
 * assigned to playable species and/or classes.
 *
 * Example entries might include:
 * - night_vision
 * - quick_learner
 * - battle_hardened
 * - mana_affinity
 * - silver_tongue
 *
 * `effect_type` allows broad grouping for later expansion.
 * Example groupings:
 * - stat_modifier
 * - utility
 * - defense
 * - offense
 * - social
 */
export const playablePassives = mysqlTable('playable_passives', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Human-readable summary of the passive's actual effect.
  effectText: text('effect_text'),

  // Broad category for organizing passive behavior/types.
  effectType: varchar('effect_type', { length: 100 }),

  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * playable_species_tags
 * ---------------------------------------------------------
 *
 * Junction table linking playable species to reusable tags.
 *
 * This allows species to be classified using controlled
 * descriptors without embedding free-text labels directly in
 * the species table.
 */
export const playableSpeciesTags = mysqlTable(
  'playable_species_tags',
  {
    speciesId: varchar('species_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.speciesId, table.tagId],
    }),
  })
);

/**
 * ---------------------------------------------------------
 * playable_class_tags
 * ---------------------------------------------------------
 *
 * Junction table linking playable classes to reusable tags.
 *
 * This supports structured classification of classes while
 * preserving tag reuse across the canonical model.
 */
export const playableClassTags = mysqlTable(
  'playable_class_tags',
  {
    classId: varchar('class_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.classId, table.tagId],
    }),
  })
);

/**
 * ---------------------------------------------------------
 * playable_species_passives
 * ---------------------------------------------------------
 *
 * Junction table linking playable species to reusable
 * passive definitions.
 *
 * This allows species identity templates to grant one or
 * more passive effects without duplicating passive text.
 */
export const playableSpeciesPassives = mysqlTable(
  'playable_species_passives',
  {
    speciesId: varchar('species_id', { length: 36 }).notNull(),
    passiveId: varchar('passive_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.speciesId, table.passiveId],
    }),
  })
);

/**
 * ---------------------------------------------------------
 * playable_class_passives
 * ---------------------------------------------------------
 *
 * Junction table linking playable classes to reusable
 * passive definitions.
 *
 * This allows classes to inherit canonical passive features
 * while keeping passive definitions centralized.
 */
export const playableClassPassives = mysqlTable(
  'playable_class_passives',
  {
    classId: varchar('class_id', { length: 36 }).notNull(),
    passiveId: varchar('passive_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.classId, table.passiveId],
    }),
  })
);

/**
 * ---------------------------------------------------------
 * playable_stat_baselines
 * ---------------------------------------------------------
 *
 * Defines the universal baseline value for each playable
 * stat before species, class, or other modifier systems are
 * applied.
 *
 * This table should contain one row per playable stat.
 *
 * Example interpretation:
 * - health = 10
 * - attack = 5
 * - defense = 5
 *
 * These values represent the default starting point shared
 * by all playable characters prior to identity-based or
 * runtime-based modifications.
 */
export const playableStatBaselines = mysqlTable('playable_stat_baselines', {
  statId: varchar('stat_id', { length: 36 }).primaryKey(),

  // Universal default value for the stat.
  baseValue: int('base_value').notNull().default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});