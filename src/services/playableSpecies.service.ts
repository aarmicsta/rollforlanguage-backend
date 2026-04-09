// src/services/playableSpecies.service.ts

/**
 * Admin service for playable species.
 *
 * Responsibilities:
 * - return species browse records
 * - create new species records
 * - update scalar species fields
 * - return assigned species tags
 * - replace assigned species tags
 */

import { asc, eq, sql } from 'drizzle-orm'

import { db } from '../db/index.js'
import {
  playableSpecies,
  playableSpeciesTags,
  playableTags,
} from '../db/schema/canon-bridge/core/playable-identity.js'

export interface PlayableSpeciesListItem {
  id: string
  name: string
  slug: string
  displayName: string
  description: string | null
  iconMediaAssetId: string | null
  isActive: boolean | null
  sortOrder: number | null
  createdAt: string | null
  updatedAt: string | null
}

export interface PlayableSpeciesTagListItem {
  id: string
  name: string
  slug: string
  displayName: string
  description: string | null
  tagCategory: string | null
  isActive: boolean | null
  sortOrder: number | null
}

/**
 * ---------------------------------------------------------
 * Canonical ID Helpers
 * ---------------------------------------------------------
 *
 * Playable species IDs follow the established canonical
 * convention used throughout the seed data and schema:
 *
 *   species_<canonical_name>
 *
 * Example:
 *   half_orc -> species_half_orc
 */
function buildPlayableSpeciesId(name: string): string {
  return `species_${name}`
}

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayableSpeciesFromDB(): Promise<PlayableSpeciesListItem[]> {
  const results = await db
    .select({
      id: playableSpecies.id,
      name: playableSpecies.name,
      slug: playableSpecies.slug,
      displayName: playableSpecies.displayName,
      description: playableSpecies.description,
      iconMediaAssetId: playableSpecies.iconMediaAssetId,
      isActive: playableSpecies.isActive,
      sortOrder: playableSpecies.sortOrder,
      createdAt: sql<string>`DATE_FORMAT(${playableSpecies.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
      updatedAt: sql<string>`DATE_FORMAT(${playableSpecies.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as('updatedAt'),
    })
    .from(playableSpecies)
    .orderBy(playableSpecies.displayName)

  return results
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 *
 * Creates a new playable species record using:
 * - backend-generated canonical id
 * - admin-supplied canonical name/slug/displayName
 * - nullable description
 * - explicit or default active state
 *
 * Notes:
 * - `sortOrder` is intentionally omitted here so the DB default
 *   remains the source of truth for initial value assignment.
 * - `iconMediaAssetId` is also omitted for now because Create v1
 *   is focused on the minimum viable identity fields.
 */
export async function createPlayableSpeciesInDB(data: {
  displayName: string
  name: string
  slug: string
  description: string | null
  isActive: boolean
}) {
  const id = buildPlayableSpeciesId(data.name)

  await db.insert(playableSpecies).values({
    id,
    name: data.name,
    slug: data.slug,
    displayName: data.displayName,
    description: data.description,
    isActive: data.isActive,
  })

  const results = await db
    .select({
      id: playableSpecies.id,
      name: playableSpecies.name,
      slug: playableSpecies.slug,
      displayName: playableSpecies.displayName,
      description: playableSpecies.description,
      iconMediaAssetId: playableSpecies.iconMediaAssetId,
      isActive: playableSpecies.isActive,
      sortOrder: playableSpecies.sortOrder,
      createdAt: sql<string>`DATE_FORMAT(${playableSpecies.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
      updatedAt: sql<string>`DATE_FORMAT(${playableSpecies.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as('updatedAt'),
    })
    .from(playableSpecies)
    .where(eq(playableSpecies.id, id))
    .limit(1)

  return results[0] ?? null
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */

export async function updatePlayableSpeciesInDB(
  id: string,
  data: {
    displayName: string
    description: string | null
    isActive: boolean
  }
) {
  await db
    .update(playableSpecies)
    .set({
      displayName: data.displayName,
      description: data.description,
      isActive: data.isActive,
    })
    .where(eq(playableSpecies.id, id))

  const results = await db
    .select({
      id: playableSpecies.id,
      name: playableSpecies.name,
      slug: playableSpecies.slug,
      displayName: playableSpecies.displayName,
      description: playableSpecies.description,
      iconMediaAssetId: playableSpecies.iconMediaAssetId,
      isActive: playableSpecies.isActive,
      sortOrder: playableSpecies.sortOrder,
      createdAt: sql<string>`DATE_FORMAT(${playableSpecies.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
      updatedAt: sql<string>`DATE_FORMAT(${playableSpecies.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as('updatedAt'),
    })
    .from(playableSpecies)
    .where(eq(playableSpecies.id, id))
    .limit(1)

  return results[0] ?? null
}

/**
 * ---------------------------------------------------------
 * Tags
 * ---------------------------------------------------------
 */

export async function getPlayableSpeciesTagsFromDB(
  speciesId: string
): Promise<PlayableSpeciesTagListItem[]> {
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
    .from(playableSpeciesTags)
    .innerJoin(playableTags, eq(playableSpeciesTags.tagId, playableTags.id))
    .where(eq(playableSpeciesTags.speciesId, speciesId))
    .orderBy(asc(playableTags.displayName))

  return results
}

export async function updatePlayableSpeciesTagsInDB(
  speciesId: string,
  tagIds: string[]
): Promise<PlayableSpeciesTagListItem[]> {
  await db
    .delete(playableSpeciesTags)
    .where(eq(playableSpeciesTags.speciesId, speciesId))

  if (tagIds.length > 0) {
    await db.insert(playableSpeciesTags).values(
      tagIds.map((tagId) => ({
        speciesId,
        tagId,
      }))
    )
  }

  return getPlayableSpeciesTagsFromDB(speciesId)
}