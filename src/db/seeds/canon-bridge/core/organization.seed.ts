import { and, eq } from 'drizzle-orm';

import { db } from '@/db/index';
import {
  organizations,
  organizationTags,
} from '@schema/canon-bridge/core/organization';

import {
  organizationsSeed,
  organizationTagsSeed,
} from '@seeds/canon-bridge/core/organization.data';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Social Entities — Organizations
 *
 * Purpose:
 * Seeds canonical data for:
 * - organizations
 * - organization_tags
 *
 * Seed strategy:
 * - `organizations`: match existing rows by unique slug
 * - `organization_tags`: match existing rows by composite key
 * - Insert if not found
 * - Update if found
 *
 * =========================================================
 */

async function upsertOrganizations() {
  for (const row of organizationsSeed) {
    const existing = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(organizations)
        .set({
          id: row.id,
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
        .where(eq(organizations.slug, row.slug));
    } else {
      await db.insert(organizations).values({
        id: row.id,
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

async function upsertOrganizationTags() {
  for (const row of organizationTagsSeed) {
    const existing = await db
      .select({
        organizationId: organizationTags.organizationId,
        tagId: organizationTags.tagId,
      })
      .from(organizationTags)
      .where(
        and(
          eq(organizationTags.organizationId, row.organizationId),
          eq(organizationTags.tagId, row.tagId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(organizationTags)
        .set({
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(organizationTags.organizationId, row.organizationId),
            eq(organizationTags.tagId, row.tagId)
          )
        );
    } else {
      await db.insert(organizationTags).values({
        organizationId: row.organizationId,
        tagId: row.tagId,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

export async function seedOrganizations() {
  console.log('Seeding organizations...');
  await upsertOrganizations();
  await upsertOrganizationTags();
  console.log('Finished seeding organizations.');
}