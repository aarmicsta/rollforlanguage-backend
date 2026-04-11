// src/services/playablePassive.service.ts

/**
 * Admin service for playable passives.
 *
 * Responsibilities:
 * - return canonical playable passive definitions
 * - create new canonical playable passive definitions
 * - update editable canonical playable passive fields
 *
 * Notes:
 * - this service operates on `playable_passives`
 * - it does NOT manage species/class passive assignments
 */

import { asc, eq } from 'drizzle-orm'

import { db } from '../db/index.js'
import { playablePassives } from '../db/schema/canon-bridge/core/playable-identity.js'

export interface PlayablePassiveListItem {
  id: string
  name: string
  slug: string
  displayName: string
  description: string | null
  effectText: string | null
  effectType: string | null
  isActive: boolean | null
  sortOrder: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
}

export interface CreatePlayablePassiveInput {
  displayName: string
  name: string
  slug: string
  description?: string | null
  effectText?: string | null
  effectType?: string | null
  isActive?: boolean
}

export interface UpdatePlayablePassiveInput {
  displayName: string
  description?: string | null
  effectText?: string | null
  effectType?: string | null
  isActive?: boolean
  sortOrder?: number
}

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 */

export async function getPlayablePassivesFromDB(): Promise<
  PlayablePassiveListItem[]
> {
  const results = await db
    .select({
      id: playablePassives.id,
      name: playablePassives.name,
      slug: playablePassives.slug,
      displayName: playablePassives.displayName,
      description: playablePassives.description,
      effectText: playablePassives.effectText,
      effectType: playablePassives.effectType,
      isActive: playablePassives.isActive,
      sortOrder: playablePassives.sortOrder,
      createdAt: playablePassives.createdAt,
      updatedAt: playablePassives.updatedAt,
    })
    .from(playablePassives)
    .orderBy(
      asc(playablePassives.sortOrder),
      asc(playablePassives.displayName)
    )

  return results
}

/**
 * ---------------------------------------------------------
 * Create
 * ---------------------------------------------------------
 */

export async function createPlayablePassiveInDB(
  input: CreatePlayablePassiveInput
): Promise<PlayablePassiveListItem> {
  const id = `passive_${input.name}`

  await db.insert(playablePassives).values({
    id,
    displayName: input.displayName,
    name: input.name,
    slug: input.slug,
    description: input.description ?? null,
    effectText: input.effectText ?? null,
    effectType: input.effectType ?? null,
    isActive: input.isActive ?? true,
  })

  const [created] = await db
    .select({
      id: playablePassives.id,
      name: playablePassives.name,
      slug: playablePassives.slug,
      displayName: playablePassives.displayName,
      description: playablePassives.description,
      effectText: playablePassives.effectText,
      effectType: playablePassives.effectType,
      isActive: playablePassives.isActive,
      sortOrder: playablePassives.sortOrder,
      createdAt: playablePassives.createdAt,
      updatedAt: playablePassives.updatedAt,
    })
    .from(playablePassives)
    .where(eq(playablePassives.id, id))

  return created
}

/**
 * ---------------------------------------------------------
 * Update
 * ---------------------------------------------------------
 */

export async function updatePlayablePassiveInDB(
  id: string,
  input: UpdatePlayablePassiveInput
): Promise<PlayablePassiveListItem> {
  const updatePayload: {
    displayName: string
    description: string | null
    effectText: string | null
    effectType: string | null
    isActive: boolean
    sortOrder?: number
  } = {
    displayName: input.displayName,
    description: input.description ?? null,
    effectText: input.effectText ?? null,
    effectType: input.effectType ?? null,
    isActive: input.isActive ?? false,
  }

  if (typeof input.sortOrder === 'number') {
    updatePayload.sortOrder = input.sortOrder
  }

  await db
    .update(playablePassives)
    .set(updatePayload)
    .where(eq(playablePassives.id, id))

  const [updated] = await db
    .select({
      id: playablePassives.id,
      name: playablePassives.name,
      slug: playablePassives.slug,
      displayName: playablePassives.displayName,
      description: playablePassives.description,
      effectText: playablePassives.effectText,
      effectType: playablePassives.effectType,
      isActive: playablePassives.isActive,
      sortOrder: playablePassives.sortOrder,
      createdAt: playablePassives.createdAt,
      updatedAt: playablePassives.updatedAt,
    })
    .from(playablePassives)
    .where(eq(playablePassives.id, id))

  return updated
}