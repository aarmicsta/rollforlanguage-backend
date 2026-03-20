import { and, eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

import { db } from '@/db/index';
import { factions, factionTags } from '@/db/schema/canon-bridge/core/faction';

import { factionsSeed, factionTagsSeed } from './faction.data';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Social Entities — Factions
 *
 * Purpose:
 * Seeds canonical data for:
 * - factions
 * - faction_tags
 *
 * Seed strategy:
 * - `factions`: match existing rows by unique slug
 * - `faction_tags`: match existing rows by composite key
 * - Insert if not found
 * - Update if found
 *
 * =========================================================
 */

async function upsertFactions() {
  for (const row of factionsSeed) {
    const existing = await db
      .select({ id: factions.id })
      .from(factions)
      .where(eq(factions.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(factions)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          alignmentId: row.alignmentId,
          iconMediaAssetId: row.iconMediaAssetId,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(factions.slug, row.slug));
    } else {
      await db.insert(factions).values({
        id: randomUUID(),
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        alignmentId: row.alignmentId,
        iconMediaAssetId: row.iconMediaAssetId,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertFactionTags() {
  for (const row of factionTagsSeed) {
    const existing = await db
      .select({
        factionId: factionTags.factionId,
        tagId: factionTags.tagId,
      })
      .from(factionTags)
      .where(
        and(
          eq(factionTags.factionId, row.factionId),
          eq(factionTags.tagId, row.tagId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(factionTags)
        .set({
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(factionTags.factionId, row.factionId),
            eq(factionTags.tagId, row.tagId)
          )
        );
    } else {
      await db.insert(factionTags).values({
        factionId: row.factionId,
        tagId: row.tagId,
      });
    }
  }
}

export async function seedFactions() {
  console.log('Seeding factions...');
  await upsertFactions();
  await upsertFactionTags();
  console.log('Finished seeding factions.');
}