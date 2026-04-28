// src/services/item.service.ts

/**
 * Admin service for items.
 *
 * Responsibilities:
 * - return item browse records
 * - create canonical item records
 * - update canonical item records
 * - manage item equipment slot assignment
 * - return canonical item/equipment reference options
 *
 * Notes:
 * - Items define what an item is, not every behavior it can have.
 * - Future systems such as effects, crafting, loot, inventory, and
 *   equipment stats should layer on top of this foundation.
 */

import { asc, eq, sql } from 'drizzle-orm'

import { db } from '../db/index.js'
import {
  items,
  itemEquipmentSlots,
} from '../db/schema/canon-bridge/core/item-equipment.js'
import {
  refEquipmentSlots,
  refItemTypes,
  refRarityLevels,
} from '../db/schema/canon-bridge/reference/reference-item-equipment.js'

/**
 * ---------------------------------------------------------
 * Browse Types
 * ---------------------------------------------------------
 */
export interface ItemListItem {
  id: string
  name: string
  slug: string
  displayName: string
  description: string | null

  itemTypeId: string
  rarityLevelId: string

  itemType: string
  rarityLevel: string

  baseValue: number
  weight: string
  maxStackSize: number

  iconMediaAssetId: string | null
  isActive: boolean | null
  sortOrder: number | null
  createdAt: string | null
  updatedAt: string | null
}

export interface UpdateItemEquipmentSlotsInput {
  equipmentSlotIds: string[]
}

/**
 * ---------------------------------------------------------
 * Canonical ID Helpers
 * ---------------------------------------------------------
 *
 * Item IDs follow the canonical admin-created identity pattern:
 *
 *   item_<canonical_name>
 */
function buildItemId(name: string): string {
  return `item_${name}`
}

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */
export async function getItemsFromDB(): Promise<ItemListItem[]> {
  const results = await db
    .select({
      id: items.id,
      name: items.name,
      slug: items.slug,
      displayName: items.displayName,
      description: items.description,

      itemTypeId: items.itemTypeId,
      rarityLevelId: items.rarityLevelId,

      itemType: refItemTypes.displayName,
      rarityLevel: refRarityLevels.displayName,

      baseValue: items.baseValue,
      weight: items.weight,
      maxStackSize: items.maxStackSize,

      iconMediaAssetId: items.iconMediaAssetId,
      isActive: items.isActive,
      sortOrder: items.sortOrder,
      createdAt:
        sql<string>`DATE_FORMAT(${items.createdAt}, '%Y-%m-%d %H:%i:%s')`.as(
          'createdAt'
        ),
      updatedAt:
        sql<string>`DATE_FORMAT(${items.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as(
          'updatedAt'
        ),
    })
    .from(items)
    .innerJoin(refItemTypes, eq(items.itemTypeId, refItemTypes.id))
    .innerJoin(refRarityLevels, eq(items.rarityLevelId, refRarityLevels.id))
    .orderBy(asc(items.displayName))

  return results
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 */
export async function createItemInDB(data: {
  displayName: string
  name: string
  slug: string
  description: string | null
  itemTypeId: string
  rarityLevelId: string
  baseValue: number
  weight: string
  maxStackSize: number
  isActive: boolean
}): Promise<ItemListItem | null> {
  const id = buildItemId(data.name)

  await db.insert(items).values({
    id,
    name: data.name,
    slug: data.slug,
    displayName: data.displayName,
    description: data.description,
    itemTypeId: data.itemTypeId,
    rarityLevelId: data.rarityLevelId,
    baseValue: data.baseValue,
    weight: data.weight,
    maxStackSize: data.maxStackSize,
    isActive: data.isActive,
  })

  const results = await getItemsFromDB()

  return results.find((item) => item.id === id) ?? null
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */
export async function updateItemInDB(
  id: string,
  data: {
    displayName: string
    description: string | null
    itemTypeId: string
    rarityLevelId: string
    baseValue: number
    weight: string
    maxStackSize: number
    isActive: boolean
  }
): Promise<ItemListItem | null> {
  await db
    .update(items)
    .set({
      displayName: data.displayName,
      description: data.description,
      itemTypeId: data.itemTypeId,
      rarityLevelId: data.rarityLevelId,
      baseValue: data.baseValue,
      weight: data.weight,
      maxStackSize: data.maxStackSize,
      isActive: data.isActive,
    })
    .where(eq(items.id, id))

  const results = await getItemsFromDB()

  return results.find((item) => item.id === id) ?? null
}

/**
 * ---------------------------------------------------------
 * Item Equipment Slots
 * ---------------------------------------------------------
 */
export async function getItemEquipmentSlotsFromDB(itemId: string) {
  const results = await db
    .select({
      id: refEquipmentSlots.id,
      name: refEquipmentSlots.name,
      slug: refEquipmentSlots.slug,
      displayName: refEquipmentSlots.displayName,
      slotCategory: refEquipmentSlots.slotCategory,
    })
    .from(itemEquipmentSlots)
    .innerJoin(
      refEquipmentSlots,
      eq(itemEquipmentSlots.equipmentSlotId, refEquipmentSlots.id)
    )
    .where(eq(itemEquipmentSlots.itemId, itemId))
    .orderBy(asc(refEquipmentSlots.sortOrder), asc(refEquipmentSlots.displayName))

  return results
}

/**
 * Replace assigned equipment slots for an item.
 */
export async function updateItemEquipmentSlotsInDB(
  itemId: string,
  input: UpdateItemEquipmentSlotsInput
) {
  await db
    .delete(itemEquipmentSlots)
    .where(eq(itemEquipmentSlots.itemId, itemId))

  if (input.equipmentSlotIds.length > 0) {
    await db.insert(itemEquipmentSlots).values(
      input.equipmentSlotIds.map((equipmentSlotId) => ({
        itemId,
        equipmentSlotId,
      }))
    )
  }

  return getItemEquipmentSlotsFromDB(itemId)
}

/**
 * =========================================================
 * Reference Lookups
 * =========================================================
 */

export async function getItemTypesFromDB() {
  const results = await db
    .select({
      id: refItemTypes.id,
      name: refItemTypes.name,
      slug: refItemTypes.slug,
      displayName: refItemTypes.displayName,
      description: refItemTypes.description,
      itemCategory: refItemTypes.itemCategory,
      isEquippable: refItemTypes.isEquippable,
      isConsumable: refItemTypes.isConsumable,
      isCraftingMaterial: refItemTypes.isCraftingMaterial,
      isActive: refItemTypes.isActive,
      sortOrder: refItemTypes.sortOrder,
    })
    .from(refItemTypes)
    .orderBy(asc(refItemTypes.sortOrder), asc(refItemTypes.displayName))

  return results
}

export async function getRarityLevelsFromDB() {
  const results = await db
    .select({
      id: refRarityLevels.id,
      name: refRarityLevels.name,
      slug: refRarityLevels.slug,
      displayName: refRarityLevels.displayName,
      description: refRarityLevels.description,
      rarityRank: refRarityLevels.rarityRank,
      colorHex: refRarityLevels.colorHex,
      isActive: refRarityLevels.isActive,
      sortOrder: refRarityLevels.sortOrder,
    })
    .from(refRarityLevels)
    .orderBy(asc(refRarityLevels.sortOrder), asc(refRarityLevels.displayName))

  return results
}

export async function getEquipmentSlotsFromDB() {
  const results = await db
    .select({
      id: refEquipmentSlots.id,
      name: refEquipmentSlots.name,
      slug: refEquipmentSlots.slug,
      displayName: refEquipmentSlots.displayName,
      description: refEquipmentSlots.description,
      slotCategory: refEquipmentSlots.slotCategory,
      isActive: refEquipmentSlots.isActive,
      sortOrder: refEquipmentSlots.sortOrder,
    })
    .from(refEquipmentSlots)
    .orderBy(
      asc(refEquipmentSlots.sortOrder),
      asc(refEquipmentSlots.displayName)
    )

  return results
}