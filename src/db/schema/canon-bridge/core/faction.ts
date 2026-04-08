// src/db/schema/canon-bridge/core/faction.ts

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
 * factions
 * ---------------------------------------------------------
 *
 * Canonical list of macro-level social power entities.
 */
export const factions = mysqlTable('factions', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 150 }).notNull().unique(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  displayName: varchar('display_name', { length: 150 }).notNull(),

  description: text('description'),

  // Shared alignment vocabulary reference (application-level).
  alignmentId: varchar('alignment_id', { length: 36 }),

  // Reserved for future media/assets integration.
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * faction_tags
 * ---------------------------------------------------------
 *
 * Junction table linking factions to controlled faction tags.
 */
export const factionTags = mysqlTable(
  'faction_tags',
  {
    factionId: varchar('faction_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'faction_tags_pk',
      columns: [table.factionId, table.tagId],
    }),
  })
)