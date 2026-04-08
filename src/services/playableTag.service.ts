// src/services/playableTag.service.ts

/**
 * Admin service for playable tags.
 *
 * Responsibilities:
 * - return canonical playable tag definitions
 * - support admin selection UIs (species/class assignment)
 *
 * Notes:
 * - these are master reference records, not assignment mappings
 * - returns all tags, ordered for usability
 */

import { db } from '../db/index.js'
import { playableTags } from '../db/schema/canon-bridge/core/playable-identity.js'

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