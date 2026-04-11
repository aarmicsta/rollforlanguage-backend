// src/services/playablePassiveAssignment.service.ts

/**
 * Admin service for playable passive assignments.
 *
 * Responsibilities:
 * - return unified admin-facing passive assignment rows
 * - create species passive assignments
 * - create class passive assignments
 * - delete existing species/class passive assignments
 *
 * Notes:
 * - this service operates on:
 *   - `playable_species_passives`
 *   - `playable_class_passives`
 * - it does NOT manage canonical passive definitions themselves
 * - unified browse output is intentionally flattened for admin UI use
 */

import { and, asc, eq } from 'drizzle-orm'

import { db } from '../db/index.js'
import {
  playableClasses,
  playableClassPassives,
  playablePassives,
  playableSpecies,
  playableSpeciesPassives,
} from '../db/schema/canon-bridge/core/playable-identity.js'

/**
 * ---------------------------------------------------------
 * Unified Row Shape
 * ---------------------------------------------------------
 */

export interface PlayablePassiveAssignmentListItem {
  context: 'species' | 'class'
  targetId: string
  targetDisplayName: string
  passiveId: string
  passiveDisplayName: string
  passiveDescription: string | null
  passiveEffectText: string | null
  passiveEffectType: string | null
  createdAt?: Date | string | null
}

/**
 * ---------------------------------------------------------
 * Create Inputs
 * ---------------------------------------------------------
 */

export interface CreatePlayableSpeciesPassiveAssignmentInput {
  speciesId: string
  passiveId: string
}

export interface CreatePlayableClassPassiveAssignmentInput {
  classId: string
  passiveId: string
}

/**
 * ---------------------------------------------------------
 * Browse
 * ---------------------------------------------------------
 *
 * Returns a unified, flattened list across:
 * - species passive assignments
 * - class passive assignments
 */
export async function getPlayablePassiveAssignmentsFromDB(): Promise<
  PlayablePassiveAssignmentListItem[]
> {
  const speciesResults = await db
    .select({
      speciesId: playableSpeciesPassives.speciesId,
      speciesDisplayName: playableSpecies.displayName,
      passiveId: playableSpeciesPassives.passiveId,
      passiveDisplayName: playablePassives.displayName,
      passiveDescription: playablePassives.description,
      passiveEffectText: playablePassives.effectText,
      passiveEffectType: playablePassives.effectType,
      createdAt: playableSpeciesPassives.createdAt,
    })
    .from(playableSpeciesPassives)
    .innerJoin(
      playableSpecies,
      eq(playableSpeciesPassives.speciesId, playableSpecies.id)
    )
    .innerJoin(
      playablePassives,
      eq(playableSpeciesPassives.passiveId, playablePassives.id)
    )
    .orderBy(
      asc(playableSpecies.displayName),
      asc(playablePassives.sortOrder),
      asc(playablePassives.displayName)
    )

  const classResults = await db
    .select({
      classId: playableClassPassives.classId,
      classDisplayName: playableClasses.displayName,
      passiveId: playableClassPassives.passiveId,
      passiveDisplayName: playablePassives.displayName,
      passiveDescription: playablePassives.description,
      passiveEffectText: playablePassives.effectText,
      passiveEffectType: playablePassives.effectType,
      createdAt: playableClassPassives.createdAt,
    })
    .from(playableClassPassives)
    .innerJoin(
      playableClasses,
      eq(playableClassPassives.classId, playableClasses.id)
    )
    .innerJoin(
      playablePassives,
      eq(playableClassPassives.passiveId, playablePassives.id)
    )
    .orderBy(
      asc(playableClasses.displayName),
      asc(playablePassives.sortOrder),
      asc(playablePassives.displayName)
    )

  const speciesAssignments: PlayablePassiveAssignmentListItem[] =
    speciesResults.map((row) => ({
      context: 'species',
      targetId: row.speciesId,
      targetDisplayName: row.speciesDisplayName,
      passiveId: row.passiveId,
      passiveDisplayName: row.passiveDisplayName,
      passiveDescription: row.passiveDescription,
      passiveEffectText: row.passiveEffectText,
      passiveEffectType: row.passiveEffectType,
      createdAt: row.createdAt,
    }))

  const classAssignments: PlayablePassiveAssignmentListItem[] = classResults.map(
    (row) => ({
      context: 'class',
      targetId: row.classId,
      targetDisplayName: row.classDisplayName,
      passiveId: row.passiveId,
      passiveDisplayName: row.passiveDisplayName,
      passiveDescription: row.passiveDescription,
      passiveEffectText: row.passiveEffectText,
      passiveEffectType: row.passiveEffectType,
      createdAt: row.createdAt,
    })
  )

  return [...speciesAssignments, ...classAssignments]
}

/**
 * ---------------------------------------------------------
 * Create: Species Assignment
 * ---------------------------------------------------------
 */

export async function createPlayableSpeciesPassiveAssignmentInDB(
  input: CreatePlayableSpeciesPassiveAssignmentInput
): Promise<PlayablePassiveAssignmentListItem> {
  await db.insert(playableSpeciesPassives).values({
    speciesId: input.speciesId,
    passiveId: input.passiveId,
  })

  const [created] = await db
    .select({
      speciesId: playableSpeciesPassives.speciesId,
      speciesDisplayName: playableSpecies.displayName,
      passiveId: playableSpeciesPassives.passiveId,
      passiveDisplayName: playablePassives.displayName,
      passiveDescription: playablePassives.description,
      passiveEffectText: playablePassives.effectText,
      passiveEffectType: playablePassives.effectType,
      createdAt: playableSpeciesPassives.createdAt,
    })
    .from(playableSpeciesPassives)
    .innerJoin(
      playableSpecies,
      eq(playableSpeciesPassives.speciesId, playableSpecies.id)
    )
    .innerJoin(
      playablePassives,
      eq(playableSpeciesPassives.passiveId, playablePassives.id)
    )
    .where(
      and(
        eq(playableSpeciesPassives.speciesId, input.speciesId),
        eq(playableSpeciesPassives.passiveId, input.passiveId)
      )
    )

  return {
    context: 'species',
    targetId: created.speciesId,
    targetDisplayName: created.speciesDisplayName,
    passiveId: created.passiveId,
    passiveDisplayName: created.passiveDisplayName,
    passiveDescription: created.passiveDescription,
    passiveEffectText: created.passiveEffectText,
    passiveEffectType: created.passiveEffectType,
    createdAt: created.createdAt,
  }
}

/**
 * ---------------------------------------------------------
 * Create: Class Assignment
 * ---------------------------------------------------------
 */

export async function createPlayableClassPassiveAssignmentInDB(
  input: CreatePlayableClassPassiveAssignmentInput
): Promise<PlayablePassiveAssignmentListItem> {
  await db.insert(playableClassPassives).values({
    classId: input.classId,
    passiveId: input.passiveId,
  })

  const [created] = await db
    .select({
      classId: playableClassPassives.classId,
      classDisplayName: playableClasses.displayName,
      passiveId: playableClassPassives.passiveId,
      passiveDisplayName: playablePassives.displayName,
      passiveDescription: playablePassives.description,
      passiveEffectText: playablePassives.effectText,
      passiveEffectType: playablePassives.effectType,
      createdAt: playableClassPassives.createdAt,
    })
    .from(playableClassPassives)
    .innerJoin(
      playableClasses,
      eq(playableClassPassives.classId, playableClasses.id)
    )
    .innerJoin(
      playablePassives,
      eq(playableClassPassives.passiveId, playablePassives.id)
    )
    .where(
      and(
        eq(playableClassPassives.classId, input.classId),
        eq(playableClassPassives.passiveId, input.passiveId)
      )
    )

  return {
    context: 'class',
    targetId: created.classId,
    targetDisplayName: created.classDisplayName,
    passiveId: created.passiveId,
    passiveDisplayName: created.passiveDisplayName,
    passiveDescription: created.passiveDescription,
    passiveEffectText: created.passiveEffectText,
    passiveEffectType: created.passiveEffectType,
    createdAt: created.createdAt,
  }
}

/**
 * ---------------------------------------------------------
 * Delete: Species Assignment
 * ---------------------------------------------------------
 */

export async function deletePlayableSpeciesPassiveAssignmentInDB(
  speciesId: string,
  passiveId: string
): Promise<void> {
  await db
    .delete(playableSpeciesPassives)
    .where(
      and(
        eq(playableSpeciesPassives.speciesId, speciesId),
        eq(playableSpeciesPassives.passiveId, passiveId)
      )
    )
}

/**
 * ---------------------------------------------------------
 * Delete: Class Assignment
 * ---------------------------------------------------------
 */

export async function deletePlayableClassPassiveAssignmentInDB(
  classId: string,
  passiveId: string
): Promise<void> {
  await db
    .delete(playableClassPassives)
    .where(
      and(
        eq(playableClassPassives.classId, classId),
        eq(playableClassPassives.passiveId, passiveId)
      )
    )
}