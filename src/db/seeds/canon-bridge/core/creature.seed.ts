import { eq, and } from 'drizzle-orm';

import { db } from '@/db/index';
import {
  creatures,
  creatureTags,
  creatureStatValues,
} from '@schema/canon-bridge/core/creature';

import {
  creaturesSeed,
  creatureTagsSeed,
  creatureStatValuesSeed,
} from '@seeds/canon-bridge/core/creature.data';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Creature Systems
 *
 * Purpose:
 * Seeds canonical data for:
 * - creatures
 * - creature_tags
 * - creature_stat_values
 *
 * Seed strategy:
 * - creatures: upsert by unique slug
 * - creature_tags: insert if not exists
 * - creature_stat_values: upsert by composite key
 *
 * =========================================================
 */

async function upsertCreatures() {
  for (const row of creaturesSeed) {
    const existing = await db
      .select({ id: creatures.id })
      .from(creatures)
      .where(eq(creatures.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(creatures)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          creatureTypeId: row.creatureTypeId,
          sizeCategoryId: row.sizeCategoryId,
          intelligenceCategoryId: row.intelligenceCategoryId,
          threatLevelId: row.threatLevelId,
          iconMediaAssetId: row.iconMediaAssetId,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(creatures.slug, row.slug));
    } else {
      await db.insert(creatures).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        creatureTypeId: row.creatureTypeId,
        sizeCategoryId: row.sizeCategoryId,
        intelligenceCategoryId: row.intelligenceCategoryId,
        threatLevelId: row.threatLevelId,
        iconMediaAssetId: row.iconMediaAssetId,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function insertCreatureTags() {
  for (const row of creatureTagsSeed) {
    const existing = await db
      .select({
        creatureId: creatureTags.creatureId,
        tagId: creatureTags.tagId,
      })
      .from(creatureTags)
      .where(
        and(
          eq(creatureTags.creatureId, row.creatureId),
          eq(creatureTags.tagId, row.tagId)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      await db.insert(creatureTags).values({
        creatureId: row.creatureId,
        tagId: row.tagId,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertCreatureStatValues() {
  for (const row of creatureStatValuesSeed) {
    const existing = await db
      .select({
        creatureId: creatureStatValues.creatureId,
        statId: creatureStatValues.statId,
      })
      .from(creatureStatValues)
      .where(
        and(
          eq(creatureStatValues.creatureId, row.creatureId),
          eq(creatureStatValues.statId, row.statId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(creatureStatValues)
        .set({
          statValue: row.statValue,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(creatureStatValues.creatureId, row.creatureId),
            eq(creatureStatValues.statId, row.statId)
          )
        );
    } else {
      await db.insert(creatureStatValues).values({
        creatureId: row.creatureId,
        statId: row.statId,
        statValue: row.statValue,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

export async function seedCreatures() {
  console.log('Seeding creature systems...');
  await upsertCreatures();
  await insertCreatureTags();
  await upsertCreatureStatValues();
  console.log('Finished seeding creature systems.');
}