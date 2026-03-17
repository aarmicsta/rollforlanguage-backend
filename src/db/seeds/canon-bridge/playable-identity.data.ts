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
    id: 'species-human',
    name: 'human',
    slug: 'human',
    displayName: 'Human',
    description:
      'Adaptable and ambitious, humans are versatile people known for their balance, determination, and wide-ranging potential.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'species-elf',
    name: 'elf',
    slug: 'elf',
    displayName: 'Elf',
    description:
      'Graceful and keen-minded, elves are known for their agility, precision, and long-standing cultural refinement.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'species-dwarf',
    name: 'dwarf',
    slug: 'dwarf',
    displayName: 'Dwarf',
    description:
      'Stout and steadfast, dwarves are renowned for their resilience, discipline, and enduring strength.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'species-gnome',
    name: 'gnome',
    slug: 'gnome',
    displayName: 'Gnome',
    description:
      'Clever and curious, gnomes are inventive folk who value intellect, creativity, and clever solutions.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'species-halfling',
    name: 'halfling',
    slug: 'halfling',
    displayName: 'Halfling',
    description:
      'Nimble and warm-hearted, halflings are resourceful wanderers known for quick feet and quiet resilience.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: 'species-half-orc',
    name: 'half_orc',
    slug: 'half_orc',
    displayName: 'Half-Orc',
    description:
      'Fierce and unyielding, half-orcs are powerful survivors known for their strength, toughness, and relentless spirit.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 6,
  },
  {
    id: 'species-dragonborn',
    name: 'dragonborn',
    slug: 'dragonborn',
    displayName: 'Dragonborn',
    description:
      'Proud and powerful, dragonborn bear draconic heritage that often manifests in great strength and elemental presence.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 7,
  },
  {
    id: 'species-tiefling',
    name: 'tiefling',
    slug: 'tiefling',
    displayName: 'Tiefling',
    description:
      'Marked by otherworldly lineage, tieflings are often associated with strange power, sharp intellect, and striking presence.',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 8,
  },
  {
    id: 'species-cornling',
    name: 'cornling',
    slug: 'cornling',
    displayName: 'Cornling',
    description:
      'A rare plant-born people descended from magically awakened corn, Cornlings are hardy, sapient beings tied to growth, field, and strange harvest magic.',
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