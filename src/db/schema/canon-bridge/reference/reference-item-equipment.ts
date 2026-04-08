// src/db/schema/canon-bridge/reference/reference-item-equipment.ts

/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Item / Equipment Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines controlled reference tables used by the item,
 * equipment, and economy systems across the RFL platform.
 *
 * Why these are "reference" tables:
 * - They provide standardized, reusable descriptors.
 * - They prevent free-text drift across the database.
 * - They act as stable lookup tables for canonical entities
 *   such as items, equipment, crafting systems, and loot.
 *
 * Tables Defined Here:
 * - ref_rarity_levels
 * - ref_equipment_slots
 * - ref_item_types
 *
 * Notes:
 * - These tables intentionally do not require foreign keys
 *   at this stage.
 * - They will be referenced by canonical item and equipment
 *   tables later in the Canon Bridge layer.
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
 * ref_rarity_levels
 * ---------------------------------------------------------
 *
 * Controlled list of rarity classifications for items.
 *
 * Example entries might include:
 * - common
 * - uncommon
 * - rare
 * - epic
 * - legendary
 *
 * `rarity_rank` allows ordering by rarity strength.
 * `color_hex` allows UI systems to visually represent
 * rarity levels consistently.
 */
export const refRarityLevels = mysqlTable('ref_rarity_levels', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe / system-safe identifier
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-facing label
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Optional longer explanation
  description: text('description'),

  // Numeric ordering value for rarity comparisons
  rarityRank: int('rarity_rank'),

  // Optional UI color for item rarity display
  colorHex: varchar('color_hex', { length: 7 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * ref_equipment_slots
 * ---------------------------------------------------------
 *
 * Controlled list of equipment slots available to
 * characters.
 *
 * Example entries might include:
 * - head
 * - chest
 * - legs
 * - weapon
 * - offhand
 * - accessory
 *
 * `slot_category` allows grouping of slot types.
 * Example groupings:
 * - armor
 * - weapon
 * - accessory
 */
export const refEquipmentSlots = mysqlTable('ref_equipment_slots', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Optional grouping category for slots
  slotCategory: varchar('slot_category', { length: 100 }),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * ref_item_types
 * ---------------------------------------------------------
 *
 * Controlled list of item classifications.
 *
 * Example entries might include:
 * - weapon
 * - armor
 * - consumable
 * - crafting_material
 * - quest_item
 *
 * These boolean flags allow item behavior to be determined
 * by category without hardcoding logic elsewhere.
 */
export const refItemTypes = mysqlTable('ref_item_types', {
  id: varchar('id', { length: 36 }).primaryKey(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),

  // Broad grouping category for item organization
  itemCategory: varchar('item_category', { length: 100 }),

  // Behavioral flags used by gameplay systems
  isEquippable: boolean('is_equippable').notNull().default(false),
  isConsumable: boolean('is_consumable').notNull().default(false),
  isCraftingMaterial: boolean('is_crafting_material').notNull().default(false),

  isActive: boolean('is_active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})