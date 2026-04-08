// src/db/schema/canon-bridge/core/creature.ts

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
 * creatures
 * ---------------------------------------------------------
 *
 * Canonical list of creature definitions.
 *
 * These records define reusable creature templates, not
 * spawned encounter instances.
 */
export const creatures = mysqlTable('creatures', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 150 }).notNull().unique(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  displayName: varchar('display_name', { length: 150 }).notNull(),

  description: text('description'),

  creatureTypeId: varchar('creature_type_id', { length: 36 }).notNull(),
  sizeCategoryId: varchar('size_category_id', { length: 36 }).notNull(),
  intelligenceCategoryId: varchar('intelligence_category_id', { length: 36 }),
  threatLevelId: varchar('threat_level_id', { length: 36 }),

  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * creature_tags
 * ---------------------------------------------------------
 *
 * Junction table linking creatures to controlled tags.
 */
export const creatureTags = mysqlTable(
  'creature_tags',
  {
    creatureId: varchar('creature_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),

    isActive: boolean('is_active').notNull().default(true),
    sortOrder: int('sort_order').notNull().default(0),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'creature_tag_pk',
      columns: [table.creatureId, table.tagId],
    }),
  })
)

/**
 * ---------------------------------------------------------
 * creature_stat_values
 * ---------------------------------------------------------
 *
 * Defines canonical stat values for each creature template.
 */
export const creatureStatValues = mysqlTable(
  'creature_stat_values',
  {
    creatureId: varchar('creature_id', { length: 36 }).notNull(),
    statId: varchar('stat_id', { length: 36 }).notNull(),

    statValue: int('stat_value').notNull(),

    isActive: boolean('is_active').notNull().default(true),
    sortOrder: int('sort_order').notNull().default(0),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'creature_stat_value_pk',
      columns: [table.creatureId, table.statId],
    }),
  })
)