// src/services/playableClass.service.ts

/**
 * Admin service for playable classes.
 *
 * Responsibilities:
 * - return class browse records
 * - create new class records
 * - update scalar class fields
 * - return assigned class tags
 * - replace assigned class tags
 */

import { asc, eq, sql } from 'drizzle-orm'

import { db } from '../db/index.js'
import {
  playableClasses,
  playableClassTags,
  playableTags,
  playableClassPassives,
  playablePassives,
} from '../db/schema/canon-bridge/core/playable-identity.js'

export interface PlayableClassListItem {
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

export interface PlayableClassTagListItem {
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
 * Playable class IDs follow the established canonical
 * convention used throughout the seed data and schema:
 *
 *   class_<canonical_name>
 *
 * Example:
 *   wizard -> class_wizard
 */
function buildPlayableClassId(name: string): string {
  return `class_${name}`
}

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayableClassesFromDB(): Promise<PlayableClassListItem[]> {
  const results = await db
    .select({
      id: playableClasses.id,
      name: playableClasses.name,
      slug: playableClasses.slug,
      displayName: playableClasses.displayName,
      description: playableClasses.description,
      iconMediaAssetId: playableClasses.iconMediaAssetId,
      isActive: playableClasses.isActive,
      sortOrder: playableClasses.sortOrder,
      createdAt: sql<string>`DATE_FORMAT(${playableClasses.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
      updatedAt: sql<string>`DATE_FORMAT(${playableClasses.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as('updatedAt'),
    })
    .from(playableClasses)
    .orderBy(playableClasses.displayName)

  return results
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 *
 * Creates a new playable class record using:
 * - backend-generated canonical id
 * - admin-supplied canonical name/slug/displayName
 * - nullable description
 * - explicit or default active state
 *
 * Notes:
 * - `sortOrder` is intentionally omitted here so the DB default
 *   remains the source of truth for initial value assignment.
 * - `iconMediaAssetId` and `startingWeaponItemId` are also
 *   omitted for now because Create v1 is focused on the minimum
 *   viable identity fields.
 */
export async function createPlayableClassInDB(data: {
  displayName: string
  name: string
  slug: string
  description: string | null
  isActive: boolean
}) {
  const id = buildPlayableClassId(data.name)

  await db.insert(playableClasses).values({
    id,
    name: data.name,
    slug: data.slug,
    displayName: data.displayName,
    description: data.description,
    isActive: data.isActive,
  })

  const results = await db
    .select({
      id: playableClasses.id,
      name: playableClasses.name,
      slug: playableClasses.slug,
      displayName: playableClasses.displayName,
      description: playableClasses.description,
      iconMediaAssetId: playableClasses.iconMediaAssetId,
      isActive: playableClasses.isActive,
      sortOrder: playableClasses.sortOrder,
      createdAt: sql<string>`DATE_FORMAT(${playableClasses.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
      updatedAt: sql<string>`DATE_FORMAT(${playableClasses.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as('updatedAt'),
    })
    .from(playableClasses)
    .where(eq(playableClasses.id, id))
    .limit(1)

  return results[0] ?? null
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */

export async function updatePlayableClassInDB(
  id: string,
  data: {
    displayName: string
    description: string | null
    isActive: boolean
  }
) {
  await db
    .update(playableClasses)
    .set({
      displayName: data.displayName,
      description: data.description,
      isActive: data.isActive,
    })
    .where(eq(playableClasses.id, id))

  const results = await db
    .select({
      id: playableClasses.id,
      name: playableClasses.name,
      slug: playableClasses.slug,
      displayName: playableClasses.displayName,
      description: playableClasses.description,
      iconMediaAssetId: playableClasses.iconMediaAssetId,
      isActive: playableClasses.isActive,
      sortOrder: playableClasses.sortOrder,
      createdAt: sql<string>`DATE_FORMAT(${playableClasses.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
      updatedAt: sql<string>`DATE_FORMAT(${playableClasses.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as('updatedAt'),
    })
    .from(playableClasses)
    .where(eq(playableClasses.id, id))
    .limit(1)

  return results[0] ?? null
}

/**
 * ---------------------------------------------------------
 * Tags
 * ---------------------------------------------------------
 */

export async function getPlayableClassTagsFromDB(
  classId: string
): Promise<PlayableClassTagListItem[]> {
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
    .from(playableClassTags)
    .innerJoin(playableTags, eq(playableClassTags.tagId, playableTags.id))
    .where(eq(playableClassTags.classId, classId))
    .orderBy(asc(playableTags.displayName))

  return results
}

export async function updatePlayableClassTagsInDB(
  classId: string,
  tagIds: string[]
): Promise<PlayableClassTagListItem[]> {
  await db
    .delete(playableClassTags)
    .where(eq(playableClassTags.classId, classId))

  if (tagIds.length > 0) {
    await db.insert(playableClassTags).values(
      tagIds.map((tagId) => ({
        classId,
        tagId,
      }))
    )
  }

  return getPlayableClassTagsFromDB(classId)
}

/**
 * ---------------------------------------------------------
 * Passives
 * ---------------------------------------------------------
 */

export async function getPlayableClassPassivesFromDB(
  classId: string
) {
  const results = await db
    .select({
      id: playablePassives.id,
      displayName: playablePassives.displayName,
      effectType: playablePassives.effectType,
    })
    .from(playableClassPassives)
    .innerJoin(
      playablePassives,
      eq(playableClassPassives.passiveId, playablePassives.id)
    )
    .where(eq(playableClassPassives.classId, classId))
    .orderBy(asc(playablePassives.displayName))

  return results
}

export async function updatePlayableClassPassivesInDB(
  classId: string,
  passiveIds: string[]
) {
  await db
    .delete(playableClassPassives)
    .where(eq(playableClassPassives.classId, classId))

  if (passiveIds.length > 0) {
    await db.insert(playableClassPassives).values(
      passiveIds.map((passiveId) => ({
        classId,
        passiveId,
      }))
    )
  }

  return getPlayableClassPassivesFromDB(classId)
}