/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Character / Trait Systems
 *
 * Purpose:
 * Defines canonical seed data for character- and trait-related
 * reference tables.
 *
 * Notes:
 * - These objects use application-side property names
 *   (e.g. displayName, sortOrder) rather than raw SQL column names.
 * - IDs and timestamps are not included here; they are handled
 *   by the schema defaults / seed runner logic.
 *
 * =========================================================
 */

export const playableStatsSeed = [
  {
    name: 'hp',
    slug: 'hp',
    displayName: 'HP',
    description: 'Determines how much damage a character can take before being defeated.',
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'attack',
    slug: 'attack',
    displayName: 'ATK',
    description: "Determines a character's base offensive power when attacking.",
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'defense',
    slug: 'defense',
    displayName: 'DEF',
    description: 'Determines how much incoming damage is reduced or resisted.',
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'speed',
    slug: 'speed',
    displayName: 'SPD',
    description: 'Determines quickness, turn order, and general combat agility.',
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'intelligence',
    slug: 'intelligence',
    displayName: 'INT',
    description: 'Represents magical aptitude, reasoning, and knowledge-based capability.',
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'charisma',
    slug: 'charisma',
    displayName: 'CHA',
    description: 'Represents social presence, force of personality, and interaction-based capability.',
    isActive: true,
    sortOrder: 6,
  },
];

export const damageTypesSeed = [
  {
    name: 'physical',
    slug: 'physical',
    displayName: 'Physical',
    description: 'Damage caused by weapons, impacts, claws, bites, and other non-magical force.',
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'fire',
    slug: 'fire',
    displayName: 'Fire',
    description: 'Damage caused by flame, heat, and burning effects.',
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'ice',
    slug: 'ice',
    displayName: 'Ice',
    description: 'Damage caused by frost, freezing energy, and extreme cold.',
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'lightning',
    slug: 'lightning',
    displayName: 'Lightning',
    description: 'Damage caused by electricity, storms, and shocking energy.',
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'poison',
    slug: 'poison',
    displayName: 'Poison',
    description: 'Damage caused by venom, toxins, corrosion, or other harmful substances.',
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'arcane',
    slug: 'arcane',
    displayName: 'Arcane',
    description: 'Damage caused by raw magical force or non-elemental spell energy.',
    isActive: true,
    sortOrder: 6,
  },
  {
    name: 'holy',
    slug: 'holy',
    displayName: 'Holy',
    description: 'Damage caused by divine, radiant, or sanctified power.',
    isActive: true,
    sortOrder: 7,
  },
  {
    name: 'shadow',
    slug: 'shadow',
    displayName: 'Shadow',
    description: 'Damage caused by dark magic, corruption, curses, or sinister energy.',
    isActive: true,
    sortOrder: 8,
  },
];

export const alignmentsSeed = [
  {
    name: 'lawful_good',
    slug: 'lawful_good',
    displayName: 'Lawful Good',
    description: 'Tends to value compassion, justice, and moral action within the bounds of order, duty, or principle.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'neutral_good',
    slug: 'neutral_good',
    displayName: 'Neutral Good',
    description: 'Tends to value kindness, mercy, and doing good without strong attachment to order or chaos.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'chaotic_good',
    slug: 'chaotic_good',
    displayName: 'Chaotic Good',
    description: 'Tends to value compassion and moral action while favoring freedom, individuality, and resistance to rigid control.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'lawful_neutral',
    slug: 'lawful_neutral',
    displayName: 'Lawful Neutral',
    description: 'Tends to value order, structure, duty, and consistency above personal morality or malice.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'true_neutral',
    slug: 'true_neutral',
    displayName: 'True Neutral',
    description: 'Tends to avoid strong commitment to moral or ethical extremes, favoring balance, pragmatism, or detachment.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'chaotic_neutral',
    slug: 'chaotic_neutral',
    displayName: 'Chaotic Neutral',
    description: 'Tends to value freedom, unpredictability, and personal choice without strong commitment to good or evil.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 6,
  },
  {
    name: 'lawful_evil',
    slug: 'lawful_evil',
    displayName: 'Lawful Evil',
    description: 'Tends to pursue selfish or harmful ends through order, hierarchy, rules, or calculated control.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 7,
  },
  {
    name: 'neutral_evil',
    slug: 'neutral_evil',
    displayName: 'Neutral Evil',
    description: 'Tends to pursue selfish, harmful, or cruel ends without strong loyalty to order or chaos.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 8,
  },
  {
    name: 'chaotic_evil',
    slug: 'chaotic_evil',
    displayName: 'Chaotic Evil',
    description: 'Tends to pursue destructive, selfish, or cruel ends through disorder, violence, or disregard for structure.',
    alignmentAxis: 'composite',
    isActive: true,
    sortOrder: 9,
  },
];

export const statusEffectsSeed = [
  {
    name: 'poisoned',
    slug: 'poisoned',
    displayName: 'Poisoned',
    description: 'Afflicted by venom, toxins, or corruption that causes ongoing harm over time.',
    effectType: 'damage_over_time',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'burning',
    slug: 'burning',
    displayName: 'Burning',
    description: 'Engulfed in flame or intense heat, causing ongoing damage over time.',
    effectType: 'damage_over_time',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'frozen',
    slug: 'frozen',
    displayName: 'Frozen',
    description: 'Impaired by extreme cold, hindering movement or actions.',
    effectType: 'control',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'stunned',
    slug: 'stunned',
    displayName: 'Stunned',
    description: 'Temporarily unable to act effectively due to shock, impact, or disruption.',
    effectType: 'control',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'silenced',
    slug: 'silenced',
    displayName: 'Silenced',
    description: 'Prevented from using speech-based, magical, or casting-related abilities.',
    effectType: 'control',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'blinded',
    slug: 'blinded',
    displayName: 'Blinded',
    description: 'Vision is impaired or lost, reducing awareness and combat effectiveness.',
    effectType: 'debuff',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 6,
  },
  {
    name: 'weakened',
    slug: 'weakened',
    displayName: 'Weakened',
    description: 'Offensive power is reduced due to fatigue, injury, fear, or magical suppression.',
    effectType: 'debuff',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 7,
  },
  {
    name: 'guarded',
    slug: 'guarded',
    displayName: 'Guarded',
    description: 'Protected by a defensive effect that improves survivability or resistance.',
    effectType: 'buff',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 8,
  },
  {
    name: 'blessed',
    slug: 'blessed',
    displayName: 'Blessed',
    description: 'Enhanced by holy, supportive, or uplifting power that improves performance.',
    effectType: 'buff',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 9,
  },
  {
    name: 'cursed',
    slug: 'cursed',
    displayName: 'Cursed',
    description: 'Burdened by dark or harmful magic that reduces effectiveness or invites misfortune.',
    effectType: 'debuff',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 10,
  },
];