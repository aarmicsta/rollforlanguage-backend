import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

import { db } from '../../../index';
import {
  refLocationTypes,
  refLocationTags,
} from '../../../schema/canon-bridge/reference/reference-world-structure';

import {
  locationTypesSeed,
  locationTagsSeed,
} from './ref-world-structure.data';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — World Structure Systems
 *
 * Purpose:
 * Seeds canonical reference data for:
 * - ref_location_types
 * - ref_location_tags
 *
 * Seed strategy:
 * - Match existing rows by unique slug
 * - Insert if not found
 * - Update if found
 *
 * Notes:
 * - `ref_location_types` uses canonical deterministic IDs
 *   from the seed data because hierarchical type references
 *   depend on stable parent IDs.
 * - `ref_location_tags` uses generated UUIDs on insert,
 *   consistent with other reference tables.
 *
 * =========================================================
 */

async function upsertLocationTypes() {
  for (const row of locationTypesSeed) {
    const existing = await db
      .select({ id: refLocationTypes.id })
      .from(refLocationTypes)
      .where(eq(refLocationTypes.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refLocationTypes)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          parentLocationTypeId: row.parentLocationTypeId,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refLocationTypes.slug, row.slug));
    } else {
      await db.insert(refLocationTypes).values({
        id: row.id,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        parentLocationTypeId: row.parentLocationTypeId,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function upsertLocationTags() {
  for (const row of locationTagsSeed) {
    const existing = await db
      .select({ id: refLocationTags.id })
      .from(refLocationTags)
      .where(eq(refLocationTags.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refLocationTags)
        .set({
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          tagCategory: row.tagCategory,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refLocationTags.slug, row.slug));
    } else {
      await db.insert(refLocationTags).values({
        id: randomUUID(),
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        tagCategory: row.tagCategory,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

export async function seedWorldStructureReference() {
  console.log('Seeding world structure reference tables...');
  await upsertLocationTypes();
  await upsertLocationTags();
  console.log('Finished seeding world structure reference tables.');
}