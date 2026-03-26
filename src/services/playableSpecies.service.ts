// src/services/playableSpecies.service.ts

import { db } from '../db';
import { 
  playableSpecies,
  playableSpeciesTags,
  playableTags,
} from '../db/schema/canon-bridge/core/playable-identity';
import { sql, eq, asc } from 'drizzle-orm';

export interface PlayableSpeciesListItem {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  description: string | null;
  iconMediaAssetId: string | null;
  isActive: boolean | null;
  sortOrder: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface PlayableSpeciesTagListItem {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  description: string | null;
  tagCategory: string | null;
  isActive: boolean | null;
  sortOrder: number | null;
}

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
    .orderBy(playableSpecies.displayName);

  return results;
}

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
    .where(eq(playableSpecies.id, id));

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
      .limit(1);

    return results[0] ?? null;
}

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
    .orderBy(asc(playableTags.displayName));

  return results;
}

export async function updatePlayableSpeciesTagsInDB(
  speciesId: string,
  tagIds: string[]
): Promise<PlayableSpeciesTagListItem[]> {
  await db
    .delete(playableSpeciesTags)
    .where(eq(playableSpeciesTags.speciesId, speciesId));

  if (tagIds.length > 0) {
    await db.insert(playableSpeciesTags).values(
      tagIds.map((tagId) => ({
        speciesId,
        tagId,
      }))
    );
  }

  return getPlayableSpeciesTagsFromDB(speciesId);
}