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

import { and, asc, eq, sql } from 'drizzle-orm'

import { db } from '../db/index.js'
import { 
  creatures,
  creatureTags,
  creatureBaseStatValues,
} from '../db/schema/canon-bridge/core/creature.js'
import {
  refCreatureTypes,
  refSizeCategories,
  refIntelligenceCategories,
  refThreatLevels,
} from '../db/schema/canon-bridge/reference/reference-creature-encounter.js'
import { playableTags } from '../db/schema/canon-bridge/core/playable-identity.js'
import { refPlayableStats } from '../db/schema/canon-bridge/reference/reference-playable-trait.js'

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

  creatureTypeId: string
  sizeCategoryId: string
  intelligenceCategoryId: string | null
  threatLevelId: string | null

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
 * Canonical ID Helpers
 * ---------------------------------------------------------
 *
 * Creature IDs follow the established canonical convention
 * used across admin-created identity records:
 *
 *   creature_<canonical_name>
 *
 * Example:
 *   cave_troll -> creature_cave_troll
 */
function buildCreatureId(name: string): string {
  return `creature_${name}`
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

      creatureTypeId: creatures.creatureTypeId,
      sizeCategoryId: creatures.sizeCategoryId,
      intelligenceCategoryId: creatures.intelligenceCategoryId,
      threatLevelId: creatures.threatLevelId,

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
 * Create
 * ---------------------------------------------------------
 *
 * Creates a new canonical creature record using:
 * - backend-generated canonical id
 * - admin-supplied canonical name/slug/displayName
 * - required classification ids
 * - nullable description
 * - explicit or default active state
 *
 * Notes:
 * - `creatureTypeId` and `sizeCategoryId` are required by the
 *   schema and must be supplied at create time.
 * - `sortOrder` is intentionally omitted so the DB default
 *   remains the source of truth for initial assignment.
 * - optional fields such as intelligence, threat level, and
 *   icon media are intentionally deferred in Create v1.
 */
export async function createCreatureInDB(data: {
  displayName: string
  name: string
  slug: string
  description: string | null
  creatureTypeId: string
  sizeCategoryId: string
  isActive: boolean
}): Promise<CreatureListItem | null> {
  const id = buildCreatureId(data.name)

  await db.insert(creatures).values({
    id,
    name: data.name,
    slug: data.slug,
    displayName: data.displayName,
    description: data.description,
    creatureTypeId: data.creatureTypeId,
    sizeCategoryId: data.sizeCategoryId,
    isActive: data.isActive,
  })

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

      creatureTypeId: creatures.creatureTypeId,
      sizeCategoryId: creatures.sizeCategoryId,
      intelligenceCategoryId: creatures.intelligenceCategoryId,
      threatLevelId: creatures.threatLevelId,

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
    creatureTypeId: string
    sizeCategoryId: string
    intelligenceCategoryId: string | null
    threatLevelId: string | null
    isActive: boolean
  }
): Promise<CreatureListItem | null> {
  await db
    .update(creatures)
    .set({
      displayName: data.displayName,
      description: data.description,
      creatureTypeId: data.creatureTypeId,
      sizeCategoryId: data.sizeCategoryId,
      intelligenceCategoryId: data.intelligenceCategoryId,
      threatLevelId: data.threatLevelId,
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

      creatureTypeId: creatures.creatureTypeId,
      sizeCategoryId: creatures.sizeCategoryId,
      intelligenceCategoryId: creatures.intelligenceCategoryId,
      threatLevelId: creatures.threatLevelId,

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

/**
 * ---------------------------------------------------------
 * Creature Tags
 * ---------------------------------------------------------
 *
 * Mirrors the canonical Playables tag-assignment pattern.
 *
 * Responsibilities:
 * - fetch assigned tags for a creature
 * - replace all assigned tags for a creature
 *
 * Notes:
 * - uses replace-all pattern (delete → insert)
 * - returns canonical tag list shape for UI consumption
 */

/**
 * Fetch assigned tags for a creature
 */
export async function getCreatureTagsFromDB(
  creatureId: string
) {
  const results = await db
    .select({
      id: playableTags.id,
      name: playableTags.name,
      slug: playableTags.slug,
      displayName: playableTags.displayName,
      description: playableTags.description,
      tagCategory: playableTags.tagCategory,
      isActive: playableTags.isActive,
      sortOrder: playableTags.sortOrder,
    })
    .from(creatureTags)
    .innerJoin(
      playableTags,
      eq(creatureTags.tagId, playableTags.id)
    )
    .where(eq(creatureTags.creatureId, creatureId))
    .orderBy(asc(playableTags.displayName))

  return results
}

/**
 * Replace assigned tags for a creature
 */
export async function updateCreatureTagsInDB(
  creatureId: string,
  tagIds: string[]
) {
  // Remove existing assignments
  await db
    .delete(creatureTags)
    .where(eq(creatureTags.creatureId, creatureId))

  // Insert new assignments
  if (tagIds.length > 0) {
    await db.insert(creatureTags).values(
      tagIds.map((tagId) => ({
        creatureId,
        tagId,
      }))
    )
  }

  return getCreatureTagsFromDB(creatureId)
}

/**
 * =========================================================
 * Reference Lookups
 * =========================================================
 *
 * Provides canonical reference data for creature creation
 * and editing workflows.
 *
 * Responsibilities:
 * - return creature type options
 * - return size category options
 *
 * Notes:
 * - these endpoints mirror the canonical reference-table
 *   usage pattern established across the platform
 * - results are intentionally lightweight and UI-friendly
 * - ordering is based on sortOrder for consistent display
 * =========================================================
 */

/**
 * ---------------------------------------------------------
 * Creature Types
 * ---------------------------------------------------------
 *
 * Returns canonical creature type options for admin forms.
 *
 * Output shape:
 * - id
 * - name
 * - slug
 * - displayName
 * - description
 * - isActive
 * - sortOrder
 */
export async function getCreatureTypesFromDB() {
  const results = await db
    .select({
      id: refCreatureTypes.id,
      name: refCreatureTypes.name,
      slug: refCreatureTypes.slug,
      displayName: refCreatureTypes.displayName,
      description: refCreatureTypes.description,
      isActive: refCreatureTypes.isActive,
      sortOrder: refCreatureTypes.sortOrder,
    })
    .from(refCreatureTypes)
    .orderBy(asc(refCreatureTypes.sortOrder))

  return results
}

/**
 * ---------------------------------------------------------
 * Size Categories
 * ---------------------------------------------------------
 *
 * Returns canonical size category options for admin forms.
 *
 * Output shape:
 * - id
 * - name
 * - slug
 * - displayName
 * - description
 * - sizeRank
 * - isActive
 * - sortOrder
 */
export async function getSizeCategoriesFromDB() {
  const results = await db
    .select({
      id: refSizeCategories.id,
      name: refSizeCategories.name,
      slug: refSizeCategories.slug,
      displayName: refSizeCategories.displayName,
      description: refSizeCategories.description,
      sizeRank: refSizeCategories.sizeRank,
      isActive: refSizeCategories.isActive,
      sortOrder: refSizeCategories.sortOrder,
    })
    .from(refSizeCategories)
    .orderBy(asc(refSizeCategories.sortOrder))

  return results
}

/**
 * ---------------------------------------------------------
 * Intelligence Categories
 * ---------------------------------------------------------
 *
 * Returns canonical intelligence category options for admin
 * creature edit forms.
 *
 * These values are optional on creature records, so the UI can
 * also allow an empty / unassigned selection.
 */
export async function getIntelligenceCategoriesFromDB() {
  const results = await db
    .select({
      id: refIntelligenceCategories.id,
      name: refIntelligenceCategories.name,
      slug: refIntelligenceCategories.slug,
      displayName: refIntelligenceCategories.displayName,
      description: refIntelligenceCategories.description,
      intelligenceRank: refIntelligenceCategories.intelligenceRank,
      isActive: refIntelligenceCategories.isActive,
      sortOrder: refIntelligenceCategories.sortOrder,
    })
    .from(refIntelligenceCategories)
    .orderBy(asc(refIntelligenceCategories.sortOrder))

  return results
}

/**
 * ---------------------------------------------------------
 * Threat Levels
 * ---------------------------------------------------------
 *
 * Returns canonical threat level options for admin creature
 * edit forms.
 *
 * These values are optional on creature records, so the UI can
 * also allow an empty / unassigned selection.
 */
export async function getThreatLevelsFromDB() {
  const results = await db
    .select({
      id: refThreatLevels.id,
      name: refThreatLevels.name,
      slug: refThreatLevels.slug,
      displayName: refThreatLevels.displayName,
      description: refThreatLevels.description,
      threatRank: refThreatLevels.threatRank,
      recommendedLevelMin: refThreatLevels.recommendedLevelMin,
      recommendedLevelMax: refThreatLevels.recommendedLevelMax,
      isActive: refThreatLevels.isActive,
      sortOrder: refThreatLevels.sortOrder,
    })
    .from(refThreatLevels)
    .orderBy(asc(refThreatLevels.sortOrder))

  return results
}

/**
 * ---------------------------------------------------------
 * Creature Base Stat Types
 * ---------------------------------------------------------
 *
 * Admin-facing shapes for the creature base stat subsystem.
 *
 * Notes:
 * - Base stats represent the foundational stat layer for a
 *   canonical creature template.
 * - Future systems such as level scaling, environmental
 *   modifiers, and variant overlays should layer on top of
 *   these values rather than replacing this concept.
 */
export interface CreatureBaseStatsTableRow {
  creatureId: string
  creatureDisplayName: string

  creatureTypeId: string
  sizeCategoryId: string
  intelligenceCategoryId: string | null
  threatLevelId: string | null

  creatureType: string
  sizeCategory: string
  intelligenceCategory: string | null
  threatLevel: string | null

  assignedStatCount: number
  updatedAt: string | null
}

export interface CreatureBaseStatEditRow {
  statId: string
  statName: string
  statSlug: string
  statDisplayName: string
  baseValue: number | null
  sortOrder: number | null
}

export interface UpdateCreatureBaseStatsInput {
  stats: Array<{
    statId: string
    baseValue: number | null
  }>
}

/**
 * =========================================================
 * Creature Base Stats
 * =========================================================
 *
 * Provides the V1 base-stat assignment layer for canonical
 * creature templates.
 *
 * Responsibilities:
 * - return creature-level base stat summary rows for admin
 *   table display
 * - return a merged editable view of canonical stat definitions
 *   and a selected creature's stored base values
 * - replace stored base stat values for a creature
 *
 * Notes:
 * - this subsystem intentionally models base values only
 * - it does not model derived/final stat calculation
 * - future modifier/scaling systems should layer on top of
 *   these base values
 * =========================================================
 */

/**
 * ---------------------------------------------------------
 * Browse Creature Base Stat Summaries
 * ---------------------------------------------------------
 *
 * Returns one admin-facing row per creature.
 *
 * The row summarizes whether base stats have been assigned
 * without exposing the full stat set in the table itself.
 */
export async function getCreatureBaseStatsTableFromDB(): Promise<
  CreatureBaseStatsTableRow[]
> {
  const assignedCounts = await db
    .select({
      creatureId: creatureBaseStatValues.creatureId,
      assignedStatCount: sql<number>`COUNT(${creatureBaseStatValues.statId})`.as(
        'assignedStatCount'
      ),
      updatedAt:
        sql<string>`DATE_FORMAT(MAX(${creatureBaseStatValues.updatedAt}), '%Y-%m-%d %H:%i:%s')`.as(
          'updatedAt'
        ),
    })
    .from(creatureBaseStatValues)
    .groupBy(creatureBaseStatValues.creatureId)

  const countMap = new Map(
    assignedCounts.map((row) => [
      row.creatureId,
      {
        assignedStatCount: Number(row.assignedStatCount ?? 0),
        updatedAt: row.updatedAt ?? null,
      },
    ])
  )

  const creaturesList = await getCreaturesFromDB()

  return creaturesList.map((creature) => {
    const statSummary = countMap.get(creature.id)

    return {
      creatureId: creature.id,
      creatureDisplayName: creature.displayName,

      creatureTypeId: creature.creatureTypeId,
      sizeCategoryId: creature.sizeCategoryId,
      intelligenceCategoryId: creature.intelligenceCategoryId,
      threatLevelId: creature.threatLevelId,

      creatureType: creature.creatureType,
      sizeCategory: creature.sizeCategory,
      intelligenceCategory: creature.intelligenceCategory,
      threatLevel: creature.threatLevel,

      assignedStatCount: statSummary?.assignedStatCount ?? 0,
      updatedAt: statSummary?.updatedAt ?? creature.updatedAt,
    }
  })
}

/**
 * ---------------------------------------------------------
 * Get Creature Base Stats
 * ---------------------------------------------------------
 *
 * Returns all canonical stat definitions merged with any
 * currently stored base stat values for the selected creature.
 *
 * Missing base stat rows are returned with baseValue = null
 * so the admin UI can present a complete editable stat list
 * without implying that every stat has already been assigned.
 */
export async function getCreatureBaseStatsFromDB(
  creatureId: string
): Promise<CreatureBaseStatEditRow[]> {
  const statDefinitions = await db
    .select({
      statId: refPlayableStats.id,
      statName: refPlayableStats.name,
      statSlug: refPlayableStats.slug,
      statDisplayName: refPlayableStats.displayName,
      sortOrder: refPlayableStats.sortOrder,
    })
    .from(refPlayableStats)
    .where(eq(refPlayableStats.isActive, true))
    .orderBy(asc(refPlayableStats.sortOrder), asc(refPlayableStats.displayName))

  const storedValues = await db
    .select({
      statId: creatureBaseStatValues.statId,
      baseValue: creatureBaseStatValues.statValue,
    })
    .from(creatureBaseStatValues)
    .where(eq(creatureBaseStatValues.creatureId, creatureId))

  const valueMap = new Map(
    storedValues.map((row) => [row.statId, row.baseValue])
  )

  return statDefinitions.map((stat) => ({
    ...stat,
    baseValue: valueMap.get(stat.statId) ?? null,
  }))
}

/**
 * ---------------------------------------------------------
 * Update Creature Base Stats
 * ---------------------------------------------------------
 *
 * Replaces all stored base stat values for a creature.
 *
 * Behavior:
 * - deletes existing base stat rows for the creature
 * - inserts a row for each provided non-null base value
 *
 * Notes:
 * - null values mean "no stored base value" and are omitted
 * - zero is preserved as a real numeric value
 */
export async function updateCreatureBaseStatsInDB(
  creatureId: string,
  input: UpdateCreatureBaseStatsInput
): Promise<CreatureBaseStatEditRow[]> {
  await db
    .delete(creatureBaseStatValues)
    .where(eq(creatureBaseStatValues.creatureId, creatureId))

  const rowsToInsert = input.stats
    .filter((item) => item.baseValue !== null)
    .map((item) => ({
      creatureId,
      statId: item.statId,
      statValue: item.baseValue as number,
    }))

  if (rowsToInsert.length > 0) {
    await db.insert(creatureBaseStatValues).values(rowsToInsert)
  }

  return getCreatureBaseStatsFromDB(creatureId)
}

