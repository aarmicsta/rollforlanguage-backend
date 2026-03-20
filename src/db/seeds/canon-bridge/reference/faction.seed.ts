import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

import { db } from '../../../index';
import { refFactionTags } from '../../../schema/canon-bridge/reference/reference-faction';

import { factionTagsSeed } from './faction.data';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Social Entities
 *
 * Purpose:
 * Seeds canonical reference data for:
 * - ref_faction_tags
 *
 * Seed strategy:
 * - Match existing rows by unique slug
 * - Insert if not found
 * - Update if found
 *
 * =========================================================
 */

async function upsertFactionTags() {
  for (const row of factionTagsSeed) {
    const existing = await db
      .select({ id: refFactionTags.id })
      .from(refFactionTags)
      .where(eq(refFactionTags.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refFactionTags)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refFactionTags.slug, row.slug));
    } else {
      await db.insert(refFactionTags).values({
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

export async function seedFactionReference() {
  console.log('Seeding faction reference tables...');
  await upsertFactionTags();
  console.log('Finished seeding faction reference tables.');
}