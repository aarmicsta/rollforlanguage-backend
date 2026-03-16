/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Creature / Encounter Systems
 *
 * Purpose:
 * Defines canonical seed data for creature- and encounter-
 * related reference tables.
 *
 * Notes:
 * - These objects use application-side property names
 *   (displayName, sortOrder, etc.) rather than raw SQL names.
 * - IDs and timestamps are intentionally omitted and handled
 *   by the schema defaults / seed runner.
 *
 * =========================================================
 */

export const creatureTypesSeed = [
  {
    name: 'beast',
    slug: 'beast',
    displayName: 'Beast',
    description: 'A natural or animal-like creature driven primarily by instinct, survival, or simple behavior.',
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'humanoid',
    slug: 'humanoid',
    displayName: 'Humanoid',
    description: 'A mortal, person-like creature with a roughly human-shaped form and culture or society.',
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'undead',
    slug: 'undead',
    displayName: 'Undead',
    description: 'A creature animated by deathly force, necromancy, or unnatural persistence beyond death.',
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'construct',
    slug: 'construct',
    displayName: 'Construct',
    description: 'An artificial or created being animated by magic, craft, or engineered design.',
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'elemental',
    slug: 'elemental',
    displayName: 'Elemental',
    description: 'A creature formed from or strongly bound to primal elemental forces such as fire, ice, stone, or storm.',
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'fiend',
    slug: 'fiend',
    displayName: 'Fiend',
    description: 'A malicious supernatural being associated with corruption, infernal power, or destructive dark forces.',
    isActive: true,
    sortOrder: 6,
  },
  {
    name: 'celestial',
    slug: 'celestial',
    displayName: 'Celestial',
    description: 'A divine, radiant, or sanctified being associated with holy power or higher realms.',
    isActive: true,
    sortOrder: 7,
  },
  {
    name: 'dragon',
    slug: 'dragon',
    displayName: 'Dragon',
    description: 'A draconic creature of great power, often marked by intelligence, majesty, and elemental or magical might.',
    isActive: true,
    sortOrder: 8,
  },
  {
    name: 'fey',
    slug: 'fey',
    displayName: 'Fey',
    description: 'An otherworldly magical being tied to enchantment, nature, trickery, or ancient wild realms.',
    isActive: true,
    sortOrder: 9,
  },
  {
    name: 'monstrosity',
    slug: 'monstrosity',
    displayName: 'Monstrosity',
    description: 'A dangerous unnatural creature that does not fit cleanly into more ordinary or supernatural categories.',
    isActive: true,
    sortOrder: 10,
  },
];

export const sizeCategoriesSeed = [
  {
    name: 'tiny',
    slug: 'tiny',
    displayName: 'Tiny',
    description: 'Extremely small in physical scale; easy to overlook, carry, or underestimate.',
    sizeRank: 1,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'small',
    slug: 'small',
    displayName: 'Small',
    description: 'Smaller than an average person, but still substantial enough to engage as a full creature or entity.',
    sizeRank: 2,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'medium',
    slug: 'medium',
    displayName: 'Medium',
    description: 'Around average human scale; the standard size category for many people-sized creatures.',
    sizeRank: 3,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'large',
    slug: 'large',
    displayName: 'Large',
    description: 'Noticeably bigger than a person, with greater physical presence and reach.',
    sizeRank: 4,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'huge',
    slug: 'huge',
    displayName: 'Huge',
    description: 'Massive in scale, dominating space and often signaling a major combat threat.',
    sizeRank: 5,
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'colossal',
    slug: 'colossal',
    displayName: 'Colossal',
    description: 'Enormous in scale, far beyond ordinary creatures and often reserved for legendary or awe-inspiring beings.',
    sizeRank: 6,
    isActive: true,
    sortOrder: 6,
  },
];

export const movementTypesSeed = [
  {
    name: 'walking',
    slug: 'walking',
    displayName: 'Walking',
    description: 'Standard ground-based movement using legs, limbs, or comparable physical locomotion.',
    movementCategory: 'physical',
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'flying',
    slug: 'flying',
    displayName: 'Flying',
    description: 'Movement through the air by means of wings, lift, or similar airborne capability.',
    movementCategory: 'physical',
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'swimming',
    slug: 'swimming',
    displayName: 'Swimming',
    description: 'Movement through water or other liquids with natural or trained aquatic capability.',
    movementCategory: 'environmental',
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'burrowing',
    slug: 'burrowing',
    displayName: 'Burrowing',
    description: 'Movement through soil, sand, or similar material by tunneling below the surface.',
    movementCategory: 'environmental',
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'climbing',
    slug: 'climbing',
    displayName: 'Climbing',
    description: 'Movement across walls, trees, cliffs, or other vertical and uneven surfaces.',
    movementCategory: 'physical',
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'teleporting',
    slug: 'teleporting',
    displayName: 'Teleporting',
    description: 'Magical movement that instantly shifts position without crossing the space between.',
    movementCategory: 'magical',
    isActive: true,
    sortOrder: 6,
  },
];

export const intelligenceCategoriesSeed = [
  {
    name: 'mindless',
    slug: 'mindless',
    displayName: 'Mindless',
    description: 'Lacks meaningful reasoning or independent thought, typically acting only through command, animation, or basic programmed behavior.',
    intelligenceRank: 1,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'instinctive',
    slug: 'instinctive',
    displayName: 'Instinctive',
    description: 'Acts primarily through impulse, survival response, or simple behavioral patterns with limited reasoning.',
    intelligenceRank: 2,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'animal',
    slug: 'animal',
    displayName: 'Animal',
    description: 'Possesses normal creature intelligence, including awareness, learning, and practical behavior without person-level reasoning.',
    intelligenceRank: 3,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'sapient',
    slug: 'sapient',
    displayName: 'Sapient',
    description: 'Possesses person-level reasoning, self-awareness, language-capable thought, and social or cultural intelligence.',
    intelligenceRank: 4,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'genius',
    slug: 'genius',
    displayName: 'Genius',
    description: 'Possesses exceptional intellect, strategy, insight, or mastery far beyond ordinary sapient capability.',
    intelligenceRank: 5,
    isActive: true,
    sortOrder: 5,
  },
];

export const threatLevelsSeed = [
  {
    name: 'trivial',
    slug: 'trivial',
    displayName: 'Trivial',
    description: 'Barely a threat for the intended level range and typically defeated with minimal effort.',
    threatRank: 1,
    recommendedLevelMin: 1,
    recommendedLevelMax: 3,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'low',
    slug: 'low',
    displayName: 'Low',
    description: 'A minor threat that may require attention but is unlikely to seriously endanger prepared adventurers.',
    threatRank: 2,
    recommendedLevelMin: 2,
    recommendedLevelMax: 5,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'moderate',
    slug: 'moderate',
    displayName: 'Moderate',
    description: 'A standard encounter difficulty expected to challenge players without overwhelming them.',
    threatRank: 3,
    recommendedLevelMin: 4,
    recommendedLevelMax: 10,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'high',
    slug: 'high',
    displayName: 'High',
    description: 'A dangerous encounter that requires coordination, tactics, or resource use to overcome.',
    threatRank: 4,
    recommendedLevelMin: 8,
    recommendedLevelMax: 14,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'severe',
    slug: 'severe',
    displayName: 'Severe',
    description: 'A powerful threat likely to strain resources or defeat an unprepared group.',
    threatRank: 5,
    recommendedLevelMin: 12,
    recommendedLevelMax: 18,
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'catastrophic',
    slug: 'catastrophic',
    displayName: 'Catastrophic',
    description: 'An extreme threat capable of overwhelming most groups and often associated with legendary creatures.',
    threatRank: 6,
    recommendedLevelMin: 16,
    recommendedLevelMax: 20,
    isActive: true,
    sortOrder: 6,
  },
];