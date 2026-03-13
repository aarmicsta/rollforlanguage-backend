/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Playable Entities
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines canonical playable RPG entities such as classes
 * and species. These tables represent structured definitions
 * used by gameplay systems.
 *
 * Tables Defined Here:
 * - playable_classes
 * - playable_species
 * - passive_abilities
 * - class_stat_modifiers
 * - species_stat_modifiers
 * - class_tag_assignments
 * - species_tag_assignments
 * - species_ability_assignments
 *
 * Relationships:
 * stat_types → class_stat_modifiers
 * stat_types → species_stat_modifiers
 * entity_tags → class_tag_assignments
 * entity_tags → species_tag_assignments
 *
 * Notes:
 * This schema defines canonical entity structure. Runtime
 * player character data lives in the characters schema.
 *
 * =========================================================
 */

import {
  mysqlTable,
  varchar,
  text,
  boolean,
  int,
  timestamp,
  primaryKey,
} from 'drizzle-orm/mysql-core';
import { idGenerator } from '../../utils/idGenerator';

//
// 🧙‍♂️ PLAYABLE CLASSES
//
export const playableClasses = mysqlTable('playable_classes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  lore: text('lore'),
  iconUrl: varchar('icon_url', { length: 255 }),
  isPlayable: boolean('is_playable').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

//
// ⚙️ STAT BONUSES (one-to-many)
//
export const playableClassStatBonuses = mysqlTable('playable_class_stat_bonuses', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  statName: varchar('stat_name', { length: 50 }).notNull(),
  statBonus: int('stat_bonus').notNull().default(0),
});

//
// 🧠 PASSIVES (one-to-many)
//
export const playableClassPassives = mysqlTable('playable_class_passives', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  effect: text('effect'),
});

//
// 🧩 CLASS–TAG LINK (many-to-many join)
//
export const playableClassTagLinks = mysqlTable('playable_class_tag_links', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  tagId: varchar('tag_id', { length: 36 }).notNull(),
});

//
// 🧬 PLAYABLE SPECIES MASTER TABLE
//
export const playableSpecies = mysqlTable('playable_species', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  alignment: varchar('alignment', { length: 50 }), // e.g., neutral, chaotic
  sizeCategory: varchar('size_category', { length: 50 }), // e.g., small, medium
  movementType: varchar('movement_type', { length: 50 }), // e.g., walking, flying
  baseMovementSpeed: int('base_movement_speed'), // e.g., 30 feet
  visualTrait: varchar('visual_trait', { length: 100 }), // e.g., horned, glowing eyes
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

//
// ⚙️ STAT BONUSES
//
export const playableSpeciesStatBonuses = mysqlTable('playable_species_stat_bonuses', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  statName: varchar('stat_name', { length: 50 }).notNull(),
  bonusValue: int('bonus_value').default(0),
});

//
// 🧠 ABILITIES
//
export const playableSpeciesAbilities = mysqlTable('playable_species_abilities', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  abilityName: varchar('ability_name', { length: 100 }).notNull(),
  description: text('description'),
  isPassive: boolean('is_passive').default(false),
});

//
// 🏷 TAGS
//
export const playableSpeciesTags = mysqlTable('playable_species_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  tag: varchar('tag', { length: 50 }),
});

//
// 📖 LORE ENTRIES
//
export const playableSpeciesLore = mysqlTable('playable_species_lore', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  loreEntry: text('lore_entry').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
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