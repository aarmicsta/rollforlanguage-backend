/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: System Vocabularies
 * Layer: Canon Bridge
 *
 * Purpose:
 * Shared vocabulary registries used throughout the system.
 * These tables define canonical reference values such as
 * stat types and entity tags.
 *
 * Tables Defined Here:
 * - stat_types
 * - entity_tags
 * - tag_categories
 * - tag_category_assignments
 *
 * Relationships:
 * Used by:
 * playable_entities
 * items
 * quests
 * characters
 *
 * Notes:
 * These tables act as controlled vocabularies and prevent
 * string duplication across the database.
 *
 * =========================================================
 */

import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  boolean,
  primaryKey,
} from 'drizzle-orm/mysql-core';
import { idGenerator } from '../../utils/idGenerator';

//
// 📊 PLAYABLE STATS REGISTRY
//
export const playableStats = mysqlTable('playable_stats', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(), // e.g., "strength"
  displayName: varchar('display_name', { length: 100 }).notNull(), // e.g., "Strength"
  description: text('description'),
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow().defaultNow(),
});

//
// 🏷️ PLAYABLE TAG GLOSSARY
//
export const playableTags = mysqlTable('playable_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(), // e.g., "Tank", "Undead"
  description: text('description'),
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
  colorHex: varchar('color_hex', { length: 7 }).default('#888888'),
  colorName: varchar('color_name', { length: 32 }),
});

export const playableTagCategories = mysqlTable('playable_tag_categories', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .$defaultFn(() => idGenerator()),

  name: varchar('name', { length: 64 }).notNull().unique(),
  displayName: varchar('display_name', { length: 128 }),
  description: text('description'),
  colorHex: varchar('color_hex', { length: 7 }),
  sortOrder: int('sort_order').default(0),
  isActive: boolean('is_active').default(true),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const playableTagCategoryLinks = mysqlTable('playable_tag_category_links', {
  tagId: varchar('tag_id', { length: 36 }).notNull(),
  categoryId: varchar('category_id', { length: 128 }).notNull(),
  isPrimary: boolean('is_primary').default(false),
}, (table) => [
  primaryKey(table.tagId, table.categoryId)
]);