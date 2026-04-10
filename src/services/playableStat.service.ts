// src/services/playableStat.service.ts

/**
 * Admin service for playable stats.
 *
 * Responsibilities:
 * - return canonical playable stat definitions
 * - create new canonical playable stat definitions
 * - update editable canonical playable stat fields
 *
 * Notes:
 * - this service operates on `ref_playable_stats`
 * - it does NOT manage stat baselines or species/class modifiers
 */

import { asc, eq } from 'drizzle-orm'

import { db } from '../db/index.js'
import { refPlayableStats } from '../db/schema/canon-bridge/reference/reference-playable-trait.js'

export interface PlayableStatListItem {
  id: string
  name: string
  slug: string
  displayName: string
  description: string | null
  isActive: boolean | null
  sortOrder: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
}

export interface CreatePlayableStatInput {
  displayName: string
  name: string
  slug: string
  description?: string | null
  isActive?: boolean
}

export interface UpdatePlayableStatInput {
  displayName: string
  description?: string | null
  isActive?: boolean
  sortOrder?: number
}

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayableStatsFromDB(): Promise<PlayableStatListItem[]> {
  const results = await db
    .select({
      id: refPlayableStats.id,
      name: refPlayableStats.name,
      slug: refPlayableStats.slug,
      displayName: refPlayableStats.displayName,
      description: refPlayableStats.description,
      isActive: refPlayableStats.isActive,
      sortOrder: refPlayableStats.sortOrder,
      createdAt: refPlayableStats.createdAt,
      updatedAt: refPlayableStats.updatedAt,
    })
    .from(refPlayableStats)
    .orderBy(
      asc(refPlayableStats.sortOrder),
      asc(refPlayableStats.displayName)
    )

  return results
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 */

export async function createPlayableStatInDB(
  input: CreatePlayableStatInput
): Promise<PlayableStatListItem> {
  const id = `stat_${input.name}`

  await db.insert(refPlayableStats).values({
    id,
    displayName: input.displayName,
    name: input.name,
    slug: input.slug,
    description: input.description ?? null,
    isActive: input.isActive ?? true,
  })

  const [created] = await db
    .select({
      id: refPlayableStats.id,
      name: refPlayableStats.name,
      slug: refPlayableStats.slug,
      displayName: refPlayableStats.displayName,
      description: refPlayableStats.description,
      isActive: refPlayableStats.isActive,
      sortOrder: refPlayableStats.sortOrder,
      createdAt: refPlayableStats.createdAt,
      updatedAt: refPlayableStats.updatedAt,
    })
    .from(refPlayableStats)
    .where(eq(refPlayableStats.id, id))

  return created
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */

export async function updatePlayableStatInDB(
  id: string,
  input: UpdatePlayableStatInput
): Promise<PlayableStatListItem> {
  const updatePayload: {
    displayName: string
    description: string | null
    isActive: boolean
    sortOrder?: number
  } = {
    displayName: input.displayName,
    description: input.description ?? null,
    isActive: input.isActive ?? false,
  }

  if (typeof input.sortOrder === 'number') {
    updatePayload.sortOrder = input.sortOrder
  }

  await db
    .update(refPlayableStats)
    .set(updatePayload)
    .where(eq(refPlayableStats.id, id))

  const [updated] = await db
    .select({
      id: refPlayableStats.id,
      name: refPlayableStats.name,
      slug: refPlayableStats.slug,
      displayName: refPlayableStats.displayName,
      description: refPlayableStats.description,
      isActive: refPlayableStats.isActive,
      sortOrder: refPlayableStats.sortOrder,
      createdAt: refPlayableStats.createdAt,
      updatedAt: refPlayableStats.updatedAt,
    })
    .from(refPlayableStats)
    .where(eq(refPlayableStats.id, id))

  return updated
}