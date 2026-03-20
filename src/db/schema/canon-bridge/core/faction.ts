/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Social Entities
 * Layer: Canon Bridge / Core
 *
 * Purpose:
 * Defines canonical faction records and faction-to-tag
 * relationships used across the RFL platform.
 *
 * Why these are "core" tables:
 * - `factions` defines major world-power social entities.
 * - `faction_tags` links factions to controlled
 *   classification tags from reference tables.
 *
 * Notes:
 * - These tables intentionally do not require foreign keys
 *   at this stage.
 * - `alignment_id` is intended to point conceptually to the
 *   shared `ref_alignments` table.
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
 * factions
 * ---------------------------------------------------------
 *
 * Canonical list of macro-level social power entities.
 *
 * Example entries might include:
 * - Kingdom of Ash
 * - Free-City of Calro
 * - The Waltarmi Tribe
 * - The 5th Pirate Fleet of Zangrant
 *
 * Factions represent major collective actors in the world,
 * typically defined by territory, sovereignty, civic power,
 * tribal identity, military authority, or comparable
 * large-scale social influence.
 */
export const factions = mysqlTable('factions', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name, intended to remain stable.
  name: varchar('name', { length: 150 }).notNull().unique(),

  // URL-safe / code-safe identifier.
  slug: varchar('slug', { length: 150 }).notNull().unique(),

  // Human-facing display label.
  displayName: varchar('display_name', { length: 150 }).notNull(),

  // Optional longer explanation of the faction.
  description: text('description'),

  // Shared alignment vocabulary reference (application-level).
  alignmentId: varchar('alignment_id', { length: 36 }),

  // Reserved for future media/assets integration.
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  // Allows factions to be soft-disabled without deleting them.
  isActive: boolean('is_active').default(true),

  // Useful for manual ordering in admin panels / UI display.
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * faction_tags
 * ---------------------------------------------------------
 *
 * Junction table linking factions to controlled faction
 * tags from `ref_faction_tags`.
 *
 * This allows a single faction to carry multiple flexible
 * classifications (for example: political, civic, maritime)
 * without embedding those descriptors directly in the
 * `factions` table.
 */
export const factionTags = mysqlTable(
  'faction_tags',
  {
    factionId: varchar('faction_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'faction_tags_pk',
      columns: [table.factionId, table.tagId],
    }),
  })
);