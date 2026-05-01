// src/services/faction.service.ts

/**
 * Admin service for factions.
 *
 * Responsibilities:
 * - return faction browse records
 *
 * Notes:
 * - Factions represent macro-level social power entities
 * - Alignment is hydrated from ref_alignments when available
 * - Tags remain relational and should be handled separately later
 */

import { asc, eq, sql } from 'drizzle-orm'

import { db } from '../db/index.js'
import { factions } from '../db/schema/canon-bridge/core/faction.js'
import { refAlignments } from '../db/schema/canon-bridge/reference/reference-playable-trait.js'

/**
 * ---------------------------------------------------------
 * Browse Types
 * ---------------------------------------------------------
 */
export interface FactionListItem {
  id: string
  name: string
  slug: string
  displayName: string
  description: string | null

  alignmentId: string | null
  alignment: string | null

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
 */
export async function getFactionsFromDB(): Promise<FactionListItem[]> {
  const results = await db
    .select({
      id: factions.id,
      name: factions.name,
      slug: factions.slug,
      displayName: factions.displayName,
      description: factions.description,

      alignmentId: factions.alignmentId,
      alignment: refAlignments.displayName,

      iconMediaAssetId: factions.iconMediaAssetId,
      isActive: factions.isActive,
      sortOrder: factions.sortOrder,
      createdAt:
        sql<string>`DATE_FORMAT(${factions.createdAt}, '%Y-%m-%d %H:%i:%s')`.as(
          'createdAt'
        ),
      updatedAt:
        sql<string>`DATE_FORMAT(${factions.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as(
          'updatedAt'
        ),
    })
    .from(factions)
    .leftJoin(refAlignments, eq(factions.alignmentId, refAlignments.id))
    .orderBy(asc(factions.displayName))

  return results
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */
export async function updateFactionInDB(
  id: string,
  data: {
    displayName: string
    description: string | null
    isActive: boolean
  }
): Promise<FactionListItem | null> {
  await db
    .update(factions)
    .set({
      displayName: data.displayName,
      description: data.description,
      isActive: data.isActive,
    })
    .where(eq(factions.id, id))

  const results = await getFactionsFromDB()

  return results.find((f) => f.id === id) ?? null
}