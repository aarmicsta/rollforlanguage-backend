/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Creature Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines canonical creature entities used across the RFL
 * platform. These tables represent structured, reusable
 * creature templates and their associated classifications
 * and stat values.
 *
 * Why these belong in the Canon Bridge layer:
 * - They define stable canonical game-world entities.
 * - They are reusable by portal/runtime systems later.
 * - They preserve structured data separate from lore text
 *   and separate from mutable encounter/session state.
 *
 * Tables Defined Here:
 * - creatures
 * - creature_tags
 * - creature_stat_values
 *
 * Notes:
 * - Foreign key constraints are intentionally deferred for
 *   now, consistent with the current schema strategy.
 * - Relationship tables are included so the creature model
 *   is immediately useful, even before full foreign key
 *   enforcement is introduced.
 * - `icon_media_asset_id` is currently stored as a plain ID
 *   field only. No foreign key constraint is added yet.
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
 * creatures
 * ---------------------------------------------------------
 *
 * Canonical list of creature definitions.
 *
 * Example entries might include:
 * - Ash Fen Wolf
 * - Ember Wraith
 * - Shrine Guardian Beetle
 * - Harbor Mire Drake
 *
 * These records define baseline creature identity and
 * classification, not spawned encounter instances.
 */
export const creatures = mysqlTable('creatures', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name, intended to remain stable.
  name: varchar('name', { length: 150 }).notNull().unique(),

  // URL-safe / code-safe identifier.
  slug: varchar('slug', { length: 150 }).notNull().unique(),

  // Human-facing display label.
  displayName: varchar('display_name', { length: 150 }).notNull(),

  // Optional longer explanation of the creature.
  description: text('description'),

  // Primary creature classification.
  creatureTypeId: varchar('creature_type_id', { length: 36 }).notNull(),

  // Broad size classification.
  sizeCategoryId: varchar('size_category_id', { length: 36 }).notNull(),

  // Broad intelligence classification.
  intelligenceCategoryId: varchar('intelligence_category_id', { length: 36 }),

  // Broad threat / encounter difficulty classification.
  threatLevelId: varchar('threat_level_id', { length: 36 }),

  // Reserved for future media/assets integration.
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  // Allows creatures to be soft-disabled without deleting them.
  isActive: boolean('is_active').default(true),

  // Useful for manual ordering in admin panels / UI display.
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * creature_tags
 * ---------------------------------------------------------
 *
 * Junction table linking creatures to controlled creature
 * tags from `ref_creature_tags`.
 *
 * This allows a creature to carry multiple flexible
 * descriptors without overloading the main `creatures`
 * table.
 */
export const creatureTags = mysqlTable(
  'creature_tags',
  {
    creatureId: varchar('creature_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),

    isActive: boolean('is_active').default(true),
    sortOrder: int('sort_order').default(0),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'creature_tag_pk',
      columns: [table.creatureId, table.tagId],
    }),
  })
);

/**
 * ---------------------------------------------------------
 * creature_stat_values
 * ---------------------------------------------------------
 *
 * Junction-like table linking creatures to stat definitions
 * from `ref_playable_stats`, storing canonical stat values
 * for each creature template.
 *
 * This allows creatures to define flexible stat profiles
 * without embedding fixed stat columns directly in the
 * `creatures` table.
 *
 * Example:
 * - Ash Fen Wolf → hp: 120, attack: 18, defense: 10, speed: 14
 *
 * This model supports extensibility (adding new stats later)
 * while keeping the core creature table clean and stable.
 */
export const creatureStatValues = mysqlTable(
  'creature_stat_values',
  {
    creatureId: varchar('creature_id', { length: 36 }).notNull(),
    statId: varchar('stat_id', { length: 36 }).notNull(),

    // Canonical stat value for this creature/stat pairing.
    statValue: int('stat_value').notNull(),

    isActive: boolean('is_active').default(true),
    sortOrder: int('sort_order').default(0),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'creature_stat_value_pk',
      columns: [table.creatureId, table.statId],
    }),
  })
);