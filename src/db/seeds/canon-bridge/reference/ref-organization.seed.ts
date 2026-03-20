import { eq } from 'drizzle-orm';

import { db } from '@/db/index';
import { refOrganizationTags } from '@schema/canon-bridge/reference/reference-organization';

import { organizationTagsSeed } from '@seeds/canon-bridge/reference/ref-organization.data';

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
 * - ref_organization_tags
 *
 * Seed strategy:
 * - Match existing rows by unique slug
 * - Insert if not found (using canonical ID)
 * - Update if found
 *
 * =========================================================
 */

async function upsertOrganizationTags() {
  for (const row of organizationTagsSeed) {
    const existing = await db
      .select({ id: refOrganizationTags.id })
      .from(refOrganizationTags)
      .where(eq(refOrganizationTags.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(refOrganizationTags)
        .set({
          id: row.id, // reinforce canonical ID consistency
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(refOrganizationTags.slug, row.slug));
    } else {
      await db.insert(refOrganizationTags).values({
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

export async function seedOrganizationReference() {
  console.log('Seeding organization reference tables...');
  await upsertOrganizationTags();
  console.log('Finished seeding organization reference tables.');
}