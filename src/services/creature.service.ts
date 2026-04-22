// src/services/creature.service.ts

/**
 * Admin service for creatures.
 *
 * Responsibilities:
 * - return creature browse records
 *
 * Notes:
 * - This first-pass service is intentionally limited to the
 *   canonical creature browse view.
 * - It returns hydrated display labels for reference-linked
 *   creature fields so the frontend does not need to resolve
 *   raw foreign key ids on its own.
 * - Tags, stat values, create flows, and update flows will be
 *   added later as separate concerns once the first vertical
 *   slice is stable.
 */

import { asc, eq, sql } from 'drizzle-orm'

import { db } from '../db/index.js'
import { creatures } from '../db/schema/canon-bridge/core/creature.js'
import {
  refCreatureTypes,
  refSizeCategories,
  refIntelligenceCategories,
  refThreatLevels,
} from '../db/schema/canon-bridge/reference/reference-creature-encounter.js'

/**
 * ---------------------------------------------------------
 * Browse Types
 * ---------------------------------------------------------
 *
 * Frontend-friendly browse shape for the admin creature table.
 *
 * Important:
 * - We expose hydrated reference labels instead of raw ids for
 *   creature type, size, intelligence, and threat level.
 * - Optional relationships remain nullable so the API response
 *   accurately reflects the current schema.
 */
export interface CreatureListItem {
  id: string
  name: string
  slug: string
  displayName: string
  description: string | null

  creatureType: string
  sizeCategory: string
  intelligenceCategory: string | null
  threatLevel: string | null

  iconMediaAssetId: string | null
  isActive: boolean | null
  sortOrder: number | null
  createdAt: string | null
  updatedAt: string | null
}

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 *
 * Returns canonical creature records for the admin browse view.
 *
 * Query behavior:
 * - inner join creature type because creatures require it
 * - inner join size category because creatures require it
 * - left join intelligence category because it is optional
 * - left join threat level because it is optional
 *
 * Output behavior:
 * - timestamps are formatted as strings to match existing admin
 *   service conventions used elsewhere in the backend
 * - results are ordered by display name for stable, human-first
 *   browsing in admin tables
 */
export async function getCreaturesFromDB(): Promise<CreatureListItem[]> {
  const results = await db
    .select({
      id: creatures.id,
      name: creatures.name,
      slug: creatures.slug,
      displayName: creatures.displayName,
      description: creatures.description,

      creatureType: refCreatureTypes.displayName,
      sizeCategory: refSizeCategories.displayName,
      intelligenceCategory: refIntelligenceCategories.displayName,
      threatLevel: refThreatLevels.displayName,

      iconMediaAssetId: creatures.iconMediaAssetId,
      isActive: creatures.isActive,
      sortOrder: creatures.sortOrder,
      createdAt:
        sql<string>`DATE_FORMAT(${creatures.createdAt}, '%Y-%m-%d %H:%i:%s')`.as(
          'createdAt'
        ),
      updatedAt:
        sql<string>`DATE_FORMAT(${creatures.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as(
          'updatedAt'
        ),
    })
    .from(creatures)
    .innerJoin(
      refCreatureTypes,
      eq(creatures.creatureTypeId, refCreatureTypes.id)
    )
    .innerJoin(
      refSizeCategories,
      eq(creatures.sizeCategoryId, refSizeCategories.id)
    )
    .leftJoin(
      refIntelligenceCategories,
      eq(creatures.intelligenceCategoryId, refIntelligenceCategories.id)
    )
    .leftJoin(
      refThreatLevels,
      eq(creatures.threatLevelId, refThreatLevels.id)
    )
    .orderBy(asc(creatures.displayName))

  return results
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 *
 * Updates core scalar creature fields for the admin edit flow.
 *
 * Current scope:
 * - displayName
 * - description
 * - isActive
 *
 * Notes:
 * - This intentionally mirrors the canonical Playables update
 *   pattern: update scalar fields, then re-select the record
 *   using the same browse-shaped projection used elsewhere.
 * - Classification/reference fields are not edited here.
 */
export async function updateCreatureInDB(
  id: string,
  data: {
    displayName: string
    description: string | null
    isActive: boolean
  }
): Promise<CreatureListItem | null> {
  await db
    .update(creatures)
    .set({
      displayName: data.displayName,
      description: data.description,
      isActive: data.isActive,
    })
    .where(eq(creatures.id, id))

  const results = await db
    .select({
      id: creatures.id,
      name: creatures.name,
      slug: creatures.slug,
      displayName: creatures.displayName,
      description: creatures.description,

      creatureType: refCreatureTypes.displayName,
      sizeCategory: refSizeCategories.displayName,
      intelligenceCategory: refIntelligenceCategories.displayName,
      threatLevel: refThreatLevels.displayName,

      iconMediaAssetId: creatures.iconMediaAssetId,
      isActive: creatures.isActive,
      sortOrder: creatures.sortOrder,
      createdAt:
        sql<string>`DATE_FORMAT(${creatures.createdAt}, '%Y-%m-%d %H:%i:%s')`.as(
          'createdAt'
        ),
      updatedAt:
        sql<string>`DATE_FORMAT(${creatures.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as(
          'updatedAt'
        ),
    })
    .from(creatures)
    .innerJoin(
      refCreatureTypes,
      eq(creatures.creatureTypeId, refCreatureTypes.id)
    )
    .innerJoin(
      refSizeCategories,
      eq(creatures.sizeCategoryId, refSizeCategories.id)
    )
    .leftJoin(
      refIntelligenceCategories,
      eq(creatures.intelligenceCategoryId, refIntelligenceCategories.id)
    )
    .leftJoin(
      refThreatLevels,
      eq(creatures.threatLevelId, refThreatLevels.id)
    )
    .where(eq(creatures.id, id))
    .limit(1)

  return results[0] ?? null
}