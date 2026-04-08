import { eq } from 'drizzle-orm';

import { db } from '#db/index.js';
import {
  refRarityLevels,
  refEquipmentSlots,
  refItemTypes,
} from '#db/schema/canon-bridge/reference/reference-item-equipment.js';

import {
  rarityLevelsSeed,
  equipmentSlotsSeed,
  itemTypesSeed,
} from './ref-item-equipment.data.js';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Items & Equipment
 *
 * Purpose:
 * Seeds canonical reference data for:
 * - ref_rarity_levels
 * - ref_equipment_slots
 * - ref_item_types
 *
 * Seed strategy:
 * - Match existing rows by unique slug
 * - Insert if not found (using canonical ID)
 * - Update if found
 *
 * Notes:
 * - Canonical IDs are explicitly re-applied during updates
 *   to reinforce seed-authoritative identity consistency.
 *
 * =========================================================
 */

async function upsertRarityLevels() {
  for (const row of rarityLevelsSeed) {
    const existing = await db
      .select({ id: refRarityLevels.id })
      .from(refRarityLevels)
      .where(eq(refRarityLevels.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refRarityLevels)
        .set({
          id: row.id, // reinforce canonical ID consistency
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          rarityRank: row.rarityRank,
          colorHex: row.colorHex,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refRarityLevels.slug, row.slug));
    } else {
      await db.insert(refRarityLevels).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        rarityRank: row.rarityRank,
        colorHex: row.colorHex,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertEquipmentSlots() {
  for (const row of equipmentSlotsSeed) {
    const existing = await db
      .select({ id: refEquipmentSlots.id })
      .from(refEquipmentSlots)
      .where(eq(refEquipmentSlots.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refEquipmentSlots)
        .set({
          id: row.id, // reinforce canonical ID consistency
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          slotCategory: row.slotCategory,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refEquipmentSlots.slug, row.slug));
    } else {
      await db.insert(refEquipmentSlots).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        slotCategory: row.slotCategory,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertItemTypes() {
  for (const row of itemTypesSeed) {
    const existing = await db
      .select({ id: refItemTypes.id })
      .from(refItemTypes)
      .where(eq(refItemTypes.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refItemTypes)
        .set({
          id: row.id, // reinforce canonical ID consistency
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          isEquippable: row.isEquippable,
          isConsumable: row.isConsumable,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refItemTypes.slug, row.slug));
    } else {
      await db.insert(refItemTypes).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        isEquippable: row.isEquippable,
        isConsumable: row.isConsumable,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

export async function seedItemEquipmentReference() {
  console.log('Seeding item/equipment reference tables...');
  await upsertRarityLevels();
  await upsertEquipmentSlots();
  await upsertItemTypes();
  console.log('Finished seeding item/equipment reference tables.');
}