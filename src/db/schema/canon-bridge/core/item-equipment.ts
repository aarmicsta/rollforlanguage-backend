// src/db/schema/canon-bridge/core/item-equipment.ts

/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Items & Equipment
 * Layer: Canon Bridge / Core
 *
 * Purpose:
 * Defines canonical item records and item-to-equipment-slot
 * relationships used across the RFL platform.
 *
 * Why these are "core" tables:
 * - `items` defines stable canonical item entities.
 * - `item_equipment_slots` links equippable items to
 *   controlled slot vocabularies from reference tables.
 *
 * Notes:
 * - These tables intentionally do not require foreign keys
 *   at this stage.
 * - `item_type_id` is intended to point conceptually to the
 *   shared `ref_item_types` table.
 * - `rarity_level_id` is intended to point conceptually to
 *   the shared `ref_rarity_levels` table.
 * - `equipment_slot_id` is intended to point conceptually to
 *   the shared `ref_equipment_slots` table.
 * - `icon_media_asset_id` is currently stored as a plain ID
 *   field only. No foreign key constraint is added yet.
 *
 * =========================================================
 */

import {
  boolean,
  decimal,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

/**
 * ---------------------------------------------------------
 * items
 * ---------------------------------------------------------
 *
 * Canonical list of world items used across gameplay and
 * platform systems.
 *
 * Example entries might include:
 * - Iron Sword
 * - Apprentice Staff
 * - Traveler's Cloak
 * - Minor Healing Potion
 * - Copper Trade Token
 *
 * Items represent stable, reusable canonical definitions of
 * objects. This table stores broad identity, classification,
 * and universal item properties, while more specialized
 * mechanical behavior can be extended through supporting
 * tables later.
 */
export const items = mysqlTable('items', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name, intended to remain stable.
  name: varchar('name', { length: 150 }).notNull().unique(),

  // URL-safe / code-safe identifier.
  slug: varchar('slug', { length: 150 }).notNull().unique(),

  // Human-facing display label.
  displayName: varchar('display_name', { length: 150 }).notNull(),

  // Optional longer explanation of the item.
  description: text('description'),

  // Shared item-type vocabulary reference (application-level).
  itemTypeId: varchar('item_type_id', { length: 36 }).notNull(),

  // Shared rarity vocabulary reference (application-level).
  rarityLevelId: varchar('rarity_level_id', { length: 36 }).notNull(),

  // Baseline canonical value for the item.
  baseValue: int('base_value').notNull().default(0),

  // Canonical item weight. Decimal allows lighter/smaller items.
  weight: decimal('weight', { precision: 10, scale: 2 }).notNull().default('0.00'),

  // Maximum quantity allowed in a single stack.
  maxStackSize: int('max_stack_size').notNull().default(1),

  // Reserved for future media/assets integration.
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  // Allows items to be soft-disabled without deleting them.
  isActive: boolean('is_active').notNull().default(true),

  // Useful for manual ordering in admin panels / UI display.
  sortOrder: int('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

/**
 * ---------------------------------------------------------
 * item_equipment_slots
 * ---------------------------------------------------------
 *
 * Junction table linking items to controlled equipment slot
 * definitions from `ref_equipment_slots`.
 *
 * This allows equippable items to declare where they can be
 * worn or equipped without embedding slot fields directly in
 * the `items` table.
 *
 * Most non-equippable items will simply have no entry here.
 *
 * Example mappings might include:
 * - Iron Helm -> head
 * - Leather Boots -> feet
 * - Bronze Sword -> weapon
 * - Oak Shield -> offhand
 */
export const itemEquipmentSlots = mysqlTable(
  'item_equipment_slots',
  {
    itemId: varchar('item_id', { length: 36 }).notNull(),
    equipmentSlotId: varchar('equipment_slot_id', { length: 36 }).notNull(),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'item_equipment_slots_pk',
      columns: [table.itemId, table.equipmentSlotId],
    }),
  })
)