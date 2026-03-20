import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

import { db } from '../../../index';
import {
  refPlayableStats,
  refDamageTypes,
  refAlignments,
  refStatusEffects,
} from '../../../schema/canon-bridge/reference/reference-character-trait';

import {
  playableStatsSeed,
  damageTypesSeed,
  alignmentsSeed,
  statusEffectsSeed,
} from './character-traits.data';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Character / Trait Systems
 *
 * Purpose:
 * Seeds canonical reference data for:
 * - ref_playable_stats
 * - ref_damage_types
 * - ref_alignments
 * - ref_status_effects
 *
 * Seed strategy:
 * - Match existing rows by unique slug
 * - Insert if not found
 * - Update if found
 *
 * Why slug-based upserts?
 * - slug is the canonical stable identity for reference data
 * - IDs are generated only on first insert
 * - seed runs remain safe and repeatable
 *
 * =========================================================
 */

async function upsertPlayableStats() {
  for (const row of playableStatsSeed) {
    const existing = await db
      .select({ id: refPlayableStats.id })
      .from(refPlayableStats)
      .where(eq(refPlayableStats.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refPlayableStats)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refPlayableStats.slug, row.slug));
    } else {
      await db.insert(refPlayableStats).values({
        id: randomUUID(),
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

async function upsertDamageTypes() {
  for (const row of damageTypesSeed) {
    const existing = await db
      .select({ id: refDamageTypes.id })
      .from(refDamageTypes)
      .where(eq(refDamageTypes.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refDamageTypes)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refDamageTypes.slug, row.slug));
    } else {
      await db.insert(refDamageTypes).values({
        id: randomUUID(),
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

async function upsertAlignments() {
  for (const row of alignmentsSeed) {
    const existing = await db
      .select({ id: refAlignments.id })
      .from(refAlignments)
      .where(eq(refAlignments.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refAlignments)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          alignmentAxis: row.alignmentAxis,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refAlignments.slug, row.slug));
    } else {
      await db.insert(refAlignments).values({
        id: randomUUID(),
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        alignmentAxis: row.alignmentAxis,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertStatusEffects() {
  for (const row of statusEffectsSeed) {
    const existing = await db
      .select({ id: refStatusEffects.id })
      .from(refStatusEffects)
      .where(eq(refStatusEffects.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refStatusEffects)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          effectType: row.effectType,
          iconMediaAssetId: row.iconMediaAssetId,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refStatusEffects.slug, row.slug));
    } else {
      await db.insert(refStatusEffects).values({
        id: randomUUID(),
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        effectType: row.effectType,
        iconMediaAssetId: row.iconMediaAssetId,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

export async function seedCharacterTraitsReference() {
  console.log('Seeding character/trait reference tables...');
  await upsertPlayableStats();
  await upsertDamageTypes();
  await upsertAlignments();
  await upsertStatusEffects();
  console.log('Finished seeding character/trait reference tables.');
}