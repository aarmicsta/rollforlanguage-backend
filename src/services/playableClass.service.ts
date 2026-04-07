// src/services/playableClass.service.ts

import { db } from '../db';
import {
  playableClasses,
  playableClassTags,
  playableTags,
} from '../db/schema/canon-bridge/core/playable-identity';
import { sql, eq, asc } from 'drizzle-orm';

export interface PlayableClassListItem {
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

export interface PlayableClassTagListItem {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  description: string | null;
  tagCategory: string | null;
  isActive: boolean | null;
  sortOrder: number | null;
}

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
    .orderBy(playableClasses.displayName);

  return results;
}

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
    .where(eq(playableClasses.id, id));

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
    .limit(1);

  return results[0] ?? null;
}

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
    .orderBy(asc(playableTags.displayName));

  return results;
}

export async function updatePlayableClassTagsInDB(
  classId: string,
  tagIds: string[]
): Promise<PlayableClassTagListItem[]> {
  await db
    .delete(playableClassTags)
    .where(eq(playableClassTags.classId, classId));

  if (tagIds.length > 0) {
    await db.insert(playableClassTags).values(
      tagIds.map((tagId) => ({
        classId,
        tagId,
      }))
    );
  }

  return getPlayableClassTagsFromDB(classId);
}