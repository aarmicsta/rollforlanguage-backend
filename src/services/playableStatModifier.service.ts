// src/services/playableStatModifier.service.ts

/**
 * Admin service for playable stat modifiers.
 *
 * Responsibilities:
 * - return unified admin-facing stat modifier rows
 * - create stat baselines
 * - create species stat modifiers
 * - create class stat modifiers
 * - update existing baseline/modifier records
 *
 * Notes:
 * - this service operates on:
 *   - `playable_stat_baselines`
 *   - `playable_species_stat_modifiers`
 *   - `playable_class_stat_modifiers`
 * - it does NOT manage canonical stat definitions themselves
 * - unified browse output is intentionally flattened for admin UI use
 */

import { and, asc, eq } from 'drizzle-orm'

import { db } from '../db/index.js'
import {
  playableClasses,
  playableClassStatModifiers,
  playableSpecies,
  playableSpeciesStatModifiers,
  playableStatBaselines,
} from '../db/schema/canon-bridge/core/playable-identity.js'
import { refPlayableStats } from '../db/schema/canon-bridge/reference/reference-playable-trait.js'

/**
 * ---------------------------------------------------------
 * Unified Row Shape
 * ---------------------------------------------------------
 */

export interface PlayableStatModifierListItem {
  context: 'baseline' | 'species' | 'class'
  targetId: string | null
  targetDisplayName: string
  statId: string
  statDisplayName: string
  value: number
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
}

/**
 * ---------------------------------------------------------
 * Create Inputs
 * ---------------------------------------------------------
 */

export interface CreatePlayableStatBaselineInput {
  statId: string
  baseValue: number
}

export interface CreatePlayableSpeciesStatModifierInput {
  speciesId: string
  statId: string
  modifierValue: number
}

export interface CreatePlayableClassStatModifierInput {
  classId: string
  statId: string
  modifierValue: number
}

/**
 * ---------------------------------------------------------
 * Update Inputs
 * ---------------------------------------------------------
 */

export interface UpdatePlayableStatBaselineInput {
  baseValue: number
}

export interface UpdatePlayableSpeciesStatModifierInput {
  modifierValue: number
}

export interface UpdatePlayableClassStatModifierInput {
  modifierValue: number
}

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 *
 * Returns a unified, flattened list across:
 * - stat baselines
 * - species stat modifiers
 * - class stat modifiers
 *
 * Notes:
 * - baseline rows use:
 *   - `targetId = null`
 *   - `targetDisplayName = 'Global'`
 */
export async function getPlayableStatModifiersFromDB(): Promise<
  PlayableStatModifierListItem[]
> {
  const baselineResults = await db
    .select({
        statId: playableStatBaselines.statId,
        statDisplayName: refPlayableStats.displayName,
        value: playableStatBaselines.baseValue,
        createdAt: playableStatBaselines.createdAt,
        updatedAt: playableStatBaselines.updatedAt,
    })
    .from(playableStatBaselines)
    .innerJoin(
        refPlayableStats,
        eq(playableStatBaselines.statId, refPlayableStats.id)
    )
    .orderBy(asc(refPlayableStats.sortOrder), asc(refPlayableStats.displayName))

  const speciesResults = await db
    .select({
      speciesId: playableSpeciesStatModifiers.speciesId,
      speciesDisplayName: playableSpecies.displayName,
      statId: playableSpeciesStatModifiers.statId,
      statDisplayName: refPlayableStats.displayName,
      value: playableSpeciesStatModifiers.modifierValue,
      createdAt: playableSpeciesStatModifiers.createdAt,
      updatedAt: playableSpeciesStatModifiers.updatedAt,
    })
    .from(playableSpeciesStatModifiers)
    .innerJoin(
      playableSpecies,
      eq(playableSpeciesStatModifiers.speciesId, playableSpecies.id)
    )
    .innerJoin(
      refPlayableStats,
      eq(playableSpeciesStatModifiers.statId, refPlayableStats.id)
    )
    .orderBy(
      asc(playableSpecies.displayName),
      asc(refPlayableStats.sortOrder),
      asc(refPlayableStats.displayName)
    )

  const classResults = await db
    .select({
      classId: playableClassStatModifiers.classId,
      classDisplayName: playableClasses.displayName,
      statId: playableClassStatModifiers.statId,
      statDisplayName: refPlayableStats.displayName,
      value: playableClassStatModifiers.modifierValue,
      createdAt: playableClassStatModifiers.createdAt,
      updatedAt: playableClassStatModifiers.updatedAt,
    })
    .from(playableClassStatModifiers)
    .innerJoin(
      playableClasses,
      eq(playableClassStatModifiers.classId, playableClasses.id)
    )
    .innerJoin(
      refPlayableStats,
      eq(playableClassStatModifiers.statId, refPlayableStats.id)
    )
    .orderBy(
      asc(playableClasses.displayName),
      asc(refPlayableStats.sortOrder),
      asc(refPlayableStats.displayName)
    )

  const baselines: PlayableStatModifierListItem[] = baselineResults.map((row) => ({
    context: 'baseline',
    targetId: null,
    targetDisplayName: 'Global',
    statId: row.statId,
    statDisplayName: row.statDisplayName,
    value: row.value,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }))

  const speciesModifiers: PlayableStatModifierListItem[] = speciesResults.map(
    (row) => ({
      context: 'species',
      targetId: row.speciesId,
      targetDisplayName: row.speciesDisplayName,
      statId: row.statId,
      statDisplayName: row.statDisplayName,
      value: row.value,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })
  )

  const classModifiers: PlayableStatModifierListItem[] = classResults.map(
    (row) => ({
      context: 'class',
      targetId: row.classId,
      targetDisplayName: row.classDisplayName,
      statId: row.statId,
      statDisplayName: row.statDisplayName,
      value: row.value,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })
  )

  return [...baselines, ...speciesModifiers, ...classModifiers]
}

/**
 * ---------------------------------------------------------
 * Create: Baseline
 * ---------------------------------------------------------
 */

export async function createPlayableStatBaselineInDB(
  input: CreatePlayableStatBaselineInput
): Promise<PlayableStatModifierListItem> {
  await db.insert(playableStatBaselines).values({
    statId: input.statId,
    baseValue: input.baseValue,
  })

  const [created] = await db
    .select({
      statId: playableStatBaselines.statId,
      statDisplayName: refPlayableStats.displayName,
      value: playableStatBaselines.baseValue,
      createdAt: playableStatBaselines.createdAt,
      updatedAt: playableStatBaselines.updatedAt,
    })
    .from(playableStatBaselines)
    .innerJoin(
      refPlayableStats,
      eq(playableStatBaselines.statId, refPlayableStats.id)
    )
    .where(eq(playableStatBaselines.statId, input.statId))

  return {
    context: 'baseline',
    targetId: null,
    targetDisplayName: 'Global',
    statId: created.statId,
    statDisplayName: created.statDisplayName,
    value: created.value,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  }
}

/**
 * ---------------------------------------------------------
 * Create: Species Modifier
 * ---------------------------------------------------------
 */

export async function createPlayableSpeciesStatModifierInDB(
  input: CreatePlayableSpeciesStatModifierInput
): Promise<PlayableStatModifierListItem> {
  await db.insert(playableSpeciesStatModifiers).values({
    speciesId: input.speciesId,
    statId: input.statId,
    modifierValue: input.modifierValue,
  })

  const [created] = await db
    .select({
      speciesId: playableSpeciesStatModifiers.speciesId,
      speciesDisplayName: playableSpecies.displayName,
      statId: playableSpeciesStatModifiers.statId,
      statDisplayName: refPlayableStats.displayName,
      value: playableSpeciesStatModifiers.modifierValue,
      createdAt: playableSpeciesStatModifiers.createdAt,
      updatedAt: playableSpeciesStatModifiers.updatedAt,
    })
    .from(playableSpeciesStatModifiers)
    .innerJoin(
      playableSpecies,
      eq(playableSpeciesStatModifiers.speciesId, playableSpecies.id)
    )
    .innerJoin(
      refPlayableStats,
      eq(playableSpeciesStatModifiers.statId, refPlayableStats.id)
    )
    .where(
      and(
        eq(playableSpeciesStatModifiers.speciesId, input.speciesId),
        eq(playableSpeciesStatModifiers.statId, input.statId)
      )
    )

  return {
    context: 'species',
    targetId: created.speciesId,
    targetDisplayName: created.speciesDisplayName,
    statId: created.statId,
    statDisplayName: created.statDisplayName,
    value: created.value,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  }
}

/**
 * ---------------------------------------------------------
 * Create: Class Modifier
 * ---------------------------------------------------------
 */

export async function createPlayableClassStatModifierInDB(
  input: CreatePlayableClassStatModifierInput
): Promise<PlayableStatModifierListItem> {
  await db.insert(playableClassStatModifiers).values({
    classId: input.classId,
    statId: input.statId,
    modifierValue: input.modifierValue,
  })

  const [created] = await db
    .select({
      classId: playableClassStatModifiers.classId,
      classDisplayName: playableClasses.displayName,
      statId: playableClassStatModifiers.statId,
      statDisplayName: refPlayableStats.displayName,
      value: playableClassStatModifiers.modifierValue,
      createdAt: playableClassStatModifiers.createdAt,
      updatedAt: playableClassStatModifiers.updatedAt,
    })
    .from(playableClassStatModifiers)
    .innerJoin(
      playableClasses,
      eq(playableClassStatModifiers.classId, playableClasses.id)
    )
    .innerJoin(
      refPlayableStats,
      eq(playableClassStatModifiers.statId, refPlayableStats.id)
    )
    .where(
      and(
        eq(playableClassStatModifiers.classId, input.classId),
        eq(playableClassStatModifiers.statId, input.statId)
      )
    )

  return {
    context: 'class',
    targetId: created.classId,
    targetDisplayName: created.classDisplayName,
    statId: created.statId,
    statDisplayName: created.statDisplayName,
    value: created.value,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  }
}

/**
 * ---------------------------------------------------------
 * Update: Baseline
 * ---------------------------------------------------------
 */

export async function updatePlayableStatBaselineInDB(
  statId: string,
  input: UpdatePlayableStatBaselineInput
): Promise<PlayableStatModifierListItem> {
  await db
    .update(playableStatBaselines)
    .set({
      baseValue: input.baseValue,
    })
    .where(eq(playableStatBaselines.statId, statId))

  const [updated] = await db
    .select({
      statId: playableStatBaselines.statId,
      statDisplayName: refPlayableStats.displayName,
      value: playableStatBaselines.baseValue,
      createdAt: playableStatBaselines.createdAt,
      updatedAt: playableStatBaselines.updatedAt,
    })
    .from(playableStatBaselines)
    .innerJoin(
      refPlayableStats,
      eq(playableStatBaselines.statId, refPlayableStats.id)
    )
    .where(eq(playableStatBaselines.statId, statId))

  return {
    context: 'baseline',
    targetId: null,
    targetDisplayName: 'Global',
    statId: updated.statId,
    statDisplayName: updated.statDisplayName,
    value: updated.value,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  }
}

/**
 * ---------------------------------------------------------
 * Update: Species Modifier
 * ---------------------------------------------------------
 */

export async function updatePlayableSpeciesStatModifierInDB(
  speciesId: string,
  statId: string,
  input: UpdatePlayableSpeciesStatModifierInput
): Promise<PlayableStatModifierListItem> {
  await db
    .update(playableSpeciesStatModifiers)
    .set({
      modifierValue: input.modifierValue,
    })
    .where(
      and(
        eq(playableSpeciesStatModifiers.speciesId, speciesId),
        eq(playableSpeciesStatModifiers.statId, statId)
      )
    )

  const [updated] = await db
    .select({
      speciesId: playableSpeciesStatModifiers.speciesId,
      speciesDisplayName: playableSpecies.displayName,
      statId: playableSpeciesStatModifiers.statId,
      statDisplayName: refPlayableStats.displayName,
      value: playableSpeciesStatModifiers.modifierValue,
      createdAt: playableSpeciesStatModifiers.createdAt,
      updatedAt: playableSpeciesStatModifiers.updatedAt,
    })
    .from(playableSpeciesStatModifiers)
    .innerJoin(
      playableSpecies,
      eq(playableSpeciesStatModifiers.speciesId, playableSpecies.id)
    )
    .innerJoin(
      refPlayableStats,
      eq(playableSpeciesStatModifiers.statId, refPlayableStats.id)
    )
    .where(
      and(
        eq(playableSpeciesStatModifiers.speciesId, speciesId),
        eq(playableSpeciesStatModifiers.statId, statId)
      )
    )

  return {
    context: 'species',
    targetId: updated.speciesId,
    targetDisplayName: updated.speciesDisplayName,
    statId: updated.statId,
    statDisplayName: updated.statDisplayName,
    value: updated.value,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  }
}

/**
 * ---------------------------------------------------------
 * Update: Class Modifier
 * ---------------------------------------------------------
 */

export async function updatePlayableClassStatModifierInDB(
  classId: string,
  statId: string,
  input: UpdatePlayableClassStatModifierInput
): Promise<PlayableStatModifierListItem> {
  await db
    .update(playableClassStatModifiers)
    .set({
      modifierValue: input.modifierValue,
    })
    .where(
      and(
        eq(playableClassStatModifiers.classId, classId),
        eq(playableClassStatModifiers.statId, statId)
      )
    )

  const [updated] = await db
    .select({
      classId: playableClassStatModifiers.classId,
      classDisplayName: playableClasses.displayName,
      statId: playableClassStatModifiers.statId,
      statDisplayName: refPlayableStats.displayName,
      value: playableClassStatModifiers.modifierValue,
      createdAt: playableClassStatModifiers.createdAt,
      updatedAt: playableClassStatModifiers.updatedAt,
    })
    .from(playableClassStatModifiers)
    .innerJoin(
      playableClasses,
      eq(playableClassStatModifiers.classId, playableClasses.id)
    )
    .innerJoin(
      refPlayableStats,
      eq(playableClassStatModifiers.statId, refPlayableStats.id)
    )
    .where(
      and(
        eq(playableClassStatModifiers.classId, classId),
        eq(playableClassStatModifiers.statId, statId)
      )
    )

  return {
    context: 'class',
    targetId: updated.classId,
    targetDisplayName: updated.classDisplayName,
    statId: updated.statId,
    statDisplayName: updated.statDisplayName,
    value: updated.value,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  }
}