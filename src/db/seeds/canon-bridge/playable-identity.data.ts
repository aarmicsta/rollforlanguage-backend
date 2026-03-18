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
  {
    id: 'class_barbarian',
    name: 'barbarian',
    slug: 'barbarian',
    displayName: 'Barbarian',
    description:
      'Barbarians, known among themselves as Wilders, reject comfort and refinement, forging themselves through hardship, endurance, and direct confrontation with the wild.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'class_bard',
    name: 'bard',
    slug: 'bard',
    displayName: 'Bard',
    description:
      'Bards are travelers who carry stories, music, and cultural memory between peoples, shaping meaning through performance, narrative, and shared understanding.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'class_cleric',
    name: 'cleric',
    slug: 'cleric',
    displayName: 'Cleric',
    description:
      'Clerics channel divine power through the traditions of their order, serving as healers, guides, and interpreters of faith while quietly bearing deeper knowledge of the divine.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'class_druid',
    name: 'druid',
    slug: 'druid',
    displayName: 'Druid',
    description:
      'Druids are chosen by nature itself and serve as stewards of balance, wielding power that grows as a living expression of the Many-Faced God through the natural world.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'class_fighter',
    name: 'fighter',
    slug: 'fighter',
    displayName: 'Fighter',
    description:
      'Fighters are disciplined martial practitioners who master many forms of combat, using adaptability, judgment, and skill to protect others before resorting to violence.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: 'class_monk',
    name: 'monk',
    slug: 'monk',
    displayName: 'Monk',
    description:
      'Monks pursue harmony of body, mind, and soul, refining themselves through disciplined practice until every action is guided by precision, balance, and intention.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 6,
  },
  {
    id: 'class_paladin',
    name: 'paladin',
    slug: 'paladin',
    displayName: 'Paladin',
    description:
      'Paladins are warriors bound to justice and fairness, drawing strength from unwavering moral conviction so long as they remain true to their oath.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 7,
  },
  {
    id: 'class_ranger',
    name: 'ranger',
    slug: 'ranger',
    displayName: 'Ranger',
    description:
      'Rangers are solitary wanderers who combine martial skill with limited nature magic, acting as independent agents of consequence when the natural world is pushed too far.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 8,
  },
  {
    id: 'class_rogue',
    name: 'rogue',
    slug: 'rogue',
    displayName: 'Rogue',
    description:
      'Rogues operate in the spaces between sight and shadow, using awareness, patience, deception, and timing to shape events without direct confrontation.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 9,
  },
  {
    id: 'class_sorcerer',
    name: 'sorcerer',
    slug: 'sorcerer',
    displayName: 'Sorcerer',
    description:
      'Sorcerers are born with arcane power woven into their being and must learn to master themselves in order to control the magic that flows instinctively from within.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'class_warlock',
    name: 'warlock',
    slug: 'warlock',
    displayName: 'Warlock',
    description:
      'Warlocks wield arcane power through dangerous pacts with supernatural patrons, sustaining borrowed strength through sacrifice and uneasy dependence.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 11,
  },
  {
    id: 'class_wizard',
    name: 'wizard',
    slug: 'wizard',
    displayName: 'Wizard',
    description:
      'Wizards unlock arcane power through study, discipline, and understanding, mastering magic through one of several philosophical traditions of scholarly practice.',
    startingWeaponItemId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 12,
  },
];

/**
 * Playable tag definitions.
 */
export const playableTagsSeed = [
  {
    id: 'tag_martial',
    name: 'martial',
    slug: 'martial',
    displayName: 'Martial',
    description:
      'Defined by weapon skill, physical combat training, and direct engagement in battle.',
    tagCategory: 'combat_style',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'tag_agile',
    name: 'agile',
    slug: 'agile',
    displayName: 'Agile',
    description:
      'Marked by speed, dexterity, nimbleness, and fluid movement.',
    tagCategory: 'combat_style',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'tag_stealth',
    name: 'stealth',
    slug: 'stealth',
    displayName: 'Stealth',
    description:
      'Skilled in subtle movement, concealment, infiltration, or striking unnoticed.',
    tagCategory: 'combat_style',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'tag_defensive',
    name: 'defensive',
    slug: 'defensive',
    displayName: 'Defensive',
    description:
      'Oriented toward protection, durability, guarding, or absorbing pressure.',
    tagCategory: 'combat_style',
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'tag_aggressive',
    name: 'aggressive',
    slug: 'aggressive',
    displayName: 'Aggressive',
    description:
      'Inclined toward forceful, relentless, or high-pressure offense.',
    tagCategory: 'combat_style',
    isActive: true,
    sortOrder: 5,
  },
  {
    id: 'tag_ranged',
    name: 'ranged',
    slug: 'ranged',
    displayName: 'Ranged',
    description:
      'Prefers attacking or operating effectively from a distance.',
    tagCategory: 'combat_style',
    isActive: true,
    sortOrder: 6,
  },
  {
    id: 'tag_arcane',
    name: 'arcane',
    slug: 'arcane',
    displayName: 'Arcane',
    description:
      'Draws upon learned, shaped, or channeled magical power.',
    tagCategory: 'power_source',
    isActive: true,
    sortOrder: 7,
  },
  {
    id: 'tag_divine',
    name: 'divine',
    slug: 'divine',
    displayName: 'Divine',
    description:
      'Connected to sacred power, faith, devotion, or holy calling.',
    tagCategory: 'power_source',
    isActive: true,
    sortOrder: 8,
  },
  {
    id: 'tag_primal',
    name: 'primal',
    slug: 'primal',
    displayName: 'Primal',
    description:
      'Rooted in nature, instinct, the wild, or ancient living forces.',
    tagCategory: 'power_source',
    isActive: true,
    sortOrder: 9,
  },
  {
    id: 'tag_scholarly',
    name: 'scholarly',
    slug: 'scholarly',
    displayName: 'Scholarly',
    description:
      'Associated with study, knowledge, research, and disciplined learning.',
    tagCategory: 'mental_social',
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'tag_charismatic',
    name: 'charismatic',
    slug: 'charismatic',
    displayName: 'Charismatic',
    description:
      'Influences others through presence, expression, confidence, or charm.',
    tagCategory: 'mental_social',
    isActive: true,
    sortOrder: 11,
  },
  {
    id: 'tag_disciplined',
    name: 'disciplined',
    slug: 'disciplined',
    displayName: 'Disciplined',
    description:
      'Defined by control, routine, training, restraint, or practiced focus.',
    tagCategory: 'mental_social',
    isActive: true,
    sortOrder: 12,
  },
  {
    id: 'tag_perceptive',
    name: 'perceptive',
    slug: 'perceptive',
    displayName: 'Perceptive',
    description:
      'Noted for awareness, observation, intuition, or reading situations well.',
    tagCategory: 'mental_social',
    isActive: true,
    sortOrder: 13,
  },
  {
    id: 'tag_wild',
    name: 'wild',
    slug: 'wild',
    displayName: 'Wild',
    description:
      'Untamed, instinctive, free-spirited, or strongly associated with the wilderness.',
    tagCategory: 'temperament',
    isActive: true,
    sortOrder: 14,
  },
  {
    id: 'tag_honorable',
    name: 'honorable',
    slug: 'honorable',
    displayName: 'Honorable',
    description:
      'Guided by duty, principle, oath, or a strong moral code.',
    tagCategory: 'temperament',
    isActive: true,
    sortOrder: 15,
  },
  {
    id: 'tag_cunning',
    name: 'cunning',
    slug: 'cunning',
    displayName: 'Cunning',
    description:
      'Clever, sly, tactical, or adept at indirect problem-solving.',
    tagCategory: 'temperament',
    isActive: true,
    sortOrder: 16,
  },
  {
    id: 'tag_resilient',
    name: 'resilient',
    slug: 'resilient',
    displayName: 'Resilient',
    description:
      'Enduring, hardy, stubborn, or able to withstand hardship and strain.',
    tagCategory: 'temperament',
    isActive: true,
    sortOrder: 17,
  },
  {
    id: 'tag_draconic',
    name: 'draconic',
    slug: 'draconic',
    displayName: 'Draconic',
    description:
      'Bearing a strong connection to dragons or draconic heritage.',
    tagCategory: 'nature',
    isActive: true,
    sortOrder: 18,
  },
  {
    id: 'tag_infernal',
    name: 'infernal',
    slug: 'infernal',
    displayName: 'Infernal',
    description:
      'Marked by infernal influence, ancestry, or associations.',
    tagCategory: 'nature',
    isActive: true,
    sortOrder: 19,
  },
  {
    id: 'tag_mortal',
    name: 'mortal',
    slug: 'mortal',
    displayName: 'Mortal',
    description:
      'Grounded in ordinary mortal life rather than clearly supernatural heritage.',
    tagCategory: 'nature',
    isActive: true,
    sortOrder: 20,
  },
  {
    id: 'tag_mystical',
    name: 'mystical',
    slug: 'mystical',
    displayName: 'Mystical',
    description:
      'Possessing an innate aura of wonder, enchantment, or otherworldly strangeness.',
    tagCategory: 'nature',
    isActive: true,
    sortOrder: 21,
  },
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