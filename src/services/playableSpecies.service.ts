// src/services/playableSpecies.service.ts

import { db } from '../db';
import { playableSpecies } from '../db/schema/canon-bridge/core/playable-identity';
import { sql, eq } from 'drizzle-orm';

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
    .orderBy(playableSpecies.sortOrder, playableSpecies.displayName);

  return results;
}

export async function updatePlayableSpeciesInDB(
  id: string,
  data: { displayName: string }
) {
  await db
    .update(playableSpecies)
    .set({
      displayName: data.displayName,
    })
    .where(eq(playableSpecies.id, id));

  const updatedSpecies = await db.query.playableSpecies.findFirst({
    where: eq(playableSpecies.id, id),
  });

  return updatedSpecies;
}