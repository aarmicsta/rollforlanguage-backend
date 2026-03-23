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
 * - Reference-table records now use canonical IDs.
 *
 * =========================================================
 */

export const creatureTypesSeed = [
  { id: 'ref_creature_type_beast', name: 'beast', slug: 'beast', displayName: 'Beast', description: 'A natural or animal-like creature driven primarily by instinct, survival, or simple behavior.', isActive: true, sortOrder: 1 },
  { id: 'ref_creature_type_humanoid', name: 'humanoid', slug: 'humanoid', displayName: 'Humanoid', description: 'A mortal, person-like creature with a roughly human-shaped form and culture or society.', isActive: true, sortOrder: 2 },
  { id: 'ref_creature_type_undead', name: 'undead', slug: 'undead', displayName: 'Undead', description: 'A creature animated by deathly force, necromancy, or unnatural persistence beyond death.', isActive: true, sortOrder: 3 },
  { id: 'ref_creature_type_construct', name: 'construct', slug: 'construct', displayName: 'Construct', description: 'An artificial or created being animated by magic, craft, or engineered design.', isActive: true, sortOrder: 4 },
  { id: 'ref_creature_type_elemental', name: 'elemental', slug: 'elemental', displayName: 'Elemental', description: 'A creature formed from or strongly bound to primal elemental forces such as fire, ice, stone, or storm.', isActive: true, sortOrder: 5 },
  { id: 'ref_creature_type_fiend', name: 'fiend', slug: 'fiend', displayName: 'Fiend', description: 'A malicious supernatural being associated with corruption, infernal power, or destructive dark forces.', isActive: true, sortOrder: 6 },
  { id: 'ref_creature_type_celestial', name: 'celestial', slug: 'celestial', displayName: 'Celestial', description: 'A divine, radiant, or sanctified being associated with holy power or higher realms.', isActive: true, sortOrder: 7 },
  { id: 'ref_creature_type_dragon', name: 'dragon', slug: 'dragon', displayName: 'Dragon', description: 'A draconic creature of great power, often marked by intelligence, majesty, and elemental or magical might.', isActive: true, sortOrder: 8 },
  { id: 'ref_creature_type_fey', name: 'fey', slug: 'fey', displayName: 'Fey', description: 'An otherworldly magical being tied to enchantment, nature, trickery, or ancient wild realms.', isActive: true, sortOrder: 9 },
  { id: 'ref_creature_type_monstrosity', name: 'monstrosity', slug: 'monstrosity', displayName: 'Monstrosity', description: 'A dangerous unnatural creature that does not fit cleanly into more ordinary or supernatural categories.', isActive: true, sortOrder: 10 },
];

export const sizeCategoriesSeed = [
  { id: 'ref_size_tiny', name: 'tiny', slug: 'tiny', displayName: 'Tiny', description: 'Extremely small in physical scale; easy to overlook, carry, or underestimate.', sizeRank: 1, isActive: true, sortOrder: 1 },
  { id: 'ref_size_small', name: 'small', slug: 'small', displayName: 'Small', description: 'Smaller than an average person, but still substantial enough to engage as a full creature or entity.', sizeRank: 2, isActive: true, sortOrder: 2 },
  { id: 'ref_size_medium', name: 'medium', slug: 'medium', displayName: 'Medium', description: 'Around average human scale; the standard size category for many people-sized creatures.', sizeRank: 3, isActive: true, sortOrder: 3 },
  { id: 'ref_size_large', name: 'large', slug: 'large', displayName: 'Large', description: 'Noticeably bigger than a person, with greater physical presence and reach.', sizeRank: 4, isActive: true, sortOrder: 4 },
  { id: 'ref_size_huge', name: 'huge', slug: 'huge', displayName: 'Huge', description: 'Massive in scale, dominating space and often signaling a major combat threat.', sizeRank: 5, isActive: true, sortOrder: 5 },
  { id: 'ref_size_colossal', name: 'colossal', slug: 'colossal', displayName: 'Colossal', description: 'Enormous in scale, far beyond ordinary creatures and often reserved for legendary or awe-inspiring beings.', sizeRank: 6, isActive: true, sortOrder: 6 },
];

export const movementTypesSeed = [
  { id: 'ref_movement_walk', name: 'walking', slug: 'walking', displayName: 'Walking', description: 'Standard ground-based movement using legs, limbs, or comparable physical locomotion.', movementCategory: 'physical', isActive: true, sortOrder: 1 },
  { id: 'ref_movement_fly', name: 'flying', slug: 'flying', displayName: 'Flying', description: 'Movement through the air by means of wings, lift, or similar airborne capability.', movementCategory: 'physical', isActive: true, sortOrder: 2 },
  { id: 'ref_movement_swim', name: 'swimming', slug: 'swimming', displayName: 'Swimming', description: 'Movement through water or other liquids with natural or trained aquatic capability.', movementCategory: 'environmental', isActive: true, sortOrder: 3 },
  { id: 'ref_movement_burrow', name: 'burrowing', slug: 'burrowing', displayName: 'Burrowing', description: 'Movement through soil, sand, or similar material by tunneling below the surface.', movementCategory: 'environmental', isActive: true, sortOrder: 4 },
  { id: 'ref_movement_climb', name: 'climbing', slug: 'climbing', displayName: 'Climbing', description: 'Movement across walls, trees, cliffs, or other vertical and uneven surfaces.', movementCategory: 'physical', isActive: true, sortOrder: 5 },
  { id: 'ref_movement_teleport', name: 'teleporting', slug: 'teleporting', displayName: 'Teleporting', description: 'Magical movement that instantly shifts position without crossing the space between.', movementCategory: 'magical', isActive: true, sortOrder: 6 },
];

export const intelligenceCategoriesSeed = [
  { id: 'ref_intelligence_mindless', name: 'mindless', slug: 'mindless', displayName: 'Mindless', description: 'Lacks meaningful reasoning or independent thought, typically acting only through command, animation, or basic programmed behavior.', intelligenceRank: 1, isActive: true, sortOrder: 1 },
  { id: 'ref_intelligence_instinctive', name: 'instinctive', slug: 'instinctive', displayName: 'Instinctive', description: 'Acts primarily through impulse, survival response, or simple behavioral patterns with limited reasoning.', intelligenceRank: 2, isActive: true, sortOrder: 2 },
  { id: 'ref_intelligence_animal', name: 'animal', slug: 'animal', displayName: 'Animal', description: 'Possesses normal creature intelligence, including awareness, learning, and practical behavior without person-level reasoning.', intelligenceRank: 3, isActive: true, sortOrder: 3 },
  { id: 'ref_intelligence_sapient', name: 'sapient', slug: 'sapient', displayName: 'Sapient', description: 'Possesses person-level reasoning, self-awareness, language-capable thought, and social or cultural intelligence.', intelligenceRank: 4, isActive: true, sortOrder: 4 },
  { id: 'ref_intelligence_genius', name: 'genius', slug: 'genius', displayName: 'Genius', description: 'Possesses exceptional intellect, strategy, insight, or mastery far beyond ordinary sapient capability.', intelligenceRank: 5, isActive: true, sortOrder: 5 },
];

export const threatLevelsSeed = [
  { id: 'ref_threat_trivial', name: 'trivial', slug: 'trivial', displayName: 'Trivial', description: 'Barely a threat for the intended level range and typically defeated with minimal effort.', threatRank: 1, recommendedLevelMin: 1, recommendedLevelMax: 3, isActive: true, sortOrder: 1 },
  { id: 'ref_threat_low', name: 'low', slug: 'low', displayName: 'Low', description: 'A minor threat that may require attention but is unlikely to seriously endanger prepared adventurers.', threatRank: 2, recommendedLevelMin: 2, recommendedLevelMax: 5, isActive: true, sortOrder: 2 },
  { id: 'ref_threat_moderate', name: 'moderate', slug: 'moderate', displayName: 'Moderate', description: 'A standard encounter difficulty expected to challenge players without overwhelming them.', threatRank: 3, recommendedLevelMin: 4, recommendedLevelMax: 10, isActive: true, sortOrder: 3 },
  { id: 'ref_threat_high', name: 'high', slug: 'high', displayName: 'High', description: 'A dangerous encounter that requires coordination, tactics, or resource use to overcome.', threatRank: 4, recommendedLevelMin: 8, recommendedLevelMax: 14, isActive: true, sortOrder: 4 },
  { id: 'ref_threat_severe', name: 'severe', slug: 'severe', displayName: 'Severe', description: 'A powerful threat likely to strain resources or defeat an unprepared group.', threatRank: 5, recommendedLevelMin: 12, recommendedLevelMax: 18, isActive: true, sortOrder: 5 },
  { id: 'ref_threat_catastrophic', name: 'catastrophic', slug: 'catastrophic', displayName: 'Catastrophic', description: 'An extreme threat capable of overwhelming most groups and often associated with legendary creatures.', threatRank: 6, recommendedLevelMin: 16, recommendedLevelMax: 20, isActive: true, sortOrder: 6 },
];

export const creatureTagsSeed = [
  {
    id: 'ref_creature_tag_humanoid',
    name: 'humanoid',
    slug: 'humanoid',
    displayName: 'Humanoid',
    description:
      'Creatures with broadly person-like form, posture, and social or tool-using potential.',
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'ref_creature_tag_beast',
    name: 'beast',
    slug: 'beast',
    displayName: 'Beast',
    description:
      'Natural or animal-like creatures driven primarily by instinct, survival, and non-civilized behavior.',
    isActive: true,
    sortOrder: 20,
  },
  {
    id: 'ref_creature_tag_undead',
    name: 'undead',
    slug: 'undead',
    displayName: 'Undead',
    description:
      'Creatures animated beyond death through curse, necromancy, divine force, or other unnatural persistence.',
    isActive: true,
    sortOrder: 30,
  },
  {
    id: 'ref_creature_tag_elemental',
    name: 'elemental',
    slug: 'elemental',
    displayName: 'Elemental',
    description:
      'Creatures fundamentally tied to primal forces such as fire, water, earth, air, or similar essences.',
    isActive: true,
    sortOrder: 40,
  },
  {
    id: 'ref_creature_tag_construct',
    name: 'construct',
    slug: 'construct',
    displayName: 'Construct',
    description:
      'Artificially made beings formed through craft, magic, engineering, or deliberate assembly.',
    isActive: true,
    sortOrder: 50,
  },
  {
    id: 'ref_creature_tag_magical',
    name: 'magical',
    slug: 'magical',
    displayName: 'Magical',
    description:
      'Creatures whose nature, abilities, or existence are inherently shaped by supernatural or arcane power.',
    isActive: true,
    sortOrder: 60,
  },
  {
    id: 'ref_creature_tag_aquatic',
    name: 'aquatic',
    slug: 'aquatic',
    displayName: 'Aquatic',
    description:
      'Creatures adapted primarily for water-based life, movement, or hunting.',
    isActive: true,
    sortOrder: 70,
  },
  {
    id: 'ref_creature_tag_flying',
    name: 'flying',
    slug: 'flying',
    displayName: 'Flying',
    description:
      'Creatures capable of sustained aerial movement by wing, levitation, or comparable means.',
    isActive: true,
    sortOrder: 80,
  },
  {
    id: 'ref_creature_tag_nocturnal',
    name: 'nocturnal',
    slug: 'nocturnal',
    displayName: 'Nocturnal',
    description:
      'Creatures most active, alert, or dangerous during nighttime or low-light conditions.',
    isActive: true,
    sortOrder: 90,
  },
  {
    id: 'ref_creature_tag_venomous',
    name: 'venomous',
    slug: 'venomous',
    displayName: 'Venomous',
    description:
      'Creatures able to inject or deliver toxin as part of attack, defense, or hunting behavior.',
    isActive: true,
    sortOrder: 100,
  },
  {
    id: 'ref_creature_tag_armored',
    name: 'armored',
    slug: 'armored',
    displayName: 'Armored',
    description:
      'Creatures protected by heavy hide, shell, plating, scales, or other unusually durable natural defense.',
    isActive: true,
    sortOrder: 110,
  },
  {
    id: 'ref_creature_tag_territorial',
    name: 'territorial',
    slug: 'territorial',
    displayName: 'Territorial',
    description:
      'Creatures strongly inclined to defend nests, hunting grounds, dens, or claimed spaces from intrusion.',
    isActive: true,
    sortOrder: 120,
  },
  {
    id: 'ref_creature_tag_pack_hunter',
    name: 'pack_hunter',
    slug: 'pack-hunter',
    displayName: 'Pack Hunter',
    description:
      'Creatures that commonly hunt, track, or fight in coordinated groups rather than alone.',
    isActive: true,
    sortOrder: 130,
  },
  {
    id: 'ref_creature_tag_solitary',
    name: 'solitary',
    slug: 'solitary',
    displayName: 'Solitary',
    description:
      'Creatures that typically live, hunt, or roam alone outside of breeding or temporary aggregation.',
    isActive: true,
    sortOrder: 140,
  },
  {
    id: 'ref_creature_tag_apex',
    name: 'apex',
    slug: 'apex',
    displayName: 'Apex',
    description:
      'Creatures occupying a dominant predatory or ecological role within their environment.',
    isActive: true,
    sortOrder: 150,
  },
  {
    id: 'ref_creature_tag_burrowing',
    name: 'burrowing',
    slug: 'burrowing',
    displayName: 'Burrowing',
    description:
      'Creatures adapted to tunneling, subterranean nesting, or underground ambush behavior.',
    isActive: true,
    sortOrder: 160,
  },
  {
    id: 'ref_creature_tag_swarming',
    name: 'swarming',
    slug: 'swarming',
    displayName: 'Swarming',
    description:
      'Creatures that appear or attack in large coordinated numbers, often overwhelming by mass rather than size.',
    isActive: true,
    sortOrder: 170,
  },
  {
    id: 'ref_creature_tag_domestic',
    name: 'domestic',
    slug: 'domestic',
    displayName: 'Domestic',
    description:
      'Creatures commonly tamed, bred, herded, or kept in sustained proximity to settled peoples.',
    isActive: true,
    sortOrder: 180,
  },
  {
    id: 'ref_creature_tag_monstrous',
    name: 'monstrous',
    slug: 'monstrous',
    displayName: 'Monstrous',
    description:
      'Creatures regarded as unnatural, fearsome, or dangerously aberrant relative to ordinary fauna.',
    isActive: true,
    sortOrder: 190,
  },
  {
    id: 'ref_creature_tag_sapient',
    name: 'sapient',
    slug: 'sapient',
    displayName: 'Sapient',
    description:
      'Creatures capable of higher reasoning, culture, language, or organized social intelligence.',
    isActive: true,
    sortOrder: 200,
  },
];