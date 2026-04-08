import { and, eq } from 'drizzle-orm';

import { db } from '#db/index.js';
import {
  locations,
  locationTags,
  locationConnections,
} from '#db/schema/canon-bridge/core/world-structure.js';

import {
  locationsSeed,
  locationTagsSeed,
  locationConnectionsSeed,
} from './world-structure.data.js';

/**
 * =========================================================
 * RFL SEED RUNNER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: World Structure Systems
 *
 * Purpose:
 * Seeds canonical world structure data for:
 * - locations
 * - location_tags
 * - location_connections
 *
 * Seed strategy:
 * - `locations` use slug-based upserts
 * - `location_tags` insert only if the relationship is absent
 * - `location_connections` upsert by composite key:
 *   (from_location_id, to_location_id, connection_type)
 *
 * Notes:
 * - Location IDs are deterministic and provided directly in
 *   the seed data so hierarchical and relational references
 *   remain stable.
 * - Foreign key constraints are intentionally deferred, so
 *   seed order and ID consistency remain important.
 *
 * =========================================================
 */

async function upsertLocations() {
  for (const row of locationsSeed) {
    const existing = await db
      .select({ id: locations.id })
      .from(locations)
      .where(eq(locations.slug, row.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(locations)
        .set({
          parentLocationId: row.parentLocationId,
          name: row.name,
          slug: row.slug,
          displayName: row.displayName,
          description: row.description,
          locationTypeId: row.locationTypeId,
          locationScale: row.locationScale,
          mapMediaAssetId: row.mapMediaAssetId,
          iconMediaAssetId: row.iconMediaAssetId,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(locations.slug, row.slug));
    } else {
      await db.insert(locations).values({
        id: row.id,
        parentLocationId: row.parentLocationId,
        name: row.name,
        slug: row.slug,
        displayName: row.displayName,
        description: row.description,
        locationTypeId: row.locationTypeId,
        locationScale: row.locationScale,
        mapMediaAssetId: row.mapMediaAssetId,
        iconMediaAssetId: row.iconMediaAssetId,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

async function insertLocationTags() {
  for (const row of locationTagsSeed) {
    const existing = await db
      .select({
        locationId: locationTags.locationId,
        tagId: locationTags.tagId,
      })
      .from(locationTags)
      .where(
        and(
          eq(locationTags.locationId, row.locationId),
          eq(locationTags.tagId, row.tagId)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      await db.insert(locationTags).values({
        locationId: row.locationId,
        tagId: row.tagId,
      });
    }
  }
}

async function upsertLocationConnections() {
  for (const row of locationConnectionsSeed) {
    const existing = await db
      .select({
        fromLocationId: locationConnections.fromLocationId,
        toLocationId: locationConnections.toLocationId,
        connectionType: locationConnections.connectionType,
      })
      .from(locationConnections)
      .where(
        and(
          eq(locationConnections.fromLocationId, row.fromLocationId),
          eq(locationConnections.toLocationId, row.toLocationId),
          eq(locationConnections.connectionType, row.connectionType)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(locationConnections)
        .set({
          description: row.description,
          isActive: row.isActive,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(locationConnections.fromLocationId, row.fromLocationId),
            eq(locationConnections.toLocationId, row.toLocationId),
            eq(locationConnections.connectionType, row.connectionType)
          )
        );
    } else {
      await db.insert(locationConnections).values({
        fromLocationId: row.fromLocationId,
        toLocationId: row.toLocationId,
        connectionType: row.connectionType,
        description: row.description,
        isActive: row.isActive,
        sortOrder: row.sortOrder,
      });
    }
  }
}

export async function seedWorldStructure() {
  console.log('Seeding world structure tables...');
  await upsertLocations();
  await insertLocationTags();
  await upsertLocationConnections();
  console.log('Finished seeding world structure tables.');
}