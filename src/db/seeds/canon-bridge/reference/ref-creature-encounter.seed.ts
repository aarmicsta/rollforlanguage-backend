import { eq } from 'drizzle-orm';

import { db } from '@/db/index';
import {
  refCreatureTypes,
  refSizeCategories,
  refMovementTypes,
  refIntelligenceCategories,
  refThreatLevels,
  refCreatureTags,
} from '@schema/canon-bridge/reference/reference-creature-encounter';

import {
  creatureTypesSeed,
  sizeCategoriesSeed,
  movementTypesSeed,
  intelligenceCategoriesSeed,
  threatLevelsSeed,
  creatureTagsSeed,
} from '@seeds/canon-bridge/reference/ref-creature-encounter.data';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Creature / Encounter Systems
 *
 * Purpose:
 * Seeds canonical reference data for:
 * - ref_creature_types
 * - ref_size_categories
 * - ref_movement_types
 * - ref_intelligence_categories
 * - ref_threat_levels
 * - ref_creature_tags
 *
 * Seed strategy:
 * - New canonical reference tables:
 *   - Match existing rows by unique slug
 *   - Insert if not found using canonical ID
 *   - Update if found
 *
 * =========================================================
 */

async function upsertCreatureTypes() {
  for (const row of creatureTypesSeed) {
    const existing = await db
      .select({ id: refCreatureTypes.id })
      .from(refCreatureTypes)
      .where(eq(refCreatureTypes.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refCreatureTypes)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refCreatureTypes.slug, row.slug));
    } else {
      await db.insert(refCreatureTypes).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertSizeCategories() {
  for (const row of sizeCategoriesSeed) {
    const existing = await db
      .select({ id: refSizeCategories.id })
      .from(refSizeCategories)
      .where(eq(refSizeCategories.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refSizeCategories)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          sizeRank: row.sizeRank,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refSizeCategories.slug, row.slug));
    } else {
      await db.insert(refSizeCategories).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        sizeRank: row.sizeRank,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertMovementTypes() {
  for (const row of movementTypesSeed) {
    const existing = await db
      .select({ id: refMovementTypes.id })
      .from(refMovementTypes)
      .where(eq(refMovementTypes.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refMovementTypes)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          movementCategory: row.movementCategory,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refMovementTypes.slug, row.slug));
    } else {
      await db.insert(refMovementTypes).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        movementCategory: row.movementCategory,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertIntelligenceCategories() {
  for (const row of intelligenceCategoriesSeed) {
    const existing = await db
      .select({ id: refIntelligenceCategories.id })
      .from(refIntelligenceCategories)
      .where(eq(refIntelligenceCategories.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refIntelligenceCategories)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          intelligenceRank: row.intelligenceRank,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refIntelligenceCategories.slug, row.slug));
    } else {
      await db.insert(refIntelligenceCategories).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        intelligenceRank: row.intelligenceRank,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertThreatLevels() {
  for (const row of threatLevelsSeed) {
    const existing = await db
      .select({ id: refThreatLevels.id })
      .from(refThreatLevels)
      .where(eq(refThreatLevels.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refThreatLevels)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          threatRank: row.threatRank,
          recommendedLevelMin: row.recommendedLevelMin,
          recommendedLevelMax: row.recommendedLevelMax,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refThreatLevels.slug, row.slug));
    } else {
      await db.insert(refThreatLevels).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        threatRank: row.threatRank,
        recommendedLevelMin: row.recommendedLevelMin,
        recommendedLevelMax: row.recommendedLevelMax,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertCreatureTags() {
  for (const row of creatureTagsSeed) {
    const existing = await db
      .select({ id: refCreatureTags.id })
      .from(refCreatureTags)
      .where(eq(refCreatureTags.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refCreatureTags)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refCreatureTags.slug, row.slug));
    } else {
      await db.insert(refCreatureTags).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

export async function seedCreatureEncounterReference() {
  console.log('Seeding creature/encounter reference tables...');
  await upsertCreatureTypes();
  await upsertSizeCategories();
  await upsertMovementTypes();
  await upsertIntelligenceCategories();
  await upsertThreatLevels();
  await upsertCreatureTags();
  console.log('Finished seeding creature/encounter reference tables.');
}