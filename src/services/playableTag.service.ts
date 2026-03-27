// src/services/playableTag.service.ts

import { db } from '../db'
import { playableTags } from '../db/schema/canon-bridge/core/playable-identity'

/**
 * ---------------------------------------------------------
 * PlayableTagListItem
 * ---------------------------------------------------------
 *
 * Represents a canonical playable tag definition as returned
 * to the admin frontend.
 *
 * These are NOT species/class assignments — they are the
 * master reference records used for assignment.
 */
export interface PlayableTagListItem {
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
 * getPlayableTagsFromDB
 * ---------------------------------------------------------
 *
 * Fetches all canonical playable tag definitions.
 *
 * This is used by admin UIs to populate selection controls
 * (e.g., tag assignment selectors for species/classes).
 *
 * Notes:
 * - Returns ALL tags (filtering can be added later if needed)
 * - Ordered alphabetically by displayName for usability
 */
export async function getPlayableTagsFromDB(): Promise<PlayableTagListItem[]> {
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
    .from(playableTags)
    .orderBy(playableTags.displayName)

  return results
}