/**
 * =========================================================
 * RFL DATABASE SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Playable Identity Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines canonical seed data for playable identity entities
 * and their associated relationships and stat systems.
 *
 * This file serves as the authoritative source of canonical
 * data for:
 * - playable species
 * - playable classes
 * - playable tags
 * - playable passives
 * - stat baselines
 * - stat modifiers
 * - identity relationships
 *
 * Design Notes:
 * - Data is organized by entity type and relationship type.
 * - Core entities (species, classes, tags, passives) will
 *   typically use slug-based upserts.
 * - Modifier and relationship tables use composite keys and
 *   should avoid duplicate entries.
 * - Empty arrays are intentional placeholders and will be
 *   populated incrementally as canonical decisions are made.
 *
 * Important:
 * - This file should only contain data definitions.
 * - No database logic or side effects should exist here.
 *
 * =========================================================
 */

//
// ---------------------------------------------------------
// CORE CANONICAL ENTITIES
// ---------------------------------------------------------
//

/**
 * Playable species definitions.
 */
export const playableSpeciesSeed = [
  {
    id: 'species_dragonborn',
    name: 'dragonborn',
    slug: 'dragonborn',
    displayName: 'Dragonborn',
    description:
      'Dragonborn are a people of draconic heritage, shaped by legacy, lineage, and the enduring influence of their ancient origins. Often organized around shared lineage, they carry a deep connection to the past while forging their own place in the world.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'species_dwarf',
    name: 'dwarf',
    slug: 'dwarf',
    displayName: 'Dwarf',
    description:
      'Dwarves are a people defined by tradition, craftsmanship, and enduring works. Rooted in ancient practices and guided by a deep respect for material and method, they see themselves as stewards of knowledge passed down across generations.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'species_elf',
    name: 'elf',
    slug: 'elf',
    displayName: 'Elf',
    description:
      'Elves are long-lived beings defined by their deep relationship with time and an enduring curiosity about the world. Experiencing life across vast spans, they seek to understand patterns, ideas, and existence itself through patient observation and exploration.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'species_gnome',
    name: 'gnome',
    slug: 'gnome',
    displayName: 'Gnome',
    description:
      'Gnomes are driven by intense curiosity expressed through rapid invention, experimentation, and discovery. With short but energetic lives, they pursue understanding at a relentless pace, often producing brilliant and unpredictable creations.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'species_halfling',
    name: 'halfling',
    slug: 'halfling',
    displayName: 'Halfling',
    description:
      'Halflings are a people centered on community, connection, and shared life. Known for their warmth and hospitality, they build close-knit societies where mutual support and belonging shape both daily life and personal identity.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: 'species_half_orc',
    name: 'half_orc',
    slug: 'half-orc',
    displayName: 'Half-Orc',
    description:
      'Half-Orcs are a people shaped by hardship and rejection, defined not by their lineage but by their resilience and perseverance. Often finding belonging among others who share their experiences, they form strong, protective communities built on mutual understanding.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 6,
  },
  {
    id: 'species_human',
    name: 'human',
    slug: 'human',
    displayName: 'Human',
    description:
      'Humans are a young and rapidly expanding people defined by their ambition and drive for opportunity. Constantly exploring, building, and reshaping the world around them, they form diverse and ever-changing societies driven by growth and possibility.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 7,
  },
  {
    id: 'species_tiefling',
    name: 'tiefling',
    slug: 'tiefling',
    displayName: 'Tiefling',
    description:
      'Tieflings are a people marked by infernal influence and shaped by the burdens placed upon them by others. Often facing distrust and expectation regardless of their actions, they navigate a world that assumes much about them while seeking to define their own identity.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 8,
  },
  {
    id: 'species_cornling',
    name: 'cornling',
    slug: 'cornling',
    displayName: 'Cornling',
    description:
      'Cornlings are plant-based beings shaped by growth, cultivation, and continuity. Rooted in a shared origin and purpose, they view life as part of an ongoing process that extends beyond any one individual, with each generation contributing to the next.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 9,
  },
];

/**
 * Playable class definitions.
 */
export const playableClassesSeed = [
  // Example structure:
  // {
  //   id: 'uuid',
  //   name: 'warrior',
  //   slug: 'warrior',
  //   displayName: 'Warrior',
  //   description: 'Frontline combat specialist.',
  //   startingWeaponItemId: null,
  //   iconMediaAssetId: null,
  //   isActive: true,
  //   sortOrder: 0,
  // }
];

/**
 * Playable tag definitions.
 */
export const playableTagsSeed = [
  // Example structure:
  // {
  //   id: 'uuid',
  //   name: 'agile',
  //   slug: 'agile',
  //   displayName: 'Agile',
  //   description: 'Fast and nimble.',
  //   tagCategory: 'attribute',
  //   isActive: true,
  //   sortOrder: 0,
  // }
];

/**
 * Playable passive definitions.
 */
export const playablePassivesSeed = [
  // Example structure:
  // {
  //   id: 'uuid',
  //   name: 'night_vision',
  //   slug: 'night-vision',
  //   displayName: 'Night Vision',
  //   description: 'Can see in low light conditions.',
  //   effectText: 'Grants visibility in darkness.',
  //   effectType: 'utility',
  //   isActive: true,
  //   sortOrder: 0,
  // }
];

//
// ---------------------------------------------------------
// STAT SYSTEMS
// ---------------------------------------------------------
//

/**
 * Universal stat baseline values.
 *
 * One entry per playable stat.
 */
export const playableStatBaselinesSeed = [
  // Example structure:
  // {
  //   statId: 'uuid',
  //   baseValue: 10,
  // }
];

/**
 * Species stat modifiers.
 *
 * Defines how each species modifies each stat.
 */
export const playableSpeciesStatModifiersSeed = [
  // Example structure:
  // {
  //   speciesId: 'uuid',
  //   statId: 'uuid',
  //   modifierValue: 2,
  // }
];

/**
 * Class stat modifiers.
 *
 * Defines how each class modifies each stat.
 */
export const playableClassStatModifiersSeed = [
  // Example structure:
  // {
  //   classId: 'uuid',
  //   statId: 'uuid',
  //   modifierValue: 3,
  // }
];

//
// ---------------------------------------------------------
// RELATIONSHIPS
// ---------------------------------------------------------
//

/**
 * Species ↔ Tags
 */
export const playableSpeciesTagsSeed = [
  // Example structure:
  // {
  //   speciesId: 'uuid',
  //   tagId: 'uuid',
  // }
];

/**
 * Class ↔ Tags
 */
export const playableClassTagsSeed = [
  // Example structure:
  // {
  //   classId: 'uuid',
  //   tagId: 'uuid',
  // }
];

/**
 * Species ↔ Passives
 */
export const playableSpeciesPassivesSeed = [
  // Example structure:
  // {
  //   speciesId: 'uuid',
  //   passiveId: 'uuid',
  // }
];

/**
 * Class ↔ Passives
 */
export const playableClassPassivesSeed = [
  // Example structure:
  // {
  //   classId: 'uuid',
  //   passiveId: 'uuid',
  // }
];