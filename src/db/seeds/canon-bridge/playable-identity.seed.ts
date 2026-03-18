/**
 * =========================================================
 * RFL DATABASE SEEDER
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Playable Identity Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Seeds canonical playable identity data into the database.
 *
 * This includes:
 * - playable species
 * - playable classes
 * - playable tags
 * - playable passives
 * - stat baselines
 * - species stat modifiers
 * - class stat modifiers
 * - species/class tag relationships
 * - species/class passive relationships
 *
 * Design Notes:
 * - Core entity tables should use repeatable upsert logic.
 * - Relationship and modifier tables should use stable,
 *   repeatable insert/update logic based on composite keys.
 * - Seeding order matters: base entity records should exist
 *   before dependent modifier/relationship rows are seeded.
 *
 * Important:
 * - This file contains seed execution logic only.
 * - Canonical data values belong in:
 *   `playable-identity.data.ts`
 *
 * =========================================================
 */

import { db } from '../../index';
import { eq } from 'drizzle-orm';

import {
  playableSpeciesSeed,
  playableClassesSeed,
  playableTagsSeed,
  playablePassivesSeed,
  playableStatBaselinesSeed,
  playableSpeciesStatModifiersSeed,
  playableClassStatModifiersSeed,
  playableSpeciesTagsSeed,
  playableClassTagsSeed,
  playableSpeciesPassivesSeed,
  playableClassPassivesSeed,
} from './playable-identity.data';

import {
  playableSpecies,
  playableClasses,
  playableTags,
  playablePassives,
  playableStatBaselines,
  playableSpeciesStatModifiers,
  playableClassStatModifiers,
  playableSpeciesTags,
  playableClassTags,
  playableSpeciesPassives,
  playableClassPassives,
} from '../../schema/canon-bridge/playable-identity';

/**
 * Seeds the full playable identity domain in dependency-safe
 * order.
 */
export async function seedPlayableIdentity(): Promise<void> {
  console.log('Seeding playable identity tables...');

  // -------------------------------------------------------
  // CORE ENTITY TABLES
  // -------------------------------------------------------

  for (const species of playableSpeciesSeed) {
    const existingSpecies = await db
      .select({ id: playableSpecies.id })
      .from(playableSpecies)
      .where(eq(playableSpecies.slug, species.slug))
      .limit(1);

    if (existingSpecies.length > 0) {
      await db
        .update(playableSpecies)
        .set({
          name: species.name,
          displayName: species.displayName,
          description: species.description,
          iconMediaAssetId: species.iconMediaAssetId,
          isActive: species.isActive,
          sortOrder: species.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(playableSpecies.slug, species.slug));
    } else {
      await db.insert(playableSpecies).values({
        id: species.id,
        name: species.name,
        slug: species.slug,
        displayName: species.displayName,
        description: species.description,
        iconMediaAssetId: species.iconMediaAssetId,
        isActive: species.isActive,
        sortOrder: species.sortOrder,
      });
    }
  }

  for (const playableClass of playableClassesSeed) {
    const existingClass = await db
      .select({ id: playableClasses.id })
      .from(playableClasses)
      .where(eq(playableClasses.slug, playableClass.slug))
      .limit(1);

    if (existingClass.length > 0) {
      await db
        .update(playableClasses)
        .set({
          name: playableClass.name,
          displayName: playableClass.displayName,
          description: playableClass.description,
          startingWeaponItemId: playableClass.startingWeaponItemId,
          iconMediaAssetId: playableClass.iconMediaAssetId,
          isActive: playableClass.isActive,
          sortOrder: playableClass.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(playableClasses.slug, playableClass.slug));
    } else {
      await db.insert(playableClasses).values({
        id: playableClass.id,
        name: playableClass.name,
        slug: playableClass.slug,
        displayName: playableClass.displayName,
        description: playableClass.description,
        startingWeaponItemId: playableClass.startingWeaponItemId,
        iconMediaAssetId: playableClass.iconMediaAssetId,
        isActive: playableClass.isActive,
        sortOrder: playableClass.sortOrder,
      });
    }
  }

  for (const tag of playableTagsSeed) {
    const existingTag = await db
      .select({ id: playableTags.id })
      .from(playableTags)
      .where(eq(playableTags.slug, tag.slug))
      .limit(1);

    if (existingTag.length > 0) {
      await db
        .update(playableTags)
        .set({
          name: tag.name,
          displayName: tag.displayName,
          description: tag.description,
          tagCategory: tag.tagCategory,
          isActive: tag.isActive,
          sortOrder: tag.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(playableTags.slug, tag.slug));
    } else {
      await db.insert(playableTags).values({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        displayName: tag.displayName,
        description: tag.description,
        tagCategory: tag.tagCategory,
        isActive: tag.isActive,
        sortOrder: tag.sortOrder,
      });
    }
  }

  for (const passive of playablePassivesSeed) {
    const existingPassive = await db
      .select({ id: playablePassives.id })
      .from(playablePassives)
      .where(eq(playablePassives.slug, passive.slug))
      .limit(1);

    if (existingPassive.length > 0) {
      await db
        .update(playablePassives)
        .set({
          name: passive.name,
          displayName: passive.displayName,
          description: passive.description,
          effectText: passive.effectText,
          effectType: passive.effectType,
          isActive: passive.isActive,
          sortOrder: passive.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(playablePassives.slug, passive.slug));
    } else {
      await db.insert(playablePassives).values({
        id: passive.id,
        name: passive.name,
        slug: passive.slug,
        displayName: passive.displayName,
        description: passive.description,
        effectText: passive.effectText,
        effectType: passive.effectType,
        isActive: passive.isActive,
        sortOrder: passive.sortOrder,
      });
    }
  }

  // -------------------------------------------------------
  // STAT SYSTEM TABLES
  // -------------------------------------------------------

  for (const baseline of playableStatBaselinesSeed) {
    const existingBaseline = await db
      .select({ statId: playableStatBaselines.statId })
      .from(playableStatBaselines)
      .where(eq(playableStatBaselines.statId, baseline.statId))
      .limit(1);

    if (existingBaseline.length > 0) {
      await db
        .update(playableStatBaselines)
        .set({
          baseValue: baseline.baseValue,
        })
        .where(eq(playableStatBaselines.statId, baseline.statId));
    } else {
      await db.insert(playableStatBaselines).values({
        statId: baseline.statId,
        baseValue: baseline.baseValue,
      });
    }
  }

  // TODO: Seed playable_species_stat_modifiers
  void playableSpeciesStatModifiersSeed;
  void playableSpeciesStatModifiers;

  // TODO: Seed playable_class_stat_modifiers
  void playableClassStatModifiersSeed;
  void playableClassStatModifiers;

  // -------------------------------------------------------
  // RELATIONSHIP TABLES
  // -------------------------------------------------------

  // TODO: Seed playable_species_tags
  void playableSpeciesTagsSeed;
  void playableSpeciesTags;

  // TODO: Seed playable_class_tags
  void playableClassTagsSeed;
  void playableClassTags;

  // TODO: Seed playable_species_passives
  void playableSpeciesPassivesSeed;
  void playableSpeciesPassives;

  // TODO: Seed playable_class_passives
  void playableClassPassivesSeed;
  void playableClassPassives;

  console.log('Finished seeding playable identity tables.');
}