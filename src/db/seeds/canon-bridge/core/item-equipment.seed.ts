import { and, eq } from 'drizzle-orm';

import { db } from '#db/index.js';
import { items, itemEquipmentSlots } from '#db/schema/canon-bridge/core/item-equipment.js';

import { itemsSeed, itemEquipmentSlotsSeed } from './item-equipment.data.js';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Items & Equipment
 *
 * Purpose:
 * Seeds canonical data for:
 * - items
 * - item_equipment_slots
 *
 * Seed strategy:
 * - `items`: match existing rows by unique slug
 * - `item_equipment_slots`: match existing rows by composite key
 * - Insert if not found
 * - Update if found
 *
 * =========================================================
 */

async function upsertItems() {
  for (const row of itemsSeed) {
    const existing = await db
      .select({ id: items.id })
      .from(items)
      .where(eq(items.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(items)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          itemTypeId: row.itemTypeId,
          rarityLevelId: row.rarityLevelId,
          baseValue: row.baseValue,
          weight: row.weight,
          maxStackSize: row.maxStackSize,
          iconMediaAssetId: row.iconMediaAssetId,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(items.slug, row.slug));
    } else {
      await db.insert(items).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        itemTypeId: row.itemTypeId,
        rarityLevelId: row.rarityLevelId,
        baseValue: row.baseValue,
        weight: row.weight,
        maxStackSize: row.maxStackSize,
        iconMediaAssetId: row.iconMediaAssetId,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertItemEquipmentSlots() {
  for (const row of itemEquipmentSlotsSeed) {
    const existing = await db
      .select({
        itemId: itemEquipmentSlots.itemId,
        equipmentSlotId: itemEquipmentSlots.equipmentSlotId,
      })
      .from(itemEquipmentSlots)
      .where(
        and(
          eq(itemEquipmentSlots.itemId, row.itemId),
          eq(itemEquipmentSlots.equipmentSlotId, row.equipmentSlotId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(itemEquipmentSlots)
        .set({
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(itemEquipmentSlots.itemId, row.itemId),
            eq(itemEquipmentSlots.equipmentSlotId, row.equipmentSlotId)
          )
        );
    } else {
      await db.insert(itemEquipmentSlots).values({
        itemId: row.itemId,
        equipmentSlotId: row.equipmentSlotId,
      });
    }
  }
}

export async function seedItemEquipment() {
  console.log('Seeding items and equipment...');
  await upsertItems();
  await upsertItemEquipmentSlots();
  console.log('Finished seeding items and equipment.');
}